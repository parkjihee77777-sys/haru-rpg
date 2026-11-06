// ---------- a taught word in a line is heard when tapped, not on its own (owner 11/06: 「설명 중 나오는 한자는 눌러야 소리 나오게」) ----------
// the word gets a dotted underline in the talk panel and in the bubble over the speaker; tapping it plays it and does not move the story on
{
const st=document.createElement('style');
st.textContent=`.tw{text-decoration:underline dotted 2px;text-underline-offset:4px;cursor:pointer;border-radius:4px}.tw:active{background:rgba(0,0,0,.08)}`;
document.head.appendChild(st);
function wordText(k){return k==='notebook'?(W||LANGS[LANG].words.notebook):LANGS[LANG].words[k]||''}
function markWords(el,ks){if(!el||!ks||!ks.length)return;const ws=ks.map(k=>[k,wordText(k)]).filter(x=>x[1]).sort((a,b)=>b[1].length-a[1].length);if(!ws.length)return;
 const walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const ns=[];while(walk.nextNode())ns.push(walk.currentNode);
 for(const n of ns){if(n.parentNode.classList&&n.parentNode.classList.contains('tw'))continue;let t=n.nodeValue,hit=false;const f=document.createDocumentFragment();
  for(;;){let best=null;for(const[k,w]of ws){const i=t.indexOf(w);if(i>=0&&(!best||i<best[0]))best=[i,k,w]}if(!best)break;hit=true;
   const[i,k,w]=best;if(i)f.appendChild(document.createTextNode(t.slice(0,i)));const s=document.createElement('span');s.className='tw';s.dataset.k=k;s.textContent=w;f.appendChild(s);t=t.slice(i+w.length)}
  if(!hit)continue;if(t)f.appendChild(document.createTextNode(t));n.parentNode.replaceChild(f,n)}}
// taps on a word: play it, keep the line
for(const ev of ['pointerdown','click'])document.addEventListener(ev,e=>{const s=e.target.closest&&e.target.closest('.tw');if(!s)return;e.stopPropagation();e.preventDefault();if(ev==='pointerdown')speak(s.dataset.k)},true);
const _advance=advance;advance=function(){const r=_advance.apply(this,arguments);const ks=LINEW.slice();markWords(lineEl,ks);if(sayEl)markWords(sayEl.querySelector('span'),ks);return r};
}
