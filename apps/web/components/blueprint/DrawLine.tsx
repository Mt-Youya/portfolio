type DrawLineProps = {
  className?: string
  vertical?: boolean
  length?: string
  label?: string
}

export function DrawLine({ className = "", vertical = false, length = "100%", label }: DrawLineProps) {
  return (
    <span
      className={`relative inline-flex items-center gap-2 ${className}`}
      style={vertical ? { height: length, flexDirection: "column" } : { width: length }}
    >
      <span
        className="block bg-grid"
        style={vertical ? { width: "1px", height: "100%" } : { height: "1px", width: "100%" }}
      />
      {label ? <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">{label}</span> : null}
    </span>
  )
}
