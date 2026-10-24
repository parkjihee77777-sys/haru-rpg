// tester mode: ?test=1 turns it on (remembered on this device), ?test=0 turns it off. Normal players never see it.
// On: every friend with something to play today can be met in one day (no 2-per-day limit); each meeting counts as usual (Day N = Nth meeting).
// After a meeting the day goes on (no lesson in between); 「오늘은 여기까지」 ends it (afternoon lessons → home → dinner → night → next day),
// and it also ends by itself once everyone has been met. A small TEST badge sits in the corner.
const TESTER=(()=>{let q=null;try{q=new URLSearchParams(location.search).get('test')}catch(e){}
 try{if(q==='1')localStorage.setItem('haru_test','1');if(q==='0')localStorage.removeItem('haru_test');return localStorage.getItem('haru_test')==='1'}catch(e){return q==='1'}})();
if(TESTER){
 let ending=false;
 const left=()=>friendsToday().filter(f=>!PICKS.includes(f));
 needToday=function(){return Math.max(1,friendsToday().length)};
 const _lessons=lessons;
 lessons=function(part){
  if(!ending&&left().length){busy=false;stage='d2_class';d2Goal();return}// another friend: the day goes on
  ending=false;return _lessons('pm')};
 // calendar-day friends (engine.js) stop at 2 picks on their own: let that one check see no picks yet
 const _talk=d2Talk;d2Talk=function(id){if(!epNext(id,EPIDX[id])&&!PICKS.includes(id)&&stage==='d2_class'){const keep=PICKS;PICKS=[];try{return _talk(id)}finally{PICKS=keep}}return _talk(id)};
 const badge=document.createElement('div');badge.textContent='TEST';
 badge.style.cssText='position:fixed;right:6px;bottom:6px;z-index:9999;font:700 11px/1 system-ui,sans-serif;color:#fff;background:rgba(200,60,60,.75);padding:3px 6px;border-radius:6px;pointer-events:none';
 const end=document.createElement('button');end.textContent='오늘은 여기까지';
 end.style.cssText='position:fixed;left:8px;bottom:8px;z-index:9998;font:700 14px system-ui,sans-serif;color:var(--ink,#4a3424);background:var(--paper,#fffaf0);border:3px solid var(--line,#c9a676);border-radius:999px;padding:6px 14px;display:none';
 end.onclick=ev=>{ev.stopPropagation();if(busy||FIND||stage!=='d2_class'||!PICKS.length)return;ending=true;end.style.display='none';setGoal('');lessons('pm')};
 addEventListener('DOMContentLoaded',()=>{document.body.append(badge,end)});
 setInterval(()=>{end.style.display=stage==='d2_class'&&PICKS.length&&!busy&&!FIND&&!talkOn&&left().length?'':'none'},400);
}
