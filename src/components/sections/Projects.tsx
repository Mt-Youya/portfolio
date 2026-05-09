'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { projectsMeta } from '@/data/resume'
import { Badge } from '@/components/ui/badge'

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

  const [featured, ...rest] = projects
  const secondary = rest.slice(0, 2)
  const tertiary = rest.slice(2)

  return (
    <section id="projects" className="section-padding px-6 max-w-6xl mx-auto">
      <SectionTitle
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      {/* 上部：featured（左大）+ secondary（右竖排） */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

        {/* Featured 项目 */}
        <motion.div
          className="lg:col-span-2 border border-border/60 rounded-lg p-7 flex flex-col hover:border-accent/30 transition-colors duration-300 group"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{featured.icon}</span>
              <div>
                <h3 className="font-bold text-foreground text-lg group-hover:text-accent transition-colors">
                  {featured.name}
                </h3>
                <span className="text-xs font-mono text-muted-foreground">{featured.period}</span>
              </div>
            </div>
            {featured.badge && (
              <Badge className="text-xs bg-accent/10 text-accent border-accent/20 shrink-0">
                {featured.badge}
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
            {featured.description}
          </p>

          <ul className="space-y-2 mb-6">
            {featured.highlights.map((h, hi) => (
              <li key={hi} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-accent mt-0.5 shrink-0">▸</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/60">
            {featured.techStack.map((tech) => (
              <span key={tech} className="text-xs font-mono text-muted-foreground/60 hover:text-muted-foreground transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Secondary 项目（右侧竖排） */}
        <div className="flex flex-col gap-4">
          {secondary.map((proj, i) => (
            <motion.div
              key={proj.name}
              className="border border-border/60 rounded-lg p-5 flex flex-col flex-1 hover:border-accent/30 transition-colors duration-300 group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1, duration: 0.6 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{proj.icon}</span>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">
                      {proj.name}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">{proj.period}</span>
                  </div>
                </div>
                {proj.badge && (
                  <Badge className="text-xs bg-accent/10 text-accent border-accent/20 shrink-0">
                    {proj.badge}
                  </Badge>
                )}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {proj.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 下部：tertiary（3等分紧凑卡片） */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tertiary.map((proj, i) => (
          <motion.div
            key={proj.name}
            className="border border-border/60 rounded-lg p-5 hover:border-accent/30 transition-colors duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i + 3) * 0.08, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{proj.icon}</span>
              <h3 className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors truncate">
                {proj.name}
              </h3>
            </div>
            {proj.badge && (
              <Badge className="text-xs bg-accent/10 text-accent border-accent/20 mb-2">
                {proj.badge}
              </Badge>
            )}
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {proj.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
