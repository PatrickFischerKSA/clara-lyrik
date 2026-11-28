import {TOPICS} from './data.js?v=1.0.0';
export const emptyJournal=()=>({version:1,notes:{},attempts:[]});
const topicIds=new Set(TOPICS.map(topic=>topic.id));
export function validateJournal(value){
 if(!value||value.version!==1||!value.notes||typeof value.notes!=='object'||Array.isArray(value.notes)||!Array.isArray(value.attempts)||value.attempts.length>40)return false;
 if(Object.keys(value.notes).length>400||!Object.entries(value.notes).every(([key,v])=>/^[a-z0-9-]{1,80}$/.test(key)&&typeof v==='string'&&v.length<=30000))return false;
 return value.attempts.every(a=>a&&topicIds.has(a.topic)&&['facts','verse'].includes(a.mode)&&typeof a.date==='string'&&a.date.length<80&&Number.isFinite(Date.parse(a.date))&&Array.isArray(a.answers)&&a.answers.length===4&&a.answers.every(v=>typeof v==='string'&&v.length<=5000)&&Array.isArray(a.checks)&&a.checks.length===4&&a.checks.every(v=>typeof v==='boolean'))&&JSON.stringify(value).length<=1000000;
}
export function decodeJournal(raw){
 if(typeof raw!=='string'||raw.length>1000000)throw Error('Die Sicherung ist zu gross (maximal 1 MB).');
 let value;try{value=JSON.parse(raw);}catch{throw Error('Die Sicherung ist keine gültige JSON-Datei.');}
 if(!validateJournal(value))throw Error('Diese Datei ist keine passende Wartke-Journal-Sicherung.');
 return {version:1,notes:{...value.notes},attempts:value.attempts.map(a=>({topic:a.topic,mode:a.mode,date:a.date,answers:[...a.answers],checks:[...a.checks]}))};
}
export function startRecall(topic,mode){if(!topicIds.has(topic)||!['facts','verse'].includes(mode))throw Error('Wähle ein vorhandenes Thema und eine Darstellungsform.');return {stage:'study',topic,mode,answers:['','','',''],checks:[false,false,false,false]};}
export function hideRecall(session){if(session.stage!=='study')throw Error('Der Abrufversuch läuft bereits.');return {...session,stage:'recall'};}
export function compareRecall(session,answers){if(session.stage!=='recall'||!Array.isArray(answers)||answers.length!==4||answers.some(a=>typeof a!=='string'||a.length>5000))throw Error('Vier kurze Antworten werden benötigt.');return {...session,stage:'compare',answers:[...answers]};}
export function scoreRecall(checks){if(!Array.isArray(checks)||checks.length!==4||checks.some(c=>typeof c!=='boolean'))throw Error('Prüfe die vier Antwortkerne.');return checks.filter(Boolean).length;}
export function saveAttempt(journal,session,date=new Date().toISOString()){
 if(session.stage!=='compare')throw Error('Vergleiche zuerst deine Antworten.');
 scoreRecall(session.checks);
 const next={...journal,attempts:[...journal.attempts,{topic:session.topic,mode:session.mode,date,answers:[...session.answers],checks:[...session.checks]}].slice(-40)};
 if(!validateJournal(next))throw Error('Der Versuch konnte nicht in der Sicherung gespeichert werden.');return next;
}
export function termCoverage(text,terms){return terms.map(term=>({term,found:new RegExp(`(^|[^\\p{L}\\p{N}])${term.normalize('NFC').replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}([^\\p{L}\\p{N}]|$)`,'iu').test(text.normalize('NFC'))}));}
export function rhymeScheme(groups){const seen=new Map();return groups.map(group=>{if(!seen.has(group))seen.set(group,String.fromCharCode(97+seen.size));return seen.get(group);}).join('');}
export function endWords(lines){return lines.map(line=>(line.trim().match(/([\p{L}\p{N}]+)[^\p{L}\p{N}]*$/u)||[])[1]||'…');}
