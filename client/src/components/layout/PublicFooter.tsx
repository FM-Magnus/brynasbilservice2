import { Link } from 'react-router-dom'
import brandLogo from '../../assets/images/brand/brynas-bilservice-logo.svg'
import taglineImg from '../../assets/images/footer/vi-haller-din-bil-i-rullning.webp'
import { FacebookIcon } from '../icons/FacebookIcon'
import { InstagramIcon } from '../icons/InstagramIcon'
import { ShieldIcon } from '../icons/ShieldIcon'
import { UsersIcon } from '../icons/UsersIcon'
import { WrenchIcon } from '../icons/WrenchIcon'
import { PhoneIcon } from '../icons/PhoneIcon'
import { ClockIcon } from '../icons/ClockIcon'
import { BUSINESS, weekdayHours } from '../../data/business'
import './PublicFooter.css'

export interface PublicFooterProps {
  onBookingClick?: () => void
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 9 5.7a2 2 0 0 0 2 0L22 7" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 10c0 6.5-8.5 12-8.5 12S3.5 16.5 3.5 10a8.5 8.5 0 1 1 17 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function SendArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
      <path d="m22 2-11 11" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 9h16" />
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 13h2M14 13h2M8 17h2M14 17h2" />
    </svg>
  )
}

const quickLinks = [
  { label: 'Start', to: '/' },
  { label: 'Om oss', to: '/om-oss' },
  { label: 'Biltjänster', to: '/biltjanster' },
  { label: 'Felsökning', to: '/felsokning' },
  { label: 'Däck', to: '/dackservice' },
  { label: 'AC', to: '/ac-service' },
  { label: 'Bärgning', to: '/bargning' },
  { label: 'Till salu', to: '/bilar-till-salu' },
  { label: 'Kontakt', to: '/kontakt' },
]

export function PublicFooter({ onBookingClick }: PublicFooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bb-footer" role="contentinfo">
      <div className="bb-footer__wrap">
        <div className="bb-footer__grid">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="bb-footer__col bb-footer__col--brand">
            <Link to="/" className="bb-footer__logo-link" aria-label="Brynäs Bilservice start">
              <img src={brandLogo} alt="Brynäs Bilservice logotyp" className="bb-footer__logo" width="190" height="47" />
            </Link>

            <div className="bb-footer__eyebrow">
              <span className="bb-footer__eyebrow-dash" aria-hidden="true" />
              <span>Din lokala bilverkstad i Brynäs, Gävle</span>
            </div>

            <p className="bb-footer__desc">
              Vi erbjuder professionell bilservice, reparationer och däckservice för alla bilmärken. Personlig service, trygghet och ärliga priser – sedan 2021.
            </p>

            <div className="bb-footer__trust-row">
              <div className="bb-footer__trust-item bb-footer__trust-item--amber">
                <i><ShieldIcon /></i>
                <div>
                  <b>Tryggt</b>
                  <small>och enkelt</small>
                </div>
              </div>
              <div className="bb-footer__trust-item bb-footer__trust-item--cyan">
                <i><UsersIcon /></i>
                <div>
                  <b>Personlig</b>
                  <small>service</small>
                </div>
              </div>
              <div className="bb-footer__trust-item bb-footer__trust-item--amber">
                <i><WrenchIcon /></i>
                <div>
                  <b>Erfarna</b>
                  <small>mekaniker</small>
                </div>
              </div>
            </div>

            <div className="bb-footer__signature-wrap">
              <img
                src={taglineImg}
                alt="Vi håller din bil i rullning!"
                className="bb-footer__signature-img"
                loading="lazy"
                width="220"
                height="54"
              />
            </div>
          </div>

          {/* Column 2: Snabba Länkar */}
          <div className="bb-footer__col bb-footer__col--links">
            <h2 className="bb-footer__heading">Snabba länkar</h2>
            <ul className="bb-footer__nav-list">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="bb-footer__nav-link">
                    <span>{link.label}</span>
                    <span className="bb-footer__chevron" aria-hidden="true">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Kontakt */}
          <div className="bb-footer__col bb-footer__col--contact">
            <h2 className="bb-footer__heading">Kontakt</h2>
            <div className="bb-footer__contact-items">
              <div className="bb-footer__contact-card">
                <div className="bb-footer__contact-badge bb-footer__contact-badge--amber">
                  <PhoneIcon />
                </div>
                <div className="bb-footer__contact-info">
                  <span className="bb-footer__contact-label">Telefon</span>
                  <a href={BUSINESS.phone.href} className="bb-footer__contact-val">{BUSINESS.phone.display}</a>
                </div>
              </div>

              <div className="bb-footer__contact-card">
                <div className="bb-footer__contact-badge bb-footer__contact-badge--amber">
                  <MailIcon />
                </div>
                <div className="bb-footer__contact-info">
                  <span className="bb-footer__contact-label">E-post</span>
                  <a href={BUSINESS.email.href} className="bb-footer__contact-val">{BUSINESS.email.address}</a>
                </div>
              </div>

              <div className="bb-footer__contact-card">
                <div className="bb-footer__contact-badge bb-footer__contact-badge--light">
                  <PinIcon />
                </div>
                <div className="bb-footer__contact-info">
                  <span className="bb-footer__contact-label">Besöksadress</span>
                  <span className="bb-footer__contact-val">
                    Utmarksvägen 21B<br />802 91 Gävle
                  </span>
                </div>
              </div>

              <div className="bb-footer__contact-card bb-footer__contact-card--action">
                <div className="bb-footer__contact-badge bb-footer__contact-badge--cyan">
                  <SendArrowIcon />
                </div>
                <div className="bb-footer__contact-info">
                  <a
                    href={BUSINESS.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bb-footer__maps-link"
                  >
                    Öppna i Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Öppettider & CTA */}
          <div className="bb-footer__col bb-footer__col--hours">
            <h2 className="bb-footer__heading">Öppettider</h2>
            
            <div className="bb-footer__hours-box">
              <div className="bb-footer__clock-badge">
                <ClockIcon />
              </div>
              <dl className="bb-footer__hours-dl">
                <div className="bb-footer__hours-row">
                  <dt>Måndag – Fredag</dt>
                  <dd>{weekdayHours({ dash: ' – ' })}</dd>
                </div>
                <div className="bb-footer__hours-row">
                  <dt>Lördag</dt>
                  <dd>{BUSINESS.hours.saturday}</dd>
                </div>
                <div className="bb-footer__hours-row">
                  <dt>Söndag</dt>
                  <dd>{BUSINESS.hours.sunday}</dd>
                </div>
              </dl>
            </div>

            <div className="bb-footer__hours-divider" />

            <div className="bb-footer__actions">
              {onBookingClick ? (
                <button
                  type="button"
                  onClick={onBookingClick}
                  className="bb-footer__btn-book"
                >
                  <CalendarIcon />
                  <span>BOKA TID →</span>
                </button>
              ) : (
                <Link
                  to="/kontakt#boka"
                  className="bb-footer__btn-book"
                >
                  <CalendarIcon />
                  <span>BOKA TID →</span>
                </Link>
              )}

              <a href={BUSINESS.phone.href} className="bb-footer__call-link">
                <i className="bb-footer__call-icon"><PhoneIcon /></i>
                <span>RING OSS: {BUSINESS.phone.display}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Sub-footer bottom bar */}
        <div className="bb-footer__bottom">
          <div className="bb-footer__bottom-left">
            <p>© {currentYear} Brynäs Bilservice AB - Org.nr 559343-5307 - Gävle</p>
            <p className="bb-footer__bottom-sub">Din lokala bilverkstad. För en tryggare vardag på vägen.</p>
          </div>

          <div className="bb-footer__bottom-social">
            <a
              href="https://www.facebook.com/p/Brynäs-Bilservice-AB-100076623266130/"
              target="_blank"
              rel="noopener noreferrer"
              className="bb-footer__social-btn"
              aria-label="Följ Brynäs Bilservice på Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bb-footer__social-btn"
              aria-label="Följ Brynäs Bilservice på Instagram"
            >
              <InstagramIcon size={18} />
            </a>
          </div>

          <div className="bb-footer__bottom-right">
            <Link to="/kontakt">Integritetspolicy</Link>
            <span aria-hidden="true" className="bb-footer__dot">•</span>
            <Link to="/kontakt">Cookies</Link>
            <span aria-hidden="true" className="bb-footer__dot">•</span>
            <span>Skapad och förvaltas av Fenrir Media AB</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PublicFooter
