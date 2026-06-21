'use client'

import { motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { Mail01Icon, Call02Icon, Book01Icon, FileCodeIcon, CodeSimpleIcon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { personalInfo } from '@/data/resume'

export function Contact() {
  const t = useTranslations('contact')

  const contactLinks = [
    {
      icon: Mail01Icon,
      label: t('links.email.label'),
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      desc: t('links.email.desc'),
    },
    {
      icon: Call02Icon,
      label: t('links.phone.label'),
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      desc: t('links.phone.desc'),
    },
    {
      icon: Book01Icon,
      label: t('links.yuque.label'),
      value: 'yuque.com/yonjay',
      href: personalInfo.links.yuque,
      desc: t('links.yuque.desc'),
    },
    {
      icon: FileCodeIcon,
      label: t('links.juejin.label'),
      value: 'JayDo257248',
      href: personalInfo.links.juejin,
      desc: t('links.juejin.desc'),
    },
    {
      icon: CodeSimpleIcon,
      label: t('links.csdn.label'),
      value: 'Yonjay257248',
      href: personalInfo.links.csdn,
      desc: t('links.csdn.desc'),
    },
  ]

  return (
    <section id="contact" className="section-padding px-6 max-w-3xl mx-auto">
      <SectionTitle
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
        center
      />

      {/* 主邮箱 CTA */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <a
          href={`mailto:${personalInfo.email}`}
          className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-black font-bold text-base px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
        >
          <HugeiconsIcon icon={Mail01Icon} size={18} />
          {personalInfo.email}
        </a>
        <p className="mt-3 text-xs text-muted-foreground font-mono tracking-wide">{t('ctaHint')}</p>
      </motion.div>

      {/* 联系方式列表——无卡片，用分隔线 */}
      <motion.div
        className="divide-y divide-border border-t border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {contactLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-4 py-4 group hover:bg-transparent transition-colors"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
          >
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <HugeiconsIcon icon={link.icon} size={16} className="text-accent/60 group-hover:text-accent transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground/50 font-mono mb-0.5">{link.label}</div>
              <div className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors truncate">
                {link.value}
              </div>
            </div>
            <div className="text-xs text-muted-foreground/40 hidden sm:block shrink-0">
              {link.desc}
            </div>
            {link.href.startsWith('http') && (
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={14}
                className="text-muted-foreground/30 group-hover:text-accent transition-colors shrink-0"
              />
            )}
          </motion.a>
        ))}
      </motion.div>

      {/* 底部文字 */}
      <motion.p
        className="text-center text-muted-foreground/30 text-xs mt-14 font-mono"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {t('builtWith')}
      </motion.p>
    </section>
  )
}
