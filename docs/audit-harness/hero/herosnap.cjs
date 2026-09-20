// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
// usage: S=... node herosnap.cjs LABEL  -> per page x viewport: hero index range + rect of every element + hero facts
const { chromium } = require(REPO + '/client/node_modules/@playwright/test'); const fs = require('fs'); const S = process.env.S + '/hero-phase0/'; const label = process.argv[2];
const main = fs.readFileSync(REPO + '/client/src/main.tsx', 'utf8');
const routes = [...main.matchAll(/<Route path="([^"]+)" element=\{<(?!Navigate)/g)].map(m => m[1]).filter(r => r !== '/admin');
const VPS = [['l1280x720', 1280, 720], ['l1366x768', 1366, 768], ['l1440x800', 1440, 800], ['t768x1024', 768, 1024], ['m390x844', 390, 844], ['m360x740', 360, 740]];
const grab = () => {
  const st = document.createElement('style'); st.textContent = '*,*::before,*::after{transition:none!important;animation:none!important}'; document.head.appendChild(st);
  const h1 = document.querySelector('h1'); let hero = null;
  for (let n = h1; n && n !== document.body; n = n.parentElement) { const c = (n.className && n.className.toString()) || ''; if (/hero/i.test(c) && /^(SECTION|HEADER|DIV)$/.test(n.tagName) && !/(hero__|hero-)/.test((c.match(/\S*hero\S*/) || [''])[0])) { hero = n; break; } }
  if (!hero) for (let n = h1; n && n !== document.body; n = n.parentElement) { if (/^(SECTION|HEADER)$/.test(n.tagName)) { hero = n; break; } }
  hero = hero || h1.parentElement;
  const all = [...document.body.querySelectorAll('*')]; const start = all.indexOf(hero); const end = start + hero.querySelectorAll('*').length;
  const rects = all.map(e => { const b = e.getBoundingClientRect(); return [Math.round(b.x * 100) / 100, Math.round((b.y + scrollY) * 100) / 100, Math.round(b.width * 100) / 100, Math.round(b.height * 100) / 100]; });
  const hb = document.querySelector('.public-header'); const hbb = hb ? hb.getBoundingClientRect().bottom : null;
  const eyebrow = hero.querySelector('[class*="eyebrow"]'); const first = eyebrow || h1;
  return { start, end, n: all.length, rects, heroH: rects[start][3], headerBottom: hbb, h1Top: h1.getBoundingClientRect().top + scrollY, firstTop: first.getBoundingClientRect().top + scrollY, overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth, vh: innerHeight,
    tags: all.map(e => e.tagName.toLowerCase() + '.' + ((e.className && e.className.toString()) || '').split(/\s+/)[0]), pos: all.map(e => { const c = getComputedStyle(e); return c.position === 'fixed' || c.position === 'sticky' ? 'F' : c.display === 'none' ? 'N' : ''; }), nextTop: (() => { let n = hero; while (n && !n.nextElementSibling) n = n.parentElement; const s = n && n.nextElementSibling; return s ? s.getBoundingClientRect().top + scrollY : null; })() };
};
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] }); const out = {};
  for (const [name, w, h] of VPS) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', colorScheme: 'light', hasTouch: w < 500, isMobile: w < 500 })).newPage();
    await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    for (const route of routes) { await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.evaluate(async () => { const imgs = [...document.images]; imgs.forEach(i => { i.loading = 'eager'; }); await Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.addEventListener('load', r); i.addEventListener('error', r); setTimeout(r, 4000); }))); }); await p.waitForTimeout(250); out[route + '|' + name] = await p.evaluate(grab); }
  }
  await b.close(); fs.writeFileSync(S + 'snap/' + label + '.json', JSON.stringify(out)); console.log(label, Object.keys(out).length, 'page-states');
})().catch(e => { console.error(e); process.exit(1); });
