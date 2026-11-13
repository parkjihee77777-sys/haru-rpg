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
const HOME_NAME={ko:'우리 나라 말',en:'English',id:'bahasa Indonesia',vi:'tiếng Việt',zh:'中文',ja:'日本語',ru:'русский'};
{const _tr=tr;tr=function(s){const t=_tr(s);return t==null?t:t.replace(/\{H\}/g,HOME_NAME[UI]||HOME_NAME.ko)}}
// where friends stand: a friend with a scene today stands where that scene happens
const _d2People=d2People;
d2People=function(id){const eps=D2IDS.map(f=>[f,epNext(f,EPIDX[f])]).filter(x=>x[1]);const moved=new Set();
 for(const[f,e]of eps){moved.add(f);(e.with||[]).forEach(w=>moved.add(w[0]))}
 const gone=(window.GONE&&GONE.day===DAY)?GONE.ids.filter(f=>PICKS.includes(f)):[];// a kid who left school today (Junho to the nurse and home) is not drawn back on the maps
 const ps=_d2People(id).filter(p=>!moved.has(p[0])&&!gone.includes(p[0]));
 // each kid stands in one spot only: a friend's own scene first, then the kids other scenes here bring along (several scenes may list the same kid)
 const here=new Set();for(const[f,e]of eps)if(e.place===id&&!here.has(f)&&!gone.includes(f)){here.add(f);ps.push(e.at[2]==='stand'?[f,e.at[0],e.at[1],null,'stand']:[f,e.at[0],e.at[1]])}
 // a kid whose own story today happens somewhere else (and isn't done yet) stands only there, where it will happen;
 // another friend's scene here that brings them along adds them when that scene starts (d2Talk)
 const ownElsewhere=w=>{const e2=epNext(w,EPIDX[w]);return e2&&e2.place&&e2.place!==id&&!PICKS.includes(w)};
 for(const[f,e]of eps)if(e.place===id)(e.with||[]).forEach(w=>{if(!here.has(w[0])&&!ownElsewhere(w[0])){here.add(w[0]);ps.push(w)}})
 // a scene that walks on ({go}) takes its friend (and who is with them) along: they stand next to the hero where the hero comes in (spots.js keeps them off things)
 if(GOWITH&&GOWITH.map===id){const st=(MAPS[id]&&MAPS[id].start)||[600,500];GOWITH.ids.forEach((f,i)=>{const at=ps.findIndex(p=>p[0]===f);if(at>=0)ps.splice(at,1);ps.push([f,st[0]+(i%2?-1:1)*110*(1+(i>>1)),st[1]])})}
 return ps.filter(p=>AWAY.get(p[0])!==id)};
// today's scenes add their things to the maps (drawn spots to tap, pictures laid on top)
const _setDay=setDay;
// days without their own drawn maps keep Day 2's (the same things lie in the same places)
setDay=function(n){_setDay(NATIVE_BY[n]?n:2);DAY=n;for(const k in THINGS)delete THINGS[k];
 D2PLACE={...D2PLACE};PLACES.length=0;PLACES.push(...BASE_PLACES);for(const id of extraPlacesToday()){D2PLACE[id]=[];PLACES.push([id,EXTRA_MAPS[id].name])}for(const id of goPlacesToday())if(!D2PLACE[id])D2PLACE[id]=[];
 for(const f of D2IDS){const e=epNext(f,EPIDX[f]);if(!e)continue;
  for(const[m,ts]of Object.entries(e.taps||{}))NATIVE[m]=(NATIVE[m]||[]).concat(ts);
  for(const[m,ts0]of Object.entries(e.things||{})){const ts=ts0.map(t=>t[0]==='clock'&&/^class/.test(m)&&t[1]===1040&&t[2]===186?['clock',1431,74,32,t[4],'stay']:t);// the classroom clock hangs high on the strip of wall between the notice board and the door — not at knee height (owner 11/07), not on the blackboard (owner 11/08)
 THINGS[m]=(THINGS[m]||[]).concat(ts.filter(t=>!(THINGS[m]||[]).some(o=>o[0]===t[0]&&Math.hypot(o[1]-t[1],o[2]-t[2])<120)))}}};// two friends on one day may both put the same wall clock etc.: keep one (owner 11/07: two clocks)
// a thing laid on the map may use its own picture ([k,x,y,w,picture]): a crumpled test paper is still {paper}
showThings=function(id){world.querySelectorAll('.thing').forEach(e=>e.remove());const things=placeThings(id);
 for(const[k,x,y,w,img,pin]of things){const it=document.createElement('img');it.className='item thing';if(pin==='stay')it.dataset.moved='0,0';it.src=`items/${img||k}.png`;
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
// a place a scene walks on to ({go:'gatesun'}) is set up too (not offered to walk to), or the friend who comes along is not drawn there
function goPlacesToday(){const ids=new Set();for(const f of D2IDS){const e=epNext(f,EPIDX[f]);if(e)for(const m of JSON.stringify(e).matchAll(/"go":"(\w+)"/g))if(EXTRA_MAPS[m[1]])ids.add(m[1])}return[...ids]}
// a morning for every day: Day 2 and 3 have their own; later days Mom asks for one of the things that always lie in the kitchen
// Mom's morning errand, a different thing every day (owner 11/07: 「겹치지 않게」; Day 2 handkerchief, Day 3 apron in engine.js MORNING).
// 11/08 owner: Day 11 Mom asked for the notebook ({w}) while the mission was the banana → Mom always names today's thing; Day 13 was the notebook again (Day 3 dinner already) → spoon.
// 11/08 owner: Day 15 tissue = the tissue box drawn on the table (HOME_NATIVE), not a small laid bag. Day 16: the bag is drawn in the map too —
// no second copy laid on top: every thing already drawn (HOME_NATIVE: apple, bread, cup, umbrella, notebook, bag) is found where it is drawn.
// Day 9 is the rainy day at the gate (Minho, Hangyeol, Seah) → umbrella. Things not drawn on the home map are laid where they would be.
const MORNING_BY={4:'apple',5:'bread',6:'cup',7:'water_bottle',8:'pcase',9:'umbrella',10:'sock',11:'banana',12:'milk',13:'spoon',14:'shoes',15:'tissue',16:'bag'};
const MORNING_LAY={};// (11/11 owner) all drawn into maps/home_am2.jpg (HOME_NATIVE): nothing laid on top
const MORNING_EXTRA={};// (11/11 owner) day 13 things lay on the drawn apple, bread, milk and cup: spoon and bowl go to the empty front-right of the table, no second cup (one is drawn)// (owner 11/08) the spoon is not alone on the table: breakfast things around it
const MORNING_KEYS=Object.values(MORNING_BY);const MORNING_SAID=new Set(['apple','bread','cup','umbrella','bag','handkerchief','apron']);
function morningOf(n){if(MORNING[n])return MORNING[n];const k=MORNING_BY[n]||MORNING_KEYS[(n-4)%MORNING_KEYS.length];
 return{k,lay:MORNING_LAY[k]?[[k,...MORNING_LAY[k],null,'stay']].concat((MORNING_EXTRA[n]||[]).map(t=>[...t,null,'stay'])):null,open:[['nar','','아침.'],['mom','smile',`{@${k}} 좀 찾아 줄래?`]],after:[['mom','laugh','고마워!'],['me','smile','…응. 다녀올게.'],['mom','smile','오늘도 저녁에 이야기 들려줘.']]}}
startDay=function(n){const m=document.getElementById('modal');m.classList.remove('on');
 if(DAYMEET[n]){MEET={...DAYMEET[n].meet};FLAGS={...DAYMEET[n].flags}}else DAYMEET[n]={meet:{...MEET},flags:{...FLAGS}};
 for(const k in EPIDX)delete EPIDX[k];for(const k in TODAYEP)delete TODAYEP[k];for(const f of D2IDS)if(window.EP&&EP[f])EPIDX[f]=MEET[f]||0;
 setDay(n);PICKS=[];D2CHOICE={};TALKED.clear();TODAY.clear();dinnerDone=false;CHOICE=null;for(const k in pangSaid)delete pangSaid[k];
 const M=morningOf(n);stage='d2_home';bgm('day');fade(()=>{load('home_am');say(M.open.slice(0,1),()=>find('mom',()=>{TODAY.add('mom');say(M.open.slice(1),()=>
  (M.lay?layThings(M.lay):0,find(M.k,()=>{TODAY.add(M.k);say(M.after,()=>{stage='d2_leave';setGoal('현관으로 나가 학교 가기','door')})},'「{x}」 찾기')))},'「{x}」에게 인사하기'))})};
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
 n.x=st[0];n.y=st[1];n.path=p;n.dest=[tx,ty];const go=performance.now()+(k||0)*550;let last=go;n.el.style.visibility='hidden';
 const step=now=>{if(!npcs.includes(n)){return}if(now<go||!n.w){requestAnimationFrame(step);return}n.el.style.visibility='';const dt=Math.min(.05,(now-last)/1000);last=now;
  if(!p.length){n.path=null;n.x=tx;n.y=ty;n.frame=0;n.dir='down';draw(n);return}
  const[px,py]=p[0],ex=px-n.x,ey=py-n.y,d=Math.hypot(ex,ey);if(d<6){p.shift()}else{const k=Math.min(d,260*dt)/d;n.x+=ex*k;n.y+=ey*k;
   n.dir=Math.abs(ex)>Math.abs(ey)?(ex<0?'left':'right'):(ey<0?'up':'down');n.t=(n.t||0)+dt;n.frame=[1,0,2,0][Math.floor(n.t*8)%4]}draw(n);requestAnimationFrame(step)};
 draw(n);requestAnimationFrame(step);return n}
function moveKid(m){const[id,x,y,how]=m;const n=npcs.find(k=>k.id===id);
 if(how==='out'){AWAY.set(id,MAP);if(!n)return;const st=OUT[MAP]||(MAPS[MAP]&&MAPS[MAP].start);npcs.splice(npcs.indexOf(n),1);n.el.remove();const w=comeOver([id,st[0],st[1]],0,[n.x,n.y]);npcs.push(w);
  const t=setInterval(()=>{if(!w.path){clearInterval(t);const i=npcs.indexOf(w);if(i>=0)npcs.splice(i,1);w.el.remove()}},200);return}
 AWAY.delete(id);const at=n?[n.x,n.y]:null;if(n){npcs.splice(npcs.indexOf(n),1);n.el.remove()}npcs.push(comeOver([id,x,y],0,at))}
const AWAY=new Map();// kid → the map they walked out of in this scene ({move:[…,'out']}): not back on that map until the scene ends (tidyPeople); other maps are fine
// after a scene: a kid who came along but whose own story today is somewhere else goes back there (leaves this map), so tapping them
// here can't start their story in the wrong place
function tidyPeople(){AWAY.clear();const elsewhere=id=>{const e=D2IDS.includes(id)&&!PICKS.includes(id)&&epNext(id,EPIDX[id]);return!!(e&&e.place&&e.place!==MAP&&!(e.also&&e.also[MAP]))};
 npcs=npcs.filter(n=>{if(elsewhere(n.id)){n.el&&n.el.remove();return false}return true});
 // a scene that sent kids off this map (Junho 7: the others go out to the field) is over: whoever belongs here walks back in from the door
 let k=0;for(const w of d2People(MAP))if(!elsewhere(w[0])&&!npcs.some(n=>n.id===w[0]))npcs.push(comeOver(w,k++))}
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
// a thing a scene lays next to where it put a kid (its at / with spot, or the desk that spot would sit at) moves along when the kid ended up elsewhere
// (another kid took that seat, or spots.js moved them off a thing): Haeun's bread lay on someone else's desk. Things already next to the kid stay.
// where a kid is, or is walking to (a kid coming in from the door lays things where they will stand)
function kidSpot(n){return n.path&&n.dest?n.dest:[n.x,n.y]}
function followKids(lay){const e=SCENE_EP;if(!e||!lay.length)return lay;const S=(window.SEATS_ALL||{})[MAP];
 const want=[];if(e.place===MAP&&e.at)want.push([SCENE_IDS&&SCENE_IDS[0],e.at[0],e.at[1]]);for(const w of e.with||[])want.push([w[0],w[1],w[2]]);
 const anchors=[];for(const[id,x,y]of want){const n=npcs.find(p=>p.id===id);if(!n)continue;let ex=x,ey=y,[ax,ay]=kidSpot(n);
  if(n.seat&&S){let best=null,bd=1e9;for(const[top,xs]of S)for(const sx of xs){const d=Math.hypot(sx-x,top+150-y);if(d<bd){bd=d;best=[sx,top+4]}}if(best){ex=best[0];ey=best[1]}}
  if(Math.hypot(ax-ex,ay-ey)>30)anchors.push({ex,ey,ax,ay})}
 if(!anchors.length)return lay;
 return lay.map(t=>{if(typeof t[1]!=='number'||t[5]==='stay')return t;// 'stay' = left behind where its kid sat (Haneul's water bottle)
 let a=null,bd=220;for(const q of anchors){const d=Math.hypot(t[1]-q.ex,t[2]-q.ey);if(d<bd){bd=d;a=q}}
  if(!a||Math.hypot(t[1]-a.ax,t[2]-a.ay)<bd)return t;const c=t.slice();c[1]=Math.round(t[1]+a.ax-a.ex);c[2]=Math.round(t[2]+a.ay-a.ey);return c})}
// a thing can lie next to a kid wherever spots.js put them: [k,'@id',dx,dy,w,picture] (Yena's file also turns picture '-' into a tap spot only)
function layThings(lay,clear){lay=(lay||[]).map(t=>{if(typeof t[1]!=='string'||t[1][0]!=='@')return t;const n=npcs.find(p=>p.id===t[1].slice(1));const[k,,dx,dy,w,img]=t;const[nx,ny]=n?kidSpot(n):[800,700];return[k,Math.round(nx+(dx||0)),Math.round(ny+(dy||0)),w,img]});lay=followKids(lay);for(const k of clear||[]){world.querySelectorAll('.laid').forEach(e=>{if(e.dataset.k===k)e.remove()});OBJ[MAP]=(OBJ[MAP]||[]).filter(o=>!(o.laid&&o[0]===k))}
 for(const[k,x,y,w,img,pin]of lay||[]){const it=document.createElement('img');it.className='item thing laid';if(pin==='stay')it.dataset.moved='0,0';it.dataset.k=k;it.src=`items/${img||k}.png`;
  it.style.cssText=`position:absolute;width:${w||56}px;left:${x}px;top:${y}px;transform:translate(-50%,-100%);z-index:${Math.round(y)+1};pointer-events:none;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))`;world.appendChild(it);
  const o=[k,x,y-(w||56)*.4,Math.max(30,(w||56)*.55)];o.laid=1;(OBJ[MAP]=OBJ[MAP]||[]).push(o)}
 tagAll()}
// the four choices of a meeting are shown in a mixed order (11/03): the 0-point one and the +1 one move to a different place each meeting,
// so over a friend's 15 meetings every place A~D holds each kind about equally often (the keys A~D, flags and branches stay as they are)
function choiceOrder(id,i,cs){if(!cs||cs.length!==4)return cs;const sc=c=>Object.values(c.pts||{}).reduce((a,b)=>a+b,0);
 const zero=cs.filter(c=>sc(c)<=0),one=cs.filter(c=>sc(c)===1),two=cs.filter(c=>sc(c)>=2);if(zero.length!==1||one.length!==1||two.length!==2)return cs;
 let h=0;for(const ch of id)h=(h*31+ch.charCodeAt(0))>>>0;const zp=(i+h)%4,op=(zp+1+(i+(h>>>3))%3)%4;
 const out=[];out[zp]=zero[0];out[op]=one[0];let t=0;for(let p=0;p<4;p++)if(!out[p])out[p]=two[t++];return out}
function runSteps(steps,choice,done){const q=(steps||[]).slice();
 const next=()=>{const lines=[];
  while(q.length){const s=q[0];if(Array.isArray(s)||typeof s==='function'){lines.push(q.shift());continue}
   if(s.only||s.flag){q.shift();const ok=s.only?s.only.includes(choice):(+!!FLAGS[s.flag])===s.is;if(ok)q.unshift(...s.lines);continue}
   if('pic' in s){q.shift();const pic=s.pic;lines.push(()=>showPic(pic));continue}
   if(s.lay||s.clear){q.shift();lines.push(()=>layThings(s.lay,s.clear));continue}
   // {map:'name',tap:[[k,x,y,r]…]} from that line on the map shows maps/name.jpg instead (a version with someone drawn in) and those spots can be tapped; leaving the map undoes both
   if(s.map){q.shift();const m=s.map,t=s.tap;lines.push(()=>{mapimg.src=`maps/${m}.jpg`;for(const o of t||[]){const a=o.slice();a.laid=1;(OBJ[MAP]=OBJ[MAP]||[]).push(a)}tagAll()});continue}
   // {move:[id,x,y]} a kid walks to that spot from that line on (comes in from the door if not on this map); {move:[id,x,y,'out']} walks out and leaves
   if(s.move){q.shift();const m=s.move;lines.push(()=>moveKid(m));continue}
   // {me:[x,y]} I walk there from that line on, even while the lines go on (to my own seat when the scene says I am at it)
   if(s.me){q.shift();const m=s.me;lines.push(()=>{let mx=m[0],my=m[1];
    // the scene's friend may stand elsewhere than the script's at (spots.js moved Hyeeun off a desk): I walk to the same side of where they really are
    {const e=SCENE_EP,f=SCENE_IDS&&npcs.find(p=>p.id===SCENE_IDS[0]);if(e&&e.at&&e.place===MAP&&f){const[fx,fy]=kidSpot(f);if(Math.hypot(fx-e.at[0],fy-e.at[1])>40){mx+=fx-e.at[0]+(m[0]<e.at[0]?-45:45);my+=fy-e.at[1];if(typeof footOk==='function'&&!footOk(MAP,mx,my)){const c=typeof freeSpot==='function'&&freeSpot(MAP,mx,my,[]);if(c){mx=c[0];my=c[1]}}}}}
    me.auto=true;walkTo(mx,my,()=>{me.auto=false})});continue}break}
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
 setGoal('');for(const m of JSON.stringify(e).matchAll(/"(?:pic|scene)":"(\w+)"/g))picProbe(heroPic(m[1]));const hs=heroPic(e.scene),pic=!!e.scene&&PICOK[hs]!==false;SCENE_IDS=[id].concat((e.with||[]).map(w=>w[0]));SCENE_EP=e;GOWITH=null;if(typeof bagRefresh==='function')bagRefresh();
 runSteps(e.pre,null,()=>{const choose=()=>ask(e.ask||'어떻게 할까?',choiceOrder(id,EPIDX[id]||0,e.choices),o=>{D2CHOICE[id]=o.k;sceneEl.classList.remove('on');
  for(const[f,v]of Object.entries(e.flag||{}))FLAGS[f]=!!v[o.k];
  if(e.vote)FLAGS[id+'_vote']=1;else MEET[id]=(MEET[id]||0)+1;TODAYEP[id]=e;
  const r=o.r||[],thenPost=()=>runSteps(e.post,o.k,()=>{Object.entries(o.pts||{}).forEach(([p,n])=>heart(p,n));PICKS.push(id);TALKED.add(id);tidyPeople();SCENE_IDS=null;SCENE_EP=null;GOWITH=null;if(typeof bagRefresh==='function')bagRefresh();
   setTimeout(()=>lessons(PICKS.length>=needToday()?'pm':'am'),500)});
  // a reaction with showPic functions in it (Siwoo) still plays as plain lines; one with {pic}/{lay}/{only} steps plays through runSteps
  if(r.some(x=>typeof x==='function'))say(r,thenPost);else runSteps(r,o.k,thenPost)});
  if(pic&&PICOK[hs]!==false){scene(hs,[],choose,true);picProbe(hs)}else{showPic(null);choose()}})};
// ---- lessons: the class at their desks listening to the teacher (a picture over the classroom; the same lines as before) ----
const LESSON_PICS=['lesson_1','lesson_2','lesson_3'];// morning pictures (scenes/<name>.jpg), the last one is the afternoon; none = lines on the classroom map
lessons=function(part){setGoal('');busy=true;fade(()=>{if(MAP!=='class')load('class');
 const am=[['nar','','딩동댕— 수업 시작 종이 울렸다.'],['nar','','선생님: 「자, 교과서 펴세요.」'],['think','smile','(아까 일이 자꾸 생각난다.)'],['nar','','오전 수업이 하나씩 지나갔다.'],['nar','','딩동댕— 점심시간!']];
 const pm=[['nar','','딩동댕— 수업 시작 종이 울렸다.'],['nar','','오후 수업이 천천히 지나갔다.'],['nar','','딩동댕— 마지막 종이 울렸다. 방과 후!']];
 const n=LESSON_PICS.length,pic=!n?null:part==='am'?LESSON_PICS[DAY%Math.max(1,n-1)]:LESSON_PICS[n-1];
 (pic?(ls,cb)=>scene(pic,ls,cb):say)(part==='am'?am:pm,()=>{if(part==='am')d2Goal();else{stage='d2_after';setGoal('방과 후! 나가는 길로 가서 집에 가기','out')}})})};
// ---- evening: Mom asks, each friend's part follows ----
function evePart(id){const e=TODAYEP[id],c=D2CHOICE[id];
 if(e){const v=e.eve||{};let ls=(v.lead||[]).concat(v[c]||[]);if(v.commonIf&&v.commonIf.only.includes(c))ls=ls.concat(v.commonIf.lines);return ls.concat(v.common||[])}
 const d=DD()[id]||{};return(d.tell||[]).concat((d.mom&&d.mom[c])||[])}
dinner2=function(){let ls=[['mom','laugh','왔구나! 손 씻고 와. 밥 먹자.'],['mom','smile','오늘 학교 어땠어?']];
 // on Dad's days each friend's dinner opens with Dad coming home: the second friend's opening line would say it again, so it is dropped
 PICKS.forEach((id,n)=>{if(n===1)ls.push(['mom','smile','또 누구 만났어?']);let p=evePart(id);if(n===1){const i=p.findIndex((l,j)=>j<2&&Array.isArray(l)&&((l[0]==='nar'||l[0]==='me')&&/\{d/.test(l[2]||'')&&/왔|다녀|일찍|놓였/.test(l[2]||'')||l[0]==='dad'&&/다녀왔|일찍/.test(l[2]||'')));if(i>=0)p=p.filter((l,j)=>j!==i)}ls=ls.concat(p)});
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
 c.innerHTML=`<h2>${D('{n}일차 끝!',n)}</h2><p>${tr('오늘 배운 낱말')}</p><div class="pick dayend">${ws.map(k=>`<button onclick="speak('${k}')"><img src="${cardOf(k)}" alt=""><span class="word" style="display:block;margin:6px 0 0">${wordOf(k)} 🔊</span></button>`).join('')}</div>${hasNext?`<button class="big" id="gonext">${D('{n}일차 시작',next)}</button> `:`<p style="color:#8a7a6a">${D('{n}일차는 준비 중이에요.',next)}</p>`}<button class="big" id="re2">${D('{n}일차 다시 하기',n)}</button> <button class="big" id="re">${tr('처음부터 다시')}</button>`;
 m.classList.add('on');document.getElementById('re').onclick=()=>{try{localStorage.removeItem('haru_save')}catch(e){}location.href=location.pathname};
 document.getElementById('re2').onclick=()=>{for(const k in HEART)delete HEART[k];Object.assign(HEART,DAYHEART[n]||HEART_D1||{});startDay(n)};
 if(hasNext){DAYHEART[next]={...HEART};delete DAYMEET[next];document.getElementById('gonext').onclick=()=>startDay(next)}};
// a scene that walks on to another place ({go}) brings its friend along; ep.goAlone = {map:[choices]} when the hero goes there alone
{const _load=load;load=function(m,x){if(SCENE_IDS){const al=SCENE_EP&&SCENE_EP.goAlone&&SCENE_EP.goAlone[m];GOWITH=al&&al.includes(D2CHOICE[SCENE_IDS[0]])?null:{map:m,ids:SCENE_IDS}}return _load(m,x)}}
// ep.empty = {map:1} the class went out: that map shows only this scene's kids (no one at the desks) until the scene ends; {map:[ids]} only those kids (Yena 12: Jiho stays behind)
{const keep=m=>{const e=SCENE_EP,v=SCENE_IDS&&!PICKS.includes(SCENE_IDS[0])&&e&&e.empty&&e.empty[m];return v?(Array.isArray(v)?v:SCENE_IDS):null};
 const _dp=d2People;d2People=function(id){const k=keep(id);return k?_dp(id).filter(p=>k.includes(p[0])):_dp(id)};
 const _dt=d2Talk;d2Talk=function(id){const r=_dt(id),k=keep(MAP);if(k)for(const n of npcs.slice())if(!k.includes(n.id)){npcs.splice(npcs.indexOf(n),1);n.el.style.transition='opacity .5s';n.el.style.opacity=0;setTimeout(()=>n.el.remove(),550)}return r}}
// no leaving through the way out while a friend's find is running (the find's thing is on this map; leaving lost the scene and the day got stuck)
{const _pickPlace=pickPlace;pickPlace=function(){if(FIND&&['d2_class','d2_after'].includes(stage)){say([['think','surprised','(먼저 이 미션부터 끝내자.)']]);return}return _pickPlace()};
 const L={en:'(Let me finish this mission first.)',id:'(Aku selesaikan misi ini dulu.)',vi:'(Làm xong nhiệm vụ này trước đã.)',zh:'（先把这个任务做完吧。）',ja:'（まずこのミッションを終わらせよう。）',ru:'(Сначала закончу это задание.)'};
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
// words some scenes teach that no friend's file listed (Haeun's coin, Hyeeun's basket, Yuna's flowerpot and watering can): without them the line showed the key 「coin」
{const W={coin:{ko:'동전',en:'coin',id:'koin',vi:'đồng xu',zh:'硬币'},basket:{ko:'바구니',en:'basket',id:'keranjang',vi:'cái rổ',zh:'篮子'},
 flowerpot:{ko:'화분',en:'flowerpot',id:'pot bunga',vi:'chậu hoa',zh:'花盆'},watering_can:{ko:'물뿌리개',en:'watering can',id:'penyiram',vi:'bình tưới',zh:'喷壶'}};
 for(const[k,w]of Object.entries(W))if(!D2WORDS[k])D2WORDS[k]=w;d2Merge()}
// when a find starts, the 🔊 marks are laid again: the thing looked for keeps its own mark even under a smaller thing on it (soundMarks)
{const _findSm=find;find=function(...a){const r=_findSm(...a);if(typeof soundMarks==='function')soundMarks();return r}}
// the hero's dad (11/03): {d} in a line, 'dad' as a speaker at dinner (Day 4, 8, 12, 16R)
{const W={dad:{ko:'아빠',en:'dad',id:'ayah',vi:'bố',zh:'爸爸'}};for(const[k,w]of Object.entries(W))if(!D2WORDS[k])D2WORDS[k]=w;d2Merge();
 if(LANGS.ja)LANGS.ja.words.dad='パパ';if(LANGS.ru)LANGS.ru.words.dad='папа'}
// Dad is in the dinner picture (scenes/<dinner picture>_dad.jpg) on the evenings he is at the table: when tonight's lines have him speak.
// (11/12 owner: it went by the date (Day 4, 8, 12, 16), but Dad's evenings belong to each friend's 3rd, 7th, 11th and 15th story, whatever day that story is met — he spoke with no Dad in the picture.)
const dadTonight=lines=>(lines||[]).some(l=>Array.isArray(l)&&l[0]==='dad')||(typeof PICKS!=='undefined'?PICKS:[]).some(id=>TODAYEP[id]&&JSON.stringify(TODAYEP[id].eve||{}).includes('["dad"'));
{const _sceneDad=scene;scene=function(img,lines,done,keep){if((img==='dinner'||img==='dinner_m')&&dadTonight(lines)){const c=UI==='ko'?LANG:UI;
  img=(DINNER_HOME.includes(c)?'dinner_'+c+(HERO==='hero_m'?'_m':'_f'):(HERO==='hero_m'?'dinner_m':'dinner'))+'_dad'}return _sceneDad(img,lines,done,keep)}}
// (11/13 owner) 「몇 교시」를 대사에서 지운 뒤로는 이야기마다 하루 중 때를 표(EP_TIME)로 읽는다. 같은 날 두 이야기가 시간이 거꾸로 가거나 겹치지 않게:
// 칸 1 등교 직후 · 2 오전 · 3 급식 · 4 점심 놀이 · 5 오후 · 6 종례·방과 후 · 7 하교 길. 표 한 줄 = [가장 이른 칸, 가장 늦은 칸, 지나는 칸 수, 사실].
// - 하루의 시계는 앞으로만 간다: 다음 이야기는 앞 이야기가 끝난 칸 이후에서 시작(같은 칸은 괜찮다).
// - 등교·급식·종례·하교 칸은 하루에 한 이야기만(두 번 등교하거나 밥을 두 번 먹지 않게).
// - 같은 날 부딪치는 사실(비 오는 날↔맑은 날, 요일, 체육이 없는 날↔체육 이야기, 담임 출장↔담임이 있는 이야기)은 함께 나오지 않는다.
// - 첫 친구를 고를 때 그 뒤에 만날 수 있는 친구가 남아 있어야 한다(혼자 끝나는 날이 없게).
// - 아무도 맞지 않으면 막지 않는다(그날이 멈추지 않게). 시험 모드는 규칙 없음. 선거 날(ED_DAY)은 결말이 오후에 시작하므로 그 전(점심 놀이)까지만.
{window.EP_TIME={"haeun":[[2,2,0],[6,6,1],[2,2,0],[3,3,1],[4,4,1],[2,2,0],[4,4,1],[1,1,0],[6,6,1],[2,2,0,["nope"]],[6,6,0],[2,2,0],[6,6,1],[4,4,1],[2,2,0]],"haneul":[[1,1,1],[2,2,0],[2,2,0],[2,2,1],[1,1,1],[3,3,0],[4,4,1],[5,5,0],[2,2,1],[2,2,0],[2,2,0],[5,5,1],[6,6,1],[2,2,0,["noteacher"]],[1,1,1]],"hangyeol":[[2,5,0],[2,5,0],[4,4,1],[4,4,0],[2,5,0],[2,5,0],[2,5,0,["day금"]],[7,7,0,["wet"]],[2,5,0],[2,5,0],[2,5,0],[6,6,0],[3,3,1],[2,5,0],[2,5,0,["pe"]]],"haram":[[3,3,0],[2,5,0],[2,5,0],[2,5,0],[3,3,2],[3,3,0],[2,2,0],[2,5,0],[2,5,0],[2,2,4],[6,6,1],[1,1,1],[6,6,0],[2,2,3],[2,5,0]],"hyeeun":[[2,5,0],[2,5,0],[3,3,0,["wet"]],[2,2,0],[2,5,0,["pe"]],[2,5,0,["pe"]],[2,5,0],[2,2,0],[3,3,0],[2,5,0],[6,6,1],[2,5,0],[2,5,0,["sun"]],[2,5,0,["pe"]],[2,5,0]],"jiho":[[2,5,0],[2,5,0,["pe"]],[2,5,0],[2,5,0,["wet"]],[2,5,0,["wet"]],[2,5,0,["pe"]],[6,6,0,["pe"]],[2,5,0,["pe"]],[2,5,0,["pe"]],[3,3,1],[2,5,0],[2,4,0],[2,5,0,["sun"]],[2,5,0],[2,5,0]],"jihoon":[[4,4,1,["sun"]],[6,6,1],[4,4,0],[2,2,0],[6,6,1,["sun"]],[4,4,0],[2,2,0],[4,4,0],[4,4,0],[2,2,1],[4,4,0,["wet"]],[2,2,0],[6,6,1],[4,4,1,["sun"]],[6,6,1,["sun"]]],"junho":[[4,4,1],[2,2,0,["pe"]],[4,4,1],[6,6,0],[4,4,1],[4,4,0],[4,4,1],[2,2,0],[4,4,1,["teacher"]],[4,4,1],[4,4,1],[4,4,1],[2,5,0,["pe"]],[4,4,0],[4,4,1]],"minho":[[2,5,0],[4,4,1],[1,5,1],[1,1,0],[1,5,1],[6,6,0],[2,5,0,["pe"]],[7,7,0,["wet"]],[2,5,0],[2,5,0],[1,1,1],[4,4,1],[1,6,0],[1,6,0],[2,5,0]],"seah":[[4,4,1,["sun"]],[2,2,0],[2,2,0],[3,3,0],[4,4,3],[2,2,0,["pe"]],[2,2,0],[4,4,0,["wet"]],[2,2,0],[2,2,0],[4,4,1],[2,2,0],[2,2,0],[3,3,0],[4,4,1,["sun"]]],"siwoo":[[1,1,1],[2,5,0],[2,5,0],[3,3,1],[1,1,1],[2,2,0,["wet","day목","nope"]],[2,5,0],[2,5,0],[4,4,1],[2,5,0],[4,4,1],[6,6,0],[2,5,0],[2,5,0],[6,6,0]],"sua":[[1,6,0],[2,5,0],[2,6,0],[3,4,1],[2,5,0],[2,5,0,["pe"]],[2,5,0],[2,5,1],[1,5,1],[4,4,1],[2,2,1],[1,6,0],[1,6,0],[2,5,1],[1,6,0]],"yena":[[2,2,0],[6,6,1],[2,2,0],[2,2,1],[2,2,0],[2,2,0],[2,2,0],[2,2,0],[2,2,1],[2,2,0],[2,2,0],[2,2,0],[4,4,0],[2,2,0],[2,2,0]],"youngmin":[[6,6,0],[1,1,1],[2,2,0],[2,2,0],[5,5,0],[2,2,0],[2,2,0],[4,4,1,["day화"]],[2,2,0],[1,1,1],[4,4,0],[5,5,0],[4,4,0],[6,6,0],[6,6,0,["sun"]]],"yuna":[[1,1,0],[2,2,0],[6,6,0],[4,4,1],[1,1,1],[4,4,2],[2,2,0],[1,1,1],[3,3,1],[5,5,0],[2,2,0],[2,2,0],[6,6,1],[2,2,1,["pe"]],[2,2,0]]};
 const ONCE=new Set([1,3,6,7]),Z2S=[0,0,0,1,1,2,3,3];
 const idOf=e=>{if(!e||!window.EP)return null;for(const k in EP)if(Array.isArray(EP[k])&&EP[k].includes(e))return k;return null};
 const tOf=(id,e)=>{if(!e||e.vote||!window.EP_TIME)return null;const L=EP[id],i=L?L.indexOf(e):-1,r=i>=0&&EP_TIME[id]&&EP_TIME[id][i];return r?{lo:r[0],hi:r[1],sp:r[2],tag:r[3]||[]}:null};
 window.epTime=e=>{const id=idOf(e);return id?tOf(id,e):null};
 window.epSlot=function(e){if(!e)return null;if(e.slot!=null)return e.slot;const t=epTime(e);return t?Z2S[t.lo]:null};
 window.epLate=e=>epSlot(e)===3;
 const nextOf=f=>epNext(f,EPIDX[f]);
 const isTest=()=>typeof TESTER!=='undefined'&&!!TESTER;
 const isED=()=>typeof ED_DAY!=='undefined'&&DAY===ED_DAY;
 let tDay=-1,EFF={},AM=false,PM=false;// EFF[id] = {z: 시작 칸, sp, tag} 오늘 시작한 이야기
 const sync=()=>{if(tDay!==DAY){tDay=DAY;EFF={};AM=false;PM=false}};
 const CLASH=(a,b)=>(a.includes('wet')&&b.includes('sun'))||(a.includes('sun')&&b.includes('wet'))||(a.includes('pe')&&b.includes('nope'))||(a.includes('nope')&&b.includes('pe'))
  ||(a.includes('noteacher')&&b.includes('teacher'))||(a.includes('teacher')&&b.includes('noteacher'))||a.some(x=>/^day/.test(x)&&b.some(y=>/^day/.test(y)&&y!==x));
 const state=extra=>{let clock=1,used=new Set(),tags=[];const all=Object.values(EFF).concat(extra?[extra]:[]);
  for(const s of all){const end=s.z+s.sp;clock=Math.max(clock,end);for(let z=s.z;z<end;z++)if(ONCE.has(z))used.add(z);if(s.sp===0&&ONCE.has(s.z))used.add(s.z);if(s.sp>0&&end===7)used.add(7);tags=tags.concat(s.tag)}
  const am=AM||clock>=3,pm=PM||clock>=6;if(am)clock=Math.max(clock,3);if(pm)clock=Math.max(clock,6);return{clock,used,tags,am,pm}};
 // 이 이야기를 지금 시작하면 몇 칸에서 시작하나(못 하면 null)
 const fit=(t,st)=>{if(!t)return 0;if(t.tag.length&&st.tags.length&&CLASH(t.tag,st.tags))return null;const hi=isED()?Math.min(t.hi,4):t.hi;let z=Math.max(st.clock,t.lo);while(z<=hi&&st.used.has(z))z++;return z<=hi?z:null};
 const cands=except=>D2IDS.filter(i=>friendData(i)).filter(f=>f!==except&&!PICKS.includes(f)&&!EFF[f]&&nextOf(f));
 // 지금 만날 수 없는 까닭: 'past'(오늘은 지남) / 'later'(이따가) / null(지금 됨)
 const why=id=>{sync();if(isTest())return null;const e=nextOf(id),t=tOf(id,e);if(!t||PICKS.includes(id)||EFF[id])return null;const st=state(),z=fit(t,st);
  if(z==null)return 'past';
  if(PICKS.length===0&&!Object.keys(EFF).length&&D2IDS.filter(i=>friendData(i)).length>1){const after=state({z,sp:t.sp,tag:t.tag});if(!cands(id).some(f=>fit(tOf(f,nextOf(f)),after)!=null))return 'later'}
  return null};
 window.slotBlocked=function(id){const w=why(id);if(!w)return false;// 다른 누구도 지금 안 되면 막지 않는다
  return cands(id).some(f=>!why(f))};
 const _ls=lessons;
 const play=(part,cb)=>{const am=[['nar','','딩동댕— 수업 시작 종이 울렸다.'],['nar','','선생님: 「자, 교과서 펴세요.」'],['nar','','오전 수업이 하나씩 지나갔다.'],['nar','','딩동댕— 점심시간!']];
  const pm=[['nar','','딩동댕— 수업 시작 종이 울렸다.'],['nar','','오후 수업이 천천히 지나갔다.'],['nar','','딩동댕— 마지막 종이 울렸다. 방과 후!']];
  const n=LESSON_PICS.length,pic=!n?null:part==='am'?LESSON_PICS[DAY%Math.max(1,n-1)]:LESSON_PICS[n-1];
  if(part==='am')AM=true;else{AM=true;PM=true}busy=true;setGoal('');const back=MAP;fade(()=>{if(MAP!=='class')load('class');(pic?(ls,c)=>scene(pic,ls,c):say)(part==='am'?am:pm,()=>{busy=false;if(back!=='class')fade(()=>{load(back);cb()});else cb()})})};
 window.busyLines=function(id,sl,tomorrow){const R=["아, 지금 선생님 심부름 가야 해.", "미안, 지금 숙제 마저 해야 돼.", "지금 다른 친구랑 약속이 있어.", "앗, 지금 물 마시러 가던 길이야."],TD=["아침에 얘기하자!", "점심시간에 얘기하자!", "오후에 얘기하자!", "수업 끝나고 얘기하자!"],TM=["내일 아침에 얘기하자!", "내일 점심시간에 얘기하자!", "내일 오후에 얘기하자!", "내일 수업 끝나고 얘기하자!"];
  let h=DAY;for(const c of id)h+=c.charCodeAt(0);const k=Math.max(0,Math.min(3,sl==null?0:sl));return[[id,'smile',R[h%4]],[id,'smile',(tomorrow?TM:TD)[k]]]};
 {const _g=d2Goal;d2Goal=function(){const _ft=friendsToday;friendsToday=function(){const r=_ft();return r.filter(f=>PICKS.includes(f)||!slotBlocked(f))};try{return _g.apply(this,arguments)}finally{friendsToday=_ft}}}
 const _dl=d2Talk;d2Talk=function(id){sync();const e=nextOf(id),t=tOf(id,e);
  if(navigator.webdriver||isTest()||!t||stage!=='d2_class'||PICKS.includes(id)||EFF[id]||PICKS.length>=needToday())return _dl(id);
  if(slotBlocked(id)){const w=why(id);say(busyLines(id,Z2S[t.lo],w==='past'));return}
  const st=state();let z=fit(t,st);if(z==null)z=Math.max(st.clock,t.lo);// 아무도 안 맞는 날: 막지 않고 그대로
  if(z>=3&&!st.am)return play('am',()=>d2Talk(id));
  if(z>=6&&!st.pm)return play('pm',()=>d2Talk(id));
  EFF[id]={z,sp:t.sp,tag:t.tag};return _dl(id)};
 lessons=function(part){sync();if(isTest())return _ls(part);const st=state();if(part==='am'&&st.am){busy=false;d2Goal();return}if(part==='pm'&&st.pm){busy=false;stage='d2_after';setGoal('방과 후! 나가는 길로 가서 집에 가기','out');return}if(part==='am')AM=true;else{AM=true;PM=true}return _ls(part)};
 window.timeState=()=>{sync();return{...state(),EFF:JSON.parse(JSON.stringify(EFF))}}}
// (11/08 owner) day 14 at lunch the desks were empty: whenever the "meet one more friend" goal comes up in the classroom, the kids who belong there come back to their seats
{const _g=d2Goal;d2Goal=function(){try{if(MAP==='class'&&!SCENE_IDS&&typeof tidyPeople==='function')tidyPeople()}catch(e){}return _g.apply(this,arguments)}}
// (11/08 owner) tapping a kid who only stands here as part of another friend's scene (Haeun in Junho's backyard scene) starts that scene
{const _t=d2Talk;d2Talk=function(id){try{const own=epNext(id,EPIDX[id]);
  if(['d2_class','d2_after'].includes(stage)&&!PICKS.includes(id)&&!(own&&own.place===MAP)){
   const host=D2IDS.find(f=>f!==id&&!PICKS.includes(f)&&(()=>{const e=epNext(f,EPIDX[f]);return e&&e.place===MAP&&(e.with||[]).some(w=>w[0]===id)})());
   if(host)return _t(host)}}catch(e){}return _t(id)}}

// (11/09 owner) busy friend lines: translations
(window.T["en"]=window.T["en"]||{});Object.assign(window.T["en"],{"아, 지금 선생님 심부름 가야 해.": "Oh, I have to run an errand for the teacher right now.", "미안, 지금 숙제 마저 해야 돼.": "Sorry, I have to finish my homework now.", "지금 다른 친구랑 약속이 있어.": "I already promised to hang out with another friend now.", "앗, 지금 물 마시러 가던 길이야.": "Oops, I was just on my way to get some water.", "아침에 얘기하자!": "Let's talk in the morning!", "점심시간에 얘기하자!": "Let's talk at lunchtime!", "오후에 얘기하자!": "Let's talk in the afternoon!", "수업 끝나고 얘기하자!": "Let's talk after school!", "내일 아침에 얘기하자!": "Let's talk tomorrow morning!", "내일 점심시간에 얘기하자!": "Let's talk tomorrow at lunchtime!", "내일 오후에 얘기하자!": "Let's talk tomorrow afternoon!", "내일 수업 끝나고 얘기하자!": "Let's talk tomorrow after school!"});
(window.T["vi"]=window.T["vi"]||{});Object.assign(window.T["vi"],{"아, 지금 선생님 심부름 가야 해.": "À, giờ mình phải đi làm việc cô giáo nhờ.", "미안, 지금 숙제 마저 해야 돼.": "Xin lỗi, giờ mình phải làm nốt bài tập.", "지금 다른 친구랑 약속이 있어.": "Giờ mình có hẹn với bạn khác rồi.", "앗, 지금 물 마시러 가던 길이야.": "Ối, mình đang đi uống nước.", "아침에 얘기하자!": "Sáng mình nói chuyện nhé!", "점심시간에 얘기하자!": "Giờ ăn trưa mình nói chuyện nhé!", "오후에 얘기하자!": "Buổi chiều mình nói chuyện nhé!", "수업 끝나고 얘기하자!": "Tan học mình nói chuyện nhé!", "내일 아침에 얘기하자!": "Sáng mai mình nói chuyện nhé!", "내일 점심시간에 얘기하자!": "Trưa mai mình nói chuyện nhé!", "내일 오후에 얘기하자!": "Chiều mai mình nói chuyện nhé!", "내일 수업 끝나고 얘기하자!": "Mai tan học mình nói chuyện nhé!"});
(window.T["zh"]=window.T["zh"]||{});Object.assign(window.T["zh"],{"아, 지금 선생님 심부름 가야 해.": "啊，我现在要去帮老师跑腿。", "미안, 지금 숙제 마저 해야 돼.": "对不起，我现在得把作业写完。", "지금 다른 친구랑 약속이 있어.": "我现在和别的朋友约好了。", "앗, 지금 물 마시러 가던 길이야.": "哎呀，我正要去喝水呢。", "아침에 얘기하자!": "早上再聊吧！", "점심시간에 얘기하자!": "午饭时间再聊吧！", "오후에 얘기하자!": "下午再聊吧！", "수업 끝나고 얘기하자!": "放学后再聊吧！", "내일 아침에 얘기하자!": "明天早上再聊吧！", "내일 점심시간에 얘기하자!": "明天午饭时间再聊吧！", "내일 오후에 얘기하자!": "明天下午再聊吧！", "내일 수업 끝나고 얘기하자!": "明天放学后再聊吧！"});
(window.T["ja"]=window.T["ja"]||{});Object.assign(window.T["ja"],{"아, 지금 선생님 심부름 가야 해.": "あ、いま 先生の おつかいに 行かなきゃ。", "미안, 지금 숙제 마저 해야 돼.": "ごめん、いま しゅくだいの つづきを しなきゃ。", "지금 다른 친구랑 약속이 있어.": "いま ほかの ともだちと やくそくが あるんだ。", "앗, 지금 물 마시러 가던 길이야.": "あっ、いま 水を のみに 行くところ なんだ。", "아침에 얘기하자!": "あさに 話そう！", "점심시간에 얘기하자!": "ひるやすみに 話そう！", "오후에 얘기하자!": "ごごに 話そう！", "수업 끝나고 얘기하자!": "じゅぎょうが おわったら 話そう！", "내일 아침에 얘기하자!": "あしたの あさに 話そう！", "내일 점심시간에 얘기하자!": "あしたの ひるやすみに 話そう！", "내일 오후에 얘기하자!": "あしたの ごごに 話そう！", "내일 수업 끝나고 얘기하자!": "あした じゅぎょうが おわったら 話そう！"});
(window.T["ru"]=window.T["ru"]||{});Object.assign(window.T["ru"],{"아, 지금 선생님 심부름 가야 해.": "Ой, мне сейчас надо выполнить поручение учителя.", "미안, 지금 숙제 마저 해야 돼.": "Извини, мне сейчас надо доделать домашку.", "지금 다른 친구랑 약속이 있어.": "У меня сейчас встреча с другим другом.", "앗, 지금 물 마시러 가던 길이야.": "Ой, я как раз иду попить воды.", "아침에 얘기하자!": "Давай поговорим утром!", "점심시간에 얘기하자!": "Давай поговорим на обеде!", "오후에 얘기하자!": "Давай поговорим после обеда!", "수업 끝나고 얘기하자!": "Давай поговорим после уроков!", "내일 아침에 얘기하자!": "Давай поговорим завтра утром!", "내일 점심시간에 얘기하자!": "Давай поговорим завтра на обеде!", "내일 오후에 얘기하자!": "Давай поговорим завтра после обеда!", "내일 수업 끝나고 얘기하자!": "Давай поговорим завтра после уроков!"});
// (11/11 owner) Day 12 started in the classroom with nobody to pick: arrive where a friend you can meet now actually is
{const _dc=d2Class;d2Class=function(){let to='class';
 try{const avail=friendsToday().filter(f=>!PICKS.includes(f)&&!(window.slotBlocked&&slotBlocked(f)));
  const here=m=>{try{return(d2People(m)||[]).filter(p=>avail.includes(p[0])).length}catch(e){return 0}};
  if(avail.length&&!here('class')){let bn=0;for(const m of Object.keys(D2PLACE)){if(m==='class'||!MAPS[m])continue;const n=here(m);if(n>bn){bn=n;to=m}}}}catch(e){}
 if(to==='class')return _dc.apply(this,arguments);
 stage='d2_class';load(to);say([['nar','',DAY===2?'둘째 날. 학교에 왔다.':DAY===3?'셋째 날. 학교에 왔다.':'오늘도 학교에 왔다.'],['think','smile','(오늘은 누구한테 말 걸어 볼까? 두 명쯤…)']],pickPlace)}}
// (11/12 owner) lunch began on a map with nobody to meet (the first friend's lunch story ended at the stands, the gate, the cafeteria…;
// or the classroom where every kid has a morning story and says 「내일 얘기하자」): the "where to?" card opens by itself, each place showing how many friends can be met there
{let lunch=false;const _l=lessons;lessons=function(part){if(part==='am')lunch=true;return _l.apply(this,arguments)};
 const _g=d2Goal;d2Goal=function(){const r=_g.apply(this,arguments);if(!lunch)return r;lunch=false;
  try{if(stage==='d2_class'&&PICKS.length&&goal&&Array.isArray(goal.target)){const ids=goal.target.filter(f=>!PICKS.includes(f));if(ids.length&&!npcs.some(n=>ids.includes(n.id)))pickPlace()}}catch(e){}return r}}
// (11/12 owner) Hyeeun went up the ramp into the cafeteria, the story ended — and she stood at the bottom again: the friend just met who left the map
// during their own story is not put back on that map today (tidyPeople and every later visit); in the classroom they are back at the next lesson
{const LEFT={};const _tp=tidyPeople;tidyPeople=function(){try{const f=SCENE_IDS&&SCENE_IDS[0];if(f&&PICKS.includes(f)&&!npcs.some(n=>n.id===f)&&!(GOWITH&&GOWITH.ids.includes(f)))LEFT[f]=MAP}catch(e){}return _tp.apply(this,arguments)};
 const _dp=d2People;d2People=function(id){const ps=_dp(id);return ps.filter(p=>!(LEFT[p[0]]===id&&PICKS.includes(p[0])))};
 const _sd=startDay;startDay=function(n){for(const k in LEFT)delete LEFT[k];return _sd.apply(this,arguments)};
 const _l=lessons;lessons=function(){for(const k in LEFT)if(LEFT[k]==='class')delete LEFT[k];return _l.apply(this,arguments)}}
