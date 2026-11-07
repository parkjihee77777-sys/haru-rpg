// ---------- 「팡팡이 종이비행기 잡기」 end-of-day review (owner 11/07: 하루하루 끝날 때마다 게임) ----------
// Duck-hunt style: paper planes with word cards fly across the sky; you hear a word (🔊) and tap its plane, Pangpang jumps and catches it.
// Wrong plane: it shakes and flies on, Pangpang tilts his head; after 2 misses the right plane glows. Three rounds, faster each time (~5 min).
// Words: today's, ~3 and ~7 days ago, and the ones missed before (RV_AGAIN) — the same pick as review.js, just more of them.
// It replaces review.js's wordReview (that one stays as the fallback when there are too few words or anything fails). Art: plane/*.
(function(){
const PL_ROUNDS=[{planes:2,goal:6,speed:.6},{planes:3,goal:8,speed:.75},{planes:3,goal:8,speed:.9}];
const COLORS=['mint','pink','yellow','sky','purple'];
const st=document.createElement('style');st.textContent=`
#plane{position:fixed;inset:0;z-index:900;overflow:hidden;background:#cfeaff url(plane/bg.jpg) center bottom/cover no-repeat;touch-action:manipulation;user-select:none}
#plane .pang{position:absolute;left:50%;bottom:6%;width:min(34vw,150px);transform:translateX(-50%);transition:bottom .35s cubic-bezier(.3,1.6,.5,1);pointer-events:none;z-index:5}
#plane .pang img.p{width:100%;display:block}
#plane .pang img.h{position:absolute;left:36%;top:36%;width:26%;border-radius:6px;display:none;transform:rotate(-4deg)}
#plane .pang.jump{bottom:32%}
#plane .pl{position:absolute;width:118px;height:142px;z-index:4;cursor:pointer}
#plane .pl .w{position:absolute;left:0;top:0;width:118px;filter:drop-shadow(0 4px 4px #0002);pointer-events:none}
#plane .pl .c{position:absolute;left:27px;top:74px;width:64px;height:64px;object-fit:cover;border-radius:10px;border:3px solid #fff;box-shadow:0 3px 6px #0003;background:#fff;pointer-events:none}
#plane .pl.glow .c{animation:plglow .8s infinite alternate}
@keyframes plglow{to{box-shadow:0 0 0 6px #ffe066,0 0 22px 8px #ffd23f}}
#plane .pl.shake{animation:plshake .4s}
@keyframes plshake{25%{margin-left:-10px}75%{margin-left:10px}}
#plane .bub{position:absolute;left:50%;bottom:calc(6% + min(34vw,150px) + 26px);transform:translateX(-50%);background:#fff;border:3px solid #3a2a1a;border-radius:22px;padding:8px 22px;font-size:30px;z-index:6;cursor:pointer}
#plane .bub:after{content:'';position:absolute;left:50%;bottom:-14px;margin-left:-10px;border:10px solid transparent;border-top-color:#3a2a1a}
#plane .bar{position:absolute;top:10px;left:10px;right:10px;display:flex;gap:8px;align-items:center;z-index:7}
#plane .bar .rd{background:#fff;border-radius:12px;padding:4px 10px;font-weight:800}
#plane .bar .g{flex:1;height:18px;background:#fff8;border-radius:9px;overflow:hidden;border:2px solid #fff}
#plane .bar .g i{display:block;height:100%;width:0;background:linear-gradient(90deg,#ffb347,#ff7a59);transition:width .4s}
#plane .bar .skip{background:#fff;border:0;border-radius:12px;padding:4px 10px;font-weight:800;font-size:15px;display:none}
#plane .end{position:absolute;inset:0;background:#fffbe9ee;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;z-index:20}
#plane .end .cs{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:520px;padding:0 16px}
#plane .end .cs img{width:70px;height:70px;object-fit:cover;border-radius:10px;border:3px solid #fff;box-shadow:0 2px 6px #0002;cursor:pointer}
#plane .end button.big{font-size:22px}
#plane .start{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:21;background:#0003}
#plane .conf{position:absolute;width:10px;height:14px;z-index:15;pointer-events:none}`;
document.head.appendChild(st);

const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
// the review's own pick (review.js rvWords) widened to up to 10 words: missed ones first, today's, ~3 and ~7 days ago, then the newest
function plWords(n){const D=DAY,ks=[...FOUND].filter(rvOk),out=[];const add=k=>{if(k&&rvOk(k)&&!out.includes(k)&&out.length<n)out.push(k)};
 RV_AGAIN.slice(0,3).forEach(add);const today=shuf(ks.filter(k=>FDAY[k]===D));today.slice(0,4).forEach(add);
 for(const ago of [3,7]){const c=ks.filter(k=>FDAY[k]<D&&!out.includes(k));if(!c.length)continue;const d=k=>Math.abs(FDAY[k]-(D-ago)),best=Math.min(...c.map(d));shuf(c.filter(k=>d(k)===best)).slice(0,2).forEach(add)}
 for(const k of today.concat(shuf([...TODAY]),ks.slice().sort((a,b)=>(FDAY[b]||0)-(FDAY[a]||0))))add(k);
 return out}

window.planeReview=function(done){
 const ws=plWords(10);if(ws.length<3)return false;
 let fin=false,R=0,got=0,target=null,miss=0,planes=[],lock=false,raf=0;const caught=[],missed=new Set();
 busy=true;try{closeBubble&&closeBubble()}catch(e){}setGoal('');
 const box=document.createElement('div');box.id='plane';
 box.innerHTML=`<div class="bar"><span class="rd">1</span><div class="g"><i></i></div><button class="skip">⏭</button></div>
  <div class="bub">🔊</div><div class="pang"><img class="p" src="plane/pang_sit.png" alt=""><img class="h" alt=""></div>
  <div class="start"><button class="big">▶</button></div>`;
 document.body.appendChild(box);
 const $=s=>box.querySelector(s),pang=$('.pang'),pimg=$('.pang .p'),held=$('.pang .h');
 const end=()=>{if(fin)return;fin=true;cancelAnimationFrame(raf);box.remove();busy=false;
  RV_AGAIN=[...missed].concat(RV_AGAIN.filter(k=>!missed.has(k)&&!caught.includes(k))).slice(0,8);try{rvStore()}catch(e){}done()};
 // a queue of targets: every word once, shuffled, again and again; a missed word comes back sooner
 let queue=[];const nextWord=()=>{if(!queue.length)queue=shuf(ws);let k=queue.shift();if(k===target&&queue.length){queue.push(k);k=queue.shift()}return k};
 const others=(k,n)=>{const pool=shuf(ws.filter(q=>q!==k)),ex=rvOthers(k);const out=[];for(const q of pool.concat(ex))if(out.length<n&&q!==k&&!out.includes(q)&&cardOf(q))out.push(q);return out};
 function spawn(){planes.forEach(p=>p.el.remove());planes=[];miss=0;lock=false;target=nextWord();const n=PL_ROUNDS[R].planes;
  shuf([target].concat(others(target,n-1))).forEach((k,i)=>{const el=document.createElement('div');el.className='pl';
   el.innerHTML=`<img class="w" src="plane/plane_${COLORS[(i+R+got)%5]}.png" alt=""><img class="c" src="${cardOf(k)}" alt="">`;box.appendChild(el);
   const p={k,el,x:-140-i*175,y:14+i*(46/n)+Math.random()*6,v:(1.2+Math.random()*.4)*PL_ROUNDS[R].speed,ph:Math.random()*6};
   el.addEventListener('pointerdown',ev=>{ev.preventDefault();tap(p)});planes.push(p)});
  setTimeout(()=>speak(target),300)}
 function tap(p){if(lock||fin)return;speak(p.k);
  if(p.k===target){lock=true;catchIt(p);return}
  miss++;missed.add(target);try{buzz()}catch(e){}p.el.classList.remove('shake');void p.el.offsetWidth;p.el.classList.add('shake');p.x=-140;
  pimg.src='plane/pang_tilt.png';setTimeout(()=>{if(!lock)pimg.src='plane/pang_sit.png'},700);
  if(miss>=2){const t=planes.find(q=>q.k===target);t&&t.el.classList.add('glow')}}
 function catchIt(p){pimg.src='plane/pang_jump.png';pang.classList.add('jump');p.el.style.transition='all .35s';p.el.style.left='calc(50% - 59px)';p.el.style.top='48%';p.el.style.opacity='0';p.gone=1;
  setTimeout(()=>{pimg.src='plane/pang_hold.png';held.src=cardOf(p.k);held.style.display='block';try{chime()}catch(e){}confetti();got++;if(!caught.includes(p.k))caught.push(p.k);
   $('.g i').style.width=Math.min(100,got/PL_ROUNDS[R].goal*100)+'%'},250);
  setTimeout(()=>pang.classList.remove('jump'),700);
  setTimeout(()=>{if(fin)return;held.style.display='none';pimg.src='plane/pang_sit.png';
   if(got>=PL_ROUNDS[R].goal){got=0;R++;$('.skip').style.display='block';if(R>=PL_ROUNDS.length){finish();return}$('.rd').textContent=R+1;$('.g i').style.width='0'}
   spawn()},1500)}
 function confetti(){const cols=['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#c77dff'];const W=box.clientWidth,H=box.clientHeight;
  for(let i=0;i<28;i++){const c=document.createElement('div');c.className='conf';c.style.background=cols[i%5];box.appendChild(c);
   const a=Math.random()*Math.PI*2,s=4+Math.random()*7;let vx=Math.cos(a)*s,vy=Math.sin(a)*s-6,X=W/2,Y=H*.55,r=0;
   const t=setInterval(()=>{X+=vx;Y+=vy;vy+=.35;r+=12;c.style.left=X+'px';c.style.top=Y+'px';c.style.transform=`rotate(${r}deg)`;if(Y>H){clearInterval(t);c.remove()}},16)}}
 function finish(){planes.forEach(p=>p.el.remove());planes=[];const e=document.createElement('div');e.className='end';
  e.innerHTML=`<img src="plane/pang_jump.png" style="width:130px" alt=""><div style="font-size:26px">🎉</div><div class="cs">${caught.map(k=>`<img data-k="${k}" src="${cardOf(k)}" alt="">`).join('')}</div><button class="big">▶</button>`;
  box.appendChild(e);try{chime()}catch(er){}e.querySelectorAll('[data-k]').forEach(im=>im.onclick=()=>speak(im.dataset.k));
  const born=performance.now();e.querySelector('button').onclick=()=>{if(performance.now()-born<400)return;end()}}
 $('.bub').onclick=()=>{if(target)speak(target)};
 $('.skip').onclick=ev=>{ev.stopPropagation();finish()};
 $('.start button').onclick=()=>{$('.start').remove();spawn();
  const loop=()=>{if(fin)return;const W=box.clientWidth;for(const p of planes){if(p.gone)continue;p.x+=p.v*2.2;p.ph+=.04;if(p.x>W+20)p.x=-140;p.el.style.left=p.x+'px';p.el.style.top=`calc(${p.y}% + ${Math.sin(p.ph)*18}px)`}raf=requestAnimationFrame(loop)};loop()};
 return true};
// the end-of-day hook in review.js calls wordReview: try the plane game first
if(typeof wordReview==='function'){const _wr=wordReview;wordReview=function(done){let ok=false;if(navigator.webdriver||/[?&]noplane/.test(location.search)){_wr(done);return}// test bots (predeploy, qa) know the old review screen
 try{ok=planeReview(done)}catch(e){console.warn('plane',e);ok=false;const b=document.getElementById('plane');if(b)b.remove()}if(!ok)_wr(done)}}
})();
