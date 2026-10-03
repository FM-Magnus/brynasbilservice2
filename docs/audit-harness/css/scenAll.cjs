const A1 = Object.values(require('./scenA1.cjs')).flat();
const cls = require(process.env.S + '/classified.json');
const pick = kinds => Object.entries(cls).filter(([f]) => f !== 'shared-elements.css').flatMap(([f, rows]) => rows.filter(x => kinds.some(k => x.kind.startsWith(k))).map(x => ['dropDecl', f, x.line, x.prop]));
const A2 = pick(['dubblerar', 'standardvärde', 'oanvänd variabel']);
const A2x = pick(['ärvt', 'övrigt']);
const B = require('./scenB.cjs')['B all (P1+P2+P3+P4b+P5+P6+P7)'];
module.exports = { 'A1 regelnivå (mätt 0-diff)': A1, 'A1+A2 (+ överflödiga dekl., mätt)': [...A1, ...A2], 'A1+A2+A2x (+ ärvda/övriga, mätt men defensiva)': [...A1, ...A2, ...A2x], 'B delade mönster (mätt 0-diff)': B, 'A1+A2+B': [...A1, ...A2, ...B] };
module.exports.counts = { A2: A2.length, A2x: A2x.length };
