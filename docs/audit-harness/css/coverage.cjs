// Read-only CSS rule-usage audit. CDP rule usage per (route, width, phase).
// usage: node coverage.cjs OUT.json [widths]  (dev server on :5173)
const REPO = process.env.REPO || process.cwd();
const { chromium } = require(REPO + '/client/node_modules/@playwright/test');
const fs = require('fs');
const OUT = process.argv[2];
const PRIMARY = [1440, 768, 390];
const EXTRA = [320, 600, 700, 900, 1000, 1100, 1150, 1250, 1920];
const WIDTHS = (process.argv[3] ? process.argv[3].split(',').map(Number) : [...PRIMARY, ...EXTRA]);
const main = fs.readFileSync(REPO + '/client/src/main.tsx', 'utf8');
let ROUTES = [...main.matchAll(/<Route path="([^"]+)" element=\{<(\w+)/g)]
  .filter(([, p, el]) => el !== 'Navigate' && p !== '*' && !p.startsWith('/admin')).map(([, p]) => p);
ROUTES.push('/finns-inte-404');
if (process.env.ROUTES) ROUTES = process.env.ROUTES.split(',');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const sheetsText = {};   // file -> text (first seen)
const usage = {};        // file -> offset -> {w: {width: Set(phase)}, routes: Set}
const log = [];
function rec(file, off, width, phase, route) {
  const f = usage[file] ||= {}; const r = f[off] ||= { w: {}, routes: {} };
  (r.w[width] ||= {})[phase] = 1; r.routes[route] = 1;
}
(async () => {
  const b = await chromium.launch({ channel: 'chrome', args: ['--no-sandbox', '--disable-gpu'] });
  for (const width of WIDTHS) {
    const primary = PRIMARY.includes(width);
    const mobile = width <= 400;
    const ctx = await b.newContext({ viewport: { width, height: width <= 400 ? 844 : width <= 800 ? 1024 : 900 }, reducedMotion: 'no-preference', colorScheme: 'light', hasTouch: mobile, isMobile: mobile, deviceScaleFactor: 1 });
    for (const route of ROUTES) {
      const t0 = Date.now();
      const p = await ctx.newPage();
      await p.route(u => u.pathname.startsWith('/api/'), r => {
        const path = new URL(r.request().url()).pathname;
        if (path === '/api/services') return r.fulfill({ json: [{ id: 3, name: 'Oljebyte' }, { id: 4, name: 'AC-service' }] });
        if (path === '/api/bookings') return r.fulfill({ status: 201, json: { message: 'ok', bookingId: 1 } });
        return r.fulfill({ json: [] });
      });
      const c = await ctx.newCDPSession(p);
      const sheets = {};
      c.on('CSS.styleSheetAdded', e => { sheets[e.header.styleSheetId] = e.header; });
      await c.send('DOM.enable'); await c.send('CSS.enable');
      await c.send('CSS.startRuleUsageTracking');
      const resolveSheets = async () => {
        for (const [id, h] of Object.entries(sheets)) {
          if (h._file !== undefined) continue;
          let file = null;
          try { const n = await c.send('DOM.describeNode', { backendNodeId: h.ownerNode }); const a = n.node.attributes || []; const i = a.indexOf('data-vite-dev-id'); if (i >= 0) file = a[i + 1].replace(REPO + '/', ''); else { const j = a.indexOf('href'); if (j >= 0) file = 'EXT:' + a[j + 1].slice(0, 40); } } catch (e) { file = null; }
          h._file = file;
          if (file && !file.startsWith('EXT:') && !sheetsText[file]) { const t = await c.send('CSS.getStyleSheetText', { styleSheetId: id }); sheetsText[file] = t.text; }
        }
      };
      const take = async (phase) => {
        await sleep(150);
        await resolveSheets();
        const d = await c.send('CSS.takeCoverageDelta');
        for (const u of d.coverage) { if (!u.used) continue; const h = sheets[u.styleSheetId]; if (!h || !h._file) continue; rec(h._file, u.startOffset, width, phase, route); }
        return d.coverage.length;
      };
      const counts = {};
      try {
        await p.goto('http://localhost:5173' + route, { waitUntil: 'networkidle', timeout: 45000 });
        await p.evaluate(() => document.fonts.ready); await sleep(400);
        // scroll the whole page (scroll-state header, intersection reveals, lazy images)
        const H = await p.evaluate(() => document.documentElement.scrollHeight);
        const vh = await p.evaluate(() => innerHeight);
        for (let y = 0; y < H; y += Math.round(vh * 0.8)) { await p.evaluate(y => scrollTo(0, y), y); await sleep(90); }
        await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await sleep(200);
        await p.evaluate(() => scrollTo(0, 0)); await sleep(250);
        await resolveSheets();
        counts.static = await take('static');
        // header menu (all widths: the header bands differ)
        const desk = await p.locator('.public-header__services-trigger').isVisible().catch(() => false);
        if (desk) { await p.locator('.public-header__services-trigger').click(); }
        else if (await p.locator('.public-header__menu-toggle').isVisible().catch(() => false)) {
          await p.locator('.public-header__menu-toggle').click(); await sleep(150);
          const mt = p.locator('.public-header__mobile-toggle');
          if (await mt.isVisible().catch(() => false)) await mt.click();
        }
        counts.menu = await take('menu');
        if (primary) {
          // force interaction pseudo-classes on every element, with the menu open
          const forceAll = async (states) => {
            const doc = await c.send('DOM.getDocument', { depth: 0 });
            const { nodeIds } = await c.send('DOM.querySelectorAll', { nodeId: doc.root.nodeId, selector: 'body, body *' });
            for (const nodeId of nodeIds) { try { await c.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: states }); } catch (e) {} }
            return nodeIds;
          };
          await forceAll(['hover', 'focus', 'focus-visible', 'focus-within', 'active']); await sleep(200);
          counts.pseudo = await take('pseudo');
          await forceAll([]);
          // close menu
          if (desk) await p.keyboard.press('Escape');
          else if (await p.locator('.public-header__menu-toggle').isVisible().catch(() => false)) await p.locator('.public-header__menu-toggle').click().catch(() => {});
          await sleep(200);
          // expanders: click every visible non-submit button outside the header (accordions, read-more, symptom
          // selectors, review controls, lightbox triggers, show-all). Close dialogs, undo navigations.
          const startUrl = p.url();
          const btns = p.locator('button:not([type=submit]):not(.public-header *)');
          const n = Math.min(await btns.count(), 60);
          for (let i = 0; i < n; i++) {
            const bt = btns.nth(i);
            try {
              if (!(await bt.isVisible())) continue;
              const label = ((await bt.textContent()) || '').trim();
              if (/Boka tid/i.test(label)) continue; // booking handled below
              await bt.click({ timeout: 2000 }); await sleep(160);
              if (await p.locator('[role=dialog]').first().isVisible().catch(() => false)) { await sleep(250); await take('expand'); await p.keyboard.press('Escape'); await sleep(150); }
              if (p.url() !== startUrl) { await p.goto(startUrl, { waitUntil: 'networkidle' }); }
            } catch (e) {}
          }
          counts.expand = await take('expand');
          // contact forms: submit filled → "Klart att skicka" panel
          await p.addInitScript(() => {});
          const forms = p.locator('form:not(.public-header *)');
          const fc = await forms.count();
          for (let i = 0; i < fc; i++) {
            const f = forms.nth(i);
            try {
              if (!(await f.isVisible())) continue;
              for (const inp of await f.locator('input:not([type=hidden]):not([type=checkbox]):not([type=radio]), textarea').all()) {
                const t = await inp.getAttribute('type'); const v = t === 'email' ? 'test@example.se' : t === 'tel' ? '0701234567' : 'Test';
                await inp.fill(v).catch(() => {});
              }
              for (const sel of await f.locator('select').all()) { const opts = await sel.locator('option').all(); if (opts.length > 1) await sel.selectOption({ index: 1 }).catch(() => {}); }
              await p.evaluate(() => { window.__noNav = true; });
              await f.locator('button[type=submit], button:not([type])').last().click({ timeout: 2000 }).catch(() => {});
              await sleep(300);
            } catch (e) {}
          }
          if (p.url() !== startUrl) await p.goto(startUrl, { waitUntil: 'networkidle' });
          counts.form = await take('form');
          // booking modal
          const bk = p.getByRole('button', { name: /Boka tid/i });
          let opened = false;
          for (const el of await bk.all()) { if (await el.isVisible().catch(() => false)) { await el.click().catch(() => {}); opened = true; break; } }
          if (!opened && await p.locator('.public-header__menu-toggle').isVisible().catch(() => false)) {
            await p.locator('.public-header__menu-toggle').click(); await sleep(150); await p.locator('.public-header__mobile-booking').click().catch(() => {}); opened = true;
          }
          await sleep(500);
          const dlg = p.locator('[role=dialog]').first();
          if (await dlg.isVisible().catch(() => false)) {
            await take('modal');
            if (route === '/kontakt') {
              // empty submit → validation, then datepicker, fill, submit → success
              await dlg.getByRole('button', { name: 'Skicka bokning' }).click().catch(() => {}); await sleep(250);
              await take('modal');
              await dlg.locator('#booking-service').selectOption('3').catch(() => {});
              await dlg.locator('#booking-name').fill('Test Person').catch(() => {});
              await dlg.locator('#booking-email').fill('test@example.se').catch(() => {});
              await dlg.locator('#booking-phone').fill('0701234567').catch(() => {});
              await dlg.locator('#booking-date').click().catch(() => {}); await sleep(300);
              await forceAll(['hover', 'focus', 'focus-visible', 'focus-within', 'active']); await sleep(200);
              await take('modal'); await forceAll([]);
              await p.locator('.react-datepicker__day:not(.react-datepicker__day--outside-month):not(.react-datepicker__day--disabled)').last().click().catch(() => {});
              await dlg.locator('.react-time-picker__inputGroup__hour').click().catch(() => {}); await p.keyboard.type('0930').catch(() => {});
              await sleep(200); await take('modal');
              await dlg.getByRole('button', { name: 'Skicka bokning' }).click().catch(() => {}); await sleep(600);
            } else {
              await forceAll(['hover', 'focus', 'focus-visible', 'focus-within', 'active']); await sleep(200); await take('modal'); await forceAll([]);
            }
            counts.modal = await take('modal');
            await p.keyboard.press('Escape'); await sleep(200);
          } else counts.modal = 'no-dialog';
          // reduced motion
          await c.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }); await sleep(200);
          counts.rm = await take('reduced-motion');
          await c.send('Emulation.setEmulatedMedia', { features: [] });
        }
        await resolveSheets();
      } catch (e) { log.push(`${route}@${width}: ERROR ${e.message.split('\n')[0]}`); }
      log.push(`${route}@${width}: ${JSON.stringify(counts)} ${Date.now() - t0}ms`);
      console.log(log[log.length - 1]);
      await c.detach().catch(() => {}); await p.close();
    }
    await ctx.close();
    fs.writeFileSync(OUT, JSON.stringify({ widths: WIDTHS, routes: ROUTES, usage, sheetsText, log }));
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
