const { rules } = require(process.env.S + '/rules.json');
const base = f => f.replace(/^.*\//, '');
const has = (r, p, re) => r.decls.some(d => d.prop === p && (!re || re.test(d.value)));
const scope = r => !/tailwind|design-tokens|shared-elements/.test(r.file);
const fill = rules.filter(r => scope(r) && !r.media && !/[:]/.test(r.selector) && ((has(r, 'height', /^100%$/) && has(r, 'width', /^100%$/) && has(r, 'object-fit', /cover/)) || (/picture/.test(r.selector) && has(r, 'display', /block/) && has(r, 'height', /^100%$/) && has(r, 'width', /^100%$/))));
const card = rules.filter(r => scope(r) && !r.media && !/:/.test(r.selector) && has(r, 'border-radius', /var\(--bb-radius-card/) && has(r, 'box-shadow', /^var\(--bb-shadow-card/));
const four = /BargningPage|AboutPage|ServiceReparationerPage|PublicFooter/;
const SH = 'shared-elements.css';
const P = {
  P1: [['append', SH, '.bb-page{background-color:var(--bb-color-page);color:var(--bb-color-text);font-family:var(--bb-font-body);font-size:var(--bb-font-size-body);line-height:var(--bb-line-height-body);min-height:100vh;overflow-x:hidden;position:relative;width:100%}'], ['deleteRule', 'AboutPage.css', '.omoss-page'], ['deleteRule', 'BargningPage.css', '.bargning-page']],
  P2: [['append', SH, '.bb-media-fill{display:block;height:100%;object-fit:cover;width:100%}'], ...fill.map(r => ['removeDecls', base(r.file), r.selector, '', ['display', 'height', 'width', 'object-fit']])],
  P3: [['append', SH, '.bb-card-surface{border-radius:var(--bb-radius-card);box-shadow:var(--bb-shadow-card)}'], ...card.map(r => ['removeDecls', base(r.file), r.selector, '', ['border-radius', 'box-shadow']])],
  P4b: [['append', SH, '.bb-glass{-webkit-backdrop-filter:blur(var(--bb-glass-blur)) saturate(1.4);backdrop-filter:blur(var(--bb-glass-blur)) saturate(1.4);box-shadow:var(--bb-glass-shadow)}'],
    ['removeDecls', 'AboutPage.css', '.omoss-page__cta-card .bb-btn', '', ['-webkit-backdrop-filter', 'backdrop-filter', 'box-shadow']], ['append', 'AboutPage.css', '.omoss-page__cta-card .bb-btn{--bb-glass-blur:10px;--bb-glass-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 6px 18px rgba(0,0,0,.28)}'],
    ['removeDecls', 'BargningPage.css', '.bargning-page__process-card', '', ['-webkit-backdrop-filter', 'backdrop-filter', 'box-shadow']], ['append', 'BargningPage.css', '.bargning-page__process-card{--bb-glass-blur:12px;--bb-glass-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 12px 32px rgba(0,0,0,.3)}']],
  P5: [['append', SH, '.bb-actions{display:flex;flex-wrap:wrap;gap:.75rem}'], ...['BilarTillSalu.css|.bilartillsalu-page__closing-actions', 'BiltjansterPage.css|.biltjanster-hub__hero-actions', 'BiltjansterPage.css|.biltjanster-hub__cta-actions', 'ContactPage.css|.kontakt-page__closing-actions', 'GalleryPage.css|.galleri-page__actions', 'GalleryPage.css|.galleri-page__closing-actions'].map(x => { const [f, s] = x.split('|'); return ['removeDecls', f, s, '', ['display', 'flex-wrap', 'gap']]; })],
  P6: [['append', SH, '.bb-photo-card{background-color:var(--bb-color-ink-950);background-position:center;background-size:cover;color:var(--bb-color-text-inverse)}'], ...['AboutPage.css|.omoss-page__cta-card', 'BargningPage.css|.bargning-page__cta-card', 'ContactPage.css|.kontakt-page__closing-card', 'ServiceReparationerPage.css|.bb-card--trust.bilservice__closing-card'].map(x => { const [f, s] = x.split('|'); return ['removeDecls', f, s, '', ['background-color', 'background-position', 'background-size', 'color']]; })],
  P7: [['append', SH, ".bb-overlay::after{content:'';inset:0;position:absolute}"], ...['BargningPage.css|.bargning-page__scenario-photo::after', 'ServiceGuideTemplate.css|.service-guide__intro-media::after', 'ServiceGuideTemplate.css|.service-guide__symptoms-media::after'].map(x => { const [f, s] = x.split('|'); return ['removeDecls', f, s, '', ['content', 'inset', 'position']]; })],
};
module.exports = { ...P, 'B all (P1+P2+P3+P4b+P5+P6+P7)': Object.values(P).flat() };
