import { ArrowRightIcon } from '../icons/ArrowRightIcon'
import { MonitorIcon } from '../icons/MonitorIcon'
import { SnowflakeIcon } from '../icons/SnowflakeIcon'
import { TireIcon } from '../icons/TireIcon'
import { WrenchIcon } from '../icons/WrenchIcon'

type ServicesProps = {
  onBookingClick?: () => void
}

const previewServices = [
  {
    id: 'bilservice-reparationer',
    title: 'Bilservice och reparationer',
    desc: 'Underhåll, oljebyte, bromsar, kamrem och mekaniska reparationer enligt biltillverkarens föreskrifter.',
    icon: <WrenchIcon />,
  },
  {
    id: 'felsokning-diagnostik',
    title: 'Felsökning och diagnostik',
    desc: 'Datoriserad felsökning, felkodsläsning och noggrann analys av modern fordonselektronik.',
    icon: <MonitorIcon />,
  },
  {
    id: 'dackservice-dackhotell',
    title: 'Däckservice och däckhotell',
    desc: 'Däckskifte, balansering, hjulinställning och bekväm förvaring i vårt däckhotell.',
    icon: <TireIcon />,
  },
  {
    id: 'ac-service',
    title: 'AC-service',
    desc: 'Felsökning, provtryckning, läckagesökning och påfyllning av köldmedium för god kupékomfort.',
    icon: <SnowflakeIcon />,
  },
]

export function Services({ onBookingClick }: ServicesProps) {
  return (
    <section className="services-preview" id="tjanster" aria-labelledby="services-preview-title">
      <div className="container">
        <header className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            Vad vi hjälper dig med
          </div>
          <h2 className="section-title" id="services-preview-title">
            Service för <span className="title-accent">hela bilen</span>
          </h2>
          <p className="section-desc">
            Vi utför allt från regelbunden service och mekaniska reparationer till avancerad diagnostik, däckservice och AC-service för alla bilmärken.
          </p>
        </header>

        <div className="services-preview__grid">
          {previewServices.map(service => (
            <article className="services-preview__card" key={service.id}>
              <div className="services-preview__icon" aria-hidden="true">
                {service.icon}
              </div>
              <div className="services-preview__body">
                <h3 className="services-preview__card-title">{service.title}</h3>
                <p className="services-preview__card-desc">{service.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="services-preview__actions">
          <a href="/tjanster" className="services-preview__btn services-preview__btn--primary">
            <span>Se alla tjänster</span>
            <span className="services-preview__arrow" aria-hidden="true">
              <ArrowRightIcon />
            </span>
          </a>
          {onBookingClick && (
            <button
              type="button"
              onClick={onBookingClick}
              className="services-preview__btn services-preview__btn--secondary"
            >
              Boka tid för service
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
