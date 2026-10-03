// Hides the text inside <containerSelector> and saves a full-page screenshot per width and match to $OUT (default ./out)
// as c_<width>_<index>.png/.json. Then run contrast.py. Usage: BASE=http://localhost:5173 node contrast.cjs <path> '<selector>'
// Excludes .bb-btn/button/.bb-accent text (those carry their own backgrounds).
const {chromium}=require(require('path').resolve(__dirname,'../../../client/node_modules/@playwright/test'));
const {execFileSync}=require('child_process');
const [,,path,sel]=process.argv;
const OUT=process.env.OUT||'./out';require('fs').mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({channel:'chrome'});const out=[];
for(const w of [1440,768,390]){const p=await b.newPage({viewport:{width:w,height:900}});
await p.route(u=>new URL(u).pathname.startsWith('/api/'),r=>r.fulfill({status:200,contentType:'application/json',body:'[]'}));
await p.goto((process.env.BASE||'http://localhost:5173')+path,{waitUntil:'networkidle'});
await p.evaluate(()=>document.querySelectorAll('img').forEach(i=>i.loading='eager'));if(process.env.NOPHOTO)await p.addStyleTag({content:'.bilservice__band-photo{display:none!important}'});await p.waitForTimeout(700);
const n=await p.locator(sel).count();
for(let k=0;k<n;k++){
 await p.evaluate(([sel,k])=>{document.documentElement.style.scrollBehavior='auto';document.querySelectorAll(sel)[k].scrollIntoView({block:'center'})},[sel,k]);await p.waitForTimeout(400);
 const info=await p.evaluate(([sel,k])=>{document.documentElement.style.scrollBehavior='auto';const c=document.querySelectorAll(sel)[k];c.scrollIntoView({block:'center'});
  const cs=getComputedStyle(c).color;
  await_ok=0;const texts=[...c.querySelectorAll('h1,h2,h3,h4,p,li,dt,dd,a,span,strong,small')].filter(e=>!e.closest('.bb-btn,button,.bb-accent')&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()));
  texts.forEach(e=>{e.dataset.o=e.style.visibility;e.style.visibility='hidden'});
  const boxes=texts.map(e=>{const r=e.getBoundingClientRect();const m=getComputedStyle(e).color.match(/[\d.]+/g).map(Number);return [r.left,r.top+scrollY,r.width,r.height,m[0],m[1],m[2]]});return {boxes,color:cs}},[sel,k]);
 await p.waitForTimeout(150);
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(250);const shot=await p.screenshot({fullPage:true});require('fs').writeFileSync(`${OUT}/c_${w}_${k}.png`,shot);
 require('fs').writeFileSync(`${OUT}/c_${w}_${k}.json`,JSON.stringify(info));
 await p.evaluate(([sel,k])=>{document.querySelectorAll(sel)[k].querySelectorAll('[data-o]').forEach(e=>e.style.visibility='')},[sel,k]);
}
await p.close()}
await b.close();
})();
