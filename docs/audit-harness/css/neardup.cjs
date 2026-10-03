const fs = require('fs');
const { rules } = JSON.parse(fs.readFileSync(process.argv[2]));
const R = rules.filter(r => !/tailwind|design-tokens/.test(r.file) && r.decls.length >= 3);
const key = d => d.prop + ':' + d.value;
R.forEach(r => { r.set = new Set(r.decls.map(key)); r.props = new Set(r.decls.map(d => d.prop)); });
// union-find
const par = R.map((_, i) => i); const find = i => par[i] === i ? i : (par[i] = find(par[i]));
const edges = [];
for (let i = 0; i < R.length; i++) for (let j = i + 1; j < R.length; j++) {
  const a = R[i], b = R[j];
  let inter = 0; for (const x of a.set) if (b.set.has(x)) inter++;
  const symm = a.set.size + b.set.size - 2 * inter;
  if (inter >= 3 && symm <= 2) { edges.push([i, j, inter, symm]); par[find(i)] = find(j); }
}
const groups = {};
R.forEach((r, i) => { const g = find(i); (groups[g] ||= []).push(r); });
const G = Object.values(groups).filter(g => g.length > 1).sort((a, b) => b.length - a.length);
const short = f => f.replace('client/src/', '').replace(/^.*\//, '');
console.log('near-duplicate clusters (>=3 shared decls, <=2 differing):', G.length, 'rules in clusters:', G.reduce((a, g) => a + g.length, 0));
for (const g of G) {
  const common = [...g[0].set].filter(x => g.every(r => r.set.has(x)));
  const files = [...new Set(g.map(r => short(r.file)))];
  const bytes = g.reduce((a, r) => a + r.bytes, 0);
  console.log(`\n## ${g.length} rules, ${files.length} files, ${bytes} B; common(${common.length}): ${common.join('; ')}`);
  for (const r of g) console.log(`   ${short(r.file)}:${r.line} ${r.media ? '[' + r.media + '] ' : ''}${r.selector.slice(0, 90)}  +{${[...r.set].filter(x => !common.includes(x)).join('; ')}}`);
}
