// ---------- phone / tablet comfort (11/05 play-test fixes, loaded last) ----------
// 1 the day is saved at school arrival, after each meeting and at dinner: reopening goes on from there (not that morning)
// 2 a saved game opens on one big 「이어 하기」 card (no language or hero pick in between)
// 3 「처음부터 다시」 asks first; the day-end card ignores taps for a moment (fingers still tapping through lines)
// 4 an arrow at the screen edge points to a goal off screen (a find's thing only after 12 s of looking)
// 5 a find's tap on a thing (a desk) is that thing, not the 🔍 tray; outside finds the tray opens only next to its small things
// + smaller fixes: goal card, exit sign under buttons, 🔊 size, empty places, repeated lines, auto play, landscape, scene pictures, …
{
const st=document.createElement('style');
st.textContent=`
#edgeArrow{position:fixed;z-index:24;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;border:4px solid #fff;background:#ffd84a;box-shadow:0 3px 8px rgba(0,0,0,.35);display:none;align-items:center;justify-content:center;padding:0;cursor:pointer;animation:arrowBeat 1.1s ease-in-out infinite}
@keyframes arrowBeat{50%{transform:scale(1.15)}}
#edgeArrow span{display:block;font-size:30px;line-height:1;color:#4a3424;font-weight:900}
.ghost{font:inherit;font-size:15px;font-weight:700;background:none;border:2px solid #d9c6a5;color:#8a7a6a;border-radius:14px;padding:8px 16px;margin:8px 4px 0;cursor:pointer}
.minor{margin-top:10px}
.confirm{margin-top:12px;padding:12px;border:2px dashed #e0a0a0;border-radius:16px;background:#fff6f4}
.confirm p{font-size:16px!important}
.card.lock button{pointer-events:none}
.contcard img.face{width:120px;height:120px;border-radius:24px;border:4px solid var(--line);display:block;margin:10px auto 0;object-fit:cover}
.pick.places button{position:relative}.pick.places button.empty{opacity:.42}
.pick.places .pc{position:absolute;right:-6px;top:-8px;min-width:30px;height:30px;border-radius:999px;background:var(--mint);color:#fff;font-weight:900;font-size:16px;line-height:30px;padding:0 6px;box-shadow:0 2px 0 #3f9a7c}
.pick.places .word{white-space:normal!important;font-size:15px!important;line-height:1.25}
.pick button .word{white-space:nowrap}.pick.dayend button .word{white-space:normal}.pick.dayend .tw{text-decoration:none}.pick.dayend .tw::after{display:none}
#autoBtn{position:fixed;z-index:26;width:44px;height:44px;border-radius:50%;border:3px solid var(--line);background:var(--paper);box-shadow:0 3px 0 var(--line);font-size:19px;padding:0;display:none;cursor:pointer}
#autoBtn.on{background:var(--mint);border-color:#3f9a7c;box-shadow:0 3px 0 #3f9a7c}
.nope{position:fixed;left:50%;top:42%;z-index:60;width:84px;height:84px;margin:-42px 0 0 -42px;border-radius:50%;background:#ff6b6b;color:#fff;font-size:52px;font-weight:900;line-height:84px;text-align:center;pointer-events:none;animation:nope .7s forwards}
@keyframes nope{0%{transform:scale(.5);opacity:0}20%{transform:scale(1.1);opacity:1}70%{opacity:1}100%{transform:scale(1);opacity:0}}
.ztitle{margin:0 0 10px;font-size:18px}
#goal{white-space:normal!important;text-overflow:clip!important;text-wrap:balance}
#goal.mini{font-size:15px;padding:6px 14px;max-width:min(calc(100% - 120px),460px)}
@media (min-width:601px){#goal{max-width:calc(100% - 300px)}}
@media (max-width:600px){#goal.mini{top:60px}}
.smark{opacity:.88;transform:translate(-50%,-50%) scale(var(--ms,1))}.smark.on{transform:translate(-50%,-50%) scale(calc(var(--ms,1) * 1.3))}
.gauge{transform:translate(-50%,-100%) scale(.8);transform-origin:50% 100%}
#choices .okpick[style*="display: none"]{display:block!important;visibility:hidden}
#scene.on{background-color:transparent}
#sceneBg{position:fixed;inset:-40px;z-index:21;background:#000 center/cover no-repeat;filter:blur(16px) brightness(.5);display:none;pointer-events:none}
#talk{bottom:calc(12px + env(safe-area-inset-bottom,0px))}
#modal{padding-bottom:calc(16px + env(safe-area-inset-bottom,0px))}
@media (max-height:520px){.card{padding:10px 14px}.card h2{font-size:17px;margin-bottom:4px}.card p{font-size:15px;margin:3px 0}
 .big{font-size:16px;padding:9px 18px;margin-top:8px}.pick{margin:6px 0 2px;gap:10px}.pick button{width:min(96px,24vh)}.heroes button{width:min(110px,28vh)}
 .zit{width:min(84px,22vh);height:min(84px,22vh)}.ztray{padding:8px;gap:8px}.langs button{min-height:58px;padding:6px}.langs .flag{width:28px;height:28px}.lgroup{margin-top:8px}}
`;
document.head.appendChild(st);

// ---- words this file adds, in every screen language ----
const ADD={
 '새로 시작하기':{en:'Start a new game',vi:'Chơi mới',zh:'开始新游戏',ja:'あたらしくはじめる',ru:'Новая игра',id:'Mulai baru'},
 '처음부터 다시 할까요?':{en:'Start over from the beginning?',vi:'Chơi lại từ đầu nhé?',zh:'要从头开始吗？',ja:'さいしょからやりなおす？',ru:'Начать с самого начала?',id:'Mulai lagi dari awal?'},
 '지금까지 한 것이 모두 지워져요.':{en:'Everything you have played so far will be erased.',vi:'Mọi thứ bạn đã chơi sẽ bị xóa.',zh:'到现在为止的进度都会被删除。',ja:'いままでのきろくが ぜんぶ きえるよ。',ru:'Весь пройденный путь сотрётся.',id:'Semua yang sudah kamu mainkan akan terhapus.'},
 '네, 지울래요':{en:'Yes, erase it',vi:'Có, xóa đi',zh:'是的，删除',ja:'うん、けす',ru:'Да, стереть',id:'Ya, hapus'},
 '아니요':{en:'No',vi:'Không',zh:'不要',ja:'ううん',ru:'Нет',id:'Tidak'},
 '(오늘은 벌써 이야기했어. 다른 친구를 찾아보자.)':{en:'(We already talked today. Let me look for another friend.)',vi:'(Hôm nay nói chuyện rồi. Đi tìm bạn khác thôi.)',zh:'（今天已经聊过了。去找别的朋友吧。）',ja:'（きょうは もう 話したよ。ほかの友だちを さがそう。）',ru:'(Сегодня мы уже поговорили. Поищу другого друга.)',id:'(Hari ini sudah ngobrol. Ayo cari teman lain.)'},
 '(오늘은 친구를 충분히 만났어.)':{en:'(I have met enough friends today.)',vi:'(Hôm nay gặp đủ bạn rồi.)',zh:'（今天见的朋友已经够多了。）',ja:'（きょうは もう じゅうぶん 友だちに 会ったよ。）',ru:'(Сегодня я уже повидал достаточно друзей.)',id:'(Hari ini sudah cukup bertemu teman.)'},
 '(오늘은 이 친구와 할 이야기가 없나 봐. 다른 친구를 찾아보자.)':{en:'(Looks like there is nothing to talk about with this friend today. Let me look for another friend.)',vi:'(Hôm nay chắc không có chuyện gì với bạn này. Đi tìm bạn khác thôi.)',zh:'（今天好像没什么要和这个朋友说的。去找别的朋友吧。）',ja:'（きょうは この子とは 話すことが ないみたい。ほかの友だちを さがそう。）',ru:'(Похоже, сегодня с этим другом говорить не о чем. Поищу другого.)',id:'(Sepertinya hari ini tidak ada yang perlu dibicarakan dengan teman ini. Ayo cari teman lain.)'},
 '(다른 친구를 찾아보자.)':{en:'(Let me look for another friend.)',vi:'(Đi tìm bạn khác thôi.)',zh:'（去找别的朋友吧。）',ja:'（ほかの友だちを さがそう。）',ru:'(Поищу другого друга.)',id:'(Ayo cari teman lain.)'},
 '지호':{ja:'ジホ',id:'Jiho'},'세아':{ja:'セア',id:'Seah'},'하늘':{ja:'ハヌル',id:'Haneul'},'하람':{ja:'ハラム',id:'Haram'},'영민':{ja:'ヨンミン',id:'Youngmin'},'한결':{ja:'ハンギョル',id:'Hangyeol'},
 '오늘은 여기까지':{vi:'Hôm nay đến đây thôi',id:'Cukup untuk hari ini'}};
window.T=window.T||{};
const addWords=()=>{for(const[k,v]of Object.entries(ADD))for(const[u,t]of Object.entries(v)){T[u]=T[u]||{};if(!T[u][k])T[u][k]=t}};
addWords();{const _li=loadI18n;loadI18n=function(){return _li().then(r=>{addWords();return r})}}

// ===== 1 save in the middle of a day =====
function saveMid(at){if(DAY<2)return;try{const start=DAYMEET[DAY]||{meet:MEET,flags:FLAGS};
 if(!DAYHEART[DAY])DAYHEART[DAY]={...(HEART_D1||HEART)};
 localStorage.setItem('haru_save',JSON.stringify({day:DAY,hero:HERO,heart:HEART,found:[...FOUND],mode:UI+'-'+LANG,meet:MEET,flags:FLAGS,
  mid:{at,start,dayHeart:DAYHEART[DAY],picks:PICKS,choice:D2CHOICE,today:[...TODAY],talked:[...TALKED]}}))}catch(e){}}
{const _c=d2Class;d2Class=function(){saveMid('class');return _c.apply(this,arguments)}}
{const _l=lessons;lessons=function(){saveMid('class');return _l.apply(this,arguments)}}
{const _h=d2Home;d2Home=function(){saveMid('eve');return _h.apply(this,arguments)}}
function resumeMid(s){const M=s.mid;MEET={...(s.meet||{})};FLAGS={...(s.flags||{})};PICKS=(M.picks||[]).slice();D2CHOICE={...(M.choice||{})};
 for(const id of PICKS){const e=epNext(id,EPIDX[id]);if(e)TODAYEP[id]=e}
 (M.today||[]).forEach(k=>TODAY.add(k));(M.talked||[]).forEach(k=>TALKED.add(k));
 if(M.at==='eve'&&PICKS.length){stage='d2_after';d2Home();return}
 if(!PICKS.length){d2Class();return}
 stage='d2_class';load('class');d2Goal()}
contGame=function(s){const M=s.mid&&s.mid.start?s.mid:null;MEET={...((M&&M.start.meet)||s.meet||{})};FLAGS={...((M&&M.start.flags)||s.flags||{})};let n=s.day||2;
 if(!M){if(n>3||n===3&&!Object.keys(window.D3||{}).length)n=dayHasContent(n)?n:2;startDay(n);return}
 if(M.dayHeart)DAYHEART[n]={...M.dayHeart};
 // the morning is skipped: startDay sets the day up (who is where, today's scenes) and its fade goes on where the save was made
 const _f=fade;fade=function(cb){fade=_f;return _f(()=>resumeMid(s))};startDay(n);if(fade!==_f)fade=_f};

// ===== 2 a saved game opens on 「이어 하기」 =====
{const _start=start;start=function(){const s=loadSave();const mode=s&&s.mode;
 if(!s||!(s.day>=2)||!mode||!s.hero||!MODES.some(md=>md.ui+'-'+md.learn===mode))return _start();
 const m=document.getElementById('modal'),c=document.getElementById('mcard');document.getElementById('mute').textContent=muted?'🔇':'🎵';
 const[ui,learn]=mode.split('-');UI=ui;LANG=learn;W=LANGS[LANG].words.notebook;document.documentElement.lang=UI;
 const show=()=>{addWords();c.classList.remove('lcard');c.classList.add('contcard');
  c.innerHTML=`<h2>${tr('전학생 반장되기')}</h2><img class="face" src="faces/${s.hero}_smile.jpg" alt=""><p><button class="big" id="cont">▶ ${tr('{n}일차부터 이어 하기').replace('{n}',s.day)}</button></p><div class="minor"><button class="ghost" id="fresh">${tr('새로 시작하기')}</button></div>`;
  m.classList.add('on');
  document.getElementById('cont').onclick=()=>{c.classList.remove('contcard');HERO=s.hero;Object.assign(HEART,s.heart||{});(s.found||[]).forEach(k=>FOUND.add(k));HEART_D1={...((s.mid&&s.mid.dayHeart)||HEART)};chime();contGame(s)};
  document.getElementById('fresh').onclick=()=>{c.classList.remove('contcard');_start()}};
 if(UI==='ko')show();else{c.innerHTML='<p>…</p>';m.classList.add('on');loadI18n().then(show)}}}
// after 「새로 시작하기」 the hero pick has no continue button between the hero cards
{const _ph=pickHero;pickHero=function(){const r=_ph.apply(this,arguments);const b=document.getElementById('cont');if(b&&b.closest('p'))b.closest('p').remove();return r}}

// ===== 3 the day-end card: 「처음부터 다시」 asks first, small buttons on their own line, a moment of no taps =====
function safeEndCard(){const c=document.getElementById('mcard'),re=c.querySelector('#re');c.classList.add('lock');setTimeout(()=>c.classList.remove('lock'),1100);if(!re)return;
 const minor=document.createElement('div');minor.className='minor';const re2=c.querySelector('#re2');if(re2){re2.className='ghost';minor.appendChild(re2)}
 const orig=re.onclick;re.className='ghost';minor.appendChild(re);c.appendChild(minor);
 re.onclick=()=>{const box=document.createElement('div');box.className='confirm';
  box.innerHTML=`<p><b>${tr('처음부터 다시 할까요?')}</b><br>${tr('지금까지 한 것이 모두 지워져요.')}</p><button class="big" id="reNo">${tr('아니요')}</button> <button class="ghost" id="reYes">${tr('네, 지울래요')}</button>`;
  minor.replaceWith(box);box.querySelector('#reNo').onclick=()=>box.replaceWith(minor);box.querySelector('#reYes').onclick=()=>{try{localStorage.removeItem('haru_save')}catch(e){}orig&&orig()}}}
{const _e2=end2;end2=function(){const r=_e2.apply(this,arguments);safeEndCard();return r}}
{const _e=end;end=function(){const r=_e.apply(this,arguments);safeEndCard();return r}}

// ===== 4 an arrow at the screen edge toward a goal off screen =====
const arrow=document.createElement('button');arrow.id='edgeArrow';arrow.innerHTML='<span>➜</span>';document.body.appendChild(arrow);
let findK=null,findT0=0,arrowAt=null;
function onScreen(x,y){const sx=x*cam.s-cam.x,sy=y*cam.s-cam.y;return sx>24&&sx<innerWidth-24&&sy>50&&sy<innerHeight-30}
function arrowTarget(){if(!me||!MAP||touring||talkOn||drag)return null;if(document.getElementById('modal').classList.contains('on'))return null;
 if(FIND){if(findK!==FIND){findK=FIND;findT0=performance.now()}if(performance.now()-findT0<12000)return null;
  const o=(OBJ[MAP]||[]).find(o=>o[0]===FIND);if(o)return[o[1],o[2]];
  const n=npcs.find(n=>n.h&&(WORDKEY[n.id]===FIND||(DAY>=2&&n.id==='hyeeun'&&(FIND==='wheel'||FIND==='wheelchair'))));if(n)return[n.x,n.y-n.h/2];
  if(pangEl&&FIND==='dog')return[PANG_AT[0],PANG_AT[1]-PANG_H/2];return null}
 findK=null;if(busy||!goal||!goal.target)return null;const t=goal.target;
 if(t==='door'||t==='seat'||t==='out'){const p=t==='out'?OUT[MAP]:(EXITS[MAP]||{})[t];return p?[p[0],p[1]]:null}
 const ids=[].concat(t);const ns=npcs.filter(n=>n.h&&ids.includes(n.id)&&!(goal.skip&&goal.skip(n.id)));
 if(ns.length){if(ns.some(n=>onScreen(n.x,n.y-n.h/2)))return null;ns.sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y));return[ns[0].x,ns[0].y-ns[0].h/2]}
 // nobody to meet on this map: the way out
 if(OUT[MAP]&&['d2_class','d2_after'].includes(stage))return[OUT[MAP][0],OUT[MAP][1]];return null}
function placeArrow(){const p=arrowTarget();if(!p||onScreen(p[0],p[1])){arrow.style.display='none';arrowAt=null;return}
 const W=innerWidth,H=innerHeight,cx=W/2,cy=H/2,sx=p[0]*cam.s-cam.x,sy=p[1]*cam.s-cam.y,dx=sx-cx,dy=sy-cy;
 const mx=W/2-40,top=110,bot=H-(document.getElementById('talk').classList.contains('on')?200:90);
 const kx=dx?mx/Math.abs(dx):1e9,ky=dy<0?(cy-top)/-dy:dy>0?(bot-cy)/dy:1e9,k=Math.min(kx,ky);
 arrow.style.left=(cx+dx*k)+'px';arrow.style.top=(cy+dy*k)+'px';arrow.firstChild.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;arrow.style.display='flex';arrowAt=p}
arrow.addEventListener('pointerdown',e=>e.stopPropagation());
arrow.onclick=e=>{e.stopPropagation();if(!arrowAt)return;const s=cam.s,W=innerWidth,H=innerHeight,maxX=Math.max(0,MW*s-W),maxY=Math.max(0,MH*s-H);
 const to={x:Math.max(0,Math.min(maxX,arrowAt[0]*s-W/2)),y:Math.max(0,Math.min(maxY,arrowAt[1]*s-H/2))},from={x:cam.x,y:cam.y},t0=performance.now();
 (function step(now){const k=Math.min(1,(now-t0)/500),q=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;pan={x:from.x+(to.x-from.x)*q,y:from.y+(to.y-from.y)*q};follow();if(k<1)requestAnimationFrame(step)})(t0)};

// ===== 5 a find's tap on a thing is that thing; the 🔍 tray only next to its small things =====
{const _z=zoomAt;zoomAt=function(x,y){const z=_z(x,y);if(!z)return z;const objs=OBJ[MAP]||[];
 if(FIND){if(objs.some(o=>Math.hypot(x-o[1],y-o[2])<o[3]&&(o[0]===FIND||o[3]>=40)))return null;
  if(npcs.some(n=>n.h&&(WORDKEY[n.id]||n.id==='hyeeun')&&x>n.x-n.w*.4&&x<n.x+n.w*.4&&y>n.y-n.h&&y<n.y+10))return null;return z}
 const small=objs.filter(o=>o[1]>=z[0]&&o[1]<=z[2]&&o[2]>=z[1]&&o[2]<=z[3]&&o[3]<80);
 return small.some(o=>Math.hypot(x-o[1],y-o[2])<Math.max(70,o[3]+40))?z:null}}
// the tray says what to do (the find's goal with 🔊), or 🔍 when nothing is being looked for
{const _oz=openZoom;openZoom=function(z){const r=_oz(z);const c=document.getElementById('mcard');const h=document.createElement('h2');h.className='ztitle';
 if(FIND){h.textContent=tr(FIND_LABEL).replace('{x}',wordOf(FIND))+' ';const b=document.createElement('button');b.className='spk';b.textContent='🔊';const k=FIND;b.onclick=()=>speak(k);h.appendChild(b)}else h.textContent='🔍';
 c.insertBefore(h,c.firstChild);return r}}
// a wrong pick shows ✕ too (it only buzzed)
{const _bz=buzz;buzz=function(){_bz();const d=document.createElement('div');d.className='nope';d.textContent='✕';document.body.appendChild(d);setTimeout(()=>d.remove(),750)}}

// ===== smaller fixes =====
// tapping the map while the talk panel is open goes to the next line (it did nothing; on a phone held sideways the panel is small)
{const _ot=onTap;onTap=function(e){if(talkOn&&!sayEl&&!chEl.classList.contains('on')&&!touring){advance();return}
 // during a find, a tap right on the looked-for thing is that thing even with a kid sitting at it (a desk to knock on did nothing)
 if(FIND&&!busy&&me){const x=(e.clientX+cam.x)/cam.s,y=(e.clientY+cam.y)/cam.s;const o=(OBJ[MAP]||[]).find(o=>o[0]===FIND&&Math.hypot(x-o[1],y-o[2])<o[3]);
  if(o){closeBubble();tapThing(o[0],o[1],o[2]+o[3]*.35);walkNear(o[1],o[2]+o[3]*.5);return}}
 return _ot(e)}}
// where to go: how many friends are there to meet; places with nobody are pale
{const _pp=pickPlace;pickPlace=function(){const r=_pp.apply(this,arguments);if(stage!=='d2_class')return r;
 const left=friendsToday().filter(f=>!PICKS.includes(f));
 document.querySelectorAll('#mcard .pick.places button[data-p]').forEach(b=>{const p=b.dataset.p;let n=0;try{const ps=d2People(p);n=left.filter(f=>ps.some(q=>q[0]===f)).length}catch(e){}
  if(n){const s=document.createElement('b');s.className='pc';s.textContent=n;b.appendChild(s)}else if(p!==MAP)b.classList.add('empty')});return r}}
// a friend already met (or with nothing new today) says their line once; more taps get one short thought
const againN={};
{const _t=d2Talk;d2Talk=function(id){const e=epNext(id,EPIDX[id]);
 if(stage==='d2_class'&&(!e||PICKS.includes(id)||PICKS.length>=needToday())&&(e||!DD()[id])){againN[id]=(againN[id]||0)+1;if(againN[id]>1){const m=PICKS.includes(id)?'(오늘은 벌써 이야기했어. 다른 친구를 찾아보자.)':(e&&PICKS.length>=needToday())?'(오늘은 친구를 충분히 만났어.)':'(오늘은 이 친구와 할 이야기가 없나 봐. 다른 친구를 찾아보자.)';say([['think','smile',m]]);return}}// say why (owner 11/07: the old line came up for a friend I had not talked to)
 return _t(id)}}
{const _sd=startDay;startDay=function(n){for(const k in againN)delete againN[k];return _sd(n)}}
// the same word started twice within a moment (handkerchief): play it once
{const _sp=speak;const lastS={};speak=function(k){const t=performance.now();if(lastS[k]&&t-lastS[k]<500)return;lastS[k]=t;return _sp(k)}}
// the music button looks different from the word 🔊
{const mb=document.getElementById('mute');const fix=()=>{if(mb.textContent==='🔊')mb.textContent='🎵'};new MutationObserver(fix).observe(mb,{childList:true,characterData:true,subtree:true});fix()}
// auto play ⏩: lines go on by themselves until a choice or a find
const autoBtn=document.createElement('button');autoBtn.id='autoBtn';autoBtn.textContent='⏩';document.body.appendChild(autoBtn);let autoOn=false,autoT=0;
autoBtn.addEventListener('pointerdown',e=>e.stopPropagation());
autoBtn.onclick=e=>{e.stopPropagation();autoOn=!autoOn;autoBtn.classList.toggle('on',autoOn);autoT=performance.now();if(autoOn&&talkOn&&!chEl.classList.contains('on'))advance()};
setInterval(()=>{const asking=chEl.classList.contains('on');
 if(autoOn&&(asking||(!talkOn&&!busy)||FIND)){autoOn=false;autoBtn.classList.remove('on')}
 if(autoOn&&talkOn&&!asking&&!touring&&performance.now()-autoT>1500){autoT=performance.now();advance()}
 const show=talkOn&&!asking&&!touring;autoBtn.style.display=show||autoOn?'block':'none';if(!show)return;
 const t=document.getElementById('talk');if(t.classList.contains('on')){const r=t.getBoundingClientRect();autoBtn.style.left=(r.right-50)+'px';autoBtn.style.top=(r.top-52)+'px'}
 else{autoBtn.style.left=(innerWidth-60)+'px';autoBtn.style.top=(innerHeight-70)+'px'}},250);
// scene pictures on an upright screen: a little bigger, with the picture softly filling the black bands
const sceneBg=document.createElement('div');sceneBg.id='sceneBg';sceneEl.parentNode.insertBefore(sceneBg,sceneEl);
new MutationObserver(()=>{const on=sceneEl.classList.contains('on');sceneBg.style.display=on?'block':'none';if(on)sceneBg.style.backgroundImage=sceneEl.style.backgroundImage}).observe(sceneEl,{attributes:true,attributeFilter:['class','style']});
{const _fs=fitScene;fitScene=function(){_fs();if(!sceneEl.classList.contains('on')||innerHeight<=innerWidth)return;const r=talk.classList.contains('on')?talk.getBoundingClientRect():null;const availH=r?r.top-6:innerHeight;
 const w=Math.min(innerWidth*1.3,availH*16/9),hh=w*9/16;sceneEl.style.backgroundSize=`${w}px ${hh}px`;sceneEl.style.backgroundPosition=`center ${Math.max(0,(availH-hh)/2)}px`}}
// the first look around a new place is shorter (the first line waited up to 7 s)
tour=function(){touring=true;busy=true;const s=cam.s,W=innerWidth,H=innerHeight,maxX=Math.max(0,MW*s-W),maxY=Math.max(0,MH*s-H);
 const horiz=maxX>=maxY;const a=horiz?{x:0,y:maxY/2}:{x:maxX/2,y:0},b=horiz?{x:maxX,y:maxY/2}:{x:maxX/2,y:maxY};
 const dist=horiz?maxX:maxY,sweep=dist<40?600:Math.min(2400,900+dist*1.3);const t0=performance.now()+200;
 const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;pan={...a};follow();
 function back(){const s0=performance.now(),from={...pan};let tx=me.x*s-W/2,ty=(me.y-80)*s-H/2;tx=Math.max(0,Math.min(maxX,tx));ty=Math.max(0,Math.min(maxY,ty));
  (function step(now){const k=Math.min(1,(now-s0)/600),e=ease(k);pan={x:from.x+(tx-from.x)*e,y:from.y+(ty-from.y)*e};follow();if(k<1)requestAnimationFrame(step);else{pan=null;touring=false;busy=false;follow();while(tourQ.length)tourQ.shift()()}})(s0)}
 (function step(now){const k=Math.max(0,Math.min(1,(now-t0)/sweep)),e=ease(k);pan={x:a.x+(b.x-a.x)*e,y:a.y+(b.y-a.y)*e};follow();if(k<1)requestAnimationFrame(step);else setTimeout(back,200)})(performance.now())};
// pictures: the first day's people first, the other friends a little later (it fetched about 15 MB at once)
preload=function(){const ex=['smile','laugh','surprised','sad','angry','relieved'];const L=[];
 const first=['hero_f','hero_m','mom','siwoo','minho','sua','yuna','junho','haeun','jihoon','yena','hyeeun'];
 L.push('maps/home_am.jpg','maps/class.jpg','maps/home_pm.jpg','items/notebook.png','cards/pcase.jpg','scenes/jar.jpg','scenes/sua2.jpg','scenes/threat_f.jpg','scenes/threat_m.jpg','scenes/intro_f.jpg','scenes/intro_m.jpg','pang/sit.png','pang/happy.png','scenes/dinner.jpg','scenes/night.jpg','scenes/dinner_m.jpg','scenes/night_m.jpg','cards/notebook.jpg','cards/bag.jpg','cards/pencil.jpg');
 first.forEach(i=>{L.push(`walk/${i}.png`);ex.forEach(e=>L.push(`faces/${i}_${e}.jpg`))});const get=s=>{const im=new Image();im.src=s;PRE.push(im)};L.forEach(get);
 setTimeout(()=>{for(const i of D2IDS)if(!first.includes(i)){get(`walk/${i}.png`);ex.forEach(e=>get(`faces/${i}_${e}.jpg`))}},25000)};
// every few frames: arrow, 🔊 size, exit sign out from under the corner buttons
setInterval(()=>{if(!me||!MAP)return;placeArrow();
 world.style.setProperty('--ms',Math.max(1,26/(22*(cam.s||1))).toFixed(2));
 const sg=world.querySelector('.exitsign');if(sg&&OUT[MAP]){if(!sg.dataset.t0){sg.dataset.t0=sg.style.top;sg.dataset.l0=sg.style.left}
  const t0=parseFloat(sg.dataset.t0),l0=parseFloat(sg.dataset.l0);sg.style.top=t0+'px';sg.style.left=l0+'px';const r=sg.getBoundingClientRect();if(!r.width)return;let dy=0,dx=0;
  for(const id of ['bag','mute','goal']){const e=document.getElementById(id);if(!e||getComputedStyle(e).display==='none'||(id==='goal'&&!e.textContent))continue;const q=e.getBoundingClientRect();
   if(q.height&&r.left<q.right+4&&r.right>q.left-4&&r.top<q.bottom+4&&r.bottom>q.top-4)dy=Math.max(dy,q.bottom+8-r.top)}
  if(r.top<6)dy=Math.max(dy,6-r.top);if(r.right>innerWidth-6&&r.left<innerWidth)dx=Math.max(-160*cam.s,innerWidth-6-r.right);if(r.left<6&&r.right>0)dx=Math.min(160*cam.s,6-r.left);
  if(dy)sg.style.top=Math.min(OUT[MAP][1]-30,t0+dy/cam.s)+'px';if(dx)sg.style.left=(l0+dx/cam.s)+'px'}},200);
}
// ===== things laid on a map never sit on something drawn there (milk carton on the flowerpot), on another thing or on a kid =====
// the map picture is measured once (how much drawing = edges in each 16 px cell); a thing whose spot is busy, or that covers another
// thing or a kid, moves to the nearest quiet spot on the same surface (same colour under its foot, a little left/right first)
{
const GRID={};
function gridOf(img){const key=img.getAttribute('src');if(GRID[key])return GRID[key];if(!img.complete||!img.naturalWidth)return null;
 const S=4,w=Math.round(MW/S),h=Math.round(MH/S),cv=document.createElement('canvas');cv.width=w;cv.height=h;const cx=cv.getContext('2d',{willReadFrequently:true});
 try{cx.drawImage(img,0,0,w,h)}catch(e){return null}let d;try{d=cx.getImageData(0,0,w,h).data}catch(e){return null}
 const g=new Float32Array(w*h),col=new Float32Array(w*h*3);for(let i=0;i<w*h;i++){g[i]=(d[i*4]*.3+d[i*4+1]*.59+d[i*4+2]*.11);col[i*3]=d[i*4];col[i*3+1]=d[i*4+1];col[i*3+2]=d[i*4+2]}
 const e=new Float32Array(w*h);for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x;e[i]=Math.abs(g[i+1]-g[i-1])+Math.abs(g[i+w]-g[i-w])}
 const P=new Float64Array((w+1)*(h+1));for(let y=0;y<h;y++){let s=0;for(let x=0;x<w;x++){s+=e[y*w+x];P[(y+1)*(w+1)+x+1]=P[y*(w+1)+x+1]+s}}
 return GRID[key]={w,h,S,P,col}}
function busyAt(G,x0,y0,x1,y1){const S=G.S;let a=Math.max(0,Math.floor(x0/S)),b=Math.max(0,Math.floor(y0/S)),c=Math.min(G.w,Math.ceil(x1/S)),d=Math.min(G.h,Math.ceil(y1/S));if(c<=a||d<=b)return 99;
 const W=G.w+1;return(G.P[d*W+c]-G.P[b*W+c]-G.P[d*W+a]+G.P[b*W+a])/((c-a)*(d-b))}
function colAt(G,x,y){const S=G.S,i=Math.max(0,Math.min(G.h-1,Math.round(y/S)))*G.w+Math.max(0,Math.min(G.w-1,Math.round(x/S)));return[G.col[i*3],G.col[i*3+1],G.col[i*3+2]]}
function boxOf(el){const w=parseFloat(el.style.width)||56,r=el.naturalWidth?el.naturalHeight/el.naturalWidth:1,h=w*r,x=parseFloat(el.style.left),y=parseFloat(el.style.top);return{x,y,w,h,x0:x-w/2,x1:x+w/2,y0:y-h,y1:y}}
const ov=(a,b)=>Math.max(0,Math.min(a.x1,b.x1)-Math.max(a.x0,b.x0))*Math.max(0,Math.min(a.y1,b.y1)-Math.max(a.y0,b.y0));
const kidBox=n=>({x0:n.x-n.w*.35,x1:n.x+n.w*.35,y0:n.y-(n.h||0),y1:n.y+(n.foot||0)});
const BUSY_TH=34;
function busyOf(G,b){return busyAt(G,b.x0+b.w*.15,b.y0+b.h*.1,b.x1-b.w*.15,b.y1-b.h*.18)}
function problems(G,el,b,others){const bad=[];if(G&&busyOf(G,b)>BUSY_TH)bad.push('map');
 for(const o of others){if(o.el===el)continue;const a=ov(b,o.b);if(a>.25*Math.min(b.w*b.h,o.b.w*o.b.h))bad.push('thing:'+o.el.dataset.k2)}
 for(const n of npcs)if(n.h&&n.w&&ov(b,kidBox(n))>.3*b.w*b.h)bad.push('kid:'+n.id);return bad}
function surf(G,b){const pts=[[b.x0-b.w*.25,b.y1-3],[b.x1+b.w*.25,b.y1-3],[b.x,b.y1+6]].map(([x,y])=>colAt(G,x,y));return pts.reduce((a,c)=>[a[0]+c[0]/3,a[1]+c[1]/3,a[2]+c[2]/3],[0,0,0])}
function declutter(){const img=document.getElementById('mapimg'),G=gridOf(img);if(!G){if(img&&!img.complete)img.addEventListener('load',()=>setTimeout(declutter,50),{once:true});return}
 const els=[...world.querySelectorAll('img.thing')];if(els.some(el=>!el.complete)){clearTimeout(declutter.t);declutter.t=setTimeout(declutter,200);return}
 const all=els.map(el=>{el.dataset.k2=el.dataset.k||(el.getAttribute('src')||'').replace(/^items\/|\.png$/g,'');return{el,b:boxOf(el)}});
 const score=o=>busyOf(G,o.b);all.sort((p,q)=>score(q)-score(p));
 for(const o of all){if(o.el.dataset.moved||o.b.w>=110)continue;const bad=problems(G,o.el,o.b,all);if(!bad.length)continue;
  const b0=o.b,busy0=busyOf(G,b0),s0=surf(G,b0);let best=null;
  for(const d of [20,35,50,65,80,100,120,140,160])for(const[dx,dy]of[[d,0],[-d,0],[d,-8],[-d,-8],[d,8],[-d,8],[0,-Math.min(d,30)],[0,Math.min(d,20)]]){
   const nb={x:b0.x+dx,y:b0.y+dy,w:b0.w,h:b0.h,x0:b0.x0+dx,x1:b0.x1+dx,y0:b0.y0+dy,y1:b0.y1+dy};if(nb.x0<4||nb.x1>MW-4||nb.y0<4||nb.y1>MH-4)continue;
   const s1=surf(G,nb);if(Math.hypot(s1[0]-s0[0],s1[1]-s0[1],s1[2]-s0[2])>38)continue;
   const bz=busyOf(G,nb);if(bad.includes('map')?bz>Math.min(BUSY_TH,busy0*.6):bz>Math.max(BUSY_TH,busy0+4))continue;
   if(problems(G,o.el,nb,all).length)continue;best=[dx,dy];break}
  if(!best)continue;
  // the tap spot moves with it
  const k=o.el.dataset.k2.replace(/_cut$/,''),os=(OBJ[MAP]||[]).filter(t=>Math.abs(t[1]-b0.x)<2&&(t[0]===o.el.dataset.k2||t[0]===k||o.el.dataset.k&&t[0]===o.el.dataset.k));
  for(const t of os){t[1]+=best[0];t[2]+=best[1]}
  o.el.style.left=(b0.x+best[0])+'px';o.el.style.top=(b0.y+best[1])+'px';o.el.dataset.moved=best.join(',');o.b=boxOf(o.el)}
 if(typeof soundMarks==='function')soundMarks()}
window.declutter=declutter;
{const _st=showThings;showThings=function(){const r=_st.apply(this,arguments);setTimeout(declutter,0);return r}}
{const _lt=layThings;layThings=function(){const r=_lt.apply(this,arguments);setTimeout(declutter,0);return r}}
window.thingReport=function(){const img=document.getElementById('mapimg'),G=gridOf(img);const els=[...world.querySelectorAll('img.thing')];
 const all=els.map(el=>{el.dataset.k2=el.dataset.k||(el.getAttribute('src')||'').replace(/^items\/|\.png$/g,'');return{el,b:boxOf(el)}});
 return all.map(o=>({k:o.el.dataset.k2,x:Math.round(o.b.x),y:Math.round(o.b.y),w:Math.round(o.b.w),busy:G?Math.round(busyOf(G,o.b)):null,moved:o.el.dataset.moved||null,bad:problems(G,o.el,o.b,all)}))};
}
// ===== every standing kid has their feet on open floor at every moment =====
// kids were checked only when a map was set up; a kid a scene brings over ({with}, walking in from the door) or moves ({move})
// could stop on a desk (Haeun's scene). Their stopping spot is checked too, and a watch moves anyone who still stands off the floor.
{
const floorOk=(x,y)=>typeof footOk!=='function'||!MAP||footOk(MAP,x,y);
function nearFloor(x,y,self){for(let r=20;r<=600;r+=20)for(let a=0;a<16;a++){const t=a/16*Math.PI*2,cx=Math.round(x+Math.cos(t)*r),cy=Math.round(y+Math.sin(t)*r*.6);
  if(cx<20||cx>MW-20||cy<60||cy>MH-10||!floorOk(cx,cy))continue;if(npcs.some(n=>n!==self&&!n.seat&&Math.abs(n.x-cx)<90&&Math.abs(n.y-cy)<70))continue;if(me&&Math.abs(me.x-cx)<70&&Math.abs(me.y-cy)<50)continue;return[cx,cy]}return null}
window.nearFloor=nearFloor;
const _co=comeOver;comeOver=function(w,k,from){if(w&&!(w[3]&&typeof w[3]==='object')&&!floorOk(w[1],w[2])){const p=nearFloor(w[1],w[2]);if(p){w=w.slice();w[1]=p[0];w[2]=p[1]}}return _co(w,k,from)};
setInterval(()=>{if(!MAP||touring)return;for(const n of npcs){if(n.seat||n.path||!n.h)continue;if(floorOk(n.x,n.y))continue;const p=nearFloor(n.x,n.y,n);if(!p)continue;
 n.x=p[0];n.y=p[1];draw(n);window.FEET_FIXED=(window.FEET_FIXED||0)+1}},400);
window.feetReport=()=>npcs.filter(n=>!n.seat&&!n.path&&n.h&&!floorOk(n.x,n.y)).map(n=>[n.id,Math.round(n.x),Math.round(n.y)]);
}
// ===== a scene with only its own kids: nobody else in the picture =====
// a scene that goes to a place of its own (music room, welfare room…) shows only the kids in that scene; a line saying the room is empty
// (「텅 비어」「아무도 없」「다 나갔」) sends the other kids off the map. When the scene ends they come back (tidyPeople walks them in).
{
const BASE=['class','hall','field','cafe'];const EMPTY=/텅 비|아무도 없|다 나갔|다들 나갔|모두 나갔/;
const SCENE_KEEP=new Set();{const _mk=moveKid;moveKid=function(m){if(m&&m[3]!=='out')SCENE_KEEP.add(m[0]);return _mk.apply(this,arguments)}}
{const _tp=tidyPeople;tidyPeople=function(){SCENE_KEEP.clear();return _tp.apply(this,arguments)}}
function clearOthers(){if(!SCENE_IDS)return;for(const n of npcs.slice()){if(SCENE_IDS.includes(n.id)||SCENE_KEEP.has(n.id))continue;n.el.style.transition='opacity .5s';n.el.style.opacity=0;const i=npcs.indexOf(n);if(i>=0)npcs.splice(i,1);setTimeout(()=>n.el.remove(),550)}setTimeout(()=>{if(typeof gauges==='function')gauges()},600)}
const _ld=load;load=function(){const r=_ld.apply(this,arguments);if(SCENE_IDS&&!BASE.includes(MAP))setTimeout(clearOthers,60);return r};
const _adv=advance;advance=function(){const l=queue[0];if(SCENE_IDS&&Array.isArray(l)&&typeof l[2]==='string'&&EMPTY.test(l[2]))clearOthers();return _adv.apply(this,arguments)};
}
// ===== the hero too: never placed on a table (the cafeteria's start point was on the middle table, 11/05) =====
{
function heroToFloor(){if(!me||!MAP||!grid||me.path)return;if(walkable(me.x,me.y)&&!(typeof onDesk==='function'&&onDesk(MAP,me.x,me.y)))return;
 const c=nearestCell(me.x,me.y);if(!c)return;me.x=c[0]*C+C/2;me.y=c[1]*C+C/2;draw(me);follow()}
const _ldH=load;load=function(){const r=_ldH.apply(this,arguments);heroToFloor();return r};
setInterval(heroToFloor,500);
}
// ===== every 🔊 mark stays inside the map: the blackboard's mark sat above the map's top edge (the blackboard is drawn at the very top), so it never showed =====
{const _sm=soundMarks;soundMarks=function(){const r=_sm.apply(this,arguments);world.querySelectorAll('.smark').forEach(m=>{const x=parseFloat(m.style.left),y=parseFloat(m.style.top);
 if(y<16)m.style.top='16px';if(x<16)m.style.left='16px';if(x>MW-16)m.style.left=(MW-16)+'px';
  // (11/10 owner) a mark at the very top of the map (the hall stairs) hid under the goal bar on phones: put it on the thing's bottom corner instead
  if(y<130&&innerWidth<700){const o=(OBJ[MAP]||[]).find(o=>o[0]===m.dataset.o&&Math.abs(o[2]-o[3]*.72-y)<4);if(o){m.style.top=(o[2]+o[3]+36)+'px';m.style.left=o[1]+'px'}}});if(typeof hideMarks==='function')hideMarks();return r}}
// ===== the school gate (gatesun): its two gate leaves and pillars are not floor (Jihoon stood floating on the right leaf, 11/05) =====
if(MAPS.gatesun){MAPS.gatesun.block=(MAPS.gatesun.block||[]).concat([R(1025,540,1215,775),R(1190,535,1320,800),R(725,640,880,915),R(600,690,735,941)])}

// ===== Hajun (Haeun's little brother, 1st grade): his own walk sheet now exists (walk/hajun.png); a little shorter than the 5th graders =====
NAME.hajun='하준';SZ.hajun=[0.968,0.988,0.8];
{const TN={en:'Hajun',vi:'Hajun',zh:'夏俊',ja:'ハジュン',ru:'Хаджун',id:'Hajun'};for(const u in TN){T[u]=T[u]||{};if(!T[u]['하준'])T[u]['하준']=TN[u]}}
// ===== no backpack inside school (11/07): my own sprite follows the map too (index.html walkSrc); PE below wins in the gym =====
{const _ldNB=load;load=function(m){const r=_ldNB.apply(this,arguments);try{if(me&&me.el&&typeof walkSrc==='function'){const src=walkSrc(HERO),o=me,put=()=>{if(o.w)o.el.style.backgroundImage=`url(${src})`;else setTimeout(put,60)};put()}}catch(e){}return r}}
// ===== PE class (owner 11/07): in the gym, and on the field when the meeting's opening says 「체육 시간」, I wear the PE uniform (walk/<hero>_pe.png) - no school uniform, no backpack =====
{const PE={};// PE off (owner 11/07: 평상복)// hero PE on (cut-outs redone 11/07)
 const isPE=m=>m==='gym'||(m==='field'&&SCENE_EP&&SCENE_EP.place==='field'&&JSON.stringify(SCENE_EP.pre||[]).includes('체육 시간'));
 const _ldPE=load;load=function(m){const r=_ldPE.apply(this,arguments);try{if(me&&me.el&&PE[HERO]&&isPE(m)){const o=me,t0=Date.now(),put=()=>{if(o.w)o.el.style.backgroundImage=`url(walk/${HERO}_pe.png)`;else if(Date.now()-t0<4000)setTimeout(put,40)};put()}}catch(e){}return r}}// the sheet sets its own picture when it loads, so wait for that first
// (11/09 owner) day-end word cards: if a word is still too wide for its card (long Russian/Vietnamese words), shrink its font until it fits
{const fitWords=()=>{document.querySelectorAll('#mcard .pick.dayend button .word').forEach(w=>{if(w.closest('.places'))return;let f=parseFloat(getComputedStyle(w).fontSize),n=0;while(n++<12&&f>10&&(w.scrollWidth>w.clientWidth+1||w.scrollWidth>w.parentElement.clientWidth)){f-=1;w.style.fontSize=f+'px'}if(w.scrollWidth>w.clientWidth+1)w.style.overflowWrap='anywhere'})};
 new MutationObserver(()=>setTimeout(fitWords,30)).observe(document.getElementById('mcard')||document.body,{childList:true,subtree:true});addEventListener('resize',fitWords)}
// (11/09 owner) choosing friends: a small arrow over every friend you can meet now, not one big arrow over the nearest
{const pool=[];const _ph=placeHint;placeHint=function(){_ph();let ns=[];
 if(goal&&!busy&&!FIND&&Array.isArray(goal.target)){const ids=goal.target;ns=npcs.filter(n=>ids.includes(n.id)&&!(goal.skip&&goal.skip(n.id)))}
 if(ns.length<2){pool.forEach(e=>e.remove());return}
 hintEl.remove();while(pool.length<ns.length){const e=document.createElement('div');e.className='hint sm';e.textContent='▼';pool.push(e)}
 pool.forEach((e,i)=>{const n=ns[i];if(!n){e.remove();return}const h=(n.h||KID)+(HEART[n.id]?44:0)+(WORDKEY[n.id]&&FOUND.has(WORDKEY[n.id])?36:0);
  if(!e.parentNode)world.appendChild(e);e.style.left=n.x+'px';e.style.top=(n.y-h-6)+'px';e.style.zIndex=3000})};
 const st=document.createElement('style');st.textContent='.hint.sm{font-size:34px;-webkit-text-stroke:2px #7a4a00}';document.head.appendChild(st)}
