// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
// usage: node herodiff.cjs BEFORE AFTER [--quiet]   invariants: below-hero elements keep x/w/h and shift by exactly the hero height change; text blocks inside the hero keep their size
const fs = require('fs'); const S = process.env.S + '/hero-phase0/snap/'; const [A, B] = process.argv.slice(2, 4);
const a = JSON.parse(fs.readFileSync(S + A + '.json')), b = JSON.parse(fs.readFileSync(S + B + '.json'));
const TEXT = new Set(['h1', 'h2', 'p', 'a', 'button', 'small', 'li', 'svg', 'span', 'ul', 'i', 'b', 'strong']);
let bad = 0; const rows = []; const violations = [];
for (const key of Object.keys(a)) {
  const x = a[key], y = b[key]; const [route, vp] = key.split('|');
  if (x.n !== y.n) { bad++; violations.push(`${key}: element count ${x.n} -> ${y.n}`); continue; }
  const d = y.heroH - x.heroH; let belowBad = 0, textBad = 0; const ex = [];
  for (let i = 0; i < x.n; i++) {
    const [x0, y0, w0, h0] = x.rects[i], [x1, y1, w1, h1] = y.rects[i];
    if (x.pos && (x.pos[i] || y.pos[i] || /public-header/.test(x.tags[i]) || (i > x.end && y0 < 130 && Math.abs(y1 - y0) < 0.01) || (w0 === 0 && h0 === 0 && w1 === 0 && h1 === 0))) continue; // fixed/sticky, display:none or not rendered
    if (i > x.end) { // below the hero
      if (Math.abs(x1 - x0) > 0.6 || Math.abs(w1 - w0) > 0.6 || Math.abs(h1 - h0) > 0.6 || Math.abs((y1 - y0) - d) > 0.6) { belowBad++; if (ex.length < 3) ex.push(`below #${i} ${x.tags[i]} y ${y0}->${y1} (expected ${Math.round((y0 + d) * 100) / 100}), h ${h0}->${h1}, w ${w0}->${w1}`); }
    } else if (i > x.start) { // inside the hero: text blocks must keep their size
      const t = x.tags[i].split('.')[0];
      if (!process.env.ALLOW_TEXT && TEXT.has(t) && (Math.abs(w1 - w0) > 0.6 || Math.abs(h1 - h0) > 0.6)) { textBad++; if (ex.length < 3) ex.push(`in-hero #${i} ${x.tags[i]} size ${w0}x${h0} -> ${w1}x${h1}`); }
    }
  }
  const clear = y.firstTop - y.headerBottom;
  rows.push({ route, vp, before: x.heroH, after: y.heroH, pct: Math.round(y.heroH / y.vh * 100), pctBefore: Math.round(x.heroH / x.vh * 100), clear: Math.round(clear), peek: y.nextTop !== null && y.nextTop < y.vh, overflow: y.overflowX, belowBad, textBad });
  if (belowBad || textBad || y.overflowX) { bad++; violations.push(`${key}: below-hero violations ${belowBad}, hero text-size changes ${textBad}, overflowX ${y.overflowX}  ${ex.join(' | ')}`); }
}
fs.writeFileSync(S + `rows_${A}_${B}.json`, JSON.stringify(rows));
console.log(`page-states: ${rows.length}; invariant violations: ${bad}`); violations.slice(0, 12).forEach(v => console.log('  ' + v));
