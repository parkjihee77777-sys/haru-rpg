// ---------- a taught word in a line is heard when tapped, not on its own (owner 11/06: 「설명 중 나오는 한자는 눌러야 소리 나오게」) ----------
// the word gets a dotted underline in the talk panel and in the bubble over the speaker; tapping it plays it and does not move the story on
{
const st=document.createElement('style');
st.textContent=`.tw{text-decoration:underline dotted 2px;text-underline-offset:4px;cursor:pointer;border-radius:4px}.tw:active{background:rgba(0,0,0,.08)}.tw::after{content:"🔊";font-size:.55em;margin-left:.15em;vertical-align:.25em;text-decoration:none;display:inline-block;opacity:.75}`;
document.head.appendChild(st);
function wordText(k){return k==='notebook'?(W||LANGS[LANG].words.notebook):LANGS[LANG].words[k]||''}
function markWords(el,ks){if(!el||!ks||!ks.length)return;const ws=ks.map(k=>[k,wordText(k)]).filter(x=>x[1]).sort((a,b)=>b[1].length-a[1].length);if(!ws.length)return;
 const walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const ns=[];while(walk.nextNode())ns.push(walk.currentNode);
 for(const n of ns){if(n.parentNode.closest&&n.parentNode.closest('.tw'))continue;let t=n.nodeValue,hit=false;const f=document.createDocumentFragment();
  for(;;){let best=null;for(const[k,w]of ws){const i=t.indexOf(w);if(i>=0&&(!best||i<best[0]))best=[i,k,w]}if(!best)break;hit=true;
   const[i,k,w]=best;if(i)f.appendChild(document.createTextNode(t.slice(0,i)));const s=document.createElement('span');s.className='tw';s.dataset.k=k;s.textContent=w;f.appendChild(s);t=t.slice(i+w.length)}
  if(!hit)continue;if(t)f.appendChild(document.createTextNode(t));n.parentNode.replaceChild(f,n)}}
// every other place a taught word shows (goal, choices, item-pick title, modals, toast): oneWord remembers each word it wrote, an observer marks it there too (11/09)
const ALLW=new Set();const _one=oneWord;oneWord=function(t){const r=_one(t);for(const k of LASTW)ALLW.add(k);return r};
const ROOTS='#talk,#goal,.say,#modal,#toast,#scene';let pend=new Set(),tm=0;
function flush(){tm=0;const ks=[...ALLW];const ps=pend;pend=new Set();if(!ks.length)return;const ws=ks.map(wordText).filter(Boolean);
 for(const n of ps){if(!n.isConnected)continue;const c=n.cloneNode(true);c.querySelectorAll('.tw').forEach(x=>x.remove());const t=c.textContent;if(!ws.some(w=>t.includes(w)))continue;
  n.querySelectorAll('.tk').forEach(x=>x.replaceWith(...x.childNodes));n.normalize();markWords(n,ks);if(window.fitTokens)fitTokens(n)}}
new MutationObserver(ms=>{for(const m of ms){let n=m.type==='characterData'?m.target.parentNode:m.target;if(!n||!n.closest)continue;if(m.type==='childList'&&!m.addedNodes.length)continue;const r=n.closest(ROOTS);if(r)pend.add(r)}if(pend.size&&!tm)tm=setTimeout(flush,30)}).observe(document.body,{childList:true,subtree:true,characterData:true});
// taps on a word: play it, keep the line
for(const ev of ['pointerdown','click'])document.addEventListener(ev,e=>{const s=e.target.closest&&e.target.closest('.tw');if(!s)return;if(s.closest('button,.opt,.choice,[onclick]')&&!s.closest('#line,.say')){if(ev==='pointerdown')speak(s.dataset.k);return}e.stopPropagation();e.preventDefault();if(ev==='pointerdown')speak(s.dataset.k)},true);
const _advance=advance;advance=function(){const r=_advance.apply(this,arguments);const ks=LINEW.slice();markWords(lineEl,ks);if(sayEl)markWords(sayEl.querySelector('span'),ks);return r};
}
