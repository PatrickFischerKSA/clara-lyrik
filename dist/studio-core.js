import {exchangeCatalog} from './workshop-exchange.js?v=2.5.0';
import {validateSave} from './core.js?v=2.5.0';
import {decodeJournal} from './bodo/core.js?v=2.5.0';
export const STUDIO_KEY='lyrik-gemeinsam-v1';
export function studioRoute(hash){
 const raw=String(hash||'').replace(/^#/,''),[path,query='']=raw.split('?'),parts=path.split('/');
 if(!path||path==='start')return {page:'start'};
 if(path==='sammlung'||path==='vergleich')return {page:path};
 if(parts[0]==='schreiben')return {page:'unit',unit:parts[1]==='wartke'?'wartke':'clara',hash:'#werkstatt'+(query?'?'+query:'')};
 if(['clara','wartke'].includes(parts[0]))return {page:'unit',unit:parts[0],hash:'#'+(parts[1]|| (parts[0]==='clara'?'ankommen':'start'))+(query?'?'+query:'')};
 if(['ankommen','lesen','hoeren','rhythmus','werkstatt','inspiration'].includes(path))return {page:'unit',unit:'clara',hash:'#'+raw};
 return {page:'start'};
}
export function unitRoute(unit,hash){
 const safe=unit==='wartke'?'wartke':'clara',raw=String(hash||'').replace(/^#/,'');
 return raw.split('?')[0]==='werkstatt'?'#schreiben/'+safe+(raw.includes('?')?'?'+raw.split('?')[1]:''):'#'+safe+'/'+(raw||(safe==='clara'?'ankommen':'start'));
}
export function sharedCollection(claraRaw,wartkeRaw){
 const entries=[],errors=[];
 for(const [source,raw] of [['loesel',claraRaw],['wartke',wartkeRaw]]){
  try{for(const item of exchangeCatalog(source,raw).entries){const key=JSON.stringify(item.grammar),existing=entries.find(e=>e.key===key);if(existing)existing.origins.push(item.label);else entries.push({...item,key,unit:source==='loesel'?'clara':'wartke',origins:[item.label]});}}
  catch(error){errors.push((source==='loesel'?'Lösel':'Wartke')+': '+error.message);}
 }
 return {entries,errors};
}
export function validateStudioNotes(value){return value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length<=100&&JSON.stringify(value).length<=1000000&&Object.entries(value).every(([k,v])=>/^[a-z0-9-]{1,80}$/.test(k)&&typeof v==='string'&&v.length<=30000);}
export function decodeStudioBackup(raw){
 if(typeof raw!=='string'||raw.length>10000000)throw Error('Die Sicherung ist zu gross.');
 let value;try{value=JSON.parse(raw);}catch{throw Error('Die Sicherung ist keine gültige JSON-Datei.');}
 if(value?.format!=='lyrik-gemeinsam'||value.version!==1||!validateStudioNotes(value.notes))throw Error('Keine passende Sicherung der gemeinsamen Werkstatt.');
 if(value.clara!==null){if(typeof value.clara!=='string'||value.clara.length>3000000||!validateSave(JSON.parse(value.clara)))throw Error('Die Lösel-Einträge sind nicht gültig.');}
 if(value.wartke!==null)decodeJournal(value.wartke);
 return {format:'lyrik-gemeinsam',version:1,notes:{...value.notes},clara:value.clara,wartke:value.wartke};
}
