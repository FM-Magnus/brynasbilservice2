import { BoltIcon } from '../icons/BoltIcon'
import { PhoneIcon } from '../icons/PhoneIcon'

const brands = [
  { name: 'Aiways' },
  { name: 'Exlantix', special: true },
  { name: 'BYD' },
  { name: 'Tesla' },
  { name: 'Polestar' },
  { name: 'Xpeng' },
  { name: 'Nio' },
  { name: 'ZEEKR' },
  { name: 'MG' },
  { name: 'Hongqi' },
  { name: 'MAXUS' },
  { name: 'DFSK' },
  { name: 'Fisker' },
  { name: '+ Alla märken', more: true },
]

export function EV() {
  return (
    <section className="ev-section" id="elbilar" aria-labelledby="ev-title">
      <div className="container">
        <div className="ev-card">
          <div className="ev-inner">
            <div className="ev-text">
              <div className="section-eyebrow section-eyebrow--dark">
                <span className="eyebrow-line" aria-hidden="true" />
                Framtidens bilar
              </div>
              <h2 className="ev-title" id="ev-title">
                Specialister på <span className="title-accent">elbilar</span>
              </h2>
              <p className="ev-desc">
                Vi är en av Gävleborgs få verkstäder med kompetens att serva nya kinesiska elbilsmärken som saknar auktoriserade verkstäder i Sverige. Våra mekaniker är utbildade att hantera högvoltssystem och moderna diagnostiksystem.
              </p>
              <div className="ev-partners">
                <p className="ev-partner-text">
                  Vi samarbetar med <strong>Däckleader</strong> och <strong>Autobutler</strong> — beställ däck online och välj oss som monteringsstation, eller jämför priser via Autobutler.
                </p>
              </div>
              <div className="ev-action">
                <a href="tel:0705533395" className="ev-cta-btn">
                  <PhoneIcon className="ev-cta-icon" />
                  <span>Ring för offert: 070-553 33 95</span>
                </a>
              </div>
            </div>
            <div className="ev-brands">
              <div className="ev-brands__label">
                <BoltIcon className="ev-brands__bolt" />
                <span>Vi servar exempelvis</span>
              </div>
              <div className="ev-brands__grid">
                {brands.map(b => (
                  <span
                    key={b.name}
                    className={`ev-brand${b.special ? ' ev-brand--special' : ''}${b.more ? ' ev-brand--more' : ''}`}
                  >
                    {b.name}
                  </span>
                ))}
              </div>
              <div className="ev-badge-note">
                Högvoltsutbildade tekniker med certifierad diagnostik
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
