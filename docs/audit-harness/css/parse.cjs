// Static inventory of every public CSS file: rules, @media share, specificity flags, sizes.
const REPO = process.env.REPO || process.cwd();
const postcss = require(REPO+'/client/node_modules/postcss');
const sp = require(REPO+'/client/node_modules/postcss-selector-parser');
const esbuild = require(REPO+'/client/node_modules/esbuild');
const zlib = require('zlib'); const fs = require('fs'); const { execSync } = require('child_process');
const files = execSync(`cd ${REPO} && find client/src -name '*.css' | sort`).toString().trim().split('\n');
const out = { files: {}, rules: [] };
for (const f of files) {
  const src = fs.readFileSync(REPO + '/' + f, 'utf8');
  const root = postcss.parse(src, { from: f });
  let commentBytes = 0; root.walkComments(c => { commentBytes += Buffer.byteLength(c.toString()); });
  const min = esbuild.transformSync(src, { loader: 'css', minify: true }).code;
  const st = { lines: src.split('\n').length - (src.endsWith('\n') ? 1 : 0), bytes: Buffer.byteLength(src), commentBytes,
    minBytes: Buffer.byteLength(min), gzip: zlib.gzipSync(min, { level: 9 }).length, brotli: zlib.brotliCompressSync(Buffer.from(min)).length,
    rules: 0, rulesInMedia: 0, decls: 0, declsInMedia: 0, important: 0, where: 0, doubled: 0, ids: 0, mediaBlocks: 0, keyframes: 0 };
  root.walkAtRules(a => { if (a.name === 'media') st.mediaBlocks++; if (/keyframes/.test(a.name)) st.keyframes++; });
  root.walkRules(r => {
    if (r.parent && r.parent.type === 'atrule' && /keyframes/.test(r.parent.name)) return;
    const media = []; let p = r.parent; while (p && p.type !== 'root') { if (p.type === 'atrule') media.unshift('@' + p.name + ' ' + p.params); p = p.parent; }
    const decls = []; r.each(n => { if (n.type === 'decl') decls.push({ prop: n.prop, value: n.value.replace(/\s+/g, ' ').trim(), important: !!n.important }); });
    st.rules++; st.decls += decls.length; if (media.length) { st.rulesInMedia++; st.declsInMedia += decls.length; }
    st.important += decls.filter(d => d.important).length;
    const flags = new Set(); const specs = [];
    try {
      sp(sel => {
        sel.each(s => {
          // specificity per complex selector
          let a = 0, b = 0, c = 0;
          s.walk(n => {
            if (n.type === 'id') a++;
            else if (n.type === 'class' || n.type === 'attribute') b++;
            else if (n.type === 'pseudo') {
              if (n.value === ':where') { flags.add('where'); return false; }
              if (/^::/.test(n.value) || /^:(before|after)$/.test(n.value)) c++;
              else if (!/^:(not|is|has)$/.test(n.value)) b++;
            } else if (n.type === 'tag' && n.value !== '*') c++;
          });
          specs.push([a, b, c]);
          if (a) flags.add('id');
          // compounds with two or more classes
          let compound = [];
          const flush = () => {
            const cls = compound.filter(n => n.type === 'class').map(n => n.value);
            if (cls.length >= 2) {
              const uniq = new Set(cls);
              if (uniq.size < cls.length) flags.add('repeat-class');
              else {
                const blocks = cls.map(c => c.split(/__|--/)[0]);
                const bases = cls.map(c => c.replace(/--.*$/, ''));
                if (cls.some(c => /--/.test(c)) && new Set(bases).size < bases.length) flags.add('base+modifier');
                else if (cls.some(c => /^is-|^has-/.test(c))) flags.add('state-class');
                else flags.add('cross-compound');
              }
            }
            compound = [];
          };
          s.each(n => { if (n.type === 'combinator') flush(); else compound.push(n); }); flush();
        });
      }).processSync(r.selector);
    } catch (e) { flags.add('PARSE-ERR'); }
    if (flags.has('where')) st.where++;
    if (flags.has('repeat-class') || flags.has('base+modifier') || flags.has('cross-compound')) st.doubled++;
    if (flags.has('id')) st.ids++;
    out.rules.push({ file: f, line: r.source.start.line, endLine: r.source.end.line, start: r.source.start.offset, end: r.source.end.offset,
      bytes: Buffer.byteLength(src.slice(r.source.start.offset, r.source.end.offset + 1)), selector: r.selector.replace(/\s+/g, ' '), media: media.join(' '), decls, flags: [...flags], specs });
  });
  out.files[f] = st;
}
fs.writeFileSync(process.argv[2], JSON.stringify(out));
const T = Object.entries(out.files).sort((a, b) => b[1].lines - a[1].lines);
console.log('file lines bytes comment% min gz br rules inMedia% decls imp where doubled ids');
for (const [f, s] of T) console.log(f.replace('client/src/', ''), s.lines, s.bytes, Math.round(100 * s.commentBytes / s.bytes) + '%', s.minBytes, s.gzip, s.brotli, s.rules, Math.round(100 * s.rulesInMedia / s.rules) + '%', s.decls, s.important, s.where, s.doubled, s.ids);
const sum = k => T.reduce((a, [, s]) => a + s[k], 0);
console.log('TOTAL', sum('lines'), sum('bytes'), Math.round(100 * sum('commentBytes') / sum('bytes')) + '%', sum('minBytes'), sum('gzip'), sum('brotli'), sum('rules'), Math.round(100 * sum('rulesInMedia') / sum('rules')) + '%', sum('decls'), sum('important'), sum('where'), sum('doubled'), sum('ids'));
