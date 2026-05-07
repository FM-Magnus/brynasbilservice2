interface IconProps { className?: string }

export function TireIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
    </svg>
  )
}
