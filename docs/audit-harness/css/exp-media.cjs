const J = JSON.stringify;
const FAM = ['/service-reparationer', '/reparationer-storre-arbeten', '/felsokning', '/dackservice', '/ac-service'];
const GUIDES = ['/oljebyte', '/kamrem', '/koppling', '/bromssystem', '/bilbatteri', '/stodampare-fjadrar', '/hjullagerbyte', '/avgassystem', '/drivaxel-drivknutar', '/styrning-kulleder', '/gat'];
const sm = (files, from, to) => `[${files.map(f => `__ops.setMedia(${J(f)}, ${J(from)}, ${J(to)})`).join(',')}]`;
module.exports = [
 { id: 'M1', title: '(max-width: 640px) -> (max-width: 650px) in shared-elements, ServiceGuideTemplate, ServiceReparationer; measured at 645px (the only band that changes)', routes: 'all', widths: [645],
   mutate: sm(['shared-elements.css', 'ServiceGuideTemplate.css', 'ServiceReparationerPage.css'], '(max-width: 640px)', '(max-width: 650px)') },
 { id: 'M2', title: '1100 -> 1120: (max-width: 1100px) in Kontakt/Biltjänster and Landing (651–1100) -> 1120; measured at 1110px', routes: ['/', '/kontakt', '/biltjanster'], widths: [1110],
   mutate: `[${sm(['ContactPage.css', 'BiltjansterPage.css'], '(max-width: 1100px)', '(max-width: 1120px)')}, ${sm(['LandingPage.css'], '(min-width: 651px) and (max-width: 1100px)', '(min-width: 651px) and (max-width: 1120px)')}]` },
 { id: 'M3', title: '1180 -> 1186 (ServiceReparationer process block onto the header breakpoint); measured at 1183px', routes: FAM, widths: [1183],
   mutate: sm(['ServiceReparationerPage.css'], '(max-width: 1180px)', '(max-width: 1186px)') },
 { id: 'M4', title: '1023/1024 -> one boundary: (max-width: 1023px) -> 1024 and (min-width: 1024px) -> 1025 (Kontakt, Galleri, Bilar till salu, GalleryDockStrip); measured at 1024px', routes: ['/', '/om-oss', '/kontakt', '/galleri', '/bilar-till-salu'], widths: [1024],
   mutate: `[${sm(['ContactPage.css'], '(max-width: 1023px)', '(max-width: 1024px)')}, ${sm(['ContactPage.css', 'GalleryPage.css', 'BilarTillSalu.css', 'GalleryDockStrip.css'], '(min-width: 1024px)', '(min-width: 1025px)')}]` },
 { id: 'M5', title: '768 -> 767 (Om oss, Bärgning max-width: 768px onto the footer bar breakpoint); measured at exactly 768px', routes: ['/om-oss', '/bargning'], widths: [768],
   mutate: sm(['AboutPage.css', 'BargningPage.css'], '(max-width: 768px)', '(max-width: 767px)') },
 { id: 'M6', title: '960 -> 900 (Bilar till salu); measured at 930px', routes: ['/bilar-till-salu'], widths: [930], mutate: sm(['BilarTillSalu.css'], '(max-width: 960px)', '(max-width: 900px)') },
 { id: 'M7', title: 'PublicFooter (max-width: 680px) -> 650px; measured at 665px', routes: ['/'], widths: [665], mutate: sm(['PublicFooter.css'], '(max-width: 680px)', '(max-width: 650px)') },
 { id: 'M8', title: '560 -> 520? no: About/Bärgning (max-width: 560px) -> 650px (phone breakpoint); measured at 600px', routes: ['/om-oss', '/bargning'], widths: [600], mutate: sm(['AboutPage.css', 'BargningPage.css'], '(max-width: 560px)', '(max-width: 650px)') },
];
