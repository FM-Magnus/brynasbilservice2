// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
const { chromium } = require(REPO + '/client/node_modules/@playwright/test');
const fs = require('fs'); const S = process.env.S + '/hero-phase0/';
const main = fs.readFileSync(REPO + '/client/src/main.tsx', 'utf8');
const routes = [...main.matchAll(/<Route path="([^"]+)" element=\{<(?!Navigate)/g)].map(m => m[1]).filter(r => r !== '/admin' && r !== '*'); // '*' is the 404 fallback, not a page
const VPS = [['l1280x720', 1280, 720], ['l1366x768', 1366, 768], ['l1440x800', 1440, 800], ['t768x1024', 768, 1024], ['m390x844', 390, 844], ['m360x740', 360, 740]];
const inPage = () => {
  const flat = []; let order = 0;
  const walk = (rules, id) => { for (const r of rules) { if (r.type === 1) flat.push({ r, id, order: order++ }); else if (r.type === 4) { try { if (matchMedia(r.conditionText || r.media.mediaText).matches) walk(r.cssRules, id); } catch {} } } };
  [...document.styleSheets].forEach((sh, i) => { let id = sh.href || (sh.ownerNode && (sh.ownerNode.getAttribute('data-vite-dev-id') || '')) || 'i' + i; id = id.replace(/^.*\//, ''); try { walk(sh.cssRules, id); } catch {} });
  const spec = sel => { const s = sel.replace(/:not\(([^)]*)\)/g, '$1'); return [(s.match(/#[\w-]+/g) || []).length, (s.match(/\.[\w-]+|\[[^\]]+\]|:(?!:)[\w-]+(\([^)]*\))?/g) || []).length, (s.match(/(^|[\s>+~(])[a-zA-Z][\w-]*/g) || []).length]; };
  const cmp = (x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
  const splitSel = t => { const out = []; let d = 0, c = ''; for (const ch of t) { if (ch === '(' || ch === '[') d++; if (ch === ')' || ch === ']') d--; if (ch === ',' && d === 0) { out.push(c.trim()); c = ''; } else c += ch; } if (c.trim()) out.push(c.trim()); return out; };
  const win = (el, prop) => { let best = null; for (const { r, id, order } of flat) { const v = r.style.getPropertyValue(prop); if (!v) continue; let part = null; for (const p of splitSel(r.selectorText)) { try { if (el.matches(p)) { const sp = spec(p); if (!part || cmp(sp, part.spec) > 0) part = { p, spec: sp }; } } catch {} } if (!part) continue; const c = { sel: part.p, sheet: id, value: v, spec: part.spec, order }; if (!best || cmp(c.spec, best.spec) > 0 || (cmp(c.spec, best.spec) === 0 && c.order > best.order)) best = c; } return best ? `${best.sel} @${best.sheet} = ${best.value}` : null; };
  const vh = innerHeight, vw = innerWidth;
  const h1 = document.querySelector('h1'); if (!h1) return { error: 'no h1' };
  // hero = nearest ancestor of the h1 that is a section/header or carries a "hero" class; else the top-level block of main
  let hero = h1.parentElement; let found = null;
  for (let n = h1; n && n !== document.body; n = n.parentElement) { if (/hero/i.test(n.className && n.className.toString()) && /^(SECTION|HEADER|DIV)$/.test(n.tagName) && !/(hero__|hero-)/.test((n.className.toString().match(/\S*hero\S*/) || [''])[0]) ) { found = n; break; } }
  if (!found) for (let n = h1; n && n !== document.body; n = n.parentElement) { if (/^(SECTION|HEADER)$/.test(n.tagName)) { found = n; break; } }
  hero = found || h1.parentElement;
  const header = document.querySelector('.public-header'); const hb = header ? header.getBoundingClientRect() : null;
  const r = e => { if (!e) return null; const b = e.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), height: Math.round(b.height), left: Math.round(b.left), width: Math.round(b.width) }; };
  const hr = r(hero); const cs = getComputedStyle(hero);
  const ctas = [...hero.querySelectorAll('a.bb-btn, button.bb-btn, a[class*="btn"], button[class*="btn"]')];
  const phone = hero.querySelector('a[href^="tel:"]');
  const primary = ctas[0] || null;
  const next = (() => { let n = hero; while (n && !n.nextElementSibling) n = n.parentElement; const s = n && n.nextElementSibling; return s ? r(s) : null; })();
  const inv = [];
  for (const e of hero.querySelectorAll('*')) {
    const c = (e.className && e.className.toString()) || ''; const t = e.tagName;
    if (t === 'H1') inv.push('h1'); else if (/eyebrow/i.test(c) && !inv.includes('eyebrow')) inv.push('eyebrow');
    else if ((/lead|subtitle|intro/i.test(c) || (t === 'P' && !inv.includes('lead') && inv.includes('h1'))) && !inv.includes('lead')) inv.push('lead');
    else if (/btn/i.test(c) && (t === 'A' || t === 'BUTTON') && !inv.includes('cta')) inv.push('cta');
    else if (/trust|badge|pill|stats?/i.test(c) && !inv.includes('trust')) inv.push('trust');
    else if ((t === 'IMG' || t === 'PICTURE' || t === 'VIDEO') && !inv.includes('media')) inv.push('media');
  }
  const bg = cs.backgroundImage !== 'none';
  const icons = [...hero.querySelectorAll('svg')].map(s => Math.round(s.getBoundingClientRect().width));
  return {
    vh, vw, hero: { tag: hero.tagName.toLowerCase(), cls: (hero.className || '').toString().trim().split(/\s+/).slice(0, 4).join(' ') },
    rect: hr, pct: Math.round(hr.height / vh * 100), padTop: cs.paddingTop, padBottom: cs.paddingBottom,
    minHeightComputed: cs.minHeight, heightRule: win(hero, 'min-height'), padRule: win(hero, 'padding-top'),
    header: hb ? { bottom: Math.round(hb.bottom), pos: getComputedStyle(header).position } : null,
    h1: r(h1), h1Clear: hb ? Math.round(h1.getBoundingClientRect().top - hb.bottom) : null,
    primary: primary ? { label: (primary.textContent || '').trim().slice(0, 28), bottom: Math.round(primary.getBoundingClientRect().bottom) } : null,
    phone: phone ? { bottom: Math.round(phone.getBoundingClientRect().bottom) } : null,
    ctaLabels: ctas.map(c => (c.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 24)),
    nextTop: next ? next.top : null, inv: inv.join('>'), hasBg: bg, media: !!hero.querySelector('img,picture,video'), icons: icons.length, iconSizes: [...new Set(icons)].join('/'),
    fold: { h1: h1.getBoundingClientRect().bottom <= vh, cta: primary ? primary.getBoundingClientRect().bottom <= vh : null, phone: phone ? phone.getBoundingClientRect().bottom <= vh : null },
  };
};
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] }); const all = [];
  for (const [name, w, h] of VPS) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', colorScheme: 'light', hasTouch: w < 500, isMobile: w < 500 }); const p = await ctx.newPage();
    await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    for (const route of routes) {
      await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(250);
      const d = await p.evaluate(inPage); all.push({ route, vp: name, ...d });
      if (['l1280x720', 'l1440x800', 'm390x844'].includes(name)) await p.screenshot({ path: `${S}shots/${name}_${route === '/' ? 'home' : route.slice(1)}.png` });
    }
    await ctx.close();
  }
  await b.close(); fs.writeFileSync(S + 'hero.json', JSON.stringify(all)); console.log('routes', routes.length, 'records', all.length, 'errors', all.filter(a => a.error).length);
})().catch(e => { console.error(e); process.exit(1); });
