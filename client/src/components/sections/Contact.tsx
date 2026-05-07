import { useEffect, useRef } from 'react'
import { ClockIcon } from '../icons/ClockIcon'
import { MapPinIcon } from '../icons/MapPinIcon'
import { PhoneIcon } from '../icons/PhoneIcon'
import { SectionHeader } from '../ui/SectionHeader'

const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
const hours = [
  ['Måndag', 'Stängt / Förfrågan'],
  ['Tisdag', '08:00–16:00'],
  ['Onsdag', '08:00–16:00'],
  ['Torsdag', '08:00–16:00'],
  ['Fredag', '08:00–16:00'],
  ['Lördag', 'Stängt / Förfrågan'],
  ['Söndag', 'Stängt'],
]

export function Contact() {
  const tableRef = useRef<HTMLTableSectionElement>(null)

  useEffect(() => {
    if (!tableRef.current) return
    const todayName = days[new Date().getDay()]
    const rows = tableRef.current.querySelectorAll('tr')
    rows.forEach(row => {
      const firstCell = row.querySelector('td')
      if (firstCell && firstCell.textContent === todayName) {
        row.classList.add('today')
      }
    })
  }, [])

  return (
    <section className="contact-section" id="kontakt">
      <div className="container">
        <SectionHeader
          eyebrow="Hitta oss"
          title={<span>Kontakt &amp; <span className="title-accent">Öppettider</span></span>}
          description="Vi finns i Brynäs, Gävle. Välkommen att ringa eller komma förbi!"
        />
        <div className="contact-grid">

          <div className="contact-card">
            <div className="contact-card__icon">
              <MapPinIcon />
            </div>
            <h3 className="contact-card__title">Hitta oss</h3>
            <div className="contact-card__content">
              <p>Utmarksvägen 21B</p>
              <p>802 91 Gävle</p>
              <p className="mt-2 text-[0.85rem] text-(--color-text-muted)">Brynäs industriområde</p>
              <br />
              <a href="https://maps.google.com/?q=Utmarksvägen+21B+Gävle" target="_blank" rel="noopener noreferrer">Öppna i Google Maps →</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <ClockIcon />
            </div>
            <h3 className="contact-card__title">Öppettider</h3>
            <div className="contact-card__content">
              <table className="hours-table" aria-label="Öppettider per dag">
                <tbody ref={tableRef}>
                  {hours.map(([day, time]) => (
                    <tr key={day}><td>{day}</td><td>{time}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <PhoneIcon />
            </div>
            <h3 className="contact-card__title">Ring oss</h3>
            <div className="contact-card__content">
              <p className="mb-2">Telefon:</p>
              <p className="mb-4"><a href="tel:+46705533395" className="font-heading text-[1.2rem] font-bold">070-553 33 95</a></p>
              <p className="mb-4 text-[0.85rem] text-(--color-text-muted)">Vi svarar vardagar 08:00–16:00</p>
              <a href="https://www.facebook.com/p/Bryn%C3%A4s-Bilservice-AB-100076623266130/" target="_blank" rel="noopener noreferrer" className="text-[0.85rem] text-(--color-gold)">Följ oss på Facebook →</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
