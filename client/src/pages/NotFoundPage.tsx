import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { BookingFormModal } from '../components/BookingForm'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { BUSINESS } from '../data/business'

// Catch-all route (`*` in main.tsx). Without it an unknown address rendered an
// empty page with no header. Built only from the shared hero pattern, so it has
// no stylesheet of its own.
export default function NotFoundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <main id="main-content">
        <section className="bb-hero" aria-labelledby="not-found-title">
          <PublicHeader onBookingClick={openModal} variant="overlay" />
          <div className="bb-wrap bb-hero__content">
            <div className="bb-hero__copy">
              <p className="bb-eyebrow bb-eyebrow--dark">Sidan hittades inte</p>
              <h1 className="bb-h1" id="not-found-title">
                <span>Den här sidan</span>
                <span className="bb-accent">finns inte</span>
              </h1>
              <p>
                Adressen kan vara felstavad, eller så har sidan flyttats. Gå till startsidan eller ring oss, så hjälper vi dig vidare.
              </p>
              <div className="bb-hero__actions">
                <Link to="/" className="bb-btn bb-btn--teal">
                  <span>Till startsidan</span>
                  <ArrowRightIcon aria-hidden="true" />
                </Link>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                  <PhoneIcon aria-hidden="true" />
                  <span>Ring oss nu</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={isModalOpen} onClose={closeModal} />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
