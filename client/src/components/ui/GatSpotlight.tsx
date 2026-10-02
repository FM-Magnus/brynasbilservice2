import { useEffect, useState } from 'react'
import './GatSpotlight.css'

export interface GatSpotlightSlide {
  /** Short name on the tab, e.g. "Engine Flush". */
  label: string
  /** The slide is a poster with text baked in, so the alt text repeats that text. */
  alt: string
  webp640: string
  webp1200: string
}

// Long enough to read a poster (about 35 words) before it changes.
const SLIDE_INTERVAL_MS = 10000
const SIZES = '(min-width: 1100px) 700px, (min-width: 901px) 55vw, calc(100vw - 2rem)'

/**
 * Rotating product posters for the GAT page. Autoplay pauses on hover and focus,
 * has a visible pause button, never starts under reduced motion, and the tabs
 * jump straight to a poster. Only this page uses it.
 */
export function GatSpotlight({ slides }: { slides: readonly GatSpotlightSlide[] }) {
  const [active, setActive] = useState(0)
  const [userPaused, setUserPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [hoverPaused, setHoverPaused] = useState(false)
  const playing = !userPaused && !hoverPaused

  useEffect(() => {
    if (!playing || slides.length < 2) return
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), SLIDE_INTERVAL_MS)
    return () => window.clearTimeout(timer)
  }, [playing, active, slides.length])

  return (
    <div
      className="gat-spotlight"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
    >
      <div className="gat-spotlight__stage">
        {slides.map((slide, i) => (
          <picture key={slide.label} className={`gat-spotlight__slide${i === active ? ' is-active' : ''}`} aria-hidden={i !== active}>
            <img
              src={slide.webp1200}
              srcSet={`${slide.webp640} 640w, ${slide.webp1200} 1200w`}
              sizes={SIZES}
              alt={slide.alt}
              loading="lazy"
              decoding="async"
              width={1200}
              height={800}
            />
          </picture>
        ))}
      </div>
      <div className="gat-spotlight__controls">
        <div className="gat-spotlight__tabs" role="group" aria-label="Välj produkt">
          {slides.map((slide, i) => (
            <button
              key={slide.label}
              type="button"
              className={`gat-spotlight__tab${i === active ? ' is-active' : ''}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {slide.label}
            </button>
          ))}
        </div>
        <button type="button" className="gat-spotlight__toggle" onClick={() => setUserPaused((p) => !p)} aria-pressed={userPaused}>
          {userPaused ? 'Starta bildspel' : 'Pausa bildspel'}
        </button>
      </div>
    </div>
  )
}
