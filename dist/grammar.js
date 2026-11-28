// A small context-free grammar engine. Never evaluates input as JavaScript.
export const DEFAULT_RULES = `# Regeln verbinden Text und Wortfelder.
S -> Anrede Ding "." | Ich Bild "." | Wunsch Tun "."
Anrede -> "du nennst es"
Ich -> "ich nenne es"
Wunsch -> "ich will"`;
export const DEFAULT_WORDS = `Ding -> "einen Schlüssel" | "einen leeren Stuhl" | "ein Fenster"
Bild -> "einen Anfang" | "ein leises Nein" | "ein offenes Meer"
Tun -> "bleiben" | "zuhören" | "neu beginnen"`;
const NAME = /^[\p{L}_][\p{L}\p{N}_-]*$/u;
function syntax(message, source, line) { throw new Error(`${source}, Zeile ${line}: ${message}`); }
function parseBody(body,source,line){
 const alternatives=[[]];let i=0;
 while(i<body.length){
  if(/\s/u.test(body[i])){i++;continue;}
  if(body[i]==='#')break;
  if(body[i]==='|'){alternatives.push([]);i++;continue;}
  if(body[i]==='"'||body[i]==="'"){
   const quote=body[i++];let value='',closed=false;
   while(i<body.length){let c=body[i++];if(c===quote){closed=true;break;}if(c==='\\'){if(i>=body.length)syntax('Unvollständige Escape-Sequenz.',source,line);const n=body[i++];if(!['n','t','\\','"',"'"].includes(n))syntax(`Unbekannte Escape-Sequenz \\${n}.`,source,line);c=n==='n'?'\n':n==='t'?'\t':n;}value+=c;}
   if(!closed)syntax('Schliessendes Anführungszeichen fehlt.',source,line);
   alternatives.at(-1).push({literal:value});
   if(i<body.length&&!/[\s|#]/u.test(body[i]))syntax('Zwischen Bausteinen muss ein Leerzeichen stehen.',source,line);
  }else{
   const start=i;while(i<body.length&&!/[\s|#]/u.test(body[i]))i++;
   const name=body.slice(start,i);if(!NAME.test(name))syntax(`Ungültiger Baustein „${name}“. Wörter in Anführungszeichen setzen; Merkmale in [Klammern] werden hier nicht unterstützt.`,source,line);
   alternatives.at(-1).push({name});
  }
 }
 if(alternatives.some(a=>!a.length))syntax('Leere Alternative. Für einen leeren Text "" verwenden.',source,line);
 return alternatives;
}
export function compileGrammar(rulesText,wordsText,start='S'){
 if(typeof rulesText!=='string'||typeof wordsText!=='string'||rulesText.length+wordsText.length>30000)throw Error('Die Grammatik darf insgesamt höchstens 30.000 Zeichen enthalten.');
 if(!NAME.test(start))throw Error('Das Startsymbol muss ein Name wie S oder Gedicht sein.');
 const rules=new Map(),locations=new Map();let total=0;
 for(const [source,text]of [['Regeln',rulesText],['Wortfelder',wordsText]]){
  text.split(/\r?\n/).forEach((raw,index)=>{
   const line=raw.trim();if(!line||line.startsWith('#'))return;
   const match=line.match(/^([^\s]+)\s*->\s*(.*)$/u);if(!match||!NAME.test(match[1]))syntax('Erwartet: Name -> Baustein "Wort" | Alternative',source,index+1);
   const [_,name,body]=match,alts=parseBody(body,source,index+1);total+=alts.reduce((n,a)=>n+a.length,0);if(total>2500)throw Error('Zu viele Bausteine: maximal 2.500.');
   if(!rules.has(name)){rules.set(name,[]);locations.set(name,`${source}, Zeile ${index+1}`);}rules.get(name).push(...alts);
  });
 }
 if(!rules.has(start))throw Error(`Das Startsymbol „${start}“ hat keine Regel.`);
 for(const [name,alts]of rules)for(const alt of alts)for(const token of alt)if(token.name&&!rules.has(token.name))throw Error(`${locations.get(name)}: Baustein „${token.name}“ ist nicht definiert.`);
 const productive=new Set();let changed=true;while(changed){changed=false;for(const [name,alts]of rules)if(!productive.has(name)&&alts.some(a=>a.every(t=>!t.name||productive.has(t.name)))){productive.add(name);changed=true;}}
 for(const name of rules.keys())if(!productive.has(name))throw Error(`„${name}“ kann keinen fertigen Text bilden. Prüfe zirkuläre Regeln und ergänze eine endende Alternative.`);
 // Minimum depth lets generation avoid recursive dead ends within a fixed budget.
 const depths=new Map();changed=true;while(changed){changed=false;for(const [name,alts]of rules){let best=Infinity;for(const a of alts){const d=1+Math.max(0,...a.map(t=>t.name?(depths.get(t.name)??Infinity):0));best=Math.min(best,d);}if(best<(depths.get(name)??Infinity)){depths.set(name,best);changed=true;}}}
 const reachable=new Set();function visit(name){if(reachable.has(name))return;reachable.add(name);for(const a of rules.get(name))for(const t of a)if(t.name)visit(t.name);}visit(start);
 return {rules,start,depths,warnings:[...rules.keys()].filter(n=>!reachable.has(n)).map(n=>`„${n}“ wird vom Startsymbol nicht erreicht.`)};
}
export function generateFromGrammar(grammar,count=4,random=Math.random){
 if(!Number.isInteger(count)||count<1||count>24)throw Error('Wähle 1 bis 24 Verse.');
 let nodes=0,length=0;const traces=[];
 function expand(name,depth,trace){
  if(++nodes>4000)throw Error('Zu viele Ableitungsschritte. Vereinfache die Regeln oder erzeuge weniger Verse.');
  const candidates=grammar.rules.get(name).filter(a=>a.every(t=>!t.name||grammar.depths.get(t.name)<depth));
  if(!candidates.length)throw Error('Die Regeln sind zu tief verschachtelt (maximal 32 Ebenen).');
  const alt=candidates[Math.min(candidates.length-1,Math.max(0,Math.floor(random()*candidates.length)))];
  trace.push(`${'  '.repeat(32-depth)}${name} → ${alt.map(t=>t.name||JSON.stringify(t.literal)).join(' ')}`);
  return alt.flatMap(t=>{if(t.name)return expand(t.name,depth-1,trace);length+=t.literal.length;if(length>12000)throw Error('Der erzeugte Text ist zu lang. Vereinfache die Regeln.');return [t.literal];});
 }
 const lines=[];for(let i=0;i<count;i++){const trace=[];const parts=expand(grammar.start,32,trace);lines.push(parts.filter(p=>p!=='').join(' ').replace(/ +([,.!?;:])/gu,'$1').replace(/ *\n */gu,'\n'));traces.push(trace.join('\n'));}
 return {text:lines.join('\n'),trace:traces.join('\n\n')};
}
