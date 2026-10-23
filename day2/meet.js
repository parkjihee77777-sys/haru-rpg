// ---------- scenes by meeting (loaded after engine.js) ----------
// A friend with per-meeting scenes (window.EP[id]) plays their next scene each time you talk to them at school: meeting 1 = their "Day 2",
// meeting 15 = "Day 16R", whatever the calendar day. Friends without them keep the scenes of the calendar day (D2 / D3).
// Evening: Mom asks 「오늘 학교 어땠어?」 → the first friend's part → 「또 누구 만났어?」 → the second friend's part.
let MEET={},FLAGS={},ELECTION=false;// meetings so far per friend, story flags (M04_word …), election day (the voting-day special needs it)
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
 for(const[f,e]of eps)if(e.place===id){ps.push([f,e.at[0],e.at[1]]);(e.with||[]).forEach(w=>ps.push(w))}
 return ps};
// today's scenes add their things to the maps (drawn spots to tap, pictures laid on top)
const _setDay=setDay;
// days without their own drawn maps keep Day 2's (the same things lie in the same places)
setDay=function(n){_setDay(NATIVE_BY[n]?n:2);DAY=n;for(const k in THINGS)delete THINGS[k];
 for(const f of D2IDS){const e=epNext(f,EPIDX[f]);if(!e)continue;
  for(const[m,ts]of Object.entries(e.taps||{}))NATIVE[m]=(NATIVE[m]||[]).concat(ts);
  for(const[m,ts]of Object.entries(e.things||{}))THINGS[m]=(THINGS[m]||[]).concat(ts)}};
// a morning for every day: Day 2 and 3 have their own; later days Mom asks for one of the things that always lie in the kitchen
const MORNING_KEYS=['apple','bread','cup','umbrella','bag','handkerchief','apron','notebook'];
function morningOf(n){if(MORNING[n])return MORNING[n];const k=MORNING_KEYS[(n-4)%MORNING_KEYS.length];
 return{k,open:[['nar','','아침.'],['mom','smile',k==='notebook'?'{w} 좀 찾아 줄래?':`{@${k}} 좀 찾아 줄래?`]],after:[['mom','laugh','고마워!'],['me','smile','…응. 다녀올게.'],['mom','smile','오늘도 저녁에 이야기 들려줘.']]}}
startDay=function(n){const m=document.getElementById('modal');m.classList.remove('on');
 if(DAYMEET[n]){MEET={...DAYMEET[n].meet};FLAGS={...DAYMEET[n].flags}}else DAYMEET[n]={meet:{...MEET},flags:{...FLAGS}};
 for(const k in EPIDX)delete EPIDX[k];for(const k in TODAYEP)delete TODAYEP[k];for(const f of D2IDS)if(window.EP&&EP[f])EPIDX[f]=MEET[f]||0;
 setDay(n);PICKS=[];D2CHOICE={};TALKED.clear();TODAY.clear();dinnerDone=false;CHOICE=null;for(const k in pangSaid)delete pangSaid[k];
 const M=morningOf(n);stage='d2_home';bgm('day');fade(()=>{load('home_am');say(M.open,()=>
  find(M.k,()=>{TODAY.add(M.k);say(M.after,()=>{stage='d2_leave';setGoal('현관으로 나가 학교 가기','door')})},'「{x}」 찾기'))})};
startDay2=function(){startDay(2)};
d2Class=function(){stage='d2_class';load('hall');say([['nar','',DAY===2?'둘째 날. 학교에 왔다.':DAY===3?'셋째 날. 학교에 왔다.':'오늘도 학교에 왔다.'],['think','smile','(오늘은 누구한테 말 걸어 볼까? 두 명쯤…)']],pickPlace)};
// how many friends you can meet today: two, or fewer when fewer have something new
function needToday(){return Math.min(2,friendsToday().length)}
d2Goal=function(){const left=friendsToday().filter(i=>!PICKS.includes(i));
 if(PICKS.length>=needToday()||!left.length){if(stage==='d2_class'){setGoal('');setTimeout(()=>lessons('pm'),300)}return}
 setGoal(PICKS.length?'점심시간! 한 친구를 더 만나 보기':'오늘 이야기할 친구 2명 고르기',left,id=>PICKS.includes(id),` (${PICKS.length}/${needToday()})`)};
// a list of lines and finds, played in order; {only:[…]} / {flag,is} parts play only after that choice / with that flag
function runSteps(steps,choice,done){const q=(steps||[]).slice();
 const next=()=>{const lines=[];
  while(q.length){const s=q[0];if(Array.isArray(s)){lines.push(q.shift());continue}
   if(s.only||s.flag){q.shift();const ok=s.only?s.only.includes(choice):(+!!FLAGS[s.flag])===s.is;if(ok)q.unshift(...s.lines);continue}break}
  const go=()=>{if(!q.length){done&&done();return}const f=q.shift();find(f.k,()=>{TODAY.add(f.k);next()},f.goal||'「{x}」 찾기')};
  if(lines.length)say(lines,go);else go()};
 next()}
const SCENE_OK=new Set();// highlight pictures that exist (scenes/<name>.jpg); others play on the map
const _d2Talk=d2Talk;
d2Talk=function(id){const e=epNext(id,EPIDX[id]);
 if(!e||PICKS.includes(id)||!['d2_class'].includes(stage)||PICKS.length>=needToday()){
  if(e||!DD()[id]){say([AGAIN[id]||['think','smile','(오늘은 여기까지. 내일 또 얘기해 보자.)']]);return}
  return _d2Talk(id)}
 setGoal('');const pic=e.scene&&SCENE_OK.has(e.scene);
 runSteps(e.pre,null,()=>{const choose=()=>ask(e.ask||'어떻게 할까?',e.choices,o=>{D2CHOICE[id]=o.k;sceneEl.classList.remove('on');
  for(const[f,v]of Object.entries(e.flag||{}))FLAGS[f]=!!v[o.k];
  if(e.vote)FLAGS[id+'_vote']=1;else MEET[id]=(MEET[id]||0)+1;TODAYEP[id]=e;
  say(o.r||[],()=>runSteps(e.post,o.k,()=>{Object.entries(o.pts||{}).forEach(([p,n])=>heart(p,n));PICKS.push(id);TALKED.add(id);
   setTimeout(()=>lessons(PICKS.length>=needToday()?'pm':'am'),500)}))});
  if(pic)scene(e.scene,[],choose,true);else choose()})};
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
// talking from Day 3 on works like Day 2
const _talkTo=talkTo;
talkTo=function(id){if(DAY>=3){if(FIND)return;
  if(D2PLACE[MAP]&&['d2_class','d2_after'].includes(stage)){d2Talk(id);return}
  if(stage==='d2_home'&&id==='mom'){say([['mom','smile','오늘도 잘 다녀와.']]);return}
  if(stage==='d2_leave'&&id==='mom'){say([AGAIN.mom_am]);return}}
 return _talkTo(id)};
// test shortcuts: #meet5 = the morning of the day you meet Minho the 5th time (Day 6); #meet5eve = that evening with Siwoo
{const h=location.hash.match(/^#meet(\d+)(eve)?$/);if(h)setTimeout(()=>{const k=+h[1];HEART_D1={};FOUND.add('handkerchief');MEET={minho:k-1};if(k>4)FLAGS.M04_word=true;const day=k+1;
 if(!h[2]){startDay(day);return}
 setDay(day);EPIDX.minho=k-1;const e=EP.minho[k-1];TODAYEP.minho=e;MEET.minho=k;PICKS=['minho'];D2CHOICE.minho='A';
 if(day===2&&D2.siwoo){PICKS.push('siwoo');D2CHOICE.siwoo='B'}stage='d2_after';load('class');useDoor()},50)}
