import {compileGrammar,generateFromGrammar} from '../grammar.js?v=2.4.0';
import {namedGrammar} from '../library.js?v=2.4.0';

// Preserve each generated stanza separately; a custom start may produce a different line count.
export function learningDrafts(entry,random=Math.random){
 const clean=namedGrammar(entry),grammar=compileGrammar(clean.rules,clean.words,clean.start);
 const drafts=[];let trace='';
 for(let i=0;i<clean.count;i++){
  const result=generateFromGrammar(grammar,1,random);drafts.push(result.text);
  trace+=`Fassung ${i+1}\n${result.trace}\n\n`;
  if(JSON.stringify(drafts).length>28000||trace.length>100000)throw Error('Die Ausgabe ist zu gross. Erzeuge weniger Fassungen oder kürzere Texte.');
 }
 return {drafts,trace,warnings:grammar.warnings};
}
export function fourVerseLines(text){
 if(typeof text!=='string')throw Error('Wähle eine erzeugte Fassung.');
 const lines=text.replace(/\r\n?/g,'\n').trim().split('\n').map(line=>line.trim());
 if(lines.length!==4||lines.some(line=>!line||line.length>5000))throw Error('Zum Übernehmen braucht die Fassung genau vier nicht leere Zeilen mit höchstens 5000 Zeichen je Vers. Passe die Regeln an oder übertrage einzelne Stellen von Hand.');
 return lines;
}
