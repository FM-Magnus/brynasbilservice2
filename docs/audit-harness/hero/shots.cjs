// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
// usage: S=... node shots.cjs LABEL  -> first-screen screenshots of all routes at 1280x720, 1440x800, 390x844
const { chromium } = require(REPO + '/client/node_modules/@playwright/test'); const fs = require('fs'); const S = process.env.S + '/hero-phase0/shots2/'; const label = process.argv[2];
const main = fs.readFileSync(REPO + '/client/src/main.tsx', 'utf8');
const routes = [...main.matchAll(/<Route path="([^"]+)" element=\{<(?!Navigate)/g)].map(m => m[1]).filter(r => r !== '/admin' && r !== '*'); // '*' is the 404 fallback, not a page
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] });
  for (const [name, w, h] of [['l1280x720', 1280, 720], ['l1440x800', 1440, 800], ['m390x844', 390, 844]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', hasTouch: w < 500, isMobile: w < 500 })).newPage(); await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    for (const route of routes) { await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.evaluate(async () => { const imgs = [...document.images]; imgs.forEach(i => { i.loading = 'eager'; }); await Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.addEventListener('load', r); i.addEventListener('error', r); setTimeout(r, 4000); }))); }); await p.waitForTimeout(300); await p.screenshot({ path: `${S}${label}_${name}_${route === '/' ? 'home' : route.slice(1)}.png` }); }
  }
  await b.close(); console.log(label, 'done');
})();
