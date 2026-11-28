import test from 'node:test';
import assert from 'node:assert/strict';
import {collectNoteEntries,wordFieldFromNotes} from '../dist/bodo/hearing-notes.js';
import {readWordFields} from '../dist/wordfields.js';
import {learningDrafts,fourVerseLines} from '../dist/bodo/grammar-tools.js';

test('Collecting notes preserves original wording and adds only distinct non-empty lines',()=>{
 const note='  0:14 Cristae\r\nATP\r\n\r\nATP\r\n"Licht" | Frage?';
 assert.deepEqual(collectNoteEntries('Matrix\nATP',note),['Matrix','ATP','0:14 Cristae','"Licht" | Frage?']);
 assert.ok(note.includes('\r\n'));assert.deepEqual(collectNoteEntries('',''),[]);
 assert.throws(()=>collectNoteEntries('',Array.from({length:101},(_,i)=>'Eintrag '+i).join('\n')),/100/);
 assert.throws(()=>collectNoteEntries('','x'.repeat(20001)),/20.000/);
});
test('A note collection becomes an editable word field without changing existing rules or the start',()=>{
 const original={rules:'S -> "Mein bisheriger Vers"',words:'Alt -> "behalten"',start:'S'};
 const next=wordFieldFromNotes({...original,label:'Meine Hörwörter',collection:'Matrix\nATP\nATP'});
 assert.equal(next.rules,original.rules);assert.equal(next.start,'S');assert.ok(next.words.startsWith(original.words));
 assert.equal(next.name,'Meine_Hörwörter');assert.deepEqual(readWordFields(next.words).at(-1).values,['Matrix','ATP']);
 assert.throws(()=>wordFieldFromNotes({...original,label:'Alt',collection:'neu'}),/schon/);
 assert.throws(()=>wordFieldFromNotes({...original,label:'Notizen',collection:'  '}),/mindestens/);
});
test('Four note-based starters preserve previous rules and avoid existing rule names',()=>{
 const rules='S -> "Mein Gedicht"\nHoerverse -> "bleibt"\nHoerverse2 -> "auch"';
 const next=wordFieldFromNotes({rules,words:'',start:'S',label:'Hörwörter',collection:'ATP\nMatrix',beginVerses:true});
 assert.equal(next.start,'Hoerverse3');assert.ok(next.rules.startsWith(rules+'\n'));
 for(const random of [()=>0,()=>.999]){
  const lines=fourVerseLines(learningDrafts({...next,name:'Hörnotizen',count:1},random).drafts[0]);
  assert.deepEqual(lines.map(l=>l.split(':')[0]),['Ich erinnere mich','Ich ordne','Ich erkläre','Ich frage weiter']);
  assert.ok(lines.every(l=>l.endsWith(random()===0?'ATP':'Matrix')));
 }
});
test('Quotes, pipes, backslashes and markup in notes remain literal text',()=>{
 const literal='<img src=x> "ja" | Pfad\\Name';
 const next=wordFieldFromNotes({rules:'S -> "alt"',words:'',start:'S',label:'Notiz',collection:literal,beginVerses:true});
 assert.deepEqual(readWordFields(next.words).at(-1).values,[literal]);
 assert.ok(learningDrafts({...next,name:'Test',count:1}).drafts[0].includes(literal));
 assert.throws(()=>wordFieldFromNotes({rules:'S -> "'+ 'a'.repeat(29980)+'"',words:'',start:'S',label:'Notiz',collection:'zu viel Text',beginVerses:true}),/höchstens|zu gross/);
});
