type PaperKiteSVGProps = {
  className?: string
}

export function PaperKiteSVG({ className = "" }: PaperKiteSVGProps) {
  return (
    <svg
      viewBox="-1.6 -1.8 3.2 4.4"
      className={className}
      fill="none"
      stroke="var(--blueprint)"
      strokeWidth="0.02"
      aria-hidden="true"
    >
      <path d="M0 1.4 L-1 0 L0 -1.2 L1 0 Z" strokeWidth="0.03" />
      <path d="M-1 0 L1 0" />
      <path d="M0 -1.2 L0 -2.4" strokeOpacity="0.5" />
    </svg>
  )
}
