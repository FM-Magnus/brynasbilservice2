const fs = require('fs');
const data = JSON.parse(fs.readFileSync(process.argv[2]));
const { rules } = require(process.env.S + '/rules.json');
const nrm = x => x.replace(/\s+/g, '').replace(/"/g, "'").replace(/\*(?=::?[a-z])/g, '');
const out = {};
for (const [file, runs] of Object.entries(data)) {
  const src = rules.filter(r => r.file.endsWith('/' + file));
  const ordinal = {}; const srcKey = new Map();
  src.forEach(r => { const k = nrm(r.media.replace(/^@media /, '')) + '|' + nrm(r.selector); ordinal[k] = (ordinal[k] || 0) + 1; srcKey.set(k + '#' + ordinal[k], r); });
  const agg = new Map();
  for (const [rw, res] of Object.entries(runs)) { if (!res) continue; for (const row of res) {
    const k = nrm(row.media) + '|' + nrm(row.sel) + '#' + row.n; const a = agg.get(k) || { statuses: new Set(), decls: {}, active: [] }; agg.set(k, a);
    a.statuses.add(row.status); if (row.status === 'active') a.active.push(rw);
    for (const [p, v] of Object.entries(row.decls || {})) { const d = a.decls[p] ||= { red: 0, used: 0, masked: 0, why: new Set() }; if (v === 'redundant') d.red++; else if (v === 'masked') d.masked++; else { d.used++; d.why.add(v.slice(5)); } } } }
  const res = { rules: 0, activeRules: 0, decls: 0, tested: 0, redundant: [], used: 0, masked: 0, untested: 0 };
  for (const r of src) {
    res.rules++; const k = nrm(r.media.replace(/^@media /, '')) + '|' + nrm(r.selector);
    const n = src.filter(x => nrm(x.media.replace(/^@media /, '')) + '|' + nrm(x.selector) === k).indexOf(r) + 1;
    const a = agg.get(k + '#' + n);
    const props = [...new Set(r.decls.map(d => d.prop))]; res.decls += props.length;
    if (!a || !a.active.length) { res.untested += props.length; continue; }
    res.activeRules++;
    for (const p of props) { const d = a.decls[p]; if (!d) { res.untested++; continue; }
      if (d.masked) { res.masked++; continue; } res.tested++;
      if (d.used) res.used++; else { const decl = r.decls.find(x => x.prop === p); res.redundant.push({ line: r.line, selector: r.selector, media: r.media, prop: p, value: decl.value, bytes: Buffer.byteLength(p + ':' + decl.value + ';'), runs: d.red, flag: /^-webkit-|^-moz-/.test(p) ? 'vendor-prefix' : /\bsvg\b/.test(r.selector) && /^(width|height)$/.test(p) ? 'svg-attr' : '' }); } }
  }
  out[file] = res;
}
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
for (const [f, r] of Object.entries(out)) {
  const real = r.redundant.filter(x => !x.flag);
  console.log(`\n## ${f}: ${r.rules} rules (${r.activeRules} active somewhere), ${r.decls} decls: tested ${r.tested}, used ${r.used}, REDUNDANT ${r.redundant.length} (${real.length} unflagged, ${real.reduce((a, x) => a + x.bytes, 0)} B), masked ${r.masked}, untested ${r.untested}`);
  const byProp = {}; real.forEach(x => byProp[x.prop] = (byProp[x.prop] || 0) + 1);
  console.log('   by prop:', Object.entries(byProp).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([k, v]) => k + ' ' + v).join(', '));
}
