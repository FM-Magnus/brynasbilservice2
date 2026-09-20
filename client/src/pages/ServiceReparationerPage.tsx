// Parent of the "Bilservice" shared-family template (Felsökning,
// Däckservice and AC-service also mount on ServiceReparationerPage.css):
// clean automotive advertising / ownership confidence, distinct from both
// index.css and the teal-technical ServiceGuideTemplate.css used by the
// Guide family. Styled entirely by ./ServiceReparationerPage.css (class
// prefix .bilservice__) — zero dependency on index.css or its --redesign-*
// tokens; consumes --bb-* tokens only.
// Real photography is not supplied yet; every image position below is an
// intentional, clearly-labelled placeholder (data-image-slot) sized to the
// final photo's geometry so it can be dropped in later with no layout change.
import { useState, useEffect } from 'react'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { BoltIcon } from '../components/icons/BoltIcon'
import { DollarIcon } from '../components/icons/DollarIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { CarSaleIcon } from '../components/icons/CarSaleIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { BUSINESS } from '../data/business'
import './ServiceReparationerPage.css'

const trustRow = [
  { icon: ShieldIcon, title: 'Personlig service', text: 'Du och din bil i fokus.' },
  { icon: WrenchIcon, title: 'Erfarna mekaniker', text: 'Mångårig erfarenhet.' },
  { icon: ClockIcon, title: 'Tryggt och enkelt', text: 'Från bokning till färdig bil.' },
] as const

const serviceBenefits = [
  { title: 'Säkerhet', description: 'Fel på bromsar, däck eller elektriska system kan leda till farliga situationer på vägen.', icon: ShieldIcon },
  { title: 'Livslängd', description: 'Genom att identifiera och åtgärda problem tidigt kan du undvika dyrare reparationer i framtiden.', icon: ClockIcon },
  { title: 'Prestation', description: 'En välunderhållen bil ger bättre bränsleekonomi och prestanda.', icon: BoltIcon },
  { title: 'Återförsäljningsvärde', description: 'En bil med en fullständig servicehistorik är ofta mer attraktiv för potentiella köpare.', icon: DollarIcon },
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

function ImageSlot({ id, label, tone = 'light', className = '' }: { id: string; label: string; tone?: 'light' | 'dark'; className?: string }) {
  return (
    <div
      className={`bilservice__image-slot${tone === 'dark' ? ' bilservice__image-slot--dark' : ''}${className ? ` ${className}` : ''}`}
      data-image-slot={id}
      role="img"
      aria-label={`Platshållare för bild: ${label}`}
    >
      <span>{label}</span>
    </div>
  )
}

export default function ServiceReparationerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <main className="bilservice">
        {/* Hero */}
        <section className="bb-hero" id="bilservice" aria-labelledby="bilservice-hero-title">
          <div className="bb-hero__media" aria-hidden="true">
            <ImageSlot id="bilservice-hero-car" label="Bild — Bilservice hero, färdig bil" tone="dark" className="bilservice__hero-slot" />
          </div>
          <div className="bb-hero__shade" aria-hidden="true" />
          <PublicHeader onBookingClick={openModal} variant="overlay" />
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
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal">Boka tid</button>
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
            </div>
          </div>
        </section>

        {/* Vad kostar en bilservice? */}
        <section className="bilservice__section bilservice__section--flow-bottom" aria-labelledby="bilservice-price-title">
          <div className="bb-wrap bilservice__container bilservice__split">
            <div>
              <h2 className="bilservice__price-heading bb-h2" id="bilservice-price-title">Vad kostar en <span className="bb-accent">bilservice</span>?</h2>
              <p className="bilservice__price-text bb-lead">Priset beror på bilmodell, ålder och vilken nivå av service som behövs – som fristående verkstad ligger vi normalt under vad en märkesverkstad tar för motsvarande arbete. Ring oss så får du ett tydligt pris innan vi sätter igång, inga överraskningar på slutfakturan.</p>
              <div className="bilservice__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--ember-solid">Boka tid för bilservice</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">Ring {BUSINESS.phone.display}</a>
              </div>
            </div>
            <ImageSlot id="bilservice-servicebook-keys" label="Bild — Servicebok och bilnyckel" className="bilservice__split-media--right bilservice__image-slot--ar-16-9 bilservice__image-slot--radius-lg" />
          </div>
        </section>

        {/* Varför är bilservice viktigt? */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="bilservice-why-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__intro">
              <h2 className="bb-h2" id="bilservice-why-title">Varför är bilservice viktigt?</h2>
              <p className="bb-lead">Ett regelbundet serviceprogram är avgörande för flera skäl.</p>
            </div>
            <div className="bilservice__value-grid">
              {serviceBenefits.map((benefit) => (
                <article className="bilservice__value-card" key={benefit.title}>
                  <ImageSlot id={`bilservice-value-${benefit.title.toLowerCase()}`} label={`Bild — ${benefit.title}`} className="bilservice__image-slot--ar-4-3" />
                  <div className="bilservice__value-body">
                    <span className="bb-icon-badge"><benefit.icon aria-hidden="true" /></span>
                    <h3>{benefit.title}</h3>
                    <p className="bb-lead--dark">{benefit.description}</p>
                  </div>
                </article>
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
                Utöver ordinarie bilservice hjälper vi dig med det som brukar dyka upp runt omkring – <a href="/ac-service">AC-service</a>, <a href="/biltjanster#felsokning-diagnostik">diagnostik när en varningslampa lyser</a>, och <a href="/dackservice">däckhotell</a> om du vill slippa släpa sommar- och vinterdäck mellan garaget och verkstaden själv. Ska bilen bytas ut istället för att servas? Vi hjälper även till med <a href="/bilar-till-salu">försäljning av begagnade bilar</a> och <a href="/bargning">transport av fordon</a>.
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
              <a href="/bilar-till-salu" className="bb-btn bb-btn--teal"><span>Se bilar till salu</span><ArrowRightIcon aria-hidden="true" /></a>
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
                <button type="button" onClick={openModal} className="bb-btn bb-btn--ember-solid">Boka tid nu</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">Ring: {BUSINESS.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={closeModal} />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
