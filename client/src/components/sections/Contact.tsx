import { ArrowRightIcon } from '../icons/ArrowRightIcon'
import { ClockIcon } from '../icons/ClockIcon'
import { MapPinIcon } from '../icons/MapPinIcon'
import { PhoneIcon } from '../icons/PhoneIcon'

type ContactProps = {
  onBookingClick?: () => void
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

const hours = [
  { days: 'Måndag – Fredag', time: '08:00 – 17:00' },
  { days: 'Lördag', time: 'Förfrågan' },
  { days: 'Söndag', time: 'Stängt' },
]

export function Contact({ onBookingClick }: ContactProps) {
  return (
    <section className="contact-combined-section" id="kontakt" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-combined-card">
          <div className="contact-combined-inner">

            {/* Left side: Heading, lead & CTAs */}
            <div className="contact-combined-main">
              <div className="section-eyebrow section-eyebrow--dark">
                <span className="eyebrow-line" aria-hidden="true" />
                Kontakt &amp; Öppettider
              </div>
              <h2 className="contact-combined-title" id="contact-heading">
                Behöver din bil <span className="title-accent">hjälp?</span>
              </h2>
              <p className="contact-combined-lead">
                Boka tid online eller ring oss direkt så hjälper vi dig att hitta en tid som passar.
              </p>
              <div className="contact-combined-actions">
                {onBookingClick && (
                  <button
                    type="button"
                    onClick={onBookingClick}
                    className="contact-combined-btn contact-combined-btn--primary"
                  >
                    <span>Boka tid</span>
                    <span className="contact-combined-btn-arrow" aria-hidden="true">
                      <ArrowRightIcon />
                    </span>
                  </button>
                )}
                <a
                  href="tel:+46705533395"
                  className="contact-combined-btn contact-combined-btn--outline"
                >
                  <PhoneIcon className="contact-combined-btn-icon" />
                  <span>Ring: 070-553 33 95</span>
                </a>
              </div>
            </div>

            {/* Right side: Contact details & Opening hours */}
            <div className="contact-combined-info">
              <div className="contact-combined-panel">

                {/* Direct contact channels */}
                <div className="contact-combined-channels">
                  {/* Address */}
                  <div className="contact-combined-item">
                    <div className="contact-combined-icon" aria-hidden="true">
                      <MapPinIcon />
                    </div>
                    <div className="contact-combined-item-body">
                      <span className="contact-combined-label">Besöksadress</span>
                      <p className="contact-combined-value">
                        Utmarksvägen 21B, 802 91 Gävle
                      </p>
                      <a
                        href="https://maps.google.com/?q=Utmarksv%C3%A4gen+21B+G%C3%A4vle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-combined-map-link"
                      >
                        Öppna i Google Maps →
                      </a>
                    </div>
                  </div>

                  {/* Telephone & Email in a 2-col subgrid */}
                  <div className="contact-combined-subrow">
                    <div className="contact-combined-item">
                      <div className="contact-combined-icon" aria-hidden="true">
                        <PhoneIcon />
                      </div>
                      <div className="contact-combined-item-body">
                        <span className="contact-combined-label">Telefon</span>
                        <p className="contact-combined-value">
                          <a href="tel:+46705533395" className="contact-combined-text-link">
                            070-553 33 95
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="contact-combined-item">
                      <div className="contact-combined-icon" aria-hidden="true">
                        <MailIcon className="contact-combined-icon-svg" />
                      </div>
                      <div className="contact-combined-item-body">
                        <span className="contact-combined-label">E-post</span>
                        <p className="contact-combined-value">
                          <a href="mailto:info@brynasbilservice.se" className="contact-combined-text-link">
                            info@brynasbilservice.se
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opening Hours Divider & Block */}
                <div className="contact-combined-hours-block">
                  <div className="contact-combined-hours-header">
                    <div className="contact-combined-icon contact-combined-icon--small" aria-hidden="true">
                      <ClockIcon />
                    </div>
                    <span className="contact-combined-label">Öppettider</span>
                  </div>
                  <dl className="contact-combined-hours-list">
                    {hours.map(h => (
                      <div key={h.days} className="contact-combined-hours-row">
                        <dt>{h.days}</dt>
                        <dd>{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
