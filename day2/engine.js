const ZOOMS={};// map id → [[x0,y0,x1,y1], …] (map px), filled below
// ---------- Day 2: pick two classmates, each with their own scene (data: day2/<id>.js) ----------
// Every friend scene runs on the classroom map: open lines → word finds (picture cards, by sound) → the friend's thought → a choice A–D →
// reaction → hearts. Evening: Mom asks about the day; what I tell her and her answer depend on who I met and what I chose.
function DD(){return(DAY>=3?window.D3:window.D2)||{}}
const D2IDS=['minho','jinwoo','haram','junho','doyeon','haeun','haneul','boram','yena','youngmin','jihoon','seah','sua','siwoo','yuna','hangyeol','hyeeun','jiho'];
const D2NAME={jinwoo:'진우',haram:'하람',doyeon:'도연',haneul:'하늘',boram:'보람',youngmin:'영민',seah:'세아',hangyeol:'한결',jiho:'지호'};
Object.assign(NAME,D2NAME);
Object.assign(SZ,{"jinwoo":[0.961,0.983,1.009],"haram":[0.961,0.98,0.974],"doyeon":[0.944,0.976,1.021],"haneul":[0.971,0.988,0.994],"boram":[0.973,0.988,1.002],"youngmin":[0.966,0.983,1.018],"seah":[0.888,0.974,0.974],"hangyeol":[0.956,0.983,0.986],"jiho":[0.919,0.973,1.006]});
// the shared morning word + every friend's words, in every language; translations of every line
const D2WORDS={handkerchief:{ko:'손수건',en:'handkerchief',id:'sapu tangan',vi:'khăn tay',zh:'手帕',card:'손수건'},
 chalk:{ko:'분필',en:'chalk',id:'kapur',vi:'phấn',zh:'粉笔'},umbrella:{ko:'우산',en:'umbrella',id:'payung',vi:'cái ô',zh:'雨伞'},ball:{ko:'공',en:'ball',id:'bola',vi:'quả bóng',zh:'球'},
 flag:{ko:'깃발',en:'flag',id:'bendera',vi:'lá cờ',zh:'旗子'},cup:{ko:'컵',en:'cup',id:'gelas',vi:'cái cốc',zh:'杯子'},bread:{ko:'빵',en:'bread',id:'roti',vi:'bánh mì',zh:'面包'},
 apple:{ko:'사과',en:'apple',id:'apel',vi:'quả táo',zh:'苹果'},bag:{ko:'가방',en:'bag',id:'tas',vi:'cặp sách',zh:'书包'},bench:{ko:'벤치',en:'bench',id:'bangku',vi:'ghế băng',zh:'长椅'}};
function d2Merge(){for(const src of [window.D2,window.D3])for(const id of D2IDS){const d=src&&src[id];if(!d)continue;Object.assign(D2WORDS,d.words||{});
  if(d.again&&!AGAIN[id])AGAIN[id]=d.again;if(d.name&&!NAME[id])NAME[id]=d.name;
  for(const ui of ['en','id','vi','zh']){T[ui]=T[ui]||{};for(const[k,v]of Object.entries((d.tr&&d.tr[ui])||{}))if(!(k in T[ui]))T[ui][k]=v}}
 for(const[k,w]of Object.entries(D2WORDS))for(const l of Object.keys(LANGS))if(w[l])LANGS[l].words[k]=w[l]}
// ---- things to tap on each school map (Day 2+): drawn-in things (hotspots) + things lying around (item pictures) ----
// every friend's things lie near that friend from the start, so you can tap and hear them before anyone asks for them
// Day 2 maps have the things drawn right into the picture (maps/<id>2.jpg); [key, x, y, radius] = where to tap them
const BAGS=[['bag',697,345,28],['bag',1105,348,28],['bag',265,462,28],['bag',547,468,28],['bag',1137,592,30],['bag',985,600,28],['bag',1490,710,28]];
const NATIVE_BY={2:{
 class:[['blackboard',866,53,110],['sketchbook',382,307,26],['sharpener',490,293,18],['eraser',757,302,16],['mechanical_pencil',790,312,18],['pcase',917,310,22],
  ['sheet_music',1178,312,30],['tape',1320,310,20],['pcase',347,421,22],['pillow',1330,422,30],['pcase',464,545,22],['thread',740,540,15],['highlighter',778,550,17],
  ['magnifying_glass',915,545,22],['eraser',433,684,16],['pcase',575,655,26],['eraser',590,697,12],['cup',882,678,20],['cocoon',915,692,14],['lid',938,665,20],
  ['hoodie',1405,675,38],['curtain',1600,230,60]].concat(BAGS),
 hall:[['bag',645,255,30],['radio',720,548,30],['battery',700,588,12],['umbrella',210,620,40],['ice',1175,585,26],['ice',1130,610,18],['locker',1240,470,80],['locker',970,195,40],['bench',655,320,50],['bench',715,560,60]],
 field:[['ball',460,540,24],['flag',1595,325,28],['whistle',1385,278,16],['stopwatch',1385,770,16],['bandage',1415,752,16],['cup',78,718,14],['bench',1400,778,50],['bench',60,728,50],['bench',790,150,40],['bench',900,135,40]],
 cafe:[['tray',440,625,34],['chopsticks',487,660,16],['trash_can',1440,570,40],['milk_carton',1505,500,18],['bread',1655,540,20],['cart',195,775,60],['straw',222,735,14],['milk_carton',175,770,14],
  ['cup',840,505,16],['apple',1175,355,16],['table',390,600,100],['table',760,470,100],['table',1040,355,80],['table',1350,740,110]]}};
const NATIVE={};
// tapping a person while finding: Hyeeun's wheelchair (upper part) or its wheel (lower part)
function npcThing(n,y){if(n.id==='hyeeun')return y>n.y-n.h*.42?'wheel':'wheelchair';return null}
const NPC_THING={hyeeun:'wheelchair'};
// small pictures laid on top of the drawn map only where the drawing needs help (the drawn cocoon looked like a butterfly)
const THINGS={};
// tap near a cluster of small things → that part opens big
const ZOOMS_BY={2:{class:[[290,250,590,335],[680,250,980,335],[1090,250,1400,335],[1090,380,1400,446],[660,500,990,570],[520,625,720,712],[790,625,990,712],[330,640,520,712]],
 hall:[[590,210,800,340],[610,480,820,640],[1060,530,1260,660]],field:[[1310,700,1480,810],[1330,240,1440,310],[20,680,140,750]],
 cafe:[[360,580,540,690],[1390,460,1672,620],[110,680,300,820],[790,470,890,530],[1130,320,1220,380]]}};
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
const PLACE_BY={2:{
 class:[['yena',1190,0,{top:333}],['doyeon',380,0,{top:333}],['jinwoo',1325,0,{top:448}],['hangyeol',760,0,{top:572}],['jihoon',885,0,{top:572}],['youngmin',395,0,{top:715}],['siwoo',895,0,{top:715}],['haneul',1405,0,{top:715}],['minho',640,600],['sua',600,262]],
 hall:[['hyeeun',760,880],['seah',1100,640],['boram',570,640]],
 field:[['junho',1300,745],['jiho',1200,380]],
 cafe:[['haram',515,470],['haeun',1360,565],['yuna',330,860]]}};
let D2PLACE={};
const SEATED_ART=new Set(['yuna','haeun','yena','siwoo','doyeon','haneul','youngmin','jihoon','jinwoo','hangyeol']);// seat/<id>.png exists; others stand at their desk until drawn
function d2People(id){return(D2PLACE[id]||[]).map(p=>p[3]&&!SEATED_ART.has(p[0])?[p[0],p[1],p[3].top+175]:p)}
function goPlace(dest){fade(()=>{load(dest);if(stage==='d2_class')d2Goal();else setGoal('방과 후! 나가는 길로 가서 집에 가기','out')})}
function pickPlace(){const m=document.getElementById('modal'),c=document.getElementById('mcard');busy=true;
 c.innerHTML=`<h2>${tr(stage==='d2_after'?'방과 후! 이제 어디로 갈까?':'어디로 가 볼까?')}</h2><div class="pick places">${PLACES.map(([id,n])=>`<button data-p="${id}"><img src="maps/${id}_s.jpg" alt=""><span class="word" style="display:block;margin:6px 0 0">${id===MAP?tr('여기 남기'):tr(n)}</span></button>`).join('')}${stage==='d2_after'?`<button data-p="home"><img src="maps/home_pm_s.jpg" alt=""><span class="word" style="display:block;margin:6px 0 0">${tr('집으로')}</span></button>`:''}</div>`;
 m.classList.add('on');c.querySelectorAll('.pick button').forEach(b=>b.onclick=()=>{m.classList.remove('on');busy=false;const p=b.dataset.p;if(p===MAP){if(stage==='d2_class')d2Goal();return}chime();if(p==='home'){fade(d2Home);return}goPlace(p)})}
let DAY=1,PICKS=[],D2CHOICE={};
// everything that depends on the day: scenes, who is where, tap spots, zooms, which drawn maps exist
function setDay(n){DAY=n;const N=NATIVE_BY[n]||{},Z=ZOOMS_BY[n]||{};for(const k in NATIVE)delete NATIVE[k];Object.assign(NATIVE,N);for(const k in ZOOMS)delete ZOOMS[k];Object.assign(ZOOMS,Z);
 D2PLACE=PLACE_BY[n]||PLACE_BY[2];for(const m of ['class','hall','field','cafe'])MAPS[m].img2=(MAP_DONE[n]||[]).includes(m)?`maps/${m}${n}.jpg`:undefined;
 MAPS.home_am.img2='maps/home_am2.jpg';MAPS.home_pm.img2='maps/home_pm2.jpg';ZOOMS.home_am=[[850,470,1060,560]];ZOOMS.home_pm=[[870,470,1040,545]]}
const MAP_DONE={2:['class','hall','field','cafe']};
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
// Pangpang from Day 2 on: no "first day at school?" lines
const PANG2={home_am:['오늘도 학교 잘 다녀와!','어제보다 더 씩씩해 보여!','친구 이름 하나 더 알아 와. 약속!','모르는 말이 나와도 괜찮아. 하나씩 배우면 돼.','머리 쓰다듬어 주면 하루 종일 힘이 나.','간식 냄새 난다… 아, 아니야. 기분 탓이야.']};
// ---- morning (per day) ----
const MORNING={
 2:{k:'handkerchief',open:[['nar','','이튿날 아침.'],['mom','smile','잘 잤어? 오늘은 바람이 차네.'],['mom','smile','{@handkerchief} 하나 챙겨 가.']],
  after:[['mom','laugh','그래, 그 {@handkerchief}! 주머니에 쏙.'],['me','smile','…응. 다녀올게.'],['mom','smile','오늘은 친구 누구랑 이야기했는지 저녁에 들려줘.']]},
 3:{k:'apron',open:[['nar','','셋째 날 아침.'],['mom','surprised','어머, 벌써 시간이…! 내 {@apron} 어디 뒀더라?'],['mom','smile','{@apron} 좀 찾아 줄래?']],
  after:[['mom','laugh','고마워! {@apron} 없으면 요리를 못 하거든.'],['me','smile','…응. 다녀올게.'],['mom','smile','오늘도 저녁에 이야기 들려줘.']]}};
function startDay(n){const m=document.getElementById('modal');m.classList.remove('on');setDay(n);PICKS=[];D2CHOICE={};TALKED.clear();TODAY.clear();dinnerDone=false;CHOICE=null;for(const k in pangSaid)delete pangSaid[k];
 const M=MORNING[n];stage='d2_home';bgm('day');fade(()=>{load('home_am');say(M.open,()=>
  find(M.k,()=>{TODAY.add(M.k);say(M.after,()=>{stage='d2_leave';setGoal('현관으로 나가 학교 가기','door')})},'「{x}」 찾기'))})}
function startDay2(){startDay(2)}
// home from Day 2 on: the same things always lie in the same places (drawn into maps/home_am2.jpg, home_pm2.jpg); each day asks for a different one
const HOME_NATIVE={home_am:[['handkerchief',770,550,28],['apron',1140,560,55],['apple',895,508,18],['bread',950,528,26],['cup',1005,508,20],['umbrella',180,400,40],['notebook',1115,700,24],['bag',1085,745,45]],
 home_pm:[['handkerchief',775,555,28],['apron',1075,425,40],['cup',918,495,18],['apple',957,508,16],['bread',985,522,24],['umbrella',180,400,40],['notebook',1130,640,24],['bag',1120,725,45]]};
function placeD2Item(){if(!(DAY>=2&&(MAP==='home_am'||MAP==='home_pm')))return;OBJ[MAP]=KITCHEN_OBJ.concat(HOME_NATIVE[MAP])}
// ---- school ----
function d2Class(){stage='d2_class';load('hall');say([['nar','',DAY>=3?'셋째 날. 학교에 왔다.':'둘째 날. 학교에 왔다.'],['think','smile','(오늘은 누구한테 말 걸어 볼까? 두 명쯤…)']],pickPlace)}
function d2Goal(){setGoal(PICKS.length?'점심시간! 한 친구를 더 만나 보기':'오늘 이야기할 친구 2명 고르기',D2IDS.filter(i=>DD()[i]),id=>PICKS.includes(id),` (${PICKS.length}/2)`)}
function d2Talk(id){const d=DD()[id];
 if(!['d2_class','d2_after'].includes(stage)||stage==='d2_after'||PICKS.includes(id)||!d||PICKS.length>=2){say([AGAIN[id]||['think','smile','(오늘은 여기까지. 내일 또 얘기해 보자.)']]);return}
 setGoal('');const finds=d.finds||[];let i=0;
 const nextFind=()=>{if(i>=finds.length){afterFinds();return}const f=finds[i++];if(TODAY.has(f.k)||FOUND.has(f.k)&&TODAY.has(f.k)){say(f.after||[],nextFind);return}
  say(f.before||[],()=>find(f.k,()=>{TODAY.add(f.k);say(f.after||[],nextFind)},f.goal||'「{x}」 찾기'))};
 const afterFinds=()=>{const ls=d.think?[['nar','',`💭 ${tr(NAME[id])}: ${tr(d.think)}`]]:[];scene('d'+DAY+'_'+id,ls,()=>ask('어떻게 할까?',d.choices,o=>{D2CHOICE[id]=o.k;sceneEl.classList.remove('on');say(o.r||[],()=>{Object.entries(o.pts||{}).forEach(([p,n])=>heart(p,n));PICKS.push(id);TALKED.add(id);
   setTimeout(()=>lessons(PICKS.length>=2?'pm':'am'),500)})}),true)};
 say(d.open||[],nextFind)}
// classes happen between the two friends (morning lessons → lunch) and after the second (afternoon → after school)
function lessons(part){setGoal('');busy=true;fade(()=>{if(MAP!=='class')load('class');
 const am=[['nar','','딩동댕— 1교시 시작 종이 울렸다.'],['nar','','선생님: 「자, 교과서 펴세요.」'],['think','smile','(아까 일이 자꾸 생각난다.)'],['nar','','2교시, 3교시, 4교시… 오전 수업이 지나갔다.'],['nar','','딩동댕— 점심시간!']];
 const pm=[['nar','','딩동댕— 5교시 시작 종이 울렸다.'],['nar','','오후 수업이 천천히 지나갔다.'],['nar','','딩동댕— 마지막 종이 울렸다. 방과 후!']];
 say(part==='am'?am:pm,()=>{if(part==='am')d2Goal();else{stage='d2_after';setGoal('방과 후! 나가는 길로 가서 집에 가기','out')}})})}
// ---- evening ----
function d2Home(){stage='home_pm';dinnerDone=false;load('home_pm');bgm('evening');say([['nar','','저녁. 부엌에서 맛있는 냄새가 난다.']],()=>find('mom',dinner2,'「{x}」에게 다녀왔다고 인사하기'))}
// spaced review at dinner: a word learned two days ago comes back (Mom asks to see it, you find it in the kitchen)
const REVIEW={3:{k:'notebook',ask:[['mom','smile','참, 첫날 산 그 {w}, 요즘도 써?'],['mom','laugh','엄마한테 보여 줄래?']],goal:'「{x}」 보여 주기',after:[['mom','laugh','어머, 글씨 예쁘다! 매일 쓰고 있었구나.']]}};
function dinner2(){let ls=[['mom','laugh','왔구나! 손 씻고 와. 밥 먹자.'],['mom','smile','오늘은 누구랑 이야기했어?']];
 PICKS.forEach((id,n)=>{const d=DD()[id];if(n===1)ls.push(['me','smile','그리고…']);ls=ls.concat(d.tell||[]).concat((d.mom&&d.mom[D2CHOICE[id]])||[])});
 const D=()=>'dinner'+(HERO==='hero_m'?'_m':'');
 const end=()=>scene(D(),[['mom','relieved',DAY>=3?'친구 이야기가 점점 많아지네. 엄마도 듣는 게 즐거워.':'하루 만에 친구가 둘이나 생겼네. 엄마는 그게 제일 좋다.'],['mom','smile','오늘 일도 {w}에 적어 두렴. 내일은 또 누구를 만날까?']],()=>{dinnerDone=true;night2()});
 const rv=REVIEW[DAY];
 scene(D(),ls.concat(rv?rv.ask:[]),()=>{if(!rv){end();return}find(rv.k,()=>say(rv.after,end),rv.goal)})}
function night2(){setGoal('');bgm('night');scene('night'+(HERO==='hero_m'?'_m':''),[['nar','','밤. {w}를 펼쳤다.'],['think','relieved','(오늘은 두 친구랑 조금 가까워졌어.)'],['think','smile',DAY>=3?'(어제보다 말이 조금 더 나왔어.)':'(다들 겉으로 보이는 것과 속마음이 달랐어.)'],['think','surprised','(반장이 되려면… 한 명 한 명을 더 알아야 해.)']],end2)}
const DAYHEART={};
function end2(){const n=DAY,next=n+1,hasNext=next===3&&Object.keys(window.D3||{}).length>0;DAY=hasNext?next:n;saveDay();DAY=n;
 const m=document.getElementById('modal'),c=document.getElementById('mcard');const hs=Object.entries(HEART).map(([i,nn])=>`${nm(i)} ♥${nn}`).join(' · ')||tr('아직 없음');
 const ws=[...TODAY].filter(k=>cardOf(k));
 c.innerHTML=`<h2>${tr(n+'일차 끝!')}</h2><p>${tr('오늘 배운 낱말')}</p><div class="pick">${ws.map(k=>`<button onclick="speak('${k}')"><img src="${cardOf(k)}" alt=""><span class="word" style="display:block;margin:6px 0 0">${wordOf(k)} 🔊</span></button>`).join('')}</div><p>${tr('친해진 친구')}: ${hs}</p>${hasNext?`<button class="big" id="gonext">${tr(next+'일차 시작')}</button> `:`<p style="color:#8a7a6a">${tr(next+'일차는 준비 중이에요.')}</p>`}<button class="big" id="re2">${tr(n+'일차 다시 하기')}</button> <button class="big" id="re">${tr('처음부터 다시')}</button>`;
 m.classList.add('on');document.getElementById('re').onclick=()=>{try{localStorage.removeItem('haru_save')}catch(e){}location.href=location.pathname};
 document.getElementById('re2').onclick=()=>{for(const k in HEART)delete HEART[k];Object.assign(HEART,DAYHEART[n]||HEART_D1||{});startDay(n)};
 if(hasNext){DAYHEART[next]={...HEART};document.getElementById('gonext').onclick=()=>startDay(next)}}
let HEART_D1=null;
d2Merge();
// ---- zoom: tap near a cluster of small things → that part of the picture opens big; tap things there to hear them / "This is …" ----
function zoomAt(x,y){if(DAY<2)return null;return(ZOOMS[MAP]||[]).find(z=>x>=z[0]&&x<=z[2]&&y>=z[1]&&y<=z[3])}
function showZoomMarks(){world.querySelectorAll('.zmark').forEach(e=>e.remove());if(DAY<2)return;for(const z of ZOOMS[MAP]||[]){const d=document.createElement('div');d.className='item zmark';d.textContent='🔍';d.style.cssText=`position:absolute;left:${z[2]-6}px;top:${z[1]+6}px;transform:translate(-100%,0);font-size:30px;z-index:4400;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(0,0,0,.35));opacity:.9`;world.appendChild(d)}}
function openZoom(z0){const m=document.getElementById('modal'),c=document.getElementById('mcard');busy=true;closeBubble();
 // what is shown: the tapped area, made less flat (about 4:3) and narrower so things come out big
 let z=z0.slice();{const cx=(z[0]+z[2])/2,cy=(z[1]+z[3])/2;let w=Math.min(z[2]-z[0],340),h=Math.max(z[3]-z[1],w*.75);z=[cx-w/2,cy-h/2,cx+w/2,cy+h/2];if(z[0]<0){z[2]-=z[0];z[0]=0}if(z[2]>MW){z[0]-=z[2]-MW;z[2]=MW}if(z[1]<0){z[3]-=z[1];z[1]=0}if(z[3]>MH){z[1]-=z[3]-MH;z[3]=MH}}
 const zw=z[2]-z[0],zh=z[3]-z[1];
 c.innerHTML=`<div class="zoomv" style="position:relative;width:100%;margin:0 auto;border-radius:16px;overflow:hidden;background-repeat:no-repeat"></div><button class="big" id="zclose">✕</button>`;
 m.classList.add('on');const v=c.querySelector('.zoomv');
 // fit the close-up inside the card (never wider than the card)
 const W2=Math.min(v.clientWidth||c.clientWidth-40,560),k=W2/zw,H2=zh*k;v.style.width=W2+'px';v.style.height=H2+'px';v.style.backgroundImage=`url(${mapimg.getAttribute('src')})`;v.style.backgroundSize=`${MW*k}px ${MH*k}px`;v.style.backgroundPosition=`${-z[0]*k}px ${-z[1]*k}px`;
 const objs=(OBJ[MAP]||[]).filter(o=>o[1]>=z[0]&&o[1]<=z[2]&&o[2]>=z[1]&&o[2]<=z[3]&&o[3]<80);
 // the things drawn as separate pictures are shown inside the zoom too
 world.querySelectorAll('.thing').forEach(t=>{const x=parseFloat(t.style.left),y=parseFloat(t.style.top),w=parseFloat(t.style.width);if(x<z[0]||x>z[2]||y<z[1]||y>z[3]+40)return;const i=document.createElement('img');i.src=t.src;i.style.cssText=`position:absolute;width:${w*k}px;left:${(x-z[0])*k}px;top:${(y-z[1])*k}px;transform:translate(-50%,-100%);pointer-events:none`;v.appendChild(i)});
 let zb=null;
 v.onclick=ev=>{const r=v.getBoundingClientRect(),mx=z[0]+(ev.clientX-r.left)/k,my=z[1]+(ev.clientY-r.top)/k;let best=null,bd=1e9;for(const o of objs){const d=Math.hypot(mx-o[1],my-o[2]);if(d<Math.max(o[3],34)&&d<bd){bd=d;best=o}}
  if(!best)return;speak(best[0]);if(zb)zb.remove();if(!FIND)return;zb=document.createElement('button');zb.className='bubble';zb.style.cssText=`position:absolute;left:${(best[1]-z[0])*k}px;top:${Math.min(H2-60,(best[2]-z[1])*k+10)}px;transform:translate(-50%,0);font-size:20px`;zb.textContent=tr('이건 {x}이다').replace('{x}',wordOf(FIND));
  const kk=best[0],born=performance.now();zb.onclick=e2=>{e2.stopPropagation();if(performance.now()-born<300)return;if(kk===FIND){m.classList.remove('on');busy=false;chime();FOUND.add(kk);tagAll();const d=FIND_DONE;FIND=null;FIND_DONE=null;const g=document.getElementById('goal');g.onclick=null;g.textContent='';goal=null;showBag();d&&d()}else{buzz();zb.remove();zb=null;setTimeout(()=>speak(kk),350);setTimeout(()=>speak(FIND),1300)}};v.appendChild(zb)};
 document.getElementById('zclose').onclick=()=>{m.classList.remove('on');busy=false}}

DAY=1;// Day 1 keeps no Day 2 tables (zooms, drawn maps); startDay() sets them
