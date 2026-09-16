interface IconProps { className?: string }

export function GaugeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="m13.4 10.6 3.6-3.6" />
      <path d="M4.93 19.07A10 10 0 1 1 19.07 19.07" />
    </svg>
  )
}
