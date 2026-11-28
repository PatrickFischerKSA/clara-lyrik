import test from 'node:test';
import assert from 'node:assert/strict';
import {suggestWord, suggestSegmentation, parseSegmentation, reconcileLines, updateDraftAnalysis, decodeDraftAnalysis, describeLine, rhythmSteps} from '../dist/draft-metre.js';
import {emptyJournal,decodeJournal,validateJournal} from '../dist/bodo/core.js';
import {validateSave} from '../dist/core.js';
import {decodeStudioBackup} from '../dist/studio-core.js';

test('Editable syllable suggestions preserve spelling, punctuation, stanza breaks and original hyphens', () => {
  for (const [word, expected] of [['Leise','Lei·se'],['fallen','fal·len'],['Blätter','Blät·ter'],['Wolken','Wol·ken'],['Dachdecker','Dach·de·cker'],['endoplasmatisches','en·do·plas·ma·ti·sches'],['Retikulum','Re·ti·ku·lum'],['Liebe','Lie·be'],['Nacht','Nacht'],['Tasche','Ta·sche']]) assert.equal(suggestWord(word), expected);
  const source = '«Leise fallen Blätter.»\n\nE-Mail, 2026!\nStrassen, Füße.';
  const separated = suggestSegmentation(source);
  assert.equal(separated.replaceAll('·',''), source);
  const lines = parseSegmentation(source,separated);
  assert.deepEqual(lines.map(line => line.row),[0,2,3]);
  assert.equal(lines[0].syllables.length, 6);
  assert.equal(suggestWord('See'),'See');
  assert.equal(suggestWord('Seele'),'See·le');
  assert.equal(suggestWord('Boot'),'Boot');
});

test('Manual corrections can split or join syllables but cannot silently change the poem', () => {
  const source = 'Ich gehe.\nDu bleibst.';
  assert.equal(parseSegmentation(source,'Ich gehe.\nDu bleibst.')[0].syllables.length,2);
  assert.equal(parseSegmentation(source,'Ich ge·he.\nDu bleibst.')[0].syllables.length,3);
  for (const bad of ['Ich gehe!\nDu bleibst.','Ich ge·he. Du bleibst.','·Ich gehe.\nDu bleibst.','Ich gehe.\nDu bleibst.·','Ich ge··he.\nDu bleibst.']) assert.throws(() => parseSegmentation(source,bad));
});

test('Refreshing a draft preserves corrections, marks and pauses in unchanged verses, including duplicate lines', () => {
  let analysis = updateDraftAnalysis('Ich gehe.\nLeise fallen Blätter.\nIch gehe.');
  analysis.lines[0].pattern = '010'; analysis.lines[0].pauses=[1];
  analysis.lines[2].pattern = '110';
  analysis.separated = analysis.separated.replace('Ich ge·he.', 'Ich gehe.');
  analysis.lines = reconcileLines(parseSegmentation(analysis.source,analysis.separated),analysis.lines);
  analysis.lines[0].pattern='11'; analysis.lines[0].pauses=[1];
  const next = updateDraftAnalysis('Neu!\nIch gehe.\nLeise fallen Blätter.\nIch gehe.',analysis);
  assert.equal(next.lines[0].pattern,'?');
  assert.equal(next.lines[1].separated,'Ich gehe.');
  assert.equal(next.lines[1].pattern,'11');
  assert.deepEqual(next.lines[1].pauses,[1]);
  assert.equal(next.lines[3].pattern,'110');
  const edited = updateDraftAnalysis('Ich bleibe.\nLeise fallen Blätter.', next);
  assert.equal(edited.lines[0].pattern,'???');
  assert.equal(analysis.source,'Ich gehe.\nLeise fallen Blätter.\nIch gehe.');
});

test('An incomplete scansion is not presented as a detected metre; a completed one uses the marked syllables', () => {
  assert.deepEqual(describeLine('?1?0'),{open:2,marked:2,syllables:4,stresses:1});
  assert.equal(describeLine('01010101').meter,'Jambus');
  assert.equal(describeLine('10101010').meter,'Trochäus');
  assert.equal(describeLine('0000').stresses,0);
  assert.throws(() => describeLine('1x0'));
});

test('Journal round trip validates saved syllables and prevents corrupt stress/pauses from entering the analysis', () => {
  const analysis = updateDraftAnalysis('Leise fallen Blätter.');
  analysis.lines[0].pattern='101010'; analysis.lines[0].pauses=[2,4];
  assert.deepEqual(decodeDraftAnalysis(JSON.stringify(analysis)),analysis);
  analysis.lines[0].pattern='1x'; analysis.lines[0].pauses=[0,2,2,99,'3'];
  const restored=decodeDraftAnalysis(JSON.stringify(analysis));
  assert.equal(restored.lines[0].pattern,'??????'); assert.deepEqual(restored.lines[0].pauses,[2]);
  for(const raw of ['null','{}','bad',JSON.stringify({...analysis,source:'Ein anderer Text.'})]) assert.equal(decodeDraftAnalysis(raw),null);
});

test('Rhythm playback follows explicit stresses and pauses; empty/oversized inputs are rejected without truncation', () => {
  assert.deepEqual(rhythmSteps({pattern:'010',pauses:[2]}),[{index:0,strong:false,units:1},{index:1,strong:true,units:2},{index:2,strong:false,units:1}]);
  assert.throws(() => rhythmSteps({pattern:'?1',pauses:[]}));
  for(const source of ['', '...','Wort '.repeat(100),'a'.repeat(12001),'Vers\n'.repeat(61)]) assert.throws(() => updateDraftAnalysis(source));
});

test('A long analysis remains valid in both workshop journals and survives the Wartke backup format', () => {
  const source = Array.from({length:60},()=>Array(96).fill('a').join(' ')).join('\n');
  const encoded = JSON.stringify(updateDraftAnalysis(source));
  assert.ok(encoded.length > 30000 && encoded.length <= 190000);
  assert.ok(decodeDraftAnalysis(encoded));
  const wartke = emptyJournal(); wartke.notes['draft-metre-v1'] = encoded;
  assert.ok(validateJournal(wartke));
  assert.equal(decodeJournal(JSON.stringify(wartke)).notes['draft-metre-v1'], encoded);
  assert.ok(validateSave({version:1,done:[],notes:{'draft-metre-v1':encoded}}));
  const backup={format:'lyrik-gemeinsam',version:1,notes:{},clara:JSON.stringify({version:1,done:[],notes:{'draft-metre-v1':encoded}}),wartke:JSON.stringify(wartke)};
  assert.deepEqual(decodeStudioBackup(JSON.stringify(backup)),backup);
  wartke.notes.other = 'x'.repeat(30001); assert.equal(validateJournal(wartke), false);
});
