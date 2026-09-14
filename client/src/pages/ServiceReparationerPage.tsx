import { useState, useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

const processSteps = [
  {
    num: '01',
    title: 'Bokning och inlämning',
    desc: 'Du bokar en tid med oss och lämnar in bilen när det passar.'
  },
  {
    num: '02',
    title: 'Initial kontroll',
    desc: 'Vi gör en första bedömning av bilens skick och servicebehov.'
  },
  {
    num: '03',
    title: 'Service enligt checklista',
    desc: 'Mekanikern följer checklistan för den servicenivå som är aktuell.'
  },
  {
    num: '04',
    title: 'Godkännande vid extraarbete',
    desc: 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.'
  },
  {
    num: '05',
    title: 'Slutkontroll och rapport',
    desc: 'När bilen är klar får du en genomgång och råd inför nästa service.'
  }
]

const serviceBenefits = [
  {
    title: 'Säkerhet',
    description: 'Fel på bromsar, däck eller elektriska system kan leda till farliga situationer på vägen.'
  },
  {
    title: 'Livslängd',
    description: 'Genom att identifiera och åtgärda problem tidigt kan du undvika dyrare reparationer i framtiden.'
  },
  {
    title: 'Prestation',
    description: 'En välunderhållen bil ger bättre bränsleekonomi och prestanda.'
  },
  {
    title: 'Återförsäljningsvärde',
    description: 'En bil med en fullständig servicehistorik är ofta mer attraktiv för potentiella köpare.'
  }
]

const serviceLevels = [
  {
    title: 'Bas- eller mindre service',
    description: 'Detta är det mest grundläggande underhållsprogrammet, vanligtvis rekommenderat varje 12:e månad eller varje 10 000 km.',
    items: [
      'Oljebyte',
      'Byte av oljefilter',
      'Kontroll av däck och däcktryck',
      'Kontroll av vätskenivåer (spolarvätska, kylvätska, bromsvätska)'
    ]
  },
  {
    title: 'Mellanservice',
    description: 'Mellanservice är mer omfattande och inkluderar allt i en bas- eller mindre service, plus:',
    items: [
      'Byte av luftfilter',
      'Byte av bränslefilter',
      'Granskning av bromssystem',
      'Kontroll av drivremmar och övriga remmar',
      'Kontroll av belysning och signaler',
      'Inspektion av avgassystemet'
    ]
  },
  {
    title: 'Stor service',
    description: 'En stor service är den mest omfattande och inkluderar följande, utöver de tidigare nämnda punkterna:',
    items: [
      'Byte av tändstift',
      'Kontroll och justering av tändsystem',
      'Inspektion av fjädring och stötdämpare',
      'Kontroll av växellåda och koppling',
      'Kontroll av bilens elektroniska system, inklusive diagnostiska tester'
    ]
  }
]

export default function ServiceReparationerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header onBookingClick={openModal} />

      <main className="services-page">
        {/* Hero Section */}
        <section className="services-page__hero" id="bilservice" aria-labelledby="services-hero-title">
          <div className="container">
            <div className="services-page__hero-layout">
              <div className="services-page__hero-content">
                <h1 className="services-page__title" id="services-hero-title">
                  Bilservice – allt du behöver <span className="title-accent">veta innan du bokar</span>
                </h1>
                <p className="services-page__lead">
                  Bilservice är en serie rutinmässiga underhållsåtgärder som syftar till att förbättra bilens livslängd, funktion och säkerhet. Det handlar inte bara om att byta olja och kontrollera däcktryck; en fullständig service kan inkludera allt från bromsinspektioner till kontroll av elektroniska system.
                </p>
                <div className="services-page__hero-actions">
                  <button
                    type="button"
                    onClick={openModal}
                    className="services-page__btn services-page__btn--primary"
                  >
                    Boka tid
                  </button>
                  <a
                    href="tel:0705533395"
                    className="services-page__btn services-page__btn--outline"
                  >
                    <PhoneIcon className="services-page__btn-icon" />
                    <span>Ring 070-553 33 95</span>
                  </a>
                </div>
              </div>
              <div className="services-page__image-placeholder" role="img" aria-label="Platshållare för framtida bild från bilservice i verkstaden">
                <WrenchIcon aria-hidden="true" />
                <span>Bilservice i verkstaden</span>
                <small>Bild kommer</small>
              </div>
            </div>
          </div>
        </section>

        <section className="services-page__guide" aria-labelledby="service-guide-title">
          <div className="container">
            <div className="services-page__guide-intro">
              <h2 id="service-guide-title">Varför är bilservice viktigt?</h2>
              <p>Ett regelbundet serviceprogram är avgörande för flera skäl.</p>
            </div>

            <div className="services-page__benefit-grid">
              {serviceBenefits.map((benefit) => (
                <article className="services-page__benefit-card" key={benefit.title}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>

            <div className="services-page__guide-intro services-page__guide-intro--levels">
              <h2>Vilken service behöver din bil?</h2>
              <p>Exakt vad som ingår styrs av tillverkarens rekommenderade intervall för just din bilmodell, men de flesta verkstäder – oss inkluderade – delar in service i tre nivåer.</p>
            </div>

            <div className="services-page__level-grid">
              {serviceLevels.map((level, index) => (
                <article className="services-page__level-card" key={level.title}>
                  <span className="services-page__level-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{level.title}</h3>
                  <p>{level.description}</p>
                  <ul>
                    {level.items.map((item) => (
                      <li key={item}>
                        <CheckIcon aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="services-page__more-card">
              <div>
                <h2>Mer än bara service</h2>
                <p>
                  Utöver ordinarie bilservice hjälper vi dig med det som brukar dyka upp runt omkring – <a href="/ac-service">AC-service</a>, <a href="/biltjanster#felsokning-diagnostik">diagnostik när en varningslampa lyser</a>, och <a href="/dackservice">däckhotell</a> om du vill slippa släpa sommar- och vinterdäck mellan garaget och verkstaden själv. Ska bilen bytas ut istället för att servas? Vi hjälper även till med <a href="/bilar-till-salu">försäljning av begagnade bilar</a> och <a href="/bargning">transport av fordon</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="services-page__process-section" aria-labelledby="services-process-title">
          <div className="container">
            <div className="services-page__process-card">
              <div className="services-page__process-inner">
                <div className="services-page__process-text">
                  <h2 className="services-page__process-heading" id="services-process-title">
                    Så går det till <br />
                    <span className="title-accent">hos oss</span>
                  </h2>
                  <p className="services-page__process-desc">
                    Att förstå processen gör det enklare att veta vad som händer med bilen och varför en service ibland behöver ta lite tid.
                  </p>
                  <div className="services-page__process-action">
                    <a href="tel:0705533395" className="services-page__process-cta">
                      <PhoneIcon className="services-page__process-icon" />
                      <span>Ring oss: 070-553 33 95</span>
                    </a>
                  </div>
                </div>

                <div className="services-page__process-steps">
                  <div className="services-page__steps-list">
                    {processSteps.map(step => (
                      <div className="services-page__step" key={step.num}>
                        <div className="services-page__step-num" aria-hidden="true">{step.num}</div>
                        <div className="services-page__step-content">
                          <h3 className="services-page__step-title">{step.title}</h3>
                          <p className="services-page__step-desc">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services-page__pricing" aria-labelledby="services-pricing-title">
          <div className="container">
            <div className="services-page__pricing-card">
              <div>
                <h2 id="services-pricing-title">Vad kostar en bilservice?</h2>
                <p>Priset beror på bilmodell, ålder och vilken nivå av service som behövs – som fristående verkstad ligger vi normalt under vad en märkesverkstad tar för motsvarande arbete. Ring oss så får du ett tydligt pris innan vi sätter igång, inga överraskningar på slutfakturan.</p>
              </div>
              <div className="services-page__pricing-actions">
                <button type="button" onClick={openModal} className="services-page__btn services-page__btn--primary">Boka tid för bilservice</button>
                <a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicles note section */}
        <section className="services-page__cars-note" aria-labelledby="cars-note-title">
          <div className="container">
            <div className="services-page__cars-box">
              <div className="services-page__cars-text">
                <div className="section-eyebrow section-eyebrow--dark">
                  <span className="eyebrow-line" aria-hidden="true" />
                  Kvalitetskontrollerade fordon
                </div>
                <h3 className="services-page__cars-heading" id="cars-note-title">
                  Letar du efter en begagnad bil?
                </h3>
                <p className="services-page__cars-desc">
                  Vi säljer även noggrant genomgångna och besiktigade begagnade bilar i Gävle. Varje bil kontrolleras av våra mekaniker innan försäljning.
                </p>
              </div>
              <div className="services-page__cars-action">
                <a href="/bilar-till-salu" className="services-page__cars-btn">
                  <span>Se bilar till salu</span>
                  <ArrowRightIcon className="services-page__cars-arrow" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Reassurance section */}
        <section className="services-page__reassurance" aria-labelledby="reassurance-title">
          <div className="container">
            <div className="services-page__reassurance-card">
              <div className="services-page__reassurance-header">
                <div className="services-page__reassurance-icon" aria-hidden="true">
                  <ShieldHeartIcon />
                </div>
                <div>
                  <h3 className="services-page__reassurance-title" id="reassurance-title">
                    Alltid tydliga besked och ärliga priser
                  </h3>
                  <p className="services-page__reassurance-desc">
                    Hos Brynäs Bilservice bemöts du av mekanikern som arbetar med din bil. Vi lämnar tydliga kostnadsförslag och utför inga reparationer utan ditt medgivande.
                  </p>
                </div>
              </div>
              <div className="services-page__reassurance-actions">
                <button
                  type="button"
                  onClick={openModal}
                  className="services-page__btn services-page__btn--primary"
                >
                  Boka tid nu
                </button>
                <a
                  href="tel:0705533395"
                  className="services-page__btn services-page__btn--outline"
                >
                  Ring: 070-553 33 95
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={isModalOpen} onClose={closeModal} />
      <Footer />
    </>
  )
}
