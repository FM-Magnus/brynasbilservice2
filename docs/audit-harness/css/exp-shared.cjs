const { rules } = require(process.env.S + '/rules.json');
const base = f => f.replace(/^.*\//, '');
const has = (r, p, re) => r.decls.some(d => d.prop === p && (!re || re.test(d.value)));
const scope = r => !/tailwind|design-tokens|shared-elements/.test(r.file);
const L = a => `[${a.join(',')}]`;
const J = JSON.stringify;
const FAM = ['/service-reparationer', '/reparationer-storre-arbeten', '/felsokning', '/dackservice', '/ac-service'];
const GUIDES = ['/oljebyte', '/kamrem', '/koppling', '/bromssystem', '/bilbatteri', '/stodampare-fjadrar', '/hjullagerbyte', '/avgassystem', '/drivaxel-drivknutar', '/styrning-kulleder', '/gat'];
// P2: media fill
const fill = rules.filter(r => scope(r) && !r.media && !/[:]/.test(r.selector) && ((has(r, 'height', /^100%$/) && has(r, 'width', /^100%$/) && has(r, 'object-fit', /cover/)) || (/picture/.test(r.selector) && has(r, 'display', /block/) && has(r, 'height', /^100%$/) && has(r, 'width', /^100%$/))));
// P3: card surface
const card = rules.filter(r => scope(r) && !r.media && !/:/.test(r.selector) && has(r, 'border-radius', /var\(--bb-radius-card/) && has(r, 'box-shadow', /^var\(--bb-shadow-card/));
const mk = (list, cls, props) => `[${list.map(r => `[__ops.addClass(${J(r.selector)}, ${J(cls)}), __ops.removeDecls(${J(base(r.file))}, ${J(r.selector)}, '', ${J(props)})]`).join(',')}]`;
module.exports = [
 { id: 'P1', title: 'Page root: identical `.omoss-page` / `.bargning-page` root rules -> one `.bb-page` in shared-elements.css', routes: ['/om-oss', '/bargning'],
   mutate: L([`__ops.insert('shared-elements.css', '.bb-page{background-color:var(--bb-color-page);color:var(--bb-color-text);font-family:var(--bb-font-body);font-size:var(--bb-font-size-body);line-height:var(--bb-line-height-body);min-height:100vh;overflow-x:hidden;position:relative;width:100%}')`,
     `__ops.addClass('.omoss-page, .bargning-page', 'bb-page')`, `__ops.deleteRule('AboutPage.css', '.omoss-page', '')`, `__ops.deleteRule('BargningPage.css', '.bargning-page', '')`]) },
 { id: 'P2', title: `Media fill: ${fill.length} rules -> shared .bb-media-fill {display:block;height:100%;width:100%;object-fit:cover}`, files: fill.map(r => base(r.file) + ':' + r.line), routes: 'all',
   mutate: `[__ops.insert('shared-elements.css', '.bb-media-fill{display:block;height:100%;object-fit:cover;width:100%}'), ${mk(fill, 'bb-media-fill', ['display', 'height', 'width', 'object-fit'])}]` },
 { id: 'P3', title: `Card surface: ${card.length} rules -> shared .bb-card-surface {border-radius:card;box-shadow:card}`, files: card.map(r => base(r.file) + ':' + r.line), routes: 'all',
   mutate: `[__ops.insert('shared-elements.css', '.bb-card-surface{border-radius:var(--bb-radius-card);box-shadow:var(--bb-shadow-card)}'), ${mk(card, 'bb-card-surface', ['border-radius', 'box-shadow'])}]` },
 { id: 'P3h', title: 'Card surface, with hover forced on the cards (hover rules that change shadow must still win)', routes: ['/bargning', '/dackservice'], hover: ['.bargning-page__scenario-card', '.bilservice__tire-card'],
   mutate: `[__ops.insert('shared-elements.css', '.bb-card-surface{border-radius:var(--bb-radius-card);box-shadow:var(--bb-shadow-card)}'), ${mk(card, 'bb-card-surface', ['border-radius', 'box-shadow'])}]` },
 { id: 'P4a', title: 'Glass, strict: one .bb-glass with Bärgning values (blur 12px, its shadow) on Om oss CTA buttons + Bärgning process cards', routes: ['/om-oss', '/bargning'],
   mutate: L([`__ops.insert('shared-elements.css', '.bb-glass{-webkit-backdrop-filter:blur(12px) saturate(1.4);backdrop-filter:blur(12px) saturate(1.4);box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 12px 32px rgba(0,0,0,.3)}')`,
     `__ops.addClass('.omoss-page__cta-card .bb-btn, .bargning-page__process-card', 'bb-glass')`,
     `__ops.removeDecls('AboutPage.css', '.omoss-page__cta-card .bb-btn', '', ['-webkit-backdrop-filter', 'backdrop-filter', 'box-shadow'])`,
     `__ops.removeDecls('BargningPage.css', '.bargning-page__process-card', '', ['-webkit-backdrop-filter', 'backdrop-filter', 'box-shadow'])`]) },
 { id: 'P4b', title: 'Glass, parametrised: .bb-glass reads --bb-glass-blur / --bb-glass-shadow; each page sets its own values', routes: ['/om-oss', '/bargning'],
   mutate: L([`__ops.insert('shared-elements.css', '.bb-glass{-webkit-backdrop-filter:blur(var(--bb-glass-blur)) saturate(1.4);backdrop-filter:blur(var(--bb-glass-blur)) saturate(1.4);box-shadow:var(--bb-glass-shadow)}')`,
     `__ops.addClass('.omoss-page__cta-card .bb-btn, .bargning-page__process-card', 'bb-glass')`,
     `__ops.removeDecls('AboutPage.css', '.omoss-page__cta-card .bb-btn', '', ['-webkit-backdrop-filter', 'backdrop-filter', 'box-shadow'])`,
     `__ops.setDecl('AboutPage.css', '.omoss-page__cta-card .bb-btn', '', '--bb-glass-blur', '10px')`, `__ops.setDecl('AboutPage.css', '.omoss-page__cta-card .bb-btn', '', '--bb-glass-shadow', 'inset 0 1px 0 rgba(255, 255, 255, 0.28), 0 6px 18px rgba(0, 0, 0, 0.28)')`,
     `__ops.removeDecls('BargningPage.css', '.bargning-page__process-card', '', ['-webkit-backdrop-filter', 'backdrop-filter', 'box-shadow'])`,
     `__ops.setDecl('BargningPage.css', '.bargning-page__process-card', '', '--bb-glass-blur', '12px')`, `__ops.setDecl('BargningPage.css', '.bargning-page__process-card', '', '--bb-glass-shadow', 'inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 12px 32px rgba(0, 0, 0, 0.3)')`]) },
 { id: 'P5', title: 'Action rows: six identical {display:flex;flex-wrap:wrap;gap:.75rem} rules -> shared .bb-actions', routes: ['/bilar-till-salu', '/biltjanster', '/kontakt', '/galleri'],
   mutate: `[__ops.insert('shared-elements.css', '.bb-actions{display:flex;flex-wrap:wrap;gap:.75rem}'), ${['BilarTillSalu.css|.bilartillsalu-page__closing-actions', 'BiltjansterPage.css|.biltjanster-hub__hero-actions', 'BiltjansterPage.css|.biltjanster-hub__cta-actions', 'ContactPage.css|.kontakt-page__closing-actions', 'GalleryPage.css|.galleri-page__actions', 'GalleryPage.css|.galleri-page__closing-actions'].map(x => { const [f, s] = x.split('|'); return `[__ops.addClass(${J(s)}, 'bb-actions'), __ops.removeDecls(${J(f)}, ${J(s)}, '', ['display','flex-wrap','gap'])]`; }).join(',')}]` },
 { id: 'P6', title: 'Photo CTA cards (Om oss, Bärgning, Kontakt, Däckservice) -> shared .bb-photo-card {background-color ink-950; position center; size cover; color inverse}', routes: ['/om-oss', '/bargning', '/kontakt', '/dackservice'],
   mutate: `[__ops.insert('shared-elements.css', '.bb-photo-card{background-color:var(--bb-color-ink-950);background-position:center;background-size:cover;color:var(--bb-color-text-inverse)}'), ${['AboutPage.css|.omoss-page__cta-card', 'BargningPage.css|.bargning-page__cta-card', 'ContactPage.css|.kontakt-page__closing-card', 'ServiceReparationerPage.css|.bb-card--trust.bilservice__closing-card'].map(x => { const [f, s] = x.split('|'); return `[__ops.addClass(${J(s)}, 'bb-photo-card'), __ops.removeDecls(${J(f)}, ${J(s)}, '', ['background-color','background-position','background-size','color'])]`; }).join(',')}]` },
 { id: 'P7', title: 'Image overlay: Bärgning scenario photo + Guide intro/symptom media ::after -> shared .bb-overlay::after {content;inset:0;position:absolute}', routes: ['/bargning', ...GUIDES],
   mutate: `[__ops.insert('shared-elements.css', ".bb-overlay::after{content:'';inset:0;position:absolute}"), ${['BargningPage.css|.bargning-page__scenario-photo', 'ServiceGuideTemplate.css|.service-guide__intro-media', 'ServiceGuideTemplate.css|.service-guide__symptoms-media'].map(x => { const [f, s] = x.split('|'); return `[__ops.addClass(${J(s)}, 'bb-overlay'), __ops.removeDecls(${J(f)}, ${J(s + '::after')}, '', ['content','inset','position'])]`; }).join(',')}]` },
];
if (require.main === module) { console.log(module.exports.map(e => e.id + ': ' + e.title + (e.files ? '\n   ' + e.files.join(' ') : '')).join('\n')); }
