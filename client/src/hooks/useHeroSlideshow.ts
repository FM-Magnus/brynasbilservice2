import { useEffect, useState } from 'react'

const HERO_SLIDE_INTERVAL_MS = 7000

/** Crossfading hero photos: returns the active slide index; pauses when the tab is hidden or reduced motion is on. */
export function useHeroSlideshow(slideCount: number) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (slideCount < 2) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let intervalId: ReturnType<typeof setInterval> | undefined
    const start = () => {
      intervalId = setInterval(() => {
        setActiveSlide(i => (i + 1) % slideCount)
      }, HERO_SLIDE_INTERVAL_MS)
    }
    const stop = () => {
      if (intervalId) clearInterval(intervalId)
    }
    const handleVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [slideCount])

  return activeSlide
}
