// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
// usage: node diff.cjs BEFORE AFTER  -> pixel + computed-style equality per icon crop
const sharp = require(REPO + '/client/node_modules/sharp'); const fs = require('fs');
const S = process.env.S + '/icons-phase0/snap/'; const [A, B] = process.argv.slice(2);
const ra = JSON.parse(fs.readFileSync(S + A + '/results.json')), rb = JSON.parse(fs.readFileSync(S + B + '/results.json'));
const raw = async f => { const { data, info } = await sharp(f).ensureAlpha().raw().toBuffer({ resolveWithObject: true }); return { data, w: info.width, h: info.height }; };
(async () => {
  const rows = []; let bad = 0;
  for (const a of ra.filter(x => x.key)) {
    const b = rb.find(x => x.key === a.key); if (!b) { rows.push([a.key, 'MISSING AFTER']); bad++; continue; }
    const pa = await raw(S + A + '/' + a.file), pb = await raw(S + B + '/' + b.file);
    let changed = 0, ink = 0; const same = pa.w === pb.w && pa.h === pb.h;
    if (same) { const bg = [pa.data[0], pa.data[1], pa.data[2]]; for (let i = 0; i < pa.data.length; i += 4) { const dA = Math.abs(pa.data[i]-bg[0])+Math.abs(pa.data[i+1]-bg[1])+Math.abs(pa.data[i+2]-bg[2]); const dd = Math.abs(pa.data[i]-pb.data[i])+Math.abs(pa.data[i+1]-pb.data[i+1])+Math.abs(pa.data[i+2]-pb.data[i+2]); if (dA > 60) ink++; if (dd > 24) changed++; } }
    const cdiff = Object.keys(a.computed).filter(k => a.computed[k] !== b.computed[k]).map(k => `${k}: ${a.computed[k]} -> ${b.computed[k]}`);
    const kdiff = Object.keys(a.child || {}).filter(k => a.child[k] !== b.child[k]).map(k => `child ${k}: ${a.child[k]} -> ${b.child[k]}`);
    rows.push([a.name, a.group, same ? changed : 'SIZE', ink, cdiff.concat(kdiff).join('; ') || 'computed styles equal']); if (changed || cdiff.length || kdiff.length || !same) bad++;
  }
  const byName = {}; for (const r of rows) { const k = r[0]; (byName[k] ||= { n: 0, px: 0, css: new Set() }); byName[k].n++; byName[k].px += (typeof r[2] === 'number' ? r[2] : 9e9); if (r[4] && r[4] !== 'computed styles equal') byName[k].css.add(r[4]); }
  for (const [k, v] of Object.entries(byName)) console.log(k.padEnd(20), 'instances', String(v.n).padEnd(3), 'changed px total', String(v.px).padEnd(7), v.css.size ? [...v.css].join(' || ') : 'computed styles equal');
  const of = rb.filter(x => x.full && x.overflowX); console.log('full-page overflow after:', of.length ? of.map(x => x.full) : 'none'); console.log(bad ? `${bad} instance(s) differ` : 'ALL IDENTICAL');
})();
