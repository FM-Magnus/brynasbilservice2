import { SectionHeader } from '../ui/SectionHeader';

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
  { name: 'Elbilsservice — alla märken', isGoldDot: true },
  { name: 'Högvoltssystem & diagnostik', isGoldDot: true },
  { name: 'Växellådsreparationer' },
  { name: 'Bilar till salu — begagnat', isRedVariant: true },
]

export function ServiceList() {
  return (
    <section className="service-list-section" id="alla-tjanster">
      <div className="container">
        <div className="section-header">
          <SectionHeader
            eyebrow="Komplett utbud"
            title={<span>Allt vi <span className="title-accent">utför</span></span>}
          />
        </div>
        <div className="service-list-grid">
          {items.map(item => (
            <div
              className={`service-item fade-up${item.isRedVariant ? ' border-[rgba(204,20,23,0.2)]' : ''}`}
              key={item.name}
            >
              <div
                className={`service-item__dot${item.isRedVariant ? ' bg-(--color-red)' : item.isGoldDot ? ' bg-(--color-gold)' : ''}`}
              />
              <span className="service-item__name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
