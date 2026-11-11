// end-of-day review: Pangpang's bubble shooter (bubble/index.html in a full-screen frame) comes first; the plane game and the old review stay as fallbacks
const bbShuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
// same pick as the plane game: missed ones first, today's, ~3 and ~7 days ago, then the newest
function bbWords(n){const D=DAY,ks=[...FOUND].filter(k=>rvOk(k)&&cardOf(k)),out=[];const add=k=>{if(k&&rvOk(k)&&cardOf(k)&&!out.includes(k)&&out.length<n)out.push(k)};
 RV_AGAIN.slice(0,3).forEach(add);const today=bbShuf(ks.filter(k=>FDAY[k]===D));today.slice(0,4).forEach(add);
 for(const ago of [3,7]){const c=ks.filter(k=>FDAY[k]<D&&!out.includes(k));if(!c.length)continue;const d=k=>Math.abs(FDAY[k]-(D-ago)),best=Math.min(...c.map(d));bbShuf(c.filter(k=>d(k)===best)).slice(0,2).forEach(add)}
 for(const k of today.concat(typeof TODAY!=='undefined'?bbShuf([...TODAY]):[],ks.slice().sort((a,b)=>(FDAY[b]||0)-(FDAY[a]||0))))add(k);
 return out}
// (11/08 owner) two words were heard at once: one word's voice at a time, and none while a shot flies
function bbHush(){try{for(const a of Object.values(SND)){a.pause();a.currentTime=0}}catch(e){}try{speechSynthesis.cancel()}catch(e){}}
window.bubbleReview=function(done){
 const keys=bbWords(23);if(keys.length<3)return false;
 const today=keys.filter(k=>FDAY[k]===DAY),past=keys.filter(k=>FDAY[k]!==DAY).sort((a,b)=>(FDAY[a]||0)-(FDAY[b]||0)).map(k=>({k,missed:RV_AGAIN.includes(k)}));
 busy=true;try{closeBubble&&closeBubble()}catch(e){}setGoal('');
 const was=bgmNow;try{const a=BGM[bgmNow];if(a)a.pause()}catch(e){}
 const fr=document.createElement('iframe');fr.id='bubblegame';fr.title='bubble';fr.allow='autoplay';
 fr.style.cssText='position:fixed;inset:0;width:100%;height:100%;border:0;z-index:950;background:#c8f0e4';
 let fin=false;
 window.BUB_CFG={keys,today,past,muted:!!muted,word:k=>wordOf(k),pic:k=>'../'+cardOf(k),speak:k=>{bbHush();speak(k)},hush:()=>bbHush(),tr:s=>tr(s),
  done(r){if(fin)return;fin=true;fr.remove();busy=false;
   const missed=new Set((r&&r.missed)||[]),caught=(r&&r.caught)||[];
   RV_AGAIN=[...missed].concat(RV_AGAIN.filter(k=>!missed.has(k)&&!caught.includes(k))).slice(0,8);try{rvStore()}catch(e){}
   try{if(was&&!muted){const a=BGM[was];if(a){a.volume=BGM_VOL;a.play().catch(()=>{})}}}catch(e){}
   done()}};
 // (11/12) if the frame never loads (offline, blocked) the day must not stay frozen: after 15 s without the game starting, leave it
 let up=false;fr.onload=()=>{up=true};setTimeout(()=>{if(!up&&!fin)BUB_CFG.done({})},15000);
 fr.src='bubble/index.html?v='+(typeof BUILD!=='undefined'?BUILD:'');document.body.appendChild(fr);
 return true};
if(typeof wordReview==='function'){const _wr2=wordReview;wordReview=function(done){if(navigator.webdriver||/[?&]noplane/.test(location.search)){_wr2(done);return}// test bots know the old review screen
 let ok=false;if(!/[?&]nobubble/.test(location.search)){try{ok=bubbleReview(done)}catch(e){console.warn('bubble',e);ok=false;const f=document.getElementById('bubblegame');if(f)f.remove();busy=false}}
 if(!ok)_wr2(done)}}
// (11/11 owner) the day's last line jumped straight into the bubble game: keep the last picture a moment, dim it, and let the player start the game with a button
if(typeof wordReview==='function'){const _wr3=wordReview;wordReview=function(done){if(navigator.webdriver||/[?&](nobubble|noplane)/.test(location.search)){_wr3(done);return}
 busy=true;try{closeBubble&&closeBubble()}catch(e){}
 const st=document.getElementById('dayendcss')||Object.assign(document.createElement('style'),{id:'dayendcss',textContent:'#dayend{position:fixed;inset:0;z-index:9500;display:flex;align-items:center;justify-content:center;background:rgba(30,22,40,0);transition:background 1.2s}#dayend.on{background:rgba(30,22,40,.62)}#dayend .card{background:#fffaf0;border:4px solid #c9a46c;border-radius:24px;padding:22px 26px 20px;text-align:center;max-width:min(320px,86vw);opacity:0;transform:translateY(12px);transition:opacity .8s .5s,transform .8s .5s}#dayend.on .card{opacity:1;transform:none}#dayend img{width:110px;display:block;margin:0 auto 8px}#dayend h2{margin:0 0 14px;font-size:22px;color:#4a3424}#dayend button{font:inherit;font-size:18px;font-weight:700;color:#fff;background:#5fc2a0;border:0;border-radius:16px;padding:12px 22px;box-shadow:0 4px 0 #3f9a7c;cursor:pointer}'});document.head.appendChild(st);
 setTimeout(()=>{const o=document.createElement('div');o.id='dayend';o.innerHTML=`<div class="card"><img src="pang/happy.png" alt=""><h2>${tr('오늘 하루 끝 🌙')}</h2><button id="dayendgo">${tr('팡팡이랑 방울 톡톡')}</button></div>`;document.body.appendChild(o);
  requestAnimationFrame(()=>requestAnimationFrame(()=>o.classList.add('on')));
  o.querySelector('#dayendgo').onclick=e=>{e.stopPropagation();o.remove();busy=false;_wr3(done)}},1600)}}
(function(){const A={'오늘 하루 끝 🌙':{en:'The day is over 🌙',vi:'Một ngày đã kết thúc 🌙',zh:'今天结束啦 🌙',ja:'きょうも おしまい 🌙',ru:'День закончился 🌙',id:'Hari ini selesai 🌙'},'팡팡이랑 방울 톡톡':{en:'Bubble Pop with Pangpang',vi:'Bắn bóng cùng Pangpang',zh:'和胖胖一起泡泡啵啵',ja:'パンパンと バブル ポン',ru:'Пузырьки с Пангпангом',id:'Gelembung bersama Pangpang'}};
 window.T=window.T||{};for(const[k,v]of Object.entries(A))for(const[l,t]of Object.entries(v)){T[l]=T[l]||{};if(!T[l][k])T[l][k]=t}})();
