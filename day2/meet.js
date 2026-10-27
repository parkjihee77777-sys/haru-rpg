// ---------- scenes by meeting (loaded after engine.js) ----------
// A friend with per-meeting scenes (window.EP[id]) plays their next scene each time you talk to them at school: meeting 1 = their "Day 2",
// meeting 15 = "Day 16R", whatever the calendar day. Friends without them keep the scenes of the calendar day (D2 / D3).
// Evening: Mom asks 「오늘 학교 어땠어?」 → the first friend's part → 「또 누구 만났어?」 → the second friend's part.
let MEET={},FLAGS={},ELECTION=false,SCENE_IDS=null,SCENE_EP=null,GOWITH=null;// meetings so far per friend, story flags (M04_word …), election day (the voting-day special needs it)
const DAYMEET={},TODAYEP={},EPIDX={};// MEET/FLAGS when each day started (for "play this day again"); scene played today per friend; meeting index at day start
function epNext(id,at){const L=window.EP&&EP[id];if(!L)return null;const n=at==null?(MEET[id]||0):at;
 const v=EP[id+'_vote'];if(ELECTION&&v&&n>=4&&!FLAGS[id+'_vote'])return v;return L[n]||null}
function DD(){return(DAY===2?window.D2:DAY===3?window.D3:null)||{}}
function friendData(id){return epNext(id,EPIDX[id])||DD()[id]}
function friendsToday(){return D2IDS.filter(i=>friendData(i))}
{const add=window.EP_WORDS||{};for(const[k,w]of Object.entries(add))if(!D2WORDS[k])D2WORDS[k]=w;d2Merge()}
// {H} = the hero's own language ("우리 나라 말" in Korean)
const HOME_NAME={ko:'우리 나라 말',en:'English',id:'bahasa Indonesia',vi:'tiếng Việt',zh:'中文'};
{const _tr=tr;tr=function(s){const t=_tr(s);return t==null?t:t.replace(/\{H\}/g,HOME_NAME[UI]||HOME_NAME.ko)}}
// where friends stand: a friend with a scene today stands where that scene happens
const _d2People=d2People;
d2People=function(id){const eps=D2IDS.map(f=>[f,epNext(f,EPIDX[f])]).filter(x=>x[1]);const moved=new Set();
 for(const[f,e]of eps){moved.add(f);(e.with||[]).forEach(w=>moved.add(w[0]))}
 const ps=_d2People(id).filter(p=>!moved.has(p[0]));
 // each kid stands in one spot only: a friend's own scene first, then the kids other scenes here bring along (several scenes may list the same kid)
 const here=new Set();for(const[f,e]of eps)if(e.place===id&&!here.has(f)){here.add(f);ps.push(e.at[2]==='stand'?[f,e.at[0],e.at[1],null,'stand']:[f,e.at[0],e.at[1]])}
 // a kid whose own story today happens somewhere else (and isn't done yet) stands only there, where it will happen;
 // another friend's scene here that brings them along adds them when that scene starts (d2Talk)
 const ownElsewhere=w=>{const e2=epNext(w,EPIDX[w]);return e2&&e2.place&&e2.place!==id&&!PICKS.includes(w)};
 for(const[f,e]of eps)if(e.place===id)(e.with||[]).forEach(w=>{if(!here.has(w[0])&&!ownElsewhere(w[0])){here.add(w[0]);ps.push(w)}})
 // a scene that walks on ({go}) takes its friend (and who is with them) along: they stand next to the hero where the hero comes in (spots.js keeps them off things)
 if(GOWITH&&GOWITH.map===id){const st=(MAPS[id]&&MAPS[id].start)||[600,500];GOWITH.ids.forEach((f,i)=>{const at=ps.findIndex(p=>p[0]===f);if(at>=0)ps.splice(at,1);ps.push([f,st[0]+(i%2?-1:1)*110*(1+(i>>1)),st[1]])})}
 return ps};
// today's scenes add their things to the maps (drawn spots to tap, pictures laid on top)
const _setDay=setDay;
// days without their own drawn maps keep Day 2's (the same things lie in the same places)
setDay=function(n){_setDay(NATIVE_BY[n]?n:2);DAY=n;for(const k in THINGS)delete THINGS[k];
 D2PLACE={...D2PLACE};PLACES.length=0;PLACES.push(...BASE_PLACES);for(const id of extraPlacesToday()){D2PLACE[id]=[];PLACES.push([id,EXTRA_MAPS[id].name])}
 for(const f of D2IDS){const e=epNext(f,EPIDX[f]);if(!e)continue;
  for(const[m,ts]of Object.entries(e.taps||{}))NATIVE[m]=(NATIVE[m]||[]).concat(ts);
  for(const[m,ts]of Object.entries(e.things||{}))THINGS[m]=(THINGS[m]||[]).concat(ts)}};
// a thing laid on the map may use its own picture ([k,x,y,w,picture]): a crumpled test paper is still {paper}
showThings=function(id){world.querySelectorAll('.thing').forEach(e=>e.remove());const things=placeThings(id);
 for(const[k,x,y,w,img]of things){const it=document.createElement('img');it.className='item thing';it.src=`items/${img||k}.png`;
  it.style.cssText=`position:absolute;width:${w||56}px;left:${x}px;top:${y}px;transform:translate(-50%,-100%);z-index:${Math.round(y)+1};pointer-events:none;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))`;world.appendChild(it)}
 OBJ[id]=(NATIVE[id]||[]).concat(things.map(([k,x,y,w])=>[k,x,y-(w||56)*.4,Math.max(30,(w||56)*.55)]))};
// ---- places only some scenes use (behind the school, gym, front gate…): they show up in "where to go?" on the days a scene happens there ----
const EXTRA_MAPS={
 flowerbed:{name:'화단',img:'maps/flowerbed.jpg',walk:[[[640,330],[1320,350],[1330,930],[780,930],[760,800],[440,800],[330,740],[470,610],[620,470]]],start:[800,600],out:[525,450]},
 gym:{name:'체육관',img:'maps/gym.jpg',walk:[[[480,290],[1330,290],[1440,450],[1440,690],[1660,700],[1672,941],[0,941],[0,700],[200,560],[480,350]]],block:[R(1440,450,1650,690)],start:[800,650],out:[105,560]},
 backyard:{name:'뒤뜰',img:'maps/backyard.jpg',walk:[[[700,330],[1060,240],[1080,320],[1400,440],[1520,470],[1380,560],[1280,700],[1250,820],[960,830],[700,800],[480,740],[300,700],[400,610],[540,500],[700,420]]],start:[850,600],out:[865,250]},
 stands:{name:'스탠드',img:'maps/stands.jpg',walk:[[[420,580],[960,470],[1150,420],[1672,300],[1672,941],[0,941],[0,840],[420,780]]],start:[900,650],out:[1560,420]},
 gate:{name:'교문',img:'maps/gate.jpg',walk:[[[0,450],[420,360],[930,260],[1220,250],[1660,140],[1660,210],[1060,450],[1010,540],[870,540],[580,600],[520,555],[0,540]],[[860,520],[1020,520],[1170,600],[1180,780],[1660,650],[1672,941],[730,941],[720,700],[860,640]]],start:[900,450],out:[650,250]}};
for(const[id,m]of Object.entries(EXTRA_MAPS)){MAPS[id]={img:m.img,walk:m.walk,rects:[],block:m.block||[],start:m.start};OUT[id]=m.out;PLACE[id]=id}
const BASE_PLACES=PLACES.slice();
function extraPlacesToday(){const ids=new Set();for(const f of D2IDS){const e=epNext(f,EPIDX[f]);if(e&&EXTRA_MAPS[e.place])ids.add(e.place)}return[...ids]}
// a morning for every day: Day 2 and 3 have their own; later days Mom asks for one of the things that always lie in the kitchen
const MORNING_KEYS=['apple','bread','cup','umbrella','bag','handkerchief','apron','notebook'];
function morningOf(n){if(MORNING[n])return MORNING[n];const k=MORNING_KEYS[(n-4)%MORNING_KEYS.length];
 return{k,open:[['nar','','아침.'],['mom','smile',k==='notebook'?'{w} 좀 찾아 줄래?':`{@${k}} 좀 찾아 줄래?`]],after:[['mom','laugh','고마워!'],['me','smile','…응. 다녀올게.'],['mom','smile','오늘도 저녁에 이야기 들려줘.']]}}
startDay=function(n){const m=document.getElementById('modal');m.classList.remove('on');
 if(DAYMEET[n]){MEET={...DAYMEET[n].meet};FLAGS={...DAYMEET[n].flags}}else DAYMEET[n]={meet:{...MEET},flags:{...FLAGS}};
 for(const k in EPIDX)delete EPIDX[k];for(const k in TODAYEP)delete TODAYEP[k];for(const f of D2IDS)if(window.EP&&EP[f])EPIDX[f]=MEET[f]||0;
 setDay(n);PICKS=[];D2CHOICE={};TALKED.clear();TODAY.clear();dinnerDone=false;CHOICE=null;for(const k in pangSaid)delete pangSaid[k];
 const M=morningOf(n);stage='d2_home';bgm('day');fade(()=>{load('home_am');say(M.open.slice(0,1),()=>find('mom',()=>{TODAY.add('mom');say(M.open.slice(1),()=>
  find(M.k,()=>{TODAY.add(M.k);say(M.after,()=>{stage='d2_leave';setGoal('현관으로 나가 학교 가기','door')})},'「{x}」 찾기'))},'「{x}」에게 인사하기'))})};
startDay2=function(){startDay(2)};
// arriving at school from Day 2 on: the classroom, where the class is (the hall was often empty, e.g. nobody there on Day 2)
d2Class=function(){stage='d2_class';load('class');say([['nar','',DAY===2?'둘째 날. 학교에 왔다.':DAY===3?'셋째 날. 학교에 왔다.':'오늘도 학교에 왔다.'],['think','smile','(오늘은 누구한테 말 걸어 볼까? 두 명쯤…)']],pickPlace)};
// how many friends you can meet today: two, or fewer when fewer have something new
function needToday(){return Math.min(2,friendsToday().length)}
d2Goal=function(){const left=friendsToday().filter(i=>!PICKS.includes(i));
 if(PICKS.length>=needToday()||!left.length){if(stage==='d2_class'){setGoal('');setTimeout(()=>lessons('pm'),300)}return}
 setGoal(PICKS.length?'점심시간! 한 친구를 더 만나 보기':'오늘 이야기할 친구 2명 고르기',left,id=>PICKS.includes(id),` (${PICKS.length}/${needToday()})`)};
// a kid a scene brings along walks in from the way into the school (the map's door) to their spot; a seated one fades in at the desk
function comeOver(w,k,from){const n=sprite(w[0],w[1],w[2],w[3]);if(w[3]&&typeof w[3]==='object'){n.el.style.opacity=0;n.el.style.transition='opacity .7s';requestAnimationFrame(()=>requestAnimationFrame(()=>{n.el.style.opacity=1}));return n}
 const st=from||OUT[MAP]||(MAPS[MAP]&&MAPS[MAP].start);if(!st)return n;const tx=w[1],ty=w[2];let p=findPath(st[0],st[1],tx,ty);if(!p||!p.length)return n;
 n.x=st[0];n.y=st[1];n.path=p;const go=performance.now()+(k||0)*550;let last=go;n.el.style.visibility='hidden';
 const step=now=>{if(!npcs.includes(n)){return}if(now<go||!n.w){requestAnimationFrame(step);return}n.el.style.visibility='';const dt=Math.min(.05,(now-last)/1000);last=now;
  if(!p.length){n.path=null;n.x=tx;n.y=ty;n.frame=0;n.dir='down';draw(n);return}
  const[px,py]=p[0],ex=px-n.x,ey=py-n.y,d=Math.hypot(ex,ey);if(d<6){p.shift()}else{const k=Math.min(d,260*dt)/d;n.x+=ex*k;n.y+=ey*k;
   n.dir=Math.abs(ex)>Math.abs(ey)?(ex<0?'left':'right'):(ey<0?'up':'down');n.t=(n.t||0)+dt;n.frame=[1,0,2,0][Math.floor(n.t*8)%4]}draw(n);requestAnimationFrame(step)};
 draw(n);requestAnimationFrame(step);return n}
// after a scene: a kid who came along but whose own story today is somewhere else goes back there (leaves this map), so tapping them
// here can't start their story in the wrong place
function tidyPeople(){npcs=npcs.filter(n=>{const e=D2IDS.includes(n.id)&&!PICKS.includes(n.id)&&epNext(n.id,EPIDX[n.id]);
 if(e&&e.place&&e.place!==MAP&&!(e.also&&e.also[MAP])){n.el&&n.el.remove();return false}return true})}
// a list of lines and finds, played in order; {only:[…]} / {flag,is} parts play only after that choice / with that flag
// {pic:'name'} (in pre, a choice's r or post) shows that picture over the map from there on (what the lines describe, when the map can't show it); a find always goes back to the map
// {go:'hall'} walks over to another place and goes on there
// {lay:[[k,x,y,w,picture?]]} lays things on the map from that line on (tap spots too); {clear:[k…]} takes them away again (both gone when the map is left)
// a picture not drawn yet is skipped (the map stays, no black screen): each meeting checks its pictures when it starts
const PICOK={};function picProbe(name){if(name in PICOK)return;PICOK[name]=null;const im=new Image();im.onload=()=>{PICOK[name]=true};
 im.onerror=()=>{PICOK[name]=false;if(sceneEl.style.backgroundImage.includes(`scenes/${name}.jpg`))sceneEl.classList.remove('on')};im.src=`scenes/${name}.jpg`}
// a picture that shows me (or my shadow) has a boy and a girl version: HEROPIC.add('name') in ep_<id>.js, files scenes/name_m.jpg and name_f.jpg
const HEROPIC=new Set();function heroPic(n){return n&&HEROPIC.has(n)?n+(HERO==='hero_m'?'_m':'_f'):n}
function showPic(name){name=heroPic(name);if(name&&PICOK[name]!==false){picProbe(name);sceneEl.style.backgroundImage=`url(scenes/${name}.jpg)`;sceneEl.classList.add('on');requestAnimationFrame(fitScene)}else sceneEl.classList.remove('on')}
function layThings(lay,clear){for(const k of clear||[]){world.querySelectorAll('.laid').forEach(e=>{if(e.dataset.k===k)e.remove()});OBJ[MAP]=(OBJ[MAP]||[]).filter(o=>!(o.laid&&o[0]===k))}
 for(const[k,x,y,w,img]of lay||[]){const it=document.createElement('img');it.className='item thing laid';it.dataset.k=k;it.src=`items/${img||k}.png`;
  it.style.cssText=`position:absolute;width:${w||56}px;left:${x}px;top:${y}px;transform:translate(-50%,-100%);z-index:${Math.round(y)+1};pointer-events:none;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))`;world.appendChild(it);
  const o=[k,x,y-(w||56)*.4,Math.max(30,(w||56)*.55)];o.laid=1;(OBJ[MAP]=OBJ[MAP]||[]).push(o)}
 tagAll()}
function runSteps(steps,choice,done){const q=(steps||[]).slice();
 const next=()=>{const lines=[];
  while(q.length){const s=q[0];if(Array.isArray(s)||typeof s==='function'){lines.push(q.shift());continue}
   if(s.only||s.flag){q.shift();const ok=s.only?s.only.includes(choice):(+!!FLAGS[s.flag])===s.is;if(ok)q.unshift(...s.lines);continue}
   if('pic' in s){q.shift();const pic=s.pic;lines.push(()=>showPic(pic));continue}
   if(s.lay||s.clear){q.shift();lines.push(()=>layThings(s.lay,s.clear));continue}break}
  const go=()=>{showPic(null);if(!q.length){done&&done();return}const f=q.shift();if(f.go){fade(()=>{load(f.go);next()});return}find(f.k,()=>{TODAY.add(f.k);next()},f.goal||'「{x}」 찾기')};
  if(lines.length)say(lines,go);else go()};
 next()}
// ep.scene = highlight picture (scenes/<name>.jpg) shown from the moment before the choice; without it the scene plays on the map
const _d2Talk=d2Talk;
d2Talk=function(id){const e=epNext(id,EPIDX[id]);
 if(!e||PICKS.includes(id)||!['d2_class'].includes(stage)||PICKS.length>=needToday()){
  if(e||!DD()[id]){say([AGAIN[id]||['think','smile','(오늘은 여기까지. 내일 또 얘기해 보자.)']]);return}
  return _d2Talk(id)}
 {let k=0;for(const w of e.with||[]){const n=npcs.find(x=>x.id===w[0]);if(!n){npcs.push(comeOver(w,k++));continue}
  // already on this map (their own story is here too): they go over to where this scene has them (stand up and walk, or fade in at the desk)
  if(Math.hypot(n.x-w[1],n.y-w[2])>60){const at=[n.x,n.y];n.el.remove();npcs.splice(npcs.indexOf(n),1);npcs.push(comeOver(w,k++,at))}}}// the kids this scene brings along come over now (walk in from the school door, no popping up)
 setGoal('');for(const m of JSON.stringify(e).matchAll(/"(?:pic|scene)":"(\w+)"/g))picProbe(heroPic(m[1]));const hs=heroPic(e.scene),pic=!!e.scene&&PICOK[hs]!==false;SCENE_IDS=[id].concat((e.with||[]).map(w=>w[0]));SCENE_EP=e;GOWITH=null;
 runSteps(e.pre,null,()=>{const choose=()=>ask(e.ask||'어떻게 할까?',e.choices,o=>{D2CHOICE[id]=o.k;sceneEl.classList.remove('on');
  for(const[f,v]of Object.entries(e.flag||{}))FLAGS[f]=!!v[o.k];
  if(e.vote)FLAGS[id+'_vote']=1;else MEET[id]=(MEET[id]||0)+1;TODAYEP[id]=e;
  const r=o.r||[],thenPost=()=>runSteps(e.post,o.k,()=>{Object.entries(o.pts||{}).forEach(([p,n])=>heart(p,n));PICKS.push(id);TALKED.add(id);tidyPeople();SCENE_IDS=null;SCENE_EP=null;GOWITH=null;
   setTimeout(()=>lessons(PICKS.length>=needToday()?'pm':'am'),500)});
  // a reaction with showPic functions in it (Siwoo) still plays as plain lines; one with {pic}/{lay}/{only} steps plays through runSteps
  if(r.some(x=>typeof x==='function'))say(r,thenPost);else runSteps(r,o.k,thenPost)});
  if(pic&&PICOK[hs]!==false){scene(hs,[],choose,true);picProbe(hs)}else{showPic(null);choose()}})};
// ---- lessons: the class at their desks listening to the teacher (a picture over the classroom; the same lines as before) ----
const LESSON_PICS=['lesson_1','lesson_2','lesson_3'];// morning pictures (scenes/<name>.jpg), the last one is the afternoon; none = lines on the classroom map
lessons=function(part){setGoal('');busy=true;fade(()=>{if(MAP!=='class')load('class');
 const am=[['nar','','딩동댕— 1교시 시작 종이 울렸다.'],['nar','','선생님: 「자, 교과서 펴세요.」'],['think','smile','(아까 일이 자꾸 생각난다.)'],['nar','','2교시, 3교시, 4교시… 오전 수업이 지나갔다.'],['nar','','딩동댕— 점심시간!']];
 const pm=[['nar','','딩동댕— 5교시 시작 종이 울렸다.'],['nar','','오후 수업이 천천히 지나갔다.'],['nar','','딩동댕— 마지막 종이 울렸다. 방과 후!']];
 const n=LESSON_PICS.length,pic=!n?null:part==='am'?LESSON_PICS[DAY%Math.max(1,n-1)]:LESSON_PICS[n-1];
 (pic?(ls,cb)=>scene(pic,ls,cb):say)(part==='am'?am:pm,()=>{if(part==='am')d2Goal();else{stage='d2_after';setGoal('방과 후! 나가는 길로 가서 집에 가기','out')}})})};
// ---- evening: Mom asks, each friend's part follows ----
function evePart(id){const e=TODAYEP[id],c=D2CHOICE[id];
 if(e){const v=e.eve||{};let ls=(v.lead||[]).concat(v[c]||[]);if(v.commonIf&&v.commonIf.only.includes(c))ls=ls.concat(v.commonIf.lines);return ls.concat(v.common||[])}
 const d=DD()[id]||{};return(d.tell||[]).concat((d.mom&&d.mom[c])||[])}
dinner2=function(){let ls=[['mom','laugh','왔구나! 손 씻고 와. 밥 먹자.'],['mom','smile','오늘 학교 어땠어?']];
 PICKS.forEach((id,n)=>{if(n===1)ls.push(['mom','smile','또 누구 만났어?']);ls=ls.concat(evePart(id))});
 const D=()=>'dinner'+(HERO==='hero_m'?'_m':'');
 const end=()=>scene(D(),[['mom','relieved',DAY===2?'하루 만에 친구가 둘이나 생겼네. 엄마는 그게 제일 좋다.':'친구 이야기가 점점 많아지네. 엄마도 듣는 게 즐거워.'],['mom','smile','오늘 일도 {w}에 적어 두렴. 내일은 또 누구를 만날까?']],()=>{dinnerDone=true;night2()});
 const rv=REVIEW[DAY];
 scene(D(),ls.concat(rv?rv.ask:[]),()=>{if(!rv){end();return}find(rv.k,()=>say(rv.after,end),rv.goal)})};
// night: one friend or two
night2=function(){setGoal('');bgm('night');scene('night'+(HERO==='hero_m'?'_m':''),[['nar','','밤. {w}를 펼쳤다.'],['think','relieved',PICKS.length>1?'(오늘은 두 친구랑 조금 가까워졌어.)':'(오늘은 친구랑 조금 더 가까워졌어.)'],['think','smile',DAY>=3?'(어제보다 말이 조금 더 나왔어.)':'(다들 겉으로 보이는 것과 속마음이 달랐어.)'],['think','surprised','(반장이 되려면… 한 명 한 명을 더 알아야 해.)']],end2)};
// is there anything new to play on day n?
function dayHasContent(n){if(n===2)return true;if(n===3&&Object.keys(window.D3||{}).length)return true;return D2IDS.some(f=>epNext(f))}
saveDay=function(){try{localStorage.setItem('haru_save',JSON.stringify({day:DAY,hero:HERO,heart:HEART,found:[...FOUND],mode:UI+'-'+LANG,meet:MEET,flags:FLAGS}))}catch(e){}};
function contGame(s){MEET={...(s.meet||{})};FLAGS={...(s.flags||{})};let n=s.day||2;if(n>3||n===3&&!Object.keys(window.D3||{}).length)n=dayHasContent(n)?n:2;startDay(n)}
// a card picture only for words that have one
const CARDS_HAVE=new Set(['alarm_clock','apple','apron','bag','ball','bandage','basket','battery','blackboard','bookmark','bread','cart','chalk','chopsticks','clip','cocoon','coin','colored_pencil','crayon','cup','curtain','cushion','earmuffs','earphones','eraser','fan','flag','flashlight','flowerpot','glue_stick','handkerchief','headphones','highlighter','hoodie','ice','lid','locker','lunch_box','magnifying_glass','mechanical_pencil','milk_carton','napkin','notebook','palette','payphone','pcase','pencil','pillow','radio','scissors','sharpener','sheet_music','sketchbook','speaker','stopwatch','straw','tape','thread','tissue','trash_can','tray','umbrella','wallet','water_bottle','watering_can','wheel','wheelchair','whistle',
 'cat','envelope','broom','paper','big_dog','milk','picture','door','box','shoes']);
cardOf=function(k){return CARDS_HAVE.has(k)?`cards/${k}.jpg`:null};
end2=function(){const n=DAY,next=n+1,hasNext=dayHasContent(next);DAY=hasNext?next:n;saveDay();DAY=n;
 const m=document.getElementById('modal'),c=document.getElementById('mcard');const hs=Object.entries(HEART).map(([i,nn])=>`${nm(i)} ♥${nn}`).join(' · ')||tr('아직 없음');
 const ws=[...TODAY].filter(k=>cardOf(k));const D=(t,x)=>tr(t).replace('{n}',x);
 c.innerHTML=`<h2>${D('{n}일차 끝!',n)}</h2><p>${tr('오늘 배운 낱말')}</p><div class="pick">${ws.map(k=>`<button onclick="speak('${k}')"><img src="${cardOf(k)}" alt=""><span class="word" style="display:block;margin:6px 0 0">${wordOf(k)} 🔊</span></button>`).join('')}</div><p>${tr('친해진 친구')}: ${hs}</p>${hasNext?`<button class="big" id="gonext">${D('{n}일차 시작',next)}</button> `:`<p style="color:#8a7a6a">${D('{n}일차는 준비 중이에요.',next)}</p>`}<button class="big" id="re2">${D('{n}일차 다시 하기',n)}</button> <button class="big" id="re">${tr('처음부터 다시')}</button>`;
 m.classList.add('on');document.getElementById('re').onclick=()=>{try{localStorage.removeItem('haru_save')}catch(e){}location.href=location.pathname};
 document.getElementById('re2').onclick=()=>{for(const k in HEART)delete HEART[k];Object.assign(HEART,DAYHEART[n]||HEART_D1||{});startDay(n)};
 if(hasNext){DAYHEART[next]={...HEART};delete DAYMEET[next];document.getElementById('gonext').onclick=()=>startDay(next)}};
// a scene that walks on to another place ({go}) brings its friend along; ep.goAlone = {map:[choices]} when the hero goes there alone
{const _load=load;load=function(m,x){if(SCENE_IDS){const al=SCENE_EP&&SCENE_EP.goAlone&&SCENE_EP.goAlone[m];GOWITH=al&&al.includes(D2CHOICE[SCENE_IDS[0]])?null:{map:m,ids:SCENE_IDS}}return _load(m,x)}}
// no leaving through the way out while a friend's find is running (the find's thing is on this map; leaving lost the scene and the day got stuck)
{const _pickPlace=pickPlace;pickPlace=function(){if(FIND&&['d2_class','d2_after'].includes(stage)){say([['think','surprised','(먼저 이 미션부터 끝내자.)']]);return}return _pickPlace()};
 const L={en:'(Let me finish this mission first.)',id:'(Aku selesaikan misi ini dulu.)',vi:'(Làm xong nhiệm vụ này trước đã.)',zh:'（先把这个任务做完吧。）'};
 for(const[u,t]of Object.entries(L)){T[u]=T[u]||{};T[u]['(먼저 이 미션부터 끝내자.)']=t}}
// talking from Day 3 on works like Day 2
const _talkTo=talkTo;
talkTo=function(id){if(DAY>=3){if(FIND)return;
  if(D2PLACE[MAP]&&['d2_class','d2_after'].includes(stage)){d2Talk(id);return}
  if(stage==='d2_home'&&id==='mom'){say([['mom','smile','오늘도 잘 다녀와.']]);return}
  if(stage==='d2_leave'&&id==='mom'){say([AGAIN.mom_am]);return}}
 return _talkTo(id)};
// ---- the teacher speaks with her own face: every line written 「선생님: 「…」」 (narration) is shown as the teacher's line in the bottom panel;
// the line text itself stays as written, and its translations lose the leading "Teacher:" label
NAME.teacher='선생님';
{const TN={en:'Teacher',id:'Bu Guru',vi:'Cô giáo',zh:'老师',ja:'先生',ru:'Учительница'};window.T=window.T||{};for(const u in TN){T[u]=T[u]||{};if(!T[u]['선생님'])T[u]['선생님']=TN[u]}}
const TEACH_RE=/^선생님:\s*「([\s\S]*)」$/,TEACH_SERIOUS=/안 돼|그만|싸우|빠진다|하지 말|조용|떠들|뛰지/;
function stripLabel(t){const m=t&&t.match(/^(?:Teacher|Bu Guru|Guru|Cô giáo|Cô|老师|先生|Учительница|Учитель)\s*[:：]\s*[「"“『«]?([\s\S]*?)[」"”』»]?\s*$/);return m?m[1]:t}
function teacherLine(l){if(!Array.isArray(l)||l[0]!=='nar'||typeof l[2]!=='string')return l;const m=l[2].match(TEACH_RE);if(!m)return l;const inner=m[1];
 for(const u in T){const v=T[u]&&T[u][l[2]];if(v&&!(inner in T[u]))T[u][inner]=stripLabel(v)}
 const n=['teacher',TEACH_SERIOUS.test(inner)?'angry':'smile',inner];if(l.teach)n.teach=l.teach;return n}
{const _say=say;say=function(lines,done){return _say(Array.isArray(lines)?lines.map(teacherLine):lines,done)}}
// test shortcuts: #meet5 = the morning of the day you meet Minho the 5th time (Day 6); #meet5eve = that evening with Siwoo
{const h=location.hash.match(/^#meet(\d+)(eve)?$/);if(h)setTimeout(()=>{const k=+h[1];HEART_D1={};FOUND.add('handkerchief');MEET={minho:k-1};if(k>4)FLAGS.M04_word=true;const day=k+1;
 if(!h[2]){startDay(day);return}
 setDay(day);EPIDX.minho=k-1;const e=EP.minho[k-1];TODAYEP.minho=e;MEET.minho=k;PICKS=['minho'];D2CHOICE.minho='A';
 if(day===2&&D2.siwoo){PICKS.push('siwoo');D2CHOICE.siwoo='B'}stage='d2_after';load('class');useDoor()},50)}
