// Run from the repo root, or set REPO. Needs the dev server on :5173 and S (scratch output dir). See docs/audit-harness/README.md.
const REPO = process.env.REPO || process.cwd()
const sharp = require(REPO + '/client/node_modules/sharp'); const fs = require('fs');
const D = process.env.S + '/inline-phase0/dom/'; const [A, B] = process.argv.slice(2);
(async () => {
  let bad = 0; const files = fs.readdirSync(D + A).filter(f => f.endsWith('.json')).sort();
  for (const f of files) {
    const a = JSON.parse(fs.readFileSync(D + A + '/' + f)), b = JSON.parse(fs.readFileSync(D + B + '/' + f));
    let diffs = []; if (a.length !== b.length) { diffs.push(`ELEMENT COUNT ${a.length} -> ${b.length}`); }
    else for (let k = 0; k < a.length; k++) for (const key of Object.keys(a[k])) { if (key === 'i') continue; if (JSON.stringify(a[k][key]) !== JSON.stringify(b[k][key])) diffs.push(`#${k} <${a[k].t}> ${key}: ${JSON.stringify(a[k][key])} -> ${JSON.stringify(b[k][key])}`); }
    const pa = await sharp(D + A + '/' + f.replace('.json', '.png')).raw().toBuffer({ resolveWithObject: true }), pb = await sharp(D + B + '/' + f.replace('.json', '.png')).raw().toBuffer({ resolveWithObject: true });
    let px = 0; const sameSize = pa.info.width === pb.info.width && pa.info.height === pb.info.height;
    if (sameSize) for (let i = 0; i < pa.data.length; i += pa.info.channels) if (pa.data[i] !== pb.data[i] || pa.data[i + 1] !== pb.data[i + 1] || pa.data[i + 2] !== pb.data[i + 2]) px++;
    const ok = !diffs.length && sameSize && px === 0; if (!ok) bad++;
    console.log((ok ? 'IDENTICAL ' : 'DIFFERS   ') + f.replace('.json', '').padEnd(34) + `elements ${a.length}  property diffs ${diffs.length}  pixel diffs ${sameSize ? px : 'SIZE ' + pa.info.height + '->' + pb.info.height}`);
    if (!ok) diffs.slice(0, 6).forEach(d => console.log('      ' + d));
  }
  console.log(bad ? `\n${bad} of ${files.length} page-states differ` : `\nALL ${files.length} page-states identical`);
})();
