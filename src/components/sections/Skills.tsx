'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { skillItems } from '@/data/resume'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export function Skills() {
  const t = useTranslations('skills')
  const tResume = useTranslations('resume')

  const skillCategories = tResume.raw('skillCategories') as { category: string }[]
  const skills = skillItems.map((s, i) => ({
    ...s,
    category: skillCategories[i]?.category ?? '',
  }))

  return (
    <section id="skills" className="section-padding px-6 max-w-6xl mx-auto">
      <SectionTitle
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.08, duration: 0.6 }}
          >
            <Card className="card-hover group rounded-2xl p-6 gap-0">
              <CardContent className="px-0">
                {/* 分类标题 */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{group.icon}</span>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {group.category}
                  </h3>
                </div>

                {/* 技能标签 */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, ii) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.08 + ii * 0.04, duration: 0.3 }}
                    >
                      <Badge
                        variant="outline"
                        className="font-mono text-xs text-muted-foreground hover:border-accent/50 hover:text-accent hover:bg-accent/5 cursor-default"
                      >
                        {item}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 底部强调 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="mt-12 p-6 border-accent/20 rounded-2xl text-center gap-0">
          <CardContent className="px-0">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('productionNotePre')}{' '}
              <span className="text-accent font-semibold">{t('productionNoteHighlight')}</span>
              {' '}{t('productionNotePost')}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
