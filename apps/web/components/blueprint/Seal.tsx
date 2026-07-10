type SealProps = {
  label?: string
  variant?: "default" | "approved"
  className?: string
}

export function Seal({ label = "辞鸢", variant = "default", className = "" }: SealProps) {
  return (
    <span
      data-seal
      className={`inline-flex items-center justify-center border border-seal font-mono text-seal ${variant === "approved" ? "text-[10px] uppercase tracking-[0.18em]" : "text-sm"} ${className}`}
      style={{
        borderRadius: "2px",
        padding: variant === "approved" ? "0.25rem 0.5rem" : "0.4rem 0.6rem",
      }}
    >
      {label}
    </span>
  )
}
