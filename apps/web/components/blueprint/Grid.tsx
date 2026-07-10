type GridProps = {
  className?: string
  parallax?: boolean
}

export function Grid({ className = "", parallax = false }: GridProps) {
  return (
    <div
      data-blueprint-grid
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
        backgroundSize: "8px 8px, 64px 64px",
        opacity: parallax ? 1 : 0.6,
      }}
    />
  )
}
