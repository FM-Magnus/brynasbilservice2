import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../icons/ArrowRightIcon'
import './GalleryTeaserCard.css'

// Default workshop slideshow images (Central single source of truth!)
import workshopOpenHood from '../../assets/images/gallery/workshop/workshop-car-open-hood-card.webp'
import workshopEmptyLifts from '../../assets/images/gallery/workshop/workshop-empty-lifts-card.webp'
import workshopOverheadBay from '../../assets/images/gallery/workshop/workshop-overhead-car-bay-card.webp'
import workshopServiceAisle from '../../assets/images/gallery/workshop/workshop-service-aisle-card.webp'
import workshopCarLift from '../../assets/images/gallery/workshop/workshop-car-on-lift-card.webp'
import workshopLifts from '../../assets/images/gallery/workshop/workshop-lifts-and-tire-racks-card.webp'

export interface WorkshopSlide {
  image: string
  alt: string
}

export const defaultWorkshopSlides: WorkshopSlide[] = [
  { image: workshopOpenHood, alt: 'Bil med öppen motorhuv på verkstadsgolvet hos Brynäs Bilservice' },
  { image: workshopEmptyLifts, alt: 'Öppen verkstadsyta med lyftplatser och däckförvaring' },
  { image: workshopOverheadBay, alt: 'Överblick över verkstadens bilplats och däckställ' },
  { image: workshopServiceAisle, alt: 'Servicegång genom verkstaden med arbetsutrustning och däckställ' },
  { image: workshopCarLift, alt: 'Bil vid lyftplatsen i Brynäs Bilservice verkstad' },
  { image: workshopLifts, alt: 'Verkstadsöversikt med billyftar och däckställ' },
]

export interface GalleryTeaserCardProps {
  slides?: WorkshopSlide[]
  intervalMs?: number
  to?: string
  badgeText?: string
  buttonText?: string
  className?: string
  ariaLabel?: string
}

export function GalleryTeaserCard({
  slides = defaultWorkshopSlides,
  intervalMs = 7000,
  to = '/galleri',
  badgeText = 'Grundat 2021',
  buttonText = 'Till galleriet',
  className = '',
  ariaLabel = 'Gå till bildgalleriet – se bilder från vår verkstad',
}: GalleryTeaserCardProps) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (slides.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % slides.length)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [slides.length, intervalMs])

  return (
    <Link
      to={to}
      className={`bb-gallery-card ${className}`.trim()}
      aria-label={ariaLabel}
    >
      {slides.map((item, index) => (
        <img
          key={item.image}
          src={item.image}
          alt={index === activeSlide ? item.alt : ''}
          className={`bb-gallery-card__img ${index === activeSlide ? 'is-active' : ''}`.trim()}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {badgeText && (
        <span className="bb-gallery-card__badge">{badgeText}</span>
      )}

      <span className="bb-gallery-card__cutout">
        <span className="bb-gallery-card__dots">
          {slides.map((item, index) => (
            <i
              key={item.image}
              className={`bb-gallery-card__dot ${index === activeSlide ? 'is-active' : ''}`.trim()}
            />
          ))}
        </span>
        {buttonText}{' '}
        <span className="bb-gallery-card__arrow">
          <ArrowRightIcon />
        </span>
      </span>
    </Link>
  )
}

export default GalleryTeaserCard
