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
import { SectionHeader } from '../ui/SectionHeader'

const cards = [
  {
    img: imgRepair,
    alt: 'Mekaniker arbetar i motorrummet',
    w: 800, h: 450,
    icon: <WrenchIcon />,
    title: 'Bilservice & Reparationer',
    desc: 'Oljebyte, bromsar, koppling, kamrem, avgassystem och mycket mer. Vi arbetar med alla bilmärken och följer tillverkarens rekommendationer.',
    linkText: 'Boka tid',
    linkHref: '#booking-form',
  },
  {
    img: imgDiagnosis,
    alt: 'Diagnostikutrustning kopplad till bil',
    w: 800, h: 450,
    icon: <MonitorIcon />,
    title: 'Felsökning & Diagnostik',
    desc: 'Modern diagnostikutrustning för alla bilmärken. Vi läser av felkoder, analyserar elektronik och identifierar problem snabbt och säkert.',
    linkText: 'Boka tid',
    linkHref: '#booking-form',
  },
  {
    img: imgAC,
    alt: 'AC-service på bil',
    w: 800, h: 450,
    icon: <SnowflakeIcon />,
    title: 'AC-Service',
    desc: 'Vi fyller på och servar AC-anläggningen på alla bilmärken. Regelbunden AC-service ger bättre komfort och förlänger systemets livslängd.',
    linkText: 'BOKA TID',
    linkHref: '#booking-form',
  },
  {
    img: imgTyres,
    alt: 'Däckbyte och däckservice',
    w: 800, h: 450,
    icon: <TireIcon />,
    title: 'Däckservice & Däckhotell',
    desc: 'Däckbyte, montering, balansering och hjulinställning. Vi erbjuder även däckhotell — vi förvarar dina däck säkert och tvättar dem inför säsongsskiftet.',
    linkText: 'Boka tid',
    linkHref: '#booking-form',
  },
  {
    img: imgTow,
    alt: 'Bärgningsbil transporterar fordon',
    w: 800, h: 450,
    icon: <TruckIcon />,
    title: 'Bärgning & Transport',
    desc: 'Vi hjälper dig när bilen inte går att köra. Vi erbjuder biltransport och bärgningshjälp i Gävleområdet.',
    linkText: 'KONTAKTA OSS',
    linkHref: '#kontakt',
  },
  {
    img: imgCarBuy,
    alt: 'Begagnade bilar till salu',
    w: 800, h: 450,
    icon: <CarSaleIcon />,
    title: 'Bilar till salu',
    desc: 'Vi säljer kvalitetskontrollerade begagnade bilar. Varje bil har gåtts igenom av våra mekaniker — du vet vad du köper.',
    linkText: 'SE VÅRA BILAR',
    linkHref: '/bilar-till-salu',
    isRedVariant: true,
  },
]

export function Services() {
  return (
    <section className="services" id="tjanster">
      <div className="container">
        <div className="section-header">
          <SectionHeader
            eyebrow="Vad vi erbjuder"
            title={<span><span className="text-white">Våra</span> <span className="title-accent">tjänster</span></span>}
            description="Vi utför alla typer av bilarbeten — från enkel service till komplexa motorreparationer. Alltid märkesoberoende, alltid ärliga priser."
          />
        </div>

        <div className="services__grid">
          {cards.map(c => (
            <article className="service-card fade-up" key={c.title}>
              <img src={c.img} alt={c.alt} width={c.w} height={c.h} loading="lazy" className="service-card__image" />
              <div className="service-card__body">
                <div className={`service-card__icon${c.isRedVariant ? ' border-[rgba(204,20,23,0.4)] bg-[rgba(204,20,23,0.08)] text-(--color-red)' : ''}`}>
                  {c.icon}
                </div>
                <h3 className="service-card__title">{c.title}</h3>
                <p className="service-card__desc">{c.desc}</p>
                <a href={c.linkHref} className={`service-card__link${c.isRedVariant ? ' text-(--color-red-light)!' : ''}`}>
                  {c.linkText}{' '}
                  <ArrowRightIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
