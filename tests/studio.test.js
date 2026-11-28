import test from 'node:test';
import assert from 'node:assert/strict';
import {studioRoute,unitRoute,sharedCollection,decodeStudioBackup,validateStudioNotes} from '../dist/studio-core.js';
import {emptyJournal} from '../dist/bodo/core.js';
const grammar={name:'Ein Versuch',rules:'S -> Wort',words:'Wort -> "hier"',start:'S',count:1};
test('Unified routes preserve existing Clara links and Wartke hearing handoffs',()=>{
 assert.deepEqual(studioRoute(''),{page:'start'});
 assert.deepEqual(studioRoute('#werkstatt?editor=regeln'),{page:'unit',unit:'clara',hash:'#werkstatt?editor=regeln'});
 assert.deepEqual(studioRoute('#schreiben/wartke?hoerbeispiel=mito'),{page:'unit',unit:'wartke',hash:'#werkstatt?hoerbeispiel=mito'});
 assert.equal(unitRoute('wartke','#werkstatt?hoerbeispiel=er'),'#schreiben/wartke?hoerbeispiel=er');
 assert.equal(unitRoute('clara','#inspiration'),'#clara/inspiration');
 assert.deepEqual(studioRoute('#unbekannt'),{page:'start'});
});
test('The common collection combines drafts and libraries without changing journals or duplicating identical entries',()=>{
 const clara={version:1,done:[],notes:{'grammar-rules':grammar.rules,'grammar-words':grammar.words,'grammar-name':grammar.name,'grammar-count':'1','grammar-library':JSON.stringify([grammar]),draft:'mein Text'}};
 const wartke=emptyJournal();wartke.grammars=[grammar,{...grammar,name:'Zweiter Versuch'}];
 const a=JSON.stringify(clara),b=JSON.stringify(wartke),result=sharedCollection(a,b);
 assert.equal(result.entries.length,2);assert.equal(result.entries[0].origins.length,3);assert.equal(result.errors.length,0);
 assert.ok(!JSON.stringify(result).includes('mein Text'));assert.equal(JSON.stringify(clara),a);assert.equal(JSON.stringify(wartke),b);
 assert.equal(sharedCollection('bad',b).entries.length,2);assert.equal(sharedCollection('bad',b).errors.length,1);
});
test('A full journal backup preserves both legacy journals and common notes exactly',()=>{
 const backup={format:'lyrik-gemeinsam',version:1,notes:{start:'Matrix und Erinnerung','vergleich-eigen':'Ein eigener Text'},clara:JSON.stringify({version:1,done:['lesen'],notes:{draft:'unverändert'}}),wartke:JSON.stringify(emptyJournal())};
 assert.deepEqual(decodeStudioBackup(JSON.stringify(backup)),backup);
 assert.deepEqual(decodeStudioBackup(JSON.stringify({...backup,clara:null,wartke:null})).notes,backup.notes);
 for(const value of [{...backup,version:2},{...backup,notes:[]},{...backup,clara:'{}'},{...backup,wartke:'{}'}])assert.throws(()=>decodeStudioBackup(JSON.stringify(value)));
 assert.equal(validateStudioNotes({start:42}),false);assert.equal(validateStudioNotes(JSON.parse('{"__proto__":"bad"}')),false);
});
