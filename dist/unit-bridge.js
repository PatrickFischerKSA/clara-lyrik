import {unitRoute} from './studio-core.js?v=2.5.1';
const unit=document.documentElement.dataset.unit==='wartke'?'wartke':'clara',embedded=new URLSearchParams(location.search).get('integriert')==='1'&&parent!==window;
const base=new URL(unit==='wartke'?'../':'./',location.href);
if(!embedded){location.replace(new URL(unitRoute(unit,location.hash),base).href);}
else{
 document.documentElement.classList.add('embedded-unit');
 const send=(type,data={})=>parent.postMessage({type,unit,...data},location.origin);
 window.addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin)return;const data=event.data;if(data?.type==='lyrik:viewport'&&Number.isFinite(data.top)&&Number.isFinite(data.height)){document.documentElement.style.setProperty('--studio-view-top',Math.max(0,data.top)+'px');document.documentElement.style.setProperty('--studio-view-height',Math.max(240,data.height)+'px');}if(data?.type==='lyrik:prompt'&&typeof data.text==='string'&&data.text.length<=30000)window.dispatchEvent(new CustomEvent('studio:prompt',{detail:data.text}));});
 let lastHeight=0,scheduled=false;
 const size=()=>{scheduled=false;const height=Math.ceil(document.body.getBoundingClientRect().height);if(height!==lastHeight){lastHeight=height;send('lyrik:height',{height});}};
 const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(size);}};
 new ResizeObserver(schedule).observe(document.body);
 window.addEventListener('load',()=>{schedule();send('lyrik:ready');});
 window.addEventListener('hashchange',()=>{send('lyrik:route',{hash:location.hash});schedule();});
 document.addEventListener('focusin',event=>{if(['main','workshop-exchange','dg-hearing-note','dg-example'].includes(event.target.id))send('lyrik:scroll',{top:event.target.getBoundingClientRect().top+scrollY});});
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');if(!link||event.ctrlKey||event.metaKey||event.shiftKey||link.target==='_blank')return;
  const url=new URL(link.href);if(url.origin!==location.origin)return;
  let target=null;if(url.pathname===base.pathname||url.pathname===base.pathname+'index.html'||url.pathname===base.pathname+'clara.html')target='clara';
  if(url.pathname===base.pathname+'bodo/'||url.pathname===base.pathname+'bodo/index.html')target='wartke';
  if(target&&(target!==unit||url.pathname!==location.pathname)){event.preventDefault();send('lyrik:open',{target,hash:url.hash});}
 },true);
 schedule();
}
