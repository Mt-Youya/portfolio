import { SectionHeader } from "@/components/site/SectionHeader"
import type { Profile } from "@/lib/profile"

type TimelineProps = {
  sheet: string
  title: string
  summary: string
  experience: Profile["experience"]
  locale: "zh" | "en"
}

export function Timeline({ sheet, title, summary, experience, locale }: TimelineProps) {
  return (
    <section
      id="timeline"
      data-motion-section
      data-timeline-section
      className="relative overflow-hidden border-b border-grid px-5 py-16 sm:px-8 lg:py-20"
    >
      <div data-section-scan />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <SectionHeader sheet={sheet} title={title} summary={summary} />

        <ol className="relative space-y-5 lg:pt-4" data-timeline-list>
          {experience.map((item, index) => {
            const achievement = locale === "en" ? item.achievement.en : item.achievement.zh
            const company =
              locale === "en" && item.company === "牙颜(上海)医疗科技有限公司"
                ? "Yayan Medical Technology"
                : item.company
            const period = locale === "en" ? item.period.replace("至今", "Present") : item.period
            const role =
              locale === "en" && item.role === "前端技术经理 / 高级前端工程师"
                ? "Frontend Technical Manager / Senior Frontend Engineer"
                : item.role
            const isCurrent = index === 0
            const metrics =
              locale === "en"
                ? ["AIOps assistant", "15min -> 2min triage", "<300ms first token"]
                : ["智能运维 AI 助手", "15 分钟 -> 2 分钟", "首 token <300ms"]
            const label = locale === "en" ? "Current waypoint" : "当前航点"
            const scopeLabel = locale === "en" ? "Delivery scope" : "交付范围"

            return (
              <li
                key={`${item.company}-${item.period}`}
                data-timeline-node
                data-card
                className="relative overflow-hidden border border-grid bg-paper-raised p-0"
              >
                <div className="grid lg:grid-cols-[10rem_1fr]">
                  <div className="relative border-b border-grid bg-paper px-5 py-6 lg:border-b-0 lg:border-r">
                    <span
                      data-timeline-line
                      aria-hidden="true"
                      className="absolute bottom-0 left-8 top-0 hidden w-px bg-blueprint/30 lg:block"
                    />
                    <span
                      data-timeline-dot
                      className={`relative z-10 flex h-10 w-10 items-center justify-center border-2 bg-paper-raised ${
                        isCurrent ? "border-seal text-seal" : "border-blueprint text-blueprint"
                      }`}
                      aria-hidden="true"
                    >
                      <span className="h-2.5 w-2.5 bg-current" />
                    </span>
                    <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-blueprint">{label}</p>
                    <p className="mt-2 whitespace-nowrap font-mono text-sm tracking-[0.14em] text-ink">{period}</p>
                  </div>

                  <div className="relative p-6 sm:p-8">
                    <div className="flex flex-col gap-5">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">{company}</p>
                        <h3 className="mt-3 max-w-[18ch] text-2xl font-semibold leading-tight text-ink sm:text-3xl lg:max-w-[24ch]">
                          {role}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {metrics.map((metric) => (
                          <span
                            key={metric}
                            className="border border-blueprint/30 bg-paper px-3 py-2 text-center font-mono text-[0.68rem] uppercase tracking-[0.14em] text-blueprint"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7 border-t border-seal/70 pt-5">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-seal">{scopeLabel}</p>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-soft sm:text-base sm:leading-8">
                        {achievement}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
