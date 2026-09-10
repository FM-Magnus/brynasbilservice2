import { BoltIcon } from '../icons/BoltIcon'
import { CheckIcon } from '../icons/CheckIcon'

const items = [
  { name: 'Bilservice & oljebyte' },
  { name: 'Bromsbyte & bromskontroll' },
  { name: 'Däckbyte & montering' },
  { name: 'Hjulinställning & balansering' },
  { name: 'AC-service & reparation' },
  { name: 'Motorservice & motorbyten' },
  { name: 'Felsökning & diagnostik' },
  { name: 'Kamremsbyten' },
  { name: 'Kopplingsbyten' },
  { name: 'Elarbete & elsystem' },
  { name: 'Avgassystem' },
  { name: 'Besiktning & förkontroll' },
  { name: 'Batteribyte & kontroll' },
  { name: 'Dragkroksmontage' },
  { name: 'Däckhotell — förvaring' },
  { name: 'Elbilsservice — alla märken', isEV: true },
  { name: 'Högvoltssystem & diagnostik', isEV: true },
  { name: 'Växellådsreparationer' },
  { name: 'Bilar till salu — begagnat', link: '/bilar-till-salu', linkText: 'Se bilar' },
]

export function ServiceList() {
  return (
    <section className="service-list-section" id="alla-tjanster" aria-labelledby="all-services-title">
      <div className="container">
        <header className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            Komplett utbud
          </div>
          <h2 className="section-title" id="all-services-title">
            Allt vi <span className="title-accent">utför</span>
          </h2>
          <p className="section-desc">
            Vi är en fullserviceverkstad med bred kompetens för alla bilmärken. Här ser du vårt samlade utbud av verkstadsarbeten.
          </p>
        </header>
        <div className="service-list-grid">
          {items.map(item => (
            <div
              className={`service-item fade-up${item.isEV ? ' service-item--ev' : ''}`}
              key={item.name}
            >
              <div className="service-item__left">
                <span
                  className={`service-item__icon${item.isEV ? ' service-item__icon--ev' : ''}`}
                  aria-hidden="true"
                >
                  {item.isEV ? <BoltIcon /> : <CheckIcon />}
                </span>
                <span className="service-item__name">{item.name}</span>
              </div>
              {item.link ? (
                <a href={item.link} className="service-item__link">
                  {item.linkText} →
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
