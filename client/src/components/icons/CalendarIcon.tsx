interface IconProps { className?: string }

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 9h16"/><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 13h2M14 13h2M8 17h2M14 17h2"/>
    </svg>
  )
}
