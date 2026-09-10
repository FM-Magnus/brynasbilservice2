import imgRepair from '../../assets/images/servicekort_repair.jpg'
import imgDiagnosis from '../../assets/images/servicecard_diagnosis.jpg'
import imgAC from '../../assets/images/servicekort_AC.jpg'
import imgTyres from '../../assets/images/servicekort_tyres.jpg'
import imgTow from '../../assets/images/servicekort_tow.jpg'
import imgCarBuy from '../../assets/images/servicekort_carbuy.jpg'
import { ArrowRightIcon } from '../icons/ArrowRightIcon'
import { CarSaleIcon } from '../icons/CarSaleIcon'
import { MonitorIcon } from '../icons/MonitorIcon'
import { SnowflakeIcon } from '../icons/SnowflakeIcon'
import { TireIcon } from '../icons/TireIcon'
import { TruckIcon } from '../icons/TruckIcon'
import { WrenchIcon } from '../icons/WrenchIcon'

type ServicesProps = {
  onBookingClick?: () => void
}

const cards = [
  {
    num: '01',
    img: imgRepair,
    alt: 'Mekaniker arbetar i motorrummet',
    w: 800, h: 450,
    icon: <WrenchIcon />,
    title: 'Bilservice & Reparationer',
    desc: 'Oljebyte, bromsar, koppling, kamrem, avgassystem och mycket mer. Vi arbetar med alla bilmärken och följer tillverkarens rekommendationer.',
    actionType: 'booking' as const,
    linkText: 'Boka tid',
  },
  {
    num: '02',
    img: imgDiagnosis,
    alt: 'Diagnostikutrustning kopplad till bil',
    w: 800, h: 450,
    icon: <MonitorIcon />,
    title: 'Felsökning & Diagnostik',
    desc: 'Modern diagnostikutrustning för alla bilmärken. Vi läser av felkoder, analyserar elektronik och identifierar problem snabbt och säkert.',
    actionType: 'booking' as const,
    linkText: 'Boka tid',
  },
  {
    num: '03',
    img: imgAC,
    alt: 'AC-service på bil',
    w: 800, h: 450,
    icon: <SnowflakeIcon />,
    title: 'AC-Service',
    desc: 'Vi fyller på och servar AC-anläggningen på alla bilmärken. Regelbunden AC-service ger bättre komfort och förlänger systemets livslängd.',
    actionType: 'booking' as const,
    linkText: 'Boka tid',
  },
  {
    num: '04',
    img: imgTyres,
    alt: 'Däckbyte och däckservice',
    w: 800, h: 450,
    icon: <TireIcon />,
    title: 'Däckservice & Däckhotell',
    desc: 'Däckbyte, montering, balansering och hjulinställning. Vi erbjuder även däckhotell — vi förvarar dina däck säkert och tvättar dem inför säsongsskiftet.',
    actionType: 'booking' as const,
    linkText: 'Boka tid',
  },
  {
    num: '05',
    img: imgTow,
    alt: 'Bärgningsbil transporterar fordon',
    w: 800, h: 450,
    icon: <TruckIcon />,
    title: 'Bärgning & Transport',
    desc: 'Vi hjälper dig när bilen inte går att köra. Vi erbjuder biltransport och bärgningshjälp i Gävleområdet.',
    actionType: 'link' as const,
    linkText: 'Kontakta oss',
    linkHref: '#kontakt',
  },
  {
    num: '06',
    img: imgCarBuy,
    alt: 'Begagnade bilar till salu',
    w: 800, h: 450,
    icon: <CarSaleIcon />,
    title: 'Bilar till salu',
    desc: 'Vi säljer kvalitetskontrollerade begagnade bilar. Varje bil har gåtts igenom av våra mekaniker — du vet vad du köper.',
    actionType: 'link' as const,
    linkText: 'Se våra bilar',
    linkHref: '/bilar-till-salu',
  },
]

export function Services({ onBookingClick }: ServicesProps) {
  return (
    <section className="services" id="tjanster" aria-labelledby="services-title">
      <div className="container">
        <header className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            Vad vi erbjuder
          </div>
          <h2 className="section-title" id="services-title">
            Våra <span className="title-accent">tjänster</span>
          </h2>
          <p className="section-desc">
            Vi utför alla typer av bilarbeten — från enkel service till komplexa motorreparationer. Alltid märkesoberoende, alltid ärliga priser.
          </p>
        </header>

        <div className="services__grid">
          {cards.map(c => (
            <article className="service-card fade-up" key={c.title}>
              <div className="service-card__media">
                <img
                  src={c.img}
                  alt={c.alt}
                  width={c.w}
                  height={c.h}
                  loading="lazy"
                  className="service-card__image"
                />
                <span className="service-card__badge" aria-hidden="true">{c.num}</span>
              </div>
              <div className="service-card__body">
                <div className="service-card__top">
                  <div className="service-card__icon" aria-hidden="true">
                    {c.icon}
                  </div>
                  <h3 className="service-card__title">{c.title}</h3>
                </div>
                <p className="service-card__desc">{c.desc}</p>
                {c.actionType === 'booking' ? (
                  <button
                    type="button"
                    onClick={onBookingClick}
                    className="service-card__btn"
                    aria-label={`Boka tid för ${c.title}`}
                  >
                    <span>{c.linkText}</span>
                    <span className="service-card__arrow" aria-hidden="true">
                      <ArrowRightIcon />
                    </span>
                  </button>
                ) : (
                  <a
                    href={c.linkHref}
                    className="service-card__btn"
                  >
                    <span>{c.linkText}</span>
                    <span className="service-card__arrow" aria-hidden="true">
                      <ArrowRightIcon />
                    </span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
