import type { CSSProperties } from "react"

import { cn } from "@cyrus/ui/utils"

import { Seal } from "@/components/blueprint"
import { SectionHeader } from "@/components/site/SectionHeader"
import type { ProfileProject } from "@/lib/profile"

type ProjectsSectionProps = {
  sheet: string
  title: string
  summary: string
  projects: ProfileProject[]
  locale: "zh" | "en"
  primaryLabel: string
  deliveryLabel: string
}

const NUMERALS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]

export function ProjectsSection({
  sheet,
  title,
  summary,
  projects,
  locale,
  primaryLabel,
  deliveryLabel,
}: ProjectsSectionProps) {
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
          {projects.map((project, index) => {
            const isFlagship = project.isFlagship ?? index === 0
            const eyebrow = `PROJ-${NUMERALS[index] ?? index + 1}`
            const tagline = locale === "en" ? project.tagline.en : project.tagline.zh

            return (
              <article
                key={project.id}
                data-card
                data-project-card
                style={{ "--motion-index": index } as CSSProperties}
                className="border border-grid bg-paper-raised p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-blueprint">
                      {eyebrow} · {project.name}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-ink">{project.name}</h3>
                  </div>
                  <span
                    className={cn(
                      "border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em]",
                      isFlagship ? "border-seal text-seal" : "border-grid text-ink-soft"
                    )}
                  >
                    {isFlagship ? primaryLabel : deliveryLabel}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-ink-soft">{tagline}</p>

                {project.highlights.length > 0 ? (
                  <ul className="mt-5 space-y-3">
                    {project.highlights.map((bullet: string) => (
                      <li
                        key={bullet}
                        data-project-bullet
                        className="flex gap-3 text-sm leading-6 text-ink"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 bg-blueprint"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-grid pt-4">
                  <p className="font-mono text-xs leading-6 text-ink-soft">
                    {project.stack.join(" / ")}
                  </p>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-blueprint transition-opacity hover:opacity-70"
                    >
                      ↗ {project.url.replace(/^https?:\/\//, "")}
                    </a>
                  ) : null}
                </div>

                {isFlagship ? (
                  <div className="mt-4 flex items-center gap-2">
                    <Seal label="AI CORE" variant="approved" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                      FLAGSHIP
                    </span>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
