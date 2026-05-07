import { useState, useEffect, useCallback } from 'react'
import newLogo from '../../assets/images/LOGOTYP_NY.svg'

 type HeaderProps = {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const navLinks = [
    { href: '#om-oss', label: 'Om oss' },
    { href: '#tjanster', label: 'Tjänster' },
    { href: '#alla-tjanster', label: 'Bilar till salu' },
    { href: '#kontakt', label: 'Kontakt' },
  ]

  return (
    <header className={`site-header${sticky ? ' scrolled' : ''}`} id="site-header">
      <div className="container">
        <div className="header-inner">
          <a href="#" className="logo" aria-label="Brynäs Bilservice">
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
            <button onClick={onBookingClick} className="btn btn--primary">BOKA TID</button>
          </div>

          <button
            className={`nav-toggle${menuOpen ? ' active' : ''}`}
            id="nav-toggle"
            aria-label="Öppna meny"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} id="mobile-nav" aria-label="Mobilnavigation">
        <ul>
          {navLinks.map((l, i) => (
            <li key={`${l.href}-${i}`}><a href={l.href} onClick={closeMenu}>{l.label}</a></li>
          ))}
        </ul>
        <div className="mobile-cta">
          <a href="tel:0705533395" className="btn btn--ghost mb-3 w-full justify-center">
            Ring oss: 070-553 33 95
          </a>
          <button onClick={onBookingClick} className="btn btn--primary w-full justify-center">
            Boka tid
          </button>
        </div>
      </nav>
    </header>
  )
}
