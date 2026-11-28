import test from 'node:test';
import assert from 'node:assert/strict';
import {MEDIA,SOURCES,TOPICS,FORM_LINES,FORMS,FACT_CHECKS} from '../dist/bodo/data.js';
import {emptyJournal,validateJournal,decodeJournal,startRecall,hideRecall,compareRecall,scoreRecall,saveAttempt,termCoverage,rhymeScheme,endWords} from '../dist/bodo/core.js';

test('Wartke sources, official players and cross-subject exercises stay connected',()=>{
 const ids=new Set(SOURCES.map(s=>s.id));
 assert.equal(ids.size,SOURCES.length);
 for(const s of [...SOURCES,...MEDIA])assert.equal(new URL(s.url).protocol,'https:');
 assert.equal(new Set(MEDIA.map(m=>m.id)).size,MEDIA.length);
 for(const m of MEDIA){assert.ok(TOPICS.some(t=>t.id===m.transfer));assert.match(m.video,m.kind==='youtube'?/^[\w-]{11}$/:/^\d+$/);}
 assert.ok(TOPICS.filter(t=>t.subject!=='Biologie').length>=3);
 for(const t of TOPICS){assert.ok(ids.has(t.source));for(const key of ['facts','verse','questions','answers'])assert.equal(t[key].length,4);}
 for(const f of FACT_CHECKS)assert.ok(ids.has(f.source));
});
test('Reordering preserves all lines and yields the advertised rhyme schemes',()=>{
 for(const form of Object.values(FORMS)){
  assert.deepEqual([...form.order].sort(),[0,1,2,3]);
  assert.equal(rhymeScheme(form.order.map(i=>FORM_LINES[i].group)),form.scheme);
 }
});
test('Recall requires study, hidden recall, then comparison; answers are independent copies',()=>{
 const study=startRecall('math','facts');
 assert.throws(()=>compareRecall(study,['','','','']));
 assert.throws(()=>saveAttempt(emptyJournal(),study));
 const hidden=hideRecall(study);assert.equal(study.stage,'study');assert.equal(hidden.stage,'recall');
 assert.throws(()=>hideRecall(hidden));
 const answers=['hundert','1','1/2','1/4'];const result=compareRecall(hidden,answers);answers[0]='changed';
 assert.equal(result.answers[0],'hundert');assert.equal(result.stage,'compare');
 assert.throws(()=>startRecall('unknown','verse'));assert.throws(()=>startRecall('math','unknown'));
 assert.equal(scoreRecall([true,false,true,false]),2);assert.throws(()=>scoreRecall([1,1,1,1]));
});
const attempt=()=>({...compareRecall(hideRecall(startRecall('math','verse')),['a','b','c','d']),checks:[true,true,false,true]});
test('Journal saves independent attempts, caps history, and survives export/import',()=>{
 const original=emptyJournal();original.notes['ws-math-line-0']='Ein eigener Vers';const session=attempt();
 let saved=saveAttempt(original,session,'2026-11-28T09:00:00Z');session.answers[0]='changed';
 assert.equal(original.attempts.length,0);assert.equal(saved.attempts[0].answers[0],'a');
 for(let i=0;i<45;i++)saved=saveAttempt(saved,attempt(),'2026-11-28T09:00:00Z');
 assert.equal(saved.attempts.length,40);assert.deepEqual(decodeJournal(JSON.stringify(saved)),saved);
});
test('Import rejects invalid, oversized and unexpected journal data',()=>{
 for(const value of [null,[],{version:2,notes:{},attempts:[]},{version:1,notes:[],attempts:[]},{version:1,notes:{x:7},attempts:[]},JSON.parse('{"version":1,"notes":{"__proto__":"bad"},"attempts":[]}')])assert.equal(validateJournal(value),false);
 for(const patch of [{date:'invalid'},{topic:'unknown'},{mode:'unknown'},{answers:['one']},{checks:[1,1,1,1]}]){
  const valid=saveAttempt(emptyJournal(),attempt(),'2026-11-28T09:00:00Z');Object.assign(valid.attempts[0],patch);assert.throws(()=>decodeJournal(JSON.stringify(valid)));
 }
 assert.throws(()=>decodeJournal('not JSON'));assert.throws(()=>decodeJournal('x'.repeat(1000001)));
 const huge=emptyJournal();huge.notes.x='a'.repeat(30001);assert.equal(validateJournal(huge),false);
});
test('Fachwort lookup respects word boundaries, literal syntax and Unicode',()=>{
 assert.deepEqual(termCoverage('Wegstrecke, a+b und Ha\u0308lfte',['Weg','a+b','Hälfte']).map(t=>t.found),[false,true,true]);
 assert.deepEqual(termCoverage('Der WEG!',['Weg','weggehen']).map(t=>t.found),[true,false]);
 assert.deepEqual(endWords(['Ein Ende!','Eine Zahl: 1848.','  ','Überraschung …']),['Ende','1848','…','Überraschung']);
});
