// Timings are supplied explicitly. No estimated or Instagram playback clock.
export function wordsOf(text){return text.match(/\S+/gu)||[];}
export function textParts(text){let index=0;return (text.match(/\s+|\S+/gu)||[]).map(value=>/^\s/u.test(value)?{value}:{value,index:index++});}
export function parseReadAlong(raw,fallbackText=''){
 if(typeof raw!=='string'||raw.length>1000000)throw Error('Die Zeitmarkendatei darf höchstens 1 MB gross sein.');
 let data;try{data=JSON.parse(raw);}catch{throw Error('Die Zeitmarkendatei ist keine gültige JSON-Datei.');}
 if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Die Zeitmarkendatei braucht Text und Wort-Zeitmarken.');
 const text=data.text===undefined?fallbackText:data.text;
 if(typeof text!=='string'||!text.trim()||text.length>30000)throw Error('Die Textfassung muss 1 bis 30.000 Zeichen enthalten.');
 const tokens=wordsOf(text);
 if(Array.isArray(data.words)&&data.words.length===0)return {text,words:[]};
 if(!Array.isArray(data.words)||data.words.length!==tokens.length||tokens.length>5000)throw Error('Für jedes Wort der Textfassung wird genau eine Zeitmarke benötigt.');
 let previousEnd=0;
 const cues=data.words.map((cue,i)=>{
  if(!cue||typeof cue.word!=='string'||cue.word.trim()!==tokens[i])throw Error(`Wort ${i+1} stimmt nicht mit der Textfassung überein.`);
  if(typeof cue.start!=='number'||typeof cue.end!=='number'||!Number.isFinite(cue.start)||!Number.isFinite(cue.end)||cue.start<previousEnd||cue.end<=cue.start||cue.end>86400)throw Error(`Zeitmarke ${i+1} ist ungültig oder überschneidet sich mit der vorherigen.`);
  previousEnd=cue.end;return {word:tokens[i],start:cue.start,end:cue.end};
 });
 const result={text,words:cues};
 if(JSON.stringify(result).length>=190000)throw Error('Die Textfassung mit Zeitmarken ist zu gross für die Journal-Sicherung.');
 return result;
}
export function activeWord(cues,time){
 if(!Number.isFinite(time)||time<0)return -1;
 let lo=0,hi=cues.length-1;
 while(lo<=hi){const mid=(lo+hi)>>1,cue=cues[mid];if(time<cue.start)hi=mid-1;else if(time>=cue.end)lo=mid+1;else return mid;}
 return -1;
}
