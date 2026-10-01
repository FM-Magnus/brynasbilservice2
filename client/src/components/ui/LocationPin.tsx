import { BUSINESS } from '../../data/business'

interface LocationPinProps {
  /** Line above the address. Default matches the wording already used on Om oss. */
  label?: string
  /** Defaults to the confirmed address in `data/business.ts` — never hand-type an address here. */
  address?: string
  /** Extra class for a consumer that needs a different anchor than the default bottom-center. */
  className?: string
}

/**
 * The shared `.bb-location-pin` overlay (styles in `shared-elements.css`):
 * an arrow above a dark label card, for pointing at a workshop/building in a
 * photo. Position it by giving the photo's own wrapper `position: relative`;
 * the pin anchors to its bottom-center by default. Never write this markup
 * by hand on a page, and never bake the label into a photo's pixels again —
 * that drifts out of sync with `business.ts` silently (the original Om oss
 * photo did: its street lacked the "B").
 */
export function LocationPin({ label = 'Här finns vi', address = BUSINESS.address.full, className = '' }: LocationPinProps) {
  return (
    <div className={`bb-location-pin${className ? ` ${className}` : ''}`}>
      <svg className="bb-location-pin__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4v14m0 0-5-5m5 5 5-5" />
      </svg>
      <div className="bb-location-pin__label">
        <strong>{label}</strong>
        <span>{address}</span>
      </div>
    </div>
  )
}
