const fs = require('fs');
const { rules } = JSON.parse(fs.readFileSync(process.argv[2]));
const R = rules.filter(r => !/tailwind|design-tokens/.test(r.file));
const short = f => f.replace(/^.*\//, '');
const has = (r, p, re) => r.decls.some(d => d.prop === p && (!re || re.test(d.value)));
const groups = {
  glass: r => has(r, 'backdrop-filter') || has(r, '-webkit-backdrop-filter'),
  pageRoot: r => /^\.[a-z0-9-]+(-page|__page)?$/.test(r.selector) && has(r, 'min-height', /100vh/),
  resets: r => /:where\((a|button|img)/.test(r.selector) || /:where\(\.[a-z-]+\) :where/.test(r.selector) || /^\.[a-z0-9-]+ \*, /.test(r.selector) || /^\.[a-z-]+ \*,/.test(r.selector),
  boxSizing: r => has(r, 'box-sizing'),
  objectFit: r => has(r, 'object-fit'),
  pictureFill: r => /picture/.test(r.selector) && has(r, 'height', /100%/) && has(r, 'width', /100%/),
  cardRadiusShadow: r => has(r, 'border-radius', /radius-card/) && (has(r, 'box-shadow', /shadow-card|shadow-floating/)),
  cardRadiusOnly: r => has(r, 'border-radius', /radius-card/),
  overlayPseudo: r => /::?(after|before)/.test(r.selector) && r.decls.some(d => /background/.test(d.prop) && /gradient/.test(d.value)),
  veil: r => r.decls.some(d => d.prop === 'background-image' && /gradient/.test(d.value) && /image-set|url\(/.test(d.value)),
  fallbackVar: r => r.decls.some(d => /var\(--bb-[a-z0-9-]+,/.test(d.value)),
  touch44: r => has(r, 'min-height', /44px/),
  reducedMotionStar: r => /prefers-reduced-motion/.test(r.media) && /\*/.test(r.selector),
};
for (const [g, fn] of Object.entries(groups)) {
  const m = R.filter(fn);
  const files = {}; m.forEach(r => (files[short(r.file)] ||= []).push(r.line));
  console.log(`\n### ${g}: ${m.length} rules, ${m.reduce((a, r) => a + r.bytes, 0)} B, ${Object.keys(files).length} files`);
  for (const [f, ls] of Object.entries(files)) console.log(`   ${f}: ${ls.join(', ')}`);
  if (['glass', 'pageRoot', 'veil', 'overlayPseudo', 'boxSizing', 'resets', 'reducedMotionStar'].includes(g)) m.forEach(r => console.log(`     ${short(r.file)}:${r.line} ${r.media ? '[' + r.media + '] ' : ''}${r.selector} { ${r.decls.map(d => d.prop + ':' + d.value.slice(0, 70)).join('; ')} }`));
}
// fallback count of var(--x, fallback)
let fb = 0, fbBytes = 0; const fbFiles = {};
for (const r of R) for (const d of r.decls) { const ms = d.value.match(/var\(--bb-[a-z0-9-]+,[^()]*(\([^()]*\))?[^()]*\)/g) || []; fb += ms.length; ms.forEach(m => { fbBytes += m.length - m.indexOf(',') - 1; }); if (ms.length) fbFiles[short(r.file)] = (fbFiles[short(r.file)] || 0) + ms.length; }
console.log('\nvar() fallbacks:', fb, 'approx fallback bytes', fbBytes, fbFiles);
