import { useEffect, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'
import { CheckIcon } from '../components/icons/CheckIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'

const parts = [
  ['Kulleder / Spindelleder', 'Länkar samman hjulupphängningen och gör att hjulet kan röra sig kontrollerat upp och ner samtidigt som det vrids vid styrning.'],
  ['Styrleder (styrstagsändar)', 'Förmedlar rattrörelsen med hög precision från styrväxeln (kuggstången) direkt ut till respektive framhjuls spindel.'],
  ['Hydraulisk servostyrning', 'Gör styrningen lätt via servopump, drivrem, servoolja och tryckledningar på bilar med hydrauliskt assisterat system.'],
  ['Elektrisk servo (EPS)', 'Modern elektroniskt styrd elmotor integrerad i styrväxel eller rattstång som anpassar motståndet efter fordonets hastighet.'],
]

const benefits = [
  ['Säkerhet i första hand', 'En kraftigt sliten eller brusten kulled kan i värsta fall leda till att hjulet viker sig eller lossnar från hjulupphängningen under körning.'],
  ['Knivskarp styrprecision', 'Friska leder och bussningar eliminerar dödgång i ratten och säkerställer att bilen reagerar direkt och förutsägbart på dina manövrar.'],
  ['Jämnare däckslitage', 'Glapp i styrningen rubbar hjulvinklarna, vilket snabbt leder till att däcken snedslits på in- eller utsidan och måste kasseras i förtid.'],
  ['Rätt diagnos från början', 'Vi avgör fackmannamässigt om missljudet härstammar från kulleder, styrleder eller servostyrningen, vilket förhindrar felaktiga reparationer.'],
]

const symptoms = [
  ['Klapper eller skrammel över gupp', 'Mekaniskt klapper eller slag från framvagnen vid körning på ojämnt underlag tyder ofta på glappande kulled eller styrled.'],
  ['Knarrande ljud vid rattutslag', 'Knarrande eller gnällande missljud vid stillastående eller låg fart (t.ex. vid parkering) avslöjar torr eller sliten led.'],
  ['Svampig och oprecis rattkänsla', 'Bilen känns orolig och spårkänslig på vägen, med fördröjd respons och dödgång när du vrider på ratten.'],
  ['Ratten blir tung eller ryckig', 'Plötsligt ökat styrmotstånd eller hackig servoverkan tyder på fel i servopump, drivrem, oljenivå eller EPS-elmotor.'],
  ['Tjutande servoljud eller läckage', 'Tjutande ljud vid fullt rattutslag eller rödaktiga oljefläckar under motorrummet pekar mot läckande hydraulservo.'],
  ['Tänd EPS-varningslampa & snedslitna däck', 'Gul rattsymbol på instrumentpanelen eller ojämnt slitna däckkanter indikerar att styrgeometrin behöver ses över.'],
]

const serviceItems = [
  'Noggrann framvagnskontroll och mekaniskt glapptest av spindelleder, styrleder och länkarmar med bilen upplyft.',
  'Byte av enskild kulled, styrled eller inre styrstag vid konstaterat spel eller sprucken gummidamask.',
  'Felsökning och diagnostik av servostyrning (hydraulisk pump, ledningar, vätskenivå eller elektriskt EPS-system).',
  'Kontroll och byte av servoolja samt multirem och remspännare på bilar med hydraulisk servo.',
  'Översyn av dammskydd, bussningar och damasker för att skydda lederna mot framtida smuts- och fuktskador.',
  'Professionell fyrhjulsmätning och hjulinställning efter utfört arbete för att garantera perfekt hjulgeometri.',
]

const guidance = [
  ['Kulleder är säkerhetskritiska', 'Spindelleden bär upp hjulet under körning. Ett kraftigt glapp riskerar att få kulleden att hoppa ur sin skål vid kraftig påfrestning eller ett gupp.'],
  ['Går servon sönder går bilen att styra', 'Slutar servostyrningen att fungera behåller bilen mekanisk styrning. Ratten blir dock extremt tung i låg fart — håll stadigt och stanna kontrollerat.'],
  ['Hjulinställning är ett krav', 'Vid byte av styrled eller kulled förändras framhjulens hjulvinklar (toe-in). En hjulinställning är nödvändig för att inte slita ut däcken på nolltid.'],
  ['Priset beror på felets art', 'Ett byte av en yttre styrstagsände är ett relativt snabbt ingrepp, medan byte av en kuggstång eller elektrisk servomotor är betydligt mer omfattande.'],
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Boka enkelt online eller ring oss på 070-553 33 95 och lämna in bilen hos oss på Utmarksvägen 21B i Brynäs.'],
  ['02', 'Framvagnslyft & glapptest', 'Vi hissar upp bilen och känner mekaniskt efter minsta spel och glapp i alla leder, stag, bussningar och kuggstång.'],
  ['03', 'Servodiagnostik vid behov', 'Vi mäter hydrauliskt servotryck och oljekvalitet eller kopplar upp diagnosverktyg för att läsa av EPS-sensorer.'],
  ['04', 'Fackmannamässigt ledbyte', 'Slitna komponenter demonteras och ersätts med nya kvalitetsdelar och nya låsmuttrar med exakt åtdragningsmoment.'],
  ['05', 'Hjulinställning & provkörning', 'Vi justerar hjulvinklarna till tillverkarens originalspecifikationer och provkör bilen för perfekt stabilitet och styrkänsla.'],
]

const faqs = [
  ['Hur vet jag om det är en kulled, styrled eller servostyrningen som är dålig?', 'Klapprande missljud över gupp och knarr vid låg fart pekar i regel mot slitna kulleder eller styrstagsändar. Om ratten istället känns tung, ryckig, ger ifrån sig ett tjutande ljud eller om en gul varningslampa tänds i displayen sitter felet i servosystemet. Vi provkör och undersöker bilen för att ge dig ett säkert besked.'],
  ['Är det farligt att köra med en sliten kulled?', 'Ja, det kan vara direkt livsfarligt om det ignoreras. En sliten kulled nöts snabbt och kan i värsta fall hoppa ur sin skål vid gupp eller panikinbromsning, vilket gör att hjulet viker sig under bilen och styrningen slutar fungera helt.'],
  ['Går det att köra om servostyrningen slutar fungera?', 'Ja, det finns alltid en direkt mekanisk koppling mellan ratt och hjul. Bilen går att styra, men ratten blir mycket tung att vrida, särskilt vid stillastående och låg hastighet. Skulle servon lägga av i trafiken bör du hålla hårt i ratten, sakta in mjukt och köra åt sidan.'],
  ['Varför slits mina däck snett på framhjulen?', 'Snedslitna däck beror nästan alltid på felaktig hjulinställning eller glappa framvagnsdelar. När en styrled eller kulled blir glapp ändras hjulens vinklar under körning, vilket gör att däckets inner- eller ytterkant slits ut i förtid.'],
  ['Måste man göra en hjulinställning efter byte av styrled?', 'Ja, absolut. När en styrled gängas loss och byts ändras framhjulens spårning (toe-vinkel). Utan en efterföljande fyrhjulsmätning och justering riskerar du att ratten hamnar snett och att de nya däcken förstörs på några hundra mil.'],
  ['Hur lång tid tar det att byta styrleder eller kulleder?', 'Ett byte av en enskild kulled eller yttre styrled tar vanligen cirka 1 timme inklusive hjulinställning. Mer avancerade servosystemreparationer eller byte av kuggstång kan ta 2–4 timmar.'],
]

export default function StyrningKullederPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />
      <main className="services-page steering-page">
        <section className="services-page__hero" aria-labelledby="steering-page-title">
          <div className="container"><div className="services-page__hero-layout">
            <div className="services-page__hero-content">
              <h1 className="services-page__title" id="steering-page-title">Styrning & kulleder <span className="title-accent">för exakt kontroll och säker väghållning</span></h1>
              <p className="services-page__lead">Styrleder, spindelleder och servostyrning ser till att bilen lyder ratten direkt och rullar stabilt. Vi felsöker missljud och glapp, byter slitna leder och utför professionell hjulinställning.</p>
              <div className="services-page__hero-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline"><PhoneIcon className="services-page__btn-icon" /><span>Ring 070-553 33 95</span></a></div>
            </div>
            <div className="services-page__image-placeholder" role="img" aria-label="Platshållare för framtida bild av styrningsarbete i verkstaden"><WrenchIcon aria-hidden="true" /><span>Styrningsarbete i verkstaden</span><small>Bild kommer</small></div>
          </div></div>
        </section>

        <section className="services-page__guide steering-page__intro" aria-labelledby="steering-intro-title"><div className="container">
          <div className="services-page__guide-intro"><h2 id="steering-intro-title">Vad gör styrning och kulleder?</h2><p>Under styrning och kulleder samlar vi de komponenter som gör att bilen lyder rattrörelserna exakt och att hjulen rör sig kontrollerat med fjädringen. Kulleder och styrleder skyddas av gummidamasker — spricker en damask tränger fukt och smuts in, vilket snabbt nöter ner leden och skapar farligt glapp.</p></div>
          <div className="steering-page__parts-grid">{parts.map(([title, text]) => <article className="steering-page__part-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="services-page__guide-intro steering-page__section-gap"><h2>Varför är det viktigt att åtgärda i tid?</h2></div>
          <div className="services-page__benefit-grid steering-page__benefit-grid">{benefits.map(([title, text]) => <article className="services-page__benefit-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div></section>

        <section className="steering-page__symptoms" aria-labelledby="steering-symptoms-title"><div className="container"><div className="services-page__guide-intro"><h2 id="steering-symptoms-title">Tecken på sliten styrning eller trasiga leder</h2><p>Glapp i framvagnen och fel på servostyrningen ger tydliga signaler i ratten och vid körning över gupp. Här är de vanligaste tecknen du bör vara uppmärksam på.</p></div><div className="steering-page__symptom-grid">{symptoms.map(([title, text]) => <article className="steering-page__symptom-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><div className="steering-page__test-tip"><strong>Viktigt om bilens dragning:</strong> Att bilen drar åt ena hållet beror i regel inte på servostyrningen, utan på felaktig hjulinställning, ojämnt däcktryck eller glappande länkarmar och kulleder i hjulupphängningen.</div></div></section>

        <section className="steering-page__service" aria-labelledby="steering-service-title"><div className="container"><div className="steering-page__service-card"><div><h2 id="steering-service-title">Det här kan vi hjälpa dig med</h2><p>Vi felsöker, reparerar och byter slitna styrkomponenter och servodetaljer med kvalitetsdelar anpassade för din bilmodell.</p></div><ul>{serviceItems.map(item => <li key={item}><CheckIcon className="steering-page__service-check" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

        <section className="steering-page__guidance" aria-labelledby="steering-guidance-title"><div className="container"><div className="services-page__guide-intro"><h2 id="steering-guidance-title">Viktig information om styrning och kulleder</h2><p>Här är praktiska riktlinjer och fakta kring styrningens mekanik och säkerhet. Vi undersöker alltid framvagnens faktiska skick innan vi föreslår reservdelsbyten.</p></div><div className="steering-page__guidance-grid">{guidance.map(([title, text]) => <article className="steering-page__guidance-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className="steering-page__safety-note"><strong>Säkerhetsnotis:</strong> En glappande kulled eller styrled är en allvarlig säkerhetsrisk som inte ska ignoreras. Skulle leden brista under färd förlorar föraren styrkontrollen över hjulet med omedelbar olycksrisk som följd. Boka kontroll så snart du märker klapper eller glapp.</aside></div></section>

        <section className="services-page__process-section steering-page__process" aria-labelledby="steering-process-title"><div className="container"><div className="services-page__process-card"><div className="services-page__process-inner"><div className="services-page__process-text"><h2 className="services-page__process-heading" id="steering-process-title">Så går det till <br /><span className="title-accent">hos oss</span></h2><p className="services-page__process-desc">Att byta styrleder och kulleder kräver fackmannamässig glappkontroll och efterföljande hjulinställning. Så här ser vår process ut.</p><div className="services-page__process-action"><a href="tel:0705533395" className="services-page__process-cta"><PhoneIcon className="services-page__process-icon" /><span>Ring oss: 070-553 33 95</span></a></div></div><div className="services-page__process-steps"><div className="services-page__steps-list">{processSteps.map(([number, title, text]) => <div className="services-page__step" key={number}><div className="services-page__step-num" aria-hidden="true">{number}</div><div className="services-page__step-content"><h3 className="services-page__step-title">{title}</h3><p className="services-page__step-desc">{text}</p></div></div>)}</div></div></div></div></div></section>

        <BiltjansterFaq id="steering-faq" heading="Vanliga frågor om styrning och kulleder" items={faqs.map(([question, answer]) => ({ question, answer }))} />

        <section className="services-page__pricing steering-page__booking" aria-labelledby="steering-booking-title"><div className="container"><div className="services-page__pricing-card"><div><h2 id="steering-booking-title">Boka kontroll av styrning & kulleder</h2><p>Priset beror helt på vad som behöver åtgärdas — ett byte av en yttre styrled är ett prisvärt ingrepp, medan reparation av servopump eller kuggstång är mer omfattande. Ring oss på 070-553 33 95 så felsöker vi och ger dig ett tydligt kostnadsförslag innan vi sätter igång.</p></div><div className="services-page__pricing-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a></div></div></div></section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
