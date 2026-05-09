'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { skillItems } from '@/data/resume'

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
        {skills.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.07, duration: 0.5 }}
          >
            {/* 分类标题 */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/60">
              <span className="text-base leading-none">{group.icon}</span>
              <h3 className="text-xs font-mono tracking-widest uppercase text-accent">
                {group.category}
              </h3>
            </div>

            {/* 技能列表——内联逗号分隔 */}
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {group.items.map((item, ii) => (
                <motion.span
                  key={item}
                  className="text-sm text-foreground/65 hover:text-foreground transition-colors cursor-default"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.07 + ii * 0.03, duration: 0.3 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 底部强调 */}
      <motion.p
        className="mt-14 text-center text-sm text-muted-foreground border-t border-border pt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {t('productionNotePre')}
        <span className="text-accent font-semibold">{t('productionNoteHighlight')}</span>
        {t('productionNotePost')}
      </motion.p>
    </section>
  )
}
