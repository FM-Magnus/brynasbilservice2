// Sibling 3 of 3 of the "Bilservice" shared-family template (Bilservice,
// Felsökning, Däckservice and AC-service all mount on ServiceReparationerPage.css):
// clean automotive advertising / ownership confidence, distinct from both
// index.css and the teal-technical ServiceGuideTemplate.css used by the
// Guide family. Styled entirely by ./ServiceReparationerPage.css (class
// prefix .bilservice__) — zero dependency on index.css or its --redesign-*
// tokens; consumes --bb-* tokens only.
import { useState, useEffect } from 'react'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { useBookingModal } from '../hooks/useBookingModal'
import { Tip } from '../components/ui/Tip'
import { GoogleReviewsCard } from '../components/ui/GoogleReviewsCard'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import heroBgJpg from '../assets/images/services/ac/ac-hero-bg.jpg'
import heroBgWebp from '../assets/images/services/ac/ac-hero-bg.webp'
import manometersJpg from '../assets/images/services/ac/ac-manometers-on-engine.jpg'
import { BUSINESS } from '../data/business'
import './ServiceReparationerPage.css'

const symptoms = [
  {
    question: 'Dålig kyla eller imma på rutorna?',
    advice: 'AC-service',
    description: 'Kan bero på för lite köldmedium – vilket i ett slutet system oftast betyder ett läckage – men också på en igensatt kondensor eller en fläkt som inte går som den ska.',
  },
  {
    question: 'Unken lukt ur fläktutblåsen?',
    advice: 'AC-rengöring och kontroll av kupéfilter',
    description: 'Beror på fukt och beläggningar i förångaren – det är därför separat AC-rengöring behövs för att få bort lukten.',
  },
  {
    question: 'Missljud när AC:n slås på?',
    advice: 'Felsökning',
    description: 'Kan orsakas av slitna lager, en kompressorkoppling som kärvar eller felaktigt tryck i systemet.',
  },
] as const

const tips = [
  { title: 'R134a eller R1234yf?', text: 'Köldmediet står på en märkning i motorrummet. Bilar äldre än cirka 2017 har oftast R134a, nyare har vanligen R1234yf — vi kontrollerar alltid vilket som gäller för din bil.' },
  { title: 'Hur ofta bör AC:n servas?', text: 'Det beror på bilen och hur den används. Utgå från tillverkarens serviceprogram och låt kontrollera systemet när kylan blir sämre, rutorna immar igen lättare eller det luktar från utblåsen.' },
  { title: 'Kyla, lukt och läckage är olika fel', text: 'Sämre kyla kan bero på för lite köldmedium, men också på kondensorn, fläkten eller kompressorn. Unken lukt kommer oftast från fukt och beläggningar i förångaren och har inget med köldmediemängden att göra. Ett läckage betyder att köldmedium försvinner ur ett system som ska vara slutet. Då behöver läckan hittas och åtgärdas; en ny påfyllning ersätter bara det som redan har försvunnit.' },
  { title: 'Kör AC:n även på vintern', text: 'Att köra AC:n en stund varje månad, även när det är kallt, håller kompressorn smord och packningarna täta — annars torkar de och risken för läckage ökar.' },
] as const

const processSteps = [
  { num: '01', icon: WrenchIcon, title: 'Provtryckning & visuell inspektion', desc: 'Vi kontrollerar anläggningen okulärt och trycktestar för att upptäcka eventuella läckor innan fyllning.' },
  { num: '02', icon: ClockIcon, title: 'Vakuumsugning & täthetstest', desc: 'Systemet töms och vakuumsugs för att avlägsna all fukt och säkerställa att systemet är helt tätt.' },
  { num: '03', icon: ShieldIcon, title: 'Fyllning enligt fordonsspecifikation', desc: 'Rätt mängd köldmedium och kompressorolja (PAG) fylls på enligt tillverkarens föreskrivna värden.' },
  { num: '04', icon: CheckIcon, title: 'Prestandamätning i kupéutblås', desc: 'Vi mäter temperaturen vid utblåsen och kontrollerar att klimatanläggningen ger optimal kyleffekt.' },
] as const

const faqs = [
  { question: 'Vad händer om systemet läcker?', answer: 'En identifierad läcka behöver undersökas och repareras innan köldmedium fylls på. Vi lämnar alltid ett prisförslag innan ytterligare arbete utförs.' },
  { question: 'Hur vet jag vilken gas min bil har?', answer: 'Köldmediet står normalt på en märkning i motorrummet. R1234yf är vanligt i nyare bilar.' },
  { question: 'Hur lång tid tar servicen?', answer: 'En AC-service tar normalt cirka 45–60 minuter. Du kan vanligtvis vänta på plats.' },
  { question: 'Vad är skillnaden mellan AC-service och AC-reparation?', answer: 'AC-service är en proaktiv kontroll och påfyllning som görs innan problem uppstår. AC-reparation är när en specifik del, till exempel kompressor eller kondensor, behöver bytas efter ett fel. Vi berättar alltid vilket som gäller för din bil innan vi går vidare.' },
  { question: 'Behåller jag min nybilsgaranti om jag servar AC:n hos er?', answer: 'Ja. Vi utför servicen enligt tillverkarens föreskrivna intervall och metoder, så nybilsgarantin påverkas inte.' },
]

export default function AcServicePage() {
  const [recommendation, setRecommendation] = useState('')
  const { openBooking, openBookingWith, bookingModal } = useBookingModal(
    recommendation ? `Önskad hjälp: ${recommendation}` : 'Gäller AC-service & klimatrengöring',
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <main className="bilservice">
        <section className="bb-hero bilservice__ac-hero" id="ac-service" aria-labelledby="ac-service-title">
          <div className="bb-hero__media" aria-hidden="true">
            <picture data-image-slot="ac-hero-bg">
              <source srcSet={heroBgWebp} type="image/webp" />
              <img src={heroBgJpg} alt="" />
            </picture>
          </div>
          <div className="bb-hero__shade" aria-hidden="true" />
          <PublicHeader onBookingClick={openBooking} variant="overlay" />
          <div className="bb-wrap bb-hero__content">
            <div className="bb-hero__copy bilservice__ac-intro-copy">
              <p className="bb-eyebrow bb-eyebrow--dark">AC &amp; klimatanläggning</p>
              <h1 className="bb-h1 bilservice__ac-title" id="ac-service-title">
                <span>AC-service &amp;</span>
                <span className="bb-accent">Klimat{'\u00AD'}rengöring</span>
                <span>i Gävle</span>
              </h1>
              <p className="bilservice__ac-lead">
                En välfungerande AC ger behaglig kupétemperatur, hjälper rutorna att hålla sig klara under höst och vinter och är värd att underhålla innan problemen kommer. Ett system med för lite köldmedium smörjs sämre, och att köra vidare så kan i värsta fall leda till en betydligt dyrare kompressorreparation.
              </p>
              <div className="bb-hero__actions">
                <button type="button" onClick={openBooking} className="bb-btn bb-btn--teal">
                  Boka tid
                </button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                  <PhoneIcon aria-hidden="true" />
                  <span>Ring oss nu</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Varför boka AC-service hos oss? */}
        <section className="bilservice__section bilservice__section--flow-bottom" aria-labelledby="ac-value-title">
          <div className="bb-wrap bilservice__container bilservice__editorial">
            <div className="bilservice__editorial-head">
              <p className="bb-eyebrow">Varför välja oss</p>
              <h2 className="bb-h2" id="ac-value-title">Varför boka <span className="bilservice__nowrap">AC-service</span> hos oss?</h2>
            </div>
            <div className="bilservice__prose">
              <p>Du vet priset innan vi sätter igång, så det blir inga överraskningar på fakturan. Vi följer tillverkarens föreskrifter, vilket betyder att nybilsgarantin inte påverkas av att vi utför servicen.</p>
              <p>Och vi är din lokala verkstad: vi finns på Utmarksvägen i Gävle och känner våra kunder och deras bilar.</p>
              <div className="bilservice__actions">
                <button type="button" onClick={openBooking} className="bb-btn bb-btn--ember-solid">Boka AC-service</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember"><PhoneIcon aria-hidden="true" /><span>Ring {BUSINESS.phone.display}</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* Känner du igen något av detta? (Interactive Symptom Selector) */}
        <section className="bilservice__section bilservice__section--aqua" aria-labelledby="ac-symptoms-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__intro">
              <p className="bb-eyebrow">Hitta rätt hjälp</p>
              <h2 className="bb-h2" id="ac-symptoms-title">Känner du igen något av detta?</h2>
              <p className="bilservice__note">
                Klicka på ett symptom för att få vår rekommendation på rätt åtgärd inför din bokning.
              </p>
            </div>
            <div className="bilservice__symptom-grid bilservice__symptom-grid--auto">
              {symptoms.map(({ question, advice, description }) => {
                const isSelected = recommendation === advice
                return (
                  <button
                    type="button"
                    className={`bilservice__symptom-card ${isSelected ? 'is-selected' : ''}`}
                    key={question}
                    onClick={() => setRecommendation(isSelected ? '' : advice)}
                    aria-pressed={isSelected}
                  >
                    <span className="bilservice__symptom-question">{question}</span>
                    <span className="bilservice__symptom-desc">{description}</span>
                    <span className="bilservice__symptom-advice-block">
                      <span className="bilservice__symptom-advice">
                        {isSelected ? `Rekommendation: ${advice}` : 'Välj för rekommendation'}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
            {recommendation && (
              <div className="bilservice__recommendation" role="status">
                <p>
                  Vi föreslår: <strong>{recommendation}</strong>. Det följer med till bokningsformulärets kommentar.
                </p>
                <button
                  type="button"
                  className="bb-btn bb-btn--ember-solid"
                  onClick={openBooking}
                >
                  Boka rekommenderad åtgärd
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Tydliga priser / Service för renare och svalare kupé */}
        <section className="bilservice__section bilservice__section--flow-bottom" aria-labelledby="ac-prices-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__intro bilservice__intro--wide-sm">
              <p className="bb-eyebrow">Tydliga priser</p>
              <h2 className="bb-h2" id="ac-prices-title">Service för renare och svalare kupé</h2>
              <p className="bb-lead bilservice__lead--intro-tight">
                Hur ofta AC:n behöver servas beror på bilen och på hur systemet fungerar. Märker du sämre kyla, imma eller lukt är det ett skäl att låta kontrollera det.
              </p>
              <small>
                Samtliga priser är inklusive moms.
              </small>
            </div>

            <div className="bilservice__price-grid">
              <article className="bilservice__price-card">
                <h3>AC-service</h3>
                <p className="bilservice__price-amount">1 495 kr</p>
                <ul className="bilservice__price-list">
                  {['Tömning', 'Vakuumsugning för fuktborttagning', 'Läckagekontroll/vakuumtest', 'Påfyllning av R134a-köldmedium', 'Kompressorolja, PAG', 'Prestandatest med utblåstemperatur'].map((item) => (
                    <li key={item}>
                      <CheckIcon aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openBookingWith('Gäller AC-service (1 495 kr)')}
                  className="bb-btn bb-btn--teal bilservice__price-cta"
                >
                  Boka tid
                </button>
              </article>

              <article className="bilservice__price-card">
                <h3>AC-rengöring</h3>
                <p className="bilservice__price-amount">
                  800 kr <small>arbetskostnad</small>
                </p>
                <ul className="bilservice__price-list">
                  {['Antibakteriell rengöring av luftkanaler/förångare', 'Arbete för byte av kupéfilter'].map((item) => (
                    <li key={item}>
                      <CheckIcon aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="bilservice__price-note">
                  OBS! Materialkostnad för kupéfilter tillkommer och varierar per bilmodell.
                </p>
                <button
                  type="button"
                  onClick={() => openBookingWith('Gäller AC-rengöring (800 kr arbetskostnad)')}
                  className="bb-btn bb-btn--teal bilservice__price-cta"
                >
                  Boka tid
                </button>
              </article>

              <article className="bilservice__price-card">
                <h3>OBD-diagnostik &amp; felsökning</h3>
                <p className="bilservice__price-amount">500 kr</p>
                <ul className="bilservice__price-list">
                  {['Avläsning av felkoder', 'Kontroll av relevanta tryckgivare vid elfel eller utebliven funktion'].map((item) => (
                    <li key={item}>
                      <CheckIcon aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openBookingWith('Gäller OBD-diagnostik & felsökning för AC (500 kr)')}
                  className="bb-btn bb-btn--teal bilservice__price-cta"
                >
                  Boka tid
                </button>
              </article>
            </div>

            <Tip
              title="Service eller reparation?"
              text="En AC-service är en proaktiv kontroll och påfyllning. Misstänker du istället en läcka, en trasig kompressor eller ett annat fel är det en AC-reparation — då gör vi alltid en felsökning och lämnar ett prisförslag innan vi går vidare."
            />

            {/* FACT TO CONFIRM: Om Brynäs har utrustning för båda köldmedietyperna (R134a och R1234yf) – den befintliga texten hänvisar redan till kontakt för R1234yf. */}
            <p className="bilservice__refrigerant-note">
              Priset 1 495 kr gäller bilar med köldmedium R134a. För nyare bilar med R1234yf, vanligt efter cirka 2017, kontakta oss för prisuppgift.
            </p>
          </div>
        </section>

        {/* Så går det till (4-step process) */}
        <section className="bilservice__section bilservice__section--dark" aria-labelledby="ac-process-title">
          <div className="bb-wrap bilservice__container bilservice__process">
            <div className="bilservice__process-text">
              <p className="bb-eyebrow bb-eyebrow--dark">Så går det till</p>
              <h2 className="bilservice__process-heading bb-h2" id="ac-process-title">
                Från kontroll till <span className="bb-accent">komfort</span>
              </h2>
              <p className="bb-lead--dark">
                Vi följer en noggrann process så att du vet att ditt AC-system fungerar tryggt och effektivt.
              </p>
              <a href={BUSINESS.phone.href} className="bb-btn bb-btn--teal">
                <PhoneIcon aria-hidden="true" />
                <span>Ring oss: {BUSINESS.phone.display}</span>
              </a>
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

        {/* Reassurance / Split Card */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="ac-trust-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__service-card">
              <div className="bilservice__service-media">
                <img
                  src={manometersJpg}
                  alt="Manometerställ kopplat till bilens AC-system för tryck- och läckagekontroll"
                  loading="lazy"
                />
              </div>
              <div className="bilservice__service-content">
                <div>
                  <p className="bb-eyebrow bb-eyebrow--dark">Fackmässigt arbete</p>
                  <h2 className="bb-h2" id="ac-trust-title">
                    Omsorg om systemet och bilen
                  </h2>
                  <p className="bb-lead--dark">
                    Vi hanterar AC-system och köldmedier professionellt och går igenom vad vi hittar innan mer arbete påbörjas. Precis som vid övrig service följer vi tillverkarens föreskrifter så att nybilsgarantin kan behållas.
                  </p>
                </div>
                <ul className="bilservice__checklist">
                  {[
                    'Certifierad kylkompetens',
                    'Täthetskontroll före påfyllning',
                    'Rätt olja och köldmedium enligt specifikation',
                    'Bibehållen nybilsgaranti',
                    'Tydlig prisuppgift innan extra arbete',
                  ].map((item) => (
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

        {/* Så håller du koll på AC:n mellan servicarna (Tips) */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="ac-tips-title">
          <div className="bb-wrap bilservice__container bilservice__editorial">
            <div className="bilservice__editorial-head">
              <p className="bb-eyebrow">Bra att veta</p>
              <h2 className="bb-h2" id="ac-tips-title">
                Så håller du koll på <span className="bb-accent">AC:n</span> mellan servicarna
              </h2>
            </div>
            <div className="bilservice__prose">
              {tips.map(({ title, text }) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vad våra kunder säger (Google reviews) */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="ac-reviews-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__intro bilservice__intro--tight">
              <p className="bb-eyebrow">Kundomdömen</p>
              <h2 className="bb-h2" id="ac-reviews-title">Vad våra kunder säger</h2>
            </div>
            <GoogleReviewsCard variant="card" />
          </div>
        </section>

        {/* Vanliga frågor om AC-service */}
        <BiltjansterFaq id="ac-service-faq" heading="Bra att veta om AC-service" items={faqs} />

        {/* Closing Reassurance Card */}
        <section aria-labelledby="ac-closing-title">
          <div className="bb-wrap bilservice__container bilservice__container--flow">
            <div className="bb-card--trust">
              <span className="bb-icon-badge bb-card--trust__icon"><ShieldHeartIcon aria-hidden="true" /></span>
              <div className="bb-card--trust__text">
                <h3 id="ac-closing-title">Boka AC-service hos Brynäs Bilservice</h3>
                <p className="bb-lead">
                  {recommendation
                    ? 'Ditt önskemål följer automatiskt med till kommentarsfältet i bokningsformuläret.'
                    : 'Välj datum, tid och tjänst i vårt smidiga bokningsformulär.'}
                </p>
              </div>
              <div className="bilservice__actions">
                <button type="button" onClick={openBooking} className="bb-btn bb-btn--ember-solid">
                  Öppna bokning
                </button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                  Ring: {BUSINESS.phone.display}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
