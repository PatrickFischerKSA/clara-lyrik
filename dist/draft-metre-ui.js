import {decodeDraftAnalysis, updateDraftAnalysis, parseSegmentation, reconcileLines, describeLine, rhythmSteps} from './draft-metre.js?v=2.5.0';

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const KEY = 'draft-metre-v1';
export const draftMetreHTML = () => '<section id="draft-metre" class="draft-metre" aria-label="Metrische Analyse eigener Verse"></section>';

export function mountDraftMetre(root, {sources, note, setNote, originalLink}) {
  let analysis = decodeDraftAnalysis(note(KEY, '')), sourceId = sources.some(item => item.id === note('draft-metre-source')) ? note('draft-metre-source') : sources[0].id;
  let audio = null, timers = [], playing = null, stopped = false, playback = 0;
  const getSource = () => sources.find(item => item.id === sourceId) || sources[0];
  const save = () => setNote(KEY, JSON.stringify(analysis));
  const message = text => { root.querySelector('#dm-status').textContent = text; };
  const listen = (element, name, handler) => element.addEventListener(name, handler, {signal: controller.signal});
  const controller = new AbortController();

  root.innerHTML = `<h2>Metrische Analyse</h2><p>Teile deinen Text in Silben auf und markiere beim lauten Lesen, was du betonst.</p>${sources.length > 1 ? `<label class="field" for="dm-source">Text aus</label><select id="dm-source">${sources.map(item => `<option value="${esc(item.id)}">${esc(item.label)}</option>`).join('')}</select>` : ''}<div class="actions"><button id="dm-load">${sources.length > 1 ? 'Text in Silben aufteilen' : 'Entwurf in Silben aufteilen'}</button>${originalLink ? `<a href="${esc(originalLink)}">Originalstellen vergleichen</a>` : ''}</div><p id="dm-stale" class="dm-notice" hidden>Der Text wurde geändert. Mit «Text aktualisieren» übernimmst du die neue Fassung. Unveränderte Verse behalten ihre Markierungen.</p><div id="dm-status" class="small" role="status" aria-live="polite"></div><div id="dm-work"></div>`;

  function stop() {
    playback++;
    for (const timer of timers) clearTimeout(timer);
    timers = [];
    playing = null;
    root.querySelectorAll('.dm-playing').forEach(element => element.classList.remove('dm-playing'));
    root.querySelectorAll('[data-dm-play]').forEach(button => {button.textContent = 'Markierung anhören'; button.setAttribute('aria-pressed', 'false');});
  }

  function stale() {
    if (stopped) return;
    const changed = analysis && getSource().getText().replace(/\r\n?/g, '\n').normalize('NFC') !== analysis.source;
    root.querySelector('#dm-stale').hidden = !changed;
    root.querySelector('#dm-load').textContent = analysis ? 'Text aktualisieren' : sources.length > 1 ? 'Text in Silben aufteilen' : 'Entwurf in Silben aufteilen';
  }

  function draw() {
    const work = root.querySelector('#dm-work');
    if (!analysis) {work.innerHTML = ''; stale(); return;}
    work.innerHTML = `<details class="dm-separation"><summary>Silbentrennung bearbeiten</summary><p class="small">Die automatische Trennung ist ein Vorschlag. Setze oder entferne Mittelpunkte (·), etwa «Wol·ken». Wortlaut und Zeilenumbrüche bleiben gleich. Zusammengesetzte Wörter, Fremdwörter und verkürzte Aussprache bitte prüfen.</p><label class="field" for="dm-separated">Silben deines Textes</label><textarea id="dm-separated" rows="5" spellcheck="false" aria-describedby="dm-separation-status"></textarea><div class="actions"><button id="dm-dot">Mittelpunkt einsetzen</button><button id="dm-apply">Trennung übernehmen</button></div><p id="dm-separation-status" class="small" role="status" aria-live="polite"></p></details><p class="small dm-legend">? noch offen · / betont · ∪ unbetont · | Pause<br>Ein Klick setzt eine Betonung; weitere Klicks wechseln zwischen betont und unbetont. Die Punkte zwischen den Silben setzen Pausen.</p><div class="dm-tempo"><label for="dm-tempo">Klicktempo: <output id="dm-tempo-value">${esc(note('draft-metre-tempo', '120'))}</output> Silben pro Minute</label><input id="dm-tempo" type="range" min="60" max="240" step="10" value="120"><span class="small">Starke und leise Klicks folgen deiner Markierung. Eine Pause verlängert den Abstand.</span></div><div id="dm-lines"></div><p class="small dm-saved">Trennung und Markierungen werden mit deinem Journal in diesem Browser gespeichert.</p>`;
    const field = root.querySelector('#dm-separated');
    field.value = analysis.separated;
    const tempo = Number(note('draft-metre-tempo', '120'));
    root.querySelector('#dm-tempo').value = Number.isFinite(tempo) ? Math.max(60, Math.min(240, tempo)) : 120;
    root.querySelector('#dm-tempo-value').textContent = root.querySelector('#dm-tempo').value;
    root.querySelector('#dm-tempo').oninput = event => {stop(); root.querySelector('#dm-tempo-value').textContent = event.target.value; setNote('draft-metre-tempo', event.target.value);};
    root.querySelector('#dm-dot').onclick = () => {const start = field.selectionStart; field.setRangeText('·', start, field.selectionEnd, 'end'); field.focus({preventScroll:true});};
    root.querySelector('#dm-apply').onclick = () => {
      try {
        const lines = reconcileLines(parseSegmentation(analysis.source, field.value), analysis.lines);
        const changed = lines.filter((line, index) => line.separated !== analysis.lines[index]?.separated).length;
        stop(); analysis = {...analysis, separated: field.value.replace(/\r\n?/g, '\n').normalize('NFC'), lines}; save(); drawLines();
        root.querySelector('#dm-separation-status').textContent = changed ? 'Trennung übernommen. Markiere die veränderten Verse neu.' : 'Trennung übernommen.';
      } catch (error) {root.querySelector('#dm-separation-status').textContent = error.message;}
    };
    drawLines(); stale();
  }

  function drawLines() {
    root.querySelector('#dm-lines').innerHTML = analysis.lines.map((line, row) => `<article class="dm-line" data-dm-line="${row}"><h3>Vers ${line.row + 1}</h3><p class="dm-original">${esc(line.text)}</p><div class="metric-score">${syllablesHTML(line, row)}</div><div class="actions"><button data-dm-fill="${row}">Übrige Silben unbetont</button><button data-dm-clear="${row}">Markierungen zurücksetzen</button><button data-dm-play="${row}" aria-pressed="false" ${line.pattern.includes('?') ? 'disabled' : ''}>Markierung anhören</button></div><div class="dm-result" role="status" aria-live="polite">${resultHTML(line)}</div></article>`).join('') + comparisonHTML();
    root.querySelectorAll('[data-dm-syllable]').forEach(button => button.onclick = () => {
      stop(); const [row, index] = button.dataset.dmSyllable.split(':').map(Number), line = analysis.lines[row];
      line.pattern = line.pattern.slice(0, index) + (line.pattern[index] === '1' ? '0' : '1') + line.pattern.slice(index + 1);
      save(); drawLines(); root.querySelector(`[data-dm-syllable="${row}:${index}"]`).focus({preventScroll:true});
    });
    root.querySelectorAll('[data-dm-pause]').forEach(button => button.onclick = () => {
      stop(); const [row, at] = button.dataset.dmPause.split(':').map(Number), line = analysis.lines[row];
      line.pauses = line.pauses.includes(at) ? line.pauses.filter(index => index !== at) : [...line.pauses, at].sort((a,b) => a-b);
      save(); drawLines(); root.querySelector(`[data-dm-pause="${row}:${at}"]`).focus({preventScroll:true});
    });
    root.querySelectorAll('[data-dm-fill]').forEach(button => button.onclick = () => {stop(); const row = Number(button.dataset.dmFill); analysis.lines[row].pattern = analysis.lines[row].pattern.replaceAll('?', '0'); save(); drawLines(); root.querySelector(`[data-dm-fill="${row}"]`).focus({preventScroll:true});});
    root.querySelectorAll('[data-dm-clear]').forEach(button => button.onclick = () => {stop(); const row = Number(button.dataset.dmClear), line = analysis.lines[row]; line.pattern = '?'.repeat(line.pattern.length); line.pauses = []; save(); drawLines(); root.querySelector(`[data-dm-clear="${row}"]`).focus({preventScroll:true});});
    root.querySelectorAll('[data-dm-play]').forEach(button => button.onclick = () => play(Number(button.dataset.dmPlay)));
  }

  function syllablesHTML(line, row) {
    let index = 0;
    return line.words.map(word => `<span class="metric-word">${word.map(text => {
      const i = index++, mark = line.pattern[i], pause = line.pauses.includes(i + 1);
      return `<button class="metric-syllable ${mark === '1' ? 'stressed' : mark === '?' ? 'dm-unmarked' : ''}" data-dm-syllable="${row}:${i}" aria-label="${esc(text)} · ${mark === '1' ? 'betont' : mark === '0' ? 'unbetont' : 'noch offen'}" aria-pressed="${mark === '?' ? 'mixed' : mark === '1'}"><span class="metric-mark" aria-hidden="true">${mark === '1' ? '/' : mark === '0' ? '∪' : '?'}</span><span>${esc(text)}</span></button>${i < line.pattern.length - 1 ? `<button class="metric-boundary ${pause ? 'has-pause' : ''}" data-dm-pause="${row}:${i+1}" aria-label="Pause nach ${esc(text)}" aria-pressed="${pause}">${pause ? '|' : '·'}</button>` : ''}`;
    }).join('')}</span>`).join('');
  }

  function resultHTML(line) {
    const result = describeLine(line.pattern);
    if (result.open) return `<p>${result.syllables} Silben · ${result.marked} von ${result.syllables} markiert · ${result.stresses} ${result.stresses === 1 ? 'Hebung' : 'Hebungen'}</p><p class="small">Markiere die betonten Silben. Mit «Übrige Silben unbetont» schliesst du die Zeile ab.</p>`;
    const gap = result.gaps.length ? result.gaps.join(' · ') : '–';
    return `<dl><div><dt>Silben</dt><dd>${result.syllables}</dd></div><div><dt>Hebungen</dt><dd>${result.stresses}</dd></div><div><dt>Auftakt</dt><dd>${result.lead === null ? '–' : result.lead + (result.lead === 1 ? ' Silbe' : ' Silben')}</dd></div><div><dt>Kadenz</dt><dd>${esc(result.cadence)}</dd></div></dl><p>${result.meter ? `<strong>${result.meter}</strong> · Die markierte Folge passt zu diesem Grundmuster.` : result.stresses < 2 ? 'Weniger als zwei Hebungen: kein Versmassvergleich.' : 'Die markierte Folge entspricht keinem durchgehenden Jambus, Trochäus, Daktylus oder Anapäst.'}</p><p class="small">Senkungen zwischen den Hebungen: ${gap}. ${line.pauses.length} ${line.pauses.length === 1 ? 'Pause' : 'Pausen'}.</p>`;
  }

  function comparisonHTML() {
    if (analysis.lines.length < 2) return '';
    return `<section class="dm-comparison"><h3>Zeilen im Vergleich</h3><p class="small">Die Zahlen zeigen die Silben zwischen zwei Hebungen. Unterschiedliche Abstände können beim Vorlesen bewusst hörbar werden.</p>${analysis.lines.map(line => {
      const result = describeLine(line.pattern);
      return `<p><strong>Vers ${line.row+1}:</strong> ${result.syllables} Silben · ${result.open ? 'Markierung noch offen' : result.stresses + ' Hebungen · Senkungen: ' + (result.gaps.join(' · ') || '–')}</p>`;
    }).join('')}</section>`;
  }

  async function play(row) {
    if (playing === row) {stop(); return;}
    stop();
    const request = playback;
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) throw Error('Die Klangwiedergabe ist in diesem Browser nicht verfügbar.');
      audio ??= new Audio(); await audio.resume();
      if (stopped || !root.isConnected || request !== playback) return;
      const steps = rhythmSteps(analysis.lines[row]), interval = 60000 / Number(root.querySelector('#dm-tempo').value);
      playing = row;
      const button = root.querySelector(`[data-dm-play="${row}"]`); button.textContent = 'Wiedergabe stoppen'; button.setAttribute('aria-pressed','true');
      let offset = 0;
      for (const step of steps) {
        const delay = offset;
        timers.push(setTimeout(() => {
          root.querySelectorAll('.dm-playing').forEach(element => element.classList.remove('dm-playing'));
          root.querySelector(`[data-dm-syllable="${row}:${step.index}"]`)?.classList.add('dm-playing');
          const oscillator = audio.createOscillator(), gain = audio.createGain(), time = audio.currentTime;
          oscillator.frequency.value = step.strong ? 660 : 330;
          gain.gain.setValueAtTime(step.strong ? .12 : .035, time);
          gain.gain.exponentialRampToValueAtTime(.001, time+.065);
          oscillator.connect(gain).connect(audio.destination); oscillator.start(time); oscillator.stop(time+.075);
        }, delay));
        offset += interval * step.units;
      }
      timers.push(setTimeout(stop, offset));
      message('Klickfolge deiner Markierung. Lies den Vers dazu.');
    } catch (error) {stop(); message(error.message || 'Die Klangwiedergabe konnte nicht starten.');}
  }

  root.querySelector('#dm-load').onclick = () => {
    try {const next = updateDraftAnalysis(getSource().getText(), analysis); stop(); analysis = next; save(); draw(); message('Silbentrennung vorgeschlagen. Prüfe sie unter «Silbentrennung bearbeiten».');}
    catch (error) {message(error.message);}
  };
  if (sources.length > 1) {
    root.querySelector('#dm-source').value = sourceId;
    root.querySelector('#dm-source').onchange = event => {sourceId = event.target.value; setNote('draft-metre-source',sourceId); stop(); stale();};
  }
  listen(document, 'input', stale);
  listen(document, 'click', () => queueMicrotask(stale));
  listen(document, 'visibilitychange', () => {if (document.hidden) stop();});
  listen(window, 'pagehide', stop);
  draw();
  return () => {stopped = true; stop(); controller.abort(); if (audio) {audio.close().catch(() => {}); audio = null;}};
}
