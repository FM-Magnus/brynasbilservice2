import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { getGalleryImages } from '../api/gallery'
import type { GalleryImage } from '../types/gallery'

import { BUSINESS } from '../data/business'
import '../styles/design-tokens.css'
import '../styles/shared-elements.css'
import './GalleryPage.css'

// Images come from src/assets/galleri/ (see LÄSMIG.md there) via api/gallery.ts —
// never import gallery images or the data module here.

const PHONE_HREF = BUSINESS.phone.href
const STAGE_SIZES = '(min-width: 1440px) 920px, (min-width: 1024px) 70vw, 92vw'
const SWIPE_MIN_PX = 40

// React 18.2 only forwards fetch priority as a lowercase attribute.
const HIGH_PRIORITY = { fetchpriority: 'high' } as Record<string, string>

type LoadState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; images: GalleryImage[] }

const srcSet = (image: GalleryImage, format: 'webp' | 'jpg') =>
  image.thumb.width === image.main.width
    ? `${image.main[format]} ${image.main.width}w`
    : `${image.thumb[format]} ${image.thumb.width}w, ${image.main[format]} ${image.main.width}w`

const pad = (value: number, total: number) => String(value).padStart(Math.max(2, String(total).length), '0')

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function preload(image: GalleryImage) {
  const img = new Image()
  img.sizes = STAGE_SIZES
  img.srcset = srcSet(image, 'webp')
  img.src = image.main.jpg
}

interface StageProps {
  image: GalleryImage
  eager: boolean
  onSwipe: (direction: 1 | -1) => void
  onLoaded: () => void
}

function GalleryStage({ image, eager, onSwipe, onLoaded }: StageProps) {
  const start = useRef<{ x: number; y: number } | null>(null)

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') return
    start.current = { x: event.clientX, y: event.clientY }
  }
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const origin = start.current
    start.current = null
    if (!origin) return
    const dx = event.clientX - origin.x
    const dy = event.clientY - origin.y
    if (Math.abs(dx) >= SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy)) onSwipe(dx < 0 ? 1 : -1)
  }

  return (
    <div
      className="galleri-page__stage"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { start.current = null }}
    >
      <picture key={image.slug}>
        <source type="image/webp" srcSet={srcSet(image, 'webp')} sizes={STAGE_SIZES} />
        <img
          className="galleri-page__stage-img"
          src={image.main.jpg}
          srcSet={srcSet(image, 'jpg')}
          sizes={STAGE_SIZES}
          alt={image.alt}
          width={image.main.width}
          height={image.main.height}
          loading="eager"
          decoding="async"
          draggable={false}
          onLoad={onLoaded}
          {...(eager ? HIGH_PRIORITY : {})}
        />
      </picture>
    </div>
  )
}

interface CaptionProps {
  image: GalleryImage
  index: number
  total: number
  onStep: (direction: 1 | -1) => void
}

function GalleryCaption({ image, index, total, onStep }: CaptionProps) {
  return (
    <div className="galleri-page__caption">
      <div className="galleri-page__caption-text">
        <p className="galleri-page__category">{image.category}</p>
        <p className="galleri-page__title">{image.title}</p>
        <p className="galleri-page__description">{image.description || ' '}</p>
      </div>
      {total > 1 && (
        <div className="galleri-page__nav">
          <button type="button" className="galleri-page__arrow galleri-page__arrow--prev" onClick={() => onStep(-1)} aria-label="Föregående bild">
            <ArrowRightIcon />
          </button>
          <span className="galleri-page__counter" aria-hidden="true">
            {pad(index + 1, total)} <span className="galleri-page__counter-sep">/</span> {pad(total, total)}
          </span>
          <button type="button" className="galleri-page__arrow galleri-page__arrow--next" onClick={() => onStep(1)} aria-label="Nästa bild">
            <ArrowRightIcon />
          </button>
        </div>
      )}
    </div>
  )
}

interface StripProps {
  images: GalleryImage[]
  activeIndex: number
  onSelect: (index: number, focus: boolean) => void
}

function ThumbnailStrip({ images, activeIndex, onSelect }: StripProps) {
  const stripRef = useRef<HTMLDivElement>(null)

  // Keep the active thumbnail visible by scrolling the strip itself — never
  // scrollIntoView, which would also scroll the page.
  useEffect(() => {
    const strip = stripRef.current
    const thumb = strip?.children[activeIndex] as HTMLElement | undefined
    if (!strip || !thumb) return
    const left = thumb.offsetLeft - strip.offsetLeft
    const right = left + thumb.offsetWidth
    const padding = 32
    let target: number | null = null
    if (left - padding < strip.scrollLeft) target = left - padding
    else if (right + padding > strip.scrollLeft + strip.clientWidth) target = right + padding - strip.clientWidth
    if (target !== null) strip.scrollTo({ left: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [activeIndex])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowLeft: activeIndex - 1,
      ArrowRight: activeIndex + 1,
      Home: 0,
      End: images.length - 1,
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    event.stopPropagation()
    onSelect(keys[event.key], true)
  }

  return (
    <div ref={stripRef} className="galleri-page__strip" role="group" aria-label="Bildminiatyrer" onKeyDown={onKeyDown}>
      {images.map((image, index) => (
        <button
          key={image.slug}
          type="button"
          className="galleri-page__thumb"
          aria-pressed={index === activeIndex}
          aria-label={`Visa bild ${index + 1} av ${images.length}: ${image.title}`}
          tabIndex={index === activeIndex ? 0 : -1}
          onClick={() => onSelect(index, false)}
        >
          <picture>
            <source type="image/webp" srcSet={image.thumb.webp} />
            <img src={image.thumb.jpg} alt="" width={image.thumb.width} height={image.thumb.height} loading="lazy" decoding="async" draggable={false} />
          </picture>
        </button>
      ))}
    </div>
  )
}

export default function GalleryPage() {
  const [load, setLoad] = useState<LoadState>({ status: 'loading' })
  const [modalOpen, setModalOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const preloadedFor = useRef<string | null>(null)
  const firstPaint = useRef(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    let cancelled = false
    getGalleryImages()
      .then((images) => { if (!cancelled) setLoad({ status: 'ready', images }) })
      .catch(() => { if (!cancelled) setLoad({ status: 'error' }) })
    return () => { cancelled = true }
  }, [])

  const images = load.status === 'ready' ? load.images : []
  const total = images.length
  // The URL (?bild=slug) is the single source of the selection; unknown or
  // missing slugs fall back to the first image.
  const requested = images.findIndex((image) => image.slug === searchParams.get('bild'))
  const activeIndex = requested >= 0 ? requested : 0
  const active = images[activeIndex]

  const select = (index: number, focusThumb: boolean) => {
    if (!total) return
    const next = (index + total) % total
    const params = new URLSearchParams(searchParams)
    params.set('bild', images[next].slug)
    setSearchParams(params, { replace: true, preventScrollReset: true })
    if (focusThumb) {
      window.requestAnimationFrame(() => {
        document.querySelectorAll<HTMLButtonElement>('.galleri-page__thumb')[next]?.focus({ preventScroll: true })
      })
    }
  }
  const step = (direction: 1 | -1) => select(activeIndex + direction, false)

  // Preload the neighbours once the current image has loaded (event, not effect).
  const onStageLoaded = () => {
    if (!active || preloadedFor.current === active.slug) return
    preloadedFor.current = active.slug
    firstPaint.current = false
    if (total > 1) {
      preload(images[(activeIndex + 1) % total])
      preload(images[(activeIndex - 1 + total) % total])
    }
  }

  const onViewerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) }
  }

  const openBooking = () => setModalOpen(true)

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="overlay" />

      <main className="galleri-page" id="main-content">
        {/* 1. Stage: heading + viewer + strip (this is the hero) */}
        <section className="galleri-page__stage-section" aria-labelledby="galleri-title">
          <div className="bb-wrap">
            <header className="galleri-page__intro">
              <div className="galleri-page__intro-heading">
                <p className="bb-eyebrow bb-eyebrow--dark">Bilder &amp; Verkstadsmiljö</p>
                <h1 className="bb-h1 galleri-page__h1" id="galleri-title">
                  Bilder från <span className="bb-accent">Brynäs Bilservice</span>
                </h1>
              </div>
              <div className="galleri-page__intro-body">
                <p className="bb-lead--dark galleri-page__lead">
                  Ta en titt in i vår verkstad och däckavdelning på Utmarksvägen i Brynäs. Här ser du lokalerna, utrustningen och miljön där vi tar hand om din bil.
                </p>
                <div className="galleri-page__actions">
                  <button type="button" className="bb-btn bb-btn--teal galleri-page__book" onClick={openBooking}>
                    Boka tid
                  </button>
                  <a href={PHONE_HREF} className="bb-btn bb-btn--ember">
                    <PhoneIcon />
                    <span>Ring: {BUSINESS.phone.display}</span>
                  </a>
                </div>
              </div>
            </header>

            {load.status === 'loading' && (
              <div className="galleri-page__viewer galleri-page__viewer--loading" aria-hidden="true">
                <div className="galleri-page__stage" />
                <div className="galleri-page__caption" />
                <div className="galleri-page__strip" />
              </div>
            )}

            {load.status === 'error' && (
              <div className="galleri-page__notice" role="status">
                <p>Vi kunde inte visa bilderna just nu. Försök igen om en stund, eller ring oss.</p>
                <a href={PHONE_HREF} className="bb-btn bb-btn--ember">
                  <PhoneIcon />
                  <span>Ring: {BUSINESS.phone.display}</span>
                </a>
              </div>
            )}

            {load.status === 'ready' && total === 0 && (
              <div className="galleri-page__notice" role="status">
                <p>Här kommer snart bilder från verkstaden. Välkommen förbi {BUSINESS.address.street} så visar vi gärna runt.</p>
              </div>
            )}

            {active && (
              <div
                className="galleri-page__viewer"
                role="region"
                aria-roledescription="bildgalleri"
                aria-label="Bildgalleri: verkstaden i bilder"
                tabIndex={0}
                onKeyDown={onViewerKeyDown}
              >
                <GalleryStage image={active} eager={firstPaint.current} onSwipe={step} onLoaded={onStageLoaded} />
                <GalleryCaption image={active} index={activeIndex} total={total} onStep={step} />
                {total > 1 && <ThumbnailStrip images={images} activeIndex={activeIndex} onSelect={select} />}
                <p className="galleri-page__sr-only" aria-live="polite">
                  {`Bild ${activeIndex + 1} av ${total}: ${active.title}`}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 2. Closing reassurance */}
        <section className="galleri-page__closing" aria-labelledby="galleri-closing-title">
          <div className="bb-wrap">
            <div className="bb-card--trust galleri-page__closing-card">
              <span className="bb-icon-badge bb-card--trust__icon" aria-hidden="true"><ShieldHeartIcon /></span>
              <div className="bb-card--trust__text">
                <p className="bb-eyebrow">Välkommen till oss</p>
                <h2 className="galleri-page__closing-title" id="galleri-closing-title">Redo att boka service eller reparation?</h2>
                <p className="bb-lead">
                  Har du frågor om din bil eller vill du boka tid? Skicka en förfrågan via formuläret eller ring direkt till verkstaden på Utmarksvägen.
                </p>
              </div>
              <div className="galleri-page__closing-actions">
                <button type="button" className="bb-btn bb-btn--ember-solid" onClick={openBooking}>
                  Boka tid nu
                </button>
                <Link to="/biltjanster" className="bb-btn galleri-page__btn-outline">
                  Se alla tjänster
                </Link>
                <a href={PHONE_HREF} className="bb-btn galleri-page__btn-outline">
                  <PhoneIcon />
                  <span>Ring: {BUSINESS.phone.display}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
