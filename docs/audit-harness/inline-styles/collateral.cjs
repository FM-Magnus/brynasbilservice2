// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
const { chromium } = require(REPO + '/client/node_modules/@playwright/test');
const ROUTES = ['/service-reparationer', '/felsokning', '/dackservice', '/ac-service'];
const SEL = {
  'service-content h2.bb-h2': '.bilservice__service-content .bb-h2',
  'service-content .bb-eyebrow': '.bilservice__service-content .bb-eyebrow',
  'intro .bb-lead': '.bilservice__intro .bb-lead',
  'intro small': '.bilservice__intro small',
  'intro p (all)': '.bilservice__intro p',
  'card--teal .bb-icon-badge': '.bilservice__card--teal .bb-icon-badge',
  'price-amount small': '.bilservice__price-amount small',
  'split-media--right picture': '.bilservice__split-media--right picture',
  'split-media--right img': '.bilservice__split-media--right img',
  'symptom-grid': '.bilservice__symptom-grid',
  'container (all)': '.bilservice__container',
  'section (unclassed)': 'section:not([class])',
};
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox','--disable-gpu'] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
  const res = {};
  for (const r of ROUTES) { await p.goto('http://localhost:5173' + r, { waitUntil: 'networkidle' }); res[r] = await p.evaluate(sel => Object.fromEntries(Object.entries(sel).map(([k, s]) => { const els = [...document.querySelectorAll(s)]; return [k, [els.length, els.filter(e => e.hasAttribute('style')).length]]; })), SEL); }
  await b.close();
  console.log('selector'.padEnd(30) + ROUTES.map(r => r.slice(1, 9).padEnd(13)).join('') + '  (matches / of which have inline style)');
  for (const k of Object.keys(SEL)) console.log(k.padEnd(30) + ROUTES.map(r => `${res[r][k][0]} / ${res[r][k][1]}`.padEnd(13)).join(''));
})();
