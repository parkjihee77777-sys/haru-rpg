// ---------- my bag (loaded after the per-meeting files) ----------
// When the hero takes out their OWN thing, the map is not searched: their bag opens on screen as a tray of cut-out pictures.
// Same find rules: tapping a thing says its name, the button says this mission's action with the target word,
// the right thing goes on, a wrong one only buzzes. A step {k, goal, bag:[…]} in a scene uses it; so does Mom's notebook review.
function bagFind(k,items,goalText,done){busy=true;closeBubble();const m=document.getElementById('modal'),c=document.getElementById('mcard');
 const goalTr=()=>tr(goalText||'「{x}」 꺼내기');let sel=null;
 c.innerHTML=`<h2>${goalTr().replace('{x}',wordOf(k)+' <button class="spk" id="bagagain">🔊</button>')}</h2><div class="ztray">${items.map(q=>`<button class="zit" data-k="${q}"><img src="items/${q}.png" alt="" onerror="this.parentNode.remove()"></button>`).join('')}</div><div class="zok"></div>`;
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
const LOOKALIKE=[['pencil','mechanical_pencil','colored_pencil','crayon','highlighter','pen'],['notebook','sketchbook','paper','envelope','note','book','card','photo','picture','poster','map','calendar'],
 ['handkerchief','tissue','napkin'],['cup','milk_carton','water_bottle','water','milk'],['glue','glue_stick','tape'],['bag','pcase','lunch_box','wallet'],['ball','moon'],['headphones','earphones','earmuffs'],['clock','alarm_clock','stopwatch'],['hat','hoodie']];
const lookalike=(a,b)=>LOOKALIKE.some(g=>g.includes(a)&&g.includes(b));
function hardToSee(k){const spots=(OBJ[MAP]||[]).filter(o=>o[0]===k);if(!spots.length)return false;
 const under=(x,y)=>npcs.some(n=>n.h&&x>n.x-n.w*.45&&x<n.x+n.w*.45&&y>n.y-n.h&&y<n.y+10);// sprites hang above their foot point (a seated kid's back covers the desk in front)
 return spots.every(o=>o[3]<20||under(o[1],o[2]))}
function trayItems(k){const t=(OBJ[MAP]||[]).find(o=>o[0]===k);const near=(OBJ[MAP]||[]).filter(o=>o[0]!==k&&!lookalike(o[0],k)&&o[0]!=='table'&&o[0]!=='desk'&&o[0]!=='door'&&o[0]!=='stairs'&&o[0]!=='window'&&o[0]!=='blackboard')
  .map(o=>[o[0],t?Math.hypot(o[1]-t[1],o[2]-t[2]):0]).sort((a,b)=>(FOUND.has(b[0])-FOUND.has(a[0]))||a[1]-b[1]).map(o=>o[0]);
 const out=[];for(const q of near.concat([...FOUND]))if(!out.includes(q)&&q!==k&&!lookalike(q,k)&&out.length<4&&LANGS[LANG].words[q])out.push(q);
 out.splice(Math.floor(Math.random()*(out.length+1)),0,k);return out}
{const _findTray=find;
 find=function(k,done,goal,label){const force=TRAY_NEXT;TRAY_NEXT=null;
  const use=force===true||(force!==false&&DAY>=2&&!/^home/.test(MAP)&&hardToSee(k));
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
