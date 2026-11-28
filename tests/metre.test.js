import test from 'node:test';
import assert from 'node:assert/strict';
import {METRE_CASES,metreCase,caseSyllables,scanPattern,decodeScansion,toggleStress} from '../dist/bodo/metre.js';

test('Every scansion has one mark per syllable and preserves the original short quotation',()=>{
 for(const item of METRE_CASES){assert.equal(caseSyllables(item).length,item.pattern.length);assert.ok(item.reading.length>70);for(const word of item.words)if(word.accents.length)assert.equal(word.accents.length,word.syllables.length);}
 assert.equal(metreCase('dach').words.map(w=>w.syllables.join('')).join(' '),'Der dicke Dachdecker deckt das Dach');
 assert.equal(caseSyllables(metreCase('dach')).length,9);assert.equal(caseSyllables(metreCase('er')).length,10);
});
test('Dachdecker has four stresses with variable filling; the technical term is not labelled as a regular metre',()=>{
 const dach=scanPattern(metreCase('dach').pattern);assert.deepEqual(dach.positions,[1,3,6,8]);assert.deepEqual(dach.gaps,[1,2,1]);assert.equal(dach.lead,1);assert.equal(dach.tail,0);assert.equal(dach.meter,null);
 const er=scanPattern(metreCase('er').pattern);assert.deepEqual(er.positions,[3,7]);assert.equal(er.tail,2);assert.equal(er.meter,null);
});
test('Regular comparisons identify all four metres, including the shortened final dactyl',()=>{
 for(const [id,meter,count,tail] of [['jambus','Jambus',4,0],['trochaeus','Trochäus',4,1],['daktylus','Daktylus',4,1],['anapaest','Anapäst',3,0]]){
  const scan=scanPattern(metreCase(id).pattern);assert.equal(scan.meter,meter);assert.equal(scan.stresses,count);assert.equal(scan.tail,tail);
 }
 assert.equal(scanPattern('000000').stresses,0);assert.equal(scanPattern('000000').lead,null);assert.equal(scanPattern('000000').meter,null);
});
test('Changing stresses changes the analysis without changing the text or saved model',()=>{
 const item=metreCase('anapaest'),pattern=toggleStress(item.pattern,6);assert.notEqual(pattern,item.pattern);assert.equal(item.pattern,'001001001');assert.equal(scanPattern(pattern).meter,null);assert.equal(scanPattern(pattern).stresses,4);
 for(const value of ['',null,'1x0','1'.repeat(97)])assert.throws(()=>scanPattern(value));assert.throws(()=>toggleStress('0101',4));
});
test('Scansion persistence validates marks and pauses and isolates each example',()=>{
 const item=metreCase('dach'),saved={pattern:'010100101',pauses:[6,3,6]};assert.deepEqual(decodeScansion(JSON.stringify(saved),item),{pattern:saved.pattern,pauses:[3,6]});
 for(const raw of ['bad','null','{}',JSON.stringify({pattern:'0101',pauses:[]}),JSON.stringify({pattern:item.pattern,pauses:[0]}),JSON.stringify({pattern:item.pattern,pauses:[9]})])assert.deepEqual(decodeScansion(raw,item),{pattern:item.pattern,pauses:[]});
 assert.deepEqual(decodeScansion(JSON.stringify(saved),metreCase('er')),{pattern:metreCase('er').pattern,pauses:[]});
});
