// Sibling 1 of 3 of the "Bilservice" shared-family template (Bilservice,
// Felsökning, Däckservice and AC-service all mount on ServiceReparationerPage.css):
// clean automotive advertising / ownership confidence, distinct from both
// index.css and the teal-technical ServiceGuideTemplate.css used by the
// Guide family. Styled entirely by ./ServiceReparationerPage.css (class
// prefix .bilservice__) — zero dependency on index.css or its --redesign-*
// tokens; consumes --bb-* tokens only.
import { useState, useEffect } from 'react'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { GoogleReviewsCard } from '../components/ui/GoogleReviewsCard'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import heroJpg from '../assets/images/services/diagnostics/diagnostics-workshop-hero.jpg'
import heroWebp from '../assets/images/services/diagnostics/diagnostics-workshop-hero.webp'
import introJpg from '../assets/images/services/diagnostics/diagnostics-engine-bay-tablet.jpg'
import introWebp from '../assets/images/services/diagnostics/diagnostics-engine-bay-tablet.webp'
import serviceJpg from '../assets/images/services/diagnostics/diagnostics-obd-connection-detail.jpg'
import serviceWebp from '../assets/images/services/diagnostics/diagnostics-obd-connection-detail.webp'
import { BUSINESS } from '../data/business'
import './ServiceReparationerPage.css'

const trustRow = [
  { icon: ShieldIcon, title: 'Personlig service', text: 'Du och din bil i fokus.' },
  { icon: MonitorIcon, title: 'Modern utrustning', text: 'Avancerad felkodsläsning.' },
  { icon: ClockIcon, title: 'Tryggt och enkelt', text: 'Tydliga besked innan reparation.' },
] as const

const categories = [
  ['Felkodsläsning (OBD)', 'Vi läser av bilens styrsystem via OBD-uttaget och tolkar vilka felkoder som är lagrade eller pågående.'],
  ['Motordiagnostik', 'Kontroll av tändning, bränsletillförsel och motorstyrning när motorn går ojämnt eller tappar effekt.'],
  ['Elektronik & sensorer', 'Test av givare och styrsystem som annars ger felmeddelanden eller oregelbunden funktion.'],
  ['Bränsle- & avgassystem', 'Felsökning av system som påverkar bränsleförbrukning, utsläpp och en godkänd besiktning.'],
  ['Kylsystem', 'Kontroll av kylvätskenivå, termostat och temperaturövervakning så att motorn inte överhettas.'],
  ['Batteri & laddsystem', 'Test av batteri och generator när elsystemet inte får den ström det behöver.'],
] as const

const symptoms = [
  {
    question: 'Motorlampan (Check Engine) eller andra varningslampor lyser',
    advice: 'Felkodsläsning',
    description: 'En lysande lampa betyder att bilens system har upptäckt en avvikelse. Vi läser av felkoderna för att se vilket system som larmar.',
    adviceDetail: 'Vi kopplar in diagnostikutrustning och läser av lagrade koder. Tar normalt 30–60 minuter.',
  },
  {
    question: 'Bilen är svårstartad eller stannar under körning',
    advice: 'Motor- och elsystemdiagnostik',
    description: 'Kan bero på allt från tändning och bränsletillförsel till sensorer eller batteri/laddsystem — vi mäter oss fram till orsaken.',
    adviceDetail: 'Kontroll av tändning, bränsletillförsel och elsystem. Normalt 1–2 timmar beroende på orsak.',
  },
  {
    question: 'Ojämn motorgång eller märkbart sämre effekt',
    advice: 'Motordiagnostik',
    description: 'Ofta ett tecken på fel i tändning, insprutning eller givare som påverkar motorstyrningen.',
    adviceDetail: 'Mätning av tändläge, insprutning och relevanta givare. Normalt 1–2 timmar.',
  },
  {
    question: 'Elektriska funktioner eller instrument fungerar konstigt',
    advice: 'Elektronik- och elsystemfelsökning',
    description: 'Fönsterhissar, belysning eller instrumentpanel som beter sig oregelbundet pekar ofta på ett elfel snarare än en mekanisk komponent.',
    adviceDetail: 'Felsökning av kablage, säkringar och styrenheter. Tidsåtgången varierar med felets omfattning.',
  },
] as const

const guidance = [
  { title: 'Tidsåtgång för en diagnostik', value: '1–2 tim', text: 'En standarddiagnostik med felkodsläsning och grundläggande kontroll tar normalt 1–2 timmar. Mer omfattande fel som kräver ytterligare mätning kan ta längre tid.' },
  { title: 'En kod visar bara vilket system som larmar', value: 'Inte exakt del', text: 'En felkod pekar ut vilket system som reagerat, men avgör sällan ensam vilken specifik komponent som är trasig — därför krävs en verklig bedömning, inte bara en avläsning.' },
  { title: 'Bäst att göra innan besiktningen', value: 'Före besiktning', text: 'Att felsöka och åtgärda orsaken till en varningslampa innan besiktningen kan spara en omkörning och en extra avgift om bilen annars hade blivit underkänd.' },
  { title: 'Prisuppgift innan vi går vidare', value: 'Fast offert', text: 'Kostnaden beror på hur omfattande felsökningen blir. Vi lämnar alltid en tydlig prisuppgift innan vi går vidare med reparation.' },
] as const

const serviceItems = [
  'Felkodsläsning via OBD med tolkning av lagrade och pågående koder.',
  'Kontroll av relevanta givare, tryck och spänningar kopplade till felkoden.',
  'Bedömning av om felet kräver ytterligare mätning för att fastställas exakt.',
  'Tydlig genomgång av vad koderna betyder och vad vi rekommenderar.',
  'Fast prisuppgift innan vi går vidare med eventuell reparation.',
  'Dokumentation av resultatet, till nytta inför en kommande besiktning.',
]

const processSteps = [
  { num: '01', icon: PhoneIcon, title: 'Bokning och inlämning', desc: 'Du bokar en tid med oss och lämnar in bilen när det passar.' },
  { num: '02', icon: MonitorIcon, title: 'Initial kontroll', desc: 'Vi gör en första bedömning av bilens skick och servicebehov.' },
  { num: '03', icon: WrenchIcon, title: 'Service enligt checklista', desc: 'Mekanikern följer checklistan för den servicenivå som är aktuell.' },
  { num: '04', icon: ShieldIcon, title: 'Godkännande vid extraarbete', desc: 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.' },
  { num: '05', icon: CheckIcon, title: 'Slutkontroll och rapport', desc: 'När bilen är klar får du en genomgång och råd inför nästa service.' },
] as const

const faqs = [
  { question: 'Vad betyder det att motorlampan lyser?', answer: 'Det betyder att bilens styrsystem har upptäckt en avvikelse och sparat en felkod i felminnet. Koden visar vilket system som larmar, men avgör inte ensam vilken del som är trasig — därför läser vi av koden och gör en bedömning utifrån den.' },
  { question: 'Hur lång tid tar en felsökning?', answer: 'En vanlig felkodsläsning med grundläggande kontroll tar normalt 1–2 timmar. Mer komplicerade fel som kräver ytterligare mätning kan ta längre tid.' },
  { question: 'Behöver jag veta vad problemet är innan jag bokar?', answer: 'Nej. Berätta gärna vad du har märkt — ljud, lampor eller beteende — men du behöver inte kunna peka ut orsaken själv. Det är det vi hjälper till med.' },
  { question: 'Bör jag felsöka bilen innan besiktningen?', answer: 'Ja, om en varningslampa lyser är det klokt att åtgärda orsaken innan besiktningen. Annars riskerar bilen bli underkänd och kräva en omkörning.' },
  { question: 'Förklarar ni vad felkoderna betyder?', answer: 'Ja, vi går igenom vad koderna innebär i klartext och vad vi rekommenderar innan något repareras.' },
  { question: 'Vad kostar en felsökning?', answer: `Kostnaden beror på hur omfattande felsökningen blir. Ring oss på ${BUSINESS.phone.display} så ger vi en tydlig prisuppgift innan vi sätter igång.` },
]

export default function FelsokningPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recommendation, setRecommendation] = useState('')
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <main className="bilservice">
        {/* Hero */}
        <section className="bb-hero" id="felsokning" aria-labelledby="felsokning-hero-title">
          <div className="bb-hero__media" aria-hidden="true">
            <picture data-image-slot="diagnostics-hero">
              <source srcSet={heroWebp} type="image/webp" />
              <img src={heroJpg} alt="" />
            </picture>
          </div>
          <div className="bb-hero__shade" aria-hidden="true" />
          <PublicHeader onBookingClick={openModal} variant="overlay" />
          <div className="bb-wrap bb-hero__content">
            <div className="bb-hero__copy">
              <p className="bb-eyebrow bb-eyebrow--dark">Elektronik &amp; diagnostik</p>
              <h1 className="bb-h1" id="felsokning-hero-title">
                <span>Felsökning &amp; <span className="bb-accent">Diagnostik</span></span>
                <span>när bilen behöver ett tydligt svar</span>
              </h1>
              <p>
                Lyser en varningslampa eller låter bilen konstigt? Vi läser av felkoder och mäter oss fram till den verkliga orsaken med modern diagnostikutrustning — för alla märken och modeller.
              </p>
              <div className="bb-hero__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal">Boka tid</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                  <PhoneIcon aria-hidden="true" />
                  <span>Ring {BUSINESS.phone.display}</span>
                </a>
              </div>
            </div>
            <div className="bb-hero__bottom">
              <div className="bb-trust-row">
                {trustRow.map(({ icon: Icon, title, text }) => (
                  <div className="bb-trust-row__item" key={title}>
                    <span className="bb-icon-bare"><Icon aria-hidden="true" /></span>
                    <span className="bb-trust-row__text">
                      <b>{title}</b>
                      <small>{text}</small>
                    </span>
                  </div>
                ))}
              </div>
              <GoogleReviewsCard variant="hero-overlay" />
            </div>
          </div>
        </section>

        {/* Vad innebär en felsökning? */}
        <section className="bilservice__section bilservice__section--flow-bottom" aria-labelledby="felsokning-intro-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__split">
              <div>
                <h2 className="bb-h2" id="felsokning-intro-title">Vad innebär en <span className="bb-accent">felsökning</span>?</h2>
                <p className="bb-lead bilservice__lead--split">
                  Moderna bilar styrs av ett nätverk av datorer som ständigt övervakar motor, elsystem och avgasrening. När något avviker sparas en felkod i felminnet och en varningslampa kan tändas. Vi kopplar in diagnostikutrustning, läser av koderna och avgör vad de faktiskt betyder för just din bil — istället för att bara byta delar på måfå.
                </p>
                <div className="bilservice__actions">
                  <button type="button" onClick={openModal} className="bb-btn bb-btn--ember-solid">Boka felsökning</button>
                  <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">Ring {BUSINESS.phone.display}</a>
                </div>
              </div>
              <div className="bilservice__split-media--right">
                <picture data-image-slot="diagnostics-intro" className="bilservice__image-slot--radius-lg bilservice__image-slot--ar-16-9">
                  <source srcSet={introWebp} type="image/webp" />
                  <img src={introJpg} alt="Mekaniker ansluter ett diagnosverktyg och kontrollerar motorrummets elsystem" loading="lazy" />
                </picture>
              </div>
            </div>

            <div className="bilservice__card-grid-3">
              {categories.map(([title, text]) => (
                <article className="bilservice__card--teal" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Känner du igen något av detta? (Symptom selector) */}
        <section className="bilservice__section bilservice__section--aqua" aria-labelledby="felsokning-symptoms-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__intro">
              <h2 className="bb-h2" id="felsokning-symptoms-title">Känner du igen något av detta?</h2>
              <p className="bb-lead">Välj det som stämmer bäst in på din bil, så följer rekommendationen med till bokningsformulärets kommentar.</p>
            </div>
            <div className="bilservice__symptom-grid">
              {symptoms.map(({ question, advice, description, adviceDetail }) => (
                <button
                  type="button"
                  className={`bilservice__symptom-card${recommendation === advice ? ' is-selected' : ''}`}
                  key={question}
                  onClick={() => setRecommendation(advice)}
                  aria-pressed={recommendation === advice}
                >
                  <strong className="bilservice__symptom-question">{question}</strong>
                  <p className="bilservice__symptom-desc">{description}</p>
                  <div className="bilservice__symptom-advice-block">
                    <span className="bilservice__symptom-advice">{advice}</span>
                    <p className="bilservice__symptom-advice-detail">{adviceDetail}</p>
                  </div>
                </button>
              ))}
            </div>
            {recommendation && (
              <div className="bilservice__recommendation" role="status">
                <span className="bb-icon-badge"><CheckIcon aria-hidden="true" /></span>
                <p>Vi föreslår: <strong>{recommendation}</strong>. Det följer med till bokningsformulärets kommentar.</p>
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal">Boka tid</button>
              </div>
            )}
          </div>
        </section>

        {/* Bra att veta om felsökning och pris (Guidance stats) */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="felsokning-guidance-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__intro">
              <h2 className="bb-h2" id="felsokning-guidance-title">Bra att veta om felsökning och pris</h2>
              <p className="bb-lead">Här är branschmässiga riktlinjer kring tidsåtgång och vad en diagnostik faktiskt kan säga dig. Vi kontrollerar alltid vad som gäller för din bil.</p>
            </div>
            <div className="bilservice__stat-grid">
              {guidance.map(({ title, value, text }) => (
                <article className="bilservice__stat-card" key={title}>
                  <span className="bilservice__stat-value">{value}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            {/* DRAFT GUIDANCE: Tidsåtgången 1–2 timmar är ett branschmässigt riktvärde utifrån marknadsjämförelse (bl.a. Sala Bilteknik, Vianor), ej en bekräftad fast Brynäs-policy eller -pris. */}
          </div>
        </section>

        {/* Det här kan vi hjälpa dig med (Service card with checklist) */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="felsokning-service-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__service-card">
              <div className="bilservice__service-media">
                <picture data-image-slot="diagnostics-service">
                  <source srcSet={serviceWebp} type="image/webp" />
                  <img src={serviceJpg} alt="Diagnosverktyg anslutet till bilens OBD-uttag under instrumentpanelen" loading="lazy" />
                </picture>
              </div>
              <div className="bilservice__service-content">
                <div>
                  <h2 className="bb-h2" id="felsokning-service-title">Det här kan vi hjälpa dig med</h2>
                  <p className="bb-lead--dark">Vi läser av bilens styrsystem och går igenom vad felkoderna faktiskt betyder innan något repareras.</p>
                </div>
                <ul className="bilservice__checklist">
                  {serviceItems.map(item => (
                    <li key={item}>
                      <CheckIcon aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Så går det till hos oss (5-step process) */}
        <section className="bilservice__section bilservice__section--dark" aria-labelledby="felsokning-process-title">
          <div className="bb-wrap bilservice__container bilservice__process">
            <div className="bilservice__process-text">
              <h2 className="bilservice__process-heading bb-h2" id="felsokning-process-title">Så går det till<br /><span className="bb-accent">hos oss</span></h2>
              <p className="bb-lead--dark">Att förstå processen gör det enklare att veta vad som händer med bilen och varför en felsökning ibland behöver ta lite tid.</p>
              <a href={BUSINESS.phone.href} className="bb-btn bb-btn--teal"><PhoneIcon aria-hidden="true" /><span>Ring oss: {BUSINESS.phone.display}</span></a>
            </div>
            <ol className="bb-process-grid">
              {processSteps.map((step) => (
                <li key={step.num}>
                  <b>{step.num}</b>
                  <span className="bb-icon-bare"><step.icon aria-hidden="true" /></span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Vanliga frågor om felsökning */}
        <BiltjansterFaq id="felsokning-faq" heading="Vanliga frågor om felsökning" items={faqs} />

        {/* Alltid tydliga besked och ärliga priser */}
        <section aria-labelledby="felsokning-trust-title">
          <div className="bb-wrap bilservice__container bilservice__container--flow">
            <div className="bb-card--trust">
              <span className="bb-icon-badge bb-card--trust__icon"><ShieldHeartIcon aria-hidden="true" /></span>
              <div className="bb-card--trust__text">
                <h3 id="felsokning-trust-title">Alltid tydliga besked och ärliga priser</h3>
                <p className="bb-lead">Hos Brynäs Bilservice bemöts du av mekanikern som arbetar med din bil. Vi lämnar tydliga kostnadsförslag och utför inga reparationer utan ditt medgivande.</p>
              </div>
              <div className="bilservice__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--ember-solid">Boka tid nu</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">Ring: {BUSINESS.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={closeModal} initialComment={recommendation ? `Önskad hjälp: ${recommendation}` : 'Gäller felsökning & diagnostik'} />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
