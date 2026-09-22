// Rebuilt 2026-09-19 on the shared ServiceGuideTemplate (Step 5, Guide Family Rebuild).
// Proves template reusability for /styrning-kulleder without inventing a new CSS file.
// Zero dependency on index.css; inherits Level 0 tokens and shared-elements.
import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/business'
import '../styles/design-tokens.css'
import '../styles/shared-elements.css'
import '../styles/ServiceGuideTemplate.css'
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
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon'
import { ThumbsUpIcon } from '../components/icons/ThumbsUpIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { LightbulbIcon } from '../components/icons/LightbulbIcon'
import { SlidersIcon } from '../components/icons/SlidersIcon'
import { WavesIcon } from '../components/icons/WavesIcon'
import { Volume2Icon } from '../components/icons/Volume2Icon'

const trustBadges = [
  { icon: ShieldIcon, title: 'Säker väghållning', text: 'Vi åtgärdar glapp i framvagnen innan det blir farligt.' },
  { icon: WrenchIcon, title: 'Erfarna mekaniker', text: 'Korrekt ledbyte och professionell fyrhjulsmätning.' },
  { icon: ClockIcon, title: 'Tydlig rådgivning', text: 'Ärlig felsökning och tydlig kostnadsuppgift.' },
] as const

const parts = [
  { title: 'Kulleder / Spindelleder', text: 'Länkar samman hjulupphängningen och gör att hjulet kan röra sig kontrollerat upp och ner samtidigt som det vrids vid styrning.' },
  { title: 'Styrleder (styrstagsändar)', text: 'Förmedlar rattrörelsen med hög precision från styrväxeln (kuggstången) direkt ut till respektive framhjuls spindel.' },
  { title: 'Hydraulisk servostyrning', text: 'Gör styrningen lätt via servopump, drivrem, servoolja och tryckledningar på bilar med hydrauliskt assisterat system.' },
  { title: 'Elektrisk servo (EPS)', text: 'Modern elektroniskt styrd elmotor integrerad i styrväxel eller rattstång som anpassar motståndet efter fordonets hastighet.' },
] as const

const benefits = [
  { icon: AlertTriangleIcon, title: 'Säkerhet i första hand', text: 'En kraftigt sliten eller brusten kulled kan i värsta fall leda till att hjulet viker sig eller lossnar från hjulupphängningen under körning.' },
  { icon: GaugeIcon, title: 'Knivskarp styrprecision', text: 'Friska leder och bussningar eliminerar dödgång i ratten och säkerställer att bilen reagerar direkt och förutsägbart på dina manövrar.' },
  { icon: SlidersIcon, title: 'Jämnare däckslitage', text: 'Glapp i styrningen rubbar hjulvinklarna, vilket snabbt leder till att däcken snedslits på in- eller utsidan och måste kasseras i förtid.' },
  { icon: ThumbsUpIcon, title: 'Rätt diagnos från början', text: 'Vi avgör fackmannamässigt om missljudet härstammar från kulleder, styrleder eller servostyrningen, vilket förhindrar felaktiga reparationer.' },
] as const

interface SymptomItem {
  icon: (props: { className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }) => React.ReactElement | null
  title: string
  text: string
  featured?: boolean
  urgent?: boolean
}

const symptoms: readonly SymptomItem[] = [
  { icon: Volume2Icon, title: 'Klapper eller skrammel över gupp', text: 'Mekaniskt klapper eller slag från framvagnen vid körning på ojämnt underlag tyder ofta på glappande kulled eller styrled.', featured: true },
  { icon: SlidersIcon, title: 'Knarrande ljud vid rattutslag', text: 'Knarrande eller gnällande missljud vid stillastående eller låg fart (t.ex. vid parkering) avslöjar torr eller sliten led.' },
  { icon: WavesIcon, title: 'Svampig och oprecis rattkänsla', text: 'Bilen känns orolig och spårkänslig på vägen, med fördröjd respons och dödgång när du vrider på ratten.' },
  { icon: WrenchIcon, title: 'Ratten blir tung eller ryckig', text: 'Plötsligt ökat styrmotstånd eller hackig servoverkan tyder på fel i servopump, drivrem, oljenivå eller EPS-elmotor.', urgent: true },
  { icon: AlertTriangleIcon, title: 'Tjutande servoljud eller läckage', text: 'Tjutande ljud vid fullt rattutslag eller rödaktiga oljefläckar under motorrummet pekar mot läckande hydraulservo.', urgent: true },
  { icon: GaugeIcon, title: 'Tänd EPS-varningslampa & snedslitna däck', text: 'Gul rattsymbol på instrumentpanelen eller ojämnt slitna däckkanter indikerar att styrgeometrin behöver ses över.' },
]

const serviceItems = [
  'Noggrann framvagnskontroll och mekaniskt glapptest av spindelleder, styrleder och länkarmar med bilen upplyft.',
  'Byte av enskild kulled, styrled eller inre styrstag vid konstaterat spel eller sprucken gummidamask.',
  'Felsökning och diagnostik av servostyrning (hydraulisk pump, ledningar, vätskenivå eller elektriskt EPS-system).',
  'Kontroll och byte av servoolja samt multirem och remspännare på bilar med hydraulisk servo.',
  'Översyn av dammskydd, bussningar och damasker för att skydda lederna mot framtida smuts- och fuktskador.',
  'Professionell fyrhjulsmätning och hjulinställning efter utfört arbete för att garantera perfekt hjulgeometri.',
]

interface InfoCardItem {
  icon: (props: { className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }) => React.ReactElement | null
  title: string
  text: string
  flag?: string
}

const infoCards: readonly InfoCardItem[] = [
  { icon: AlertTriangleIcon, title: 'Kulleder är säkerhetskritiska', text: 'Spindelleden bär upp hjulet under körning. Ett kraftigt glapp riskerar att få kulleden att hoppa ur sin skål vid kraftig påfrestning eller ett gupp.', flag: 'VIKTIGT' },
  { icon: ShieldIcon, title: 'Går servon sönder går bilen att styra', text: 'Slutar servostyrningen att fungera behåller bilen mekanisk styrning. Ratten blir dock extremt tung i låg fart — håll stadigt och stanna kontrollerat.' },
  { icon: GaugeIcon, title: 'Hjulinställning är ett krav', text: 'Vid byte av styrled eller kulled förändras framhjulens hjulvinklar (toe-in). En hjulinställning är nödvändig för att inte slita ut däcken på nolltid.' },
  { icon: ClockIcon, title: 'Priset beror på felets art', text: 'Ett byte av en yttre styrstagsände är ett relativt snabbt ingrepp, medan byte av en kuggstång eller elektrisk servomotor är betydligt mer omfattande.' },
]

const processSteps = [
  ['01', 'Bokning och inlämning', `Boka enkelt online eller ring oss på ${BUSINESS.phone.display} och lämna in bilen hos oss på Utmarksvägen 21B i Brynäs.`],
  ['02', 'Framvagnslyft & glapptest', 'Vi hissar upp bilen och känner mekaniskt efter minsta spel och glapp i alla leder, stag, bussningar och kuggstång.'],
  ['03', 'Servodiagnostik vid behov', 'Vi mäter hydrauliskt servotryck och oljekvalitet eller kopplar upp diagnosverktyg för att läsa av EPS-sensorer.'],
  ['04', 'Fackmannamässigt ledbyte', 'Slitna komponenter demonteras och ersätts med nya kvalitetsdelar och nya låsmuttrar med exakt åtdragningsmoment.'],
  ['05', 'Hjulinställning & provkörning', 'Vi justerar hjulvinklarna till tillverkarens originalspecifikationer och provkör bilen för perfekt stabilitet och styrkänsla.'],
] as const

const faqs = [
  { question: 'Hur vet jag om det är en kulled, styrled eller servostyrningen som är dålig?', answer: 'Klapprande missljud över gupp och knarr vid låg fart pekar i regel mot slitna kulleder eller styrstagsändar. Om ratten istället känns tung, ryckig, ger ifrån sig ett tjutande ljud eller om en gul varningslampa tänds i displayen sitter felet i servosystemet. Vi provkör och undersöker bilen för att ge dig ett säkert besked.' },
  { question: 'Är det farligt att köra med en sliten kulled?', answer: 'Ja, det kan vara direkt livsfarligt om det ignoreras. En sliten kulled nöts snabbt och kan i värsta fall hoppa ur sin skål vid gupp eller panikinbromsning, vilket gör att hjulet viker sig under bilen och styrningen slutar fungera helt.' },
  { question: 'Går det att köra om servostyrningen slutar fungera?', answer: 'Ja, det finns alltid en direkt mekanisk koppling mellan ratt och hjul. Bilen går att styra, men ratten blir mycket tung att vrida, särskilt vid stillastående och låg hastighet. Skulle servon lägga av i trafiken bör du hålla hårt i ratten, sakta in mjukt och köra åt sidan.' },
  { question: 'Varför slits mina däck snett på framhjulen?', answer: 'Snedslitna däck beror nästan alltid på felaktig hjulinställning eller glappa framvagnsdelar. När en styrled eller kulled blir glapp ändras hjulens vinklar under körning, vilket gör att däckets inner- eller ytterkant slits ut i förtid.' },
  { question: 'Måste man göra en hjulinställning efter byte av styrled?', answer: 'Ja, absolut. När en styrled gängas loss och byts ändras framhjulens spårning (toe-vinkel). Utan en efterföljande fyrhjulsmätning och justering riskerar du att ratten hamnar snett och att de nya däcken förstörs på några hundra mil.' },
  { question: 'Hur lång tid tar det att byta styrleder eller kulleder?', answer: 'Ett byte av en enskild kulled eller yttre styrled tar vanligen cirka 1 timme inklusive hjulinställning. Mer avancerade servosystemreparationer eller byte av kuggstång kan ta 2–4 timmar.' },
]

function MediaPlaceholder({ label, note, light }: { label: string; note: string; light?: boolean }) {
  return (
    <div className={`service-guide__placeholder${light ? ' service-guide__placeholder--light' : ''}`} role="img" aria-label={`Platshållare för framtida bild: ${label}`}>
      <WrenchIcon aria-hidden="true" />
      <span>{label}</span>
      <small>{note}</small>
    </div>
  )
}

export default function StyrningKullederPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openModal} variant="overlay" />
      <main className="service-guide">
        {/* Hero */}
        <section className="service-guide__hero" aria-labelledby="steering-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__hero-inner">
              <div>
                <div className="bb-eyebrow bb-eyebrow--dark service-guide__eyebrow">Framvagn &amp; styrprecision</div>
                <h1 className="bb-h1 service-guide__title" id="steering-title">
                  Styrning &amp; kulleder i <span className="bb-accent">Gävle</span>
                </h1>
                <p className="bb-lead bb-lead--dark service-guide__lead">
                  Styrleder, spindelleder och servostyrning ser till att bilen lyder ratten direkt och rullar stabilt. Vi felsöker missljud och glapp, byter slitna leder och utför professionell hjulinställning.
                </p>
                <div className="service-guide__actions">
                  <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka tid</button>
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

        {/* Vad gör styrning och kulleder? */}
        <section className="service-guide__section" aria-labelledby="steering-intro-title">
          <div className="bb-wrap service-guide__container service-guide__intro-layout">
            <div className="service-guide__intro-media">
              <MediaPlaceholder label="Framvagnens leder &amp; servokomponenter" note="Bild kommer" light />
              <p className="service-guide__intro-caption">Exakt geometri, maximal kontroll.</p>
            </div>
            <div className="service-guide__intro-content">
              <h2 id="steering-intro-title">Vad gör styrning och kulleder?</h2>
              <p>Under styrning och kulleder samlar vi de komponenter som gör att bilen lyder rattrörelserna exakt och att hjulen rör sig kontrollerat med fjädringen. Kulleder och styrleder skyddas av gummidamasker — spricker en damask tränger fukt och smuts in, vilket snabbt nöter ner leden och skapar farligt glapp.</p>
              <div className="service-guide__component-grid">
                {parts.map((item, index) => (
                  <div className="service-guide__component-item" key={item.title}>
                    <span className="service-guide__component-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </div>
                ))}
              </div>
              <div className="bb-tip">
                <span className="bb-icon-badge"><LightbulbIcon aria-hidden="true" /></span>
                <div className="bb-tip__body">
                  <span className="bb-eyebrow">Tips</span>
                  <strong className="bb-tip__title">Upplever du glapp, klapper eller tung styrning?</strong>
                  <span className="bb-tip__text">Vi hissar upp bilen och kontrollerar leder, stag och servoverkan – snabbt och säkert.</span>
                </div>
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka kontroll<ArrowRightIcon aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </section>

        {/* Varför är det viktigt att åtgärda i tid? */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="steering-importance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__importance">
              <div>
                <h2 id="steering-importance-title">Varför är det viktigt att åtgärda i tid?</h2>
                <p>En sliten styrled eller kulled äventyrar trafiksäkerheten och leder snabbt till snedslitna däck och sämre körkänsla.</p>
              </div>
              <div className="service-guide__importance-grid">
                {benefits.map(({ icon: Icon, title, text }) => (
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

        {/* Tecken på sliten styrning eller trasiga leder */}
        <section className="service-guide__section" aria-labelledby="steering-symptoms-title">
          <div className="bb-wrap service-guide__container service-guide__symptoms-layout">
            <div className="service-guide__symptoms-content">
              <h2 id="steering-symptoms-title">Tecken på sliten styrning eller trasiga leder</h2>
              <p>Glapp i framvagnen och fel på servostyrningen ger tydliga signaler i ratten och vid körning över gupp. Här är de vanligaste tecknen du bör vara uppmärksam på.</p>
              <div className="service-guide__symptom-list">
                {symptoms.map(({ icon: Icon, title, text, featured, urgent }) => (
                  <article className={`service-guide__symptom-row${urgent ? ' service-guide__symptom-row--urgent' : featured ? ' service-guide__symptom-row--featured' : ''}`} key={title}>
                    <span className="service-guide__symptom-icon"><Icon aria-hidden="true" /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
              <div className="bb-tip">
                <span className="bb-icon-badge"><LightbulbIcon aria-hidden="true" /></span>
                <div className="bb-tip__body">
                  <span className="bb-eyebrow">Tips</span>
                  <strong className="bb-tip__title">Viktigt om bilens dragning:</strong>
                  <span className="bb-tip__text">Att bilen drar åt ena hållet beror i regel inte på servostyrningen, utan på felaktig hjulinställning, ojämnt däcktryck eller glappande länkarmar och kulleder i hjulupphängningen.</span>
                </div>
              </div>
            </div>
            <div className="service-guide__symptoms-media">
              <MediaPlaceholder label="Inspektion av framvagn och styrleder" note="Bild kommer" light />
              <p className="service-guide__symptoms-caption">Säker väghållning kräver intakta leder.</p>
            </div>
          </div>
        </section>

        {/* Det här kan vi hjälpa dig med */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="steering-service-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__service-card">
              <div>
                <h2 id="steering-service-title">Det här kan vi hjälpa dig med</h2>
                <p>Vi felsöker, reparerar och byter slitna styrkomponenter och servodetaljer med kvalitetsdelar anpassade för din bilmodell.</p>
              </div>
              <ul className="service-guide__service-checklist">
                {serviceItems.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Viktig information om styrning och kulleder */}
        <section className="service-guide__section" aria-labelledby="steering-guidance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__info-heading">
              <h2 id="steering-guidance-title">Viktig information om styrning och kulleder</h2>
              <p>Här är praktiska riktlinjer och fakta kring styrningens mekanik och säkerhet. Vi undersöker alltid framvagnens faktiska skick innan vi föreslår reservdelsbyten.</p>
            </div>
            <div className="service-guide__info-grid">
              {infoCards.map(({ icon: Icon, title, text, flag }) => (
                <div className="service-guide__info-card" key={title}>
                  <span className="service-guide__info-icon"><Icon aria-hidden="true" /></span>
                  <div>
                    {flag && <span className="service-guide__info-flag" aria-hidden="true">{flag}</span>}
                    <h3>{title}</h3><p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="service-guide__safety-strip">
              <AlertTriangleIcon aria-hidden="true" />
              <p><strong>Säkerhetsnotis:</strong> En glappande kulled eller styrled är en allvarlig säkerhetsrisk som inte ska ignoreras. Skulle leden brista under färd förlorar föraren styrkontrollen över hjulet med omedelbar olycksrisk som följd. Boka kontroll så snart du märker klapper eller glapp.</p>
            </div>
          </div>
        </section>

        {/* Så går det till hos oss */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="steering-process-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__process">
              <div className="service-guide__process-text">
                <h2 id="steering-process-title">Så går det till<br /><span className="bb-accent">hos oss</span></h2>
                <p>Att byta styrleder och kulleder kräver fackmannamässig glappkontroll och efterföljande hjulinställning. Så här ser vår process ut.</p>
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

        <BiltjansterFaq id="steering-faq" heading="Vanliga frågor om styrning och kulleder" items={faqs} />

        {/* Closing CTA */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="steering-booking-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__closing">
              <div>
                <h2 id="steering-booking-title">Boka kontroll av styrning &amp; kulleder</h2>
                <p>Priset beror helt på vad som behöver åtgärdas — ett byte av en yttre styrled är ett prisvärt ingrepp, medan reparation av servopump eller kuggstång är mer omfattande. Ring oss på {BUSINESS.phone.display} så felsöker vi och ger dig ett tydligt kostnadsförslag innan vi sätter igång.</p>
              </div>
              <div className="service-guide__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka tid</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller styrning & kulleder" />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
