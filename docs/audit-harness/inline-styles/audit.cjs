// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
const { chromium } = require(REPO + '/client/node_modules/@playwright/test');
const fs = require('fs'); const S = process.env.S + '/inline-phase0/';
const ROUTES = ['/service-reparationer', '/felsokning', '/dackservice', '/ac-service'];
const inPage = () => {
  const flat = []; let order = 0;
  const walk = (rules, sheetId) => { for (const r of rules) { if (r.type === 1) flat.push({ r, sheetId, order: order++ }); else if (r.type === 4) { try { if (matchMedia(r.conditionText || r.media.mediaText).matches) walk(r.cssRules, sheetId); } catch {} } else if (r.type === 12) { try { if (CSS.supports(r.conditionText)) walk(r.cssRules, sheetId); } catch {} } } };
  [...document.styleSheets].forEach((sh, i) => { let id = sh.href || (sh.ownerNode && (sh.ownerNode.getAttribute('data-vite-dev-id') || '')) || 'inline-' + i; id = id.replace(/^.*\/client\//, '').replace(/^.*localhost:5173\//, ''); try { walk(sh.cssRules, id); } catch {} });
  const spec = sel => { const s = sel.replace(/:not\(([^)]*)\)/g, '$1'); return [(s.match(/#[\w-]+/g) || []).length, (s.match(/\.[\w-]+|\[[^\]]+\]|:(?!:)[\w-]+(\([^)]*\))?/g) || []).length, (s.match(/(^|[\s>+~(])[a-zA-Z][\w-]*/g) || []).length + (s.match(/::[\w-]+/g) || []).length]; };
  const cmp = (x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
  const splitSel = t => { const out = []; let d = 0, cur = ''; for (const ch of t) { if (ch === '(' || ch === '[') d++; if (ch === ')' || ch === ']') d--; if (ch === ',' && d === 0) { out.push(cur.trim()); cur = ''; } else cur += ch; } if (cur.trim()) out.push(cur.trim()); return out; };
  const winner = (el, prop) => { let best = null; for (const { r, sheetId, order } of flat) { const v = r.style.getPropertyValue(prop); if (!v) continue; let part = null; for (const p of splitSel(r.selectorText)) { try { if (el.matches(p)) { const sp = spec(p); if (!part || cmp(sp, part.spec) > 0) part = { p, spec: sp }; } } catch {} } if (!part) continue; const c = { sel: part.p, sheet: sheetId.split('/').pop(), value: v, spec: part.spec, order }; if (!best || cmp(c.spec, best.spec) > 0 || (cmp(c.spec, best.spec) === 0 && c.order > best.order)) best = c; } return best && { sel: best.sel, sheet: best.sheet, value: best.value }; };
  const out = [];
  document.querySelectorAll('[style]').forEach((el, i) => {
    const orig = el.getAttribute('style'); const props = []; for (let k = 0; k < el.style.length; k++) props.push(el.style.item(k));
    const withI = {}; const cs = getComputedStyle(el); props.forEach(p => withI[p] = cs.getPropertyValue(p));
    el.removeAttribute('style'); const cs2 = getComputedStyle(el); const without = {}; props.forEach(p => without[p] = cs2.getPropertyValue(p));
    const wins = {}; props.forEach(p => wins[p] = winner(el, p));
    el.setAttribute('style', orig);
    const rect = el.getBoundingClientRect();
    const chain = []; let n = el.parentElement; for (let d = 0; d < 3 && n; d++, n = n.parentElement) { const c = getComputedStyle(n); chain.push({ el: n.tagName.toLowerCase() + '.' + (n.className || '').toString().trim().split(/\s+/).slice(0, 3).join('.'), padBlock: c.paddingTop + ' / ' + c.paddingBottom }); }
    out.push({ i, tag: el.tagName.toLowerCase(), cls: (el.getAttribute('class') || ''), inline: orig, props, withInline: withI, withoutInline: without, wins, box: [Math.round(rect.width), Math.round(rect.height)], chain, text: (el.textContent || '').trim().slice(0, 36) });
  });
  return out;
};
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] }); const all = [];
  for (const vp of [['d1440', 1440, 900], ['t768', 768, 1024], ['m390', 390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: vp[1], height: vp[2] }, reducedMotion: 'reduce', colorScheme: 'light', hasTouch: vp[0] === 'm390', isMobile: vp[0] === 'm390' }); const p = await ctx.newPage();
    await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    for (const route of ROUTES) { await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); all.push({ route, vp: vp[0], els: await p.evaluate(inPage) }); }
    await ctx.close();
  }
  await b.close(); fs.writeFileSync(S + 'audit.json', JSON.stringify(all)); console.log('sites per route @1440:', Object.fromEntries(all.filter(a => a.vp === 'd1440').map(a => [a.route, a.els.length])));
})().catch(e => { console.error(e); process.exit(1); });
