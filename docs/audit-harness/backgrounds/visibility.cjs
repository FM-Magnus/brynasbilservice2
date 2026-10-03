// Is the photo still visible? Screenshots a container with its text hidden, once as designed and once with only the
// photo layers removed (url()/image-set() background layers dropped, <img> hidden; gradient veils and pseudo-element
// veils stay). Then run visibility.py.
// Usage: BASE=http://localhost:5173 OUT=./out node visibility.cjs <path> '<selector>'   (first match, 1440/768/390)
const {chromium}=require(require('path').resolve(__dirname,'../../../client/node_modules/@playwright/test'));
const [,,path,sel]=process.argv;
const OUT=process.env.OUT||'./out';require('fs').mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({channel:'chrome'});
for(const w of [1440,768,390]){const p=await b.newPage({viewport:{width:w,height:900}});
await p.route(u=>new URL(u).pathname.startsWith('/api/'),r=>r.fulfill({status:200,contentType:'application/json',body:'[]'}));
await p.goto((process.env.BASE||'http://localhost:5173')+path,{waitUntil:'networkidle'});
await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';document.querySelectorAll('img').forEach(i=>i.loading='eager')});await p.waitForTimeout(700);
const prep=async()=>p.evaluate(sel=>{const c=document.querySelector(sel);c.scrollIntoView({block:'center'});
 c.querySelectorAll('h1,h2,h3,h4,p,li,dt,dd,a,span,strong,small,button,label,svg').forEach(e=>{e.style.visibility='hidden'});
 const r=c.getBoundingClientRect();return {x:r.left,y:r.top+scrollY,w:r.width,h:r.height}},sel);
const shot=async name=>{await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(200);const r=await p.evaluate(sel=>{const r=document.querySelector(sel).getBoundingClientRect();return {x:r.left,y:r.top+scrollY,w:r.width,h:r.height}},sel);
 await p.screenshot({path:`${OUT}/v_${w}_${name}.png`,fullPage:true,clip:{x:Math.max(0,r.x),y:r.y,width:Math.min(r.w,w),height:r.h}})};
await prep();await shot('with');
await p.evaluate(sel=>{const c=document.querySelector(sel);
 [c,...c.querySelectorAll('*')].forEach(el=>{const bg=getComputedStyle(el).backgroundImage;if(bg&&bg!=='none'&&/url\(|image-set\(/.test(bg)){const layers=[];let d=0,cur='';for(const ch of bg){if(ch==='(')d++;if(ch===')')d--;if(ch===','&&d===0){layers.push(cur.trim());cur=''}else cur+=ch}layers.push(cur.trim());
  const keep=layers.filter(l=>!/url\(|image-set\(/.test(l));el.style.setProperty('background-image',keep.length?keep.join(', '):'none','important')}});
 c.querySelectorAll('img').forEach(i=>i.style.setProperty('visibility','hidden','important'))},sel);
await shot('without');await p.close()}
await b.close()})();
