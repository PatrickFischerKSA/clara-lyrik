import {getDocument,GlobalWorkerOptions} from './vendor/pdfjs/pdf.mjs';
GlobalWorkerOptions.workerSrc=new URL('./vendor/pdfjs/pdf.worker.mjs',import.meta.url).href;
const $=id=>document.getElementById(id),params=new URLSearchParams(location.search);
let pdf=null,current=1,renderTask=null,sequence=0;
async function show(number){
 const token=++sequence;current=Math.min(pdf.numPages,Math.max(1,Math.trunc(number)||1));$('page').value=current;
 $('previous').disabled=current===1;$('next').disabled=current===pdf.numPages;$('status').textContent=`PDF-Dateiseite ${current} von ${pdf.numPages}`;
 if(renderTask){renderTask.cancel();renderTask=null;}
 try{const page=await pdf.getPage(current);if(token!==sequence)return;const original=page.getViewport({scale:1});const width=Math.min(1100,Math.max(250,document.documentElement.clientWidth-20));const ratio=Math.min(devicePixelRatio||1,2);const viewport=page.getViewport({scale:width/original.width*ratio});const canvas=$('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);canvas.style.width=width+'px';canvas.setAttribute('aria-label',`Buchseite ${current}`);renderTask=page.render({canvasContext:canvas.getContext('2d'),viewport});await renderTask.promise;if(token!==sequence)return;const text=await page.getTextContent();if(token!==sequence)return;$('text').textContent=text.items.map(item=>item.str+(item.hasEOL?'\n':' ')).join('');}
 catch(error){if(error.name!=='RenderingCancelledException')$('status').textContent='Diese Seite konnte nicht angezeigt werden: '+error.message;}
}
try{
 const url=params.get('file')||'';if(!url.startsWith(`blob:${location.origin}/`))throw Error('Bitte das Buch über die lokale Dateiauswahl im Lyriklabor öffnen.');
 pdf=await getDocument({url,standardFontDataUrl:new URL('./vendor/pdfjs/standard_fonts/',import.meta.url).href,wasmUrl:new URL('./vendor/pdfjs/wasm/',import.meta.url).href,isEvalSupported:false,enableXfa:false}).promise;
 $('total').textContent=`von ${pdf.numPages}`;$('page').max=pdf.numPages;await show(Number(params.get('page'))||1);
 $('previous').onclick=()=>show(current-1);$('next').onclick=()=>show(current+1);$('page').onchange=()=>show(Number($('page').value));let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>show(current),150);});
}catch(error){$('status').textContent='Das lokale Buch konnte nicht geöffnet werden: '+error.message;}
