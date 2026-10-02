// Screenshots one section at 1440/768/390 and prints its position and horizontal overflow.
// Usage: BASE=http://localhost:5173 OUT=./out node sec.cjs <path> '<selector>' <tag> [index]  ->  $OUT/<tag>-<width>.png
const {chromium}=require(require('path').resolve(__dirname,'../../../client/node_modules/@playwright/test'));
const [,,path,sel,tag,idx='0']=process.argv;
require('fs').mkdirSync(process.env.OUT||'./out',{recursive:true});
(async()=>{const b=await chromium.launch({channel:'chrome'});
for(const w of [1440,768,390]){const p=await b.newPage({viewport:{width:w,height:900}});
await p.route(u=>new URL(u).pathname.startsWith('/api/'),r=>r.fulfill({status:200,contentType:'application/json',body:'[]'}));
await p.goto((process.env.BASE||'http://localhost:5173')+path,{waitUntil:'networkidle'});
await p.evaluate(()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');document.documentElement.style.scrollBehavior='auto'});await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}scrollTo(0,0)});await p.waitForSelector(sel,{state:'attached',timeout:10000});await p.waitForTimeout(800);
const r=await p.evaluate(([sel,i])=>{const e=document.querySelectorAll(sel)[i];const q=e.getBoundingClientRect();return {y:scrollY+q.top,h:q.height,over:document.documentElement.scrollWidth-innerWidth}},[sel,+idx]);
console.log(tag,w,JSON.stringify(r));
await p.screenshot({path:`${process.env.OUT||'./out'}/${tag}-${w}.png`,fullPage:true,clip:{x:0,y:Math.max(0,r.y-30),width:w,height:Math.min(r.h+60,1800)}});await p.close()}
await b.close()})()
