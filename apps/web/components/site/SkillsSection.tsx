import type { CSSProperties } from "react"

import { SectionHeader } from "@/components/site/SectionHeader"
import type { SkillGroup } from "@/components/site/types"

export function SkillsSection({
  sheet,
  title,
  summary,
  skillGroups,
}: {
  sheet: string
  title: string
  summary: string
  skillGroups: SkillGroup[]
}) {
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
        <div data-skills-grid className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <article
              key={group.title}
              data-card
              data-skill-card
              style={{ "--motion-index": index } as CSSProperties}
              className="border border-grid bg-paper-raised p-5"
            >
              <h3 className="text-lg font-semibold text-ink">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} data-skill-item className="flex gap-3 text-sm leading-6 text-ink-soft">
                    <span className="mt-2.5 h-px w-5 shrink-0 bg-blueprint" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
