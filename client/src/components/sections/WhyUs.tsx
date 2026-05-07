import { ClockIcon } from '../icons/ClockIcon'
import { DollarIcon } from '../icons/DollarIcon'
import { ShieldIcon } from '../icons/ShieldIcon'
import { UsersIcon } from '../icons/UsersIcon'
import { SectionHeader } from '../ui/SectionHeader'

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
    <section className="why-us">
      <div className="container">
        <div className="section-header">
          <SectionHeader
            eyebrow="Varför Brynäs Bilservice"
            title={<span>Det lilla extra som <span className="title-accent">gör skillnad</span></span>}
          />
        </div>
        <div className="why-grid">
          {cards.map(c => (
            <div className="why-card fade-up" key={c.title}>
              <div className="why-card__icon">
                {c.icon}
              </div>
              <h3 className="why-card__title">{c.title}</h3>
              <p className="why-card__desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
