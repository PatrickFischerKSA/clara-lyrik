import {scanPattern} from './bodo/metre.js?v=2.5.0';

const LIMIT = 12000;
const normalize = text => String(text ?? '').replace(/\r\n?/g, '\n').normalize('NFC');
const LETTERS = /[\p{L}\p{M}]+/gu;
const NUCLEI = /ei|ai|au|eu|äu|ie|oi|aa|ee|oo|[aeiouyäöüéèêáàâíìîóòôúùû]/giu;
const ONSETS = ['schr', 'schl', 'schw', 'str', 'spr', 'sch', 'ch', 'ck', 'ph', 'th', 'qu', 'br', 'bl', 'dr', 'fr', 'fl', 'gr', 'gl', 'kr', 'kl', 'pr', 'pl', 'tr'];

// A local, deliberately editable suggestion, not a pronunciation dictionary.
export function suggestWord(word) {
  const nuclei = [...word.matchAll(NUCLEI)];
  const cuts = [];
  for (let i = 1; i < nuclei.length; i++) {
    const end = nuclei[i - 1].index + nuclei[i - 1][0].length;
    const next = nuclei[i].index;
    const cluster = word.slice(end, next).toLocaleLowerCase('de');
    let onset = cluster ? 1 : 0;
    for (const group of ONSETS) if (cluster.endsWith(group)) { onset = group.length; break; }
    cuts.push(next - onset);
  }
  return word.split('').map((letter, index) => (cuts.includes(index) ? '·' : '') + letter).join('');
}

export function suggestSegmentation(text) {
  const source = normalize(text);
  if (source.length > LIMIT) throw Error('Untersuche höchstens 12 000 Zeichen auf einmal.');
  if (source.includes('·')) throw Error('Ersetze Mittelpunkte im Entwurf, bevor du ihn aufteilst. Sie markieren hier Silbengrenzen.');
  return source.replace(LETTERS, suggestWord);
}

export function parseSegmentation(sourceText, separatedText) {
  const source = normalize(sourceText), separated = normalize(separatedText);
  if (!source.trim()) throw Error('Schreibe zuerst einen Vers in den Entwurf.');
  if (source.length > LIMIT || separated.length > LIMIT * 2) throw Error('Untersuche höchstens 12 000 Zeichen auf einmal.');
  if (separated.replaceAll('·', '') !== source) throw Error('Ändere hier nur die Mittelpunkte. Den Wortlaut und die Zeilenumbrüche bearbeitest du im Entwurf.');
  const lines = separated.split('\n').flatMap((line, row) => {
    const words = [...line.matchAll(/[\p{L}\p{M}\p{N}]+(?:·[\p{L}\p{M}\p{N}]+)*/gu)].map(match => match[0].split('·'));
    const validDots = [...line.matchAll(/[\p{L}\p{M}\p{N}]·(?=[\p{L}\p{M}\p{N}])/gu)].length;
    if (validDots !== [...line].filter(char => char === '·').length) throw Error('Setze Mittelpunkte nur zwischen zwei Buchstaben oder Ziffern.');
    if (!words.length) return [];
    const syllables = words.flat();
    if (syllables.length > 96) throw Error('Eine Zeile enthält mehr als 96 Silben. Untersuche einen kürzeren Ausschnitt.');
    return [{row, text: line.replaceAll('·', ''), separated: line, words, syllables}];
  });
  if (!lines.length) throw Error('Der Text enthält noch keine Wörter.');
  if (lines.length > 60) throw Error('Untersuche höchstens 60 Verse auf einmal.');
  return lines;
}

export function reconcileLines(parsed, previous = []) {
  const remaining = [...previous];
  return parsed.map(line => {
    const at = remaining.findIndex(old => old.text === line.text);
    const candidate = at < 0 ? null : remaining.splice(at, 1)[0];
    const old = candidate?.separated === line.separated ? candidate : null;
    const pattern = old && /^[01?]+$/.test(old.pattern) && old.pattern.length === line.syllables.length ? old.pattern : '?'.repeat(line.syllables.length);
    const pauses = old && Array.isArray(old.pauses) ? [...new Set(old.pauses.filter(i => Number.isInteger(i) && i > 0 && i < line.syllables.length))].sort((a, b) => a - b) : [];
    return {...line, pattern, pauses};
  });
}

export function updateDraftAnalysis(sourceText, previous = null) {
  const source = normalize(sourceText);
  let separated = suggestSegmentation(source);
  if (previous?.lines) {
    const remaining = [...previous.lines];
    separated = separated.split('\n').map(line => {
      const at = remaining.findIndex(old => old.text === line.replaceAll('·', ''));
      return at < 0 ? line : remaining.splice(at, 1)[0].separated;
    }).join('\n');
  }
  return {version: 1, source, separated, lines: reconcileLines(parseSegmentation(source, separated), previous?.lines)};
}

export function decodeDraftAnalysis(raw) {
  try {
    if (typeof raw !== 'string' || raw.length > 190000) return null;
    const data = JSON.parse(raw);
    if (data?.version !== 1 || typeof data.source !== 'string' || typeof data.separated !== 'string') return null;
    const parsed = parseSegmentation(data.source, data.separated);
    return {version: 1, source: normalize(data.source), separated: normalize(data.separated), lines: reconcileLines(parsed, Array.isArray(data.lines) ? data.lines : [])};
  } catch { return null; }
}

export function describeLine(pattern) {
  if (typeof pattern !== 'string' || !/^[01?]{1,96}$/.test(pattern)) throw Error('Ungültige Silbenmarkierung.');
  const open = [...pattern].filter(mark => mark === '?').length;
  if (open) return {open, marked: pattern.length - open, syllables: pattern.length, stresses: [...pattern].filter(mark => mark === '1').length};
  return {...scanPattern(pattern), open: 0, marked: pattern.length};
}

export function rhythmSteps(line) {
  if (describeLine(line.pattern).open) throw Error('Markiere zuerst alle Silben dieser Zeile.');
  return [...line.pattern].map((mark, index) => ({index, strong: mark === '1', units: line.pauses.includes(index + 1) ? 2 : 1}));
}
