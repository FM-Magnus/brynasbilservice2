import { useState, useEffect, useCallback, useRef } from 'react'
import newLogo from '../../assets/images/LOGOTYP_NY.svg'

type HeaderProps = {
  onBookingClick: () => void;
  variant?: 'hero' | 'default';
}

const navLinks = [
  { href: '/#om-oss', label: 'Om oss' },
  { href: '/#tjanster', label: 'Tjänster' },
  { href: '/bilar-till-salu', label: 'Bilar till salu' },
  { href: '/#kontakt', label: 'Kontakt' },
]

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 13h2M14 13h2M8 17h2M14 17h2" />
    </svg>
  )
}

export function Header({ onBookingClick, variant = 'default' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false)
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus())
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => {
      mobileNavRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [closeMenu, menuOpen])

  const handleMobileBooking = () => {
    closeMenu(false)
    window.requestAnimationFrame(() => onBookingClick())
  }

  return (
    <header className={`site-header site-header--${variant}${sticky ? ' scrolled' : ''}`} id="site-header">
      <div className="container">
        <div className="header-inner">
          <a href="/" className="logo" aria-label="Brynäs Bilservice">
            <img src={newLogo} alt="Brynäs Bilservice" width="220" height="73" className="logo__img" loading="eager" />
          </a>

          <nav className="main-nav" aria-label="Huvudnavigation">
            <ul className="nav__links">
              {navLinks.map((l, i) => (
                <li key={`${l.href}-${i}`}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="header-cta">
            <button onClick={onBookingClick} className="btn btn--primary header-booking-button">
              <CalendarIcon />
              Boka tid
            </button>
          </div>

          <button
            ref={menuButtonRef}
            className={`nav-toggle${menuOpen ? ' active' : ''}`}
            id="nav-toggle"
            aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <nav
        ref={mobileNavRef}
        className={`mobile-nav${menuOpen ? ' open' : ''}`}
        id="mobile-nav"
        aria-label="Mobilnavigation"
        hidden={!menuOpen}
      >
        <ul>
          {navLinks.map((l, i) => (
            <li key={`${l.href}-${i}`}><a href={l.href} onClick={() => closeMenu()}>{l.label}</a></li>
          ))}
        </ul>
        <div className="mobile-cta">
          <a href="tel:0705533395" className="btn btn--ghost mb-3 w-full justify-center">
            Ring oss: 070-553 33 95
          </a>
          <button onClick={handleMobileBooking} className="btn btn--primary w-full justify-center">
            Boka tid
          </button>
        </div>
      </nav>
    </header>
  )
}
