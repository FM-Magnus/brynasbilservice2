import { ClockIcon } from '../icons/ClockIcon'
import { DollarIcon } from '../icons/DollarIcon'
import { ShieldIcon } from '../icons/ShieldIcon'
import { UsersIcon } from '../icons/UsersIcon'

const cards = [
  {
    icon: <UsersIcon />,
    title: 'Personlig service',
    desc: 'Du möter alltid samma mekaniker. Ingen nummerlapp, ingen callcenter — bara en ärlig person som bryr sig om din bil.',
  },
  {
    icon: <ClockIcon />,
    title: 'Snabb service',
    desc: 'Vi vet att du behöver din bil. Vi eftersträvar att utföra arbetet samma dag eller dagen efter — utan lång väntetid.',
  },
  {
    icon: <DollarIcon />,
    title: 'Schyssta priser',
    desc: 'Utan kedjemarginaler och stora overheadkostnader kan vi erbjuda konkurrenskraftiga priser. Du betalar för arbetet — inget annat.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Ärlighet först',
    desc: 'Vi utför aldrig arbete utan att ha pratat med dig först. Inget görs "för säkerhets skull" om det inte behövs.',
  },
]

export function WhyUs() {
  return (
    <section className="why-us" aria-labelledby="why-us-title">
      <div className="container">
        <header className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            Varför Brynäs Bilservice
          </div>
          <h2 className="section-title" id="why-us-title">
            Det lilla extra som <span className="title-accent">gör skillnad</span>
          </h2>
          <p className="section-desc">
            När du lämnar din bil hos oss kan du lita på ett personligt bemötande, snabba ledtider och ärliga priser utan krångel.
          </p>
        </header>
        <div className="why-grid">
          {cards.map(c => (
            <article className="why-card fade-up" key={c.title}>
              <div className="why-card__icon" aria-hidden="true">
                {c.icon}
              </div>
              <h3 className="why-card__title">{c.title}</h3>
              <p className="why-card__desc">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
