import sakarWorks from '../../assets/images/sakar_works.jpg'
import { CheckIcon } from '../icons/CheckIcon'
import { SectionHeader } from '../ui/SectionHeader'

const features = [
  'Märkesoberoende — alla bilmärken',
  'Vi kontaktar alltid kunden vid tilläggsarbeten',
  'Modern diagnostikutrustning',
  'Inga onödiga reparationer',
  'Snabb handläggningstid',
  'Tydliga och ärliga priser',
]

export function About() {
  return (
    <section className="about" id="om-oss">
      <div className="container">
        <div className="about__inner">
          <div className="about__images">
            <img src={sakarWorks} alt="Sakar arbetar på motor i Brynäs Bilservice verkstad" width="900" height="502" loading="lazy" className="about__img-main" />
            <img src={sakarWorks} alt="Ägaren Sakar Fouad vid arbetsbanken" width="900" height="502" loading="lazy" className="about__img-accent" />
            <div className="about__badge">Grundat 2021</div>
          </div>

          <div className="about__text">
            <div className="section-header">
              <h2 className="section-title">
                <SectionHeader
                  eyebrow="Om oss"
                  title={<span>Lokal verkstad med <span className="title-accent">hjärta</span></span>}
                />
              </h2>
            </div>
            <p className="about__body">Brynäs Bilservice grundades 2021 och är en personlig, oberoende bilverkstad i Brynäs, Gävle. Vi är en av få verkstäder i regionen med specialistkompetens på nästa generations elbilar — inklusive kinesiska märken som Aiways, BYD och Exlantix som ofta saknar auktoriserade verkstäder i Sverige.</p>
            <p className="about__body">Vi arbetar med alla bilmärken, från enkla oljebyten till komplexa motorbyten och växellådsrenoveringar. Hittar vi något extra under arbetet ringer vi alltid kunden först. Inget görs utan ditt godkännande — inga överraskningar på fakturan.</p>
            <div className="about__features">
              {features.map(f => (
                <div className="about__feature" key={f}>
                  <CheckIcon className="about__feature-icon" />
                  <span className="about__feature-text">{f}</span>
                </div>
              ))}
            </div>
            <a href="tel:0705533395" className="btn btn--primary">Ring oss direkt</a>
          </div>
        </div>
      </div>
    </section>
  )
}
