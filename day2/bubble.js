// end-of-day review: Pangpang's bubble shooter (bubble/index.html in a full-screen frame) comes first; the plane game and the old review stay as fallbacks
const bbShuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
// same pick as the plane game: missed ones first, today's, ~3 and ~7 days ago, then the newest
function bbWords(n){const D=DAY,ks=[...FOUND].filter(k=>rvOk(k)&&cardOf(k)),out=[];const add=k=>{if(k&&rvOk(k)&&cardOf(k)&&!out.includes(k)&&out.length<n)out.push(k)};
 RV_AGAIN.slice(0,3).forEach(add);const today=bbShuf(ks.filter(k=>FDAY[k]===D));today.slice(0,4).forEach(add);
 for(const ago of [3,7]){const c=ks.filter(k=>FDAY[k]<D&&!out.includes(k));if(!c.length)continue;const d=k=>Math.abs(FDAY[k]-(D-ago)),best=Math.min(...c.map(d));bbShuf(c.filter(k=>d(k)===best)).slice(0,2).forEach(add)}
 for(const k of today.concat(typeof TODAY!=='undefined'?bbShuf([...TODAY]):[],ks.slice().sort((a,b)=>(FDAY[b]||0)-(FDAY[a]||0))))add(k);
 return out}
window.bubbleReview=function(done){
 const keys=bbWords(8);if(keys.length<3)return false;
 const today=keys.filter(k=>FDAY[k]===DAY),past=keys.filter(k=>FDAY[k]!==DAY).sort((a,b)=>(FDAY[a]||0)-(FDAY[b]||0)).map(k=>({k,missed:RV_AGAIN.includes(k)}));
 busy=true;try{closeBubble&&closeBubble()}catch(e){}setGoal('');
 const was=bgmNow;try{const a=BGM[bgmNow];if(a)a.pause()}catch(e){}
 const fr=document.createElement('iframe');fr.id='bubblegame';fr.title='bubble';fr.allow='autoplay';
 fr.style.cssText='position:fixed;inset:0;width:100%;height:100%;border:0;z-index:950;background:#c8f0e4';
 let fin=false;
 window.BUB_CFG={keys,today,past,muted:!!muted,word:k=>wordOf(k),pic:k=>'../'+cardOf(k),speak:k=>speak(k),tr:s=>tr(s),
  done(r){if(fin)return;fin=true;fr.remove();busy=false;
   const missed=new Set((r&&r.missed)||[]),caught=(r&&r.caught)||[];
   RV_AGAIN=[...missed].concat(RV_AGAIN.filter(k=>!missed.has(k)&&!caught.includes(k))).slice(0,8);try{rvStore()}catch(e){}
   try{if(was&&!muted){const a=BGM[was];if(a){a.volume=BGM_VOL;a.play().catch(()=>{})}}}catch(e){}
   done()}};
 fr.src='bubble/index.html?v='+(typeof BUILD!=='undefined'?BUILD:'');document.body.appendChild(fr);
 return true};
if(typeof wordReview==='function'){const _wr2=wordReview;wordReview=function(done){if(navigator.webdriver||/[?&]noplane/.test(location.search)){_wr2(done);return}// test bots know the old review screen
 let ok=false;if(!/[?&]nobubble/.test(location.search)){try{ok=bubbleReview(done)}catch(e){console.warn('bubble',e);ok=false;const f=document.getElementById('bubblegame');if(f)f.remove();busy=false}}
 if(!ok)_wr2(done)}}
