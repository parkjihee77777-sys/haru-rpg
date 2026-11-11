// (11/10 owner) visit stats: where people come from and how many — sent to noveltoeic.com/api/haru, seen at noveltoeic.com/haru-stats
// sends only a random device id, the source, the chosen language and the day reached. Tester devices and robots are not counted.
{
const URL_='https://www.noveltoeic.com/api/haru';
// (11/10 owner) tester-mode visits count too (institutions may have the test link), marked 「- 테스트판」; only the owner's own devices (?me=1, remembered; ?me=0 undoes) are left out
let off=false,tester=false;try{const q=new URLSearchParams(location.search).get('me');if(q==='1')localStorage.setItem('haru_me','1');if(q==='0')localStorage.removeItem('haru_me');off=localStorage.getItem('haru_me')==='1';tester=localStorage.getItem('haru_test')==='1'}catch(e){}
if(navigator.webdriver||/^(localhost|127\.)/.test(location.hostname)&&!/stattest=1/.test(location.search))off=true;
let vid='';try{vid=localStorage.getItem('haru_vid')||'';if(!vid){vid=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('haru_vid',vid)}}catch(e){vid='x'+Math.random().toString(36).slice(2)}
// (11/11 owner) some mail programs re-encode a Korean ?from= tag in the old Korean code (EUC-KR), which URLSearchParams turns into garbage (「ٹȭ」 = 외대다문화):
// read the raw %XX bytes ourselves — UTF-8 if they are valid UTF-8, otherwise EUC-KR
function param(name){const m=new RegExp('[?&]'+name+'=([^&#]*)').exec(location.search);if(!m)return '';const raw=m[1].replace(/\+/g,' ');
 try{return decodeURIComponent(raw)}catch(e){}
 try{const b=[];raw.replace(/%([0-9a-f]{2})|([^%])/gi,(x,h,c)=>{if(h)b.push(parseInt(h,16));else for(const y of new TextEncoder().encode(c))b.push(y);return ''});return new TextDecoder('euc-kr').decode(new Uint8Array(b))}catch(e){}
 return new URLSearchParams(location.search).get(name)||''}
function src(){const u=param('utm_source')||param('from')||param('src');if(u)return u;
 try{const r=document.referrer&&new URL(document.referrer).hostname.replace(/^www\./,'');if(r&&r!==location.hostname)return r}catch(e){}return ''}
function send(o){if(off)return;o.v=vid;const b=JSON.stringify(o);
 try{fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:b,keepalive:true,mode:'cors'}).catch(()=>{})}catch(e){}}
const sent=new Set();function once(e,d){const k=e+d;if(sent.has(k))return;sent.add(k);const o={e,d};if(e==='day'&&d===1)try{o.l=UI+'/'+LANG}catch(x){}send(o)}
addEventListener('load',()=>setTimeout(()=>send({e:'open',s:(src()||'바로 들어옴')+(tester?' - 테스트판':'')}),500));
// day 1 starts when a language is picked; later days through startDay
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.langs button'))setTimeout(()=>once('day',1),300)},true);
if(typeof startDay==='function'){const _s=startDay;startDay=function(n){once('day',n);return _s.apply(this,arguments)}}
if(typeof end2==='function'){const _e=end2;end2=function(){once('end',DAY);return _e.apply(this,arguments)}}
if(typeof end==='function'){const _f=end;end=function(){once('end',DAY);return _f.apply(this,arguments)}}
}
