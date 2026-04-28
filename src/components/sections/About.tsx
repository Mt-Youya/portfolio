'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { personalInfo, highlightIcons } from '@/data/resume'
import { Card, CardContent } from '@/components/ui/card'

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
        {/* 左侧：简介 + 统计 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-foreground/90 text-base md:text-lg leading-relaxed mb-8">
            {tResume('personalInfo.bio')}
          </p>

          {/* 统计数据 */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="card-hover p-5 gap-1">
                  <CardContent className="px-0">
                    <div className="text-3xl font-black text-gradient mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground tracking-wide">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 联系信息 */}
          <div className="mt-8 space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-accent font-mono">📍</span>
              <span className="text-muted-foreground">{tResume('personalInfo.location')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-accent font-mono">📧</span>
              <a href={`mailto:${personalInfo.email}`} className="text-muted-foreground hover:text-accent transition-colors">
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-accent font-mono">📱</span>
              <span className="text-muted-foreground">{personalInfo.phone}</span>
            </div>
          </div>
        </motion.div>

        {/* 右侧：个人亮点 */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-sm font-mono tracking-widest uppercase text-accent mb-6">
            {t('highlightsTitle')}
          </h3>
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <Card className="card-hover group p-5 gap-0">
                <CardContent className="px-0">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5">{highlightIcons[i]}</span>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                        {h.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{h.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
