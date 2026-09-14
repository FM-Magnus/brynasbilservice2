import { useEffect, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { CheckIcon } from '../components/icons/CheckIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import imgRepair from '../assets/images/servicekort_repair.jpg'
import imgDiagnosis from '../assets/images/servicecard_diagnosis.jpg'

interface ServiceCategory {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  icon: JSX.Element
  items: string[]
  troubleshooting: string[]
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'reparationer',
    title: 'Reparationer & mekaniskt underhåll',
    subtitle: 'Underhåll och mekaniska reparationer enligt biltillverkarens föreskrifter',
    description: 'Vi servar och reparerar alla bilmärken enligt tillverkarens föreskrifter — vilket innebär att din nybilsgaranti gäller precis som vanligt, oavsett var bilen är köpt. Innan vi rör en skruv får du ett tydligt prisbesked, och upptäcker vi något oväntat under arbetets gång kontaktar vi dig innan vi går vidare.',
    image: imgRepair,
    imageAlt: 'Mekaniker utför reparation i motorrummet på bilverkstad',
    icon: <WrenchIcon />,
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
      'Besiktning & förkontroll',
    ],
    troubleshooting: [
      'Bilen drar snett, skakar eller känns instabil',
      'Missljud från motor, koppling eller avgassystem',
      'Försämrad bromsverkan eller gnisslande bromsar',
      'Serviceindikatorn lyser i instrumentpanelen',
    ],
  },
  {
    id: 'felsokning-diagnostik',
    title: 'Felsökning, Diagnostik & Elsystem',
    subtitle: 'Avancerad datoriserad felsökning för modern fordonselektronik',
    description: 'En varningslampa säger sällan hela sanningen. Vi börjar alltid med att läsa av bilens felkoder, men en kod visar bara vilket system som larmar — inte exakt vilken del som är trasig. Därför går vi vidare med riktad felsökning till ett i förväg bestämt pris, så att sökandet aldrig blir en öppen räkning.',
    image: imgDiagnosis,
    imageAlt: 'Datoriserad diagnostikutrustning ansluten till bilens elektronik',
    icon: <MonitorIcon />,
    items: [
      'Felsökning & felkodsläsning',
      'Elektronik & givardiagnostik',
      'Elarbete & elsystem',
      'Batteri- och laddningssystem',
    ],
    troubleshooting: [
      'Motorlampan (Check Engine) eller varningslampor tänds',
      'Bilen är svårstartad eller dör under körning',
      'Ojämn motorgång eller reducerad motoreffekt',
      'Elektriska funktioner eller instrument slutat fungera',
    ],
  },
]

export default function BiltjansterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header onBookingClick={openModal} />

      <main className="services-page biltjanster-page">
        <section className="services-page__categories" aria-labelledby="services-categories-title">
          <div className="container">
            <header className="section-header">
              <h1 className="section-title" id="services-categories-title">
                Reparationer & <span className="title-accent">Felsökning</span>
              </h1>
              <p className="section-desc">
                Här hittar du fördjupad information om mekaniska reparationer, vanliga symptom och riktad felsökning.
              </p>
            </header>

            <div className="services-page__category-list">
              {serviceCategories.map((category, index) => (
                <article
                  className="services-category-card"
                  id={category.id}
                  key={category.id}
                  aria-labelledby={`${category.id}-title`}
                >
                  <div className="services-category-card__media">
                    <img
                      src={category.image}
                      alt={category.imageAlt}
                      className="services-category-card__img"
                      loading="lazy"
                    />
                    <div className="services-category-card__badge" aria-hidden="true">
                      {category.icon}
                    </div>
                    <span className="services-category-card__badge-num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="services-category-card__content">
                    <div className="services-category-card__header">
                      <h2 className="services-category-card__title" id={`${category.id}-title`}>
                        {category.title}
                      </h2>
                      <p className="services-category-card__subtitle">{category.subtitle}</p>
                      <p className="services-category-card__desc">{category.description}</p>
                    </div>

                    <div className="services-category-card__details">
                      <div className="services-category-card__col">
                        <h3 className="services-category-card__subheading">Det här ingår & utförs:</h3>
                        <ul className="services-category-card__items">
                          {category.items.map(item => (
                            <li key={item}>
                              <CheckIcon className="services-category-card__check" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="services-category-card__col">
                        <h3 className="services-category-card__subheading">Vanliga tecken på att du behöver hjälp:</h3>
                        <ul className="services-category-card__symptoms">
                          {category.troubleshooting.map(symptom => (
                            <li key={symptom}>
                              <span className="services-category-card__bullet" aria-hidden="true">•</span>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="services-category-card__actions">
                      <button
                        type="button"
                        onClick={openModal}
                        className="services-category-card__cta"
                        aria-label={`Boka tid för ${category.title}`}
                      >
                        <span>Boka tid</span>
                        <span className="services-category-card__arrow-badge" aria-hidden="true">
                          <ArrowRightIcon className="services-category-card__arrow" />
                        </span>
                      </button>
                      <a href="tel:0705533395" className="services-category-card__call-link">
                        Frågor? Ring 070-553 33 95
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={isModalOpen} onClose={closeModal} />
      <Footer />
    </>
  )
}
