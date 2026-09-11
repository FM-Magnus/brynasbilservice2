import { useState, useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { SnowflakeIcon } from '../components/icons/SnowflakeIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

import imgAC from '../assets/images/servicekort_AC.jpg'

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
    id: 'ac-klimatanlaggning',
    title: 'AC-Service & Klimatanläggning',
    subtitle: 'Optimal kupékomfort och fungerande avfuktning året runt',
    description: 'AC:n är inte bara till för sommaren — den drar även ut fukt ur kupén och håller rutorna fria från imma under kalla årstider. Vi provtrycker systemet, letar upp läckage innan vi fyller på köldmedium och kan även rengöra ventilationen om luften börjar kännas unken.',
    image: imgAC,
    imageAlt: 'Tekniker utför service på bilens AC-system',
    icon: <SnowflakeIcon />,
    actionType: 'booking',
    items: [
      'AC-service & påfyllning av köldmedium',
      'Täthetskontroll & provtryckning',
      'Felsökning av AC-kompressor och kondensor',
      'Kupéfilterbyte & rengöring'
    ],
    troubleshooting: [
      'AC:n blåser dålig eller ljummen kyla',
      'Imma på rutorna som inte försvinner vid fläktkörning',
      'Dålig lukt eller unken luft ur ventilationsutblåsen',
      'Missljud från motorrummet när AC:n slås på'
    ]
  }
]

const processSteps = [
  {
    num: '01',
    title: 'Beskriv symptom & boka tid',
    desc: 'Lämna in bilen om kylan uteblir, det luktar unket eller rutorna immar igen.'
  },
  {
    num: '02',
    title: 'Provtryckning & täthetskontroll',
    desc: 'Vi kontrollerar läckage och fyller på köldmedium enligt systemets specifikation.'
  },
  {
    num: '03',
    title: 'Fräsch kupéluft & effektiv kyla',
    desc: 'Bilen lämnas tillbaka med testad klimatanläggning och behaglig temperatur.'
  }
]

export default function AcServicePage() {
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
                AC-Service & <span className="title-accent">Klimatanläggning</span>
              </h1>
              <p className="services-page__lead">
                Vi erbjuder komplett AC-service, påfyllning av köldmedium, läcksökning och rengöring i Gävle — för skön kyla på sommaren och imfria rutor hela vintern.
              </p>
              <div className="services-page__hero-actions">
                <button
                  type="button"
                  onClick={openModal}
                  className="services-page__btn services-page__btn--primary"
                >
                  Boka AC-service
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

        {/* Categories Section (AC card only) */}
        <section className="services-page__categories" aria-labelledby="services-categories-title">
          <div className="container">
            <header className="section-header">
              <div className="section-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                Kupékomfort & Avfuktning
              </div>
              <h2 className="section-title" id="services-categories-title">
                Klimat & <span className="title-accent">AC-Tjänster</span>
              </h2>
              <p className="section-desc">
                Här hittar du detaljerad information om vad som ingår i vår AC-service, täthetskontroll och rengöring av kupéluft.
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

        {/* Process Card ("Så fungerar det") - MOVED TO BOTTOM */}
        <section className="services-page__process-section" aria-labelledby="services-process-title">
          <div className="container">
            <div className="services-page__process-card">
              <div className="services-page__process-inner">
                <div className="services-page__process-text">
                  <div className="section-eyebrow section-eyebrow--dark">
                    <span className="eyebrow-line" aria-hidden="true" />
                    Så fungerar ditt AC-besök
                  </div>
                  <h2 className="services-page__process-heading" id="services-process-title">
                    Från kontroll <br />
                    <span className="title-accent">till perfekt kyla</span>
                  </h2>
                  <p className="services-page__process-desc">
                    Vi provtrycker systemet först för att säkerställa att det inte finns läckage innan påfyllning sker.
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
                    Fräsch luft och garanterad täthet
                  </h3>
                  <p className="services-page__reassurance-desc">
                    Vi provtrycker och läcksöker alltid ditt AC-system noggrant. Inga överraskningar eller onödig påfyllning om systemet läcker.
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
