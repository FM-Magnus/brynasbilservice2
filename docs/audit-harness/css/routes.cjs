// Per-chunk / per-route gzip for scenarios (minified files concatenated per production chunk).
const { load, ops, measure } = require('./patch.cjs');
const esbuild = require((process.env.REPO || process.cwd()) + '/client/node_modules/esbuild');
const zlib = require('zlib');
const CH = { index: ['design-tokens.css', 'base.css', 'shared-elements.css'], PublicFooter: ['PublicHeader.css', 'PublicFooter.css'], App: ['LandingPage.css', 'ContactFormCard.css'], AboutPage: ['AboutPage.css'], BargningPage: ['BargningPage.css'], ServiceReparationerPage: ['ServiceReparationerPage.css'], ServiceGuideTemplate: ['ServiceGuideTemplate.css'], ContactPage: ['ContactPage.css'], GalleryPage: ['GalleryPage.css'], BilarTillSalu: ['BilarTillSalu.css'], BiltjansterPage: ['BiltjansterPage.css'], BiltjansterFaq: ['BiltjansterFaq.css'], GoogleReviewsCard: ['GoogleReviewsCard.css'], GalleryDockStrip: ['GalleryDockStrip.css'], GatPage: ['GatSpotlight.css', 'GatPage.css'] };
const R = { '/': ['App', 'GoogleReviewsCard', 'GalleryDockStrip'], '/om-oss': ['AboutPage', 'GoogleReviewsCard', 'GalleryDockStrip'], '/bargning': ['BargningPage'], '/felsokning': ['ServiceReparationerPage', 'GoogleReviewsCard', 'BiltjansterFaq'], '/service-reparationer': ['ServiceReparationerPage', 'GoogleReviewsCard'], '/oljebyte': ['ServiceGuideTemplate', 'BiltjansterFaq'], '/kontakt': ['ContactPage', 'GoogleReviewsCard'], '/galleri': ['GalleryPage'], '/bilar-till-salu': ['BilarTillSalu'], '/biltjanster': ['BiltjansterPage'] };
const TW = 22583; // tailwind preflight+utilities bytes in the built index.css (measured); utilities 17818 B / 3349 B gz
const chunkGz = (Rts) => { const css = Object.fromEntries(Object.entries(Rts).map(([f, root]) => [f, esbuild.transformSync(root.toString(), { loader: 'css', minify: true }).code]));
  return Object.fromEntries(Object.entries(CH).map(([c, fs]) => { const t = fs.map(f => css[f]).join(''); return [c, { min: Buffer.byteLength(t), gz: zlib.gzipSync(t, { level: 9 }).length }]; })); };
const base = chunkGz(load());
const scen = require(require('path').resolve(process.argv[2]));
const header = ['scenario', ...Object.keys(R)].join(' | ');
console.log(header);
const rowFor = (name, Rts) => { const after = chunkGz(Rts); const cells = Object.entries(R).map(([r, cs]) => { const all = ['index', 'PublicFooter', ...cs]; const b = all.reduce((a, c) => a + base[c].gz, 0), a = all.reduce((x, c) => x + after[c].gz, 0); return `${b - a} B (${(100 * (b - a) / b).toFixed(1)}%)`; }); console.log([name, ...cells].join(' | ')); };
for (const [name, edits] of Object.entries(scen)) { const Rts = load(); edits.forEach(([op, ...a]) => ops[op](Rts, ...a)); rowFor(name, Rts); }
console.log('baseline gz per route (index w/o tailwind + footer + page chunks):', Object.entries(R).map(([r, cs]) => r + ' ' + ['index', 'PublicFooter', ...cs].reduce((a, c) => a + base[c].gz, 0)).join(', '));
