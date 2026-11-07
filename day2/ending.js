// ---------- the ending (owner 11/06: 결말_반장선거_초안_1106.md 3판) ----------
// Day 16: morning and two friends as usual → after the afternoon lessons the 종례 election (speech, one choice that only changes an evening line)
// → the vote (Minho 4+ meetings: his 「접힌 종이」) → the count on the blackboard (all three numbers) → run-off when two tie → result
// → one of 7 ending scenes → home → the evening (Dad's day) → word review → the ending card. There is no Day 17.
// Votes come from the 30 meetings (MEET, HEART), never from the speech choice; nobody's vote is ever shown.
const ED_CAND=['jiho','sua'],ED_KIDS=['minho','haram','junho','haeun','haneul','yena','youngmin','jihoon','seah','siwoo','yuna','hangyeol','hyeeun'];
const ED_SIDE={};ED_KIDS.forEach((id,i)=>ED_SIDE[id]=i%2?'jiho':'sua');// a fixed side per kid (list order, turn by turn): not their character, never shown
const ED_DAY=16;let ED=null;// this run's result (also kept in FLAGS.ED, so a reload after the count keeps it)
const edM=id=>MEET[id]||0,edH=id=>HEART[id]||0;
const edClose=id=>edM(id)>=3&&edH(id)>=edM(id),edKnown=id=>edM(id)>=1&&edM(id)<=2&&edH(id)>=edM(id),edBff=id=>edM(id)>=8&&edH(id)>=edM(id)*1.5;
// who each of the 13 votes for: close friends + the first half of the known ones (list order) → me; the rest → their side
function edVoters(){const known=ED_KIDS.filter(edKnown),mine=new Set(ED_KIDS.filter(edClose).concat(known.slice(0,Math.floor(known.length/2))));
 const v={};for(const id of ED_KIDS)v[id]=mine.has(id)?'me':ED_SIDE[id];return v}
function edCount(){const v=edVoters(),n={me:1,sua:1,jiho:1};for(const id in v)n[v[id]]++;return n}
// run-off between two: the same votes; a vote whose candidate is out goes to me if that kid is friendly (met, heart ≥ meetings), else to the other;
// the third candidate: to me if I am their close friend, else to the other one; I (when out) go to the one with more heart. Still tied → drawing lots (owner 11/07)
function edRunoff(a,b){const v=edVoters(),pair=[a,b],n={[a]:1,[b]:1};const other=x=>pair.find(p=>p!==x&&p!=='me')||pair.find(p=>p!==x);
 for(const id in v){let c=v[id];if(!pair.includes(c))c=pair.includes('me')&&edM(id)>=1&&edH(id)>=edM(id)?'me':pair.includes(ED_SIDE[id])?ED_SIDE[id]:other('me');n[c]++}
 const third=['me','sua','jiho'].find(x=>!pair.includes(x));
 if(third==='me')n[edH('sua')>=edH('jiho')?'sua':'jiho']++;else n[pair.includes('me')&&edClose(third)?'me':other('me')]++;
 const lots=n[a]===n[b];let win=n[a]>n[b]?a:n[b]>n[a]?b:(Math.random()<.5?a:b);return{a,b,va:n[a],vb:n[b],win,lots}}// still tied → lots (kept in FLAGS.ED)
function edResult(){const n=edCount();let order=['me','sua','jiho'].sort((x,y)=>n[y]-n[x]||['jiho','sua','me'].indexOf(x)-['jiho','sua','me'].indexOf(y));let run=null;
 for(let i=0;i<2;i++)if(n[order[i]]===n[order[i+1]]){run=edRunoff(order[i],order[i+1]);if(run.win!==order[i])[order[i],order[i+1]]=[order[i+1],order[i]];break}
 const rank=order.indexOf('me')+1,bffs=D2IDS.filter(edBff).sort((x,y)=>edH(y)-edH(x)||edM(y)-edM(x)),met=D2IDS.filter(id=>edM(id)>=1).length;
 let ed;if(rank===1&&n.me-n[order[1]]>=2)ed=1;else if(rank<=2)ed=order.slice(0,2).includes('sua')?4:6;
 else ed=bffs.length===1?2:bffs.length>=2?3:met>=6?5:7;
 // a friend's line in the scene: the friends with the most heart (Sua and Jiho are in the scenes themselves)
 const f1=ED_KIDS.filter(id=>edM(id)>=1).sort((x,y)=>edH(y)-edH(x)||edM(y)-edM(x)).slice(0,2);
 return{ed,n,run,order,rank,bffs:bffs.slice(0,2),f1,met,full:D2IDS.filter(id=>edM(id)>=15).length,speech:null}}
// tokens in the ending lines
const edName=id=>id==='me'?tr('{SN}'):nm(id);
function edKo(id,p){const w=NAME[id]||'';if(!p)return w;const c=w.charCodeAt(w.length-1)-0xAC00;return(c>=0&&c<=11171&&c%28?w+'이':w)+p}
{const _t=tr;tr=function(s){const t=_t(s);if(t==null||typeof t!=='string'||t.indexOf('{')<0)return t;const R=ED||{},ko=UI==='ko';
 const who={P1:R.order&&R.order[0],P2:R.order&&R.order[1],B1:R.bffs&&R.bffs[0],B2:R.bffs&&R.bffs[1]};
 return t.replace(/\{(P1|P2|B1|B2)(?::([^}]*))?\}/g,(m,k,p)=>{const id=who[k];if(!id)return'';if(id==='me')return edName('me');return ko?edKo(id,p):nm(id)})
  .replace(/\{V([JSM])\}/g,(m,k)=>R.n?R.n[{J:'jiho',S:'sua',M:'me'}[k]]:'')
  .replace(/\{HW@(\w+)\}/g,(m,k)=>{const L=LANGS[ko?LANG:UI]||LANGS.ko;return(L.words&&L.words[k])||LANGS.ko.words[k]||k})}}
const edSay=(ls,done)=>say(ls.filter(Boolean),done);
function edFr(id){const L=EDL.FR[id];if(!L)return[];const m=edM(id);return L[m>=15?2:m>=6?1:0]}
// the blackboard: names, 正 strokes, numbers (all three, or the two in the run-off)
{const st=document.createElement('style');st.textContent=`
.edboard{background:#2f5d4a;border:10px solid #b08a5a;border-radius:14px;padding:14px 12px;color:#f4f1e6;box-shadow:inset 0 0 0 2px #24493a;margin:4px 0 10px;text-align:left}
.edrow{display:flex;align-items:center;gap:10px;padding:8px 4px;border-bottom:2px dashed rgba(244,241,230,.25)}.edrow:last-child{border:0}
.edrow b{min-width:72px;font-size:20px}.edrow .tl{flex:1;font-size:26px;letter-spacing:2px;word-break:break-all;font-family:serif}.edrow i{font-style:normal;font-weight:800;font-size:26px;min-width:30px;text-align:right}
.edcard h2{margin:4px 0 2px}.edcard .edone{font-size:17px;margin:4px 0 10px}.edseen{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:10px 0}
.edseen span{border:2px solid var(--line);border-radius:99px;padding:3px 10px;font-size:13px;font-weight:700;color:var(--ink);background:#fff}.edseen span.no{opacity:.35}.edseen span.now{border-color:var(--mint);background:#eafff6}
.edcard .edstat{color:#8a7a6a;font-size:14px;margin:6px 0}`;document.head.appendChild(st)}
function edTally(v){return '正'.repeat(Math.floor(v/5))+(['','一','丅','下','止'][v%5])}
function edBoard(rows,done){const m=document.getElementById('modal'),c=document.getElementById('mcard');busy=true;setGoal('');
 c.className='card';c.innerHTML=`<div id="edBoard" class="edboard">${rows.map(([n,v])=>`<div class="edrow"><b>${n}</b><span class="tl">${edTally(v)}</span><i>${v}</i></div>`).join('')}</div><button class="big" id="edgo">▶</button>`;
 m.classList.add('on');const born=performance.now();document.getElementById('edgo').onclick=()=>{if(performance.now()-born<400)return;m.classList.remove('on');busy=false;done()}}
const edRow=id=>[id==='me'?edName('me'):tr(id==='sua'?'양수아':'백지호'),ED.n[id]];
// ---- the 종례 ----
function edElection(){stage='d2_elect';setGoal('');ED=edResult();FLAGS.ED=ED;const L=EDL;
 const P=n=>()=>showPic(n),X=()=>showPic(null);const open=[P('ed_open')].concat(L.open,edM('jiho')>=4?L.jiho4:[],L.sua,edM('sua')>=7?L.sua7:[],[P('ed_speech')],L.me);
 fade(()=>{if(MAP!=='class')load('class');bgm('day');scene('lesson_3',open,()=>ask('어떻게 할까?',L.choices,o=>{sceneEl.classList.remove('on');ED.speech=o.k;FLAGS.ED=ED;
  runSteps(o.r.concat(L.close),null,edVote)}),true)})}
function edVote(){const L=EDL,v=EP.minho_vote;
 const rest=()=>runSteps([()=>showPic('ed_vote')].concat(L.line,edM('hyeeun')>=1?L.hyeeun:[]),null,edCountUp);
 if(v&&edM('minho')>=4&&!FLAGS.minho_vote){SCENE_EP=v;SCENE_IDS=['minho'];layThings((v.things||{}).class||[]);
  runSteps(v.pre,null,()=>{const go=()=>ask(v.ask||'어떻게 할까?',v.choices,o=>{sceneEl.classList.remove('on');FLAGS.minho_vote=1;
   runSteps((o.r||[]).concat(v.post||[]),o.k,()=>{Object.entries(o.pts||{}).forEach(([p,n])=>heart(p,n));SCENE_EP=null;SCENE_IDS=null;rest()})});
   if(v.scene)scene(v.scene,[],go,true);else go()});return}
 layThings([['box',1180,262,80,'ballot_box'],['paper',1380,300,36]]);runSteps(L.vote,null,rest)}
function edCountUp(){const L=EDL,R=ED;runSteps(L.count,null,()=>edBoard(['jiho','sua','me'].map(edRow),()=>{
 const after=()=>{const r=R.rank===1?L.r1:R.rank===2?L.r2:L.r3;edSay(r.concat(L.thanks,edM('siwoo')>=1?L.siwoo:[]),edScene)};
 edSay(L.said,()=>{if(!R.run){after();return}edSay(L.runoff,()=>edBoard([[R.run.a,R.run.va],[R.run.b,R.run.vb]].map(([id,v])=>[id==='me'?edName('me'):tr(id==='sua'?'양수아':'백지호'),v]),()=>R.run.lots?edSay(L.lots,after):after()))})}))}
// ---- the ending scene, on its own place with only its kids (no way out there: the day goes home after it) ----
function edPlace(map,kids,lines,done){if(map===MAP&&map==='class'){edSay(lines,done);return}
 fade(()=>{load(map);world.querySelectorAll('.exitsign').forEach(e=>e.remove());for(const n of npcs)n.el.remove();npcs=[];const st=(MAPS[map]&&MAPS[map].start)||[800,600];
  kids.forEach((id,i)=>npcs.push(sprite(id,st[0]+(i%2?-1:1)*120*(1+(i>>1)),st[1]+10)));setTimeout(tagAll,300);edSay(lines,done)})}
function edScene(){const R=ED,L=EDL,e=R.ed,iWon=R.rank===1,f=R.f1,fr=f[0]?edFr(f[0]):[],home=()=>{fade(d2Home)};
 const pair=R.order.slice(0,2).find(x=>x!=='me');
 const P=n=>()=>showPic(n),X=()=>showPic(null);
 if(e===1){edSay([P(pair==='sua'?'ed_1s':'ed_1j')].concat(L.ED1[pair],[X],fr,L.ED1.end),home);return}
 if(e===4||e===6){const S=e===4?L.ED4:L.ED6;edPlace(S.map,S.kids,[P(e===4?'ed_4':'ed_6')].concat(S.pre,iWon?S.me:S.them,[X],S.post,fr,S.end),home);return}
 if(e===2){const b=R.bffs[0];if(b==='sua'){FLAGS.WIN_sua=true;const s=EP.sua_result,bl=(s.post.find(x=>x.only&&x.only[0]==='bff_sua')||{}).lines||[];
   edPlace('hall',['sua'],[],()=>runSteps(s.pre.concat(bl),'bff_sua',home));return}
  edPlace(MAPS.gatesun?L.ED2.map:'gate',[b],[P('ed_2')].concat(L.ED2.pre,[X],b==='jiho'?L.ED2.jiho:EDL.FR[b]?EDL.FR[b][edM(b)>=15?2:1]:[],L.ED2.end),home);return}
 if(e===3){const[b1,b2]=R.bffs,k=R.bffs.find(x=>EDL.FR[x]),line=k?EDL.FR[k][edM(k)>=15?2:1]:R.bffs.includes('jiho')?L.ED2.jiho:[];
  const lib=()=>edPlace('library',[b1,b2],[P('ed_3')].concat(L.ED3.pre,[X],line,L.ED3.end),home);
  if(R.bffs.includes('sua'))edPlace('hall',['sua'],L.suaShort,lib);else lib();return}
 if(e===5){edSay([P('ed_5')].concat(L.ED5.pre,[X],fr,f[1]?edFr(f[1]):[],L.ED5.end),home);return}
 edSay([P('ed_7')].concat(L.ED7.pre,[X],fr,L.ED7.end),home)}
// ---- the evening: the two friends one line each (their part's first line of mine), then the election, then the speech ----
{const _d=dinner2;dinner2=function(){if(DAY!==ED_DAY||!FLAGS.ED)return _d.apply(this,arguments);ED=FLAGS.ED;const L=EDL,R=ED,e=R.ed,iWon=R.rank===1;
 let ls=L.eve.slice();for(const id of PICKS){const l=evePart(id).find(x=>Array.isArray(x)&&x[0]==='me');if(l)ls.push(l)}
 ls=ls.concat(L.eveAsk,e===1?L.E1:e===4?(iWon?L.E4me:L.E4them):e===6?(iWon?L.E6me:L.E6them):L.Elost.concat(e===2?(R.bffs[0]==='sua'?L.E2sua:L.E2):e===3?L.E3:e===5?L.E5:L.E7),L.speech[R.speech]||[]);
 scene('dinner'+(HERO==='hero_m'?'_m':''),ls,()=>{dinnerDone=true;end2()})}}
// ---- word review, then the ending card (instead of the day-end card) ----
const ED_SEEN_KEY='haru_endings';
function edSeen(){try{return JSON.parse(localStorage.getItem(ED_SEEN_KEY)||'[]')}catch(e){return[]}}
function edSave(){try{saveDay();const s=JSON.parse(localStorage.getItem('haru_save')||'null');if(!s)return;s.day=ED_DAY;delete s.mid;
  s.end={r:ED,start:DAYMEET[ED_DAY]||null,heart0:DAYHEART[ED_DAY]||null};localStorage.setItem('haru_save',JSON.stringify(s));
  const seen=edSeen();if(!seen.includes(ED.ed)){seen.push(ED.ed);localStorage.setItem(ED_SEEN_KEY,JSON.stringify(seen))}}catch(e){}}
function edCard(){const R=ED,m=document.getElementById('modal'),c=document.getElementById('mcard'),seen=edSeen(),C=EDL.CARD,D=(t,a,b)=>tr(t).replace('{n}',a).replace('{k}',b);
 const hs=Object.entries(HEART).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).map(([i,v])=>`${nm(i)} ♥${v}`).join(' · ')||tr('아직 없음');
 c.className='card edcard';c.innerHTML=`<div id="edCard"><h2>${D('엔딩 {n}',R.ed)} 「${tr(C[R.ed-1][0])}」</h2><p class="edone">${tr(C[R.ed-1][1])}</p>
  <p class="edstat">${D('만난 친구 {n}명 · 끝까지 만난 친구 {k}명',R.met,R.full)}</p><p class="edstat">${tr('친해진 친구')}: ${hs}</p>
  <p class="edstat"><b>${D('본 엔딩 {n} / 7',seen.length)}</b></p><div class="edseen">${C.map((x,i)=>`<span class="${seen.includes(i+1)?(i+1===R.ed?'now':''):'no'}">${i+1}. ${tr(x[0])}</span>`).join('')}</div>
  <button class="big" id="edNew">${tr('처음부터 다시 — 다른 친구도 만나 보기')}</button><div class="minor"><button class="ghost" id="edAgain">${D('{n}일차 다시 하기',ED_DAY)}</button></div></div>`;
 m.classList.add('on');busy=true;c.classList.add('lock');setTimeout(()=>c.classList.remove('lock'),1100);
 document.getElementById('edNew').onclick=()=>{try{localStorage.removeItem('haru_save')}catch(e){}location.href=location.pathname};
 document.getElementById('edAgain').onclick=()=>{c.className='card';const s=(()=>{try{return JSON.parse(localStorage.getItem('haru_save')||'null')}catch(e){return null}})(),E=s&&s.end;
  const h0=DAYHEART[ED_DAY]||(E&&E.heart0);if(h0){for(const k in HEART)delete HEART[k];Object.assign(HEART,h0)}if(!DAYMEET[ED_DAY]&&E&&E.start)DAYMEET[ED_DAY]=E.start;ED=null;startDay(ED_DAY)}}
{const _e=end2;end2=function(){if(DAY!==ED_DAY||!FLAGS.ED)return _e.apply(this,arguments);ED=FLAGS.ED;edSave();
 const show=()=>{edSave();edCard()};if(!RV_DONE.has(DAY)&&!/[?&]norv/.test(location.search)){RV_DONE.add(DAY);wordReview(show)}else show()}}
// the afternoon of Day 16 ends in the election instead of 「방과 후!」
{const _l=lessons;lessons=function(part){if(DAY===ED_DAY&&part==='pm'&&!FLAGS.ED){if(typeof saveMid==='function')saveMid('class');setGoal('');busy=true;edElection();return}return _l.apply(this,arguments)}}
// 「이어 하기」 after the ending shows the ending card again (there is no Day 17); an older save past Day 16 plays Day 16
{const _c=contGame;contGame=function(s){if(s&&s.end&&s.end.r){MEET={...(s.meet||{})};FLAGS={...(s.flags||{})};ED=s.end.r;FLAGS.ED=ED;if(s.end.heart0)DAYHEART[ED_DAY]={...s.end.heart0};if(s.end.start)DAYMEET[ED_DAY]=s.end.start;
  setDay(ED_DAY);load('home_pm');edCard();return}
 if(s&&s.day>ED_DAY){s={...s,day:ED_DAY};delete s.mid}return _c.call(this,s)}}
{const _sd=startDay;startDay=function(n){if(n===ED_DAY){ED=null;if(FLAGS)delete FLAGS.ED}const r=_sd.apply(this,arguments);if(n===ED_DAY&&FLAGS)delete FLAGS.ED;return r}}

// ending pictures (drawn 11/07 with the Gemini API); the ones that show me have a boy and a girl version
for(const n of ['ed_open','ed_speech','ed_1s','ed_1j','ed_4','ed_6','ed_5'])HEROPIC.add(n);
