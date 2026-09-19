import { useEffect, useState } from 'react'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { MapPinIcon } from '../components/icons/MapPinIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ChatDotsIcon } from '../components/icons/ChatDotsIcon'
import { CarSaleIcon } from '../components/icons/CarSaleIcon'
import { getPublicVehicles } from '../api/vehicles'
import type { Vehicle } from '../types/vehicle'
import heroWebp from '../assets/images/gallery/workshop/workshop-service-aisle.webp'
import heroJpg from '../assets/images/gallery/workshop/workshop-service-aisle.jpg'

import '../styles/design-tokens.css'
import '../styles/shared-elements.css'
import './BilarTillSalu.css'

// Stock is edited in data/vehicles.ts (or, once live, from /admin) — never here.

const PHONE_HREF = 'tel:+46705533395'
const MAPS_HREF = 'https://maps.google.com/?q=Utmarksv%C3%A4gen+21B+G%C3%A4vle'

const formatPrice = (sek: number) => `${sek.toLocaleString('sv-SE')} kr`
const formatMileage = (km: number) => `${Math.round(km / 10).toLocaleString('sv-SE')} mil`
const vehicleName = (vehicle: Vehicle) => `${vehicle.make} ${vehicle.model}`
const inquiryComment = (vehicle: Vehicle) => `Gäller förfrågan om ${vehicleName(vehicle)} (${vehicle.year})`

type LoadState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; vehicles: Vehicle[] }

function VehicleCard({ vehicle, eager, onInquiry }: { vehicle: Vehicle; eager: boolean; onInquiry: (vehicle: Vehicle) => void }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sold = vehicle.status === 'sold'
  const active = vehicle.images[activeIndex]
  const name = vehicleName(vehicle)

  const specs = [
    { label: 'Årsmodell', value: String(vehicle.year) },
    { label: 'Miltal', value: formatMileage(vehicle.mileageKm) },
    { label: 'Drivmedel', value: vehicle.fuel },
    { label: 'Växellåda', value: vehicle.gearbox },
  ]

  return (
    <article
      className={`bilartillsalu-page__vehicle${sold ? ' bilartillsalu-page__vehicle--sold' : ''}`}
      aria-labelledby={`vehicle-${vehicle.id}-title`}
    >
      <div className="bilartillsalu-page__gallery">
        <div className="bilartillsalu-page__viewer">
          {active ? (
            <picture>
              <source srcSet={active.main.webp} type="image/webp" />
              <img
                src={active.main.jpg}
                alt={active.alt}
                width={active.main.width}
                height={active.main.height}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
              />
            </picture>
          ) : (
            <div className="bilartillsalu-page__viewer-empty">
              <CarSaleIcon />
              <span>Bild kommer snart</span>
            </div>
          )}
          <span className="bilartillsalu-page__price">{formatPrice(vehicle.priceSek)}</span>
          {sold && <span className="bilartillsalu-page__sold-badge">Såld</span>}
        </div>

        {vehicle.images.length > 1 && (
          <div className="bilartillsalu-page__thumbs" role="group" aria-label={`Bilder på ${name}`}>
            {vehicle.images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                className="bilartillsalu-page__thumb"
                aria-pressed={index === activeIndex}
                aria-label={`Visa bild ${index + 1} av ${vehicle.images.length}: ${image.alt}`}
                onClick={() => setActiveIndex(index)}
              >
                <picture>
                  <source srcSet={image.thumb.webp} type="image/webp" />
                  <img src={image.thumb.jpg} alt="" width={image.thumb.width} height={image.thumb.height} loading="lazy" decoding="async" />
                </picture>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bilartillsalu-page__details">
        <p className="bilartillsalu-page__vehicle-meta">{vehicle.color} · {vehicle.year}</p>
        <h3 className="bilartillsalu-page__vehicle-title" id={`vehicle-${vehicle.id}-title`}>{name}</h3>

        <dl className="bilartillsalu-page__specs">
          {specs.map((spec) => (
            <div className="bilartillsalu-page__spec" key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>

        <p className="bilartillsalu-page__description">{vehicle.description}</p>

        {!sold && (
          <div className="bilartillsalu-page__vehicle-actions">
            <button type="button" className="bb-btn bb-btn--ember-solid bilartillsalu-page__inquiry-btn" onClick={() => onInquiry(vehicle)}>
              Skicka förfrågan
            </button>
            <a href={PHONE_HREF} className="bb-btn bilartillsalu-page__btn-outline">
              <PhoneIcon />
              <span>Ring för mer info &amp; provkörning</span>
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

export default function BilarTillSalu() {
  const [load, setLoad] = useState<LoadState>({ status: 'loading' })
  const [modal, setModal] = useState({ open: false, comment: '' })

  useEffect(() => {
    window.scrollTo(0, 0)
    let cancelled = false
    getPublicVehicles()
      .then((vehicles) => { if (!cancelled) setLoad({ status: 'ready', vehicles }) })
      .catch(() => { if (!cancelled) setLoad({ status: 'error' }) })
    return () => { cancelled = true }
  }, [])

  const openBooking = () => setModal({ open: true, comment: '' })
  const openInquiry = (vehicle: Vehicle) => setModal({ open: true, comment: inquiryComment(vehicle) })
  const closeModal = () => setModal((current) => ({ ...current, open: false }))

  const vehicles = load.status === 'ready' ? load.vehicles : []
  const available = vehicles.filter((vehicle) => vehicle.status === 'available')
  const sold = vehicles.filter((vehicle) => vehicle.status === 'sold')

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="overlay" />

      <main className="bilartillsalu-page" id="main-content">
        {/* 1. Hero */}
        <section className="bb-hero bilartillsalu-page__hero" aria-labelledby="bilartillsalu-hero-title">
          <div className="bb-hero__media">
            <picture>
              <source srcSet={heroWebp} type="image/webp" />
              <img src={heroJpg} alt="" width={1920} height={1278} />
            </picture>
          </div>
          <div className="bb-hero__shade" aria-hidden="true" />

          <div className="bb-wrap bb-hero__content">
            <div className="bb-hero__copy bilartillsalu-page__hero-copy">
              <p className="bb-eyebrow bb-eyebrow--dark">Begagnade bilar i Brynäs</p>
              <h1 className="bb-h1 bilartillsalu-page__hero-title" id="bilartillsalu-hero-title">
                <span>Bilar till <span className="bb-accent">salu</span></span>
              </h1>
              <p>
                Alla våra bilar är noggrant genomgångna, kontrollerade och servade av våra egna mekaniker på Brynäs Bilservice. Vi säkerställer att bilen är trygg och trafiksäker innan den säljs.
              </p>
              <div className="bb-hero__actions">
                <a href={PHONE_HREF} className="bb-btn bb-btn--teal bilartillsalu-page__hero-call">
                  <PhoneIcon />
                  <span>Ring: 070-553 33 95</span>
                </a>
                <button type="button" className="bb-btn bb-btn--ember bilartillsalu-page__hero-book" onClick={openBooking}>
                  Boka tid för visning
                </button>
              </div>
              <ul className="bilartillsalu-page__hero-meta">
                <li>
                  <MapPinIcon />
                  <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer">Utmarksvägen 21B, 802 91 Gävle</a>
                </li>
                <li>
                  <ClockIcon />
                  <span>Mån–Fre 08:00–17:00 (Lör förfrågan)</span>
                </li>
              </ul>
            </div>

            <ul className="bb-trust-row bilartillsalu-page__trust" aria-label="Därför kan du lita på våra bilar">
              <li className="bb-trust-row__item">
                <span className="bb-icon-bare" aria-hidden="true"><ShieldHeartIcon /></span>
                <span className="bb-trust-row__text">
                  <strong>Verkstadsinspekterade</strong>
                  <span>Genomgångna och testade av våra egna mekaniker före försäljning.</span>
                </span>
              </li>
              <li className="bb-trust-row__item">
                <span className="bb-icon-bare" aria-hidden="true"><CheckIcon /></span>
                <span className="bb-trust-row__text">
                  <strong>Färdiga för leverans</strong>
                  <span>Besiktigade, provkörda och redo att rulla ut direkt.</span>
                </span>
              </li>
              <li className="bb-trust-row__item">
                <span className="bb-icon-bare" aria-hidden="true"><ChatDotsIcon /></span>
                <span className="bb-trust-row__text">
                  <strong>Personlig kontakt</strong>
                  <span>Tydlig rådgivning och personlig provkörning utan mellanhänder.</span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. Listings */}
        <section className="bilartillsalu-page__listings" aria-labelledby="bilartillsalu-listings-title" aria-busy={load.status === 'loading'}>
          <div className="bb-wrap">
            <header className="bilartillsalu-page__section-head">
              <p className="bb-eyebrow">Aktuellt lager</p>
              <h2 className="bb-h2" id="bilartillsalu-listings-title">Tillgängliga bilar just nu</h2>
            </header>

            {load.status === 'loading' && (
              <div className="bilartillsalu-page__vehicle bilartillsalu-page__vehicle--skeleton" aria-hidden="true">
                <div className="bilartillsalu-page__gallery"><div className="bilartillsalu-page__viewer" /></div>
                <div className="bilartillsalu-page__details" />
              </div>
            )}

            {load.status === 'error' && (
              <div className="bilartillsalu-page__notice" role="status">
                <span className="bb-icon-badge" aria-hidden="true"><CarSaleIcon /></span>
                <h3>Vi kunde inte hämta bilarna just nu</h3>
                <p>Försök igen om en stund, eller ring oss så berättar vi vad vi har i lager.</p>
                <a href={PHONE_HREF} className="bb-btn bb-btn--ember-solid">
                  <PhoneIcon />
                  <span>Ring oss på 070-553 33 95</span>
                </a>
              </div>
            )}

            {load.status === 'ready' && available.length === 0 && (
              <div className="bilartillsalu-page__notice bilartillsalu-page__empty">
                <span className="bb-icon-badge" aria-hidden="true"><ShieldHeartIcon /></span>
                <h3>Inga bilar i lager just nu</h3>
                <p>
                  Vi får löpande in nya noggrant kontrollerade bilar. Hör gärna av dig med dina önskemål så berättar vi vad som är på gång in.
                </p>
                <a href={PHONE_HREF} className="bb-btn bb-btn--ember-solid">
                  <PhoneIcon />
                  <span>Ring oss på 070-553 33 95</span>
                </a>
              </div>
            )}

            {available.length > 0 && (
              <div className="bilartillsalu-page__vehicle-list">
                {available.map((vehicle, index) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} eager={index === 0} onInquiry={openInquiry} />
                ))}
              </div>
            )}

            {sold.length > 0 && (
              <section className="bilartillsalu-page__sold" aria-labelledby="bilartillsalu-sold-title">
                <p className="bb-eyebrow">Arkiv</p>
                <h2 className="bilartillsalu-page__sold-title" id="bilartillsalu-sold-title">Nyligen sålda bilar</h2>
                <div className="bilartillsalu-page__vehicle-list bilartillsalu-page__vehicle-list--sold">
                  {sold.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} eager={false} onInquiry={openInquiry} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>

        {/* 3. Closing reassurance */}
        <section className="bilartillsalu-page__closing" aria-labelledby="bilartillsalu-closing-title">
          <div className="bb-wrap">
            <div className="bb-card--trust bilartillsalu-page__closing-card">
              <span className="bb-icon-badge bb-card--trust__icon" aria-hidden="true"><ShieldHeartIcon /></span>
              <div className="bb-card--trust__text">
                <p className="bb-eyebrow">Frågor om våra bilar?</p>
                <h2 className="bilartillsalu-page__closing-title" id="bilartillsalu-closing-title">Vill du provköra eller sälja din bil?</h2>
                <p className="bb-lead">
                  Du är varmt välkommen att ringa oss eller svänga förbi verkstaden på Utmarksvägen i Brynäs för att titta på bilen eller diskutera bilaffärer.
                </p>
              </div>
              <div className="bilartillsalu-page__closing-actions">
                <a href={PHONE_HREF} className="bb-btn bb-btn--ember-solid">
                  <PhoneIcon />
                  <span>Ring 070-553 33 95</span>
                </a>
                <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="bb-btn bilartillsalu-page__btn-outline">
                  <MapPinIcon />
                  <span>Hitta till oss</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* key remounts the modal when its context changes, so a vehicle
          inquiry always starts from that vehicle's prefilled comment. */}
      <BookingFormModal key={modal.comment} isOpen={modal.open} onClose={closeModal} initialComment={modal.comment} />
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
