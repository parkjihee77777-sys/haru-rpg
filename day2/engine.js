// ---------- Day 2: pick two classmates, each with their own scene (data: day2/<id>.js) ----------
// Every friend scene runs on the classroom map: open lines → word finds (picture cards, by sound) → the friend's thought → a choice A–D →
// reaction → hearts. Evening: Mom asks about the day; what I tell her and her answer depend on who I met and what I chose.
const D2IDS=['minho','jinwoo','haram','junho','doyeon','haeun','haneul','boram','yena','youngmin','jihoon','seah','sua','siwoo','yuna','hangyeol','hyeeun','jiho'];
const D2NAME={jinwoo:'진우',haram:'하람',doyeon:'도연',haneul:'하늘',boram:'보람',youngmin:'영민',seah:'세아',hangyeol:'한결',jiho:'지호'};
Object.assign(NAME,D2NAME);
Object.assign(SZ,{"jinwoo":[0.961,0.983,1.009],"haram":[0.961,0.98,0.974],"doyeon":[0.944,0.976,1.021],"haneul":[0.971,0.988,0.994],"boram":[0.973,0.988,1.002],"youngmin":[0.966,0.983,1.018],"seah":[0.888,0.974,0.974],"hangyeol":[0.956,0.983,0.986],"jiho":[0.919,0.973,1.006]});
// the shared morning word + every friend's words, in every language; translations of every line
const D2WORDS={handkerchief:{ko:'손수건',en:'handkerchief',id:'sapu tangan',vi:'khăn tay',zh:'手帕',card:'손수건'},
 chalk:{ko:'분필',en:'chalk',id:'kapur',vi:'phấn',zh:'粉笔'},umbrella:{ko:'우산',en:'umbrella',id:'payung',vi:'cái ô',zh:'雨伞'},ball:{ko:'공',en:'ball',id:'bola',vi:'quả bóng',zh:'球'},
 flag:{ko:'깃발',en:'flag',id:'bendera',vi:'lá cờ',zh:'旗子'},cup:{ko:'컵',en:'cup',id:'gelas',vi:'cái cốc',zh:'杯子'},bread:{ko:'빵',en:'bread',id:'roti',vi:'bánh mì',zh:'面包'},
 apple:{ko:'사과',en:'apple',id:'apel',vi:'quả táo',zh:'苹果'},bag:{ko:'가방',en:'bag',id:'tas',vi:'cặp sách',zh:'书包'},bench:{ko:'벤치',en:'bench',id:'bangku',vi:'ghế băng',zh:'长椅'}};
function d2Merge(){for(const id of D2IDS){const d=window.D2&&D2[id];if(!d)continue;Object.assign(D2WORDS,d.words||{});
  if(d.again&&!AGAIN[id])AGAIN[id]=d.again;if(d.name&&!NAME[id])NAME[id]=d.name;
  for(const ui of ['en','id','vi','zh']){T[ui]=T[ui]||{};for(const[k,v]of Object.entries((d.tr&&d.tr[ui])||{}))if(!(k in T[ui]))T[ui][k]=v}}
 for(const[k,w]of Object.entries(D2WORDS))for(const l of Object.keys(LANGS))if(w[l])LANGS[l].words[k]=w[l]}
// ---- things to tap on each school map (Day 2+): drawn-in things (hotspots) + things lying around (item pictures) ----
// every friend's things lie near that friend from the start, so you can tap and hear them before anyone asks for them
// [key, x, y(bottom), radius] drawn-in things you can tap
const NATIVE={class:[['blackboard',870,55,110],['bag',697,345,28],['bag',1105,348,28],['bag',265,462,28],['bag',547,468,28],['bag',1137,592,30],['bag',985,600,28],['bag',1490,710,28]],
 hall:[['locker',1240,560,90],['locker',970,195,40],['bench',655,320,55],['bench',715,560,70]],
 field:[['bench',1400,775,55],['bench',60,725,55],['bench',790,150,40],['bench',900,135,40]],
 cafe:[['table',390,600,100],['table',760,470,100],['table',1040,355,80],['table',1350,740,110]]};
const NATIVE_KEYS=new Set(['blackboard','locker']);
// tapping a person while finding: Hyeeun's wheelchair (upper part) or its wheel (lower part)
function npcThing(n,y){if(n.id==='hyeeun')return y>n.y-n.h*.42?'wheel':'wheelchair';return null}
const NPC_THING={hyeeun:'wheelchair'};
// things lying where they belong: [key, x, y(bottom), width]
const THINGS={
 class:[['sheet_music',1125,332,56],['tape',1255,332,50],['sketchbook',315,332,60],['sharpener',445,332,46],['pillow',1262,447,70],['curtain',1625,345,92],
  ['thread',700,567,46],['highlighter',822,567,50],['magnifying_glass',948,567,54],['eraser',250,703,44],['cocoon',1205,703,40],['lid',1335,703,54],['hoodie',1468,707,62],
  ['pcase',626,655,56],['eraser',577,705,42],['eraser',742,320,42],['mechanical_pencil',806,322,46],['chalk',800,113,34],['notebook',330,447,52],['umbrella',1442,258,66]],
 hall:[['ice',1172,668,50],['radio',690,565,62],['battery',742,612,34],['umbrella',212,648,66],['bag',655,318,56]],
 field:[['stopwatch',1375,765,44],['bandage',1432,752,46],['whistle',1335,262,46],['ball',440,575,52],['flag',1560,335,60],['cup',62,712,36]],
 cafe:[['tray',380,565,70],['chopsticks',452,568,56],['trash_can',1480,598,72],['milk_carton',1545,517,40],['bread',1622,520,46],['cart',185,885,110],['straw',198,792,36],['cup',700,470,40],['apple',1150,368,40],['bread',560,238,44]]};
function placeThings(id){return THINGS[id]||[]}
function showThings(id){world.querySelectorAll('.thing').forEach(e=>e.remove());const things=placeThings(id);
 for(const[k,x,y,w]of things){const it=document.createElement('img');it.className='item thing';it.src=`items/${k}.png`;
  it.style.cssText=`position:absolute;width:${w||56}px;left:${x}px;top:${y}px;transform:translate(-50%,-100%);z-index:${Math.round(y)+1};pointer-events:none;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))`;world.appendChild(it)}
 OBJ[id]=(NATIVE[id]||[]).concat(things.map(([k,x,y,w])=>[k,x,y-(w||56)*.4,Math.max(30,(w||56)*.55)]))}
// a picture for every word that can be a card
function cardOf(k){if(['notebook','pcase','pencil','bag'].includes(k))return `cards/${k}.jpg`;return D2WORDS[k]?`cards/${k}.jpg`:null}
// ---- places (Day 2+): the classroom door asks where to go; each place has its own people ----
Object.assign(MAPS,{
 hall:{img:'maps/hall.jpg',walk:[[[204,938],[427,158],[836,149],[1040,316],[1115,465],[1338,669],[1468,799],[1598,938]]],rects:[],block:[R(604,176,845,818)],start:[1150,700]},
 field:{img:'maps/field.jpg',walk:[[[74,372],[372,177],[1040,158],[1598,279],[1598,557],[1486,780],[1115,873],[650,799],[223,613]]],rects:[],block:[],start:[400,470]},
 cafe:{img:'maps/cafe.jpg',walk:[[[37,465],[223,362],[1189,260],[1672,381],[1672,938],[0,938]]],rects:[],block:[R(149,474,632,818),R(530,372,985,650),R(836,288,1245,465),R(1050,595,1672,938),R(641,780,1189,938)],start:[640,390]}});
Object.assign(PLACE,{hall:'hall',field:'field',cafe:'cafe'});
// the way out of each place (tap it → "where to?")
const OUT={class:[1440,262],hall:[1230,560],field:[330,440],cafe:[640,385]};
const PLACES=[['class','교실'],['hall','복도'],['field','운동장'],['cafe','급식실']];
// who is where on Day 2 — most kids sit at their desks; seat = {top: chair-back top on the map}
const D2PLACE={
 class:[['yena',1190,0,{top:333}],['doyeon',380,0,{top:333}],['jinwoo',1325,0,{top:448}],['hangyeol',760,0,{top:572}],['jihoon',885,0,{top:572}],['youngmin',260,0,{top:715}],['siwoo',1270,0,{top:715}],['haneul',1405,0,{top:715}],['minho',600,600],['sua',600,262]],
 hall:[['hyeeun',760,880],['seah',1110,650],['boram',570,640]],
 field:[['junho',1300,745],['jiho',1200,380]],
 cafe:[['haram',300,470],['haeun',1400,565],['yuna',300,870]]};
const SEATED_ART=new Set(['yuna','haeun','yena','siwoo','doyeon','haneul','youngmin','jihoon','jinwoo','hangyeol']);// seat/<id>.png exists; others stand at their desk until drawn
function d2People(id){return(D2PLACE[id]||[]).map(p=>p[3]&&!SEATED_ART.has(p[0])?[p[0],p[1],p[3].top+175]:p)}
function goPlace(dest){fade(()=>{load(dest);if(stage==='d2_class')d2Goal();else setGoal('방과 후! 나가는 길로 가서 집에 가기','out')})}
function pickPlace(){const m=document.getElementById('modal'),c=document.getElementById('mcard');busy=true;
 c.innerHTML=`<h2>${tr(stage==='d2_after'?'방과 후! 이제 어디로 갈까?':'어디로 가 볼까?')}</h2><div class="pick places">${PLACES.map(([id,n])=>`<button data-p="${id}"><img src="maps/${id}_s.jpg" alt=""><span class="word" style="display:block;margin:6px 0 0">${id===MAP?tr('여기 남기'):tr(n)}</span></button>`).join('')}${stage==='d2_after'?`<button data-p="home"><img src="maps/home_pm_s.jpg" alt=""><span class="word" style="display:block;margin:6px 0 0">${tr('집으로')}</span></button>`:''}</div>`;
 m.classList.add('on');c.querySelectorAll('.pick button').forEach(b=>b.onclick=()=>{m.classList.remove('on');busy=false;const p=b.dataset.p;if(p===MAP){if(stage==='d2_class')d2Goal();return}chime();if(p==='home'){fade(d2Home);return}goPlace(p)})}
let DAY=1,PICKS=[],D2CHOICE={};
function saveDay(){try{localStorage.setItem('haru_save',JSON.stringify({day:DAY,hero:HERO,heart:HEART,found:[...FOUND],mode:UI+'-'+LANG}))}catch(e){}}
function loadSave(){try{return JSON.parse(localStorage.getItem('haru_save')||'null')}catch(e){return null}}
// find by picture cards: the target + two others, tap one to hear it, "This is {word}" confirms
function cardFind(k,goalText,done,others){busy=true;const pool=Object.keys(D2WORDS).concat(['notebook','pcase','pencil','bag']).filter(q=>q!==k&&cardOf(q)&&!(others||[]).includes(q));
 const pick=(others||[]).filter(q=>q!==k&&cardOf(q));while(pick.length<2){const q=pool.splice(Math.floor(Math.random()*pool.length),1)[0];if(!q)break;pick.push(q)}
 const items=[k].concat(pick.slice(0,2)).sort(()=>Math.random()-.5);const m=document.getElementById('modal'),c=document.getElementById('mcard');let sel=null;
 c.innerHTML=`<h2>${tr(goalText||'「{x}」 찾기').replace('{x}',wordOf(k))} <button class="spk" id="again">🔊</button></h2><div class="pick">${items.map(q=>`<button data-k="${q}"><img src="${cardOf(q)}" alt=""></button>`).join('')}</div><button class="big" id="okb" style="visibility:hidden"></button>`;
 m.classList.add('on');setTimeout(()=>speak(k),300);document.getElementById('again').onclick=()=>speak(k);const okb=document.getElementById('okb');okb.textContent=tr('이건 {x}이다').replace('{x}',wordOf(k));
 c.querySelectorAll('.pick button').forEach(b=>b.onclick=()=>{sel=b.dataset.k;speak(sel);c.querySelectorAll('.pick button').forEach(x=>x.classList.toggle('ok',x===b));okb.style.visibility='visible'});
 okb.onclick=()=>{if(sel===k){chime();FOUND.add(k);TODAY.add(k);m.classList.remove('on');busy=false;done&&done()}else{buzz();const b=c.querySelector(`[data-k="${sel}"]`);b.classList.remove('ok');b.classList.add('no');setTimeout(()=>b.classList.remove('no'),400);setTimeout(()=>speak(k),600);okb.style.visibility='hidden'}}}
const TODAY=new Set();
// ---- morning ----
function startDay2(){const m=document.getElementById('modal');m.classList.remove('on');DAY=2;PICKS=[];D2CHOICE={};TALKED.clear();TODAY.clear();dinnerDone=false;CHOICE=null;for(const k in pangSaid)delete pangSaid[k];
 stage='d2_home';bgm('day');fade(()=>{load('home_am');say([['nar','','이튿날 아침.'],['mom','smile','잘 잤어? 오늘은 바람이 차네.'],['mom','smile','{@handkerchief} 하나 챙겨 가.']],()=>
  find('handkerchief',()=>{TODAY.add('handkerchief');world.querySelectorAll('.item').forEach(e=>{if(e.src.includes('handkerchief'))e.remove()});OBJ.home_am=OBJ.home_am.filter(o=>o[0]!=='handkerchief');say([['mom','laugh','그래, 그 {@handkerchief}! 주머니에 쏙.'],['me','smile','…응. 다녀올게.'],['mom','smile','오늘은 친구 누구랑 이야기했는지 저녁에 들려줘.']],()=>{stage='d2_leave';setGoal('현관으로 나가 학교 가기','door')})},'「{x}」 찾기'))})}
// the handkerchief on the kitchen table, tappable like any other thing
const HOME2=[['cup',870,505],['apple',975,520],['bread',1065,500],['umbrella',235,575]];
function placeD2Item(){if(!(DAY>=2&&MAP==='home_am'))return;const base=KITCHEN_OBJ.concat([['notebook',1020,500,42]]);const list=HOME2.slice();if(!TODAY.has('handkerchief'))list.push(['handkerchief',744,560]);
 for(const[k,x,y]of list){const it=document.createElement('img');it.className='item';it.src=`items/${k}.png`;it.style.cssText=`position:absolute;width:${k==='umbrella'?70:58}px;left:${x}px;top:${y}px;transform:translate(-50%,-100%);z-index:${y+1};pointer-events:none;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))`;world.appendChild(it)}
 OBJ.home_am=base.concat(list.map(([k,x,y])=>[k,x,y-24,34]))}
// ---- school ----
function d2Class(){stage='d2_class';load('hall');say([['nar','','둘째 날. 학교에 왔다.'],['think','smile','(오늘은 누구한테 말 걸어 볼까? 두 명쯤…)']],pickPlace)}
function d2Goal(){setGoal(PICKS.length?'점심시간! 한 친구를 더 만나 보기':'오늘 이야기할 친구 2명 고르기',D2IDS.filter(i=>window.D2&&D2[i]),id=>PICKS.includes(id),` (${PICKS.length}/2)`)}
function d2Talk(id){const d=window.D2&&D2[id];
 if(!['d2_class','d2_after'].includes(stage)||stage==='d2_after'||PICKS.includes(id)||!d||PICKS.length>=2){say([AGAIN[id]||['think','smile','(오늘은 여기까지. 내일 또 얘기해 보자.)']]);return}
 setGoal('');const finds=d.finds||[];let i=0;
 const nextFind=()=>{if(i>=finds.length){afterFinds();return}const f=finds[i++];if(TODAY.has(f.k)||FOUND.has(f.k)&&TODAY.has(f.k)){say(f.after||[],nextFind);return}
  say(f.before||[],()=>find(f.k,()=>{TODAY.add(f.k);say(f.after||[],nextFind)},f.goal||'「{x}」 찾기'))};
 const afterFinds=()=>{const ls=d.think?[['nar','',`💭 ${tr(NAME[id])}: ${tr(d.think)}`]]:[];scene('d2_'+id,ls,()=>ask('어떻게 할까?',d.choices,o=>{D2CHOICE[id]=o.k;sceneEl.classList.remove('on');say(o.r||[],()=>{Object.entries(o.pts||{}).forEach(([p,n])=>heart(p,n));PICKS.push(id);TALKED.add(id);
   setTimeout(()=>lessons(PICKS.length>=2?'pm':'am'),500)})}),true)};
 say(d.open||[],nextFind)}
// classes happen between the two friends (morning lessons → lunch) and after the second (afternoon → after school)
function lessons(part){setGoal('');busy=true;fade(()=>{if(MAP!=='class')load('class');
 const am=[['nar','','딩동댕— 1교시 시작 종이 울렸다.'],['nar','','선생님: 「자, 교과서 펴세요.」'],['think','smile','(아까 일이 자꾸 생각난다.)'],['nar','','2교시, 3교시, 4교시… 오전 수업이 지나갔다.'],['nar','','딩동댕— 점심시간!']];
 const pm=[['nar','','딩동댕— 5교시 시작 종이 울렸다.'],['nar','','오후 수업이 천천히 지나갔다.'],['nar','','딩동댕— 마지막 종이 울렸다. 방과 후!']];
 say(part==='am'?am:pm,()=>{if(part==='am')d2Goal();else{stage='d2_after';setGoal('방과 후! 나가는 길로 가서 집에 가기','out')}})})}
// ---- evening ----
function d2Home(){stage='home_pm';dinnerDone=false;load('home_pm');bgm('evening');say([['nar','','저녁. 부엌에서 맛있는 냄새가 난다.']],()=>find('mom',dinner2,'「{x}」에게 다녀왔다고 인사하기'))}
function dinner2(){let ls=[['mom','laugh','왔구나! 손 씻고 와. 밥 먹자.'],['mom','smile','오늘은 누구랑 이야기했어?']];
 PICKS.forEach((id,n)=>{const d=D2[id];if(n===1)ls.push(['me','smile','그리고…']);ls=ls.concat(d.tell||[]).concat((d.mom&&d.mom[D2CHOICE[id]])||[])});
 ls=ls.concat([['mom','relieved','하루 만에 친구가 둘이나 생겼네. 엄마는 그게 제일 좋다.'],['mom','smile','오늘 일도 {w}에 적어 두렴. 내일은 또 누구를 만날까?']]);
 scene('dinner'+(HERO==='hero_m'?'_m':''),ls,()=>{dinnerDone=true;night2()})}
function night2(){setGoal('');bgm('night');scene('night'+(HERO==='hero_m'?'_m':''),[['nar','','밤. {w}를 펼쳤다.'],['think','relieved','(오늘은 두 친구랑 조금 가까워졌어.)'],['think','smile','(다들 겉으로 보이는 것과 속마음이 달랐어.)'],['think','surprised','(반장이 되려면… 한 명 한 명을 더 알아야 해.)']],end2)}
function end2(){DAY=2;saveDay();const m=document.getElementById('modal'),c=document.getElementById('mcard');const hs=Object.entries(HEART).map(([i,n])=>`${nm(i)} ♥${n}`).join(' · ')||tr('아직 없음');
 const ws=[...TODAY].filter(k=>cardOf(k));
 c.innerHTML=`<h2>${tr('2일차 끝!')}</h2><p>${tr('오늘 배운 낱말')}</p><div class="pick">${ws.map(k=>`<button onclick="speak('${k}')"><img src="${cardOf(k)}" alt=""><span class="word" style="display:block;margin:6px 0 0">${wordOf(k)} 🔊</span></button>`).join('')}</div><p>${tr('친해진 친구')}: ${hs}</p><p style="color:#8a7a6a">${tr('3일차는 준비 중이에요.')}</p><button class="big" id="re2">${tr('2일차 다시 하기')}</button> <button class="big" id="re">${tr('처음부터 다시')}</button>`;
 m.classList.add('on');document.getElementById('re').onclick=()=>{try{localStorage.removeItem('haru_save')}catch(e){}location.href=location.pathname};document.getElementById('re2').onclick=()=>{for(const k in HEART)delete HEART[k];Object.assign(HEART,HEART_D1||{});startDay2()}}
let HEART_D1=null;
d2Merge();
