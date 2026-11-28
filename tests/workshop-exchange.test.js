import test from 'node:test';
import assert from 'node:assert/strict';
import {exchangeCatalog,copyExchangeGrammar,copyExchangeWordField} from '../dist/workshop-exchange.js';
import {emptyJournal} from '../dist/bodo/core.js';
import {compileGrammar,generateFromGrammar} from '../dist/grammar.js';
import {readWordFields} from '../dist/wordfields.js';

const grammar={name:'Meine Wörter',rules:'S -> Bild',words:'Bild -> "Matrix" | "ein offenes Fenster"',start:'S',count:4};
test('Both workshop formats expose saved grammars and editor drafts, including separate hearing drafts',()=>{
 const clara={version:1,done:[],notes:{'grammar-rules':grammar.rules,'grammar-words':grammar.words,'grammar-name':'Aktuell','grammar-library':JSON.stringify([grammar]),poem:'bleibt privat'}};
 const wartke=emptyJournal();wartke.grammars=[grammar];Object.assign(wartke.notes,{'dg-math-rules':grammar.rules,'dg-math-words':grammar.words,'dg-hoeren-mito-rules':grammar.rules,'dg-hoeren-mito-words':grammar.words,'dg-hoeren-mito-name':'Mito-Versuch','dg-math-previous-rules':'S -> \"Alter Stand\"','dg-math-previous-words':'','clip-mito':'Eine Hörnotiz','ws-math-line-0':'Mein Vers'});
 assert.equal(exchangeCatalog('loesel',JSON.stringify(clara)).entries.length,2);
 const result=exchangeCatalog('wartke',JSON.stringify(wartke));assert.equal(result.entries.length,3);assert.ok(result.entries.some(e=>e.grammar.name==='Mito-Versuch'));
 assert.ok(!JSON.stringify(result).includes('Eine Hörnotiz'));assert.ok(!JSON.stringify(result).includes('Mein Vers'));
 assert.deepEqual(exchangeCatalog('loesel',null).entries,[]);
});
test('Exchange rejects incompatible storage and reports invalid draft settings without hiding valid saved work',()=>{
 for(const [source,raw] of [['unknown','{}'],['loesel','bad'],['loesel','{"version":2}'],['wartke','{}'],['wartke','x'.repeat(3000001)]])assert.throws(()=>exchangeCatalog(source,raw));
 const journal={version:1,done:[],notes:{'grammar-rules':'S -> "offen','grammar-count':'0','grammar-library':JSON.stringify([grammar])}};
 const result=exchangeCatalog('loesel',JSON.stringify(journal));assert.equal(result.entries.length,1);assert.equal(result.warnings.length,1);
 journal.notes['grammar-count']='1';assert.equal(exchangeCatalog('loesel',JSON.stringify(journal)).entries.length,2);
});
test('Whole grammar copies preserve unfinished rules and use collision-safe names without mutating the source',()=>{
 const source={...grammar,rules:'S -> "unfertig'};const library=[grammar,{...grammar,name:'Meine Wörter (Kopie 2)'}];
 const result=copyExchangeGrammar(library,source);assert.equal(result.entry.name,'Meine Wörter (Kopie 3)');assert.equal(result.entry.rules,source.rules);assert.equal(library.length,2);assert.equal(source.name,'Meine Wörter');
 result.entry.words='changed';assert.equal(source.words,grammar.words);
 const full=Array.from({length:30},(_,i)=>({...grammar,name:'Grammatik '+i}));assert.throws(()=>copyExchangeGrammar(full,grammar),/30/);assert.equal(full.length,30);
});
test('Individual fields are appended safely, preserving literals, existing references and draft text',()=>{
 const current={...grammar,words:'Bild -> "vorhanden"\nbild_2 -> "auch vorhanden"'},values=['<b>Bild</b> "ja" | nein','erste\nzweite','Pfad\\Name'];
 const copied=copyExchangeWordField(current,{name:'Bild',values},'BILD');
 assert.equal(copied.fieldName,'BILD_3');assert.equal(copied.rules,current.rules);assert.equal(copied.start,'S');assert.ok(copied.words.startsWith(current.words+'\n'));
 assert.deepEqual(readWordFields(copied.words).at(-1).values,values);assert.equal(values.length,3);
 assert.throws(()=>copyExchangeWordField(current,{name:'Leer',values:['']},'Leer'),/mindestens/);
});
test('An optional four-line rule keeps original rules and avoids start-symbol collisions',()=>{
 const current={...grammar,rules:'S -> Bild\nUebernahmeVerse -> "alt"'};
 const copied=copyExchangeWordField(current,{name:'Ort',values:['im Labor','am Fenster']},'Ort',true);
 assert.equal(copied.start,'UebernahmeVerse2');assert.equal(copied.count,1);assert.ok(copied.rules.startsWith(current.rules+'\n'));
 const text=generateFromGrammar(compileGrammar(copied.rules,copied.words,copied.start),1,()=>0).text;
 assert.deepEqual(text.split('\n'),Array(4).fill('im Labor'));assert.equal(current.start,'S');
});
