// Literal word fields for the form editor. Complex rules stay untouched.
import {compileGrammar} from './grammar.js?v=1.5.2';
function commentOf(line){
 let quote='',escaped=false;
 for(let i=0;i<line.length;i++){
  const c=line[i];
  if(escaped){escaped=false;continue;}
  if(quote&&c==='\\'){escaped=true;continue;}
  if(quote){if(c===quote)quote='';continue;}
  if(c==='"'||c==="'"){quote=c;continue;}
  if(c==='#')return line.slice(i);
 }
 return '';
}
export function readWordFields(text){
 if(typeof text!=='string'||text.length>30000)throw Error('Die Wortfelder dürfen höchstens 30.000 Zeichen enthalten.');
 return text.split('\n').flatMap((raw,index)=>{
  if(!raw.trim()||raw.trimStart().startsWith('#'))return [];
  const name=raw.trim().match(/^([^\s]+)\s*->/)?.[1]||`Zeile ${index+1}`;
  try{
   const grammar=compileGrammar(raw,'',name),alts=grammar.rules.get(name);
   if(alts.some(alt=>alt.length!==1||!Object.hasOwn(alt[0],'literal')))throw Error('Dieses Wortfeld enthält Regeln statt einzelner Wörter oder Wendungen.');
   return [{index,name,values:alts.map(alt=>alt[0].literal)}];
  }catch(error){return [{index,name,values:null,error:error.message}];}
 });
}
const quoteWord=value=>'"'+value.replace(/\r\n?/g,'\n').replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\t/g,'\\t')+'"';
export function updateWordField(text,index,values){
 const field=readWordFields(text).find(field=>field.index===index);
 if(!field?.values)throw Error('Dieses Wortfeld lässt sich nur in der Textansicht bearbeiten.');
 if(!Array.isArray(values)||!values.length||values.some(value=>typeof value!=='string'))throw Error('Jedes Wortfeld braucht mindestens einen Eintrag.');
 const lines=text.split('\n'),raw=lines[index],prefix=raw.match(/^(\s*[^\s]+\s*->\s*)/u)[1],comment=commentOf(raw);

 lines[index]=prefix+values.map(quoteWord).join(' | ')+(comment?' '+comment:'');
 const result=lines.join('\n');
 if(result.length>30000)throw Error('Die Wortfelder dürfen höchstens 30.000 Zeichen enthalten.');
 const updated=readWordFields(result).find(field=>field.index===index);
 if(!updated?.values)throw Error('Der Eintrag konnte nicht übernommen werden.');
 return result;
}

export function createWordField(rulesText,wordsText,label,values){
 if(typeof rulesText!=='string'||typeof wordsText!=='string'||typeof label!=='string')throw Error('Gib einen Namen für dein Wortfeld ein.');
 const name=label.normalize('NFC').trim().replace(/\s+/gu,'_');
 if(!name||name.length>60||!/^\p{L}[\p{L}\p{N}_-]*$/u.test(name))throw Error('Beginne den Namen mit einem Buchstaben. Verwende höchstens 60 Zeichen: Buchstaben, Zahlen, Leerzeichen oder Bindestriche.');
 const names=(rulesText+'\n'+wordsText).split('\n').map(line=>line.match(/^\s*([^\s]+)\s*->/u)?.[1]).filter(Boolean);
 if(names.some(existing=>existing.normalize('NFC').toLocaleLowerCase('de')===name.toLocaleLowerCase('de')))throw Error(`„${name}“ ist schon als Wortfeld oder Regel vorhanden. Wähle einen anderen Namen.`);
 if(!Array.isArray(values)||!values.length||values.some(value=>typeof value!=='string'||!value.trim()))throw Error('Schreibe mindestens ein Wort oder eine Wendung in die Einträge.');
 const line=name+' -> '+values.map(quoteWord).join(' | ');
 const words=wordsText+(wordsText&&!wordsText.endsWith('\n')?'\n':'')+line;
 if(rulesText.length+words.length>30000)throw Error('Die Grammatik darf insgesamt höchstens 30.000 Zeichen enthalten.');
 const field=readWordFields(words).at(-1);
 if(!field?.values)throw Error('Das neue Wortfeld konnte nicht angelegt werden.');
 return {name,words,index:field.index};
}
