// ---------- every kid gets their own spot (loaded after all the per-meeting files) ----------
// Scenes put their friend (and who is with them) at a fixed spot, so on busy days several kids ended up on the same spot.
// In the classroom a kid who has sitting art sits at the free desk nearest to that spot; anyone still standing too close to another kid,
// to a thing you tap or to the way out moves to the nearest free spot that is still on the floor.
{
// chair centres (x) on the classroom map, by row (top = the chair back's top on the map)
const SEATS=window.SEATS_ALL={class:[[333,[376,478,764,890,1182,1313]],[448,[334,454,764,890,1194,1325]],[572,[292,406,760,885,1218,1349]],[715,[263,395,760,895,1272,1405]]]};
const spotOf=p=>p[3]?[p[1],p[3].top+150]:[p[1],p[2]];// a seated kid's body sits a little below the chair back
function onFloor(id,x,y){const m=MAPS[id];if(!m||!m.walk)return true;if((m.block||[]).some(r=>inR(r,x,y)))return false;
 return m.walk.some(p=>inPoly(p,x,y))||(m.rects||[]).some(r=>inR(r,x,y))}
// feet (or Hyeeun's wheels) must rest on open floor: the foot point, a little to each side and a little in front of it all on the walkable floor
// (a foot point just behind a table or desk edge looks like standing on it)
function footOk(id,x,y){return onFloor(id,x,y)&&onFloor(id,x-30,y)&&onFloor(id,x+30,y)&&onFloor(id,x,y+20)}
window.footOk=footOk;
function clash(id,x,y,placed){if(placed.some(([px,py])=>Math.abs(px-x)<110&&Math.abs(py-y)<90))return true;
 // the body (about 110 wide, up to 210 high above the feet) must leave every tap spot and the way out free
 for(const[,tx,ty,r]of(NATIVE[id]||[]).concat((THINGS[id]||[]).map(([k,a,b,w])=>[k,a,b-(w||56)*.4,Math.max(30,(w||56)*.55)])))
  if(tx>x-55-r*.6&&tx<x+55+r*.6&&ty>y-210-r*.6&&ty<y+15+r*.6)return true;
 const o=OUT[id];return!!(o&&Math.abs(o[0]-x)<120&&Math.abs(o[1]-y)<130)}
// a kid sitting at a chair covers the desk in front of the chair below (about 110 wide, the 110 above the chair back): no one sits where today's things lie
function seatHidesThing(id,x,top,f){for(const t of(THINGS[id]||[])){if(f&&t.owner===f)continue;const[,tx,ty,w]=t;const r=Math.max(30,(w||56)*.55),cy=ty-(w||56)*.4;
  if(tx>x-55-r*.6&&tx<x+55+r*.6&&cy>top-110-r*.6&&cy<top+20+r*.6)return true}return false}
// every point on a 20 px grid, nearest first (a ring of 16 directions missed the narrow aisles between the desks)
function freeSpot(id,x,y,placed){const c=[];for(let dx=-700;dx<=700;dx+=20)for(let dy=-420;dy<=420;dy+=20)c.push([Math.round(x+dx),Math.round(y+dy),Math.hypot(dx,dy/.6)]);
 c.sort((a,b)=>a[2]-b[2]);for(const[cx,cy]of c)if(footOk(id,cx,cy)&&!clash(id,cx,cy,placed))return[cx,cy];return null}
// a friend's own things (a scene's things lying near where that friend stands in the script) go with them: when the friend is seated
// at another desk, the things move onto that desk's other half (the friend's back covers the half in front of them)
// and no one else sits there. Each thing keeps its first spot (t.o0), so placing again starts from the script.
{const _sdOwn=setDay;setDay=function(n){_sdOwn(n);for(const f of D2IDS){const e=epNext(f,EPIDX[f]);if(!e)continue;
  for(const[m,ts]of Object.entries(e.things||{}))for(const t of ts){if(!t.o0)t.o0=[t[1],t[2]];t[1]=t.o0[0];t[2]=t.o0[1];
   t.owner=(e.place===m&&e.at&&Math.hypot(t.o0[0]-e.at[0],t.o0[1]-e.at[1])<240)?f:null}}}}
function ownThings(id,f,seat,taken){const S=SEATS[id];if(!S)return;const mine=(THINGS[id]||[]).filter(t=>t.owner===f);if(!mine.length)return;
 const[x,top]=seat,row=S.find(r=>r[0]===top);if(!row)return;const i=row[1].indexOf(x),mate=row[1][i%2?i-1:i+1];
 if(mate==null||taken.some(([tx,tt])=>tt===top&&Math.abs(tx-mate)<40))return;
 // already on this desk and clear of the friend's back: leave it
 if(mine.every(t=>Math.abs(t[2]-top)<40&&Math.abs(t[1]-(x+mate)/2)<150&&Math.abs(t[1]-x)>55+Math.max(30,(t[3]||56)*.55)*.6))return;
 const n=mine.length,gap=Math.min(60,130/n);mine.forEach((t,j)=>{t[1]=Math.round(mate+(j-(n-1)/2)*gap+(mate>x?10:-10));t[2]=top});
 taken.push([mate,top])}
const _d2PeopleSpots=d2People;
d2People=function(id){const ps=_d2PeopleSpots(id).map(p=>p.slice());const S=SEATS[id];
 if(S){const taken=ps.filter(p=>p[3]).map(p=>[p[1],p[3].top]);
  // a friend whose scene is here today picks a seat first, so the kid pushed off a seat by today's things never takes theirs
  const here=f=>(SCENE_IDS||[]).includes(f)?0:(D2IDS.includes(f)&&(epNext(f,EPIDX[f])||{}).place===id)?1:2;
  for(const p of ps.filter(p=>!p[3]&&p[4]!=='stand'&&SEATED_ART.has(p[0])).sort((a,b)=>here(a[0])-here(b[0]))){let best=null,bd=1e9;
   for(const[top,xs]of S)for(const x of xs){if(taken.some(([tx,tt])=>tt===top&&Math.abs(tx-x)<40)||seatHidesThing(id,x,top,p[0]))continue;const d=Math.hypot(x-p[1],top+150-p[2]);if(d<bd){bd=d;best=[x,top]}}
   if(best){p[1]=best[0];p[2]=0;p[3]={top:best[1]};taken.push(best)}
   // a friend whose scene has them standing (stand:1) leaves their things where the scene put them (Siwoo 12's notebook went to a desk he never sat at, 11/05)
   if(best&&!(D2IDS.includes(p[0])&&(epNext(p[0],EPIDX[p[0]])||{}).stand&&(epNext(p[0],EPIDX[p[0]])||{}).place===id))ownThings(id,p[0],best,taken)}}
 const placed=ps.filter(p=>p[3]).map(spotOf);
 for(const p of ps){if(p[3])continue;if(!footOk(id,p[1],p[2])||clash(id,p[1],p[2],placed)){const c=freeSpot(id,p[1],p[2],placed);if(c){p[1]=c[0];p[2]=c[1]}}placed.push([p[1],p[2]])}
 return ps};
// the classroom floor also runs along the window shelves (left) and the cabinets (right) next to the front row: kids may stand there
if(MAPS.class&&MAPS.class.rects)MAPS.class.rects.push(R(195,295,290,415),R(1395,295,1475,420));
// a friend who stands where the scene says (stand:1, set in each friend's file after this one loads) is checked last of all:
// a spot that isn't open floor (a cabinet, a table) moves to the nearest free floor
// and a kid it lands on (placed before that friend moved there) steps aside
addEventListener('load',()=>{const _dpFloor=d2People;d2People=function(id){const ps=_dpFloor(id);
 const stands=f=>{const e=D2IDS.includes(f)&&epNext(f,EPIDX[f]);return!!(e&&e.stand&&e.place===id)};
 const move=p=>{const c=freeSpot(id,p[1],p[2],ps.filter(q=>q!==p).map(spotOf));if(c){p[1]=c[0];p[2]=c[1]}};
 for(const p of ps)if(!p[3]&&!footOk(id,p[1],p[2]))move(p);
 for(const p of ps)if(!p[3]&&!stands(p[0])&&ps.some(q=>q!==p&&!q[3]&&stands(q[0])&&Math.abs(q[1]-p[1])<110&&Math.abs(q[2]-p[2])<90))move(p);
 return ps}});
// a desk or a chair to find in the classroom can be any of them (the map shows 24; Minho's meeting had 4 fixed ones, none near him):
// while that find runs every desk and chair near the scene's friend gets a spot (the whole room when the friend isn't here; no 🔊 on each of them)
{const _findSeat=find;find=function(k,done,goal,label){if(MAP==='class'&&(k==='desk'||k==='chair')){const add=[];const f=SCENE_IDS&&npcs.find(n=>n.id===SCENE_IDS[0]);
 for(const[top,xs]of SEATS.class)for(const x of xs){const o=k==='desk'?[k,x,top-25,50]:[k,x,top+45,35];if(f&&Math.hypot(o[1]-f.x,o[2]-f.y)>380)continue;if(!(OBJ.class||[]).some(p=>p[0]===k&&Math.hypot(p[1]-o[1],p[2]-o[2])<40)){o.seatAll=1;add.push(o)}}
 (OBJ.class=OBJ.class||[]).push(...add);const d=done;done=function(){OBJ.class=(OBJ.class||[]).filter(o=>!o.seatAll);return d&&d.apply(this,arguments)}}
 return _findSeat(k,done,goal,label)}}
}
// a save from before 10/25 may still hold 진우·보람·도연 (out of the game): forget them whenever a day starts
{const _sdGone=startDay;startDay=function(n){for(const k of GONE_IDS){delete HEART[k];delete MEET[k];if(typeof HEART_D1==='object'&&HEART_D1)delete HEART_D1[k]}return _sdGone(n)}}
// calling the hero by name: {SN|아} → 「민준아」「아란아」/「미소야」 (Korean screen; other screens just the name). Kept here, outside any friend's file
{const _trCall=tr;tr=function(s){if(typeof s!=='string'||s.indexOf('{SN|')<0||typeof HERO_HOME==='undefined')return _trCall(s);
 const ko=UI==='ko',H=ko?(HERO_HOME[LANG]||HERO_HOME.vi).ko:((HERO_HOME[UI]||HERO_HOME.vi).ui||HERO_HOME.vi.ui),w=H[3][HERO==='hero_m'?0:1];
 // look the line up first (translations keep {SN}), then put the name in
 const t=_trCall(s);return t==null?t:String(t).replace(/\{SN\|(아|야)\}/g,()=>{if(!ko)return w;const c=w.charCodeAt(w.length-1)-0xAC00;return w+(c>=0&&c<=11171&&c%28?'아':'야')}).replace(/\{SN\}/g,w)}}
