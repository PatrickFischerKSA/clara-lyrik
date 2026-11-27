import test from 'node:test';
import assert from 'node:assert/strict';
import {readWordFields,updateWordField,createWordField,renameWordField,deleteWordField,wordFieldUsage} from '../dist/wordfields.js';
import {GRAMMAR_EXAMPLES} from '../dist/examples.js';
import {compileGrammar,generateFromGrammar} from '../dist/grammar.js';

test('every example supports word editing and still generates with changed vocabulary',()=>{
 for(const example of GRAMMAR_EXAMPLES){
  const fields=readWordFields(example.words);
  assert.ok(fields.length>0,example.id);
  assert.ok(fields.every(field=>field.values!==null),example.id);
  const field=fields[0],words=updateWordField(example.words,field.index,['mein neues bild']);
  const result=generateFromGrammar(compileGrammar(example.rules,words,example.start),1,()=>0);
  assert.ok(result.text.includes('mein neues bild'),example.id);
 }
});
test('add, change and remove entries roundtrip quotes, delimiters, multiline text and inert markup',()=>{
 let text='Bild -> "alt" | "zweites bild"';
 const value='ein "Fenster" | # kein Kommentar\nmit \\ und\t<script>nichts()</script>';
 text=updateWordField(text,0,['alt','zweites bild',value]);
 assert.deepEqual(readWordFields(text)[0].values,['alt','zweites bild',value]);
 text=updateWordField(text,0,[value,'']);
 assert.deepEqual(readWordFields(text)[0].values,[value,'']);
 text=updateWordField(text,0,[value]);
 assert.equal(generateFromGrammar(compileGrammar('',text,'Bild'),1,()=>0).text.includes('<script>'),true);
 assert.throws(()=>updateWordField(text,0,[]),/mindestens/);
});
test('editing preserves comments, neighbouring rules and unfinished or complex syntax',()=>{
 const text='# Mein Feld\n  Bild -> \'licht # am rand\' | "wind" # behalten\n\nDing -> Bild "!"\nNoch -> "offen\nBild -> "zweite zeile"';
 const fields=readWordFields(text);
 assert.deepEqual(fields[0].values,['licht # am rand','wind']);
 assert.equal(fields[1].values,null);
 assert.equal(fields[2].values,null);
 const changed=updateWordField(text,1,['regen']);
 assert.equal(changed,'# Mein Feld\n  Bild -> "regen" # behalten\n\nDing -> Bild "!"\nNoch -> "offen\nBild -> "zweite zeile"');
 assert.throws(()=>updateWordField(text,3,['ändern']),/Textansicht/);
 assert.deepEqual(readWordFields(changed).at(-1).values,['zweite zeile']);
});
test('word-field editing rejects oversized input and invalid values without rewriting it',()=>{
 const text='Bild -> "licht"';
 assert.throws(()=>updateWordField(text,0,['a'.repeat(30000)]),/30.000/);
 assert.throws(()=>readWordFields('a'.repeat(30001)),/30.000/);
 assert.throws(()=>updateWordField(text,0,[{}]),/Eintrag/);
 assert.equal(text,'Bild -> "licht"');
});


test('new named fields preserve source and generate directly without rule syntax',()=>{
 const rules='S -> Bild',words='# meine Notiz\nBild -> "licht"';
 const created=createWordField(rules,words,'  Meine Farben  ',['tintenblau','ein "heller" Rand | # Licht']);
 assert.equal(created.name,'Meine_Farben');
 assert.ok(created.words.startsWith(words+'\n'));
 assert.deepEqual(readWordFields(created.words).at(-1).values,['tintenblau','ein "heller" Rand | # Licht']);
 assert.equal(generateFromGrammar(compileGrammar(rules,created.words,created.name),1,()=>0).text,'tintenblau');
 assert.equal(createWordField('','','Nähe',['eine offene Tür']).words,'Nähe -> "eine offene Tür"');
});
test('new fields reject duplicate rule names, invalid labels, empty entries and oversize input',()=>{
 for(const label of ['Bild','bild',' BILD '])assert.throws(()=>createWordField('Bild -> "vorhanden"','',label,['neu']),/schon/);
 assert.throws(()=>createWordField('','Meine_Farben -> "blau"','Meine Farben',['rot']),/schon/);
 assert.throws(()=>createWordField('Hoffnung ->','', 'Hoffnung',['morgen']),/schon/);
 for(const label of ['', '1Feld','Natur!', 'a'.repeat(61)])assert.throws(()=>createWordField('','',label,['neu']),/Namen/);
 for(const entries of [[],[''],['   '],[{}]])assert.throws(()=>createWordField('','','Natur',entries),/mindestens/);
 assert.throws(()=>createWordField('a'.repeat(30000),'','Natur',['regen']),/30.000/);
 const unfinished='Bild -> "offen';
 assert.ok(createWordField('',unfinished,'Natur',['regen']).words.startsWith(unfinished+'\n'));
});


test('renaming every example updates references while preserving generated words',()=>{
 for(const example of GRAMMAR_EXAMPLES){
  const field=readWordFields(example.words)[0];
  const next=renameWordField(example.rules,example.words,example.start,field.index,'Eigene Bilder');
  const generate=(rules,words,start)=>generateFromGrammar(compileGrammar(rules,words,start),1,()=>0).text;
  assert.equal(generate(next.rules,next.words,next.start),generate(example.rules,example.words,example.start),example.id);
  assert.deepEqual(readWordFields(next.words)[0].values,field.values);
 }
});
test('renaming changes exact symbols including compact arrows, word-field references and the start symbol',()=>{
 const rules=String.raw`# Nähe stays in this comment
S->Nähe | Naehe | "Nähe" | 'Nähe' | "ein \"Nähe\"" # Nähe
Naehe -> "Nähe"`;
 const words='Nähe -> "Nähe ist ein Wort" # Nähe\nAntwort->Nähe\nNoch -> "Nähe"';
 const next=renameWordField(rules,words,' Nähe ',0,'Neue Nähe');
 assert.equal(next.start,'Neue_Nähe');
 assert.equal(next.rules,rules.replace('S->Nähe','S->Neue_Nähe'));
 assert.equal(next.words,'Neue_Nähe -> "Nähe ist ein Wort" # Nähe\nAntwort->Neue_Nähe\nNoch -> "Nähe"');
 assert.equal(wordFieldUsage(next.rules,next.words,next.start,0).referenceCount,2);
 assert.throws(()=>renameWordField(rules,words,'S',0,'naehe'),/schon/);
 assert.throws(()=>renameWordField(rules,words,'S',0,'Noch'),/schon/);
 assert.throws(()=>renameWordField(rules,words,'S',0,'1 falsch'),/Namen/);
});
test('deleting unused fields preserves neighbouring text and blocks referenced fields without replacement',()=>{
 const rules='S -> Bild',words='# behalten\nBild -> "licht"\nNatur -> "regen" # eigene Sammlung';
 const unused=deleteWordField(rules,words,'S',2);
 assert.equal(unused.words,'# behalten\nBild -> "licht"');
 assert.equal(unused.rules,rules);assert.equal(unused.start,'S');
 assert.equal(wordFieldUsage(rules,words,'S',2).used,false);
 assert.throws(()=>deleteWordField(rules,words,'S',1),/noch verwendet/);
 assert.throws(()=>deleteWordField('',words,' Natur ',2),/noch verwendet/);
 assert.throws(()=>deleteWordField(rules,words,'S',1,'Bild'),/anderes/);
 assert.throws(()=>deleteWordField(rules,words,'S',1,'Fehlt'),/anderes/);
});
test('deleting a used field redirects references and the start symbol to a selected replacement',()=>{
 const rules='S->Bild "Bild" # Bild';
 const words='Bild -> "licht"\nNatur -> "regen"\nAntwort -> Bild';
 const next=deleteWordField(rules,words,'Bild',0,'Natur');
 assert.deepEqual(next,{rules:'S->Natur "Bild" # Bild',words:'Natur -> "regen"\nAntwort -> Natur',start:'Natur'});
 const grammar=compileGrammar(next.rules,next.words,next.start);
 assert.equal(generateFromGrammar(grammar,1,()=>0).text,'regen');
});
