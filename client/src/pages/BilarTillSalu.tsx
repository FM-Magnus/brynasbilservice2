import { useState } from 'react'
import peugeot307_1 from '../assets/images/peugeot-307-cc-1.jpg'
import peugeot307_2 from '../assets/images/peugeot-307-cc-2.jpg'
import peugeot307_3 from '../assets/images/peugeot-307-cc-3.jpg'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { MapPinIcon } from '../components/icons/MapPinIcon'

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
              className={`car-card__thumb${i === activeImg ? ' car-card__thumb--active' : ''}`}
              onClick={() => setActiveImg(i)}
              aria-label={`Bild ${i + 1}`}
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

        <a href="tel:+46705533395" className="car-card__cta btn btn--primary">
          <PhoneIcon className="w-4 h-4" />
          Ring för mer info
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
        {/* Page header */}
        <section className="cars-page__hero">
          <div className="container">
            <div className="section-eyebrow">Begagnade bilar</div>
            <h1 className="cars-page__title">
              Bilar till <span className="title-accent">salu</span>
            </h1>
            <p className="cars-page__subtitle">
              Alla våra bilar är genomgångna och besiktigade av oss på Brynäs Bilservice.
              Ring oss på <a href="tel:+46705533395" className="text-gold">070-553 33 95</a> för provkörning.
            </p>
            <div className="cars-page__location">
              <MapPinIcon />
              <span>Utmarksvägen 21B, 802 91 Gävle — Tis–Fre 08–16</span>
            </div>
          </div>
        </section>

        {/* Car listings */}
        <section className="cars-page__listings">
          <div className="container">
            {available.length === 0 ? (
              <div className="cars-page__empty">
                <p>Inga bilar till salu just nu.</p>
                <p>Hör av dig så berättar vi vad som är på gång.</p>
                <a href="tel:+46705533395" className="btn btn--primary mt-4">
                  <PhoneIcon className="w-4 h-4" />
                  Ring oss
                </a>
              </div>
            ) : (
              <div className="cars-grid">
                {available.map(car => <CarCard key={car.id} car={car} />)}
              </div>
            )}

            {sold.length > 0 && (
              <div className="cars-page__sold">
                <h3 className="cars-page__sold-title">Nyligen sålda</h3>
                <div className="cars-grid cars-grid--sold">
                  {sold.map(car => <CarCard key={car.id} car={car} />)}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
