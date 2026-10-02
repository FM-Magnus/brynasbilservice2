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
// Hover near either end of the row scrolls it that way (mouse only, never touch):
// the outer fifth of the track, speeding up toward the very edge.
const EDGE_ZONE_FRACTION = 0.2
const EDGE_MAX_SPEED_PX_PER_S = 700

interface DragState {
  startX: number
  startScrollLeft: number
  moved: boolean
}

interface EdgeScrollState {
  velocity: number // px per second, negative = towards the start
  clientX: number
  lastTime: number
  position: number // float scrollLeft; the browser rounds what it reports back
}

/** Signed edge-scroll speed for a pointer at clientX: 0 in the middle of the track. */
function edgeVelocity(clientX: number, track: HTMLElement) {
  const rect = track.getBoundingClientRect()
  const zone = rect.width * EDGE_ZONE_FRACTION
  const fromLeft = clientX - rect.left
  const fromRight = rect.right - clientX
  const ramp = (distance: number) => {
    const t = Math.min(1, Math.max(0, (zone - distance) / zone))
    return t * t
  }
  if (fromLeft < zone) return -EDGE_MAX_SPEED_PX_PER_S * ramp(fromLeft)
  if (fromRight < zone) return EDGE_MAX_SPEED_PX_PER_S * ramp(fromRight)
  return 0
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
  const edgeRef = useRef<EdgeScrollState | null>(null)
  const edgeRafRef = useRef<number | null>(null)
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

  const stopEdgeScroll = useCallback(() => {
    if (edgeRafRef.current !== null) cancelAnimationFrame(edgeRafRef.current)
    edgeRafRef.current = null
    edgeRef.current = null
    // Snapping is suspended while the strip glides (it fights per-frame scrolling,
    // like during a drag); a drag in progress keeps control of it.
    if (trackRef.current && !dragRef.current?.moved) trackRef.current.style.scrollSnapType = ''
  }, [])

  const edgeScrollStep = useCallback((time: number) => {
    const state = edgeRef.current
    const track = trackRef.current
    if (!state || !track || dragRef.current?.moved) {
      stopEdgeScroll()
      return
    }
    // Someone scrolled by other means (wheel, keyboard): follow, don't fight.
    if (Math.abs(track.scrollLeft - state.position) > 2) state.position = track.scrollLeft
    const dt = Math.min(time - state.lastTime, 50)
    state.lastTime = time
    const max = track.scrollWidth - track.clientWidth
    const next = Math.min(max, Math.max(0, state.position + (state.velocity * dt) / 1000))
    const atEnd = next === state.position && dt > 0
    state.position = next
    track.scrollLeft = next
    applyMagnify(state.clientX)
    if (atEnd) {
      stopEdgeScroll()
      return
    }
    edgeRafRef.current = requestAnimationFrame(edgeScrollStep)
  }, [applyMagnify, stopEdgeScroll])

  const updateEdgeScroll = useCallback((clientX: number) => {
    const track = trackRef.current
    if (!track || dragRef.current?.moved) {
      stopEdgeScroll()
      return
    }
    const velocity = edgeVelocity(clientX, track)
    if (velocity === 0) {
      stopEdgeScroll()
      return
    }
    if (edgeRef.current) {
      edgeRef.current.velocity = velocity
      edgeRef.current.clientX = clientX
      return
    }
    track.style.scrollSnapType = 'none'
    edgeRef.current = { velocity, clientX, lastTime: performance.now(), position: track.scrollLeft }
    edgeRafRef.current = requestAnimationFrame(edgeScrollStep)
  }, [edgeScrollStep, stopEdgeScroll])

  useEffect(() => stopEdgeScroll, [stopEdgeScroll])

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
    // Hover-to-scroll is for a real mouse only: touch keeps its native swipe.
    if (magnifyEnabled && event.pointerType === 'mouse') updateEdgeScroll(event.clientX)

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
    stopEdgeScroll()
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
              <img src={image.thumb.webp} alt="" loading="lazy" decoding="async" draggable={false} />
            </picture>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default GalleryDockStrip
