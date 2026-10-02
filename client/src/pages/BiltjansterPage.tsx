import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { useBookingModal } from '../hooks/useBookingModal'
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
import clutchThumbJpg from '../assets/images/services/clutch/clutch-components-on-bench.jpg'
import clutchThumbWebp from '../assets/images/services/clutch/clutch-components-on-bench.webp'
import bilbatteriThumbJpg from '../assets/images/services/battery/battery-terminal-bolt-tightening-thumb-card.jpg'
import bilbatteriThumbWebp from '../assets/images/services/battery/battery-terminal-bolt-tightening-thumb-card.webp'
import drivaxelThumbJpg from '../assets/images/services/driveshaft/driveshaft-components-workbench.jpg'
import drivaxelThumbWebp from '../assets/images/services/driveshaft/driveshaft-components-workbench.webp'
import brakesThumbJpg from '../assets/images/services/brakes/brakes-components-caliper-pads.jpg'
import brakesThumbWebp from '../assets/images/services/brakes/brakes-components-caliper-pads.webp'
import hjullagerThumbJpg from '../assets/images/services/wheel-bearing/wheel-bearing-hub-assembly-closeup.jpg'
import hjullagerThumbWebp from '../assets/images/services/wheel-bearing/wheel-bearing-hub-assembly-closeup.webp'
import steeringThumbJpg from '../assets/images/services/steering/steering-linkage-components-workbench.jpg'
import steeringThumbWebp from '../assets/images/services/steering/steering-linkage-components-workbench.webp'
import exhaustThumbJpg from '../assets/images/services/exhaust/exhaust-system-components-underbody.jpg'
import exhaustThumbWebp from '../assets/images/services/exhaust/exhaust-system-components-underbody.webp'
import suspensionThumbJpg from '../assets/images/services/suspension/suspension-strut-new-vs-old-comparison.jpg'
import suspensionThumbWebp from '../assets/images/services/suspension/suspension-strut-new-vs-old-comparison.webp'
import repairThumbJpg from '../assets/images/services/general/service-performance-diagnostics.jpg'
import repairThumbWebp from '../assets/images/services/general/service-performance-diagnostics.webp'
import gatThumbJpg from '../assets/images/services/general/service-longevity-oil-filter.jpg'
import gatThumbWebp from '../assets/images/services/general/service-longevity-oil-filter.webp'
import { BUSINESS } from '../data/business'
import './BiltjansterPage.css'

interface ServiceGuide {
  id: string
  title: string
  summary: string
  to: string
  imageLabel: string
  imageJpg: string
  imageWebp: string
  icon?: typeof WrenchIcon
}

const serviceGuides: ServiceGuide[] = [
  {
    id: 'bilservice',
    title: 'Bilservice',
    summary: 'Regelbunden service samlar rutinkontroller som hjälper till att bevara bilens funktion, säkerhet och livslängd.',
    to: '/service-reparationer#bilservice',
    imageLabel: 'Bilservice i verkstaden',
    imageJpg: bilserviceThumbJpg,
    imageWebp: bilserviceThumbWebp,
  },
  {
    id: 'reparationer',
    title: 'Reparationer & större arbeten',
    summary: 'Motor, koppling, avgassystem och andra större jobb, med kostnadsförslag innan vi börjar.',
    to: '/reparationer-storre-arbeten',
    imageLabel: 'Reparation i verkstaden',
    imageJpg: repairThumbJpg,
    imageWebp: repairThumbWebp,
  },
  {
    id: 'oljebyte',
    title: 'Oljebyte',
    summary: 'Ny motorolja och ett nytt filter hjälper motorns rörliga delar att smörjas och skyddas mot onödigt slitage.',
    to: '/oljebyte',
    imageLabel: 'Oljebyte i verkstaden',
    imageJpg: oljebyteThumbJpg,
    imageWebp: oljebyteThumbWebp,
  },
  {
    id: 'gat',
    title: 'GAT motorvård',
    summary: 'Vi är auktoriserad återförsäljare av GAT och använder produkterna för att hålla motorns insida och bränslesystemet rena.',
    to: '/gat',
    imageLabel: 'GAT motorvård i verkstaden',
    imageJpg: gatThumbJpg,
    imageWebp: gatThumbWebp,
  },
  {
    id: 'kamrem',
    title: 'Kamrem',
    summary: 'Kamremmen håller motorns rörliga delar i rätt takt och byts enligt rätt intervall för din bil.',
    to: '/kamrem',
    imageLabel: 'Kamremsarbete i verkstaden',
    imageJpg: kamremThumbJpg,
    imageWebp: kamremThumbWebp,
    icon: ClockIcon,
  },
  {
    id: 'koppling',
    title: 'Koppling',
    summary: 'Kopplingen överför kraften mellan motor och växellåda och är en slitdel som kan behöva bytas.',
    to: '/koppling',
    imageLabel: 'Kopplingsdelar på en verkstadsbänk',
    imageJpg: clutchThumbJpg,
    imageWebp: clutchThumbWebp,
  },
  {
    id: 'bromssystem',
    title: 'Bromssystem',
    summary: 'Bromsarna är avgörande för säkerheten, och tidiga tecken kan hjälpa dig att få rätt åtgärd i tid.',
    to: '/bromssystem',
    imageLabel: 'Bromsarbete i verkstaden',
    imageJpg: brakesThumbJpg,
    imageWebp: brakesThumbWebp,
    icon: ShieldIcon,
  },
  {
    id: 'bilbatteri',
    title: 'Bilbatteri',
    summary: 'Bilbatteriet ger startkraft och försörjer elsystemet – rätt batterityp behöver testas och anpassas till bilen.',
    to: '/bilbatteri',
    imageLabel: 'Batterikontroll i verkstaden',
    imageJpg: bilbatteriThumbJpg,
    imageWebp: bilbatteriThumbWebp,
    icon: BoltIcon,
  },
  {
    id: 'stodampare-fjadrar',
    title: 'Stötdämpare & fjädrar',
    summary: 'Stötdämpare och fjädrar hjälper hjulen att hålla kontakt med vägen för stabil och kontrollerad körning.',
    to: '/stodampare-fjadrar',
    imageLabel: 'Ny och sliten stötdämpare bredvid varandra',
    imageJpg: suspensionThumbJpg,
    imageWebp: suspensionThumbWebp,
  },
  {
    id: 'hjullagerbyte',
    title: 'Hjullagerbyte',
    summary: 'Ett hjullager ska ge mjuk och friktionsfri gång; brummande ljud eller vibrationer kan vara tecken på slitage.',
    to: '/hjullagerbyte',
    imageLabel: 'Hjullagerbyte i verkstaden',
    imageJpg: hjullagerThumbJpg,
    imageWebp: hjullagerThumbWebp,
  },
  {
    id: 'avgassystem',
    title: 'Avgassystem',
    summary: 'Avgassystemet dämpar motorljud och samverkar med bilens avgasrening och sensorer.',
    to: '/avgassystem',
    imageLabel: 'Avgassystem i verkstaden',
    imageJpg: exhaustThumbJpg,
    imageWebp: exhaustThumbWebp,
  },
  {
    id: 'drivaxel-drivknutar',
    title: 'Drivaxel & drivknutar',
    summary: 'Drivaxlar och drivknutar för motorkraften till hjulen och behöver fungera utan glapp, läckage eller vibrationer.',
    to: '/drivaxel-drivknutar',
    imageLabel: 'Drivaxelarbete i verkstaden',
    imageJpg: drivaxelThumbJpg,
    imageWebp: drivaxelThumbWebp,
  },
  {
    id: 'styrning-kulleder',
    title: 'Styrning & kulleder',
    summary: 'Styrning och kulleder hjälper bilen att svara stabilt på ratten och hålla rätt väghållning.',
    to: '/styrning-kulleder',
    imageLabel: 'Styrningsarbete i verkstaden',
    imageJpg: steeringThumbJpg,
    imageWebp: steeringThumbWebp,
  },
]

export default function BiltjansterPage() {
  const { openBooking, bookingModal } = useBookingModal()

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="solid" />

      <main className="biltjanster-hub" id="main-content">
        <section className="biltjanster-hub__hero" aria-labelledby="biltjanster-hero-title">
          <div className="biltjanster-hub__wrap biltjanster-hub__hero-inner">
            <p className="bb-eyebrow bb-eyebrow--dark">Hela vårt tjänsteutbud</p>
            <h1 className="biltjanster-hub__title" id="biltjanster-hero-title">
              Våra <span className="biltjanster-hub__accent">biltjänster</span>
            </h1>
            <p className="biltjanster-hub__lead">
              Här hittar du fördjupad information om mekaniska reparationer, vanliga symptom och riktad felsökning – ett samlat ställe för hela vårt tjänsteutbud.
            </p>
            <div className="biltjanster-hub__hero-actions">
              <button type="button" onClick={openBooking} className="bb-btn bb-btn--teal">
                <span>Boka tid</span>
              </button>
              <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                <PhoneIcon aria-hidden="true" />
                <span>Ring {BUSINESS.phone.display}</span>
              </a>
            </div>
          </div>
        </section>

        <section className="biltjanster-hub__guides" aria-label="Serviceguider">
          <div className="biltjanster-hub__wrap">
            <div className="biltjanster-hub__guide-grid">
              {serviceGuides.map((guide, index) => {
                const GuideIcon = guide.icon ?? WrenchIcon
                return (
                  <article
                    className="biltjanster-hub__guide-card"
                    id={guide.id}
                    key={guide.id}
                    aria-labelledby={`${guide.id}-title`}
                  >
                    <div className="biltjanster-hub__guide-media">
                      <span className="biltjanster-hub__guide-badge" aria-hidden="true">
                        <GuideIcon />
                      </span>
                      <span className="biltjanster-hub__guide-num" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <picture>
                        <source srcSet={guide.imageWebp} type="image/webp" />
                        <img className="biltjanster-hub__guide-img" src={guide.imageJpg} alt={guide.imageLabel} loading="lazy" />
                      </picture>
                    </div>

                    <div className="biltjanster-hub__guide-content">
                      <h2 className="biltjanster-hub__guide-title" id={`${guide.id}-title`}>
                        {guide.title}
                      </h2>
                      <p className="biltjanster-hub__guide-desc">{guide.summary}</p>
                      <Link
                        to={guide.to}
                        className="biltjanster-hub__guide-cta"
                        aria-label={`Läs mer om ${guide.title}`}
                      >
                        <span>Läs mer</span>
                        <span className="biltjanster-hub__guide-arrow" aria-hidden="true">
                          <ArrowRightIcon />
                        </span>
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="biltjanster-hub__cta" aria-labelledby="biltjanster-cta-title">
          <div className="biltjanster-hub__wrap biltjanster-hub__cta-inner">
            <div>
              <p className="bb-eyebrow bb-eyebrow--dark">Redo att boka?</p>
              <h2 className="biltjanster-hub__cta-title" id="biltjanster-cta-title">
                Hittar du inte det du söker?
              </h2>
              <p className="biltjanster-hub__cta-desc">
                Märker du ett fel men vet inte vilken tjänst det gäller? Beskriv vad bilen gör – ljud, varningslampor eller hur den känns – när du ringer eller bokar, så hjälper vi dig att hitta rätt åtgärd.
              </p>
            </div>
            <div className="biltjanster-hub__cta-actions">
              <button type="button" onClick={openBooking} className="bb-btn bb-btn--teal">
                <span>Boka tid</span>
              </button>
              <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                <PhoneIcon aria-hidden="true" />
                <span>Ring {BUSINESS.phone.display}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
