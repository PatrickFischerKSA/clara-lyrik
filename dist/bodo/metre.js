// Short original quotations plus explicitly labelled workshop comparisons.
const words=(items)=>items.map(([syllables,accents=[]])=>({syllables:syllables.split('-'),accents}));
export const METRE_CASES=[
 {id:'dach',group:'Originalstellen',title:'Der dicke Dachdecker',media:'dach',kind:'Originalzeile',words:words([['Der'],['di-cke',[1,0]],['Dach-de-cker',[1,2,0]],['deckt'],['das'],['Dach']]),pattern:'010100101',pauses:[],source:'https://www.bodowartke.de/tonguetwisters',reading:'Vier Hebungen: DI, DACH, DECKT, DACH. Zwischen der zweiten und dritten liegen zwei unbetonte Silben; sonst jeweils eine. Das ergibt einen vierhebigen Sprechvers mit wechselnder Senkungsfüllung. Der Schluss ist männlich.',question:'Vergleiche die Lesart mit dem Video. Wie stark hebt Wartke «deckt» hervor? Setzt er im Wort «Dachdecker» einen hörbaren Nebenakzent?',tempo:140},
 {id:'er',group:'Originalstellen',title:'Endoplasmatisches Retikulum',media:'er',kind:'Fachbegriff aus dem Rap',words:words([['en-do-plas-ma-ti-sches',[0,0,0,1,0,0]],['Re-ti-ku-lum',[0,1,0,0]]]),pattern:'0001000100',pauses:[],source:'https://www.bodowartke.de/medien/1189',reading:'Zehn Silben, Hauptakzente auf MA und TI. Dazwischen liegen drei unbetonte Silben; nach TI folgen zwei. Der Begriff zeigt die Akzentabstände, ist für sich aber noch kein vollständiger Vers.',question:'Höre, wie der Fachbegriff in die Zeile eingebaut wird. Welche Silben spricht Wartke dichter zusammen, welche dehnt er?',tempo:80},
 {id:'jambus',group:'Eigene Vergleichsverse',title:'Jambus',kind:'Eigenes Textbeispiel',words:words([['Der'],['Wind'],['be-wegt',[0,1]],['das'],['Schilf'],['am'],['See']]),pattern:'01010101',pauses:[],reading:'Vier Jamben: Auf jede unbetonte Silbe folgt eine betonte. Der Vers beginnt mit einer Senkung und endet auf der Hebung SEE.',question:'Setze nach «Schilf» eine Pause. Bleibt das Betonungsmuster erhalten?',tempo:80},
 {id:'trochaeus',group:'Eigene Vergleichsverse',title:'Trochäus',kind:'Eigenes Textbeispiel',words:words([['Lei-se',[1,0]],['fal-len',[1,0]],['gel-be',[1,0]],['Blät-ter',[1,0]]]),pattern:'10101010',pauses:[],reading:'Vier Trochäen: betont – unbetont. Die letzte Silbe bleibt unbetont; der Schluss ist weiblich.',question:'Sprich die Zeile einmal mit einer Pause nach «fallen», einmal ohne Pause.',tempo:80},
 {id:'daktylus',group:'Eigene Vergleichsverse',title:'Daktylus',kind:'Eigenes Textbeispiel',words:words([['Wan-dern-de',[1,0,0]],['Wol-ken',[1,0]],['ver-dun-keln',[0,1,0]],['die'],['Tä-ler',[1,0]]]),pattern:'10010010010',pauses:[],reading:'Vier Hebungen im daktylischen Grundmuster: betont – unbetont – unbetont. Der letzte Fuss ist um eine Senkung verkürzt. Der Schluss bleibt weiblich.',question:'Die Versfüsse enden nicht überall an einer Wortgrenze. Wo läuft der Fuss ins nächste Wort weiter?',tempo:80},
 {id:'anapaest',group:'Eigene Vergleichsverse',title:'Anapäst',kind:'Eigenes Textbeispiel',words:words([['In'],['der'],['Nacht'],['an'],['dem'],['Meer'],['zieht'],['ein'],['Boot']]),pattern:'001001001',pauses:[],reading:'Drei Anapäste: Zwei unbetonte Silben führen jeweils zur Hebung. Der Vers endet betont auf BOOT.',question:'Betone «zieht» zusätzlich. An welcher Stelle verändert sich das regelmässige Muster?',tempo:80}
];
export function metreCase(id){return METRE_CASES.find(item=>item.id===id)||METRE_CASES[0];}
export function caseSyllables(item){return item.words.flatMap((word,w)=>word.syllables.map((text,s)=>({text,word:w,accent:word.accents[s]??null,wordEnd:s===word.syllables.length-1})));}
export function scanPattern(pattern){
 if(typeof pattern!=='string'||!/^[01]{1,96}$/.test(pattern))throw Error('Markiere die Silben als betont oder unbetont.');
 const positions=[...pattern].flatMap((value,i)=>value==='1'?[i]:[]),count=positions.length;
 const gaps=positions.slice(1).map((at,i)=>at-positions[i]-1),lead=count?positions[0]:null,tail=count?pattern.length-1-positions.at(-1):null;
 const meters=[['Jambus','01'],['Trochäus','10'],['Daktylus','100'],['Anapäst','001']];
 const match=count>=2?meters.find(([,unit])=>[...pattern].every((value,i)=>value===unit[i%unit.length])):null;
 const cadence=tail===0?'männlich · betonter Schluss':tail===1?'weiblich · eine unbetonte Endsilbe':tail===2?'klingend · zwei unbetonte Endsilben':tail===null?'ohne markierte Hebung':tail+' unbetonte Endsilben';
 return {syllables:pattern.length,stresses:count,positions,gaps,lead,tail,cadence,meter:match?.[0]||null};
}
export function decodeScansion(raw,item){
 const size=caseSyllables(item).length,model={pattern:item.pattern,pauses:[]};
 if(!raw)return model;
 try{const data=JSON.parse(raw);if(data.pattern?.length!==size||!/^[01]+$/.test(data.pattern)||!Array.isArray(data.pauses)||data.pauses.some(i=>!Number.isInteger(i)||i<1||i>=size))return model;return {pattern:data.pattern,pauses:[...new Set(data.pauses)].sort((a,b)=>a-b)};}catch{return model;}
}
export function toggleStress(pattern,index){scanPattern(pattern);if(!Number.isInteger(index)||index<0||index>=pattern.length)throw Error('Ungültige Silbe.');return pattern.slice(0,index)+(pattern[index]==='1'?'0':'1')+pattern.slice(index+1);}
