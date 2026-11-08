// ---------- my bag (loaded after the per-meeting files) ----------
// When the hero takes out their OWN thing, the map is not searched: their bag opens on screen as a tray of cut-out pictures.
// Same find rules: tapping a thing says its name, the button says this mission's action with the target word,
// the right thing goes on, a wrong one only buzzes. A step {k, goal, bag:[…]} in a scene uses it; so does Mom's notebook review.
// an item written 'key:picture' shows items/<picture>.png for that key (a scene's own look of the thing, e.g. 'lid:lid_screw'); the plain items/<key>.png if that picture is missing
// 11/08: the tray never shows empty frames or loses cards on a flaky connection: every picture is loaded (retried up to 3 times) before the tray opens
function bagLoadImg(src){return new Promise(r=>{let n=0;const t=()=>{const im=new Image();im.onload=()=>r(1);im.onerror=()=>{if(++n>=3)return r(0);setTimeout(t,350*n)};im.src=n?src+'?r='+n+Date.now():src};t()})}
function bagFind(k,items,goalText,done){busy=true;closeBubble();const pic={};let list=items.map(q=>{const[a,b]=q.split(':');if(b)pic[a]=b;return a});list=noLookalike(k,list);for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]]}/* (11/09 owner) the thing to find is not always first */
 const src=q=>'items/'+(pic[q]||q)+'.png';
 Promise.race([Promise.all(list.map(q=>bagLoadImg(src(q)))),new Promise(r=>setTimeout(()=>r(null),4500))]).then(()=>bagFind0(k,list.map(q=>pic[q]?q+':'+pic[q]:q),goalText,done))}
function bagFind0(k,items,goalText,done){busy=true;closeBubble();const pic={};items=items.map(q=>{const[a,b]=q.split(':');if(b)pic[a]=b;return a});items=noLookalike(k,items);const m=document.getElementById('modal'),c=document.getElementById('mcard');
 const goalTr=()=>tr(goalText||'「{x}」 꺼내기');let sel=null;
 c.innerHTML=`<h2>${goalTr().replace('{x}',wordOf(k)+' <button class="spk" id="bagagain">🔊</button>')}</h2><div class="ztray">${items.map(q=>`<button class="zit" data-k="${q}"><img src="items/${pic[q]||q}.png" alt="" onerror="if(!this.dataset.f&&${!!pic[q]}){this.dataset.f=1;this.src='items/${q}.png'}else if((this.dataset.r=+(this.dataset.r||0)+1)<=3){const i=this;setTimeout(()=>{i.src='items/${pic[q]||q}.png?r='+Date.now()},400*i.dataset.r)}else this.parentNode.remove()"></button>`).join('')}</div><div class="zok"></div>`;
 m.classList.add('on');setTimeout(()=>speak(k),350);document.getElementById('bagagain').onclick=()=>speak(k);const okw=c.querySelector('.zok');
 c.querySelectorAll('.zit').forEach(b=>b.onclick=()=>{sel=b.dataset.k;speak(sel);c.querySelectorAll('.zit').forEach(x=>x.classList.toggle('on',x===b));okw.innerHTML='';
  const zb=document.createElement('button');zb.className='bubble';zb.style.cssText='position:static;transform:none;margin:10px auto 0;display:inline-block';zb.textContent=goalTr().replace('{x}',wordOf(k));okw.appendChild(zb);
  const born=performance.now();zb.onclick=e=>{e.stopPropagation();if(performance.now()-born<300)return;
   if(sel===k){m.classList.remove('on');busy=false;chime();FOUND.add(k);TODAY.add(k);done&&done()}
   else{buzz();okw.innerHTML='';b.classList.remove('on')}}})}
// Day 1: the notebook comes out of my bag the same way
deskFind=function(k,done){bagFind(k,['pcase','notebook','pencil','eraser'],'「{x}」 꺼내기',done)};
// Mom's notebook review at dinner: from my school bag, not from a bag lying in the kitchen
{const rv=REVIEW[3];if(rv&&!rv.bag){rv.bag=['pcase','notebook','handkerchief','pencil','water_bottle'];rv.ask=rv.ask.concat([['think','smile','(가방에서 {w}을 꺼내야지.)']])}}
{const _findBag=find;let next=null;
 find=function(k,done,goal,label){if(next){const b=next;next=null;return bagFind(k,b,goal,done)}return _findBag(k,done,goal,label)};
 const _dinner2Bag=dinner2;dinner2=function(){const rv=REVIEW[DAY];if(rv&&rv.bag)next=rv.bag;return _dinner2Bag()}}
// the new line in the other languages
{const P={'(가방에서 {w}을 꺼내야지.)':['(I\'ll take my {w} out of my bag.)','(Aku ambil {w} dari tasku.)','(Mình lấy {w} trong cặp ra.)','（从书包里拿出{w}吧。）','（かばんから{w}を出そう。）','(Достану {w} из рюкзака.)']};
 ['en','id','vi','zh','ja','ru'].forEach((u,i)=>{T[u]=T[u]||{};for(const[k,v]of Object.entries(P))if(!(k in T[u]))T[u][k]=v[i]})}
// ---- auto tray: a thing that is hard to see on the map opens as a tray of pictures instead of a map tap ----
// Hard to see = every spot of it on this map is small (radius < 20 on the map, about 30 px on a phone) or lies under a kid
// (a seated kid at a desk, or a standing one). The tray shows it with 3–5 other things lying near it (learned words first),
// never a look-alike. A scene step can force it: {k, tray:true} or {k, tray:false}. Big, clearly visible things stay map taps.
let TRAY_NEXT=null;// set by runSteps from the step's tray option, read by the next find
// 11/05: a choice that looks like the answer (or is the same kind of thing) teaches nothing: 「the pink notebook」 among notebooks is learned as
// 「pink」, not as 「homework diary」. Notebooks/books/papers, shoes, hand/finger/wrist, foot/ankle, parts of a face, clothes are kept apart.
const LOOKALIKE=[['pencil','mechanical_pencil','colored_pencil','crayon','highlighter','pen'],
 ['notebook','notice_book','textbook','sketchbook','diary','worksheet','book','paper','drawing_paper','envelope','note','card','name','name_tag','photo','picture','poster','map','calendar','sticker'],
 ['handkerchief','tissue','napkin','towel'],['cup','milk_carton','water_bottle','water','milk'],['glue','glue_stick','tape'],['bag','pcase','lunch_box','wallet'],['ball','moon','magnet'],['headphones','earphones','earmuffs'],['clock','alarm_clock','stopwatch'],
 ['hat','hoodie'],['clothes','gym_clothes','hoodie','vest','jacket','shirt','coat'],['shoes','indoor_shoes','slippers','boots'],
 ['hand','finger','palm','wrist','thumb'],['foot','ankle','heel','toe','leg'],['nose','eye','forehead','cheek','face','mouth'],['spoon','ladle'],['trash_can','bucket']];
const lookalike=(a,b)=>a!==b&&LOOKALIKE.some(g=>g.includes(a)&&g.includes(b));
// a picture tray (my bag, a close-up, a step's own list) never shows a look-alike of the answer: it is swapped for a plainly different thing
const TRAY_FILL=['pcase','eraser','water_bottle','handkerchief','pencil','scissors','ruler','umbrella','apple','glue'],BODY_FILL=['ear','knee','hand','foot','eye'];
function noLookalike(k,items){const out=items.filter(q=>q===k||!lookalike(q,k));const n=Math.min(Math.max(items.length,3),5);
 const fill=(BODY_PARTS.has(k)?BODY_FILL:TRAY_FILL).filter(q=>q!==k&&!out.includes(q)&&!lookalike(q,k)&&LANGS[LANG].words[q]);
 while(out.length<n&&fill.length){const q=fill.shift();out.splice(Math.floor(Math.random()*(out.length+1)),0,q)}
 if(!out.includes(k))out.push(k);return out}
function hardToSee(k){const spots=(OBJ[MAP]||[]).filter(o=>o[0]===k);if(!spots.length)return false;
 const under=(x,y)=>npcs.some(n=>n.h&&x>n.x-n.w*.45&&x<n.x+n.w*.45&&y>n.y-n.h&&y<n.y+10);// sprites hang above their foot point (a seated kid's back covers the desk in front)
 return spots.every(o=>o[3]<20||under(o[1],o[2]))}
function trayItems(k){const t=(OBJ[MAP]||[]).find(o=>o[0]===k);const near=(OBJ[MAP]||[]).filter(o=>o[0]!==k&&!lookalike(o[0],k)&&o[0]!=='table'&&o[0]!=='desk'&&o[0]!=='door'&&o[0]!=='stairs'&&o[0]!=='window'&&o[0]!=='blackboard')
  .map(o=>[o[0],t?Math.hypot(o[1]-t[1],o[2]-t[2]):0]).sort((a,b)=>(FOUND.has(b[0])-FOUND.has(a[0]))||a[1]-b[1]).map(o=>o[0]);
 const out=[];for(const q of near.concat([...FOUND]))if(!out.includes(q)&&q!==k&&!lookalike(q,k)&&out.length<4&&LANGS[LANG].words[q])out.push(q);
 out.splice(Math.floor(Math.random()*(out.length+1)),0,k);return out}
{const _findTray=find;
 find=function(k,done,goal,label){const force=TRAY_NEXT;TRAY_NEXT=null;
  const use=force===true||(force!==false&&DAY>=2&&!/^home/.test(MAP)&&(hardToSee(k)||BODY_PARTS.has(k)));
  if(!use)return _findTray(k,done,goal,label);
  const im=new Image();im.onload=()=>bagFind(k,trayItems(k),goal||'「{x}」 찾기',done);im.onerror=()=>_findTray(k,done,goal,label);im.src=`items/${k}.png`}}
// ---- two-step finds (trial, 10/28): tap the place, then pick the thing from a close-up ----
// A thing lying on the map is no longer hunted as a tiny spot: the area around it (and a kid sitting or standing right there)
// opens the close-up tray with the thing and a few others from around it, so small or hidden things are always seen clearly.
// Trial: Haeun's meetings, or every meeting with ?area=all in the address.
const AREA_TRIAL=['haeun'];let AREA=null;
const areaOn=()=>DAY>=2&&!/^home/.test(MAP)&&(/[?&]area=all/.test(location.search)||(SCENE_IDS&&AREA_TRIAL.includes(SCENE_IDS[0])));
{const _findArea=find;
 find=function(k,done,goal,label){AREA=null;const r=_findArea(k,done,goal,label);
  const spots=(OBJ[MAP]||[]).filter(o=>o[0]===k);
  // set at once (a quick tap must already open the close-up); a thing without a cut-out picture stays an ordinary map tap
  if(FIND===k&&areaOn()&&spots.length){const A={k,goal:goal||'「{x}」 찾기',zones:spots.map(o=>[o[1],o[2],Math.max(90,o[3]*2.2)]),
     kids:npcs.filter(n=>n.h&&spots.some(o=>Math.hypot(n.x-o[1],n.y-n.h/2-o[2])<150)).map(n=>n.id)};AREA=A;
   const im=new Image();im.onerror=()=>{if(AREA===A)AREA=null};im.src=`items/${k}.png`}
  return r}}
{const _onTapArea=onTap;
 onTap=function(e){const a=AREA;if(!a||FIND!==a.k||busy||!me||(sayEl&&talkOn))return _onTapArea(e);
  const x=(e.clientX+cam.x)/cam.s,y=(e.clientY+cam.y)/cam.s;
  const z=a.zones.find(([zx,zy,r])=>Math.hypot(x-zx,y-zy)<r);
  const kid=!z&&npcs.find(n=>a.kids.includes(n.id)&&n.h&&x>n.x-n.w*.4&&x<n.x+n.w*.4&&y>n.y-n.h&&y<n.y+10);
  if(!z&&!kid)return _onTapArea(e);
  closeBubble();const at=z||[kid.x,kid.y];walkNear(at[0],at[1]);
  const d=FIND_DONE;
  bagFind(a.k,trayItems(a.k),a.goal,()=>{AREA=null;FIND=null;FIND_DONE=null;const g=document.getElementById('goal');g.onclick=null;g.textContent='';goal=null;tagAll();showBag();d&&d()})}}
// ---- body parts (11/05): a hand, knee or ankle drawn alone on the map looked cut off from a body ----
// it is never drawn there (its tap spot stays) and its find opens the picture tray (above)
const BODY_PARTS=new Set(['hand','finger','knee','ankle','wrist','foot','forehead','ear','eye','nose','elbow','shoulder','toe','heel','palm','cheek','neck','arm','leg']);
function hideBodyParts(){world.querySelectorAll('img.thing,img.laid').forEach(e=>{const k=(e.getAttribute('src')||'').match(/items\/(\w+)\.png/);if(k&&BODY_PARTS.has(k[1]))e.style.display='none'})}
{const _st=showThings;showThings=function(){const r=_st.apply(this,arguments);hideBodyParts();return r}}
{const _lt=layThings;layThings=function(){const r=_lt.apply(this,arguments);hideBodyParts();return r}}
