import { useEffect, useState } from 'react'

interface KenBurnsSlideshowProps {
  /** Image sources, displayed in order. */
  images: string[]
  /** Optional alt text per image. Falls back to empty string. */
  alts?: string[]
  /** How long each image stays fully visible (ms). Default 7000. */
  intervalMs?: number
  /** Crossfade duration (ms). Default 1500. */
  fadeMs?: number
  /** Extra class name applied to the outer div (e.g. for sizing/border-radius). */
  className?: string
  /** Optional callback notifying when the active slide index changes. */
  onIndexChange?: (index: number) => void
  /** Optional controlled active index */
  activeIndex?: number
}

/**
 * Cross-fading slideshow with a continuous Ken Burns pan/zoom on each image.
 * Three pan variants are cycled (1, 2, 3, 1, 2, 3, ...) so consecutive images
 * always move differently. Respects `prefers-reduced-motion: reduce`.
 */
export function KenBurnsSlideshow({
  images,
  alts = [],
  intervalMs = 7000,
  fadeMs = 1500,
  className = '',
  onIndexChange,
  activeIndex: controlledIndex,
}: KenBurnsSlideshowProps) {
  const [internalIndex, setInternalIndex] = useState(0)
  const isControlled = typeof controlledIndex === 'number'
  const activeIndex = isControlled ? controlledIndex : internalIndex

  useEffect(() => {
    onIndexChange?.(activeIndex)
  }, [activeIndex, onIndexChange])

  useEffect(() => {
    if (images.length <= 1) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const id = setInterval(() => {
      setInternalIndex(i => (i + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [images.length, intervalMs])

  return (
    <div className={`kenburns ${className}`.trim()}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alts[i] ?? ''}
          className={`kenburns__img kenburns__img--${(i % 3) + 1}${
            i === activeIndex ? ' kenburns__img--active' : ''
          }`}
          style={{ transition: `opacity ${fadeMs}ms ease-in-out` }}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  )
}
