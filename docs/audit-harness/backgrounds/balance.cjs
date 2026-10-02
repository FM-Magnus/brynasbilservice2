// Finds unbalanced rows: side-by-side siblings (grid/flex rows, 2-4 items, >= 500 px wide) whose heights differ a lot,
// and boxes with a lot of empty space under their content (dead white). Read-only.
// Usage: BASE=http://localhost:5173 node balance.cjs /route [/route ...]   -> prints findings per width (1440 and 768)
const {chromium}=require(require('path').resolve(__dirname,'../../../client/node_modules/@playwright/test'));
const routes=process.argv.slice(2);
(async()=>{const b=await chromium.launch({channel:'chrome'});
for(const route of routes) for(const w of [1440,768]){const p=await b.newPage({viewport:{width:w,height:900}});
await p.route(u=>new URL(u).pathname.startsWith('/api/'),r=>r.fulfill({status:200,contentType:'application/json',body:'[]'}));
await p.goto((process.env.BASE||'http://localhost:5173')+route,{waitUntil:'networkidle'});
await p.evaluate(async()=>{document.documentElement.style.scrollBehavior='auto';document.querySelectorAll('img').forEach(i=>i.loading='eager');for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,50))}scrollTo(0,0)});await p.waitForTimeout(600);
const res=await p.evaluate(()=>{const out=[];const name=e=>e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/)[0]:'');
const content=e=>{let m=0;const top=e.getBoundingClientRect().top;e.querySelectorAll('*').forEach(d=>{const cs=getComputedStyle(d);if(cs.position==='absolute'||cs.visibility==='hidden'||cs.display==='none')return;if(d.closest('picture'))return;const r=d.getBoundingClientRect();if(r.height>0&&r.width>0)m=Math.max(m,r.bottom-top)});return m};
document.querySelectorAll('main *').forEach(el=>{const cs=getComputedStyle(el);if(!/grid|flex/.test(cs.display))return;if(cs.display.includes('flex')&&cs.flexDirection.startsWith('column'))return;
 const kids=[...el.children].filter(k=>{const c=getComputedStyle(k);const r=k.getBoundingClientRect();return c.display!=='none'&&c.position!=='absolute'&&r.height>40&&r.width>150});
 if(kids.length<2||kids.length>4)return;const rs=kids.map(k=>k.getBoundingClientRect());if(el.getBoundingClientRect().width<500)return;
 const tops=rs.map(r=>Math.round(r.top));if(Math.max(...tops)-Math.min(...tops)>6)return; // not one row
 const hs=rs.map(r=>r.height),mx=Math.max(...hs),mn=Math.min(...hs);
 const slack=kids.map((k,i)=>Math.round(rs[i].height-content(k)-parseFloat(getComputedStyle(k).paddingBottom||0)));
 const flags=[];if(mx>0&&(mx-mn)/mx>0.15&&mx-mn>60)flags.push(`heights ${hs.map(Math.round).join('/')} differ ${(100*(mx-mn)/mx).toFixed(0)}%`);
 slack.forEach((s,i)=>{if(s>70&&getComputedStyle(kids[i]).backgroundColor!=='rgba(0, 0, 0, 0)')flags.push(`${name(kids[i])} has ${s}px empty under its content`)});
 if(flags.length)out.push({row:name(el),y:Math.round(scrollY+rs[0].top),flags})});
return out});
console.log(`${route} @${w}: ${res.length?'':'no findings'}`);res.forEach(r=>console.log(`  y=${r.y} ${r.row}: ${r.flags.join('; ')}`));await p.close()}
await b.close()})();
