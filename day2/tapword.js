// ---------- a taught word in a line is heard when tapped, not on its own (owner 11/06: 「설명 중 나오는 한자는 눌러야 소리 나오게」) ----------
// the word gets a dotted underline in the talk panel and in the bubble over the speaker; tapping it plays it and does not move the story on
{
const st=document.createElement('style');
st.textContent=`.say .tw{pointer-events:auto}.tw{text-decoration:underline dotted 2px;text-underline-offset:4px;cursor:pointer;border-radius:4px}.tw:active{background:rgba(0,0,0,.08)}.tw::after{content:"🔊";font-size:.55em;margin-left:.15em;vertical-align:.25em;text-decoration:none;display:inline-block;opacity:.75}`;
document.head.appendChild(st);
function wordText(k){return k==='notebook'?(W||LANGS[LANG].words.notebook):LANGS[LANG].words[k]||''}
// (11/13 owner) a Korean word is marked only as a whole word: 「자」 in 「자리」·「자기」 is another word. It counts when no Hangul comes before it and what follows is nothing or a particle/ending.
const WPART=/^(?:이랑|이라고|이라는|이라|이란|이에요|이잖아|이었|이야|이다|이고|이며|이니|이네|이지|인데|인가|일까|으로|에서|에게|한테|처럼|보다|부터|까지|마다|조차|밖에|만큼|예요|잖아|이|가|은|는|을|를|의|도|만|에|로|와|과|랑|야|라|란|들|쯤|뿐|께|네)/;
// (11/13 owner) in every language: no mark when the spot lies inside a longer taught word of that language (book / bookshelf, 球 / 球门, ほん / ほんだな, 공 / 공책)
const LONGER={};function longerOf(w){const key=LANG+'|'+w;if(!LONGER[key])LONGER[key]=Object.values((LANGS[LANG]&&LANGS[LANG].words)||{}).filter(u=>u&&u.length>w.length&&u.includes(w));return LONGER[key]}
function inLonger(t,w,i){for(const u of longerOf(w)){let j=t.indexOf(u,Math.max(0,i-u.length+1));while(j>=0&&j<i+w.length){if(j<=i&&j+u.length>=i+w.length)return true;j=t.indexOf(u,j+1)}}return false}
function wordIdx(t,w,prev){const hg=/[가-힣]/.test(w);let from=0;for(;;){const i=t.indexOf(w,from);if(i<0)return -1;
 if(hg){const before=i?t[i-1]:prev;const rest=t.slice(i+w.length);if((before&&/[가-힣]/.test(before))||(/^[가-힣]/.test(rest)&&!WPART.test(rest))){from=i+1;continue}}
 if(inLonger(t,w,i)){from=i+1;continue}return i}}
function markWords(el,ks){if(!el||!ks||!ks.length)return;const ws=ks.map(k=>[k,wordText(k)]).filter(x=>x[1]).sort((a,b)=>b[1].length-a[1].length);if(!ws.length)return;
 const walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const ns=[];while(walk.nextNode())ns.push(walk.currentNode);
 for(const n of ns){if(n.parentNode.closest&&n.parentNode.closest('.tw'))continue;let t=n.nodeValue,hit=false;const f=document.createDocumentFragment();
  let prev='';for(;;){let best=null;for(const[k,w]of ws){const i=wordIdx(t,w,prev);if(i>=0&&(!best||i<best[0]))best=[i,k,w]}if(!best)break;hit=true;
   const[i,k,w]=best;if(i)f.appendChild(document.createTextNode(t.slice(0,i)));const s=document.createElement('span');s.className='tw';s.dataset.k=k;s.textContent=w;f.appendChild(s);prev=w.slice(-1);t=t.slice(i+w.length)}
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
// (11/10 owner, trial: only with ?pic=1) tapping a foreign word that was already found also shows its picture small above the word for a moment
{let PICT=false;try{const q=new URLSearchParams(location.search).get('pic');if(q==='1')localStorage.setItem('haru_pic','1');if(q==='0')localStorage.removeItem('haru_pic');PICT=localStorage.getItem('haru_pic')==='1'}catch(e){}
 if(PICT){const st=document.createElement('style');st.textContent='#twpic{position:fixed;z-index:9000;pointer-events:none;background:#fff;border:3px solid #e8c56a;border-radius:14px;padding:4px;box-shadow:0 4px 12px rgba(0,0,0,.25);transform:translate(-50%,-100%) scale(.6);opacity:0;transition:transform .15s,opacity .15s}#twpic.on{transform:translate(-50%,-100%) scale(1);opacity:1}#twpic img{display:block;width:96px;height:96px;object-fit:contain;border-radius:10px}';document.head.appendChild(st);
  const box=document.createElement('div');box.id='twpic';box.innerHTML='<img alt="">';document.body.appendChild(box);let tm=0;
  const picOf=k=>{try{if(typeof PIC!=='undefined'&&PIC[k])return PIC[k];if(typeof cardOf==='function')return cardOf(k)}catch(e){}return null};
  document.addEventListener('pointerdown',e=>{const s=e.target.closest&&e.target.closest('.tw');if(!s)return;const k=s.dataset.k;
   if(!(typeof FOUND!=='undefined'&&FOUND.has(k)))return;// not found yet: sound only, so a find's answer is never shown
   const src=picOf(k);if(!src)return;const r=s.getBoundingClientRect();box.firstChild.src=src;
   box.style.left=Math.max(60,Math.min(innerWidth-60,r.left+r.width/2))+'px';box.style.top=Math.max(116,r.top-6)+'px';
   box.classList.add('on');clearTimeout(tm);tm=setTimeout(()=>box.classList.remove('on'),1600)},true)}}
