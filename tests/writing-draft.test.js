import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareWritingDraft} from '../dist/bodo/writing-draft.js';
test('Former generated suggestions are archived verbatim while the writing surface starts empty',()=>{
 for(const line of ['Quantenquark kam zu spät. Der Rest der Welt wartete schon.','Ich wollte Quantenquark erklären. Jetzt erklärt es mich.','Quantenquark. Q… Q… Wer oder was könnte hier auftauchen?']){
  const before={'spark-word':'Quantenquark','spark-line':line,'ws-math-line-0':'Mein Lernvers'},next=prepareWritingDraft(before);
  assert.equal(next['spark-line'],'');assert.equal(next['earlier-generated-line'],line);assert.equal(next['ws-math-line-0'],'Mein Lernvers');assert.equal(before['spark-line'],line);
  assert.deepEqual(prepareWritingDraft(next),next);
 }
});
test('Manual and edited drafts are retained exactly, including whitespace and line breaks',()=>{
 for(const line of ['','  Ein eigener Text.\nMit einer zweiten Zeile.  ','Quantenquark kam zu spät. Ich war längst gegangen.']){
  const next=prepareWritingDraft({'spark-line':line});assert.equal(next['spark-line'],line);assert.equal(next['earlier-generated-line'],undefined);
 }
});
