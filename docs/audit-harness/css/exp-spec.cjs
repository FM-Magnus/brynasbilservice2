const FAM = ['/service-reparationer', '/reparationer-storre-arbeten', '/felsokning', '/dackservice', '/ac-service'];
const GUIDES = ['/oljebyte', '/kamrem', '/koppling', '/bromssystem', '/bilbatteri', '/stodampare-fjadrar', '/hjullagerbyte', '/avgassystem', '/drivaxel-drivknutar', '/styrning-kulleder', '/gat'];
const sel = (f, s, m, n) => `__ops.setSelector(${JSON.stringify(f)}, ${JSON.stringify(s)}, ${m === undefined ? 'undefined' : JSON.stringify(m)}, ${JSON.stringify(n)})`;
const L = a => `[${a.join(',')}]`;
const RM = [
  ['AboutPage.css', '.omoss-page *'], ['BargningPage.css', '.bargning-page *'],
  ['BiltjansterPage.css', '.biltjanster-hub *, .biltjanster-hub *::before, .biltjanster-hub *::after'],
  ['ContactPage.css', '.kontakt-page *, .kontakt-page *::before, .kontakt-page *::after'],
  ['LandingPage.css', '.landing-v2 *, .landing-v2 *::before, .landing-v2 *::after'],
  ['ServiceGuideTemplate.css', '.service-guide *, .service-guide *::before, .service-guide *::after'],
  ['PublicHeader.css', '.public-header, .public-header *'],
];
module.exports = [
 { id: 'O1', title: 'PublicFooter `.bb-footer.bb-footer` (650px block) -> `.bb-footer`', routes: ['/', '/bargning', '/felsokning'], widths: [390], mutate: L([sel('PublicFooter.css', '.bb-footer.bb-footer', '(max-width: 650px)', '.bb-footer')]) },
 { id: 'O2', title: 'PublicHeader `.public-header__mobile-link.public-header__mobile-link--sub` -> single class', routes: ['/', '/felsokning'], widths: [768, 390], mutate: L([sel('PublicHeader.css', '.public-header__mobile-link.public-header__mobile-link--sub', '(max-width: 1186px)', '.public-header__mobile-link--sub')]) },
 { id: 'O3a', title: 'AboutPage CTA glass buttons: drop the `.bb-btn` from `.omoss-page__cta-card .bb-btn.X` (3 resting rules)', routes: ['/om-oss'], mutate: L([
    sel('AboutPage.css', '.omoss-page__cta-card .bb-btn.bb-btn--teal', undefined, '.omoss-page__cta-card .bb-btn--teal'),
    sel('AboutPage.css', '.omoss-page__cta-card .bb-btn.omoss-page__cta-secondary-btn', undefined, '.omoss-page__cta-card .omoss-page__cta-secondary-btn'),
    sel('AboutPage.css', '.omoss-page__cta-card .bb-btn.omoss-page__cta-phone-btn', undefined, '.omoss-page__cta-card .omoss-page__cta-phone-btn')]) },
 { id: 'O3b', title: 'AboutPage CTA glass buttons: same for the three :hover rules (hover forced)', routes: ['/om-oss'], hover: ['.omoss-page__cta-card .bb-btn'], mutate: L([
    sel('AboutPage.css', '.omoss-page__cta-card .bb-btn.bb-btn--teal:hover', undefined, '.omoss-page__cta-card .bb-btn--teal:hover'),
    sel('AboutPage.css', '.omoss-page__cta-card .bb-btn.omoss-page__cta-secondary-btn:hover', undefined, '.omoss-page__cta-card .omoss-page__cta-secondary-btn:hover'),
    sel('AboutPage.css', '.omoss-page__cta-card .bb-btn.omoss-page__cta-phone-btn:hover', undefined, '.omoss-page__cta-card .omoss-page__cta-phone-btn:hover')]) },
 { id: 'O4', title: 'Bärgning + Landing hero slide crops: drop `.bb-hero__slide` from `.page .bb-hero__slide.page__hero-slide--x img`', routes: ['/', '/bargning'], mutate: L([
    sel('BargningPage.css', '.bargning-page__hero .bb-hero__slide.bargning-page__hero-slide--highway img', undefined, '.bargning-page__hero .bargning-page__hero-slide--highway img'),
    sel('BargningPage.css', '.bargning-page__hero .bb-hero__slide.bargning-page__hero-slide--phone img', '(max-width: 650px)', '.bargning-page__hero .bargning-page__hero-slide--phone img'),
    sel('LandingPage.css', '.landing-v2 .bb-hero__slide.landing-v2__hero-slide--phone img', '(max-width: 650px)', '.landing-v2 .landing-v2__hero-slide--phone img'),
    sel('LandingPage.css', '.landing-v2 .bb-hero__slide.landing-v2__hero-slide--key img', '(min-width: 651px) and (max-width: 1100px)', '.landing-v2 .landing-v2__hero-slide--key img')]) },
 { id: 'O5', title: 'ServiceReparationer `.bilservice__symptom-grid.bilservice__symptom-grid--auto` -> single class', routes: FAM, mutate: L([sel('ServiceReparationerPage.css', '.bilservice__symptom-grid.bilservice__symptom-grid--auto', undefined, '.bilservice__symptom-grid--auto')]) },
 { id: 'O6', title: 'ServiceReparationer `.bb-card--trust.bilservice__closing-card` (4 rules) -> `.bilservice__closing-card`', routes: ['/dackservice'], mutate: L([
    sel('ServiceReparationerPage.css', '.bb-card--trust.bilservice__closing-card', '', '.bilservice__closing-card'),
    sel('ServiceReparationerPage.css', '.bb-card--trust.bilservice__closing-card h3', undefined, '.bilservice__closing-card h3'),
    sel('ServiceReparationerPage.css', '.bb-card--trust.bilservice__closing-card .bb-lead', undefined, '.bilservice__closing-card .bb-lead'),
    sel('ServiceReparationerPage.css', '.bb-card--trust.bilservice__closing-card', '(max-width: 650px)', '.bilservice__closing-card')]) },
 { id: 'O7', title: 'ServiceReparationer id selectors `.bilservice > #x` -> `.bilservice > [id="x"]` (1,1,0 -> 0,2,0)', routes: FAM, mutate: `(() => { let n = 0; const sh = __sheet('ServiceReparationerPage.css'); const walk = rs => { for (const r of rs) { if (r.media) walk(r.cssRules); else if (r.selectorText && /#/.test(r.selectorText)) { r.selectorText = r.selectorText.replace(/#([a-z-]+)/g, '[id="$1"]'); n++; } } }; walk(sh.cssRules); return n; })()` },
 { id: 'O8', title: 'Guide symptom rows `.row.row--featured p` -> `.row--featured p` (documented as required)', routes: GUIDES, mutate: L([
    sel('ServiceGuideTemplate.css', '.service-guide__symptom-row.service-guide__symptom-row--featured h3, .service-guide__symptom-row.service-guide__symptom-row--featured p', undefined, '.service-guide__symptom-row--featured h3, .service-guide__symptom-row--featured p'),
    sel('ServiceGuideTemplate.css', '.service-guide__symptom-row.service-guide__symptom-row--urgent h3, .service-guide__symptom-row.service-guide__symptom-row--urgent p', undefined, '.service-guide__symptom-row--urgent h3, .service-guide__symptom-row--urgent p')]) },
 { id: 'O9', title: 'shared `.bb-process-grid.bb-process-grid--3` -> `.bb-process-grid--3` (only Om oss uses --3)', routes: ['/om-oss'], widths: [1440], mutate: L([sel('shared-elements.css', '.bb-process-grid.bb-process-grid--3', '(min-width: 1025px)', '.bb-process-grid--3')]) },
 { id: 'O10a', title: 'shared shade: drop the `.bb-hero__shade.bb-shade-copy-left` half of the three selector lists (no reorder)', routes: 'all', mutate: `(() => { let n = 0; const sh = __sheet('shared-elements.css'); const walk = rs => { for (const r of rs) { if (r.media) walk(r.cssRules); else if (r.selectorText && /\\.bb-hero__shade\\.bb-shade-copy-left/.test(r.selectorText)) { r.selectorText = '.bb-shade-copy-left'; n++; } } }; walk(sh.cssRules); return n; })()` },
 { id: 'O10b', title: 'shared shade: same, plus `.bb-hero__shade` moved to the top of the file and its redundant 650px background:none removed', routes: 'all', mutate: `(() => { let n = 0; const sh = __sheet('shared-elements.css'); const walk = rs => { for (const r of rs) { if (r.media) walk(r.cssRules); else if (r.selectorText && /\\.bb-hero__shade\\.bb-shade-copy-left/.test(r.selectorText)) { r.selectorText = '.bb-shade-copy-left'; n++; } } }; walk(sh.cssRules); return [n, __ops.moveToStart('shared-elements.css', '.bb-hero__shade', ''), __ops.removeDecls('shared-elements.css', '.bb-hero__shade', '(max-width: 650px)', ['background'])]; })()` },
 { id: 'O11', title: 'Reduced-motion `!important` dropped in the seven `.page *` rules (reduced motion on, transitions kept)', routes: ['/', '/om-oss', '/bargning', '/biltjanster', '/kontakt', '/oljebyte'], widths: [1440, 390], keepTransitions: true, reducedMotion: 'reduce',
   mutate: L(RM.map(([f, s]) => `__ops.dropImportant(${JSON.stringify(f)}, ${JSON.stringify(s)}, '(prefers-reduced-motion: reduce)')`)) },
 { id: 'O12', title: 'PublicHeader `[hidden] { display: none !important }` (2 rules): drop !important', routes: ['/', '/felsokning'], widths: [768, 390], mutate: L([`__ops.dropImportant('PublicHeader.css', '.public-header__mobile-panel[hidden]', '(max-width: 1186px)')`, `__ops.dropImportant('PublicHeader.css', '.public-header__mobile-sub[hidden]', '(max-width: 1186px)')`]) },
 { id: 'O13', title: 'PublicHeader resets `.public-header a` / `.public-header button` (0,1,1) -> :where() form (0,0,0 / 0,0,1)', routes: ['/', '/felsokning', '/oljebyte'], mutate: L([sel('PublicHeader.css', '.public-header a', undefined, ':where(.public-header) a'), `__ops.setSelector('PublicHeader.css', '.public-header button', undefined, ':where(.public-header) :where(button)')`]) },
];
