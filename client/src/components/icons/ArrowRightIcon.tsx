interface IconProps { className?: string }

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}
