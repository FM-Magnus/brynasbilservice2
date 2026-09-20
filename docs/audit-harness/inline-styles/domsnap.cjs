// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
// usage: S=... node domsnap.cjs LABEL   -> full-page PNG + per-element computed style/rect dump, 4 routes x 3 widths
const { chromium } = require(REPO + '/client/node_modules/@playwright/test');
const fs = require('fs'); const S = process.env.S + '/inline-phase0/'; const label = process.argv[2];
const dir = S + 'dom/' + label + '/'; fs.mkdirSync(dir, { recursive: true });
const ROUTES = ['/service-reparationer', '/felsokning', '/dackservice', '/ac-service'];
const PROPS = ['display','position','margin-top','margin-right','margin-bottom','margin-left','padding-top','padding-right','padding-bottom','padding-left','width','height','max-width','min-height','color','background-color','font-size','font-weight','line-height','letter-spacing','text-align','grid-template-columns','gap','object-fit','overflow-x','overflow-y','border-radius','opacity','transform','align-items','justify-content'];
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] }); const summary = [];
  for (const [vp, w, h] of [['d1440', 1440, 900], ['t768', 768, 1024], ['m390', 390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', colorScheme: 'light', hasTouch: vp === 'm390', isMobile: vp === 'm390' });
    const p = await ctx.newPage(); await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    for (const route of ROUTES) {
      await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
      const dump = await p.evaluate(PROPS => [...document.body.querySelectorAll('*')].map((e, i) => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); const o = { i, t: e.tagName.toLowerCase(), r: [r.x, r.y, r.width, r.height].map(v => Math.round(v * 100) / 100) }; PROPS.forEach(pr => o[pr] = cs.getPropertyValue(pr)); return o; }), PROPS);
      const tag = route.replace(/\//g, '_') + '_' + vp;
      fs.writeFileSync(dir + tag + '.json', JSON.stringify(dump));
      await p.screenshot({ path: dir + tag + '.png', fullPage: true });
      summary.push(`${tag}: ${dump.length} elements, styleAttrs=${await p.evaluate(() => document.querySelectorAll('[style]').length)}`);
    }
    await ctx.close();
  }
  await b.close(); console.log(summary.join('\n'));
})().catch(e => { console.error(e); process.exit(1); });
