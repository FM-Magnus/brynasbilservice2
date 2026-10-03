// Apply scenario edits to in-memory copies of the CSS and measure lines/bytes/min/gzip/brotli. Never writes the repo.
const REPO = process.env.REPO || process.cwd();
const postcss = require(REPO + '/client/node_modules/postcss');
const esbuild = require(REPO + '/client/node_modules/esbuild');
const zlib = require('zlib'); const fs = require('fs'); const { execSync } = require('child_process');
const FILES = execSync(`cd ${REPO} && find client/src -name '*.css' | sort`).toString().trim().split('\n');
const nrm = x => x.replace(/\s+/g, '').replace(/"/g, "'");
const load = () => Object.fromEntries(FILES.map(f => [f.replace(/^.*\//, ''), postcss.parse(fs.readFileSync(REPO + '/' + f, 'utf8'))]));
const mediaOf = r => { const m = []; let p = r.parent; while (p && p.type !== 'root') { if (p.type === 'atrule') m.unshift(p.params); p = p.parent; } return m.join(' '); };
const find = (roots, f, sel, media) => { const out = []; roots[f].walkRules(r => { if (nrm(r.selector) === nrm(sel) && (media === undefined || nrm(mediaOf(r)) === nrm(media))) out.push(r); }); return out; };
const ops = {
  deleteRule: (R, f, sel, media = '') => { const rs = find(R, f, sel, media); rs.forEach(r => { const p = r.parent; r.remove(); if (p.type === 'atrule' && !p.nodes.length) p.remove(); }); return rs.length; },
  removeDecls: (R, f, sel, media, props) => { let n = 0; find(R, f, sel, media).forEach(r => r.walkDecls(d => { if (props.includes(d.prop)) { d.remove(); n++; } })); return n; },
  setSelector: (R, f, sel, media, next) => { const rs = find(R, f, sel, media); rs.forEach(r => { r.selector = next; }); return rs.length; },
  append: (R, f, css) => { R[f].append(postcss.parse(css)); return 1; },
  stripFallbacks: (R, f) => { let n = 0; R[f].walkDecls(d => { const v = d.value; let w = v, prev; do { prev = w; w = w.replace(/var\((--bb-[a-z0-9-]+),[^()]*?(\([^()]*\)[^()]*?)*\)/g, 'var($1)'); } while (w !== prev); if (w !== v) { d.value = w; n++; } }); return n; },
  dropDecl: (R, f, line, prop) => { let n = 0; R[f].walkRules(r => { if (r.source.start.line === line) r.walkDecls(d => { if (d.prop === prop && d.parent === r) { d.remove(); n++; } }); }); return n; },
  dropRuleAt: (R, f, line) => { let n = 0; R[f].walkRules(r => { if (r.source.start.line === line) { const p = r.parent; r.remove(); n++; if (p.type === 'atrule' && !p.nodes.length) p.remove(); } }); return n; },
  stripComments: (R, f) => { let n = 0; R[f].walkComments(c => { c.remove(); n++; }); return n; },
};
const measure = (R) => Object.fromEntries(Object.entries(R).map(([f, root]) => { const css = root.toString(); let min = ''; try { min = esbuild.transformSync(css, { loader: 'css', minify: true }).code; } catch (e) { min = css; }
  return [f, { lines: css.split('\n').length, bytes: Buffer.byteLength(css), min: Buffer.byteLength(min), gz: zlib.gzipSync(min, { level: 9 }).length, br: zlib.brotliCompressSync(Buffer.from(min)).length }]; }));
module.exports = { load, ops, measure };
if (require.main === module) {
  const scen = require(require('path').resolve(process.argv[2]));
  const base = measure(load());
  for (const [name, edits] of Object.entries(scen)) {
    const R = load(); const applied = edits.map(([op, ...a]) => ops[op](R, ...a));
    const after = measure(R);
    const files = Object.keys(base).filter(f => JSON.stringify(base[f]) !== JSON.stringify(after[f]));
    const d = k => files.reduce((s, f) => s + base[f][k] - after[f][k], 0);
    console.log(`\n### ${name}: edits applied ${applied.filter(x => x).length}/${edits.length} (zero-applied: ${edits.filter((e, i) => !applied[i]).map(e => e.slice(0, 3).join(' ')).join('; ') || '-'})`);
    console.log(`   saved: lines ${d('lines')}, source B ${d('bytes')}, minified B ${d('min')}, gzip B ${d('gz')} (per-file sum), brotli B ${d('br')}`);
    for (const f of files) console.log(`   ${f}: lines ${base[f].lines}->${after[f].lines}, min ${base[f].min}->${after[f].min}, gz ${base[f].gz}->${after[f].gz}`);
  }
}
