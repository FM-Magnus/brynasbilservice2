// Parent of the "Bilservice" shared-family template (Felsökning,
// Däckservice and AC-service also mount on ServiceReparationerPage.css):
// clean automotive advertising / ownership confidence, distinct from both
// index.css and the teal-technical ServiceGuideTemplate.css used by the
// Guide family. Styled entirely by ./ServiceReparationerPage.css (class
// prefix .bilservice__) — zero dependency on index.css or its --redesign-*
// tokens; consumes --bb-* tokens only.
// Service photography uses WebP with JPG fallbacks in the measured image slots.
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { GoogleReviewsCard } from '../components/ui/GoogleReviewsCard'
import { useBookingModal } from '../hooks/useBookingModal'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { CarSaleIcon } from '../components/icons/CarSaleIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { BUSINESS } from '../data/business'
import heroJpg from '../assets/images/services/general/service-ready-car-workshop-hero.jpg'
import heroWebp from '../assets/images/services/general/service-ready-car-workshop-hero.webp'
import servicebookJpg from '../assets/images/services/general/servicebook-car-key-counter.jpg'
import servicebookWebp from '../assets/images/services/general/servicebook-car-key-counter.webp'
import safetyJpg from '../assets/images/services/general/service-safety-brake-inspection.jpg'
import safetyWebp from '../assets/images/services/general/service-safety-brake-inspection.webp'
import './ServiceReparationerPage.css'

const trustRow = [
  { icon: ShieldIcon, title: 'Personlig service', text: 'Du och din bil i fokus.' },
  { icon: WrenchIcon, title: 'Erfarna mekaniker', text: 'Mångårig erfarenhet.' },
  { icon: ClockIcon, title: 'Tryggt och enkelt', text: 'Från bokning till färdig bil.' },
] as const

const serviceBenefits = [
  { title: 'Säkerhet', description: 'Fel på bromsar, däck eller elektriska system kan leda till farliga situationer på vägen.' },
  { title: 'Livslängd', description: 'Genom att identifiera och åtgärda problem tidigt kan du undvika dyrare reparationer i framtiden.' },
  { title: 'Prestanda', description: 'En välunderhållen bil ger bättre bränsleekonomi och prestanda.' },
  { title: 'Återförsäljningsvärde', description: 'En bil med en fullständig servicehistorik är ofta mer attraktiv för potentiella köpare.' },
] as const

const serviceLevels = [
  {
    title: 'Bas- eller mindre service',
    description: 'Detta är det mest grundläggande underhållsprogrammet, vanligtvis rekommenderat varje 12:e månad eller varje 10 000 km.',
    items: ['Oljebyte', 'Byte av oljefilter', 'Kontroll av däck och däcktryck', 'Kontroll av vätskenivåer (spolarvätska, kylvätska, bromsvätska)'],
  },
  {
    title: 'Mellanservice',
    description: 'Mellanservice är mer omfattande och inkluderar allt i en bas- eller mindre service, plus:',
    items: ['Byte av luftfilter', 'Byte av bränslefilter', 'Granskning av bromssystem', 'Kontroll av drivremmar och övriga remmar', 'Kontroll av belysning och signaler', 'Inspektion av avgassystemet'],
  },
  {
    title: 'Stor service',
    description: 'En stor service är den mest omfattande och inkluderar följande, utöver de tidigare nämnda punkterna:',
    items: ['Byte av tändstift', 'Kontroll och justering av tändsystem', 'Inspektion av fjädring och stötdämpare', 'Kontroll av växellåda och koppling', 'Kontroll av bilens elektroniska system, inklusive diagnostiska tester'],
  },
] as const

const processSteps = [
  { num: '01', icon: PhoneIcon, title: 'Bokning och inlämning', desc: 'Du bokar en tid med oss och lämnar in bilen när det passar.' },
  { num: '02', icon: GaugeIcon, title: 'Initial kontroll', desc: 'Vi gör en första bedömning av bilens skick och servicebehov.' },
  { num: '03', icon: WrenchIcon, title: 'Service enligt checklista', desc: 'Mekanikern följer checklistan för den servicenivå som är aktuell.' },
  { num: '04', icon: CarSaleIcon, title: 'Godkännande vid extraarbete', desc: 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.' },
  { num: '05', icon: CheckIcon, title: 'Slutkontroll och rapport', desc: 'När bilen är klar får du en genomgång och råd inför nästa service.' },
] as const

function ServiceImage({ id, jpg, webp, alt, className = '' }: { id: string; jpg: string; webp: string; alt: string; className?: string }) {
  return (
    <picture className={`bilservice__image-frame${className ? ` ${className}` : ''}`} data-image-slot={id}>
      <source srcSet={webp} type="image/webp" />
      <img src={jpg} alt={alt} loading="lazy" />
    </picture>
  )
}

export default function ServiceReparationerPage() {
  const { openBooking, bookingModal } = useBookingModal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <main className="bilservice">
        {/* Hero */}
        <section className="bb-hero" id="bilservice" aria-labelledby="bilservice-hero-title">
          <div className="bb-hero__media" aria-hidden="true">
            <picture data-image-slot="bilservice-hero-car">
              <source srcSet={heroWebp} type="image/webp" />
              <img src={heroJpg} alt="" />
            </picture>
          </div>
          <div className="bb-hero__shade" aria-hidden="true" />
          <PublicHeader onBookingClick={openBooking} variant="overlay" />
          <div className="bb-wrap bb-hero__content">
            <div className="bb-hero__copy">
              <p className="bb-eyebrow bb-eyebrow--dark">Din bilverkstad i Brynäs, Gävle</p>
              <h1 className="bb-h1" id="bilservice-hero-title">
                <span>Din bil</span>
                <span className="bb-accent">förtjänar</span>
                <span>det bästa</span>
              </h1>
              <p>
                Brynäs Bilservice är din lokala, oberoende verkstad i Gävle. Vi utför all typ av service och reparation — för alla bilmärken, till konkurrenskraftiga priser.
              </p>
              <div className="bb-hero__actions">
                <button type="button" onClick={openBooking} className="bb-btn bb-btn--teal">Boka tid</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember"><PhoneIcon aria-hidden="true" /><span>Ring oss nu</span></a>
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

        {/* Vad kostar en bilservice? */}
        <section className="bilservice__section bilservice__section--flow-bottom" aria-labelledby="bilservice-price-title">
          <div className="bb-wrap bilservice__container bilservice__split">
            <div className="bilservice__prose">
              <h2 className="bb-h2" id="bilservice-price-title">Vad kostar en <span className="bb-accent">bilservice</span>?</h2>
              <p>Priset beror på bilmodell, ålder och vilken nivå av service som behövs – som fristående verkstad ligger vi normalt under vad en märkesverkstad tar för motsvarande arbete. Ring oss så får du ett tydligt pris innan vi sätter igång, inga överraskningar på slutfakturan.</p>
              <p>Be om ett kostnadsförslag som visar vad som ingår: arbete, delar och vätskor, och vad som ligger utanför. Är priset en ungefärlig uppgift får slutpriset enligt konsumentreglerna inte bli mer än 15 procent högre, och hittar verkstaden något mer som behöver åtgärdas ska du kontaktas innan det arbetet görs.</p>
              <div className="bilservice__actions">
                <button type="button" onClick={openBooking} className="bb-btn bb-btn--ember-solid">Boka tid för bilservice</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">Ring {BUSINESS.phone.display}</a>
              </div>
            </div>
            <ServiceImage id="bilservice-servicebook-keys" jpg={servicebookJpg} webp={servicebookWebp} alt="Öppen servicebok och bilnyckel på en verkstadsbänk" className="bilservice__split-media--right bilservice__image-frame--wide" />
          </div>
        </section>

        {/* Varför är bilservice viktigt? */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="bilservice-why-title">
          <div className="bb-wrap bilservice__container bilservice__split">
            <ServiceImage id="bilservice-value-säkerhet" jpg={safetyJpg} webp={safetyWebp} alt="Mekaniker kontrollerar bromsskiva och däck med inspektionslampa" className="bilservice__image-frame--wide" />
            <div className="bilservice__prose">
              <h2 className="bb-h2" id="bilservice-why-title">Varför är bilservice viktigt?</h2>
              <p>Regelbunden service påverkar hur säker bilen är, hur länge den håller, hur den går och vad den är värd den dag du säljer den.</p>
              {serviceBenefits.map((benefit) => (
                <p key={benefit.title}><strong>{benefit.title}.</strong> {benefit.description}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Vilken service behöver din bil? */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="bilservice-levels-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__intro">
              <h2 className="bb-h2" id="bilservice-levels-title">Vilken service behöver din bil?</h2>
              <p className="bb-lead">Exakt vad som ingår styrs av tillverkarens rekommenderade intervall för just din bilmodell, men de flesta verkstäder – oss inkluderade – delar in service i tre nivåer.</p>
              <p className="bb-lead bilservice__lead--intro">Det är bilens serviceprogram som avgör vad som ska göras och när. Tillverkaren anger intervall i både tid och körsträcka, och det som inträffar först gäller; intervallen kan skilja mellan modeller och drivlinor. Nivåerna nedan är en översikt över vanliga moment, inte en ersättning för din bils serviceplan. Ta gärna med serviceboken eller uppge registreringsnumret när du bokar.</p>
            </div>
            <div className="bilservice__levels-grid">
              {serviceLevels.map((level, index) => (
                <article className={`bilservice__level-card bilservice__level-card--0${index + 1}`} key={level.title}>
                  <span className="bilservice__level-badge" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{level.title}</h3>
                  <p>{level.description}</p>
                  <div className="bilservice__level-divider" aria-hidden="true" />
                  <ul>
                    {level.items.map((item) => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Mer än bara service */}
        <section className="bilservice__section--aqua" aria-labelledby="bilservice-more-title">
          <div className="bb-wrap bilservice__container bilservice__container--pad">
            <div className="bilservice__bridge">
              <h2 className="bb-h2" id="bilservice-more-title">Mer än bara service</h2>
              <p className="bb-lead">
                Utöver ordinarie bilservice hjälper vi dig med det som brukar dyka upp runt omkring – <Link to="/ac-service">AC-service</Link>, <Link to="/felsokning">diagnostik när en varningslampa lyser</Link>, och <Link to="/dackservice">däckhotell</Link> om du vill slippa släpa sommar- och vinterdäck mellan garaget och verkstaden själv. Ska bilen bytas ut istället för att servas? Vi hjälper även till med <Link to="/bilar-till-salu">försäljning av begagnade bilar</Link> och <Link to="/bargning">transport av fordon</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Så går det till hos oss */}
        <section className="bilservice__section bilservice__section--dark" aria-labelledby="bilservice-process-title">
          <div className="bb-wrap bilservice__container bilservice__process">
            <div className="bilservice__process-text">
              <h2 className="bilservice__process-heading bb-h2" id="bilservice-process-title">Så går det till<br /><span className="bb-accent">hos oss</span></h2>
              <p className="bb-lead--dark">Att förstå processen gör det enklare att veta vad som händer med bilen och varför en service ibland behöver ta lite tid.</p>
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

        {/* Letar du efter en begagnad bil? */}
        <section aria-labelledby="bilservice-cars-title">
          <div className="bb-wrap bilservice__container bilservice__container--pad-sm">
            <div className="bb-promo-card">
              <div className="bb-promo-card__copy">
                <p className="bb-eyebrow bb-eyebrow--dark">Kvalitetskontrollerade fordon</p>
                <h3 id="bilservice-cars-title">Letar du efter en begagnad bil?</h3>
              </div>
              <Link to="/bilar-till-salu" className="bb-btn bb-btn--teal"><span>Se bilar till salu</span><ArrowRightIcon aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        {/* Alltid tydliga besked och ärliga priser */}
        <section aria-labelledby="bilservice-trust-title">
          <div className="bb-wrap bilservice__container bilservice__container--flow">
            <div className="bb-card--trust">
              <span className="bb-icon-badge bb-card--trust__icon"><ShieldHeartIcon aria-hidden="true" /></span>
              <div className="bb-card--trust__text">
                <h3 id="bilservice-trust-title">Alltid tydliga besked och ärliga priser</h3>
                <p className="bb-lead">Hos Brynäs Bilservice bemöts du av mekanikern som arbetar med din bil. Vi lämnar tydliga kostnadsförslag och utför inga reparationer utan ditt medgivande.</p>
              </div>
              <div className="bilservice__actions">
                <button type="button" onClick={openBooking} className="bb-btn bb-btn--ember-solid">Boka tid nu</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">Ring: {BUSINESS.phone.display}</a>
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
