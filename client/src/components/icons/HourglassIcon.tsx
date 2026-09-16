interface IconProps { className?: string }

export function HourglassIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 22h14" /><path d="M5 2h14" />
      <path d="M17 22v-4.17a2 2 0 0 0-.59-1.41L12 12l-4.41 4.42a2 2 0 0 0-.59 1.41V22" />
      <path d="M7 2v4.17a2 2 0 0 0 .59 1.41L12 12l4.41-4.42A2 2 0 0 0 17 6.17V2" />
    </svg>
  )
}
