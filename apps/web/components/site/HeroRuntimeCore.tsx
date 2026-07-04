import type { CSSProperties } from "react"

export function HeroRuntimeCore() {
  return (
    <div data-agent-core className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-12 h-[44rem] w-[44rem] -translate-x-1/2 opacity-80 lg:left-[72%] lg:top-4">
        <div data-core-ring className="runtime-ring runtime-ring-outer" />
        <div data-core-ring className="runtime-ring runtime-ring-mid" />
        <div data-core-ring className="runtime-ring runtime-ring-inner" />
        <div data-core-pulse className="runtime-core-pulse" />
        <div data-core-scan className="runtime-core-scan" />
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            data-core-token
            className="runtime-token"
            style={
              {
                "--token-index": index,
              } as CSSProperties
            }
          />
        ))}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 704 704">
          <path
            data-core-beam
            d="M132 352C188 180 516 180 572 352C516 524 188 524 132 352Z"
            fill="none"
            stroke="var(--blueprint)"
            strokeWidth="1.5"
            strokeDasharray="6 16"
            opacity="0.62"
          />
          <path
            data-core-beam
            d="M210 210L494 494M494 210L210 494"
            fill="none"
            stroke="var(--seal)"
            strokeWidth="1"
            strokeDasharray="3 20"
            opacity="0.42"
          />
        </svg>
      </div>
    </div>
  )
}
