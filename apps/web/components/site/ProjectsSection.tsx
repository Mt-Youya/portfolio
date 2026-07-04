import type { CSSProperties } from "react"

import { cn } from "@cyrus/ui/utils"

import { SectionHeader } from "@/components/site/SectionHeader"
import type { Project } from "@/components/site/types"

export function ProjectsSection({
  sheet,
  title,
  summary,
  projects,
  primaryLabel,
  deliveryLabel,
}: {
  sheet: string
  title: string
  summary: string
  projects: Project[]
  primaryLabel: string
  deliveryLabel: string
}) {
  return (
    <section
      id="projects"
      data-motion-section
      data-project-section
      className="relative overflow-hidden border-b border-grid px-5 py-16 sm:px-8 lg:py-20"
    >
      <div data-section-scan />
      <div className="mx-auto max-w-7xl">
        <SectionHeader sheet={sheet} title={title} summary={summary} />
        <div data-projects-grid className="mt-10 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.title}
              data-card
              data-project-card
              style={{ "--motion-index": index } as CSSProperties}
              className="border border-grid bg-paper-raised p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-blueprint">{project.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-ink">{project.title}</h3>
                </div>
                <span
                  className={cn(
                    "border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em]",
                    index === 0 ? "border-seal text-seal" : "border-grid text-ink-soft"
                  )}
                >
                  {index === 0 ? primaryLabel : deliveryLabel}
                </span>
              </div>
              <p className="mt-5 text-sm leading-7 text-ink-soft">{project.summary}</p>
              <ul className="mt-5 space-y-3">
                {project.bullets.map((bullet) => (
                  <li key={bullet} data-project-bullet className="flex gap-3 text-sm leading-6 text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-blueprint" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-grid pt-4 font-mono text-xs leading-6 text-ink-soft">
                {project.stack}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
