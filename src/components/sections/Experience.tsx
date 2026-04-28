'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Briefcase } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { experienceMeta } from '@/data/resume'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function TechTag({ tech }: { tech: string }) {
  return (
    <Badge variant="outline" className="font-mono text-xs text-muted-foreground">
      {tech}
    </Badge>
  )
}

type TranslatedProject = {
  name?: string
  highlights: string[]
}

type TranslatedExperience = {
  company: string
  role: string
  period: string
  projects: TranslatedProject[]
}

export function Experience() {
  const t = useTranslations('experience')
  const tResume = useTranslations('resume')
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  const experiences = (tResume.raw('experiences') as TranslatedExperience[]).map((exp, ei) => ({
    ...exp,
    current: experienceMeta[ei]?.current,
    projects: exp.projects.map((proj, pi) => ({
      ...proj,
      period: experienceMeta[ei]?.projects[pi]?.period,
      techStack: experienceMeta[ei]?.projects[pi]?.techStack ?? [],
    })),
  }))

  const toggleProject = (key: string) => {
    setExpandedProject((prev) => (prev === key ? null : key))
  }

  return (
    <section id="experience" className="section-padding px-6 max-w-5xl mx-auto">
      <SectionTitle
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <div className="relative">
        {/* 时间轴竖线 */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-border to-transparent" />

        <div className="space-y-10">
          {experiences.map((exp, ei) => (
            <motion.div
              key={exp.company}
              className="relative pl-12 md:pl-16"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ei * 0.15, duration: 0.6 }}
            >
              {/* 时间轴圆点 */}
              <div className="absolute left-2.5 md:left-4 top-2 w-3 h-3 rounded-full bg-accent border-2 border-background shadow-[0_0_10px_#f59e0b66]" />

              {/* 公司卡片 */}
              <Card className="overflow-hidden rounded-2xl gap-0 py-0">
                {/* 头部 */}
                <div className="p-5 md:p-6 border-b border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                        <Briefcase size={16} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{exp.company}</h3>
                        <p className="text-accent text-sm font-medium">{exp.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {exp.current && (
                        <Badge className="font-mono bg-accent/15 text-accent border-accent/30 hover:bg-accent/20">
                          {t('currentBadge')}
                        </Badge>
                      )}
                      <Badge variant="outline" className="font-mono text-muted-foreground">
                        {exp.period}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* 项目列表 */}
                <div className="divide-y divide-border">
                  {exp.projects.map((proj, pi) => {
                    const key = `${ei}-${pi}`
                    const isExpanded = expandedProject === key
                    const hasName = !!proj.name

                    return (
                      <div key={pi}>
                        {/* 项目标题（可折叠） */}
                        {hasName ? (
                          <Button
                            variant="ghost"
                            className="w-full flex items-center justify-between p-4 md:p-5 h-auto rounded-none text-left group"
                            onClick={() => toggleProject(key)}
                          >
                            <div>
                              <span className="font-semibold text-foreground group-hover:text-accent transition-colors">
                                {proj.name}
                              </span>
                              {proj.period && (
                                <span className="ml-3 text-xs font-mono text-muted-foreground">{proj.period}</span>
                              )}
                            </div>
                            <ChevronDown
                              size={16}
                              className={`text-muted-foreground transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          </Button>
                        ) : null}

                        {/* 内容 */}
                        <AnimatePresence initial={false}>
                          {(!hasName || isExpanded) && (
                            <motion.div
                              initial={hasName ? { height: 0, opacity: 0 } : false}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 md:px-5 pb-5 pt-1">
                                <ul className="space-y-2 mb-4">
                                  {proj.highlights.map((h, hi) => (
                                    <li key={hi} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <span className="text-accent mt-1 shrink-0">▸</span>
                                      <span className="leading-relaxed">{h}</span>
                                    </li>
                                  ))}
                                </ul>
                                <div className="flex flex-wrap gap-1.5">
                                  {proj.techStack.map((tech) => (
                                    <TechTag key={tech} tech={tech} />
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
