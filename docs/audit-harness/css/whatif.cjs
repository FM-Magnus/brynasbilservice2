// What-if harness: mutate CSSOM/DOM in the browser (never the repo), diff computed styles
// of every element (+ ::before/::after) before vs after. usage: node whatif.cjs experiments.cjs OUT.json [filterIds]
const REPO = process.env.REPO || process.cwd();
const { chromium } = require(REPO + '/client/node_modules/@playwright/test');
const fs = require('fs');
const EXP = require(require('path').resolve(process.argv[2]));
const OUT = process.argv[3];
const only = process.argv[4] ? process.argv[4].split(',') : null;
const ALLROUTES = (() => { const main = fs.readFileSync(REPO + '/client/src/main.tsx', 'utf8');
  return [...main.matchAll(/<Route path="([^"]+)" element=\{<(\w+)/g)].filter(([, p, el]) => el !== 'Navigate' && p !== '*' && !p.startsWith('/admin')).map(([, p]) => p); })();
const sleep = ms => new Promise(r => setTimeout(r, ms));

// in-page helpers (stringified)
const HELPERS = `
window.__norm = s => s.replace(/\\s+/g, '').replace(/"/g, "'").replace(/\\*(?=::?[a-z])/g, '');
window.__sheet = file => [...document.styleSheets].find(s => s.ownerNode && s.ownerNode.getAttribute && (s.ownerNode.getAttribute('data-vite-dev-id') || '').endsWith(file));
window.__find = (file, selector, media) => {
  const sh = __sheet(file); if (!sh) return [];
  const out = []; const want = __norm(selector);
  const walk = (rules, med) => { for (let i = 0; i < rules.length; i++) { const r = rules[i];
    if (r.cssRules && r.media) walk(r.cssRules, r.media.mediaText);
    else if (r.selectorText !== undefined && __norm(r.selectorText) === want && (media === undefined || __norm(med || '') === __norm(media || ''))) out.push({ rule: r, parent: r.parentRule || r.parentStyleSheet, med }); } };
  walk(sh.cssRules, ''); return out;
};
window.__props = (() => { const cs = getComputedStyle(document.documentElement); return [...cs].filter(p => !p.startsWith('--')); })();
window.__snap = () => {
  const els = [...document.querySelectorAll('body, body *')];
  return els.map(e => { const cs = getComputedStyle(e); const row = { s: __props.map(p => cs.getPropertyValue(p)) };
    for (const pe of ['::before', '::after']) { const c = getComputedStyle(e, pe); if (c.content && c.content !== 'none' && c.content !== 'normal') row[pe] = __props.map(p => c.getPropertyValue(p)); }
    const r = e.getBoundingClientRect(); row.r = [r.x, r.y, r.width, r.height].map(v => Math.round(v * 10) / 10).join(',');
    return row; });
};
window.__path = e => { const p = []; while (e && e !== document.body && p.length < 4) { p.unshift(e.tagName.toLowerCase() + (e.classList.length ? '.' + [...e.classList].slice(0, 2).join('.') : '')); e = e.parentElement; } return p.join(' > '); };
window.__diff = (A, B) => {
  const els = [...document.querySelectorAll('body, body *')];
  if (A.length !== B.length) return { error: 'element count ' + A.length + ' -> ' + B.length };
  const changes = []; let nEl = 0; const props = {};
  for (let i = 0; i < A.length; i++) { let ch = false;
    for (const k of ['s', '::before', '::after']) { const a = A[i][k], b = B[i][k]; if (!a && !b) continue;
      if (!a || !b) { ch = true; changes.push([__path(els[i]) + k.replace('s', ''), 'pseudo', a ? 'present' : 'absent', b ? 'present' : 'absent']); continue; }
      for (let j = 0; j < a.length; j++) if (a[j] !== b[j]) { ch = true; const p = __props[j] + (k === 's' ? '' : k); props[p] = (props[p] || 0) + 1; if (changes.length < 40) changes.push([__path(els[i]), p, a[j].slice(0, 80), b[j].slice(0, 80)]); } }
    if (A[i].r !== B[i].r) { ch = true; props['(box)'] = (props['(box)'] || 0) + 1; if (changes.length < 40) changes.push([__path(els[i]), '(box)', A[i].r, B[i].r]); }
    if (ch) nEl++; }
  return { nEl, props, changes };
};
// mutation primitives
window.__ops = {
  removeDecls: (file, selector, media, props) => { const f = __find(file, selector, media); f.forEach(x => props.forEach(p => x.rule.style.removeProperty(p))); return f.length; },
  setDecl: (file, selector, media, prop, value, prio) => { const f = __find(file, selector, media); f.forEach(x => x.rule.style.setProperty(prop, value, prio || '')); return f.length; },
  deleteRule: (file, selector, media) => { const f = __find(file, selector, media); f.forEach(x => { const list = x.parent.cssRules; for (let i = 0; i < list.length; i++) if (list[i] === x.rule) { x.parent.deleteRule(i); break; } }); return f.length; },
  setSelector: (file, selector, media, next) => { const f = __find(file, selector, media); f.forEach(x => { x.rule.selectorText = next; }); return f.length && __norm(f[0].rule.selectorText) === __norm(next) ? f.length : -f.length; },
  insert: (file, cssText, where) => { const sh = __sheet(file); if (!sh) return 0; sh.insertRule(cssText, where === 'start' ? 0 : sh.cssRules.length); return 1; },
  addClass: (selector, cls) => { const els = document.querySelectorAll(selector); els.forEach(e => e.classList.add(...cls.split(' '))); return els.length; },
  setMedia: (file, from, to) => { const sh = __sheet(file); if (!sh) return 0; let n = 0; const walk = rules => { for (const r of rules) { if (r.media && r.cssRules) { if (__norm(r.media.mediaText) === __norm(from)) { r.media.mediaText = to; n++; } walk(r.cssRules); } } }; walk(sh.cssRules); return n; },
  dropImportant: (file, selector, media) => { const f = __find(file, selector, media); let n = 0; f.forEach(x => { const st = x.rule.style; const props = [...st]; props.forEach(pr => { if (st.getPropertyPriority(pr) === 'important') { const v = st.getPropertyValue(pr); st.setProperty(pr, v, ''); n++; } }); }); return n; },
  moveToStart: (file, selector, media) => { const f = __find(file, selector, media); const sh = __sheet(file); f.forEach(x => { const t = x.rule.cssText; const list = x.parent.cssRules; for (let i = 0; i < list.length; i++) if (list[i] === x.rule) { x.parent.deleteRule(i); break; } sh.insertRule(t, 0); }); return f.length; },
  stripFallbacks: (file) => { const sh = __sheet(file); if (!sh) return 0; let n = 0; const walk = rules => { for (const r of rules) { if (r.cssRules) walk(r.cssRules); if (r.style) for (let i = 0; i < r.style.length; i++) { const p = r.style[i]; const v = r.style.getPropertyValue(p); if (/var\\(--bb-[a-z0-9-]+,/.test(v)) { let w = v, prev; do { prev = w; w = w.replace(/var\\((--bb-[a-z0-9-]+),[^()]*?(\\([^()]*\\)[^()]*?)*\\)/g, 'var($1)'); } while (w !== prev); r.style.setProperty(p, w, r.style.getPropertyPriority(p)); n++; } } } }; walk(sh.cssRules); return n; },
};
`;

(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] });
  const results = [];
  for (const ex of EXP) {
    if (only && !only.includes(ex.id)) continue;
    const routes = ex.routes === 'all' ? ALLROUTES : ex.routes;
    const widths = ex.widths || [1440, 768, 390];
    const res = { id: ex.id, title: ex.title, runs: [] };
    for (const width of widths) {
      const mobile = width <= 400;
      const ctx = await b.newContext({ viewport: { width, height: mobile ? 844 : width <= 800 ? 1024 : 900 }, reducedMotion: ex.reducedMotion || 'reduce', colorScheme: 'light', hasTouch: mobile, isMobile: mobile, deviceScaleFactor: 1 });
      const p = await ctx.newPage();
      await p.route(u => u.pathname.startsWith('/api/'), r => r.fulfill({ json: new URL(r.request().url()).pathname === '/api/services' ? [{ id: 3, name: 'Oljebyte' }] : [] }));
      const c = await ctx.newCDPSession(p); await c.send('DOM.enable'); await c.send('CSS.enable');
      for (const route of routes) {
        try {
          await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' });
          await p.evaluate(() => document.fonts.ready);
          if (!ex.keepTransitions) await p.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });
          await p.evaluate(async () => { document.querySelectorAll('img[loading=lazy]').forEach(i => { i.loading = 'eager'; }); await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 4000); }))); });
          await p.evaluate(HELPERS);
          if (ex.before) await p.evaluate(ex.before);
          if (ex.hover) { const doc = await c.send('DOM.getDocument', { depth: 0 }); for (const sel of ex.hover) { const { nodeIds } = await c.send('DOM.querySelectorAll', { nodeId: doc.root.nodeId, selector: sel }); for (const nodeId of nodeIds) await c.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: ['hover'] }); } }
          await sleep(150);
          await p.evaluate(() => { window.__A = __snap(); });
          const applied = await p.evaluate(ex.mutate);
          await sleep(150);
          let shotDiff = null;
          const d = await p.evaluate(() => __diff(window.__A, __snap()));
          if (ex.control) { /* no-op control: diff must be 0 */ }
          res.runs.push({ route, width, applied, ...d });
          const tag = d.error ? d.error : `${d.nEl} el changed ${JSON.stringify(d.props)}`;
          console.log(`${ex.id} ${route}@${width} applied=${JSON.stringify(applied)} -> ${tag}`);
        } catch (e) { res.runs.push({ route, width, error: e.message.split('\n')[0] }); console.log(`${ex.id} ${route}@${width} ERROR ${e.message.split('\n')[0]}`); }
      }
      await ctx.close();
    }
    results.push(res);
    fs.writeFileSync(OUT, JSON.stringify(results, null, 1));
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
