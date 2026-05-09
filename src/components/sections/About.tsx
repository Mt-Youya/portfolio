'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { personalInfo, highlightIcons } from '@/data/resume'

export function About() {
  const t = useTranslations('about')
  const tResume = useTranslations('resume')

  const stats = tResume.raw('stats') as { label: string; value: string }[]
  const highlights = tResume.raw('highlights') as { title: string; description: string }[]

  return (
    <section id="about" className="section-padding px-6 max-w-6xl mx-auto">
      <SectionTitle
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* 左侧：简介 + 统计 + 联系信息 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-10">
            {tResume('personalInfo.bio')}
          </p>

          {/* 统计数字——直排，无卡片容器 */}
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <dt className="text-5xl font-black text-accent tabular-nums leading-none mb-1">
                  {stat.value}
                </dt>
                <dd className="text-xs text-muted-foreground tracking-wide uppercase font-mono">
                  {stat.label}
                </dd>
              </motion.div>
            ))}
          </dl>

          {/* 联系信息 */}
          <div className="space-y-2 border-t border-border pt-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-accent font-mono w-4">📍</span>
              <span className="text-muted-foreground">{tResume('personalInfo.location')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-accent font-mono w-4">📧</span>
              <a href={`mailto:${personalInfo.email}`} className="text-muted-foreground hover:text-accent transition-colors">
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-accent font-mono w-4">📱</span>
              <span className="text-muted-foreground">{personalInfo.phone}</span>
            </div>
          </div>
        </motion.div>

        {/* 右侧：个人亮点——序号列表，无 Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-xs font-mono tracking-widest uppercase text-accent mb-6">
            {t('highlightsTitle')}
          </h3>
          <div className="divide-y divide-border">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                className="py-5 flex items-start gap-5 group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="text-xs font-mono text-accent/50 tabular-nums pt-0.5 shrink-0 w-6 group-hover:text-accent transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors">
                    {h.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
