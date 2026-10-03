// Full-page screenshots of routes at 1440 and 390 for a before/after review (see morning.py).
// Usage: BASE=http://localhost:5173 OUT=./review node shots.cjs <tag: before|after> /route1 /route2 ...
const {chromium}=require(require('path').resolve(__dirname,'../../../client/node_modules/@playwright/test'));
const [,,tag,...routes]=process.argv;const OUT=process.env.OUT||'./review';
require('fs').mkdirSync(`${OUT}/${tag}`,{recursive:true});
(async()=>{const b=await chromium.launch({channel:'chrome'});
for(const route of routes) for(const w of [1440,390]){const p=await b.newPage({viewport:{width:w,height:900}});
await p.route(u=>new URL(u).pathname.startsWith('/api/'),r=>r.fulfill({status:200,contentType:'application/json',body:'[]'}));
await p.goto((process.env.BASE||'http://localhost:5173')+route,{waitUntil:'networkidle'});
await p.evaluate(async()=>{document.documentElement.style.scrollBehavior='auto';document.querySelectorAll('img').forEach(i=>i.loading='eager');for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});
await p.waitForTimeout(800);
await p.screenshot({path:`${OUT}/${tag}/${route.replace(/\W+/g,'_').replace(/^_|_$/g,'')||'home'}-${w}.png`,fullPage:true});await p.close()}
await b.close()})();
