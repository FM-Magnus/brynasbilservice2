// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
const { chromium } = require(REPO + '/client/node_modules/@playwright/test'); const fs = require('fs'); const S = process.env.S + '/hero-phase0/';
const main = fs.readFileSync(REPO + '/client/src/main.tsx', 'utf8');
const routes = [...main.matchAll(/<Route path="([^"]+)" element=\{<(?!Navigate)/g)].map(m => m[1]).filter(r => r !== '/admin');
const measure = () => {
  const h1 = document.querySelector('h1'); let hero = null;
  for (let n = h1; n && n !== document.body; n = n.parentElement) { const c = (n.className && n.className.toString()) || ''; if (/hero/i.test(c) && /^(SECTION|HEADER|DIV)$/.test(n.tagName) && !/(hero__|hero-)/.test((c.match(/\S*hero\S*/) || [''])[0])) { hero = n; break; } }
  if (!hero) for (let n = h1; n && n !== document.body; n = n.parentElement) { if (/^(SECTION|HEADER)$/.test(n.tagName)) { hero = n; break; } }
  hero = hero || h1.parentElement;
  const cs = getComputedStyle(hero); const before = hero.getBoundingClientRect().height; const mh = cs.minHeight;
  hero.style.setProperty('min-height', '0px', 'important'); const natural = hero.getBoundingClientRect().height;
  hero.style.removeProperty('min-height');
  return { before: Math.round(before), natural: Math.round(natural), minHeight: mh, padTop: cs.paddingTop, padBottom: cs.paddingBottom };
};
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] }); const out = [];
  for (const [name, w, h] of [['l1280x720', 1280, 720], ['l1440x800', 1440, 800], ['m390x844', 390, 844]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', hasTouch: w < 500, isMobile: w < 500 })).newPage();
    await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    for (const route of routes) { await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200); out.push({ route, vp: name, ...(await p.evaluate(measure)) }); }
  }
  await b.close(); fs.writeFileSync(S + 'natural.json', JSON.stringify(out)); console.log('records', out.length);
})().catch(e => { console.error(e); process.exit(1); });
