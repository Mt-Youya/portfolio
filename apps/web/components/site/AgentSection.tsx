import { AgentRuntimeStage } from "@/components/site/AgentRuntimeStage"
import { SectionHeader } from "@/components/site/SectionHeader"
import type { Capability, RuntimeStep } from "@/components/site/types"

export function AgentSection({
  sheet,
  title,
  summary,
  capabilities,
  loopLabels,
  runtimeSteps,
}: {
  sheet: string
  title: string
  summary: string
  capabilities: Capability[]
  loopLabels: string[]
  runtimeSteps: RuntimeStep[]
}) {
  return (
    <section id="agent" className="border-b border-grid px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader sheet={sheet} title={title} summary={summary} />
        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((capability) => (
            <article key={capability.label} data-card data-reveal className="border border-grid bg-paper-raised p-5">
              <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-blueprint">{capability.label}</h3>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{capability.text}</p>
            </article>
          ))}
        </div>
        <AgentRuntimeStage labels={loopLabels} steps={runtimeSteps} />
      </div>
    </section>
  )
}
