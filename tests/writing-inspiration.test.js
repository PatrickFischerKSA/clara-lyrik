import test from 'node:test';
import assert from 'node:assert/strict';
import {WRITING_IDEAS,writingIdea,appendWorkshopText,collectWorkshopWords} from '../dist/writing-inspiration.js';
import {MEDIA} from '../dist/bodo/data.js';
import {REEL_WRITING_PROMPTS,POEMS} from '../dist/inspiration.js';

test('Every workshop video has a distinct concrete example and a non-empty word collection',()=>{
 for(const [unit,sources] of [['wartke',MEDIA],['clara',REEL_WRITING_PROMPTS]]){
  const ideas=WRITING_IDEAS[unit];assert.equal(new Set(ideas.map(i=>i.id)).size,sources.length);
  for(const source of sources){const idea=writingIdea(unit,source.id);assert.equal(idea.id,source.id);assert.equal(idea.example.split('\n').length,4);assert.ok(idea.observation.length>70);assert.ok(idea.idea.length>20);assert.ok(idea.words.length>=6);assert.equal(new Set(idea.words).size,idea.words.length);assert.ok(idea.try.length>40);assert.ok(!POEMS.some(poem=>poem.text===idea.example));}
 }
 assert.equal(new Set([...WRITING_IDEAS.wartke,...WRITING_IDEAS.clara].map(i=>i.example)).size,15);
});
test('Adding an example preserves a manual draft and its whitespace, without duplicate insertions',()=>{
 const before='Meine erste Zeile.\n  Meine zweite Zeile.  ',example=writingIdea('wartke','barbara').example;
 const after=appendWorkshopText(before,example);assert.ok(after.startsWith(before));assert.ok(after.endsWith(example));assert.equal(appendWorkshopText(after,example),after);
 assert.equal(appendWorkshopText('',example),example);assert.equal(appendWorkshopText(before,''),before);
 assert.throws(()=>appendWorkshopText('x'.repeat(29999),'y'));assert.throws(()=>appendWorkshopText(null,'a'));
});
test('Word collection appends whole entries and deduplicates within a batch without changing existing notes',()=>{
 const before='Meine Beobachtung bleibt.\nMondschein';
 const after=collectWorkshopWords(before,['Mondschein','Meer','Meer','Matrose']);assert.equal(after,before+'\n\nMeer\nMatrose');assert.equal(collectWorkshopWords(after,['Meer','Matrose']),after);
 assert.throws(()=>collectWorkshopWords('x'.repeat(29999),['Mondschein']));
});
test('Source lookup retains the chosen subject and falls back to a playable workshop source',()=>{
 assert.equal(writingIdea('wartke','grundgesetz').id,'grundgesetz');assert.equal(writingIdea('clara','DaUTcv1NQOr').id,'DaUTcv1NQOr');assert.equal(writingIdea('wartke','missing').id,'barbara');assert.ok(REEL_WRITING_PROMPTS.some(r=>r.id===writingIdea('clara',null).id));
});
