'use client'

import { motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { Mail01Icon, Call02Icon, Book01Icon, FileCodeIcon, CodeSimpleIcon } from '@hugeicons/core-free-icons'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { personalInfo } from '@/data/resume'
import { Card, CardContent } from '@/components/ui/card'

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
    <section id="contact" className="section-padding px-6 max-w-4xl mx-auto">
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
          className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-black font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:scale-105"
        >
          <HugeiconsIcon icon={Mail01Icon} size={20} />
          {personalInfo.email}
        </a>
        <p className="mt-3 text-sm text-muted-foreground">{t('ctaHint')}</p>
      </motion.div>

      {/* 联系方式列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Card className="card-hover group rounded-xl p-5 gap-0">
                <CardContent className="px-0 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <HugeiconsIcon icon={link.icon} size={18} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground mb-0.5">{link.label}</div>
                    <div className="font-medium text-foreground text-sm truncate group-hover:text-accent transition-colors">
                      {link.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{link.desc}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.a>
        ))}
      </div>

      {/* 底部文字 */}
      <motion.p
        className="text-center text-muted-foreground/40 text-xs mt-16 font-mono"
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
