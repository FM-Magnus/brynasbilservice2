import { useEffect, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'
import { CheckIcon } from '../components/icons/CheckIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'

const parts = [
  ['Ljuddämpare & rör', 'Dämpar motorljudet till lagliga nivåer. Består av främre, mellan- och bakre dämpare samt flexrör som tar upp motorns rörelser.'],
  ['Katalysator', 'Renar avgaserna från skadliga kolväten, kolmonoxid och kväveoxider innan de lämnar bilen, kritiskt för miljön och besiktningen.'],
  ['Lambdasonder & sensorer', 'Mäter syrehalten i avgaserna och skickar realtidsdata till motorstyrningen, avgörande för rätt bränsleblandning och låg förbrukning.'],
  ['Grenrör & packningar', 'Samlar upp de heta avgaserna direkt från cylindrarna och leder dem slutet vidare in i avgasreningen utan läckage.'],
]

const benefits = [
  ['Godkänd besiktning', 'Läckage, för högt motorljud eller felaktiga avgasvärden från lambdasond eller katalysator är en vanlig orsak till anmärkningar vid besiktningen.'],
  ['Säkerhet & hälsa', 'Ett tätt avgassystem förhindrar att giftig och luktfri koloxid från avgaserna tränger in i kupén via bilens friskluftsintag.'],
  ['Lägre bränsleförbrukning', 'Fungerande lambdasonder och sensorer säkerställer att motorn förbränner optimal bränsleblandning utan onödig överförbrukning.'],
  ['Rätt åtgärd före dyrbyte', 'Vi provtrycker och felsöker innan vi byter dyra komponenter som katalysatorn, då grundorsaken ofta är ett flexrör eller en lambdasond.'],
]

const symptoms = [
  ['Högt, dånande eller brummande ljud', 'Ett plötsligt dovt eller smattrande avgasljud som tilltar vid gaspådrag tyder på hål eller sprucken ljuddämpare.'],
  ['Skrammel och rasslande missljud', 'Metalliskt skrammel under bilen vid tomgång eller gupp kan tyda på lös värmesköld eller trasig keramik i katalysatorn.'],
  ['Lukt av avgaser i kupén', 'Stickande avgaslukt i bilens kupé ska tas på största allvar då det tyder på ett allvarligt läckage i främre systemet.'],
  ['Avgasröret hänger löst eller släpar', 'Rostiga fästen eller spruckna upphängningsgummin gör att rör och dämpare förlorar sin infästning.'],
  ['Synlig rost, sot eller hål', 'Mörka sotränder kring skarvar och flexrör eller synlig rost på ljuddämparens hölje avslöjar läckage.'],
  ['Tänd motorlampa & ojämn gång', 'Felkoder kopplade till katalysator eller lambdasond åtföljs ofta av ojämn tomgång eller försämrad motoreffekt.'],
]

const serviceItems = [
  'Felsökning och täthetskontroll av hela avgassystemet för att lokalisera exakt var läckaget eller missljudet sitter.',
  'Byte av enskild ljuddämpare, rörsektion eller flexrör istället för onödigt byte av hela systemet.',
  'Diagnostik och byte av lambdasond vid bekräftat givarfel eller avgasrelaterade felkoder.',
  'Kontroll och byte av katalysator när den bekräftat är defekt, alltid föregånget av grundlig analys.',
  'Svetsning, tätning och montering av nya upphängningsgummin, klämmor och packningar.',
  'Åtgärd och släckning av besiktningsanmärkningar och för höga emissionsvärden.',
]

const guidance = [
  ['Rost börjar oftast bakifrån', 'Den bakre ljuddämparen slits i regel först eftersom kondensvatten och fukt samlas där vid korta körningar. Främre delar klarar sig oftast längre.'],
  ['Spara pengar genom sektionsbyte', 'Nästan aldrig behöver hela avgassystemet bytas samtidigt. Det vanligaste och mest prisvärda är att byta enbart den skadade ljuddämparen eller rörbiten.'],
  ['Varning för katalysatorstöld', 'Katalysatorer innehåller ädelmetaller och är stöldbegärliga. Om bilen plötsligt dånar extremt högt utan förvarning kan katalysatorn ha stulits.'],
  ['Katalysatorkod kan vara lambdasond', 'En felkod som P0420 betyder inte automatiskt att katalysatorn är slut. En felaktig lambdasond ger ofta samma felkod och är betydligt billigare att byta.'],
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Boka enkelt online eller ring oss på 070-553 33 95 och lämna in bilen hos oss på Utmarksvägen 21B i Brynäs.'],
  ['02', 'Lyft & läckagekontroll', 'Vi hissar upp bilen och inspekterar hela avgassystemet från grenrör till slutrör för att lokalisera sprickor och rost.'],
  ['03', 'Sensordiagnostik', 'Vid tänd motorlampa läser vi av lambdasondernas signalvärden och felminnet i bilens motorstyrdon.'],
  ['04', 'Montering & tätning', 'Vi demonterar den trasiga delen och monterar nya kvalitetsdelar med nya packningar, klammor och upphängningar.'],
  ['05', 'Täthetskontroll & slutprov', 'Vi varmkör motorn och säkerställer att alla skarvar är 100 % täta och att ljudnivån är tyst och behaglig.'],
]

const faqs = [
  ['Varför rostar avgassystemet sönder så ofta i Sverige?', 'Vägsalt och fukt under vinterhalvåret sliter hårt på metallen underifrån. Dessutom bildas kondensvatten inuti avgassystemet vid korta körsträckor, vilket gör att särskilt den bakre ljuddämparen rostar inifrån och ut.'],
  ['Betyder motorlampan att katalysatorn är trasig?', 'Inte nödvändigtvis. En trasig lambdasond eller ett mindre läckage i flexröret ger ofta samma typ av felkod (t.ex. felaktiga avgasvärden). Att byta lambdasond eller täta ett rör är en betydligt billigare åtgärd än att byta hela katalysatorn, och vi felsöker alltid ordentligt först.'],
  ['Är det farligt att köra med ett skadat avgassystem?', 'Det beror på var skadan sitter. Ett läckage nära motorrum eller kupé som gör att avgaslukt tränger in i bilen är en direkt hälsorisk och bör åtgärdas omgående. Ett hål i den bakre ljuddämparen ger mest ett högt brummande ljud men bör ändå åtgärdas inför besiktningen.'],
  ['Kan ett trasigt avgassystem ge underkänd besiktning?', 'Ja, det är en av de absolut vanligaste orsakerna till underkänd besiktning. Otätheter i systemet, bullernivåer över gränsvärdet eller felaktiga avgasutsläpp (CO-halt och lambda-värde) leder till ombesiktning.'],
  ['Måste hela avgassystemet bytas om en del gått sönder?', 'Nästan aldrig. Det vanligaste är att byta den enskilda sektion som är trasig — oftast den bakre ljuddämparen eller flexröret — snarare än hela systemet från grenrör till ändrör.'],
  ['Hur lång tid tar en reparation av avgassystemet?', 'Ett byte av en bakre eller mellersta ljuddämpare går ofta snabbt (under 1 timme), medan felsökning av en lambdasond eller katalysatorproblem kan ta något längre tid.'],
]

export default function AvgassystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />
      <main className="services-page exhaust-page">
        <section className="services-page__hero" aria-labelledby="exhaust-page-title">
          <div className="container"><div className="services-page__hero-layout">
            <div className="services-page__hero-content">
              <h1 className="services-page__title" id="exhaust-page-title">Avgassystem & avgasrening <span className="title-accent">för tyst gång och ren motor</span></h1>
              <p className="services-page__lead">Avgassystemet renar utsläpp, dämpar motorljudet och säkerställer att motorns sensorer styr förbränningen optimalt. Vi lokaliserar läckage, byter ljuddämpare och felsöker lambdasonder och katalysatorer.</p>
              <div className="services-page__hero-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline"><PhoneIcon className="services-page__btn-icon" /><span>Ring 070-553 33 95</span></a></div>
            </div>
            <div className="services-page__image-placeholder" role="img" aria-label="Platshållare för framtida bild av avgasarbete i verkstaden"><WrenchIcon aria-hidden="true" /><span>Avgasarbete i verkstaden</span><small>Bild kommer</small></div>
          </div></div>
        </section>

        <section className="services-page__guide exhaust-page__intro" aria-labelledby="exhaust-intro-title"><div className="container">
          <div className="services-page__guide-intro"><h2 id="exhaust-intro-title">Vad gör avgassystemet?</h2><p>Avgassystemet gör mer än att bara leda bort avgaser från motorn — det renar utsläppen, dämpar ljudet ner till godkända nivåer och övervakas av sensorer som styr motorns bränsleblandning. Eftersom systemet sitter oskyddat under bilen utsätts det för fukt och vägsalt, vilket gör att det oftast rostar bakifrån och inåt.</p></div>
          <div className="exhaust-page__parts-grid">{parts.map(([title, text]) => <article className="exhaust-page__part-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="services-page__guide-intro exhaust-page__section-gap"><h2>Varför är det viktigt att åtgärda i tid?</h2></div>
          <div className="services-page__benefit-grid exhaust-page__benefit-grid">{benefits.map(([title, text]) => <article className="services-page__benefit-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div></section>

        <section className="exhaust-page__symptoms" aria-labelledby="exhaust-symptoms-title"><div className="container"><div className="services-page__guide-intro"><h2 id="exhaust-symptoms-title">Tecken på fel i avgassystemet</h2><p>Ett skadat eller läckande avgassystem märks oftast tydligt på ljudnivån, lukten eller via bilens varningslampor. Här är de vanligaste tecknen du bör vara uppmärksam på.</p></div><div className="exhaust-page__symptom-grid">{symptoms.map(([title, text]) => <article className="exhaust-page__symptom-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><div className="exhaust-page__test-tip"><strong>Viktigt om motorlampan:</strong> En tänd motorlampa med en katalysator-relaterad felkod betyder inte automatiskt att själva katalysatorn är trasig. En felaktig lambdasond eller ett litet avgasläckage före sonden är minst lika vanligt och betydligt mer prisvärt att åtgärda.</div></div></section>

        <section className="exhaust-page__service" aria-labelledby="exhaust-service-title"><div className="container"><div className="exhaust-page__service-card"><div><h2 id="exhaust-service-title">Det här kan vi hjälpa dig med</h2><p>Vi undersöker hela avgassystemet och byter slitna ljuddämpare, rörsektioner eller lambdasonder med kvalitetsdelar anpassade för din bil.</p></div><ul>{serviceItems.map(item => <li key={item}><CheckIcon className="exhaust-page__service-check" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

        <section className="exhaust-page__guidance" aria-labelledby="exhaust-guidance-title"><div className="container"><div className="services-page__guide-intro"><h2 id="exhaust-guidance-title">Viktig information om avgassystem</h2><p>Här är praktiska riktlinjer och fakta kring avgassystemets funktion och åtgärder. Vi undersöker alltid bilens faktiska skick innan vi föreslår reservdelsbyten.</p></div><div className="exhaust-page__guidance-grid">{guidance.map(([title, text]) => <article className="exhaust-page__guidance-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className="exhaust-page__safety-note"><strong>Säkerhetsnotis:</strong> Lukt av avgaser i kupén ska aldrig ignoreras. Bilavgaser innehåller luktfri och giftig koloxid (kolmonoxid) som snabbt kan orsaka huvudvärk, illamående och nedsatt reaktionsförmåga under körning. Boka tid direkt om du känner avgasdoft i bilen.</aside></div></section>

        <section className="services-page__process-section exhaust-page__process" aria-labelledby="exhaust-process-title"><div className="container"><div className="services-page__process-card"><div className="services-page__process-inner"><div className="services-page__process-text"><h2 className="services-page__process-heading" id="exhaust-process-title">Så går det till <br /><span className="title-accent">hos oss</span></h2><p className="services-page__process-desc">Att laga eller byta delar i avgassystemet kräver noggrann täthetskontroll och rätt upphängningar. Så här ser vår process ut.</p><div className="services-page__process-action"><a href="tel:0705533395" className="services-page__process-cta"><PhoneIcon className="services-page__process-icon" /><span>Ring oss: 070-553 33 95</span></a></div></div><div className="services-page__process-steps"><div className="services-page__steps-list">{processSteps.map(([number, title, text]) => <div className="services-page__step" key={number}><div className="services-page__step-num" aria-hidden="true">{number}</div><div className="services-page__step-content"><h3 className="services-page__step-title">{title}</h3><p className="services-page__step-desc">{text}</p></div></div>)}</div></div></div></div></div></section>

        <BiltjansterFaq id="exhaust-faq" heading="Vanliga frågor om avgassystem" items={faqs.map(([question, answer]) => ({ question, answer }))} />

        <section className="services-page__pricing exhaust-page__booking" aria-labelledby="exhaust-booking-title"><div className="container"><div className="services-page__pricing-card"><div><h2 id="exhaust-booking-title">Boka reparation av avgassystem</h2><p>Priset beror helt på vilken del av avgassystemet som behöver åtgärdas — ett byte av en bakre ljuddämpare skiljer sig från byte av lambdasond eller katalysator. Ring oss på 070-553 33 95 så ger vi dig ett tydligt och transparent kostnadsförslag innan vi sätter igång.</p></div><div className="services-page__pricing-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a></div></div></div></section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
