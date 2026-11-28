import test from 'node:test';
import assert from 'node:assert/strict';
import {LEARNING_GRAMMARS,exampleForTopic} from '../dist/bodo/grammar-examples.js';
import {learningDrafts,fourVerseLines} from '../dist/bodo/grammar-tools.js';
import {compileGrammar} from '../dist/grammar.js';
import {readWordFields,updateWordField,renameWordField} from '../dist/wordfields.js';
import {exportGrammar,importGrammar,putGrammar} from '../dist/library.js';
import {emptyJournal,decodeJournal,validateJournal} from '../dist/bodo/core.js';
import {TOPICS,SOURCES} from '../dist/bodo/data.js';
const entry=example=>({...example,start:'S',count:1});

test('Learning grammars cover all workshop subjects and own work, with connected sources',()=>{
 assert.equal(new Set(LEARNING_GRAMMARS.map(e=>e.id)).size,LEARNING_GRAMMARS.length);
 for(const topic of [...TOPICS.map(t=>t.id),'eigen'])assert.equal(exampleForTopic(topic).topic,topic);
 for(const e of LEARNING_GRAMMARS){assert.ok(e.task.length>50);assert.ok(e.hint.length>50);if(e.source)assert.ok(SOURCES.some(s=>s.id===e.source));assert.ok(readWordFields(e.words).every(f=>f.values));}
});
test('Every example yields four complete verse lines and reaches all fields at both choice extremes',()=>{
 for(const e of LEARNING_GRAMMARS)for(const choice of [0,.999]){
  const result=learningDrafts({...entry(e),count:3},()=>choice);
  assert.equal(result.drafts.length,3);assert.equal(result.warnings.length,0);
  for(const draft of result.drafts)assert.equal(fourVerseLines(draft).length,4);
  assert.match(result.trace,/S →/);
 }
});
test('Subject facts stay bound to the right verse when alternatives change',()=>{
 for(const choice of [0,.999]){
  const bio=fourVerseLines(learningDrafts(entry(exampleForTopic('bio')),()=>choice).drafts[0]);
  assert.ok(bio.every(l=>l.startsWith('Ich merke mir:')));assert.match(bio[0],/Ribosomen/);assert.match(bio[1],/bestimmte Proteine/i);assert.match(bio[2],/Lipide|Lipidsynthese/);assert.match(bio[3],/Golgi.*verändert|Golgi-Apparat verändert/);
  const history=fourVerseLines(learningDrafts(entry(exampleForTopic('history')),()=>choice).drafts[0]);
  assert.deepEqual(history.map(l=>l.slice(0,4)),['1848','1874','1999','2000']);assert.match(history[2],/nimmt|angenommen/);assert.match(history[3],/tritt in Kraft/);
  const german=fourVerseLines(learningDrafts(entry(exampleForTopic('deutsch')),()=>choice).drafts[0]);
  ['Der Hund','Des Hundes','Dem Hund','Den Hund'].forEach((words,i)=>assert.ok(german[i].includes(words)));
 }
});
test('Editing and renaming a learning word field affects generated text and keeps its references valid',()=>{
 const e=entry(exampleForTopic('math')),field=readWordFields(e.words)[0];
 e.words=updateWordField(e.words,field.index,['schreibe ich aufs Papier']);
 const renamed=renameWordField(e.rules,e.words,e.start,field.index,'Meine Merkwendung');
 Object.assign(e,{rules:renamed.rules,words:renamed.words,start:renamed.start});
 assert.equal(compileGrammar(e.rules,e.words,e.start).warnings.length,0);
 assert.match(learningDrafts(e,()=>0).drafts[0],/schreibe ich aufs Papier/);
});
test('Four-line transfer rejects incomplete or oversized drafts instead of dropping content',()=>{
 assert.deepEqual(fourVerseLines(' a\r\nb\r\nc\r\nd '),['a','b','c','d']);
 for(const text of ['a\nb\nc','a\nb\nc\nd\ne','a\n\nc\nd','x'.repeat(5001)+'\nb\nc\nd'])assert.throws(()=>fourVerseLines(text));
 assert.throws(()=>learningDrafts({...entry(exampleForTopic('math')),rules:'S -> Fehlt'}),/nicht definiert/);
 assert.throws(()=>learningDrafts({...entry(exampleForTopic('math')),rules:'S -> "'+('x'.repeat(2000))+'"',words:'',count:24}),/Ausgabe ist zu gross/);
});
test('Wartke journal includes named grammars, keeps older backups compatible and rejects invalid libraries',()=>{
 const journal=emptyJournal(),e=entry(exampleForTopic('physics'));
 journal.grammars=putGrammar([],importGrammar(exportGrammar(e)));
 assert.deepEqual(decodeJournal(JSON.stringify(journal)),journal);
 assert.deepEqual(decodeJournal('{"version":1,"notes":{},"attempts":[]}').grammars,[]);
 const copy=decodeJournal(JSON.stringify(journal));copy.grammars[0].words='changed';assert.notEqual(copy.grammars[0].words,journal.grammars[0].words);
 assert.equal(validateJournal({...journal,grammars:[e,e]}),false);
 assert.equal(validateJournal({...journal,grammars:'bad'}),false);
 assert.equal(validateJournal({...journal,grammars:[{...e,count:0}]}),false);
});
