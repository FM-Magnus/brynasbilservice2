import { useState, useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

import imgWorkshop1 from '../assets/images/OMOSS_KENBURNS1.jpg'
import imgWorkshop2 from '../assets/images/OMOSS_KENBURNS2.jpg'
import imgLounge from '../assets/images/OMOSS_KENBURNS3.jpg'
import imgExterior from '../assets/images/HAR_FINNS_VI.jpg'

interface GalleryItem {
  id: string
  image: string
  alt: string
  category: string
  title: string
  description: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 'verkstad',
    image: imgWorkshop1,
    alt: 'Brynäs Bilservice verkstadslokal med lyftar och verktyg',
    category: 'Verkstadslokaler',
    title: 'Lyftplatser och mekaniska reparationer',
    description: 'Välutrustad verkstadsyta för service, bromsar, kamremsbyten och större mekaniska arbeten.'
  },
  {
    id: 'dack',
    image: imgWorkshop2,
    alt: 'Däckverkstad med maskiner för däckskifte och hjulbalansering',
    category: 'Däck & hjulservice',
    title: 'Modern däck- och balanseringsutrustning',
    description: 'Maskiner för däckskifte, krängning, balansering och däckhotellshantering.'
  },
  {
    id: 'reception',
    image: imgLounge,
    alt: 'Kundmottagning och väntyta hos Brynäs Bilservice',
    category: 'Kundmottagning',
    title: 'Trevlig väntyta och personligt mottagande',
    description: 'Vår kundmottagning där du lämnar och hämtar nycklarna och kan sitta ner en stund.'
  },
  {
    id: 'exterior',
    image: imgExterior,
    alt: 'Brynäs Bilservice exteriör och entré på Utmarksvägen 21B',
    category: 'Exteriör & infart',
    title: 'Utmarksvägen 21B på Brynäs i Gävle',
    description: 'Lättillgänglig infart och goda parkeringsmöjligheter precis intill verkstaden.'
  }
]

export default function GalleryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header onBookingClick={openModal} />

      <main className="about-page" id="main-content">
        {/* Hero section */}
        <section className="about-page__hero" aria-labelledby="gallery-hero-title">
          <div className="container">
            <div className="about-page__hero-grid">
              <div className="about-page__hero-content">
                <div className="section-eyebrow">
                  <span className="eyebrow-line" aria-hidden="true" />
                  Bilder &amp; Verkstadsmiljö
                </div>
                <h1 className="about-page__hero-title" id="gallery-hero-title">
                  Bilder från Brynäs Bilservice
                </h1>
                <p className="about-page__hero-lead">
                  Ta en titt in i vår verkstad, däckavdelning och kundmottagning på Utmarksvägen i Brynäs. Här ser du lokalerna, utrustningen och miljön där vi tar hand om din bil.
                </p>
                <div className="about-page__hero-actions">
                  <button
                    type="button"
                    onClick={openModal}
                    className="about-page__btn about-page__btn--primary"
                  >
                    <span>Boka tid</span>
                    <span className="about-page__btn-arrow" aria-hidden="true">
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </button>
                  <a
                    href="tel:0705533395"
                    className="about-page__btn about-page__btn--outline"
                  >
                    <PhoneIcon className="w-4 h-4 text-teal-400" />
                    <span>Ring: 070-553 33 95</span>
                  </a>
                </div>
              </div>
              <div className="about-page__hero-visual">
                <div className="about-page__hero-card">
                  <img
                    src={imgWorkshop1}
                    alt="Brynäs Bilservice verkstad med bilar och utrustning"
                    className="about-page__hero-img"
                  />
                  <div className="about-page__hero-badge">Grundat 2021</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop gallery section */}
        <section className="about-page__gallery" aria-labelledby="gallery-title">
          <div className="container">
            <div className="about-page__gallery-intro">
              <div className="section-eyebrow section-eyebrow--dark">
                <span className="eyebrow-line" aria-hidden="true" />
                Vår verkstad i bilder
              </div>
              <h2 className="about-page__section-title" id="gallery-title">
                Ta en titt inne hos oss
              </h2>
              <p className="about-page__gallery-lead">
                Autentiska bilder från vår verkstad, däckavdelning och kundmottagning på Utmarksvägen i Brynäs.
              </p>
            </div>

            <div className="about-page__gallery-grid">
              {galleryItems.map((item) => (
                <article key={item.id} className="about-page__gallery-card">
                  <div className="about-page__gallery-media">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="about-page__gallery-img"
                      loading="lazy"
                    />
                    <div className="about-page__gallery-badge">{item.category}</div>
                  </div>
                  <div className="about-page__gallery-body">
                    <h3 className="about-page__gallery-title">{item.title}</h3>
                    <p className="about-page__gallery-desc">{item.description}</p>
                  </div>
                </article>
              ))}
              {/* TODO CONTENT: HÄR BORDE GALLERIET UTÖKAS MED FLER KATEGORIER.
              Kunden har fler bilder tagna med systemkamera. Föreslagna nya kategorier:
              1. Teamet i arbete (kopplar till "Maher eller någon i teamet"-stycket ovan)
              2. Faktiska jobb innan/efter (kopplar till "bevis före löften"-stycket ovan)
              3. Utrustning i närbild
              Väntar på bildmaterial och godkännande av vilka bilder som får publiceras. */}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="about-page__cta" aria-labelledby="cta-title">
          <div className="container">
            <div className="about-page__cta-card">
              <div className="about-page__cta-content">
                <div className="section-eyebrow">
                  <span className="eyebrow-line" aria-hidden="true" />
                  Välkommen till oss
                </div>
                <h2 className="about-page__cta-title" id="cta-title">
                  Redo att boka service eller reparation?
                </h2>
                <p className="about-page__cta-desc">
                  Har du frågor om din bil eller vill du boka tid? Skicka en förfrågan via formuläret eller ring direkt till verkstaden på Utmarksvägen.
                </p>
                <div className="about-page__cta-actions">
                  <button
                    type="button"
                    onClick={openModal}
                    className="about-page__btn about-page__btn--primary"
                  >
                    <span>Boka tid nu</span>
                    <span className="about-page__btn-arrow" aria-hidden="true">
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </button>
                  <a
                    href="/tjanster"
                    className="about-page__btn about-page__btn--secondary"
                  >
                    <span>Se alla tjänster</span>
                  </a>
                  <a
                    href="tel:0705533395"
                    className="about-page__btn about-page__btn--outline"
                  >
                    <PhoneIcon className="w-4 h-4 text-teal-400" />
                    <span>Ring: 070-553 33 95</span>
                  </a>
                </div>
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
