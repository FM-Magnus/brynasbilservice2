import { useEffect, useState } from 'react'
import './GoogleReviewsCard.css'

export interface GoogleReview {
  name: string
  text: string
  rating?: number
}

// Canonical Brynäs Bilservice Google reviews (verified data)
export const defaultGoogleReviews: GoogleReview[] = [
  {
    name: 'Inge',
    text: 'Fantastisk hjälp när vi hade bilproblem runt jul. Hjälpte till att ordna en hyrbil så att vi kunde fortsätta vår resa.',
    rating: 5,
  },
  {
    name: 'Olle Blomgren',
    text: 'Fick problem med bromsok när jag var på väg hem efter semestern. Snabbt, schysst och professionellt.',
    rating: 5,
  },
  {
    name: 'J. Niva',
    text: 'Utmärkt kundbemötande och bra priser. Har haft min bil på service och reparationer här flera gånger.',
    rating: 5,
  },
  {
    name: 'Gunilla Lövgren',
    text: 'Mycket bra jobb, bra kundbemötande och hjälpsamma med beställning av tillbehör.',
    rating: 5,
  },
]

function Star({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#FBBC04"
      stroke="#FBBC04"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2 1.2-6.8-5-4.9 6.9-1L12 2Z" />
    </svg>
  )
}

export interface GoogleReviewsCardProps {
  reviews?: GoogleReview[]
  intervalMs?: number
  variant?: 'hero-overlay' | 'card'
  rating?: string
  reviewCount?: string
  href?: string
  ariaLabel?: string
  className?: string
}

export function GoogleReviewsCard({
  reviews = defaultGoogleReviews,
  intervalMs = 8000,
  variant = 'hero-overlay',
  rating = '4,3',
  reviewCount = '50 recensioner',
  href = 'https://maps.app.goo.gl/rXR1nz2RwaUQcvuW9',
  ariaLabel = 'Brynäs Bilservice har betyget 4,3 av 5 baserat på 50 omdömen. Läs omdömena på Google Maps.',
  className = '',
}: GoogleReviewsCardProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (reviews.length <= 1) return

    const timer = window.setInterval(() => {
      setActive(index => (index + 1) % reviews.length)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [reviews.length, intervalMs])

  const currentReview = reviews[active] || reviews[0]

  return (
    <a
      className={`bb-reviews-card bb-reviews-card--${variant} ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <div className="bb-reviews-card__rating">
        <strong className="bb-reviews-card__score">{rating}</strong>
        <span className="bb-reviews-card__stars">
          {[1, 2, 3, 4, 5].map(star => (
            <Star key={star} />
          ))}
        </span>
        <small className="bb-reviews-card__count">{reviewCount}</small>
      </div>

      <div className="bb-reviews-card__google">
        <b className="bb-reviews-card__google-title">Google</b>
        <small className="bb-reviews-card__google-sub">Omdömen på Google Maps</small>
      </div>

      <div className="bb-reviews-card__review">
        <span className="bb-reviews-card__avatar">{currentReview.name[0]}</span>
        <div className="bb-reviews-card__author">
          <b className="bb-reviews-card__author-name">{currentReview.name}</b>
          <span className="bb-reviews-card__stars">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} size={13} />
            ))}
          </span>
        </div>
        <p className="bb-reviews-card__text">{currentReview.text}</p>
      </div>
    </a>
  )
}

export default GoogleReviewsCard
