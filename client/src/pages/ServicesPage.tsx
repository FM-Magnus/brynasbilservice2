import { useState, useEffect, type ReactNode } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { SnowflakeIcon } from '../components/icons/SnowflakeIcon'
import { TireIcon } from '../components/icons/TireIcon'
import { TruckIcon } from '../components/icons/TruckIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

import imgRepair from '../assets/images/services/repair/mechanic-brake-repair.jpg'
import imgDiagnosis from '../assets/images/services/diagnostics/vehicle-diagnostics-laptop.jpg'
import imgAC from '../assets/images/services/ac/ac-manometers-on-engine.jpg'
import imgTyres from '../assets/images/services/tires/tire-storage-wheel.jpg'
import imgTow from '../assets/images/services/towing/tow-truck-at-workshop.jpg'

interface ServiceCategory {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  icon: ReactNode
  actionType: 'booking' | 'call'
  items: string[]
  troubleshooting: string[]
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'service-reparation',
    title: 'Bilservice & Reparationer',
    subtitle: 'Underhåll och mekaniska reparationer enligt biltillverkarens föreskrifter',
    description: 'Vi servar och reparerar alla bilmärken enligt tillverkarens föreskrifter — vilket innebär att din nybilsgaranti gäller precis som vanligt, oavsett var bilen är köpt. Innan vi rör en skruv får du ett tydligt prisbesked, och upptäcker vi något oväntat under arbetets gång kontaktar vi dig innan vi går vidare.',
    image: imgRepair,
    imageAlt: 'Mekaniker utför reparation i motorrummet på bilverkstad',
    icon: <WrenchIcon />,
    actionType: 'booking',
    items: [
      'Bilservice & oljebyte',
      'Bromsbyte & bromskontroll',
      'Kamremsbyten',
      'Kopplingsbyten',
      'Motorservice & motorbyten',
      'Växellådsreparationer',
      'Avgassystem & ljuddämpare',
      'Batteribyte & kontroll',
      'Dragkroksmontage',
      'Besiktning & förkontroll'
    ],
    troubleshooting: [
      'Bilen drar snett, skakar eller känns instabil',
      'Missljud från motor, koppling eller avgassystem',
      'Försämrad bromsverkan eller gnisslande bromsar',
      'Serviceindikatorn lyser i instrumentpanelen'
    ]
  },
  {
    id: 'felsokning-diagnostik',
    title: 'Felsökning, Diagnostik & Elsystem',
    subtitle: 'Avancerad datoriserad felsökning för modern fordonselektronik',
    description: 'En varningslampa säger sällan hela sanningen. Vi börjar alltid med att läsa av bilens felkoder, men en kod visar bara vilket system som larmar — inte exakt vilken del som är trasig. Därför går vi vidare med riktad felsökning till ett i förväg bestämt pris, så att sökandet aldrig blir en öppen räkning.',
    image: imgDiagnosis,
    imageAlt: 'Datoriserad diagnostikutrustning ansluten till bilens elektronik',
    icon: <MonitorIcon />,
    actionType: 'booking',
    items: [
      'Felsökning & felkodsläsning',
      'Elektronik & givardiagnostik',
      'Elarbete & elsystem',
      'Batteri- och laddningssystem'
    ],
    troubleshooting: [
      'Motorlampan (Check Engine) eller varningslampor tänds',
      'Bilen är svårstartad eller dör under körning',
      'Ojämn motorgång eller reducerad motoreffekt',
      'Elektriska funktioner eller instrument slutat fungera'
    ]
  },
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
  },
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
  },
  {
    id: 'bargning-transport',
    title: 'Bärgning & Biltransport',
    subtitle: 'Lokal bärgningshjälp och säker fordonstransport i Gävle med omnejd',
    description: 'Ett haveri kommer sällan lägligt. Oavsett om bilen har stannat på vägen, inte startar på uppfarten eller är för skadad för att köras säkert, hjälper vi dig med bärgning och transport direkt till verkstaden i Gävle — så att felsökningen kan komma igång så fort bilen är hos oss.',
    image: imgTow,
    imageAlt: 'Brynäs Bilservice bärgningsbil (Iveco flakbil) parkerad vid verkstaden, lastad med däck',
    icon: <TruckIcon />,
    actionType: 'call',
    items: [
      'Bärgning vid motorstopp och haveri',
      'Biltransport till verkstaden i Gävle',
      'Starthjälp och assistans på plats',
      'Snabb intagning för felsökning'
    ],
    troubleshooting: [
      'Bilen startar inte hemma på uppfarten eller arbetsplatsen',
      'Haveri, punktering eller överhettning under färd',
      'Bilen kan inte framföras på ett säkert eller lagligt sätt',
      'Behov av transport från annan plats till vår verkstad'
    ]
  }
]

const processSteps = [
  {
    num: '01',
    title: 'Berätta om bilen',
    desc: 'Beskriv problemet eller vilken service du behöver.'
  },
  {
    num: '02',
    title: 'Vi undersöker och återkopplar',
    desc: 'Du får veta vad vi har hittat och vad nästa steg är.'
  },
  {
    num: '03',
    title: 'Du godkänner innan vi går vidare',
    desc: 'Om mer arbete behövs kontaktar vi dig först.'
  }
]

export default function ServicesPage() {
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
                Verkstadstjänster & <span className="title-accent">Bilreparationer</span>
              </h1>
              <p className="services-page__lead">
                Som märkesoberoende bilverkstad i Gävle erbjuder vi komplett service, diagnostik och reparationer för alla bilmärken. Du får alltid personlig kontakt, fast överenskommelse och tydlig återkoppling innan vi påbörjar arbetet.
              </p>
              <div className="services-page__hero-actions">
                <button
                  type="button"
                  onClick={openModal}
                  className="services-page__btn services-page__btn--primary"
                >
                  Boka tid för service
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

        {/* Process Card ("Så fungerar det") */}
        <section className="services-page__process-section" aria-labelledby="services-process-title">
          <div className="container">
            <div className="services-page__process-card">
              <div className="services-page__process-inner">
                <div className="services-page__process-text">
                  <div className="section-eyebrow section-eyebrow--dark">
                    <span className="eyebrow-line" aria-hidden="true" />
                    Så fungerar ditt verkstadsbesök
                  </div>
                  <h2 className="services-page__process-heading" id="services-process-title">
                    Från första kontakt <br />
                    <span className="title-accent">till färdig bil</span>
                  </h2>
                  <p className="services-page__process-desc">
                    Vi gör det enkelt och tryggt att lämna in bilen. Inget arbete påbörjas utan ditt godkännande och du får alltid ärliga råd om vad som behöver åtgärdas.
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

        {/* Categories Section */}
        <section className="services-page__categories" aria-labelledby="services-categories-title">
          <div className="container">
            <header className="section-header">
              <div className="section-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                Vårt samlade utbud
              </div>
              <h2 className="section-title" id="services-categories-title">
                Verkstadens <span className="title-accent">Tjänsteområden</span>
              </h2>
              <p className="section-desc">
                Här hittar du detaljerad information om vad vi utför inom varje område, vilka vanliga problem vi felsöker och hur du snabbast bokar tid.
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
                      {cat.actionType === 'booking' ? (
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
                      ) : (
                        <a
                          href="tel:0705533395"
                          className="services-category-card__cta"
                          aria-label={`Ring för ${cat.title}`}
                        >
                          <span>Ring 070-553 33 95</span>
                          <span className="services-category-card__arrow-badge" aria-hidden="true">
                            <PhoneIcon className="services-category-card__phone-icon" />
                          </span>
                        </a>
                      )}

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
