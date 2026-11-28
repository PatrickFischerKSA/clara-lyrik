import test from 'node:test';
import assert from 'node:assert/strict';
import {activeWord,parseReadAlong,textParts,wordsOf} from '../dist/readalong.js';
import {READALONG_TEXTS} from '../dist/readalong-texts.js';
import {REEL_WRITING_PROMPTS,POEMS} from '../dist/inspiration.js';
const words=[{word:'ein',start:.2,end:.5},{word:'Wort,',start:.5,end:1},{word:'bleibt.',start:1.5,end:2}];
const file=JSON.stringify({text:'ein Wort,\nbleibt.',words});
test('word marking follows exact starts, ends, pauses and seeking in either direction',()=>{
 const cues=parseReadAlong(file).words;
 for(const [time,index] of [[0,-1],[.2,0],[.499,0],[.5,1],[1,-1],[1.5,2],[1.99,2],[2,-1],[50,-1],[.3,0],[-1,-1],[NaN,-1]])assert.equal(activeWord(cues,time),index);
});
test('token rendering preserves original whitespace, punctuation, Unicode and spelling',()=>{
 const text='ich weiß,\n\n  dass du bleibst.\t❤️';
 const parts=textParts(text);
 assert.equal(parts.map(part=>part.value).join(''),text);
 assert.deepEqual(parts.filter(part=>part.index!==undefined).map(part=>part.index),[0,1,2,3,4,5]);
 assert.deepEqual(wordsOf(text),['ich','weiß,','dass','du','bleibst.','❤️']);
});
test('timing import requires the exact text and rejects partial, overlapping or malformed cues',()=>{
 assert.throws(()=>parseReadAlong('{'),/JSON/);
 assert.throws(()=>parseReadAlong('null'),/Text/);
 assert.throws(()=>parseReadAlong(JSON.stringify({text:'ein Wort, bleibt.',words:words.slice(0,2)})),/genau/);
 assert.throws(()=>parseReadAlong(JSON.stringify({text:'ein Wort, bleibt.',words:[...words.slice(0,2),{word:'anders',start:2,end:3}]})),/stimmt/);
 for(const cue of [{word:'bleibt.',start:.9,end:2},{word:'bleibt.',start:2,end:2},{word:'bleibt.',start:'2',end:3},{word:'bleibt.',start:2,end:86401}])assert.throws(()=>parseReadAlong(JSON.stringify({text:'ein Wort, bleibt.',words:[...words.slice(0,2),cue]})),/Zeitmarke/);
 assert.throws(()=>parseReadAlong('x'.repeat(1000001)),/1 MB/);
});
test('local text and timings support export roundtrip without inventing missing timings',()=>{
 const checked=parseReadAlong(file);
 assert.deepEqual(parseReadAlong(JSON.stringify(checked)),checked);
 assert.deepEqual(parseReadAlong(JSON.stringify({text:'mein Text',words:[]})),{text:'mein Text',words:[]});
 assert.deepEqual(parseReadAlong(JSON.stringify({words}),'ein Wort,\nbleibt.').words,words);
 assert.throws(()=>parseReadAlong(JSON.stringify({text:'',words:[]})),/Textfassung/);
});
test('readalong book texts are linked only to verified reels and retain existing original excerpts',()=>{
 assert.deepEqual(Object.keys(READALONG_TEXTS).sort(),['C2UM_qzNwGl','DPSxE6-CFmU'].sort());
 for(const [id,record] of Object.entries(READALONG_TEXTS)){assert.ok(REEL_WRITING_PROMPTS.some(reel=>reel.id===id));assert.ok(record.pages.length);assert.ok(record.text.length>500);}
 assert.ok(READALONG_TEXTS.C2UM_qzNwGl.text.startsWith(POEMS.find(poem=>poem.id==='doener').text));
 assert.ok(READALONG_TEXTS['DPSxE6-CFmU'].text.includes(POEMS.find(poem=>poem.id==='schoenheit').text));
});
