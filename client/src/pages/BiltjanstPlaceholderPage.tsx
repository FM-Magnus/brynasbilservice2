import { useEffect, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

type BiltjanstPlaceholderPageProps = {
  title: string
}

export function BiltjanstPlaceholderPage({ title }: BiltjanstPlaceholderPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />

      <main className="services-page">
        <section className="services-page__hero" aria-labelledby="biltjanst-placeholder-title">
          <div className="container">
            <div className="services-page__hero-layout">
              <div className="services-page__hero-content">
                <h1 className="services-page__title" id="biltjanst-placeholder-title">{title}</h1>
                <p className="services-page__lead">Mer information kommer.</p>
                <div className="services-page__hero-actions">
                  <button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">
                    Boka tid
                  </button>
                  <a href="tel:0705533395" className="services-page__btn services-page__btn--outline">
                    <PhoneIcon className="services-page__btn-icon" />
                    <span>Ring 070-553 33 95</span>
                  </a>
                </div>
              </div>

              <div className="services-page__image-placeholder" role="img" aria-label={`Platshållare för framtida bild om ${title}`}>
                <WrenchIcon aria-hidden="true" />
                <span>{title}</span>
                <small>Bild kommer</small>
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
