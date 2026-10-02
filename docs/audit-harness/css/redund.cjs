// Declaration-level redundancy probe: remove ONE declaration at a time (CSSOM, in the browser only),
// compare computed style of every element the rule matches (+ their descendants, + ::before/::after), restore.
// usage: node redund.cjs OUT.json
const REPO = process.env.REPO || process.cwd();
const { chromium } = require(REPO + '/client/node_modules/@playwright/test');
const fs = require('fs');
const FAM = ['/service-reparationer', '/reparationer-storre-arbeten', '/felsokning', '/dackservice', '/ac-service'];
const ALL = (() => { const main = fs.readFileSync(REPO + '/client/src/main.tsx', 'utf8'); return [...main.matchAll(/<Route path="([^"]+)" element=\{<(\w+)/g)].filter(([, p, el]) => el !== 'Navigate' && p !== '*' && !p.startsWith('/admin')).map(([, p]) => p); })();
const TARGETS = (process.env.TARGETS || 'BargningPage.css:/bargning;AboutPage.css:/om-oss;ServiceReparationerPage.css:' + FAM.join(',') + ';PublicFooter.css:/,/bargning,/felsokning,/oljebyte;shared-elements.css:' + ALL.join(',')).split(';').map(s => { const [f, r] = s.split(':'); return [f, r.split(',')]; });
const WIDTHS = (process.env.WIDTHS || '1440,1024,768,650,390').split(',').map(Number);
const { rules: SRC } = require(process.env.S + '/rules.json');
const nrm = x => x.replace(/\s+/g, '').replace(/"/g, "'").replace(/\*(?=::?[a-z])/g, '');
const AUTH = {}; for (const r of SRC) { const f = r.file.replace(/^.*\//, ''); const k = nrm(r.media.replace(/^@media /, '')) + '|' + nrm(r.selector); ((AUTH[f] ||= {})[k] ||= []).push([...new Set(r.decls.map(d => d.prop))]); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PROBE = async ([file, authoredMap]) => {
  const norm = x => x.replace(/\s+/g, '').replace(/"/g, "'").replace(/\*(?=::?[a-z])/g, '');
  const sh = [...document.styleSheets].find(s => s.ownerNode && (s.ownerNode.getAttribute('data-vite-dev-id') || '').endsWith(file));
  if (!sh) return null;
  const props = [...getComputedStyle(document.documentElement)].filter(p => !p.startsWith('--'));
  const splitTop = sel => { const out = []; let d = 0, cur = ''; for (const ch of sel) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && d === 0) { out.push(cur.trim()); cur = ''; } else cur += ch; } if (cur.trim()) out.push(cur.trim()); return out; };
  const DYN = /:(hover|focus|focus-visible|focus-within|active|checked|disabled|invalid|placeholder-shown)/;
  const res = []; const ord = {};
  const walk = (rules, med) => { for (const r of rules) {
    if (r.media) { walk(r.cssRules, r.media.mediaText); continue; }
    if (r.selectorText === undefined) continue;
    const key = (med || '') + '|' + r.selectorText; ord[key] = (ord[key] || 0) + 1;
    const row = { sel: r.selectorText, media: med || '', n: ord[key], decls: {} };
    res.push(row);
    if (med && !matchMedia(med).matches) { row.status = 'media-off'; continue; }
    if (DYN.test(r.selectorText)) { row.status = 'dynamic'; continue; }
    // hosts
    const targets = [];
    for (const part of splitTop(r.selectorText)) { const m = part.match(/::?(before|after)\s*$/); const base = m ? part.slice(0, m.index) || '*' : part; let els = []; try { els = [...document.querySelectorAll(base)]; } catch (e) { row.status = 'bad-selector'; } els.forEach(e => targets.push([e, m ? '::' + m[1] : null])); }
    if (!targets.length) { row.status = row.status || 'no-match'; continue; }
    row.status = 'active'; row.hosts = targets.length;
    // what to compare: each host (or its pseudo) + descendants of non-pseudo hosts (inheritance), capped
    const check = []; const seen = new Set();
    for (const [e, pe] of targets) { check.push([e, pe]); if (!pe) { check.push([e, '::before'], [e, '::after']); let k = 0; for (const d of e.querySelectorAll('*')) { if (k++ > 600) break; if (!seen.has(d)) { seen.add(d); check.push([d, null]); } } } }
    const snap = () => check.map(([e, pe]) => { const cs = getComputedStyle(e, pe); return props.map(p => cs.getPropertyValue(p)).join('\u0001'); });
    const base = snap();
    const saved = r.style.cssText;
    const list = authoredMap[norm(med || '') + '|' + norm(r.selectorText)];
    const authored = list && list[row.n - 1];
    if (!authored) { row.status = 'unmapped'; continue; }
    for (const g of authored) {
      if (/^(-webkit-)?(transition|animation)/.test(g)) { row.decls[g] = 'masked'; continue; }
      r.style.removeProperty(g);
      const after = snap();
      let changed = 0; const what = new Set(); for (let i = 0; i < base.length; i++) if (base[i] !== after[i]) { changed++; const a = base[i].split('\u0001'), b = after[i].split('\u0001'); for (let j = 0; j < a.length; j++) if (a[j] !== b[j]) what.add(props[j]); }
      row.decls[g] = changed ? 'used:' + [...what].slice(0, 4).join(',') : 'redundant';
      r.style.cssText = saved;
    }
  } };
  walk(sh.cssRules, '');
  return res;
};
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] });
  const out = {};
  for (const width of WIDTHS) {
    const mobile = width <= 400;
    const ctx = await b.newContext({ viewport: { width, height: mobile ? 844 : width <= 800 ? 1024 : 900 }, reducedMotion: 'reduce', colorScheme: 'light', hasTouch: mobile, isMobile: mobile });
    const p = await ctx.newPage();
    await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: [] }));
    for (const [file, routes] of TARGETS) for (const route of routes) {
      const t0 = Date.now();
      try {
        await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle', timeout: 60000 });
        await p.evaluate(() => document.fonts.ready);
        await p.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });
        const res = await p.evaluate(PROBE, [file, AUTH[file]]);
        (out[file] ||= {})[route + '@' + width] = res;
        const act = res ? res.filter(r => r.status === 'active') : [];
        const red = act.reduce((a, r) => a + Object.values(r.decls).filter(v => v === 'redundant').length, 0);
        console.log(`${file} ${route}@${width}: ${act.length} active rules, ${red} redundant decl groups, ${Date.now() - t0}ms`);
      } catch (e) { console.log(`${file} ${route}@${width}: ERROR ${e.message.split('\n')[0]}`); }
      fs.writeFileSync(process.argv[2], JSON.stringify(out));
    }
    await ctx.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
