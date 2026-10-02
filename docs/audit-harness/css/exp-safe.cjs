const FAM = ['/service-reparationer', '/reparationer-storre-arbeten', '/felsokning', '/dackservice', '/ac-service'];
const GUIDES = ['/oljebyte', '/kamrem', '/koppling', '/bromssystem', '/bilbatteri', '/stodampare-fjadrar', '/hjullagerbyte', '/avgassystem', '/drivaxel-drivknutar', '/styrning-kulleder', '/gat'];
const del = (f, s, m = '') => `__ops.deleteRule(${JSON.stringify(f)}, ${JSON.stringify(s)}, ${JSON.stringify(m)})`;
const sum = arr => `[${arr.join(',')}]`;
module.exports = [
 { id: 'S1', title: 'Delete the nine page-level `.x * { box-sizing: border-box }` rules (Tailwind preflight already sets it)', routes: 'all',
   mutate: sum([
     del('PublicFooter.css', '.bb-footer *, .bb-footer *::before, .bb-footer *::after'),
     del('PublicHeader.css', '.public-header *, .public-header *::before, .public-header *::after'),
     del('BilarTillSalu.css', '.bilartillsalu-page *, .bilartillsalu-page *::before, .bilartillsalu-page *::after'),
     del('BiltjansterPage.css', '.biltjanster-hub *, .biltjanster-hub *::before, .biltjanster-hub *::after'),
     del('ContactPage.css', '.kontakt-page *, .kontakt-page *::before, .kontakt-page *::after'),
     del('GalleryPage.css', '.galleri-page *, .galleri-page *::before, .galleri-page *::after'),
     del('ServiceReparationerPage.css', '.bilservice *, .bilservice *::before, .bilservice *::after'),
     del('LandingPage.css', '.landing-v2 *, .landing-v2 *::before, .landing-v2 *::after'),
     del('ServiceGuideTemplate.css', ':where(.service-guide) *, :where(.service-guide) *::before, :where(.service-guide) *::after'),
   ]) },
 { id: 'S2', title: 'Strip every var(--bb-x, fallback) to var(--bb-x) in the six files that use fallbacks', routes: 'all',
   mutate: `['PublicFooter.css','ContactFormCard.css','GoogleReviewsCard.css','BiltjansterPage.css','ServiceGuideTemplate.css','shared-elements.css'].map(f => __ops.stripFallbacks(f))` },
 { id: 'S3', title: 'shared-elements.css: drop the two re-declarations in @media (max-width: 650px) (.bb-hero__shade background:none, .bb-hero__content justify-content:flex-end)', routes: 'all',
   mutate: `[__ops.removeDecls('shared-elements.css', '.bb-hero__shade', '(max-width: 650px)', ['background']), __ops.removeDecls('shared-elements.css', '.bb-hero__content', '(max-width: 650px)', ['justify-content'])]` },
 { id: 'S4a', title: 'Delete the `.page :where(a) { color: inherit; text-decoration: none }` resets (base.css already sets a {…})', routes: ['/', '/om-oss', '/bargning', '/kontakt', '/galleri', '/bilar-till-salu', '/biltjanster', ...FAM, ...GUIDES],
   mutate: sum([del('AboutPage.css', '.omoss-page :where(a)'), del('BargningPage.css', '.bargning-page :where(a)'), del('BilarTillSalu.css', '.bilartillsalu-page :where(a)'), del('BiltjansterPage.css', '.biltjanster-hub :where(a)'), del('ContactPage.css', '.kontakt-page :where(a)'), del('GalleryPage.css', '.galleri-page :where(a)'), del('ServiceReparationerPage.css', '.bilservice :where(a)'), del('LandingPage.css', '.landing-v2 :where(a)'), del('ServiceGuideTemplate.css', ':where(.service-guide) :where(a)')]) },
 { id: 'S4b', title: 'Delete the `:where(.page) :where(button, input, textarea, select) { font: inherit }` resets (Tailwind preflight button rule out-ranks them)', routes: ['/', '/om-oss', '/bargning', '/kontakt', '/galleri', '/bilar-till-salu', '/biltjanster', ...FAM, ...GUIDES],
   mutate: sum([del('AboutPage.css', ':where(.omoss-page) :where(button, input, textarea, select)'), del('BargningPage.css', ':where(.bargning-page) :where(button, input, textarea, select)'), del('BilarTillSalu.css', ':where(.bilartillsalu-page) :where(button)'), `__ops.removeDecls('BiltjansterPage.css', ':where(.biltjanster-hub) :where(button)', undefined, ['font'])`, del('ContactPage.css', ':where(.kontakt-page) :where(button, input, textarea, select)'), del('GalleryPage.css', ':where(.galleri-page) :where(button)'), del('ServiceReparationerPage.css', ':where(.bilservice) :where(button, input, textarea, select)'), del('LandingPage.css', ':where(.landing-v2) :where(button, input, textarea, select)'), del('ServiceGuideTemplate.css', ':where(.service-guide) :where(button, input, textarea, select)')]) },
 { id: 'S4c', title: 'Delete the `.page :where(img) { display: block; max-width: 100% }` resets (base.css img rule)', routes: ['/om-oss', '/bargning', '/galleri', '/bilar-till-salu'],
   mutate: sum([del('AboutPage.css', '.omoss-page :where(img)'), del('BargningPage.css', '.bargning-page :where(img)'), del('BilarTillSalu.css', '.bilartillsalu-page :where(img)'), del('GalleryPage.css', '.galleri-page :where(img)')]) },
 { id: 'S4d', title: 'Delete ServiceGuideTemplate `:where(.service-guide) :where(h1, h2, h3, h4, p) { margin: 0 }` (preflight sets margin 0)', routes: GUIDES,
   mutate: sum([del('ServiceGuideTemplate.css', ':where(.service-guide) :where(h1, h2, h3, h4, p)')]) },
 { id: 'S5', title: 'Remove box-sizing:border-box declarations from component rules (GoogleReviewsCard x2, ContactFormCard x2, ContactPage x1)', routes: ['/', '/om-oss', '/kontakt', '/felsokning', '/dackservice', '/service-reparationer'],
   mutate: `[__ops.removeDecls('GoogleReviewsCard.css', '.bb-reviews-card--hero-overlay', undefined, ['box-sizing']), __ops.removeDecls('GoogleReviewsCard.css', '.bb-reviews-card--card', undefined, ['box-sizing']), __ops.removeDecls('ContactFormCard.css', '.bb-contact-form-card', undefined, ['box-sizing']), __ops.removeDecls('ContactFormCard.css', '.bb-contact-form input, .bb-contact-form textarea, .bb-contact-form select', undefined, ['box-sizing']), __ops.removeDecls('ContactPage.css', '.kontakt-page__input, .kontakt-page__textarea, .kontakt-page__select', undefined, ['box-sizing'])]` },
 { id: 'S6', title: 'ServiceGuideTemplate: merge the identical ::after overlays of intro-media and symptoms-media into one selector list', routes: GUIDES,
   mutate: `[__ops.deleteRule('ServiceGuideTemplate.css', '.service-guide__symptoms-media::after'), __ops.setSelector('ServiceGuideTemplate.css', '.service-guide__intro-media::after', undefined, '.service-guide__intro-media::after, .service-guide__symptoms-media::after')]` },
];
