// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
const { chromium } = require(REPO + '/client/node_modules/@playwright/test');
const fs = require('fs');
const S = process.env.S + '/icons-phase0';
const main = fs.readFileSync(REPO + '/client/src/main.tsx', 'utf8');
const routes = [...main.matchAll(/<Route path="([^"]+)" element=\{<(?!Navigate)/g)].map(m => m[1]).filter(r => r !== '/admin');
console.log('routes:', routes.length, routes.join(' '));

const inPage = () => {
  const PROPS = ['width','height','stroke','stroke-width','stroke-linecap','stroke-linejoin','fill','color','filter','opacity','transform','display','flex','flex-shrink'];
  const GEOM = new Set(['d','points','cx','cy','r','x','y','width','height','rx','ry','x1','y1','x2','y2']);
  const flat = [];
  let order = 0;
  const walk = (rules, sheetId) => {
    for (const r of rules) {
      if (r.type === 1) flat.push({ r, sheetId, order: order++ });
      else if (r.type === 4) { try { if (matchMedia(r.conditionText || r.media.mediaText).matches) walk(r.cssRules, sheetId); } catch {} }
      else if (r.type === 12) { try { if (CSS.supports(r.conditionText)) walk(r.cssRules, sheetId); } catch {} }
    }
  };
  [...document.styleSheets].forEach((sh, i) => {
    let id = sh.href || (sh.ownerNode && (sh.ownerNode.getAttribute('data-vite-dev-id') || '')) || 'inline-' + i;
    id = id.replace(/^.*\/client\//, '').replace(/^.*localhost:5173\//, '');
    try { walk(sh.cssRules, id); } catch {}
  });
  const spec = (sel) => {
    const s = sel.replace(/:not\(([^)]*)\)/g, '$1');
    const a = (s.match(/#[\w-]+/g) || []).length;
    const b = (s.match(/\.[\w-]+|\[[^\]]+\]|:(?!:)[\w-]+(\([^)]*\))?/g) || []).length;
    const c = (s.match(/(^|[\s>+~(])[a-zA-Z][\w-]*/g) || []).length + (s.match(/::[\w-]+/g) || []).length;
    return [a, b, c];
  };
  const cmp = (x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
  const splitSel = (t) => { const out = []; let d = 0, cur = ''; for (const ch of t) { if (ch === '(' || ch === '[') d++; if (ch === ')' || ch === ']') d--; if (ch === ',' && d === 0) { out.push(cur.trim()); cur = ''; } else cur += ch; } if (cur.trim()) out.push(cur.trim()); return out; };
  const matchedRules = (el, props) => {
    const res = [];
    for (const { r, sheetId, order } of flat) {
      let part = null;
      for (const p of splitSel(r.selectorText)) { try { if (el.matches(p)) { const sp = spec(p); if (!part || cmp(sp, part.spec) > 0) part = { p, spec: sp }; } } catch {} }
      if (!part) continue;
      const decl = {};
      for (const pr of props) { const v = r.style.getPropertyValue(pr); if (v) decl[pr] = v + (r.style.getPropertyPriority(pr) ? ' !important' : ''); }
      if (Object.keys(decl).length) res.push({ sheet: sheetId, sel: part.p, spec: part.spec, order, decl });
    }
    return res;
  };
  const winners = (rules, el) => {
    const w = {};
    const inl = el.getAttribute('style');
    for (const pr of PROPS) {
      const c = rules.filter(x => x.decl[pr]);
      if (!c.length) continue;
      c.sort((x, y) => cmp(x.spec, y.spec) || x.order - y.order);
      const win = c[c.length - 1];
      w[pr] = { value: win.decl[pr], sel: win.sel, sheet: win.sheet, contenders: c.length };
    }
    return w;
  };
  const csv = (el, props) => { const cs = getComputedStyle(el); const o = {}; for (const p of props) o[p] = cs.getPropertyValue(p); return o; };
  const chain = (el) => { const out = []; let n = el.parentElement; for (let i = 0; i < 3 && n; i++, n = n.parentElement) out.push(n.tagName.toLowerCase() + (n.className && typeof n.className === 'string' ? '.' + n.className.trim().split(/\s+/).join('.') : '')); return out; };
  return [...document.querySelectorAll('svg')].map((svg, idx) => {
    const kids = [...svg.children];
    const sig = kids.filter(k => /^(path|circle|rect|line|polyline|polygon|ellipse)$/.test(k.tagName)).map(k => [k.tagName, [...k.attributes].filter(a => GEOM.has(a.name)).map(a => [a.name, a.value]).sort((x, y) => x[0] < y[0] ? -1 : 1)]);
    const rect = svg.getBoundingClientRect();
    const rules = matchedRules(svg, PROPS);
    const kidRules = kids[0] ? matchedRules(kids[0], ['stroke','stroke-width','stroke-linecap','stroke-linejoin','fill','filter','opacity','transform']) : [];
    return {
      idx, sig, chain: chain(svg), cls: svg.getAttribute('class') || '',
      attrs: { viewBox: svg.getAttribute('viewBox'), fill: svg.getAttribute('fill'), stroke: svg.getAttribute('stroke'), sw: svg.getAttribute('stroke-width'), cap: svg.getAttribute('stroke-linecap'), join: svg.getAttribute('stroke-linejoin'), aria: svg.getAttribute('aria-hidden'), style: svg.getAttribute('style') },
      box: [Math.round(rect.width * 100) / 100, Math.round(rect.height * 100) / 100],
      hidden: rect.width === 0 && rect.height === 0,
      computed: csv(svg, PROPS),
      childComputed: kids[0] ? csv(kids[0], ['stroke','stroke-width','stroke-linecap','stroke-linejoin','fill','filter']) : null,
      rules, winners: winners(rules, svg),
      kidRuleCount: kidRules.length, kidRules,
      inHeader: !!svg.closest('.public-header'), inFooter: !!svg.closest('footer'),
    };
  });
};

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] });
  const out = [];
  for (const vp of [{ name: 'd1440', w: 1440, h: 900 }, { name: 'm390', w: 390, h: 844, mobile: true }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, reducedMotion: 'reduce', colorScheme: 'light', hasTouch: !!vp.mobile, isMobile: !!vp.mobile });
    const page = await ctx.newPage();
    await page.route(u => u.pathname.startsWith('/api/') || u.pathname.startsWith('/brynasbilservice/api/'), r => r.fulfill({ json: [] }));
    for (const route of routes) {
      await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const top = await page.evaluate(inPage);
      out.push({ route, vp: vp.name, state: 'top', svgs: top });
      // header scrolled (sticky) state
      await page.evaluate(() => window.scrollTo(0, 600)); await page.waitForTimeout(250);
      const sc = (await page.evaluate(inPage)).filter(s => s.inHeader);
      out.push({ route, vp: vp.name, state: 'scrolled', svgs: sc });
      await page.evaluate(() => window.scrollTo(0, 0));
      if (vp.mobile) {
        const toggle = page.locator('.public-header__menu-toggle');
        if (await toggle.count()) { await toggle.click().catch(()=>{}); await page.waitForTimeout(250); out.push({ route, vp: vp.name, state: 'menu-open', svgs: (await page.evaluate(inPage)).filter(s => s.inHeader) }); }
      } else {
        const trig = page.locator('.public-header__services-trigger');
        if (await trig.count()) { await trig.first().click().catch(()=>{}); await page.waitForTimeout(250); out.push({ route, vp: vp.name, state: 'services-open', svgs: (await page.evaluate(inPage)).filter(s => s.inHeader) }); }
      }
    }
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(S + '/collected.json', JSON.stringify(out));
  console.log('pages x states:', out.length, ' total svg records:', out.reduce((a, b) => a + b.svgs.length, 0));
})().catch(e => { console.error(e); process.exit(1); });
