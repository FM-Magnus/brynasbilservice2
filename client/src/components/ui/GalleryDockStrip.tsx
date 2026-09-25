import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { getGalleryImages } from '../../api/gallery'
import type { GalleryImage } from '../../types/gallery'
import './GalleryDockStrip.css'

// Same source as /galleri (see src/assets/galleri/LÄSMIG.md) — drop a photo in
// that folder and it appears here too. Never hard-code images in this component.

const MAGNIFY_RADIUS_PX = 190
const MAGNIFY_MAX_EXTRA_SCALE = 0.3
const MAGNIFY_LIFT_PX = 6
const DRAG_THRESHOLD_PX = 6

interface DragState {
  startX: number
  startScrollLeft: number
  moved: boolean
}

function usePointerFineAndMotionOk() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const pointerFine = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(pointerFine.matches && !reducedMotion.matches)
    update()
    pointerFine.addEventListener('change', update)
    reducedMotion.addEventListener('change', update)
    return () => {
      pointerFine.removeEventListener('change', update)
      reducedMotion.removeEventListener('change', update)
    }
  }, [])
  return enabled
}

export function GalleryDockStrip({ className = '' }: { className?: string }) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const rafRef = useRef<number | null>(null)
  const dragRef = useRef<DragState | null>(null)
  const magnifyEnabled = usePointerFineAndMotionOk()

  useEffect(() => {
    let cancelled = false
    getGalleryImages()
      .then(loaded => { if (!cancelled) setImages(loaded) })
      .catch(() => { if (!cancelled) setImages([]) })
    return () => { cancelled = true }
  }, [])

  const resetMagnify = useCallback(() => {
    itemRefs.current.forEach(el => {
      if (!el) return
      el.style.transform = ''
      el.style.zIndex = ''
    })
  }, [])

  const applyMagnify = useCallback((clientX: number) => {
    itemRefs.current.forEach(el => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const center = rect.left + rect.width / 2
      const dist = Math.min(Math.abs(clientX - center), MAGNIFY_RADIUS_PX)
      const t = dist / MAGNIFY_RADIUS_PX
      const bump = (Math.cos(t * Math.PI) + 1) / 2 // 1 at cursor, 0 at radius edge
      const scale = 1 + MAGNIFY_MAX_EXTRA_SCALE * bump
      const lift = MAGNIFY_LIFT_PX * bump
      el.style.transform = `translateY(${-lift}px) scale(${scale})`
      el.style.zIndex = String(Math.round(bump * 100))
    })
  }, [])

  const queueMagnify = useCallback((clientX: number) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => applyMagnify(clientX))
  }, [applyMagnify])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const track = trackRef.current
    if (!track) return
    dragRef.current = { startX: event.clientX, startScrollLeft: track.scrollLeft, moved: false }
    // Pointer capture is claimed lazily, only once a real drag starts (see
    // onPointerMove) — capturing on every plain click redirects the resulting
    // click event to this div instead of the link underneath the cursor.
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (magnifyEnabled) queueMagnify(event.clientX)

    const drag = dragRef.current
    const track = trackRef.current
    if (!drag || !track || event.pointerType !== 'mouse') return
    const dx = event.clientX - drag.startX
    if (!drag.moved && Math.abs(dx) > DRAG_THRESHOLD_PX) {
      drag.moved = true
      track.setPointerCapture(event.pointerId)
      // CSS scroll-snap fights a per-frame scrollLeft write — the browser
      // snaps back after every tiny step, so a plain drag barely moves.
      // Suspend snapping for the duration of the drag and let it resume
      // (see onPointerUp) so the strip still settles nicely on release.
      track.style.scrollSnapType = 'none'
    }
    if (drag.moved) track.scrollLeft = drag.startScrollLeft - dx
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (trackRef.current?.hasPointerCapture(event.pointerId)) {
      trackRef.current.releasePointerCapture(event.pointerId)
    }
    if (trackRef.current) trackRef.current.style.scrollSnapType = ''
  }

  const onPointerLeave = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    resetMagnify()
  }

  // A drag that moved past the threshold shouldn't also navigate on release.
  const onClickCapture = (event: ReactMouseEvent) => {
    if (dragRef.current?.moved) {
      event.preventDefault()
      event.stopPropagation()
    }
    dragRef.current = null
  }

  if (images.length === 0) return null

  return (
    <section className={`bb-gallery-dock ${className}`.trim()} aria-labelledby="bb-gallery-dock-heading">
      <Link to="/galleri" className="bb-gallery-dock__heading" id="bb-gallery-dock-heading">
        Ta en titt inne hos oss <span className="bb-accent">– Galleriet</span>
      </Link>
      <div className="bb-gallery-dock__rule" aria-hidden="true" />
      <div
        ref={trackRef}
        className="bb-gallery-dock__track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onClickCapture={onClickCapture}
      >
        {images.map((image, index) => (
          <Link
            key={image.slug}
            to={`/galleri?bild=${image.slug}`}
            ref={el => { itemRefs.current[index] = el }}
            className="bb-gallery-dock__item"
            aria-label={image.alt}
            draggable={false}
          >
            <picture>
              <source type="image/webp" srcSet={image.thumb.webp} />
              <img src={image.thumb.jpg} alt="" loading="lazy" decoding="async" draggable={false} />
            </picture>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default GalleryDockStrip
