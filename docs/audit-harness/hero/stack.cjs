// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
const { chromium } = require(REPO + '/client/node_modules/@playwright/test'); const fs = require('fs'); const S = process.env.S + '/hero-phase0/';
const main = fs.readFileSync(REPO + '/client/src/main.tsx', 'utf8');
const routes = [...main.matchAll(/<Route path="([^"]+)" element=\{<(?!Navigate)/g)].map(m => m[1]).filter(r => r !== '/admin' && r !== '*'); // '*' is the 404 fallback, not a page
const measure = () => {
  const h1 = document.querySelector('h1'); let hero = null;
  for (let n = h1; n && n !== document.body; n = n.parentElement) { const c = (n.className && n.className.toString()) || ''; if (/hero/i.test(c) && /^(SECTION|HEADER|DIV)$/.test(n.tagName) && !/(hero__|hero-)/.test((c.match(/\S*hero\S*/) || [''])[0])) { hero = n; break; } }
  if (!hero) for (let n = h1; n && n !== document.body; n = n.parentElement) { if (/^(SECTION|HEADER)$/.test(n.tagName)) { hero = n; break; } }
  hero = hero || h1.parentElement; const hr = hero.getBoundingClientRect();
  const rel = e => { const b = e.getBoundingClientRect(); return { t: Math.round(b.top - hr.top), b: Math.round(b.bottom - hr.top), h: Math.round(b.height) }; };
  const cls = (sel) => [...hero.querySelectorAll(sel)];
  const eyebrow = cls('[class*="eyebrow"]')[0]; const lead = cls('[class*="lead"], p')[0]; const ctas = cls('a[class*="btn"], button[class*="btn"]'); const trust = cls('[class*="trust"]')[0]; const media = cls('img, picture, video, [class*="media"]')[0];
  // visible text-ish content bottom: last of eyebrow/h1/lead/cta/trust
  const parts = [eyebrow, h1, lead, ...ctas, trust].filter(Boolean).map(rel); const contentBottom = Math.max(...parts.map(p => p.b)); const contentTop = Math.min(...parts.map(p => p.t));
  const m = media ? rel(media) : null;
  return { hero: Math.round(hr.height), aboveContent: contentTop, content: contentBottom - contentTop, belowContent: Math.round(hr.height) - contentBottom, media: m ? `${m.t}..${m.b} (h${m.h})` : '-', h1: rel(h1), trustB: trust ? rel(trust).b : null };
};
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] }); const out = [];
  for (const [name, w, h] of [['l1280x720', 1280, 720], ['l1440x800', 1440, 800]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })).newPage(); await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    for (const route of routes) { await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200); out.push({ route, vp: name, ...(await p.evaluate(measure)) }); }
  }
  await b.close(); fs.writeFileSync(S + 'stack.json', JSON.stringify(out));
})().catch(e => { console.error(e); process.exit(1); });
