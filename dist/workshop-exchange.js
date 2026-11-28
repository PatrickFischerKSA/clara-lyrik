import {validateSave} from './core.js?v=1.5.2';
import {decodeJournal} from './bodo/core.js?v=1.1.0';
import {namedGrammar,decodeLibrary,putGrammar} from './library.js?v=1.5.2';
import {readWordFields,createWordField} from './wordfields.js?v=1.7.2';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const EXCHANGE_KEYS={loesel:'zwischen-zeilen-v1',wartke:'wartke-form-gedaechtnis-v1'};
export const exchangeHTML=()=>'<section id="workshop-exchange" class="workshop-exchange" tabindex="-1" aria-labelledby="exchange-title"></section>';

export function exchangeCatalog(source,raw){
 if(!Object.hasOwn(EXCHANGE_KEYS,source))throw Error('Unbekannte Werkstatt.');
 if(!raw)return {entries:[],warnings:[]};
 if(typeof raw!=='string'||raw.length>3000000)throw Error('Die gespeicherte Werkstatt ist zu gross.');
 let journal;
 if(source==='wartke')journal=decodeJournal(raw);
 else{try{journal=JSON.parse(raw);}catch{throw Error('Die Lösel-Sicherung ist nicht lesbar.');}if(!validateSave(journal))throw Error('Die Lösel-Sicherung ist nicht gültig.');}
 const entries=[],warnings=[],notes=journal.notes;
 const addDraft=(prefix,title,context='')=>{
  if(notes[prefix+'rules']===undefined&&notes[prefix+'words']===undefined)return;
  try{entries.push({label:'Editor'+(context?' ('+context+')':'')+' · '+title,grammar:namedGrammar({name:notes[prefix+'name']?.trim()||title,rules:notes[prefix+'rules']??'',words:notes[prefix+'words']??'',start:notes[prefix+'start']??'S',count:Number(notes[prefix+'count']??1)})});}
  catch{warnings.push(`Der Entwurf «${title}» hat unvollständige Einstellungen. Prüfe dort Name, Textlänge, Startsymbol und Anzahl.`);}
 };
 if(source==='loesel')addDraft('grammar-',notes['grammar-name']?.trim()||'Mein Lösel-Entwurf');
 else for(const context of new Set(Object.keys(notes).flatMap(key=>{const context=key.match(/^dg-([a-z0-9-]+)-(?:rules|words)$/)?.[1];return context&&!context.endsWith('-previous')?[context]:[];})))addDraft('dg-'+context+'-',notes['dg-'+context+'-name']||context,({math:'Mathematik',bio:'Biologie',deutsch:'Deutsch',physics:'Physik',history:'Geschichte',eigen:'Eigenes Thema','hoeren-er':'Hörbeispiel ER','hoeren-mito':'Hörbeispiel Mitochondrien','hoeren-barbara':'Hörbeispiel Rhabarberbar','hoeren-dach':'Hörbeispiel Dachdecker'})[context]||context);
 const library=source==='loesel'?decodeLibrary(notes['grammar-library']||''):decodeLibrary(JSON.stringify(journal.grammars??[]));
 library.forEach(grammar=>entries.push({label:'Gespeichert · '+grammar.name,grammar}));
 return {entries,warnings};
}

export function copyExchangeGrammar(library,grammar){
 const copy=namedGrammar(grammar),base=copy.name;let n=2;while(library.some(e=>e.name.normalize('NFC').toLocaleLowerCase('de')===copy.name.toLocaleLowerCase('de'))){const suffix=` (Kopie ${n++})`;copy.name=base.slice(0,80-suffix.length)+suffix;}
 return {entry:copy,library:putGrammar(library,copy)};
}
export function copyExchangeWordField(current,field,label,beginVerses=false){
 if(!field||!Array.isArray(field.values)||!field.values.length)throw Error('Wähle ein Wortfeld mit Wörtern oder Wendungen.');
 const occupied=new Set((current.rules+'\n'+current.words).split('\n').map(line=>line.match(/^\s*([^\s]+)\s*->/u)?.[1]?.normalize('NFC').toLocaleLowerCase('de')).filter(Boolean));
 const wanted=String(label||field.name).normalize('NFC').trim().replace(/\s+/gu,'_');let name=wanted,n=2;
 while(occupied.has(name.toLocaleLowerCase('de')))name=wanted.slice(0,54)+'_'+n++;
 const created=createWordField(current.rules,current.words,name,[...field.values]);
 if(!beginVerses)return {...current,words:created.words,fieldName:created.name};
 occupied.add(created.name.toLocaleLowerCase('de'));let start='UebernahmeVerse';n=2;
 while(occupied.has(start.toLocaleLowerCase('de')))start='UebernahmeVerse'+n++;
 const rule=start+' -> '+Array(4).fill(created.name).join(' "\\n" '),rules=current.rules+(current.rules&&!current.rules.endsWith('\n')?'\n':'')+rule;
 if(rules.length+created.words.length>30000)throw Error('Die Grammatik ist zu gross. Kürze Regeln oder Wortfelder.');
 return {...current,rules,words:created.words,start,count:1,fieldName:created.name};
}

export function mountWorkshopExchange(root,{workshop,getCurrent,getLibrary,onGrammar,onField,onPrepareLeave}){
 const $=s=>root.querySelector(s),other=workshop==='loesel'?'wartke':'loesel',otherName=other==='wartke'?'Wartkes':'Lösels',href=other==='wartke'?'bodo/#werkstatt?editor=regeln':'../#werkstatt?editor=regeln';
 root.innerHTML=`<p class="exchange-kicker">Lösel und Wartke verbinden</p><h2 id="exchange-title">Aus ${otherName} Werkstatt übernehmen</h2><p>Kopiere eigene Grammatiken oder einzelne Wortfelder direkt hierher. Beide Werkstätten müssen im selben Browser verwendet werden. Die Originale bleiben in der anderen Werkstatt erhalten.</p><div class="exchange-actions"><button id="exchange-refresh" type="button">Andere Werkstatt neu einlesen</button><a id="exchange-other" href="${href}">Zu ${otherName} Regel-Editor</a></div><label for="exchange-source" class="field">Entwurf oder gespeicherte Grammatik aus der anderen Werkstatt</label><select id="exchange-source"></select><p id="exchange-catalog-status" class="small" role="status"></p><div id="exchange-preview" hidden><details><summary>Grammatik vor der Übernahme ansehen</summary><h3 id="exchange-name"></h3><p id="exchange-settings" class="small"></p><pre id="exchange-rules"></pre><pre id="exchange-words"></pre></details><div class="exchange-grid"><section><h3>Die ganze Grammatik</h3><p>Regeln, Wortfelder und Startsymbol werden als neue Grammatik in deiner Sammlung gespeichert. Bei gleichem Namen erhält die Kopie einen Zusatz.</p><label class="exchange-check"><input type="checkbox" id="exchange-open" checked> Kopie gleich im aktuellen Editor öffnen</label><p class="small">Der aktuelle Editorinhalt wird für die Wiederherstellung aufgehoben. Deine Gedicht- und Versfelder bleiben erhalten.</p><button id="exchange-grammar" type="button">Grammatik übernehmen</button></section><section><h3>Ein einzelnes Wortfeld</h3><label class="field" for="exchange-field">Wortfeld aus dieser Grammatik</label><select id="exchange-field"></select><p id="exchange-field-info" class="small"></p><pre id="exchange-values"></pre><label class="field" for="exchange-field-name">Name in dieser Werkstatt</label><input type="text" id="exchange-field-name" maxlength="60"><label class="exchange-check"><input type="checkbox" id="exchange-begin"> Vier Zeilen mit dem Wortfeld beginnen</label><p class="small">Das Feld ergänzt deine Wortfelder. Bestehende Regeln und Verweise bleiben erhalten. Gleiche Namen erhalten einen Zusatz; die neue Vier-Zeilen-Regel kann bei Bedarf zurückgenommen werden.</p><button id="exchange-wordfield" type="button">Wortfeld übernehmen</button></section></div></div><p id="exchange-status" class="exchange-status" role="status" aria-live="polite"></p>`;
 let entries=[],fields=[];
 const tell=(text,error=false)=>{$('#exchange-status').textContent=text;$('#exchange-status').classList.toggle('error',error);};
 const selected=()=>entries[Number($('#exchange-source').value)]?.grammar;
 const drawField=()=>{const field=fields[Number($('#exchange-field').value)];$('#exchange-field-name').value=field?.name||'';$('#exchange-values').textContent=field?.values.join('\n')||'';$('#exchange-wordfield').disabled=!field;};
 const draw=()=>{const grammar=selected();$('#exchange-preview').hidden=!grammar;if(!grammar)return;$('#exchange-name').textContent=grammar.name;$('#exchange-settings').textContent=`Startsymbol: ${grammar.start||'(leer)'} · Anzahl Erzeugungen: ${grammar.count}. Eine Erzeugung kann je nach Regeln mehrere Zeilen enthalten.`;$('#exchange-rules').textContent=grammar.rules;$('#exchange-words').textContent=grammar.words;const all=readWordFields(grammar.words);fields=all.filter(f=>f.values);$('#exchange-field').innerHTML=fields.map((f,i)=>`<option value="${i}">${esc(f.name)} · ${f.values.length} Einträge</option>`).join('')||'<option value="">Keine einzelnen Wortfelder vorhanden</option>';$('#exchange-field-info').textContent=all.some(f=>!f.values)?'Zusammengesetzte oder unfertige Wortfeldregeln lassen sich mit der ganzen Grammatik übernehmen.':'Wörter, Wendungen und Zeilenumbrüche werden unverändert kopiert.';drawField();};
 const refresh=()=>{try{const catalog=exchangeCatalog(other,localStorage.getItem(EXCHANGE_KEYS[other]));entries=catalog.entries;$('#exchange-source').innerHTML=entries.map((e,i)=>`<option value="${i}">${esc(e.label)}</option>`).join('')||'<option value="">Noch keine eigenen Grammatiken gefunden</option>';$('#exchange-catalog-status').textContent=entries.length?`${entries.length} Entwürfe und gespeicherte Grammatiken verfügbar. ${catalog.warnings.join(' ')}`:`Öffne ${otherName} Regel-Editor und bearbeite oder speichere dort eine Grammatik. Danach kannst du sie hier einlesen. ${catalog.warnings.join(' ')}`;draw();return true;}catch(error){entries=[];$('#exchange-source').innerHTML='<option>Quelle nicht verfügbar</option>';$('#exchange-preview').hidden=true;$('#exchange-catalog-status').textContent='';tell('Die andere Werkstatt konnte nicht gelesen werden: '+error.message,true);return false;}};
 $('#exchange-source').onchange=()=>{draw();tell('');};$('#exchange-field').onchange=drawField;$('#exchange-refresh').onclick=()=>{if(refresh())tell('Ansicht neu eingelesen.');};
 $('#exchange-other').onclick=()=>onPrepareLeave?.();
 $('#exchange-grammar').onclick=()=>{try{const source=selected();if(!source)throw Error('Wähle zuerst eine Grammatik.');const result=copyExchangeGrammar(getLibrary(),source);onGrammar(result,$('#exchange-open').checked);tell(`«${result.entry.name}» als eigene Kopie übernommen.${$('#exchange-open').checked?' Die Kopie ist im Editor geöffnet.':' Du findest sie in deiner Grammatikbibliothek.'}`);}catch(error){tell(error.message,true);}};
 $('#exchange-wordfield').onclick=()=>{try{const current=getCurrent(),result=copyExchangeWordField(current,fields[Number($('#exchange-field').value)],$('#exchange-field-name').value,$('#exchange-begin').checked);onField(result);tell(`Wortfeld «${result.fieldName}» übernommen.${$('#exchange-begin').checked?' Die neue Startregel erzeugt vier Zeilen. Erzeuge sie jetzt im Editor.':' Verwende den Feldnamen in deinen Regeln.'}`);}catch(error){tell(error.message,true);}};
 refresh();
}
