const REPO = process.env.REPO || process.cwd();
const postcss = require(REPO + '/client/node_modules/postcss');
const fs = require('fs'); const { execSync } = require('child_process');
const cov = JSON.parse(fs.readFileSync(process.argv[2]));
const src = JSON.parse(fs.readFileSync(process.argv[3])).rules;
const PRIMARY = [1440, 768, 390];
const ruleList = (text) => { const out = []; postcss.parse(text).walkRules(r => {
  if (r.parent && r.parent.type === 'atrule' && /keyframes/.test(r.parent.name)) return;
  const media = []; let p = r.parent; while (p && p.type !== 'root') { if (p.type === 'atrule') media.unshift('@' + p.name + ' ' + p.params); p = p.parent; }
  out.push({ start: r.source.start.offset, end: r.source.end.offset, selector: r.selector.replace(/\s+/g, ' '), media: media.join(' ') }); }); return out; };
// all source TSX/TS text for class-reference checks
const tsx = execSync(`cd ${REPO}/client/src && find . \\( -name '*.tsx' -o -name '*.ts' \\) -not -path '*/admin/*' -print0 | xargs -0 cat`).toString();
const result = { files: {}, never: [], widthOnly: [], interactionOnly: [], extraOnly: [], all: [] };
for (const [file, text] of Object.entries(cov.sheetsText)) {
  const served = ruleList(text);
  const usage = cov.usage[file] || {};
  // map served offsets -> usage; check alignment
  let aligned = 0; for (const r of served) if (usage[r.start]) aligned++;
  const srcRules = src.filter(r => r.file === file);
  // ordinal mapping served -> source by (selector, media)
  const seen = {}; const mapped = [];
  for (const r of served) { const k = r.media + '|' + r.selector; const i = seen[k] = (seen[k] || 0) + 1; const cands = srcRules.filter(s => s.media + '|' + s.selector === k); mapped.push({ r, s: cands[i - 1] || null }); }
  const st = { rules: 0, bytes: 0, cat: {} };
  const add = (c, b) => { st.cat[c] ||= { rules: 0, bytes: 0 }; st.cat[c].rules++; st.cat[c].bytes += b; };
  for (const { r, s } of mapped) {
    const u = usage[r.start];
    const bytes = s ? s.bytes : (r.end - r.start + 1);
    st.rules++; st.bytes += bytes;
    const staticW = PRIMARY.filter(w => u && u.w[w] && (u.w[w].static || u.w[w].menu));
    const anyW = PRIMARY.filter(w => u && u.w[w]);
    const extraW = u ? Object.keys(u.w).map(Number).filter(w => !PRIMARY.includes(w)) : [];
    const phases = u ? [...new Set(Object.values(u.w).flatMap(o => Object.keys(o)))] : [];
    let cat;
    if (staticW.length === 3) cat = 'static-all-3';
    else if (staticW.length) cat = 'static-some-widths';
    else if (anyW.length) cat = 'interaction-only';
    else if (extraW.length) cat = 'between-widths-only';
    else cat = 'never';
    add(cat, bytes);
    const row = { file, line: s ? s.line : null, selector: r.selector, media: r.media, bytes, staticW, anyW, extraW, phases, routes: u ? Object.keys(u.routes).length : 0 };
    row.cat = cat; result.all.push(row);
    if (cat === 'never') {
      const classes = [...new Set((r.selector.match(/\.[a-zA-Z][\w-]*/g) || []).map(c => c.slice(1)))];
      row.missingClasses = classes.filter(c => !new RegExp('[\\s"\'`{]' + c.replace(/[-]/g, '\\-') + '(?![\\w-])').test(tsx) && !tsx.includes(c.replace(/--.*$/, '--')) );
      result.never.push(row);
    } else if (cat === 'static-some-widths') result.widthOnly.push(row);
    else if (cat === 'interaction-only') result.interactionOnly.push(row);
    else if (cat === 'between-widths-only') result.extraOnly.push(row);
  }
  st.aligned = aligned; st.unmapped = mapped.filter(m => !m.s).length;
  result.files[file] = st;
}
fs.writeFileSync(process.argv[4], JSON.stringify(result, null, 1));
const cats = ['static-all-3', 'static-some-widths', 'interaction-only', 'between-widths-only', 'never'];
console.log('file'.padEnd(52), 'rules bytes', cats.map(c => c.slice(0, 14)).join(' | '), ' (rules/bytes)  aligned unmapped');
for (const [f, s] of Object.entries(result.files).sort((a, b) => b[1].bytes - a[1].bytes)) console.log(f.replace('client/', '').padEnd(52), s.rules, s.bytes, cats.map(c => s.cat[c] ? `${s.cat[c].rules}/${s.cat[c].bytes}` : '-').join(' | '), ' ', s.aligned, s.unmapped);
