import { useState } from 'react'
import peugeot307_1 from '../assets/images/peugeot-307-cc-1.jpg'
import peugeot307_2 from '../assets/images/peugeot-307-cc-2.jpg'
import peugeot307_3 from '../assets/images/peugeot-307-cc-3.jpg'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { MapPinIcon } from '../components/icons/MapPinIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

interface Car {
  id: number
  make: string
  model: string
  year: number
  mileage: number
  fuel: string
  gearbox: string
  price: number
  description: string
  color: string
  images?: string[]   // first image is the main one
  sold?: boolean
}

// ── Edit this list when stock changes ──────────────────────────────────────
// To add a car: import photos at the top of the file, then add an entry here.
// mileage is in km — displayed as mil automatically.
// Add sold: true to move a car to the "Nyligen sålda" section.

const cars: Car[] = [
  {
    id: 1,
    make: 'Peugeot',
    model: '307 CC 2.0',
    year: 2006,
    mileage: 141147,
    fuel: 'Bensin',
    gearbox: 'Manuell',
    price: 39900,
    color: 'Mörkgrå',
    description:
      'Snygg och välskött cabriolet med elektriskt hopfällbart hardtop. Nybesiktigad maj 2026 och godkänd till juli 2027. ' +
      'Dragkrok. Aluminiumfälgar. Inga anmärkningar i senaste besiktning. ' +
      'Perfekt sommarbil — ring oss för att boka en provkörning.',
    images: [peugeot307_3, peugeot307_1, peugeot307_2],
  },
]
// ──────────────────────────────────────────────────────────────────────────

function formatPrice(price: number) {
  return price.toLocaleString('sv-SE') + ' kr'
}

function formatMileage(km: number) {
  return km.toLocaleString('sv-SE') + ' mil'
}

function CarCard({ car }: { car: Car }) {
  const [activeImg, setActiveImg] = useState(0)
  const images = car.images ?? []
  const mainImg = images[activeImg]

  return (
    <article className={`car-card${car.sold ? ' car-card--sold' : ''}`}>
      <div className="car-card__image-wrap">
        {mainImg ? (
          <img
            src={mainImg}
            alt={`${car.make} ${car.model}`}
            className="car-card__image"
            loading="lazy"
          />
        ) : (
          <div className="car-card__image-placeholder">
            <svg viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M8 22 L14 10 L50 10 L56 22 L56 26 L8 26 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
              <circle cx="18" cy="26" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="46" cy="26" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M16 10 L20 16 L44 16 L48 10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            </svg>
            <span>Bild kommer snart</span>
          </div>
        )}
        {car.sold && <div className="car-card__sold-badge">Såld</div>}
        <div className="car-card__price-badge">{formatPrice(car.price)}</div>
      </div>

      {/* Thumbnail strip — only shown when there are multiple images */}
      {images.length > 1 && (
        <div className="car-card__thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              className={`car-card__thumb${i === activeImg ? ' car-card__thumb--active' : ''}`}
              onClick={() => setActiveImg(i)}
              aria-label={`Visa bild ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <div className="car-card__body">
        <div className="car-card__header">
          <h2 className="car-card__title">{car.make} {car.model}</h2>
          <span className="car-card__year">{car.year}</span>
        </div>

        <div className="car-card__specs">
          <span className="car-card__spec">{formatMileage(Math.round(car.mileage / 10))}</span>
          <span className="car-card__spec-dot" />
          <span className="car-card__spec">{car.fuel}</span>
          <span className="car-card__spec-dot" />
          <span className="car-card__spec">{car.gearbox}</span>
          <span className="car-card__spec-dot" />
          <span className="car-card__spec">{car.color}</span>
        </div>

        <p className="car-card__desc">{car.description}</p>

        <a href="tel:+46705533395" className="car-card__cta">
          <PhoneIcon className="car-card__cta-icon" />
          <span>Ring för mer info & provkörning</span>
        </a>
      </div>
    </article>
  )
}

export default function BilarTillSalu() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const available = cars.filter(c => !c.sold)
  const sold = cars.filter(c => c.sold)

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />

      <main className="cars-page">
        {/* Page hero */}
        <section className="cars-page__hero">
          <div className="container">
            <div className="cars-page__hero-content">
              <div className="section-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                <span>Begagnade bilar i Brynäs</span>
              </div>
              <h1 className="cars-page__title">
                Bilar till <span className="title-accent">salu</span>
              </h1>
              <p className="cars-page__lead">
                Alla våra bilar är noggrant genomgångna, kontrollerade och servade av våra egna mekaniker på Brynäs Bilservice. Vi säkerställer att bilen är trygg och trafiksäker innan den säljs.
              </p>

              <div className="cars-page__hero-actions">
                <a href="tel:+46705533395" className="cars-page__btn cars-page__btn--primary">
                  <PhoneIcon className="cars-page__btn-icon" />
                  <span>Ring: 070-553 33 95</span>
                  <span className="cars-page__btn-arrow" aria-hidden="true">
                    <ArrowRightIcon />
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="cars-page__btn cars-page__btn--outline"
                >
                  Boka tid för visning
                </button>
              </div>

              <div className="cars-page__meta-bar">
                <div className="cars-page__meta-item">
                  <MapPinIcon />
                  <a
                    href="https://maps.google.com/?q=Utmarksv%C3%A4gen+21B+G%C3%A4vle"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Utmarksvägen 21B, 802 91 Gävle
                  </a>
                </div>
                <div className="cars-page__meta-item">
                  <ClockIcon />
                  <span>Mån–Fre 08:00–17:00 (Lör förfrågan)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="cars-page__trust-section">
          <div className="container">
            <div className="cars-page__trust-grid">
              <div className="cars-page__trust-item">
                <div className="cars-page__trust-icon">
                  <ShieldHeartIcon />
                </div>
                <div>
                  <h3 className="cars-page__trust-title">Verkstadsinspekterade</h3>
                  <p className="cars-page__trust-desc">Genomgångna och testade av våra egna mekaniker före försäljning.</p>
                </div>
              </div>
              <div className="cars-page__trust-item">
                <div className="cars-page__trust-icon">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="cars-page__trust-title">Färdiga för leverans</h3>
                  <p className="cars-page__trust-desc">Besiktigade, provkörda och redo att rulla ut direkt.</p>
                </div>
              </div>
              <div className="cars-page__trust-item">
                <div className="cars-page__trust-icon">
                  <PhoneIcon />
                </div>
                <div>
                  <h3 className="cars-page__trust-title">Personlig kontakt</h3>
                  <p className="cars-page__trust-desc">Tydlig rådgivning och personlig provkörning utan mellanhänder.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Car listings */}
        <section className="cars-page__listings">
          <div className="container">
            <div className="cars-page__listings-header">
              <div className="section-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                <span>Aktuellt lager</span>
              </div>
              <h2 className="cars-page__listings-title">Tillgängliga bilar just nu</h2>
            </div>

            {available.length === 0 ? (
              <div className="cars-page__empty">
                <div className="cars-page__empty-icon" aria-hidden="true">
                  <ShieldHeartIcon />
                </div>
                <h3 className="cars-page__empty-title">Inga bilar i lager just nu</h3>
                <p className="cars-page__empty-desc">
                  Vi får löpande in nya noggrant kontrollerade bilar. Hör gärna av dig med dina önskemål så berättar vi vad som är på gång in.
                </p>
                <a href="tel:+46705533395" className="cars-page__btn cars-page__btn--primary">
                  <PhoneIcon className="cars-page__btn-icon" />
                  <span>Ring oss på 070-553 33 95</span>
                </a>
              </div>
            ) : (
              <div className="cars-grid">
                {available.map(car => <CarCard key={car.id} car={car} />)}
              </div>
            )}

            {sold.length > 0 && (
              <div className="cars-page__sold">
                <div className="section-eyebrow">
                  <span className="eyebrow-line" aria-hidden="true" />
                  <span>Arkiv</span>
                </div>
                <h3 className="cars-page__sold-title">Nyligen sålda bilar</h3>
                <div className="cars-grid cars-grid--sold">
                  {sold.map(car => <CarCard key={car.id} car={car} />)}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Closing card */}
        <section className="cars-page__closing">
          <div className="container">
            <div className="cars-page__closing-card">
              <div className="cars-page__closing-content">
                <div className="section-eyebrow justify-center">
                  <span className="eyebrow-line" aria-hidden="true" />
                  <span>Frågor om våra bilar?</span>
                  <span className="eyebrow-line" aria-hidden="true" />
                </div>
                <h2 className="cars-page__closing-title">Vill du provköra eller sälja din bil?</h2>
                <p className="cars-page__closing-desc">
                  Du är varmt välkommen att ringa oss eller svänga förbi verkstaden på Utmarksvägen i Brynäs för att titta på bilen eller diskutera bilaffärer.
                </p>
                <div className="cars-page__hero-actions justify-center">
                  <a href="tel:+46705533395" className="cars-page__btn cars-page__btn--primary">
                    <PhoneIcon className="cars-page__btn-icon" />
                    <span>Ring 070-553 33 95</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Utmarksv%C3%A4gen+21B+G%C3%A4vle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cars-page__btn cars-page__btn--outline"
                  >
                    Hitta till oss
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
