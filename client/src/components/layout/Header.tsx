import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import newLogo from '../../assets/images/LOGOTYP_NY.svg'

type HeaderProps = {
  onBookingClick: () => void;
  variant?: 'hero' | 'default';
}

type NavChild = {
  href: string;
  label: string;
}

type NavLink = {
  href: string;
  label: React.ReactNode;
  children?: NavChild[];
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Start' },
  { href: '/om-oss', label: 'Om oss' },
  {
    href: '/biltjanster',
    label: 'Biltjänster',
    children: [
      {
        href: '/biltjanster',
        label: 'Våra tjänster',
      },
      {
        href: '/service-reparationer#bilservice',
        label: 'Bilservice',
      },
      {
        href: '/oljebyte',
        label: 'Oljebyte',
      },
      {
        href: '/kamrem',
        label: 'Kamrem',
      },
      {
        href: '/koppling',
        label: 'Koppling',
      },
      {
        href: '/bromssystem',
        label: 'Bromssystem',
      },
      {
        href: '/bilbatteri',
        label: 'Bilbatteri',
      },
      {
        href: '/stodampare-fjadrar',
        label: 'Stötdämpare och fjädrar',
      },
      {
        href: '/hjullagerbyte',
        label: 'Hjullagerbyte',
      },
      {
        href: '/avgassystem',
        label: 'Avgassystem',
      },
      {
        href: '/drivaxel-drivknutar',
        label: 'Drivaxel och drivknutar',
      },
      {
        href: '/styrning-kulleder',
        label: 'Styrning och kulleder',
      },
    ],
  },
  { href: '/dackservice', label: 'Däck' },
  { href: '/ac-service', label: 'AC' },
  { href: '/bargning', label: 'Bärgning' },
  {
    href: '/bilar-till-salu',
    label: <span className="nav-multiline"><span>Till</span><span>salu</span></span>
  },
  { href: '/kontakt', label: 'Kontakt' },
]

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 13h2M14 13h2M8 17h2M14 17h2" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m3.25 5.75 4.75 4.5 4.75-4.5" />
    </svg>
  )
}

export function Header({ onBookingClick, variant = 'hero' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const serviceMenuRef = useRef<HTMLLIElement>(null)
  const serviceMenuButtonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

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

  const closeServiceMenu = useCallback((restoreFocus = false) => {
    setServiceMenuOpen(false)
    if (restoreFocus) {
      window.requestAnimationFrame(() => serviceMenuButtonRef.current?.focus())
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

  useEffect(() => {
    if (!serviceMenuOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (!serviceMenuRef.current?.contains(event.target as Node)) {
        closeServiceMenu()
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeServiceMenu(true)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [closeServiceMenu, serviceMenuOpen])

  useEffect(() => {
    closeServiceMenu()
  }, [closeServiceMenu, location.hash, location.pathname])

  const handleMobileBooking = () => {
    closeMenu(false)
    window.requestAnimationFrame(() => onBookingClick())
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If external or mailto/tel, let default browser behavior handle it
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return
    }

    e.preventDefault()
    closeMenu(false)
    closeServiceMenu()

    const [, targetId] = href.split('#')
    if (targetId) {
      navigate(href)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      })
      return
    }

    if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/')
        window.scrollTo(0, 0)
      }
    } else {
      navigate(href)
      window.scrollTo(0, 0)
    }
  }

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  const isNavLinkActive = (link: NavLink) =>
    isLinkActive(link.href) || link.children?.some(child => isLinkActive(child.href.split('#')[0])) === true

  return (
    <header className={`site-header site-header--${variant}${sticky ? ' scrolled' : ''}`} id="site-header">
      <div className="container">
        <div className="header-inner">
          <a
            href="/"
            className="logo"
            aria-label="Brynäs Bilservice - Till startsidan"
            onClick={(e) => handleNavClick(e, '/')}
          >
            <img src={newLogo} alt="Brynäs Bilservice" width="220" height="73" className="logo__img" loading="eager" />
          </a>

          <nav className="main-nav" aria-label="Huvudnavigation">
            <ul className="nav__links">
              {navLinks.map((l, i) => {
                const active = isNavLinkActive(l)
                return (
                  <li
                    key={`${l.href}-${i}`}
                    ref={l.children ? serviceMenuRef : undefined}
                    className={l.children ? 'nav__item--has-menu' : undefined}
                  >
                    {l.children ? (
                      <>
                        <button
                          ref={serviceMenuButtonRef}
                          className={`nav__trigger${active ? ' active' : ''}`}
                          type="button"
                          aria-expanded={serviceMenuOpen}
                          aria-controls="service-navigation-menu"
                          onClick={() => setServiceMenuOpen(open => !open)}
                          onKeyDown={(event) => {
                            if (event.key === 'ArrowDown') {
                              event.preventDefault()
                              setServiceMenuOpen(true)
                              window.requestAnimationFrame(() => {
                                serviceMenuRef.current?.querySelector<HTMLAnchorElement>('.nav__service-link')?.focus()
                              })
                            }
                          }}
                        >
                          {l.label}
                          <ChevronDownIcon />
                        </button>
                        <div
                          className={`nav__service-menu${serviceMenuOpen ? ' is-open' : ''}`}
                          id="service-navigation-menu"
                          aria-label="Biltjänster"
                        >
                          <ul>
                            {l.children.map(child => (
                              <li key={child.href}>
                                <a
                                  className="nav__service-link"
                                  href={child.href}
                                  onClick={(event) => handleNavClick(event, child.href)}
                                >
                                  <span>{child.label}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <a
                        href={l.href}
                        className={active ? 'active' : ''}
                        aria-current={active ? 'page' : undefined}
                        onClick={(e) => handleNavClick(e, l.href)}
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                )
              })}
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
          {navLinks.map((l, i) => {
            const mobileHref = l.children?.[0]?.href ?? l.href
            const active = isNavLinkActive(l)
            return (
              <li key={`${l.href}-${i}`}>
                <a
                  href={mobileHref}
                  className={active ? 'active' : ''}
                  aria-current={active ? 'page' : undefined}
                  onClick={(e) => handleNavClick(e, mobileHref)}
                >
                  {l.label}
                </a>
              </li>
            )
          })}
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
