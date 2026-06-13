'use client'

import { motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import { useTranslations } from 'next-intl'
import { friendlyLinks } from '@/data/resume'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* 友情链接标题 */}
        <motion.p
          className="text-xs font-mono tracking-widest uppercase text-muted-foreground/40 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t('title')}
        </motion.p>

        {/* 链接列表 */}
        <motion.div
          className="flex flex-wrap gap-x-6 gap-y-2"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {friendlyLinks.map((link, i) => (
            <motion.a
              key={link.key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm text-muted-foreground/50 hover:text-accent transition-colors"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              title={t(`links.${link.key}`)}
            >
              <span>{link.name}</span>
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={12}
                className="text-muted-foreground/20 group-hover:text-accent/60 transition-colors"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* 版权 */}
        <motion.p
          className="mt-6 text-xs text-muted-foreground/20 font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          © {new Date().getFullYear()} Cyrus · yonjay.me
        </motion.p>
      </div>
    </footer>
  )
}
