type SheetLabelProps = {
  sheet: string
  href?: string
  className?: string
}

export function SheetLabel({ sheet, href, className = "" }: SheetLabelProps) {
  const content = (
    <span className={`font-mono text-xs uppercase tracking-[0.24em] text-blueprint ${className}`}>
      {sheet}
    </span>
  )

  if (!href) {
    return content
  }

  return (
    <a href={href} className="inline-block transition-opacity hover:opacity-70">
      {content}
    </a>
  )
}
