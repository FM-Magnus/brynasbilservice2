// Rebuilt 2026-09-16 on the shared ServiceGuideTemplate first built for
// /koppling — this is the second page proving the template is reusable, not
// a second design. No dependency on any page-specific rule in index.css.
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { useBookingModal } from '../hooks/useBookingModal'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { Tip } from '../components/ui/Tip'
import { GuideClosing, GuideHero, GuideImportance, GuideInfo, GuideIntro, GuideParts, GuideProcess, GuideServiceCard, GuideSymptoms } from '../components/guide/ServiceGuideSections'
import type { GuideInfoCard, GuideSymptom } from '../components/guide/ServiceGuideSections'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon'
import { ThumbsUpIcon } from '../components/icons/ThumbsUpIcon'
import { InfoIcon } from '../components/icons/InfoIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { SlidersIcon } from '../components/icons/SlidersIcon'
import { WavesIcon } from '../components/icons/WavesIcon'
import { Volume2Icon } from '../components/icons/Volume2Icon'
import heroJpg from '../assets/images/services/exhaust/exhaust-system-underbody-muffler-hero.jpg'
import heroWebp from '../assets/images/services/exhaust/exhaust-system-underbody-muffler-hero.webp'
import componentsJpg from '../assets/images/services/exhaust/exhaust-system-components-underbody.jpg'
import componentsWebp from '../assets/images/services/exhaust/exhaust-system-components-underbody.webp'
import inspectionJpg from '../assets/images/services/exhaust/exhaust-clamp-inspection-mechanic-portrait.jpg'
import inspectionWebp from '../assets/images/services/exhaust/exhaust-clamp-inspection-mechanic-portrait.webp'
import '../styles/ServiceGuideTemplate.css'

const trustBadges = [
  { icon: ShieldIcon, title: 'Godkänd besiktning', text: 'Vi ser till att avgassystemet klarar kontrollbesiktningen.' },
  { icon: WrenchIcon, title: 'Erfarna mekaniker', text: 'Vi arbetar med alla vanliga bilmärken.' },
  { icon: ClockIcon, title: 'Tydlig rådgivning', text: 'Du får en ärlig bedömning och tydligt prisuppgift.' },
] as const

const components = [
  { title: 'Ljuddämpare & rör', text: 'Dämpar motorljudet till lagliga nivåer. Består av främre, mellan- och bakre dämpare samt flexrör som tar upp motorns rörelser.' },
  { title: 'Katalysator', text: 'Renar avgaserna från skadliga kolväten, kolmonoxid och kväveoxider innan de lämnar bilen, kritiskt för miljön och besiktningen.' },
  { title: 'Lambdasonder & sensorer', text: 'Mäter syrehalten i avgaserna och skickar realtidsdata till motorstyrningen, avgörande för rätt bränsleblandning och låg förbrukning.' },
  { title: 'Grenrör & packningar', text: 'Samlar upp de heta avgaserna direkt från cylindrarna och leder dem slutet vidare in i avgasreningen utan läckage.' },
] as const

const importance = [
  { icon: ShieldIcon, title: 'Godkänd besiktning', text: 'Läckage, för högt motorljud eller felaktiga avgasvärden från lambdasond eller katalysator är en vanlig orsak till anmärkningar vid besiktningen.' },
  { icon: AlertTriangleIcon, title: 'Säkerhet & hälsa', text: 'Ett tätt avgassystem förhindrar att giftig och luktfri koloxid från avgaserna tränger in i kupén via bilens friskluftsintag.' },
  { icon: GaugeIcon, title: 'Lägre bränsleförbrukning', text: 'Fungerande lambdasonder och sensorer säkerställer att motorn förbränner optimal bränsleblandning utan onödig överförbrukning.' },
  { icon: ThumbsUpIcon, title: 'Rätt åtgärd före dyrbyte', text: 'Vi provtrycker och felsöker innan vi byter dyra komponenter som katalysatorn, då grundorsaken ofta är ett flexrör eller en lambdasond.' },
] as const

const symptoms: readonly GuideSymptom[] = [
  { icon: Volume2Icon, title: 'Högt, dånande eller brummande ljud', text: 'Ett plötsligt dovt eller smattrande avgasljud som tilltar vid gaspådrag tyder på hål eller sprucken ljuddämpare.', featured: true },
  { icon: WavesIcon, title: 'Skrammel och rasslande missljud', text: 'Metalliskt skrammel under bilen vid tomgång eller gupp kan tyda på lös värmesköld eller trasig keramik i katalysatorn.' },
  { icon: AlertTriangleIcon, title: 'Lukt av avgaser i kupén', text: 'Stickande avgaslukt i bilens kupé ska tas på största allvar då det tyder på ett allvarligt läckage i främre systemet.' },
  { icon: SlidersIcon, title: 'Avgasröret hänger löst eller släpar', text: 'Rostiga fästen eller spruckna upphängningsgummin gör att rör och dämpare förlorar sin infästning.' },
  { icon: WrenchIcon, title: 'Synlig rost, sot eller hål', text: 'Mörka sotränder kring skarvar och flexrör eller synlig rost på ljuddämparens hölje avslöjar läckage.' },
  { icon: GaugeIcon, title: 'Tänd motorlampa & ojämn gång', text: 'Felkoder kopplade till katalysator eller lambdasond åtföljs ofta av ojämn tomgång eller försämrad motoreffekt.' },
]

const serviceItems = [
  'Felsökning och täthetskontroll av hela avgassystemet för att lokalisera exakt var läckaget eller missljudet sitter.',
  'Byte av enskild ljuddämpare, rörsektion eller flexrör istället för onödigt byte av hela systemet.',
  'Diagnostik och byte av lambdasond vid bekräftat givarfel eller avgasrelaterade felkoder.',
  'Kontroll och byte av katalysator när den bekräftat är defekt, alltid föregånget av grundlig analys.',
  'Svetsning, tätning och montering av nya upphängningsgummin, klämmor och packningar.',
  'Åtgärd och släckning av besiktningsanmärkningar och för höga emissionsvärden.',
]

const infoCards: readonly GuideInfoCard[] = [
  { icon: ClockIcon, title: 'Rost börjar oftast bakifrån', text: 'Den bakre ljuddämparen slits i regel först eftersom kondensvatten och fukt samlas där vid korta körningar. Främre delar klarar sig oftast längre.' },
  { icon: ThumbsUpIcon, title: 'Spara pengar genom sektionsbyte', text: 'Nästan aldrig behöver hela avgassystemet bytas samtidigt. Det vanligaste och mest prisvärda är att byta enbart den skadade ljuddämparen eller rörbiten.' },
  { icon: AlertTriangleIcon, title: 'Varning för katalysatorstöld', text: 'Katalysatorer innehåller ädelmetaller och är stöldbegärliga. Om bilen plötsligt dånar extremt högt utan förvarning kan katalysatorn ha stulits.', flag: 'OBS' },
  { icon: InfoIcon, title: 'Katalysatorkod kan vara lambdasond', text: 'En felkod som P0420 betyder inte automatiskt att katalysatorn är slut. En felaktig lambdasond ger ofta samma felkod och är betydligt billigare att byta.' },
  { icon: GaugeIcon, title: 'Viktigt om motorlampan', text: 'En tänd motorlampa med en katalysator-relaterad felkod betyder inte automatiskt att själva katalysatorn är trasig. En felaktig lambdasond eller ett litet avgasläckage före sonden är minst lika vanligt och betydligt mer prisvärt att åtgärda.' },
]

const processSteps = [
  ['01', 'Bokning och inlämning', `Boka enkelt online eller ring oss på ${BUSINESS.phone.display} och lämna in bilen hos oss på ${BUSINESS.address.street} i ${BUSINESS.address.district}.`],
  ['02', 'Lyft & läckagekontroll', 'Vi hissar upp bilen och inspekterar hela avgassystemet från grenrör till slutrör för att lokalisera sprickor och rost.'],
  ['03', 'Sensordiagnostik', 'Vid tänd motorlampa läser vi av lambdasondernas signalvärden och felminnet i bilens motorstyrdon.'],
  ['04', 'Montering & tätning', 'Vi demonterar den trasiga delen och monterar nya kvalitetsdelar med nya packningar, klammor och upphängningar.'],
  ['05', 'Täthetskontroll & slutprov', 'Vi varmkör motorn och säkerställer att alla skarvar är 100 % täta och att ljudnivån är tyst och behaglig.'],
] as const

const faqs = [
  { question: 'Varför rostar avgassystemet sönder så ofta i Sverige?', answer: 'Vägsalt och fukt under vinterhalvåret sliter hårt på metallen underifrån. Dessutom bildas kondensvatten inuti avgassystemet vid korta körsträckor, vilket gör att särskilt den bakre ljuddämparen rostar inifrån och ut.' },
  { question: 'Betyder motorlampan att katalysatorn är trasig?', answer: 'Inte nödvändigtvis. En trasig lambdasond eller ett mindre läckage i flexröret ger ofta samma typ av felkod (t.ex. felaktiga avgasvärden). Att byta lambdasond eller täta ett rör är en betydligt billigare åtgärd än att byta hela katalysatorn, och vi felsöker alltid ordentligt först.' },
  { question: 'Är det farligt att köra med ett skadat avgassystem?', answer: 'Det beror på var skadan sitter. Ett läckage nära motorrum eller kupé som gör att avgaslukt tränger in i bilen är en direkt hälsorisk och bör åtgärdas omgående. Ett hål i den bakre ljuddämparen ger mest ett högt brummande ljud men bör ändå åtgärdas inför besiktningen.' },
  { question: 'Kan ett trasigt avgassystem ge underkänd besiktning?', answer: 'Ja, det är en av de absolut vanligaste orsakerna till underkänd besiktning. Otätheter i systemet, bullernivåer över gränsvärdet eller felaktiga avgasutsläpp (CO-halt och lambda-värde) leder till ombesiktning.' },
  { question: 'Måste hela avgassystemet bytas om en del gått sönder?', answer: 'Nästan aldrig. Det vanligaste är att byta den enskilda sektion som är trasig — oftast den bakre ljuddämparen eller flexröret — snarare än hela systemet från grenrör till ändrör.' },
  { question: 'Hur lång tid tar en reparation av avgassystemet?', answer: 'Ett byte av en bakre eller mellersta ljuddämpare går ofta snabbt (under 1 timme), medan felsökning av en lambdasond eller katalysatorproblem kan ta något längre tid.' },
]

export default function AvgassystemPage() {
  const { openBooking, bookingModal } = useBookingModal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="overlay" />
      <main className="service-guide">
        <GuideHero
          id="exhaust-title"
          eyebrow="Avgasrening & ljuddämpning"
          title={<>Avgassystem<br />för tyst gång<br />och <span className="bb-accent">ren</span> motor</>}
          lead="Avgassystemet renar utsläpp, dämpar motorljudet och säkerställer att motorns sensorer styr förbränningen optimalt. Vi lokaliserar läckage, byter ljuddämpare och felsöker lambdasonder och katalysatorer."
          image={{ webp: heroWebp, jpg: heroJpg, alt: 'Underrede på bil på lyft med avgassystem, ljuddämpare och ändrör i verkstadsmiljö', lazy: true }}
          trustBadges={trustBadges}
          onBooking={openBooking}
        />

        <GuideIntro
          id="exhaust-intro-title"
          heading="Vad gör avgassystemet?"
          image={{ webp: componentsWebp, jpg: componentsJpg, alt: 'Komplett avgassystem under bil med katalysator, flexrör, ljuddämpare och värmesköldar' }}
          caption="Rent, tyst och lagligt."
        >
          <p>Avgassystemet gör mer än att bara leda bort avgaser från motorn — det renar utsläppen, dämpar ljudet ner till godkända nivåer och övervakas av sensorer som styr motorns bränsleblandning. Eftersom systemet sitter oskyddat under bilen utsätts det för fukt och vägsalt, vilket gör att det oftast rostar bakifrån och inåt.</p>
          <GuideParts items={components} />
          <Tip
            title="Osäker på vad som gäller för din bil?"
            text="Vi läser av felkoder, gör en bedömning och förklarar vad som behöver åtgärdas – utan överraskningar."
            action={<Link to="/felsokning" className="bb-btn bb-btn--teal service-guide__btn">Boka en felsökning<ArrowRightIcon aria-hidden="true" /></Link>}
          />
        </GuideIntro>

        <GuideImportance
          id="exhaust-importance-title"
          heading="Varför är det viktigt att åtgärda i tid?"
          text="Ett skadat avgassystem påverkar mer än bara ljudnivån — det kan påverka besiktning, hälsa och bränsleförbrukning."
          items={importance}
        />

        <GuideSymptoms
          id="exhaust-symptoms-title"
          heading="Tecken på fel i avgassystemet"
          text="Ett skadat eller läckande avgassystem märks oftast tydligt på ljudnivån, lukten eller via bilens varningslampor. Här är de vanligaste tecknen du bör vara uppmärksam på."
          items={symptoms}
          image={{ webp: inspectionWebp, jpg: inspectionJpg, alt: 'Mekaniker som kontrollerar och drar åt klämma på avgassystem under bil på tvåpelarlyft' }}
          caption="Vi hittar problemet – innan det blir större."
        />

        <GuideServiceCard
          id="exhaust-service-title"
          text="Vi undersöker hela avgassystemet och byter slitna ljuddämpare, rörsektioner eller lambdasonder med kvalitetsdelar anpassade för din bil."
          items={serviceItems}
        />

        <GuideInfo
          id="exhaust-info-title"
          heading="Viktig information om avgassystem"
          text="Här är praktiska riktlinjer och fakta kring avgassystemets funktion och åtgärder. Vi undersöker alltid bilens faktiska skick innan vi föreslår reservdelsbyten."
          cards={infoCards}
          safetyIcon={InfoIcon}
          safety={<><strong>Säkerhetsnotis:</strong> Lukt av avgaser i kupén ska aldrig ignoreras. Bilavgaser innehåller luktfri och giftig koloxid (kolmonoxid) som snabbt kan orsaka huvudvärk, illamående och nedsatt reaktionsförmåga under körning. Boka tid direkt om du känner avgasdoft i bilen.</>}
        />

        <GuideProcess
          id="exhaust-process-title"
          text="Att laga eller byta delar i avgassystemet kräver noggrann täthetskontroll och rätt upphängningar. Så här ser vår process ut."
          steps={processSteps}
        />

        <BiltjansterFaq id="exhaust-faq" heading="Vanliga frågor om avgassystem" items={faqs} />

        <GuideClosing
          id="exhaust-booking-title"
          heading="Boka reparation av avgassystem"
          text={<>Priset beror helt på vilken del av avgassystemet som behöver åtgärdas — ett byte av en bakre ljuddämpare skiljer sig från byte av lambdasond eller katalysator. Ring oss på {BUSINESS.phone.display} så ger vi dig ett tydligt och transparent kostnadsförslag innan vi sätter igång.</>}
          onBooking={openBooking}
        />
      </main>
      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
