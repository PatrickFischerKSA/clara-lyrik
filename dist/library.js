// Portable grammar files contain plain data only, including unfinished drafts.
const FORMAT='zwischen-den-zeilen/grammar';
const normalizeName=name=>name.normalize('NFC').trim();
const key=name=>normalizeName(name).toLocaleLowerCase('de');
export function namedGrammar(value){
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Die Grammatikdaten fehlen.');
 if(typeof value.name!=='string')throw Error('Gib deiner Grammatik einen Namen.');
 const name=normalizeName(value.name);
 if(!name||name.length>80||/[\u0000-\u001f\u007f]/u.test(name))throw Error('Der Name muss 1–80 Zeichen lang sein und darf keine Zeilenumbrüche enthalten.');
 for(const field of ['rules','words','start'])if(typeof value[field]!=='string')throw Error(`Das Feld „${field}“ muss Text enthalten.`);
 if(value.rules.length+value.words.length>30000)throw Error('Regeln und Wortfelder dürfen zusammen höchstens 30.000 Zeichen enthalten.');
 if(value.start.length>80)throw Error('Das Startsymbol ist zu lang.');
 if(!Number.isInteger(value.count)||value.count<1||value.count>24)throw Error('Die Versanzahl muss zwischen 1 und 24 liegen.');
 return {name,rules:value.rules,words:value.words,start:value.start,count:value.count};
}
export function decodeLibrary(text){
 if(!text)return [];
 const entries=JSON.parse(text);
 if(!Array.isArray(entries)||entries.length>30)throw Error('Die Bibliothek darf höchstens 30 Grammatiken enthalten.');
 const result=entries.map(namedGrammar),keys=result.map(x=>key(x.name));
 if(new Set(keys).size!==keys.length)throw Error('Die Bibliothek enthält doppelte Namen.');
 if(JSON.stringify(result).length>180000)throw Error('Die Grammatikbibliothek ist zu groß. Exportiere einzelne Grammatiken als Datei.');
 return result;
}
export function putGrammar(library,entry,replace=false){
 const clean=namedGrammar(entry),index=library.findIndex(x=>key(x.name)===key(clean.name));
 if(index>=0&&!replace)throw Error('Unter diesem Namen ist bereits eine Grammatik gespeichert.');
 const next=library.slice();if(index<0)next.push(clean);else next[index]=clean;
 return decodeLibrary(JSON.stringify(next));
}
export function importGrammar(text){
 if(typeof text!=='string'||text.length>200000)throw Error('Die Grammatikdatei ist zu groß (maximal 200 KB).');
 let data;try{data=JSON.parse(text);}catch{throw Error('Die Datei enthält kein gültiges JSON. Verwende eine exportierte Grammatikdatei (.json).');}
 if(!data||data.format!==FORMAT||data.version!==1)throw Error('Dies ist keine unterstützte Grammatikdatei. Erwartet wird eine Lyriklabor-Grammatik, Version 1.');
 return namedGrammar(data.grammar);
}
export function exportGrammar(entry){return JSON.stringify({format:FORMAT,version:1,grammar:namedGrammar(entry)},null,2);}
export function unusedImportName(library,name){
 const clean=normalizeName(name);let candidate=clean,n=2;
 while(library.some(x=>key(x.name)===key(candidate))){const suffix=` (Import ${n++})`;candidate=clean.slice(0,80-suffix.length)+suffix;}
 return candidate;
}
