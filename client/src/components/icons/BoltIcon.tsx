interface IconProps { className?: string }

export function BoltIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  )
}
