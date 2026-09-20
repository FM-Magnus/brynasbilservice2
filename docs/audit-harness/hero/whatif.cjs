// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
const { chromium } = require(REPO + '/client/node_modules/@playwright/test'); const fs = require('fs'); const S = process.env.S + '/hero-phase0/';
const main = fs.readFileSync(REPO + '/client/src/main.tsx', 'utf8');
const routes = [...main.matchAll(/<Route path="([^"]+)" element=\{<(?!Navigate)/g)].map(m => m[1]).filter(r => r !== '/admin');
const run = () => {
  const st = document.createElement('style'); st.textContent = '*, *::before, *::after { transition: none !important; animation: none !important; }'; document.head.appendChild(st);
  const imp = (e, p, v) => e.style.setProperty(p, v, 'important');
  const h1 = document.querySelector('h1'); let hero = null;
  for (let n = h1; n && n !== document.body; n = n.parentElement) { const c = (n.className && n.className.toString()) || ''; if (/hero/i.test(c) && /^(SECTION|HEADER|DIV)$/.test(n.tagName) && !/(hero__|hero-)/.test((c.match(/\S*hero\S*/) || [''])[0])) { hero = n; break; } }
  if (!hero) for (let n = h1; n && n !== document.body; n = n.parentElement) { if (/^(SECTION|HEADER)$/.test(n.tagName)) { hero = n; break; } }
  hero = hero || h1.parentElement; const H = () => Math.round(hero.getBoundingClientRect().height);
  const res = { h0: H() }; const hb = document.querySelector('.public-header'); const hbot = hb ? hb.getBoundingClientRect().bottom : 0;
  // W1: clearance = header bottom + 24, and no forced min-height
  imp(hero, 'min-height', '0px'); [...hero.querySelectorAll('*')].forEach(e => { if (getComputedStyle(e).minHeight === getComputedStyle(hero).minHeight && e !== hero && /inherit|px/.test(getComputedStyle(e).minHeight) && /hero__content/.test((e.className || '').toString())) imp(e, 'min-height', '0px'); });
  let carrier = null; for (const e of [hero, ...hero.querySelectorAll('*')]) { if (parseFloat(getComputedStyle(e).paddingTop) >= 100) { carrier = e; break; } }
  const heroTop = hero.getBoundingClientRect().top;
  if (carrier) { const cur = parseFloat(getComputedStyle(carrier).paddingTop); const want = Math.max(0, hbot + 24 - (carrier.getBoundingClientRect().top)); if (want < cur) imp(carrier, 'padding-top', want + 'px'); }
  res.w1 = H();
  // W2: + tighter spacing (60% of the vertical margins between blocks)
  const blocks = []; const eb = hero.querySelector('[class*="eyebrow"]'); const lead = hero.querySelector('[class*="lead"]') || h1.nextElementSibling; const cta = hero.querySelector('a[class*="btn"], button[class*="btn"]'); const trust = hero.querySelector('[class*="trust"]');
  [eb, h1, lead, cta && cta.parentElement, trust].filter(Boolean).forEach(e => { const cs = getComputedStyle(e); imp(e, 'margin-top', parseFloat(cs.marginTop) * 0.6 + 'px'); imp(e, 'margin-bottom', parseFloat(cs.marginBottom) * 0.6 + 'px'); });
  res.w2 = H();
  // W3: + H1 capped at 48px
  const fs = parseFloat(getComputedStyle(h1).fontSize); if (fs > 48) { imp(h1, 'font-size', '48px'); imp(h1, 'line-height', '1.05'); } res.w3 = H();
  return res;
};
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] }); const out = [];
  for (const [name, w, h] of [['l1280x720', 1280, 720], ['l1440x800', 1440, 800]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })).newPage(); await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    for (const route of routes) { await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200); out.push({ route, vp: name, h, ...(await p.evaluate(run)) }); }
  }
  await b.close(); fs.writeFileSync(S + 'whatif.json', JSON.stringify(out));
})().catch(e => { console.error(e); process.exit(1); });
