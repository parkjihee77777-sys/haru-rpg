// ---------- end-of-day word review (owner 11/06: 「친구는 하루 2명 그대로, 하루 끝에 짧은 복습 게임」) ----------
// From Day 3 on, after the night notebook and before the day-end card: about 5 words, one per screen, no text —
// today's new words, a word from about 3 days ago and about 7 days ago, and the words missed in the last review (RV_AGAIN).
// Two kinds, mixed: 🔊 hear the word → tap its picture (of 4) / see the picture → tap the word (of 4).
// Right = chime, next. Wrong = buzz, the right one lights up and is heard, the word comes back next time.
// The day a word was first found is kept in the save (foundDay); words from older saves count as found on Day 2.
const FDAY={};let RV_AGAIN=[];
{const _a=FOUND.add.bind(FOUND);FOUND.add=function(k){if(!(k in FDAY))FDAY[k]=DAY;return _a(k)}}
for(const k of FOUND)if(!(k in FDAY))FDAY[k]=DAY;
function rvStore(){try{const s=JSON.parse(localStorage.getItem('haru_save')||'null');if(!s)return;const fd={};for(const k of FOUND)if(k in FDAY)fd[k]=FDAY[k];
 s.foundDay=fd;s.again=RV_AGAIN.slice(0,8);localStorage.setItem('haru_save',JSON.stringify(s))}catch(e){}}
{const _s=saveDay;saveDay=function(){const r=_s.apply(this,arguments);rvStore();return r}}
if(typeof saveMid==='function'){const _m=saveMid;saveMid=function(){const r=_m.apply(this,arguments);rvStore();return r}}
{const _c=contGame;contGame=function(s){const fd=(s&&s.foundDay)||{};for(const k in FDAY)delete FDAY[k];for(const k of FOUND)FDAY[k]=fd[k]!=null?fd[k]:2;
 RV_AGAIN=((s&&s.again)||[]).slice();return _c.apply(this,arguments)}}
// people and words a picture can't show clearly stay out
const RV_SKIP=new Set(['mom','dad','friend','teacher','grandma','name','line','shadow','wall']);
const rvShuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function rvOk(k){return!!(k&&!RV_SKIP.has(k)&&!Object.values(WORDKEY).includes(k)&&!D2IDS.includes(k)&&LANGS[LANG].words[k]&&cardOf(k))}
function rvWords(){const D=DAY,ks=[...FOUND].filter(rvOk),out=[];const add=k=>{if(k&&rvOk(k)&&!out.includes(k)&&out.length<5)out.push(k)};
 RV_AGAIN.slice(0,2).forEach(add);
 const today=rvShuf(ks.filter(k=>FDAY[k]===D));add(today[0]);add(today[1]);
 for(const ago of [3,7]){const c=ks.filter(k=>FDAY[k]<D&&!out.includes(k));if(!c.length)continue;const d=k=>Math.abs(FDAY[k]-(D-ago)),best=Math.min(...c.map(d));add(rvShuf(c.filter(k=>d(k)===best))[0])}
 for(const k of today.concat(rvShuf([...TODAY]),ks.slice().sort((a,b)=>(FDAY[b]||0)-(FDAY[a]||0))))add(k);
 return rvShuf(out)}
// 3 others: learned words first, never a look-alike, never the same picture or the same written word
function rvOthers(k){const seen=new Set([cardOf(k)]),sw=new Set([wordOf(k)]),out=[];
 const ok=q=>q!==k&&rvOk(q)&&!(typeof lookalike==='function'&&lookalike(q,k))&&!seen.has(cardOf(q))&&!sw.has(wordOf(q));
 for(const q of rvShuf([...FOUND]).concat(rvShuf([...CARDS_HAVE])))if(out.length<3&&ok(q)){out.push(q);seen.add(cardOf(q));sw.add(wordOf(q))}
 return out}
{const st=document.createElement('style');st.textContent=`
#mcard.rvcard{padding:14px 14px 18px}
.rvtop{display:flex;gap:6px;justify-content:center;margin:0 0 12px}.rvtop i{width:34px;height:10px;border-radius:99px;background:#e8dcc4}.rvtop i.d{background:var(--mint)}.rvtop i.x{background:#e7a08a}
.rvq{display:flex;justify-content:center;align-items:center;min-height:64px;margin:0 0 12px}
.rvq .spk{font-size:34px;padding:10px 26px;border-color:var(--mint);box-shadow:0 4px 0 #3f9a7c}
.rvq img{width:min(200px,52vw);border-radius:18px;border:4px solid var(--line);display:block}
.rvg{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:340px;margin:0 auto}
.rvg button{font:inherit;background:#fff;border:4px solid var(--line);border-radius:18px;box-shadow:0 5px 0 var(--line);padding:6px;cursor:pointer;color:var(--ink)}
.rvg button img{width:100%;display:block;border-radius:12px;aspect-ratio:1;object-fit:cover}
.rvg.w button{font-weight:800;font-size:21px;padding:14px 6px;min-height:64px;word-break:keep-all;overflow-wrap:anywhere}
.rvg button.ok{border-color:var(--mint);background:#eafff6;box-shadow:0 5px 0 #3f9a7c}
.rvg button.no{border-color:#e7a08a;animation:shake .4s}
.rvg button.dim{opacity:.35}
.rvend{font-size:30px;letter-spacing:2px;white-space:nowrap;margin:6px 0 4px}.rvend b{font-size:22px;letter-spacing:0;color:var(--ink);vertical-align:middle;margin-left:8px}
.rvmiss{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0 0}.rvmiss button{background:#fff;border:3px solid var(--line);border-radius:14px;padding:4px;width:72px;cursor:pointer;font:inherit;font-weight:800;font-size:13px;color:var(--ink)}.rvmiss img{width:100%;border-radius:9px;display:block}`;
 document.head.appendChild(st)}
// the review itself; done() always runs (a missing picture drops that word, an error ends the review)
function wordReview(done){let fin=false;const end=()=>{if(fin)return;fin=true;const c=document.getElementById('mcard');c.classList.remove('rvcard');document.getElementById('modal').classList.remove('on');busy=false;done()};
 try{const ws=rvWords();if(ws.length<2){end();return}
  const m=document.getElementById('modal'),c=document.getElementById('mcard');busy=true;closeBubble&&closeBubble();setGoal('');
  const res=[],flip=Math.random()<.5;let i=0;
  const bar=()=>`<div class="rvtop">${ws.map((_,j)=>`<i class="${j<res.length?(res[j]?'d':'x'):''}"></i>`).join('')}</div>`;
  const next=()=>{if(i>=ws.length){finish();return}const k=ws[i],hear=(i%2===0)!==flip,os=rvOthers(k);if(os.length<2){i++;res.push(true);next();return}
   const items=rvShuf([k].concat(os));let lock=false;
   c.className='card rvcard';c.innerHTML=`<div id="rv" data-k="${k}">${bar()}<div class="rvq">${hear?'<button class="spk" id="rvsnd">🔊</button>':`<img src="${cardOf(k)}" alt="">`}</div>
    <div class="rvg${hear?'':' w'}">${items.map(q=>`<button data-r="${q}">${hear?`<img src="${cardOf(q)}" alt="">`:wordOf(q)}</button>`).join('')}</div></div>`;
   m.classList.add('on');
   const qi=c.querySelector('.rvq img');if(qi)qi.onerror=()=>{if(c.querySelector('#rv')&&c.querySelector('#rv').dataset.k===k&&!lock){lock=true;i++;next()}};
   c.querySelectorAll('.rvg img').forEach(im=>im.onerror=()=>{const b=im.closest('button');if(b.dataset.r===k){if(!lock){lock=true;i++;next()}}else b.remove()});
   if(hear){setTimeout(()=>speak(k),350);c.querySelector('#rvsnd').onclick=()=>speak(k)}
   c.querySelectorAll('.rvg button').forEach(b=>b.onclick=()=>{if(lock)return;lock=true;const ok=b.dataset.r===k,rb=c.querySelector(`.rvg [data-r="${k}"]`);
    c.querySelectorAll('.rvg button').forEach(x=>{if(x!==b&&x!==rb)x.classList.add('dim')});rb&&rb.classList.add('ok');
    if(ok){chime();RV_AGAIN=RV_AGAIN.filter(q=>q!==k)}else{buzz();b.classList.add('no');RV_AGAIN=[k].concat(RV_AGAIN.filter(q=>q!==k))}
    setTimeout(()=>speak(k),ok?150:450);res.push(ok);setTimeout(()=>{i++;next()},ok?1100:1900)})};
  const finish=()=>{const n=res.filter(Boolean).length,miss=ws.filter((k,j)=>res[j]===false);
   c.className='card rvcard';c.innerHTML=`<div id="rv">${bar()}<div class="rvend">${res.map(r=>r?'⭐':'☆').join('')}<b>${n}/${res.length}</b></div>
    ${miss.length?`<div class="rvmiss">${miss.map(k=>`<button data-s="${k}"><img src="${cardOf(k)}" alt="">${wordOf(k)} 🔊</button>`).join('')}</div>`:''}<button class="big" id="rvgo">▶</button></div>`;
   m.classList.add('on');if(n===res.length)chime();c.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>speak(b.dataset.s));
   const go=c.querySelector('#rvgo'),born=performance.now();go.onclick=()=>{if(performance.now()-born<400)return;end()}};
  next()}catch(e){console.warn('review',e);end()}}
// after the night notebook, before the day-end card (once per day played)
const RV_DONE=new Set();
{const _e2=end2;end2=function(){const a=arguments,self=this;if(DAY>=2&&!RV_DONE.has(DAY)&&!/[?&]norv/.test(location.search)){RV_DONE.add(DAY);wordReview(()=>_e2.apply(self,a));return}return _e2.apply(self,a)}}
{const _sd=startDay;startDay=function(n){RV_DONE.delete(n);return _sd.apply(this,arguments)}}
