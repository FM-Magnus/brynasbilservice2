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
import { MailIcon } from '../icons/MailIcon'
import { MapPinIcon } from '../icons/MapPinIcon'
import { SendIcon } from '../icons/SendIcon'
import { CalendarIcon } from '../icons/CalendarIcon'
import { BUSINESS, weekdayHours } from '../../data/business'
import { publicNavigation } from '../../data/publicNavigation'
import './PublicFooter.css'

export interface PublicFooterProps {
  onBookingClick?: () => void
}

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
              {/* Same top-level items as the header menu (its sub-menu is left out). */}
              {publicNavigation.map(link => (
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
                  <MapPinIcon />
                </div>
                <div className="bb-footer__contact-info">
                  <span className="bb-footer__contact-label">Besöksadress</span>
                  <span className="bb-footer__contact-val">
                    {BUSINESS.address.street}<br />{BUSINESS.address.postalCode} {BUSINESS.address.city}
                  </span>
                </div>
              </div>

              <div className="bb-footer__contact-card bb-footer__contact-card--action">
                <div className="bb-footer__contact-badge bb-footer__contact-badge--cyan">
                  <SendIcon />
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
            <p>© {currentYear} {BUSINESS.legalName} - Org.nr {BUSINESS.orgNumber} - {BUSINESS.address.city}</p>
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
            {/* Integritetspolicy and Cookies links removed 2026-09-24: both pointed at
                /kontakt and no such page exists yet. Restore them with a real page. */}
            <span>Skapad och förvaltas av Fenrir Media AB</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PublicFooter
