interface IconProps { className?: string }

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 10c0 6.5-8.5 12-8.5 12S3.5 16.5 3.5 10a8.5 8.5 0 1 1 17 0Z"/><circle cx="12" cy="10" r="2.5"/>
    </svg>
  )
}
