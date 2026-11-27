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
export function updateWordField(text,index,values){
 const field=readWordFields(text).find(field=>field.index===index);
 if(!field?.values)throw Error('Dieses Wortfeld lässt sich nur in der Textansicht bearbeiten.');
 if(!Array.isArray(values)||!values.length||values.some(value=>typeof value!=='string'))throw Error('Jedes Wortfeld braucht mindestens einen Eintrag.');
 const lines=text.split('\n'),raw=lines[index],prefix=raw.match(/^(\s*[^\s]+\s*->\s*)/u)[1],comment=commentOf(raw);
 const quote=value=>'"'+value.replace(/\r\n?/g,'\n').replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\t/g,'\\t')+'"';
 lines[index]=prefix+values.map(quote).join(' | ')+(comment?' '+comment:'');
 const result=lines.join('\n');
 if(result.length>30000)throw Error('Die Wortfelder dürfen höchstens 30.000 Zeichen enthalten.');
 const updated=readWordFields(result).find(field=>field.index===index);
 if(!updated?.values)throw Error('Der Eintrag konnte nicht übernommen werden.');
 return result;
}
