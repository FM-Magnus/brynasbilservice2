// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
const { chromium } = require(REPO + '/client/node_modules/@playwright/test');
const measure = () => {
  const h1 = document.querySelector('h1'); let hero = null;
  for (let n = h1; n && n !== document.body; n = n.parentElement) { const c = (n.className && n.className.toString()) || ''; if (/hero/i.test(c) && /^(SECTION|HEADER|DIV)$/.test(n.tagName) && !/(hero__|hero-)/.test((c.match(/\S*hero\S*/) || [''])[0])) { hero = n; break; } }
  if (!hero) for (let n = h1; n && n !== document.body; n = n.parentElement) { if (/^(SECTION|HEADER)$/.test(n.tagName)) { hero = n; break; } }
  const items = []; const seen = new Set();
  const add = (label, e) => { if (!e || seen.has(e)) return; seen.add(e); const b = e.getBoundingClientRect(), cs = getComputedStyle(e); items.push({ label, h: Math.round(b.height), top: Math.round(b.top - hero.getBoundingClientRect().top), fs: cs.fontSize, lh: cs.lineHeight, mt: cs.marginTop, mb: cs.marginBottom, lines: cs.lineHeight !== 'normal' ? Math.round(b.height / parseFloat(cs.lineHeight)) : null }); };
  add('eyebrow', hero.querySelector('[class*="eyebrow"]')); add('h1', h1);
  add('lead', hero.querySelector('[class*="lead"]') || h1.nextElementSibling);
  const ctas = [...hero.querySelectorAll('a[class*="btn"], button[class*="btn"]')]; if (ctas[0]) add('cta row', ctas[0].parentElement);
  add('trust', hero.querySelector('[class*="trust"]'));
  const hc = getComputedStyle(hero); const inner = hero.querySelector('[class*="hero__inner"], [class*="hero-inner"], [class*="hero__content"], .bb-hero__content, [class*="__container"], [class*="hero-content"]');
  return { hero: Math.round(hero.getBoundingClientRect().height), heroPad: hc.paddingTop + '/' + hc.paddingBottom, inner: inner ? { cls: inner.className.toString().split(/\s+/)[0], pad: getComputedStyle(inner).paddingTop + '/' + getComputedStyle(inner).paddingBottom, gap: getComputedStyle(inner).rowGap + ' ' + getComputedStyle(inner).columnGap, display: getComputedStyle(inner).display, cols: getComputedStyle(inner).gridTemplateColumns.slice(0, 40) } : null, items };
};
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] });
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })).newPage(); await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
  for (const [route, note] of [['/koppling', 'guide'], ['/felsokning', 'bb-hero (min-h not the driver)'], ['/ac-service', 'bb-hero (tallest)'], ['/', 'home'], ['/om-oss', 'own'], ['/bargning', 'own']]) {
    await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
    const d = await p.evaluate(measure); console.log(`\n## ${route}  [${note}]  hero ${d.hero}px  hero padding ${d.heroPad}`); if (d.inner) console.log(`   inner .${d.inner.cls}: display ${d.inner.display}, padding ${d.inner.pad}, gap ${d.inner.gap}, cols ${d.inner.cols}`);
    for (const i of d.items) console.log(`   ${i.label.padEnd(9)} top ${String(i.top).padStart(4)}  h ${String(i.h).padStart(4)}  font ${i.fs}/${i.lh}${i.lines ? ' (~' + i.lines + ' lines)' : ''}  mt ${i.mt} mb ${i.mb}`);
  }
  await b.close();
})();
