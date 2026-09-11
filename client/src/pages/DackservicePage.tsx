import { useState, useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { TireIcon } from '../components/icons/TireIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

import imgTyres from '../assets/images/servicekort_tyres.jpg'

interface ServiceCategory {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  icon: JSX.Element
  actionType: 'booking' | 'call'
  items: string[]
  troubleshooting: string[]
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'dack-hjulinstallning',
    title: 'Däckservice & Däckhotell',
    subtitle: 'Däckbyte, montering, hjulinställning och bekväm säsongsförvaring',
    description: 'Fel hjulvinklar sliter ner nya däck i förtid och gör att bilen drar mer bränsle än den behöver — en snabb kontroll är ofta en billig försäkring mot en dyr omgång däck. Utöver skifte och balansering erbjuder vi däckhotell: vi tvättar, kontrollerar mönsterdjupet och förvarar hjulen mörkt och svalt till nästa säsong.',
    image: imgTyres,
    imageAlt: 'Montering och balansering av däck i däckverkstad',
    icon: <TireIcon />,
    actionType: 'booking',
    items: [
      'Däckbyte & montering',
      'Balansering av hjul',
      'Hjulinställning & framvagnsjustering',
      'Däckhotell — förvaring & tvätt',
      'Däcktryckskontroll & TPMS'
    ],
    troubleshooting: [
      'Skakningar eller vibrationer i ratten vid motorvägsfart',
      'Bilen drar åt ena sidan vid rak körning',
      'Däcken slits snett eller ojämnt på inner-/ytterkant',
      'Dags för säsongsskifte mellan sommar- och vinterdäck'
    ]
  }
]

const processSteps = [
  {
    num: '01',
    title: 'Berätta om bilen',
    desc: 'Beskriv ditt behov av däckbyte, hjulinställning eller däckhotell.'
  },
  {
    num: '02',
    title: 'Vi undersöker och utför arbetet',
    desc: 'Vi skiftar, balanserar eller justerar hjulvinklarna med precision.'
  },
  {
    num: '03',
    title: 'Klart för vägen',
    desc: 'Bilen lämnas tillbaka redo för säker och bekväm körning.'
  }
]

export default function DackservicePage() {
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
        <section className="services-page__hero" aria-labelledby="services-hero-title">
          <div className="container">
            <div className="services-page__hero-content">
              <div className="section-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                Vår verkstad i Brynäs, Gävle
              </div>
              <h1 className="services-page__title" id="services-hero-title">
                Däckservice & <span className="title-accent">Däckhotell</span>
              </h1>
              <p className="services-page__lead">
                Vi erbjuder komplett däckservice i Gävle — allt från säsongsskifte, montering och balansering till hjulinställning och bekväm säsongsförvaring i vårt däckhotell.
              </p>
              <div className="services-page__hero-actions">
                <button
                  type="button"
                  onClick={openModal}
                  className="services-page__btn services-page__btn--primary"
                >
                  Boka däckservice
                </button>
                <a
                  href="tel:0705533395"
                  className="services-page__btn services-page__btn--outline"
                >
                  <PhoneIcon className="services-page__btn-icon" />
                  <span>Ring oss: 070-553 33 95</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section (Däck cards only) */}
        <section className="services-page__categories" aria-labelledby="services-categories-title">
          <div className="container">
            <header className="section-header">
              <div className="section-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                Säkerhet & Väggrepp
              </div>
              <h2 className="section-title" id="services-categories-title">
                Däck & <span className="title-accent">Hjulinställning</span>
              </h2>
              <p className="section-desc">
                Här hittar du information om våra däcktjänster, balansering, hjulinställning och säsongsförvaring.
              </p>
            </header>

            <div className="services-page__category-list">
              {serviceCategories.map((cat, index) => (
                <article
                  className="services-category-card"
                  id={cat.id}
                  key={cat.id}
                  aria-labelledby={`${cat.id}-title`}
                >
                  <div className="services-category-card__media">
                    <img
                      src={cat.image}
                      alt={cat.imageAlt}
                      className="services-category-card__img"
                      loading="lazy"
                    />
                    <div className="services-category-card__badge" aria-hidden="true">
                      {cat.icon}
                    </div>
                    <span className="services-category-card__badge-num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="services-category-card__content">
                    <div className="services-category-card__header">
                      <h3 className="services-category-card__title" id={`${cat.id}-title`}>
                        {cat.title}
                      </h3>
                      <p className="services-category-card__subtitle">
                        {cat.subtitle}
                      </p>
                      <p className="services-category-card__desc">
                        {cat.description}
                      </p>
                    </div>

                    <div className="services-category-card__details">
                      {/* What we do */}
                      <div className="services-category-card__col">
                        <h4 className="services-category-card__subheading">
                          Det här ingår & utförs:
                        </h4>
                        <ul className="services-category-card__items">
                          {cat.items.map(item => (
                            <li key={item}>
                              <CheckIcon className="services-category-card__check" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Common symptoms */}
                      <div className="services-category-card__col">
                        <h4 className="services-category-card__subheading">
                          Vanliga tecken på att du behöver hjälp:
                        </h4>
                        <ul className="services-category-card__symptoms">
                          {cat.troubleshooting.map(symptom => (
                            <li key={symptom}>
                              <span className="services-category-card__bullet" aria-hidden="true">•</span>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="services-category-card__actions">
                      <button
                        type="button"
                        onClick={openModal}
                        className="services-category-card__cta"
                        aria-label={`Boka tid för ${cat.title}`}
                      >
                        <span>Boka tid</span>
                        <span className="services-category-card__arrow-badge" aria-hidden="true">
                          <ArrowRightIcon className="services-category-card__arrow" />
                        </span>
                      </button>

                      <a
                        href="tel:0705533395"
                        className="services-category-card__call-link"
                      >
                        Frågor? Ring 070-553 33 95
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process Card ("Så fungerar det") - AT THE BOTTOM */}
        <section className="services-page__process-section" aria-labelledby="services-process-title">
          <div className="container">
            <div className="services-page__process-card">
              <div className="services-page__process-inner">
                <div className="services-page__process-text">
                  <div className="section-eyebrow section-eyebrow--dark">
                    <span className="eyebrow-line" aria-hidden="true" />
                    Så fungerar ditt däckbesök
                  </div>
                  <h2 className="services-page__process-heading" id="services-process-title">
                    Smidigt och säkert <br />
                    <span className="title-accent">däckskifte</span>
                  </h2>
                  <p className="services-page__process-desc">
                    Vi byter dina däck snabbt, kontrollerar lufttryck och mönsterdjup, samt ser till att dina hjul är perfekt balanserade.
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
                        <div className="services-page__step-num" aria-hidden="true">
                          {step.num}
                        </div>
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
                    Rätt mönsterdjup och säkra vägegenskaper
                  </h3>
                  <p className="services-page__reassurance-desc">
                    Vi ser till att dina däck mäter korrekta värden, är korrekt balanserade och att hjulvinklarna inte sliter ut däcken i förtid.
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
