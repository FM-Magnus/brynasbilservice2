// Per-block profile of the four largest files + shared-elements.css
const REPO = process.env.REPO || process.cwd();
const fs = require('fs'); const zlib = require('zlib');
const esbuild = require(REPO + '/client/node_modules/esbuild');
const { rules } = require(process.env.S + '/rules.json');
const cov = fs.existsSync(process.argv[2] || '') ? require(process.argv[2]).all : null;
const B = {
 'client/src/pages/BargningPage.css': [[1,28,'Rot + resets'],[30,134,'Hero (bildspel, beskärning, trust-rad)'],[136,314,'Showcase-kort (split)'],[316,464,'Scenariokort (4 varianter)'],[466,589,'Processband (glaskort)'],[591,711,'Intag/fakta-kort'],[713,777,'Bilar till salu-banner'],[779,830,'Avslutande CTA (fotokort)'],[832,902,'Responsivt (1024/768/560) + RM'],[903,919,'Svans: hero-höjd, telefon, 44px']],
 'client/src/pages/AboutPage.css': [[1,28,'Rot + resets'],[30,136,'Hero (bildspel, skugga, recensionskort)'],[138,357,'Berättelse + fakta + öppettider + citat'],[359,471,'Principer (fotobakgrund)'],[473,511,'Processband (rubrik)'],[513,593,'CTA (fotokort + glasknappar)'],[595,641,'Responsivt + RM + svans']],
 'client/src/pages/ServiceReparationerPage.css': [[1,39,'Familjerot, lokala variabler, resets'],[41,61,'Container/sektionsrytm'],[63,76,'AC-hero + actions'],[78,107,'Bildramar, split, intro'],[109,146,'Editorial, prosa, ledger'],[148,196,'Nivåkort, bridge, process'],[197,293,'Symtomväljare'],[295,346,'Servicekort + checklista'],[348,389,'Datumbanner (däck)'],[391,486,'Däckkort'],[488,562,'Däckhotell + råd'],[564,641,'AC-priskort + not'],[643,671,'Responsivt 1180/900/640'],[672,737,'Svans: hero per id, Däck-avslut, beskärning']],
 'client/src/components/layout/PublicFooter.css': [[1,31,'Rot, box-sizing, wrap'],[33,171,'Grid, varumärkeskolumn, trust-rad, signatur, rubriker'],[173,210,'Sidlista'],[212,296,'Kontaktkort'],[298,418,'Öppettider + knappar'],[420,496,'Bottenrad'],[498,545,'Responsivt 1120/680'],[547,621,'Telefonfot ≤650'],[623,664,'Mobil Ring/Boka-rad ≤767']],
 'client/src/styles/shared-elements.css': [[1,29,'Filhuvud + reset-dokumentation'],[31,98,'Knappar'],[100,122,'Eyebrow'],[124,158,'Rubriker, accent, lead'],[160,190,'Ikonbrickor'],[192,221,'Tips'],[223,273,'Trust-remsa'],[275,364,'Processgrid'],[366,391,'Promokort'],[393,426,'Trust-kort'],[428,585,'Hero-system + skugga']],
};
const cat = p => /^(display|position|inset|top|left|right|bottom|z-index|grid|gap|row-gap|column-gap|flex|align|justify|order|width|height|min-|max-|margin|padding|overflow|isolation|aspect-ratio|box-sizing|place|list-style|object|vertical-align|float|clear)/.test(p) ? 'layout'
  : /^(color|background-color|border-color|opacity|text-shadow|fill|stroke|caret|accent|outline-color|-webkit-text-fill)/.test(p) ? 'färg'
  : /^(background|backdrop-filter|-webkit-backdrop-filter|filter|box-shadow|mask|content)/.test(p) ? 'bakgrund/effekt'
  : /^(font|letter-spacing|line-height|text-|white-space|word|overflow-wrap|hyphens)/.test(p) ? 'typografi'
  : /^(transition|transform|animation|cursor|pointer-events|outline|scroll)/.test(p) ? 'interaktion'
  : /^(border|border-radius)/.test(p) ? 'ram/radie' : /^--/.test(p) ? 'variabel' : 'övrigt';
for (const [file, blocks] of Object.entries(B)) {
  const text = fs.readFileSync(REPO + '/' + file, 'utf8').split('\n');
  console.log('\n## ' + file.replace('client/src/', ''));
  console.log('block | rader | min B | regler | i @media | deklarationsmix | täckning (statisk alla/bredd/interaktion/mellan/aldrig)');
  for (const [a, z, name] of blocks) {
    const src = text.slice(a - 1, z).join('\n');
    let min = ''; try { min = esbuild.transformSync(src, { loader: 'css', minify: true }).code; } catch (e) { min = '?'; }
    const rs = rules.filter(r => r.file === file && r.line >= a && r.line <= z);
    const mix = {}; let nd = 0; rs.forEach(r => r.decls.forEach(d => { const c = cat(d.prop); mix[c] = (mix[c] || 0) + 1; nd++; }));
    const mixs = Object.entries(mix).sort((x, y) => y[1] - x[1]).map(([k, v]) => `${k} ${Math.round(100 * v / nd)}%`).join(', ');
    let covs = '';
    if (cov) { const c = {}; rs.forEach(r => { const row = cov.find(x => x.file === file && x.line === r.line && x.selector === r.selector); const k = row ? row.cat : '?'; c[k] = (c[k] || 0) + 1; });
      covs = ['static-all-3', 'static-some-widths', 'interaction-only', 'between-widths-only', 'never'].map(k => c[k] || 0).join('/') + (c['?'] ? ` (?${c['?']})` : ''); }
    console.log(`${a}–${z} ${name} | ${z - a + 1} | ${Buffer.byteLength(min)} | ${rs.length} | ${rs.filter(r => r.media).length} | ${mixs} | ${covs}`);
  }
}
