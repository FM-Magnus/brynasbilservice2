import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import brandLogo from '../../assets/images/brand/brynas-bilservice-logo.svg'
import { publicNavigation, type PublicNavigationItem } from '../../data/publicNavigation'
import { BUSINESS } from '../../data/business'
import './PublicHeader.css'

type PublicHeaderProps = {
  onBookingClick: () => void
  variant?: 'overlay' | 'solid'
}

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /><path d="M8 13h2M14 13h2M8 17h2M14 17h2" /></svg>
}

function ChevronIcon() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.25 5.75 4.75 4.5 4.75-4.5" /></svg>
}

function MenuIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
}

function CloseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16.8v3a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3.1A19 19 0 0 1 4.3 12a19.5 19.5 0 0 1-3.1-8.5A2 2 0 0 1 3.2 1.3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1l-.9.9a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.8a2 2 0 0 1 1.7 2.1Z" /></svg>
}

function routePath(to: string) {
  return to.split('#')[0]
}

export function PublicHeader({ onBookingClick, variant = 'overlay' }: PublicHeaderProps) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const mobileToggleRef = useRef<HTMLButtonElement>(null)
  const mobilePanelRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesTriggerRef = useRef<HTMLButtonElement>(null)

  const closeMobileMenu = useCallback((restoreFocus = false) => {
    setMobileOpen(false)
    if (restoreFocus) window.requestAnimationFrame(() => mobileToggleRef.current?.focus())
  }, [])

  const closeServicesMenu = useCallback((restoreFocus = false) => {
    setServicesOpen(false)
    if (restoreFocus) window.requestAnimationFrame(() => servicesTriggerRef.current?.focus())
  }, [])

  useEffect(() => {
    const updateStickyState = () => setSticky(window.scrollY > 60)
    updateStickyState()
    window.addEventListener('scroll', updateStickyState, { passive: true })
    return () => window.removeEventListener('scroll', updateStickyState)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => mobilePanelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMobileMenu(true)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [closeMobileMenu, mobileOpen])

  useEffect(() => {
    if (!servicesOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) closeServicesMenu()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeServicesMenu(true)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [closeServicesMenu, servicesOpen])

  useEffect(() => {
    closeMobileMenu()
    closeServicesMenu()
  }, [closeMobileMenu, closeServicesMenu, location.hash, location.pathname])

  const isActive = (item: PublicNavigationItem) => {
    if (item.to === '/') return location.pathname === '/'
    if (location.pathname === routePath(item.to)) return true
    return item.children?.some((child) => location.pathname === routePath(child.to)) ?? false
  }

  const handleLinkClick = () => {
    closeMobileMenu()
    closeServicesMenu()
  }

  const handleBookingClick = () => {
    closeMobileMenu()
    onBookingClick()
  }

  return createPortal(
    <header className={`public-header public-header--${variant}${sticky ? ' public-header--sticky' : ''}`}>
      <div className="public-header__inner">
        <Link className="public-header__brand" to="/" aria-label="Brynäs Bilservice – till startsidan" onClick={handleLinkClick}>
          <img src={brandLogo} alt="Brynäs Bilservice" />
        </Link>

        <nav className="public-header__desktop-nav" aria-label="Huvudnavigation">
          {publicNavigation.map((item) => {
            const active = isActive(item)
            if (!item.children) {
              return (
                <Link key={item.to} to={item.to} className={`public-header__nav-link${active ? ' is-active' : ''}`} aria-current={active ? 'page' : undefined} onClick={handleLinkClick}>{item.label}</Link>
              )
            }

            return (
              <div className="public-header__services" key={item.to} ref={servicesRef}>
                <button ref={servicesTriggerRef} className={`public-header__nav-link public-header__services-trigger${active ? ' is-active' : ''}`} type="button" aria-expanded={servicesOpen} aria-controls="public-service-navigation" onClick={() => setServicesOpen((open) => !open)} onKeyDown={(event) => {
                  if (event.key !== 'ArrowDown') return
                  event.preventDefault()
                  setServicesOpen(true)
                  window.requestAnimationFrame(() => servicesRef.current?.querySelector<HTMLAnchorElement>('.public-header__service-link')?.focus())
                }}>
                  {item.label}<ChevronIcon />
                </button>
                <div className={`public-header__services-menu${servicesOpen ? ' is-open' : ''}`} id="public-service-navigation" aria-label="Biltjänster">
                  {item.children.map((child) => <Link className="public-header__service-link" key={child.to} to={child.to} onClick={handleLinkClick}>{child.label}</Link>)}
                </div>
              </div>
            )
          })}
        </nav>

        <button className="public-header__booking" type="button" onClick={handleBookingClick}><CalendarIcon />Boka tid</button>
        <button ref={mobileToggleRef} className="public-header__menu-toggle" type="button" aria-label={mobileOpen ? 'Stäng meny' : 'Öppna meny'} aria-expanded={mobileOpen} aria-controls="public-mobile-navigation" onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <CloseIcon /> : <MenuIcon />}</button>
      </div>

      <nav ref={mobilePanelRef} className="public-header__mobile-panel" id="public-mobile-navigation" aria-label="Mobilnavigation" hidden={!mobileOpen}>
        {publicNavigation.map((item) => <Link key={item.to} to={item.to} className={`public-header__mobile-link${isActive(item) ? ' is-active' : ''}`} aria-current={isActive(item) ? 'page' : undefined} onClick={handleLinkClick}>{item.label}</Link>)}
        <div className="public-header__mobile-actions">
          <a className="public-header__mobile-call" href={BUSINESS.phone.href}><PhoneIcon />Ring oss: {BUSINESS.phone.display}</a>
          <button className="public-header__mobile-booking" type="button" onClick={handleBookingClick}>Boka tid</button>
        </div>
      </nav>
    </header>,
    document.body,
  )
}
