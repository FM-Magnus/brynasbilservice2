// Rebuilt 2026-09-16 on the shared ServiceGuideTemplate (see KopplingPage.tsx
// and AvgassystemPage.tsx). No dependency on any page-specific rule in
// index.css. This page is content-heavier than the first two templates —
// it adds a new reusable "topic block" pattern to ServiceGuideTemplate.css
// for the deep-dive viscosity/standards/oil-type/ageing/misconception
// material, since nothing in Koppling or Avgassystem needed that shape.
import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/business'
import '../styles/design-tokens.css'
import '../styles/shared-elements.css'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { BookingFormModal } from '../components/BookingForm'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { LightbulbIcon } from '../components/icons/LightbulbIcon'
import { ThumbsUpIcon } from '../components/icons/ThumbsUpIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { DollarIcon } from '../components/icons/DollarIcon'
import heroJpg from '../assets/images/services/oil/oil-drain-under-car.jpg'
import heroWebp from '../assets/images/services/oil/oil-drain-under-car.webp'
import funnelJpg from '../assets/images/services/oil/oil-poured-into-funnel.jpg'
import funnelWebp from '../assets/images/services/oil/oil-poured-into-funnel.webp'
import '../styles/ServiceGuideTemplate.css'

const trustBadges = [
  { icon: WrenchIcon, title: 'Rätt olja för din bil', text: 'Vi väljer viskositet och ACEA-klass som matchar din motor.' },
  { icon: ClockIcon, title: 'Snabb service', text: 'Klart inom en timme i de flesta fall.' },
  { icon: ShieldIcon, title: 'Tydlig rådgivning', text: 'Du får en ärlig bedömning och tydligt prisuppgift.' },
] as const

const importance = [
  { icon: ClockIcon, title: 'Förlänger motorns livslängd', text: 'Genom att identifiera och åtgärda problem tidigt kan du undvika dyrare reparationer i framtiden.' },
  { icon: GaugeIcon, title: 'Håller nere bränsleförbrukningen', text: 'En motor som går på ren, fräsch olja arbetar mer effektivt, vilket märks direkt på bränsleförbrukningen.' },
  { icon: DollarIcon, title: 'Minskar risken för dyra motorrelaterade reparationer', text: 'Olja som inte byts i tid tappar sin förmåga att smörja och kyla motorns delar effektivt.' },
  { icon: ThumbsUpIcon, title: 'Bidrar till att bilen presterar som den ska över tid', text: 'Ökad friktion mellan rörliga komponenter sliter ner motorn snabbare än den annars skulle göra.' },
] as const

const includedItems = [
  'Dränering av den gamla oljan',
  'Byte av oljefilter',
  'Påfyllning av ny olja anpassad efter din bilmodell – rätt viskositet, rätt ACEA-klass och rätt tillverkargodkännande, inte bara "rätt siffra"',
  'Kontroll av oljenivån efter påfyllning',
  'En snabb koll av bilens övriga vätskenivåer samtidigt som vi ändå är där',
]

const oilAgeing = [
  { title: 'Tillsatserna förbrukas.', text: 'Additiven som håller nere korrosion, renar motorn och stabiliserar viskositeten bryts ner successivt och tappar effekt, oavsett hur få mil bilen gått.' },
  { title: 'Föroreningar byggs upp.', text: 'Sotpartiklar från förbränningen och små mängder obrända bränsleångor blandas in i oljan och späder ut dess skyddande egenskaper.' },
  { title: 'Kondens och fukt.', text: 'Särskilt vid mycket korta körsträckor hinner motorn aldrig bli riktigt varm, vilket gör att kondensvatten byggs upp i oljan istället för att kokas bort. Det är en av de vanligaste anledningarna till att kortkörningsbilar behöver tätare oljebyten än vad miltalet ensamt antyder.' },
]

const viscosityDetails = [
  { title: 'Siffran före W', text: 'anger flytförmågan vid kyla – ju lägre siffra, desto bättre kallstartsegenskaper. En 0W-olja flyter lättare vid minusgrader än en 10W-olja.' },
  { title: 'Siffran efter W', text: 'anger tjockleken vid motorns normala arbetstemperatur. En 5W-40 blir tjockare vid värme än en 5W-30, vilket ger tjockare oljefilm och något bättre skydd vid hög belastning – men bara om bilen faktiskt är konstruerad för det.' },
]

const oilStandards = [
  { title: 'ACEA A3/B4', text: 'robust olja med högre askhalt, vanlig i äldre bilar utan partikelfilter.' },
  { title: 'ACEA C1–C3', text: 'lågaskoljor ("Low SAPS"), framtagna för bilar med partikelfilter (DPF/OPF) och katalysator. Fyller du en sådan bil med en vanlig A3/B4-olja byggs aska upp i partikelfiltret snabbare än det ska.' },
  { title: 'Tillverkarspecifika godkännanden', text: 'som VW 504.00/507.00, BMW Longlife-04 eller MB 229.51 väger tyngst av allt – de är framtagna och testade specifikt för den motorfamiljen.' },
]

const oilTypes = [
  { title: 'Mineralolja (grupp I–II)', text: 'är rakt utvunnen och raffinerad från råolja, med störst molekylär ojämnhet. Billigast, men klarar sämre av temperatur- och belastningsvariationer.' },
  { title: 'Grupp III', text: 'är mineralolja som hydrocrackats – brutits ner kemiskt och byggts upp igen under högt tryck till en betydligt jämnare molekylstruktur. Här händer något som förvånar många: i Europa får grupp III-oljor marknadsföras och säljas som "helsyntetiska", trots att de i grunden är mineralbaserade. Det är inte marknadsföringsfusk – det är hur regelverket är utformat – men det förklarar varför två flaskor som båda säger "fullsyntetisk 5W-30" ändå kan prestera olika.' },
  { title: 'Grupp IV (PAO – poly-alfa-olefin)', text: 'är den "riktiga" kemiskt syntetiserade oljan, med en molekylstruktur som är jämn redan från start snarare än ombyggd. Den ger generellt bättre smörjande egenskaper än grupp III, oavsett vad viskositetsetiketten säger.' },
  { title: 'Halvsyntetisk olja', text: 'är en blandning av mineral- och syntetbaserad olja, ofta 10–70 % syntetinnehåll, som positionerar sig prismässigt och prestandamässigt mellan mineral- och helsyntetolja.' },
]

const misconceptions = [
  { title: '"Mörk olja är dålig olja."', text: 'Fel – att oljan mörknar är ett tecken på att den gör sitt jobb och binder upp sot och föroreningar istället för att låta dem cirkulera fritt i motorn. Färgen ensam säger inte mycket om oljans faktiska skick.' },
  { title: '"Det räcker att fylla på om nivån sjunker."', text: 'Nej – påfyllning blandar bara ny olja med gammal, redan nedbruten olja. Det löser aldrig samma problem som ett fullständigt byte gör.' },
  { title: '"Dyrare olja är alltid bättre."', text: 'Inte nödvändigtvis. Det som spelar roll är att oljan uppfyller rätt ACEA-klass och tillverkarens specifika godkännande – en korrekt specificerad olja till lägre pris slår en dyr olja som inte matchar din motor.' },
  { title: '"Syntetisk olja behöver aldrig bytas lika ofta."', text: 'Delvis sant, men överdrivet – syntetolja tål mer innan den bryts ner, men additiven i den förbrukas ändå med tiden, och kortkörning eller tuff belastning äter upp fördelen snabbt.' },
  { title: '"Man kan inte blanda olika oljemärken eller typer."', text: 'I praktiken går det oftast bra rent tekniskt – oljor är i grunden kompatibla med varandra – men det är ingen genväg till rätt olja. Följer man inte specifikationen som gäller för just din bil spelar det ingen roll vilket märke som står på flaskan.' },
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Du bokar en tid med oss och lämnar in bilen när det passar.'],
  ['02', 'Initial kontroll', 'Vi gör en första bedömning av bilens skick och servicebehov.'],
  ['03', 'Service enligt checklista', 'Mekanikern följer checklistan för den servicenivå som är aktuell.'],
  ['04', 'Godkännande vid extraarbete', 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.'],
  ['05', 'Slutkontroll och rapport', 'När bilen är klar får du en genomgång och råd inför nästa service.'],
] as const

const faqs = [
  { question: 'Hur ofta behöver jag byta olja?', answer: 'Det varierar mellan bilmärken och modeller, men som tumregel rekommenderas ett oljebyte var 10 000–15 000 km, eller minst en gång om året – vad som än inträffar först. Kör du mycket kortkörning eller drar släp bör du räkna med tätare byten än vad instruktionsboken säger.' },
  { question: 'Ska jag lita på bilens serviceindikator eller intervallet i instruktionsboken?', answer: 'Se dem som en utgångspunkt, inte ett facit. Indikatorn räknar oftast utifrån idealiska förhållanden. Är din körning tuffare mot oljan – mycket stadskörning, kyla, korta resor – lönar det sig att byta tätare.' },
  { question: 'Är syntetisk olja alltid bättre än mineralolja?', answer: 'Generellt ja när det gäller smörjande egenskaper och temperaturtålighet, men det viktigaste är ändå att oljan uppfyller rätt specifikation för just din motor. En korrekt mineralolja för en äldre motor kan vara ett bättre val än fel typ av syntetolja.' },
  { question: 'Spelar det någon roll vilket oljemärke jag väljer?', answer: 'Mindre än många tror. Det avgörande är att oljan har rätt viskositet, rätt ACEA-klass och det godkännande din bil kräver – inte varumärket på flaskan.' },
  { question: 'Vad kostar ett oljebyte?', answer: 'Priset beror på bilmodell och vilken oljetyp som krävs. Ring oss så får du en tydlig prisuppgift innan vi sätter igång.' },
  { question: 'Kan jag byta olja själv?', answer: 'Ja, om du har rätt verktyg och kunskap går det att göra själv. Har du inte det sedan tidigare är det oftast både snabbare och säkrare att låta oss göra det – felaktig hantering av gammal olja är dessutom ett miljöproblem, inte bara ett tekniskt.' },
  { question: 'Hur lång tid tar det?', answer: 'Vanligtvis mellan 30 minuter och en timme, beroende på bilmodell och om något oväntat upptäcks under tiden.' },
  { question: 'Vad händer om jag skjuter upp oljebytet för länge?', answer: 'Gammal, uttjänt olja smörjer sämre och sämre ju längre den används. I värsta fall kan det leda till allvarliga motorskador och i förlängningen motorhaveri – en reparation som är betydligt dyrare än de oljebyten du skulle ha hunnit göra under tiden.' },
]

export default function OljebytePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openModal} variant="overlay" />
      <main className="service-guide">
        {/* Hero */}
        <section className="service-guide__hero" aria-labelledby="oljebyte-title">
          <div className="service-guide__hero-bg">
            <picture><source srcSet={heroWebp} type="image/webp" /><img src={heroJpg} alt="Mekaniker dränerar gammal motorolja från en bil på lyft" loading="lazy" /></picture>
          </div>
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__hero-inner">
              <div>
                <div className="bb-eyebrow bb-eyebrow--dark service-guide__eyebrow">Motorolja &amp; motorunderhåll</div>
                <h1 className="bb-h1 service-guide__title" id="oljebyte-title">
                  Oljebyte<br />
                  för en motor<br />
                  som <span className="bb-accent">mår bra</span>
                </h1>
                <p className="bb-lead bb-lead--dark service-guide__lead">
                  Ett oljebyte är ett av de mest grundläggande men samtidigt viktigaste underhållsmomenten på en bil. Motorns rörliga delar smörjs av oljan, som håller nere friktionen och skyddar motorn från onödigt slitage.
                </p>
                <div className="service-guide__actions">
                  <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka oljebyte</button>
                  <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
                </div>
                <div className="bb-trust-row">
                  {trustBadges.map(({ icon: Icon, title, text }) => (
                    <div className="bb-trust-row__item" key={title}>
                      <span className="bb-icon-bare"><Icon aria-hidden="true" /></span>
                      <span className="bb-trust-row__text">
                        <b>{title}</b>
                        <small>{text}</small>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vad är ett oljebyte? */}
        <section className="service-guide__section" aria-labelledby="oljebyte-intro-title">
          <div className="bb-wrap service-guide__container service-guide__intro-layout">
            <div className="service-guide__intro-media">
              <picture><source srcSet={funnelWebp} type="image/webp" /><img src={funnelJpg} alt="Ny motorolja hälls i en tratt i motorrummet" loading="lazy" /></picture>
              <p className="service-guide__intro-caption">Rätt olja. Rätt mängd. Varje gång.</p>
            </div>
            <div className="service-guide__intro-content">
              <h2 id="oljebyte-intro-title">Vad är ett oljebyte?</h2>
              <p>Ett oljebyte är ett av de mest grundläggande men samtidigt viktigaste underhållsmomenten på en bil. Motorns rörliga delar smörjs av oljan, som håller nere friktionen och skyddar motorn från onödigt slitage.</p>
              <p>Med tiden bryts oljan ner, tappar sina smörjande egenskaper och samlar på sig sot och förbränningsrester. Ett oljebyte innebär att den gamla, uttjänta oljan dräneras ur motorn, oljefiltret byts ut, ny olja fylls på och nivån kontrolleras innan bilen lämnas tillbaka till dig.</p>

              <div className="service-guide__prose-card">
                <h3>Varför är oljebyte viktigt?</h3>
                <p>Olja som inte byts i tid tappar sin förmåga att smörja och kyla motorns delar effektivt. Det leder till ökad friktion mellan rörliga komponenter, vilket över tid sliter ner motorn snabbare än den annars skulle göra.</p>
                <p>En motor som går på ren, fräsch olja arbetar dessutom mer effektivt, vilket märks direkt på bränsleförbrukningen jämfört med en motor som får gå på gammal eller smutsig olja.</p>
              </div>

              <div className="bb-tip">
                <span className="bb-icon-badge"><LightbulbIcon aria-hidden="true" /></span>
                <div className="bb-tip__body">
                  <span className="bb-eyebrow">Tips</span>
                  <strong className="bb-tip__title">Osäker på vilken olja din bil behöver?</strong>
                  <span className="bb-tip__text">Vi läser av tillverkarens specifikation och väljer rätt viskositet och ACEA-klass åt dig.</span>
                </div>
                <a href="/felsokning" className="bb-btn bb-btn--teal service-guide__btn">Boka en felsökning<ArrowRightIcon aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>

        {/* Varför är det viktigt att åtgärda i tid? */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="oljebyte-importance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__importance">
              <div>
                <h2 id="oljebyte-importance-title">Fördelar med regelbundna oljebyten</h2>
                <p>Ett regelbundet oljebyte är en liten kostnad jämfört med vad ett försummat sådant kan leda till.</p>
              </div>
              <div className="service-guide__importance-grid">
                {importance.map(({ icon: Icon, title, text }) => (
                  <div className="service-guide__importance-card" key={title}>
                    <Icon aria-hidden="true" />
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Det här kan vi hjälpa dig med (Vad ingår) */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="oljebyte-service-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__service-card">
              <div>
                <h2 id="oljebyte-service-title">Vad ingår i ett oljebyte hos oss?</h2>
                <p>Ett oljebyte hos Brynäs Bilservice omfattar:</p>
              </div>
              <ul className="service-guide__service-checklist">
                {includedItems.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Mer info divider */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="oljebyte-more-info-title">
          <div className="bb-wrap service-guide__container service-guide__info-heading">
            <h2 id="oljebyte-more-info-title">Mer info</h2>
            <p>Här har vi samlat fördjupande information om motorolja, intervall och vanliga frågor kring oljebyten.</p>
          </div>
        </section>

        {/* Topic block 1: ageing */}
        <section className="service-guide__topic-block" aria-labelledby="oljebyte-ageing-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__topic-header">
              <h2 id="oljebyte-ageing-title">Hur oljan blir sämre med tiden – även om bilen knappt körs</h2>
              <p>Olja som står oöppnad i en dunk åldras i praktiken inte. Det är först när den börjar arbeta i motorn som nedbrytningen startar, och det sker på flera sätt samtidigt:</p>
            </div>
            <div className="service-guide__topic-grid service-guide__topic-grid--cols-3">
              {oilAgeing.map(({ title, text }) => (
                <article className="service-guide__topic-card" key={title}><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
            <p className="service-guide__topic-note">Det är alltså inte antalet körda mil som ensamt avgör oljans skick – tiden och körmönstret spelar minst lika stor roll.</p>
            <div className="service-guide__topic-prose service-guide__topic-prose--spaced">
              <h3>Tillverkarens intervall kontra verkligheten</h3>
              <p>Många nyare bilar har långa rekommenderade serviceintervall – ibland 3 000 mil eller mer, så kallade "long life"-intervall. De är inte felaktiga, men de gäller under förutsättningar som sällan stämmer med hur bilen faktiskt används i vardagen: jämn landsvägskörning, motorvärmare vid kyla under +5 grader, och inga korta stadsturer. Kör bilen istället mycket kortkörning, mycket stillastående i kö, eller drar den ofta släp, bryts oljan ner snabbare än vad intervallet i boken räknar med – utan att bilens egen serviceindikator nödvändigtvis märker det i tid.</p>
              <p>Vår rekommendation är därför att se tillverkarens intervall som ett tak, inte ett golv. Är körmönstret tufft mot oljan – mycket kortkörning, tät stadstrafik, kyla utan motorvärmare, turboladdad eller direktinsprutad motor – lönar det sig att byta tätare än boken säger snarare än att vänta tills serviceindikatorn tvingar fram det.</p>
            </div>
          </div>
        </section>

        {/* Topic block 2: viscosity */}
        <section className="service-guide__topic-block service-guide__topic-block--alt" aria-labelledby="oljebyte-viscosity-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__topic-header">
              <h2 id="oljebyte-viscosity-title">Vad betyder egentligen siffrorna på oljedunken?</h2>
              <p>De flesta har sett beteckningar som 5W-30 eller 0W-20 utan att egentligen veta vad de betyder. Det är oljans viskositetsklass enligt SAE-systemet (Society of Automotive Engineers), och den beskriver hur trögflytande oljan är – inte hur bra kvalitet den håller.</p>
            </div>
            <div className="service-guide__topic-grid service-guide__topic-grid--cols-2">
              {viscosityDetails.map(({ title, text }) => (
                <article className="service-guide__topic-card" key={title}><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
            <p className="service-guide__topic-note">Viskositeten är alltså bara en flödesegenskap, inte ett kvalitetsmått. Två oljor med exakt samma viskositetsbeteckning kan skilja sig kraftigt åt i hur väl de faktiskt skyddar motorn.</p>
          </div>
        </section>

        {/* Topic block 3: API/ACEA standards */}
        <section className="service-guide__topic-block" aria-labelledby="oljebyte-standards-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__topic-header">
              <h2 id="oljebyte-standards-title">API och ACEA – standarderna som faktiskt styr kvaliteten</h2>
              <p>Det som avgör om en olja verkligen passar din motor är inte viskositeten utan godkännandena bredvid den – API (amerikansk standard) och ACEA (europeisk standard). ACEA-klasserna är särskilt viktiga att förstå:</p>
            </div>
            <div className="service-guide__topic-grid service-guide__topic-grid--cols-3">
              {oilStandards.map(({ title, text }) => (
                <article className="service-guide__topic-card" key={title}><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
            <p className="service-guide__topic-note">Rätt ordning att välja olja i är: tillverkarens egen specifikation först, sedan ACEA-klass, och viskositet sist. En "rätt" viskositet med fel specifikation kan göra mer skada än nytta.</p>
          </div>
        </section>

        {/* Topic block 4: oil types */}
        <section className="service-guide__topic-block service-guide__topic-block--alt" aria-labelledby="oljebyte-types-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__topic-header">
              <h2 id="oljebyte-types-title">Mineral-, halvsyntet- och helsyntetolja – vad är egentligen skillnaden?</h2>
              <p>Basoljan – den vätska additiven blandas i – delas in i grupper, och det är här den verkliga skillnaden mellan oljor ligger:</p>
            </div>
            <div className="service-guide__topic-grid service-guide__topic-grid--cols-4">
              {oilTypes.map(({ title, text }) => (
                <article className="service-guide__topic-card" key={title}><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
            <p className="service-guide__topic-note">Den praktiska slutsatsen: beteckningen "fullsyntetisk" på flaskan garanterar inte att två oljor är likvärdiga. Additivpaketet – rengörande, korrosionsskyddande och viskositetsstabiliserande tillsatser – väger minst lika tungt som basoljan, och det är just kombinationen av basolja och additivpaket som gör att pris och prestanda kan skilja sig kraftigt mellan oljor som ser identiska ut på pappret.</p>
          </div>
        </section>

        {/* Topic block 5: misconceptions */}
        <section className="service-guide__topic-block" aria-labelledby="oljebyte-misconceptions-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__topic-header">
              <h2 id="oljebyte-misconceptions-title">Vanliga missförstånd om motorolja</h2>
            </div>
            <div className="service-guide__topic-grid service-guide__topic-grid--cols-3">
              {misconceptions.map(({ title, text }) => (
                <article className="service-guide__topic-card" key={title}><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        {/* Så går det till hos oss */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="oljebyte-process-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__process">
              <div className="service-guide__process-text">
                <h2 id="oljebyte-process-title">Så går det till<br /><span className="bb-accent">hos oss</span></h2>
                <p>Att förstå processen gör det enklare att veta vad som händer med bilen och varför en service ibland behöver ta lite tid.</p>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--teal service-guide__btn"><PhoneIcon aria-hidden="true" />Ring oss: {BUSINESS.phone.display}</a>
              </div>
              <div className="service-guide__process-steps">
                {processSteps.map(([num, title, text]) => (
                  <div className="service-guide__process-step" key={num}>
                    <span className="service-guide__process-num" aria-hidden="true">{num}</span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BiltjansterFaq id="oljebyte-faq" heading="Vanliga frågor om oljebyte" items={faqs} />

        {/* Closing CTA */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="oljebyte-booking-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__closing">
              <div>
                <h2 id="oljebyte-booking-title">Boka oljebyte</h2>
                <p>Ring oss så hjälper vi dig att hitta en tid som passar och ger en tydlig prisuppgift innan vi sätter igång.</p>
              </div>
              <div className="service-guide__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka oljebyte</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
