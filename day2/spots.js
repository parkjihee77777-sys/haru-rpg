// ---------- every kid gets their own spot (loaded after all the per-meeting files) ----------
// Scenes put their friend (and who is with them) at a fixed spot, so on busy days several kids ended up on the same spot.
// In the classroom a kid who has sitting art sits at the free desk nearest to that spot; anyone still standing too close to another kid,
// to a thing you tap or to the way out moves to the nearest free spot that is still on the floor.
{
// chair centres (x) on the classroom map, by row (top = the chair back's top on the map)
const SEATS={class:[[333,[376,478,764,890,1182,1313]],[448,[334,454,764,890,1194,1325]],[572,[292,406,760,885,1218,1349]],[715,[263,395,760,895,1272,1405]]]};
const spotOf=p=>p[3]?[p[1],p[3].top+150]:[p[1],p[2]];// a seated kid's body sits a little below the chair back
function onFloor(id,x,y){const m=MAPS[id];if(!m||!m.walk)return true;if((m.block||[]).some(r=>inR(r,x,y)))return false;
 return m.walk.some(p=>inPoly(p,x,y))||(m.rects||[]).some(r=>inR(r,x,y))}
function clash(id,x,y,placed){if(placed.some(([px,py])=>Math.abs(px-x)<110&&Math.abs(py-y)<90))return true;
 // the body (about 110 wide, 170 high above the feet) must leave every tap spot and the way out free
 for(const[,tx,ty,r]of(NATIVE[id]||[]).concat((THINGS[id]||[]).map(([k,a,b,w])=>[k,a,b-(w||56)*.4,Math.max(30,(w||56)*.55)])))
  if(tx>x-55-r*.6&&tx<x+55+r*.6&&ty>y-170-r*.6&&ty<y+15+r*.6)return true;
 const o=OUT[id];return!!(o&&Math.abs(o[0]-x)<120&&Math.abs(o[1]-y)<130)}
function freeSpot(id,x,y,placed){for(let d=40;d<=640;d+=40)for(let a=0;a<16;a++){const t=a/16*Math.PI*2,cx=Math.round(x+Math.cos(t)*d),cy=Math.round(y+Math.sin(t)*d*.6);
  if(onFloor(id,cx,cy)&&!clash(id,cx,cy,placed))return[cx,cy]}return null}
const _d2PeopleSpots=d2People;
d2People=function(id){const ps=_d2PeopleSpots(id).map(p=>p.slice());const S=SEATS[id];
 if(S){const taken=ps.filter(p=>p[3]).map(p=>[p[1],p[3].top]);
  for(const p of ps){if(p[3]||!SEATED_ART.has(p[0]))continue;let best=null,bd=1e9;
   for(const[top,xs]of S)for(const x of xs){if(taken.some(([tx,tt])=>tt===top&&Math.abs(tx-x)<40))continue;const d=Math.hypot(x-p[1],top+150-p[2]);if(d<bd){bd=d;best=[x,top]}}
   if(best){p[1]=best[0];p[2]=0;p[3]={top:best[1]};taken.push(best)}}}
 const placed=ps.filter(p=>p[3]).map(spotOf);
 for(const p of ps){if(p[3])continue;if(clash(id,p[1],p[2],placed)){const c=freeSpot(id,p[1],p[2],placed);if(c){p[1]=c[0];p[2]=c[1]}}placed.push([p[1],p[2]])}
 return ps};
}
// a save from before 10/25 may still hold 진우·보람·도연 (out of the game): forget them whenever a day starts
{const _sdGone=startDay;startDay=function(n){for(const k of GONE_IDS){delete HEART[k];delete MEET[k];if(typeof HEART_D1==='object'&&HEART_D1)delete HEART_D1[k]}return _sdGone(n)}}
