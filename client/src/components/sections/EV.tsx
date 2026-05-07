import { SectionHeader } from '../ui/SectionHeader';

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
    <section className="ev-section" id="elbilar">
      <div className="container">
        <div className="ev-inner">
          <div className="ev-text">
            <SectionHeader
              eyebrow="Framtidens bilar"
              title={<span>Specialister på <span className="title-accent">elbilar</span></span>}
              description={
                <>
                  Vi är en av Gävleborgs få verkstäder med kompetens att serva nya kinesiska elbilsmärken som saknar auktoriserade verkstäder i Sverige. Våra mekaniker är utbildade att hantera högvoltssystem och moderna diagnostiksystem.<br /><br />
                  Vi samarbetar med <strong className="text-white">Däckleader</strong> och <strong className="text-white">Autobutler</strong> — beställ däck online och välj oss som monteringsstation, eller jämför priser via Autobutler.
                </>
              }
            />
            <a href="tel:0705533395" className="btn btn--primary">Ring för offert</a>
          </div>
          <div className="ev-brands">
            <div className="ev-brands__label">Vi servar exempelvis</div>
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
          </div>
        </div>
      </div>
    </section>
  )
}
