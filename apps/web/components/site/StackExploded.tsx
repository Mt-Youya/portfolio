import type { CSSProperties } from "react"

import { SectionHeader } from "@/components/site/SectionHeader"
import type { Profile } from "@/lib/profile"

type StackExplodedProps = {
  sheet: string
  title: string
  summary: string
  stack: Profile["stack"]
  locale: "zh" | "en"
  layerLabels: { ui: string; state: string; api: string; data: string; infra: string }
  caption: string
}

const LAYER_ORDER = ["ui", "state", "api", "data", "infra"] as const
const LAYER_COLORS = [
  "var(--blueprint)",
  "var(--blueprint)",
  "var(--blueprint)",
  "var(--blueprint)",
  "var(--blueprint)",
]
const LAYER_GAP = 96

export function StackExploded({
  sheet,
  title,
  summary,
  stack,
  locale,
  layerLabels,
  caption,
}: StackExplodedProps) {
  const layers = LAYER_ORDER.map((key, index) => ({
    key,
    label: layerLabels[key],
    items: stack[key],
    color: LAYER_COLORS[index],
    offset: index * LAYER_GAP,
  }))

  return (
    <section
      id="skills"
      data-motion-section
      data-skill-section
      className="relative overflow-hidden border-b border-grid px-5 py-16 sm:px-8 lg:py-20"
    >
      <div data-section-scan />
      <div className="mx-auto max-w-7xl">
        <SectionHeader sheet={sheet} title={title} summary={summary} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div
            data-stack-exploded
            className="relative"
            style={{
              perspective: "900px",
              minHeight: `${(LAYER_ORDER.length - 1) * LAYER_GAP + 180}px`,
            }}
          >
            {layers.map((layer, index) => (
              <div
                key={layer.key}
                data-stack-layer
                style={
                  {
                    "--layer-offset": `${layer.offset}px`,
                    "--layer-index": index,
                    transform: `translateY(${layer.offset}px) rotateX(8deg)`,
                    transformStyle: "preserve-3d",
                  } as CSSProperties
                }
                className="absolute inset-x-0 border bg-paper-raised p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-blueprint">
                    L{index + 1} · {layer.label}
                  </span>
                  <span className="font-mono text-[10px] text-ink-soft">
                    {layer.items.length} items
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink">
                  {layer.items.join(" / ") || "—"}
                </p>
              </div>
            ))}
          </div>

          <div data-stack-caption className="lg:pl-8">
            <p className="text-base leading-8 text-ink-soft">{caption}</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-blueprint">
              FIG. 03 — EXPLODED VIEW
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
