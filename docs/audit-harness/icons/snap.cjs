// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
// usage: node snap.cjs LABEL targets.json [fullpage-routes comma list]
const { chromium } = require(REPO + '/client/node_modules/@playwright/test');
const fs = require('fs'); const path = require('path');
const S = process.env.S + '/icons-phase0/';
const [label, targetsFile, fullRoutes] = process.argv.slice(2);
const targets = JSON.parse(fs.readFileSync(S + targetsFile, 'utf8'));
const dir = S + 'snap/' + label + '/'; fs.mkdirSync(dir, { recursive: true });
const PROPS = ['width','height','stroke','stroke-width','stroke-linecap','stroke-linejoin','fill','color','filter','opacity','transform','display'];
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] });
  const groups = {}; for (const t of targets) (groups[`${t.route}|${t.vp}|${t.state}`] ||= []).push(t);
  const out = [];
  for (const [g, ts] of Object.entries(groups)) {
    const [route, vp, state] = g.split('|');
    const size = vp === 'm390' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
    const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 4, reducedMotion: 'reduce', colorScheme: 'light', hasTouch: vp === 'm390', isMobile: vp === 'm390' });
    const page = await ctx.newPage();
    await page.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready);
    if (state === 'scrolled') { await page.evaluate(() => window.scrollTo(0, 600)); await page.waitForTimeout(250); }
    if (state === 'menu-open') { await page.locator('.public-header__menu-toggle').click(); await page.waitForTimeout(300); }
    if (state === 'services-open') { await page.locator('.public-header__services-trigger').first().click(); await page.waitForTimeout(300); }
    for (const t of ts) {
      const el = page.locator('svg').nth(t.idx);
      await el.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' })); await page.waitForTimeout(120);
      const info = await el.evaluate((e, PROPS) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); const k = e.children[0]; const kc = k ? getComputedStyle(k) : null;
        const o = {}; PROPS.forEach(p => o[p] = cs.getPropertyValue(p)); const c = {}; if (kc) ['stroke','stroke-width','stroke-linecap','stroke-linejoin','fill','filter'].forEach(p => c[p] = kc.getPropertyValue(p));
        return { rect: { x: r.x, y: r.y, w: r.width, h: r.height }, computed: o, child: c, sigLen: e.children.length }; }, PROPS);
      const pad = 3; const b = info.rect;
      const file = `${t.name.replace(':','-')}__${t.route.replace(/\//g,'_')}_${t.vp}_${t.state}_${t.idx}.png`;
      await page.screenshot({ path: dir + file, clip: { x: Math.max(0, Math.floor(b.x) - pad), y: Math.max(0, Math.floor(b.y) - pad), width: Math.ceil(b.w) + pad * 2, height: Math.ceil(b.h) + pad * 2 } });
      out.push({ key: t.name + '|' + g + '|' + t.idx, name: t.name, group: g, idx: t.idx, file, computed: info.computed, child: info.child, children: info.sigLen });
    }
    await ctx.close();
  }
  if (fullRoutes) for (const route of fullRoutes.split(',')) for (const [n, w, h] of [['d1440', 1440, 900], ['t768', 768, 1024], ['m390', 390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', colorScheme: 'light' }); const page = await ctx.newPage();
    await page.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' }); await page.evaluate(() => document.fonts.ready);
    const ov = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    await page.screenshot({ path: dir + 'FULL' + route.replace(/\//g, '_') + '_' + n + '.png', fullPage: true }); out.push({ full: route + ' ' + n, overflowX: ov }); await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(dir + 'results.json', JSON.stringify(out, null, 1));
  console.log(label, 'captured', out.filter(o => o.key).length, 'icon crops;', out.filter(o => o.full).length, 'full pages; overflow:', out.filter(o => o.full && o.overflowX).length);
})().catch(e => { console.error(e); process.exit(1); });
