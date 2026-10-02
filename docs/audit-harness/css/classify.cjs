const fs = require('fs'); const { execSync } = require('child_process');
const REPO = process.env.REPO || process.cwd();
const agg = require(require('path').resolve(process.argv[2])); const { rules } = require(process.env.S + '/rules.json');
const tsx = execSync(`cd ${REPO}/client/src && find . -name '*.tsx' -not -path '*/admin/*' -print0 | xargs -0 cat`).toString();
const classSets = [...tsx.matchAll(/className=(?:"([^"]+)"|\{`([^`]+)`\})/g)].map(m => (m[1] || m[2]).replace(/\$\{[^}]*\}/g, ' ').split(/\s+/).filter(Boolean));
const shared = rules.filter(r => r.file.endsWith('shared-elements.css') && /^\.bb-[\w-]+$/.test(r.selector) && !r.media);
const INH = /^(color|font|font-family|font-size|font-weight|line-height|letter-spacing|text-align|text-transform|white-space|cursor|list-style|visibility)$/;
const DEF = (p, v) => (/^(margin|padding)(-top|-bottom|-left|-right)?$/.test(p) && /^0( 0)*$/.test(v)) || (p === 'list-style' && v === 'none') || (p === 'object-position' && /^(center|50% 50%|center center)$/.test(v)) || (p === 'text-decoration' && v === 'none') || (p === 'max-width' && v === '100%') || (p === 'cursor' && v === 'pointer') || (p === 'box-sizing') || (p === 'display' && v === 'block');
const out = {};
for (const [file, r] of Object.entries(agg)) {
  const rows = r.redundant.map(x => {
    let kind = x.flag || '';
    const last = x.selector.split(',')[0].trim().split(/\s+/).pop();
    if (!kind && /^\.[\w-]+(\.[\w-]+)*$/.test(last)) { const subj = last.match(/\.[\w-]+/g).map(c => c.slice(1));
      const co = new Set(classSets.filter(s => subj.every(c => s.includes(c))).flat().filter(c => c.startsWith('bb-')));
      const hit = shared.find(s => co.has(s.selector.slice(1)) && s.decls.some(d => d.prop === x.prop && d.value === x.value));
      if (hit && !file.startsWith('shared')) kind = 'dubblerar ' + hit.selector; }
    if (!kind && DEF(x.prop, x.value)) kind = 'standardvärde (UA/preflight/base)';
    if (!kind && INH.test(x.prop)) kind = 'ärvt värde';
    if (!kind && /^--/.test(x.prop)) kind = 'oanvänd variabel';
    if (!kind) kind = 'övrigt (samma resultat ändå)';
    return { ...x, kind };
  });
  out[file] = rows;
  const k = {}; rows.forEach(x => { const key = x.kind.startsWith('dubblerar') ? 'dubblerar .bb-*' : x.kind; k[key] = k[key] || [0, 0]; k[key][0]++; k[key][1] += x.bytes; });
  console.log('\n## ' + file); for (const [kk, [n, b]] of Object.entries(k).sort((a, b) => b[1][0] - a[1][0])) console.log(`   ${kk}: ${n} decl, ${b} B`);
}
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
