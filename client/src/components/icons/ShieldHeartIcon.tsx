interface IconProps {
  className?: string
}

export function ShieldHeartIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 14.8s-3-1.8-3-3.6a1.8 1.8 0 0 1 3-1.4 1.8 1.8 0 0 1 3 1.4c0 1.8-3 3.6-3 3.6z" />
    </svg>
  )
}
