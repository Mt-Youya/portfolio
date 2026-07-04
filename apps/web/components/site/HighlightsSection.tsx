import type { CSSProperties } from "react"

import { SectionHeader } from "@/components/site/SectionHeader"
import type { Highlight } from "@/components/site/types"

export function HighlightsSection({
  sheet,
  title,
  summary,
  highlights,
}: {
  sheet: string
  title: string
  summary: string
  highlights: Highlight[]
}) {
  return (
    <section
      id="highlights"
      data-motion-section
      data-highlight-section
      data-pin-section
      className="relative overflow-hidden border-b border-grid px-5 py-16 sm:px-8 lg:py-20"
    >
      <div data-section-scan />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader sheet={sheet} title={title} summary={summary} />
        <div className="space-y-4">
          {highlights.map((highlight, index) => (
            <article
              key={highlight.title}
              data-card
              data-highlight-row
              style={{ "--motion-index": index } as CSSProperties}
              className="grid gap-3 border border-grid bg-paper-raised p-5 sm:grid-cols-[12rem_1fr]"
            >
              <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-blueprint">{highlight.title}</h3>
              <p className="text-sm leading-7 text-ink-soft">{highlight.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
