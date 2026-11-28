import {MEDIA,TOPICS} from './data.js?v=2.5.0';
import {LEARNING_GRAMMARS} from './grammar-examples.js?v=2.5.0';
import {learningDrafts,fourVerseLines} from './grammar-tools.js?v=2.5.0';

export function workshopRoute(hash){
 const [path,query='']=String(hash).replace(/^#/,'').split('?');
 const media=path==='werkstatt'?MEDIA.find(m=>m.id===new URLSearchParams(query).get('hoerbeispiel'))||null:null;
 return {route:path,media};
}
export function listeningWorkshop(mediaId){
 const media=MEDIA.find(m=>m.id===mediaId),example=LEARNING_GRAMMARS.find(e=>e.id===media?.grammar);
 if(!media||!example)throw Error('Für dieses Hörbeispiel gibt es keinen Schreibauftrag.');
 const base=TOPICS.find(t=>t.id===media.transfer);
 return {media,example,context:'hoeren-'+media.id,topic:{...base,title:example.name,facts:example.facts||base.facts,terms:example.terms||base.terms,source:example.source,note:example.hint,verse:fourVerseLines(learningDrafts({...example,start:'S',count:1},()=>0).drafts[0])}};
}
