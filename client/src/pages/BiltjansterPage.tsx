import { useState } from 'react'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { BoltIcon } from '../components/icons/BoltIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
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
import './BiltjansterPage.css'

interface ServiceGuide {
  id: string
  title: string
  summary: string
  href: string
  imageLabel: string
  imageJpg?: string
  imageWebp?: string
  icon?: typeof WrenchIcon
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
    icon: ClockIcon,
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
    icon: ShieldIcon,
  },
  {
    id: 'bilbatteri',
    title: 'Bilbatteri',
    summary: 'Bilbatteriet ger startkraft och försörjer elsystemet – rätt batterityp behöver testas och anpassas till bilen.',
    href: '/bilbatteri',
    imageLabel: 'Batterikontroll i verkstaden',
    imageJpg: bilbatteriThumbJpg,
    imageWebp: bilbatteriThumbWebp,
    icon: BoltIcon,
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
      <PublicHeader onBookingClick={openModal} variant="solid" />

      <main className="biltjanster-page" id="main-content">
        <section className="biltjanster-page__hero" aria-labelledby="biltjanster-hero-title">
          <div className="biltjanster-page__wrap biltjanster-page__hero-inner">
            <p className="biltjanster-page__eyebrow">Hela vårt tjänsteutbud</p>
            <h1 className="biltjanster-page__title" id="biltjanster-hero-title">
              Våra <span className="biltjanster-page__accent">biltjänster</span>
            </h1>
            <p className="biltjanster-page__lead">
              Här hittar du fördjupad information om mekaniska reparationer, vanliga symptom och riktad felsökning – ett samlat ställe för hela vårt tjänsteutbud.
            </p>
            <div className="biltjanster-page__hero-actions">
              <button type="button" onClick={openModal} className="biltjanster-page__btn biltjanster-page__btn--primary">
                <span>Boka tid</span>
              </button>
              <a href="tel:0705533395" className="biltjanster-page__btn biltjanster-page__btn--outline">
                <PhoneIcon className="biltjanster-page__btn-icon" />
                <span>Ring 070-553 33 95</span>
              </a>
            </div>
          </div>
        </section>

        <section className="biltjanster-page__guides" aria-label="Serviceguider">
          <div className="biltjanster-page__wrap">
            <div className="biltjanster-page__guide-grid">
              {serviceGuides.map((guide, index) => {
                const GuideIcon = guide.icon ?? WrenchIcon
                return (
                  <article
                    className="biltjanster-page__guide-card"
                    id={guide.id}
                    key={guide.id}
                    aria-labelledby={`${guide.id}-title`}
                  >
                    <div
                      className="biltjanster-page__guide-media"
                      role={guide.imageJpg ? undefined : 'img'}
                      aria-label={guide.imageJpg ? undefined : `Platshållare för framtida bild: ${guide.imageLabel}`}
                    >
                      <span className="biltjanster-page__guide-badge" aria-hidden="true">
                        <GuideIcon />
                      </span>
                      <span className="biltjanster-page__guide-num" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {guide.imageJpg && guide.imageWebp ? (
                        <picture>
                          <source srcSet={guide.imageWebp} type="image/webp" />
                          <img className="biltjanster-page__guide-img" src={guide.imageJpg} alt={guide.imageLabel} loading="lazy" />
                        </picture>
                      ) : (
                        <div className="biltjanster-page__guide-placeholder" aria-hidden="true">
                          <span>{guide.imageLabel}</span>
                          <small>Bild kommer</small>
                        </div>
                      )}
                    </div>

                    <div className="biltjanster-page__guide-content">
                      <h2 className="biltjanster-page__guide-title" id={`${guide.id}-title`}>
                        {guide.title}
                      </h2>
                      <p className="biltjanster-page__guide-desc">{guide.summary}</p>
                      <a
                        href={guide.href}
                        className="biltjanster-page__guide-cta"
                        aria-label={`Läs mer om ${guide.title}`}
                      >
                        <span>Läs mer</span>
                        <span className="biltjanster-page__guide-arrow" aria-hidden="true">
                          <ArrowRightIcon />
                        </span>
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="biltjanster-page__cta" aria-labelledby="biltjanster-cta-title">
          <div className="biltjanster-page__wrap biltjanster-page__cta-inner">
            <div>
              <p className="biltjanster-page__eyebrow biltjanster-page__eyebrow--dark">Redo att boka?</p>
              <h2 className="biltjanster-page__cta-title" id="biltjanster-cta-title">
                Hittar du inte det du söker?
              </h2>
              <p className="biltjanster-page__cta-desc">
                Ring oss eller boka en tid direkt så hjälper vi dig att hitta rätt åtgärd för din bil.
              </p>
            </div>
            <div className="biltjanster-page__cta-actions">
              <button type="button" onClick={openModal} className="biltjanster-page__btn biltjanster-page__btn--primary">
                <span>Boka tid</span>
              </button>
              <a href="tel:0705533395" className="biltjanster-page__btn biltjanster-page__btn--outline">
                <PhoneIcon className="biltjanster-page__btn-icon" />
                <span>Ring: 070-553 33 95</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={isModalOpen} onClose={closeModal} />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
