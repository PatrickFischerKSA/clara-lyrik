import {createWordField} from '../wordfields.js?v=1.7.2';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function collectNoteEntries(collection,notes){
 if(typeof collection!=='string'||typeof notes!=='string')throw Error('Die Sammlung und die Hörnotiz müssen Text enthalten.');
 const entries=[...new Set((collection+'\n'+notes).split(/\r?\n/).map(line=>line.trim()).filter(Boolean))];
 if(entries.length>100||entries.join('\n').length>20000)throw Error('Die Sammlung ist zu gross. Wähle höchstens 100 kurze Einträge mit insgesamt 20.000 Zeichen.');
 return entries;
}

export function wordFieldFromNotes({rules,words,start,label,collection,beginVerses=false}){
 const values=collectNoteEntries('',collection);
 const field=createWordField(rules,words,label,values);
 if(!beginVerses)return {rules,words:field.words,start,name:field.name};
 const used=new Set((rules+'\n'+field.words).split('\n').map(line=>line.match(/^\s*([^\s]+)\s*->/u)?.[1]?.normalize('NFC').toLocaleLowerCase('de')).filter(Boolean));
 let nextStart='Hoerverse',n=2;while(used.has(nextStart.toLocaleLowerCase('de')))nextStart='Hoerverse'+n++;
 const line=nextStart+' -> '+['Ich erinnere mich:','Ich ordne:','Ich erkläre:','Ich frage weiter:'].map(lead=>JSON.stringify(lead)+' '+field.name).join(' "\\n" ');
 const nextRules=rules+(rules&&!rules.endsWith('\n')?'\n':'')+line;
 if(nextRules.length+field.words.length>30000)throw Error('Die Grammatik ist zu gross. Kürze Regeln oder Wortfelder.');
 return {rules:nextRules,words:field.words,start:nextStart,name:field.name};
}

export function mountHearingNotes(root,{media,note,setNotes,context,onCreate}){
 const $=s=>root.querySelector(s),key='clip-'+media.id,prefix='dg-'+context+'-',saved=note(prefix+'note-collection',null);
 // The collection is a draft of selected entries, separate from the shared original note.
 let initial=saved??'';
 if(saved===null){try{initial=collectNoteEntries('',note(key)).join('\n');}catch{initial='';}}
 root.innerHTML=`<h3>Deine Hörnotiz in der Schreibwerkstatt</h3><label class="field" for="dg-hearing-note">Hörnotiz zu «${esc(media.title)}»</label><textarea id="dg-hearing-note" rows="4" maxlength="30000" placeholder="Notiere eine Beobachtung, einen Begriff oder eine Frage mit Zeitstelle …">${esc(note(key))}</textarea><p class="small">Hier und beim Hörbeispiel steht dieselbe Notiz. Änderungen werden an beiden Stellen gespeichert.</p><label class="field" for="dg-note-collection">Wörter und Wendungen aus deiner Notiz · ein Eintrag pro Zeile</label><textarea id="dg-note-collection" rows="4" maxlength="20000" placeholder="Wähle Wörter, Bilder oder fachliche Aussagen aus deiner Notiz …">${esc(initial)}</textarea><p class="small">Kürze die Notizzeilen zu Einträgen, mit denen du schreiben möchtest. Entferne hier bei Bedarf Zeitangaben. Die Hörnotiz darüber bleibt erhalten.</p><button id="dg-collect-note" type="button">Notizzeilen zur Sammlung hinzufügen</button><label class="field" for="dg-note-field-name">Name für dein Wortfeld</label><input type="text" id="dg-note-field-name" maxlength="60" value="${esc(note(prefix+'note-field-name','Meine Hörwörter'))}"><label class="check-row" style="margin:18px 0"><input type="checkbox" id="dg-note-begin" checked> Damit vier Versanfänge ausprobieren</label><p class="small">Dafür kommt eine neue Regel zu deinen bisherigen Regeln hinzu. Du kannst die vier Zeilen danach ergänzen, neu ordnen und fachlich prüfen. Deine bisherigen Versfelder werden erst beim bewussten Übernehmen ersetzt.</p><button type="button" id="dg-note-create" class="primary">Aus der Sammlung ein Wortfeld anlegen</button><p id="dg-note-status" role="status" aria-live="polite" class="small"></p>`;
 const tell=(message,error=false)=>{$('#dg-note-status').textContent=message;$('#dg-note-status').classList.toggle('error',error);};
 $('#dg-hearing-note').oninput=()=>setNotes({[key]:$('#dg-hearing-note').value});
 $('#dg-note-collection').oninput=()=>setNotes({[prefix+'note-collection']:$('#dg-note-collection').value});
 $('#dg-note-field-name').oninput=()=>setNotes({[prefix+'note-field-name']:$('#dg-note-field-name').value});
 $('#dg-collect-note').onclick=()=>{try{const entries=collectNoteEntries($('#dg-note-collection').value,$('#dg-hearing-note').value);$('#dg-note-collection').value=entries.join('\n');setNotes({[prefix+'note-collection']:$('#dg-note-collection').value});tell(entries.length?`${entries.length} Einträge gesammelt. Wähle aus und überarbeite ihre Formulierung.`:'Deine Hörnotiz ist noch leer. Schreibe zuerst eine Beobachtung.');}catch(error){tell(error.message,true);}};
 $('#dg-note-create').onclick=()=>{try{const result=onCreate({label:$('#dg-note-field-name').value,collection:$('#dg-note-collection').value,beginVerses:$('#dg-note-begin').checked});setNotes({[prefix+'note-collection']:$('#dg-note-collection').value,[prefix+'note-field-name']:$('#dg-note-field-name').value});tell(`Wortfeld «${result.name}» angelegt. ${result.beginVerses?'Vier Versanfänge stehen in der Ausgabe. Ergänze die Aussagen und prüfe ihren fachlichen Kern.':'Verwende den Feldnamen in einer Regel oder ändere seine Einträge im Wortfeld-Editor.'}`);}catch(error){tell(error.message,true);}};
}
