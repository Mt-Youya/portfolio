'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { projectsMeta } from '@/data/resume'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

type TranslatedProject = {
  name: string
  badge?: string
  description: string
  highlights: string[]
}

export function Projects() {
  const t = useTranslations('projects')
  const tResume = useTranslations('resume')

  const translatedProjects = tResume.raw('projects') as TranslatedProject[]
  const projects = translatedProjects.map((proj, i) => ({
    ...proj,
    icon: projectsMeta[i]?.icon ?? '',
    period: projectsMeta[i]?.period ?? '',
    techStack: projectsMeta[i]?.techStack ?? [],
  }))

  return (
    <section id="projects" className="section-padding px-6 max-w-6xl mx-auto">
      <SectionTitle
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
          >
            <Card className="card-hover group flex flex-col h-full rounded-2xl p-6 gap-0">
              <CardContent className="px-0 flex flex-col flex-1">
                {/* 头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{proj.icon}</span>
                    <div>
                      <h3 className="font-bold text-foreground text-sm group-hover:text-accent transition-colors">
                        {proj.name}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground">{proj.period}</span>
                    </div>
                  </div>
                  {proj.badge && (
                    <Badge className="text-xs bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 shrink-0">
                      {proj.badge}
                    </Badge>
                  )}
                </div>

                {/* 描述 */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {proj.description}
                </p>

                {/* 亮点 */}
                <ul className="space-y-1.5 mb-5">
                  {proj.highlights.map((h, hi) => (
                    <li key={hi} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-accent mt-0.5 shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* 技术栈 */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                  {proj.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="font-mono text-xs text-muted-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
