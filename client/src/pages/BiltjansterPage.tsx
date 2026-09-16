import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import bilserviceThumbJpg from '../assets/images/services/general/wrench-and-bolt-workbench-thumb.jpg'
import bilserviceThumbWebp from '../assets/images/services/general/wrench-and-bolt-workbench-thumb.webp'
import oljebyteThumbJpg from '../assets/images/services/oil/oil-drain-under-car-thumb.jpg'
import oljebyteThumbWebp from '../assets/images/services/oil/oil-drain-under-car-thumb.webp'
import kamremThumbJpg from '../assets/images/services/timing-belt/timing-belt-in-hand-thumb-card.jpg'
import kamremThumbWebp from '../assets/images/services/timing-belt/timing-belt-in-hand-thumb-card.webp'
import bilbatteriThumbJpg from '../assets/images/services/battery/battery-terminal-bolt-tightening-thumb-card.jpg'
import bilbatteriThumbWebp from '../assets/images/services/battery/battery-terminal-bolt-tightening-thumb-card.webp'
import drivaxelThumbJpg from '../assets/images/services/driveshaft/cv-joint-workbench-thumb.jpg'
import drivaxelThumbWebp from '../assets/images/services/driveshaft/cv-joint-workbench-thumb.webp'

interface ServiceGuide {
  id: string
  title: string
  summary: string
  href: string
  imageLabel: string
  imageJpg?: string
  imageWebp?: string
}

const serviceGuides: ServiceGuide[] = [
  {
    id: 'bilservice',
    title: 'Bilservice',
    summary: 'Regelbunden service samlar rutinkontroller som hjälper till att bevara bilens funktion, säkerhet och livslängd.',
    href: '/service-reparationer#bilservice',
    imageLabel: 'Bilservice i verkstaden',
    imageJpg: bilserviceThumbJpg,
    imageWebp: bilserviceThumbWebp,
  },
  {
    id: 'oljebyte',
    title: 'Oljebyte',
    summary: 'Ny motorolja och ett nytt filter hjälper motorns rörliga delar att smörjas och skyddas mot onödigt slitage.',
    href: '/oljebyte',
    imageLabel: 'Oljebyte i verkstaden',
    imageJpg: oljebyteThumbJpg,
    imageWebp: oljebyteThumbWebp,
  },
  {
    id: 'kamrem',
    title: 'Kamrem',
    summary: 'Kamremmen håller motorns rörliga delar i rätt takt och byts enligt rätt intervall för din bil.',
    href: '/kamrem',
    imageLabel: 'Kamremsarbete i verkstaden',
    imageJpg: kamremThumbJpg,
    imageWebp: kamremThumbWebp,
  },
  {
    id: 'koppling',
    title: 'Koppling',
    summary: 'Kopplingen överför kraften mellan motor och växellåda och är en slitdel som kan behöva bytas.',
    href: '/koppling',
    imageLabel: 'Kopplingsarbete i verkstaden',
  },
  {
    id: 'bromssystem',
    title: 'Bromssystem',
    summary: 'Bromsarna är avgörande för säkerheten, och tidiga tecken kan hjälpa dig att få rätt åtgärd i tid.',
    href: '/bromssystem',
    imageLabel: 'Bromsarbete i verkstaden',
  },
  {
    id: 'bilbatteri',
    title: 'Bilbatteri',
    summary: 'Bilbatteriet ger startkraft och försörjer elsystemet – rätt batterityp behöver testas och anpassas till bilen.',
    href: '/bilbatteri',
    imageLabel: 'Batterikontroll i verkstaden',
    imageJpg: bilbatteriThumbJpg,
    imageWebp: bilbatteriThumbWebp,
  },
  {
    id: 'stodampare-fjadrar',
    title: 'Stötdämpare & fjädrar',
    summary: 'Stötdämpare och fjädrar hjälper hjulen att hålla kontakt med vägen för stabil och kontrollerad körning.',
    href: '/stodampare-fjadrar',
    imageLabel: 'Arbete med stötdämpare och fjädrar',
  },
  {
    id: 'hjullagerbyte',
    title: 'Hjullagerbyte',
    summary: 'Ett hjullager ska ge mjuk och friktionsfri gång; brummande ljud eller vibrationer kan vara tecken på slitage.',
    href: '/hjullagerbyte',
    imageLabel: 'Hjullagerbyte i verkstaden',
  },
  {
    id: 'avgassystem',
    title: 'Avgassystem',
    summary: 'Avgassystemet dämpar motorljud och samverkar med bilens avgasrening och sensorer.',
    href: '/avgassystem',
    imageLabel: 'Avgassystem i verkstaden',
  },
  {
    id: 'drivaxel-drivknutar',
    title: 'Drivaxel & drivknutar',
    summary: 'Drivaxlar och drivknutar för motorkraften till hjulen och behöver fungera utan glapp, läckage eller vibrationer.',
    href: '/drivaxel-drivknutar',
    imageLabel: 'Drivaxelarbete i verkstaden',
    imageJpg: drivaxelThumbJpg,
    imageWebp: drivaxelThumbWebp,
  },
  {
    id: 'styrning-kulleder',
    title: 'Styrning & kulleder',
    summary: 'Styrning och kulleder hjälper bilen att svara stabilt på ratten och hålla rätt väghållning.',
    href: '/styrning-kulleder',
    imageLabel: 'Styrningsarbete i verkstaden',
  },
]

export default function BiltjansterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Header onBookingClick={openModal} />

      <main className="services-page biltjanster-page">
        <section className="services-page__hero" aria-labelledby="services-hero-title">
          <div className="container">
            <div className="services-page__hero-layout">
              <div className="services-page__hero-content">
                <h1 className="services-page__title" id="services-hero-title">
                  Våra <span className="title-accent">biltjänster</span>
                </h1>
                <p className="services-page__lead">
                  Här hittar du fördjupad information om mekaniska reparationer, vanliga symptom och riktad felsökning.
                </p>
                <div className="services-page__hero-actions">
                  <button
                    type="button"
                    onClick={openModal}
                    className="services-page__btn services-page__btn--primary"
                  >
                    Boka tid
                  </button>
                  <a href="tel:0705533395" className="services-page__btn services-page__btn--outline">
                    <PhoneIcon className="services-page__btn-icon" />
                    <span>Ring 070-553 33 95</span>
                  </a>
                </div>
              </div>

              <div
                className="services-page__image-placeholder"
                role="img"
                aria-label="Platshållare för framtida bild till Biltjänster"
              >
                <WrenchIcon aria-hidden="true" />
                <span>Våra tjänster</span>
                <small>Bild kommer</small>
              </div>
            </div>
          </div>
        </section>

        <section className="services-page__categories" aria-label="Serviceguider">
          <div className="container">
            <div className="services-page__category-list biltjanster-page__guide-list">
              {serviceGuides.map((guide, index) => (
                <article
                  className="services-category-card biltjanster-page__guide-card"
                  id={guide.id}
                  key={guide.id}
                  aria-labelledby={`${guide.id}-title`}
                >
                  <div
                    className="services-category-card__media biltjanster-page__guide-media"
                    role={guide.imageJpg ? undefined : 'img'}
                    aria-label={guide.imageJpg ? undefined : `Platshållare för framtida bild: ${guide.imageLabel}`}
                  >
                    <div className="services-category-card__badge" aria-hidden="true">
                      <WrenchIcon />
                    </div>
                    <span className="services-category-card__badge-num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {guide.imageJpg && guide.imageWebp ? (
                      <picture>
                        <source srcSet={guide.imageWebp} type="image/webp" />
                        <img className="services-category-card__img" src={guide.imageJpg} alt={guide.imageLabel} loading="lazy" />
                      </picture>
                    ) : (
                      <div className="biltjanster-page__guide-placeholder" aria-hidden="true">
                        <span>{guide.imageLabel}</span>
                        <small>Bild kommer</small>
                      </div>
                    )}
                  </div>

                  <div className="services-category-card__content">
                    <div className="services-category-card__header">
                      <h2 className="services-category-card__title" id={`${guide.id}-title`}>
                        {guide.title}
                      </h2>
                      <p className="services-category-card__desc">{guide.summary}</p>
                    </div>

                    <div className="services-category-card__actions">
                      <a
                        href={guide.href}
                        className="services-category-card__cta"
                        aria-label={`Läs mer om ${guide.title}`}
                      >
                        <span>Läs mer</span>
                        <span className="services-category-card__arrow-badge" aria-hidden="true">
                          <ArrowRightIcon className="services-category-card__arrow" />
                        </span>
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
