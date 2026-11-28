import test from 'node:test';
import assert from 'node:assert/strict';
import {MEDIA,TOPICS,SOURCES} from '../dist/bodo/data.js';
import {LEARNING_GRAMMARS} from '../dist/bodo/grammar-examples.js';
import {workshopRoute,listeningWorkshop} from '../dist/bodo/listening-links.js';
import {learningDrafts,fourVerseLines} from '../dist/bodo/grammar-tools.js';

test('Every original has a distinct matching grammar, an actionable prompt and a shareable route',()=>{
 assert.equal(new Set(MEDIA.map(m=>m.grammar)).size,MEDIA.length);
 for(const media of MEDIA){
  const example=LEARNING_GRAMMARS.find(e=>e.id===media.grammar);
  assert.ok(example);assert.equal(example.topic,media.transfer);assert.ok(media.writing.length>60);
  assert.equal(workshopRoute('#werkstatt?hoerbeispiel='+media.id).media.id,media.id);
  assert.equal(workshopRoute('#werkstatt?hoerbeispiel='+media.id).route,'werkstatt');
 }
 assert.equal(workshopRoute('#werkstatt?hoerbeispiel=unknown').media,null);
 assert.equal(workshopRoute('#hoeren?hoerbeispiel=er').media,null);
 assert.equal(workshopRoute('#werkstatt').media,null);
 assert.throws(()=>listeningWorkshop('unknown'));
});
test('Hearing drafts have separate storage contexts and matching facts, sources and example verses',()=>{
 const contexts=MEDIA.map(m=>listeningWorkshop(m.id));
 assert.equal(new Set(contexts.map(c=>c.context)).size,MEDIA.length);
 for(const c of contexts){
  assert.notEqual(c.context,c.topic.id);assert.equal(c.topic.facts.length,4);assert.equal(c.topic.verse.length,4);
  assert.ok(SOURCES.some(s=>s.id===c.topic.source));
  assert.equal(c.example.id,c.media.grammar);
  assert.deepEqual(fourVerseLines(learningDrafts({...c.example,start:'S',count:1},()=>0).drafts[0]),c.topic.verse);
 }
 const mito=listeningWorkshop('mito');
 assert.ok(mito.topic.facts.every(f=>!f.includes('Golgi')));
 assert.match(mito.topic.facts.join(' '),/Cristae.*Matrix.*ATP/);
 assert.notDeepEqual(mito.topic.facts,TOPICS.find(t=>t.id==='bio').facts);
 assert.match(listeningWorkshop('barbara').topic.facts.join(' '),/Grundwort/);
 assert.match(listeningWorkshop('dach').topic.facts.join(' '),/Alliteration/);
 assert.ok(TOPICS.find(t=>t.id==='bio').facts.some(f=>f.includes('Golgi')));
});

test('Non-biology originals lead to their own subjects, never the Swiss chronology exercise',()=>{
 const expected={grundgesetz:'politik',schriften:'ethik',wald:'geografie'};
 for(const [id,subject] of Object.entries(expected)){
  const handoff=listeningWorkshop(id);
  assert.equal(handoff.media.transfer,subject);
  assert.equal(handoff.example.topic,subject);
  assert.equal(new URL(handoff.media.official).hostname,'www.bodowartke.de');
  assert.ok(handoff.media.category);
  assert.notDeepEqual(handoff.topic.facts,TOPICS.find(t=>t.id==='history').facts);
 }
 assert.ok(!MEDIA.some(m=>['math','physics','history'].includes(m.transfer)));
 assert.match(listeningWorkshop('grundgesetz').media.description,/Deutschland.*Schweizer/);
});
