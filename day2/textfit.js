// ---------- text that fits its bubble (loaded last) ----------
// Lines break only between words: a Korean word keeps its particle and its quotes (「줄게」는, ‘낮춰’가, 가야지~), a foreign word stays whole.
// The talk panel avoids a lone word on the last line; an over-head bubble too tall for the screen goes to the talk panel instead;
// the OK button wraps instead of running off a phone screen.
{
const st=document.createElement('style');
st.textContent=`.tk{white-space:nowrap}.ph{display:inline-block;max-width:100%;text-indent:0;white-space:normal}
#line,#choices button,.card p{text-wrap:pretty}
.bubble{white-space:normal;max-width:min(420px,92vw);text-align:center;text-wrap:balance;line-height:1.3}
@media (max-width:600px){.bubble{max-width:min(420px,96vw)}}`;
document.head.appendChild(st);
// wrap every space-separated piece of the element's text in a no-break span (long pieces and Chinese/Japanese, which has no spaces, can still break)
function fitTokens(el){if(!el)return;const walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const ns=[];while(walk.nextNode())ns.push(walk.currentNode);
 for(const n of ns){if(n.parentNode&&n.parentNode.classList&&n.parentNode.classList.contains('tk'))continue;const parts=n.nodeValue.split(/(\s+)/);if(parts.length<2&&!/\S/.test(n.nodeValue))continue;
  const f=document.createDocumentFragment();for(const p of parts){if(!p)continue;if(/^\s+$/.test(p)||p.length>18||/[\u3040-\u30ff\u3400-\u9fff]/.test(p)){f.appendChild(document.createTextNode(p));continue}const s=document.createElement('span');s.className='tk';s.textContent=p;f.appendChild(s)}
  n.parentNode.replaceChild(f,n)}
 keepPhrases(el)}
// (11/26 owner: 장학사 「문장이 끊긴다」 — 「오늘부터 새 학교야. 여기 / 말도 아직 서툰데……」, 「아침. 아직 풀지 못한 / 상자들이」)
// each clause (up to the next . , ? ! … 」 etc.) becomes an inline block: a clause that does not fit on the rest of a line starts on a new line
// instead of being cut in the middle; a clause longer than a whole line still wraps between words inside its block
function keepPhrases(el){if(!el||el.querySelector('.ph'))return;const walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const ns=[];let full='';const at=[];
 while(walk.nextNode()){const n=walk.currentNode;ns.push(n);for(let i=0;i<n.nodeValue.length;i++)at.push([n,i]);full+=n.nodeValue}
 const cuts=[0];full.replace(/[.?!,…~」』)\]。，！？]+(?=\s)/g,(m,o)=>{cuts.push(o+m.length);return m});cuts.push(full.length);
 const segs=[];for(let k=0;k+1<cuts.length;k++){let a=cuts[k],b=cuts[k+1];while(a<b&&/\s/.test(full[a]))a++;while(b>a&&/\s/.test(full[b-1]))b--;if(b>a)segs.push([a,b])}
 if(segs.length<2)return;
 // start/end outside the word spans (.tk, a taught word) so the clause block never ends up inside a no-wrap word
 const up=(n,first)=>{while(n.parentNode&&n.parentNode!==el&&(first?n.parentNode.firstChild:n.parentNode.lastChild)===n)n=n.parentNode;return n};
 for(const [a,b] of segs.reverse()){const r=document.createRange();try{const [sn,so]=at[a],[en,eo]=at[b-1];
  if(so===0)r.setStartBefore(up(sn,true));else r.setStart(sn,so);
  if(eo===en.nodeValue.length-1)r.setEndAfter(up(en,false));else r.setEnd(en,eo+1);
  const s=document.createElement('span');s.className='ph';s.appendChild(r.extractContents());r.insertNode(s)}catch(x){}}}
window.fitTokens=fitTokens;
// over-head bubbles: whole words; one taller than about four lines (five on a wide screen) moves to the talk panel
const _showSay=showSay;
showSay=function(who,text){const ok=_showSay(who,text);if(!ok||!sayEl)return ok;const tx=sayEl.querySelector('span');fitTokens(tx);
 const lh=parseFloat(getComputedStyle(sayEl).lineHeight)||30,lines=Math.round((tx?tx.getBoundingClientRect().height/(cam.s||1):0)/lh);
 if(lines>(innerWidth<600?4:5)){sayEl.remove();sayEl=null;return false}return ok};
// the talk panel, the choices, the goal and the OK button
const _advance=advance;advance=function(){const r=_advance.apply(this,arguments);fitTokens(lineEl);return r};
const _ask=ask;ask=function(){const r=_ask.apply(this,arguments);fitTokens(lineEl);document.querySelectorAll('#choices button').forEach(fitTokens);return r};
const _find=find;find=function(){const r=_find.apply(this,arguments);fitTokens(document.getElementById('goal'));return r};
const _setGoal=setGoal;setGoal=function(){const r=_setGoal.apply(this,arguments);fitTokens(document.getElementById('goal'));return r};
const _tapThing=tapThing;tapThing=function(){const r=_tapThing.apply(this,arguments);if(bubble){fitTokens(bubble);if(typeof keepOnScreen==='function')keepOnScreen(bubble)}return r};
}
