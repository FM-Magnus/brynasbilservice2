// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
const { chromium } = require(REPO + '/client/node_modules/@playwright/test');
const sharp = require(REPO + '/client/node_modules/sharp');
const fs = require('fs');
const S = process.env.S + '/icons-phase0/';
const targets = JSON.parse(fs.readFileSync(S + (process.env.TARGETS || 'compare_targets.json'), 'utf8')).filter(t => !t.missing);
const ROOT = REPO + '/client/src/components/icons/';
const camel = s => s.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
function sharedSpec(name) {
  const t = fs.readFileSync(ROOT + name + '.tsx', 'utf8');
  const m = t.match(/<svg([\s\S]*?)>([\s\S]*?)<\/svg>/);
  const attrs = {};
  for (const a of m[1].matchAll(/(\w+)=(?:"([^"]*)"|\{([^}]*)\})/g)) {
    const k = a[1]; if (k === 'className' || k === 'hidden' || k === 'ref') continue;
    let v = a[2] !== undefined ? a[2] : a[3];
    if (v === 'width') v = '18'; if (v === 'height') v = '18';
    attrs[k === 'viewBox' ? 'viewBox' : camel(k)] = v;
  }
  const inner = m[2].replace(/(\w+)=("|\{)/g, (x, k, q) => (/^[a-z]+[A-Z]/.test(k) ? camel(k) : k) + '=' + q).replace(/=\{([^}]*)\}/g, '="$1"').replace(/\{\.\.\.props\}/g, '');
  return { attrs, inner };
}
async function shot(el, path, page) {
  await el.evaluate(e => e.scrollIntoView({ block: 'center', inline: 'center' }));
  await page.waitForTimeout(150);
  const b2 = await el.evaluate(e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  const pad = 3;
  return page.screenshot({ path, clip: { x: Math.max(0, Math.floor(b2.x) - pad), y: Math.max(0, Math.floor(b2.y) - pad), width: Math.ceil(b2.width) + pad * 2, height: Math.ceil(b2.height) + pad * 2 }, animations: 'disabled' });
}
async function px(buf) { const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true }); return { data, w: info.width, h: info.height }; }
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] });
  const results = [];
  for (const t of targets) {
    const vp = t.vp === 'm390' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 4, reducedMotion: 'reduce', colorScheme: 'light', hasTouch: t.vp === 'm390', isMobile: t.vp === 'm390' });
    const page = await ctx.newPage();
    await page.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    await page.goto('http://localhost:5173' + t.route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    if (t.state === 'menu-open') { await page.locator('.public-header__menu-toggle').click(); await page.waitForTimeout(300); }
    const el = page.locator('svg').nth(t.idx);
    
    const tag = `${t.file.replace('.tsx','')}.${t.name.replace(':','-')}__${t.shared}`;
    const before = await shot(el, S + (process.env.OUTDIR || 'compare/') + tag + '_A-local.png', page);
    const spec = sharedSpec(t.shared);
    await el.evaluate((svg, spec) => {
      ['viewBox','fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','width','height'].forEach(a => svg.removeAttribute(a));
      for (const [k, v] of Object.entries(spec.attrs)) svg.setAttribute(k, v);
      svg.innerHTML = spec.inner;
    }, spec);
    await page.waitForTimeout(100);
    const after = await shot(el, S + (process.env.OUTDIR || 'compare/') + tag + '_B-shared.png', page);
    await el.evaluate(svg => { svg.setAttribute('stroke-linecap','round'); svg.setAttribute('stroke-linejoin','round'); });
    await page.waitForTimeout(80);
    const afterRound = await shot(el, S + (process.env.OUTDIR || 'compare/') + tag + '_C-shared-round.png', page);
    const A = await px(before), B = await px(after), C = await px(afterRound);
    let changed = 0, ink = 0, sameSize = A.w === B.w && A.h === B.h;
    if (sameSize) {
      const bg = [A.data[0], A.data[1], A.data[2]];
      for (let i = 0; i < A.data.length; i += 4) {
        const dA = Math.abs(A.data[i]-bg[0]) + Math.abs(A.data[i+1]-bg[1]) + Math.abs(A.data[i+2]-bg[2]);
        const dB = Math.abs(B.data[i]-bg[0]) + Math.abs(B.data[i+1]-bg[1]) + Math.abs(B.data[i+2]-bg[2]);
        if (dA > 60 || dB > 60) ink++;
        const dd = Math.abs(A.data[i]-B.data[i]) + Math.abs(A.data[i+1]-B.data[i+1]) + Math.abs(A.data[i+2]-B.data[i+2]);
        if (dd > 60) changed++;
      }
    }
    let changedC = 0; if (A.w === C.w && A.h === C.h) { const bg = [A.data[0], A.data[1], A.data[2]]; for (let i = 0; i < A.data.length; i += 4) { const dd = Math.abs(A.data[i]-C.data[i]) + Math.abs(A.data[i+1]-C.data[i+1]) + Math.abs(A.data[i+2]-C.data[i+2]); if (dd > 60) changedC++; } }
    // side by side
    const sbs = await sharp({ create: { width: A.w * 3 + 16, height: A.h, channels: 4, background: { r: 200, g: 200, b: 200, alpha: 1 } } }).composite([{ input: before, left: 0, top: 0 }, { input: after, left: A.w + 8, top: 0 }, { input: afterRound, left: (A.w + 8) * 2, top: 0 }]).png().toFile(S + (process.env.OUTDIR || 'compare/') + tag + '_side-by-side.png');
    results.push({ file: t.file, local: t.name, shared: t.shared, ctx: `${t.route} ${t.vp} ${t.state}`, px: `${t.box[0]}x${t.box[1]}`, sameSize, ink, changed, pctOfInk: ink ? Math.round(changed / ink * 1000) / 10 : null, pctRound: ink ? Math.round(changedC / ink * 1000) / 10 : null });
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(S + (process.env.RESULTS || 'compare_results.json'), JSON.stringify(results, null, 1));
  console.log('file'.padEnd(20) + 'local'.padEnd(18) + 'shared'.padEnd(16) + 'px'.padEnd(8) + 'ink px'.padEnd(8) + 'changed'.padEnd(9) + 'shared as-is'.padEnd(14) + 'shared+round caps');
  for (const r of results) console.log(r.file.padEnd(20) + r.local.padEnd(18) + r.shared.padEnd(16) + r.px.padEnd(8) + String(r.ink).padEnd(8) + String(r.changed).padEnd(9) + (r.sameSize ? (r.pctOfInk + '%').padEnd(14) + r.pctRound + '%' : 'SIZE DIFFERS'));
})().catch(e => { console.error(e); process.exit(1); });
