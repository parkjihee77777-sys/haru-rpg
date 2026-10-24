// ---------- my bag (loaded after the per-meeting files) ----------
// When the hero takes out their OWN thing, the map is not searched: their bag opens on screen as a tray of cut-out pictures.
// Same find rules: tapping a thing says its name, the button says this mission's action with the target word,
// the right thing goes on, a wrong one only buzzes. A step {k, goal, bag:[…]} in a scene uses it; so does Mom's notebook review.
function bagFind(k,items,goalText,done){busy=true;closeBubble();const m=document.getElementById('modal'),c=document.getElementById('mcard');
 const goalTr=()=>tr(goalText||'「{x}」 꺼내기');let sel=null;
 c.innerHTML=`<h2>${goalTr().replace('{x}',wordOf(k)+' <button class="spk" id="bagagain">🔊</button>')}</h2><div class="ztray">${items.map(q=>`<button class="zit" data-k="${q}"><img src="items/${q}.png" alt=""></button>`).join('')}</div><div class="zok"></div>`;
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
