'use client'

import { Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useAppStore, type Theme } from '@/store/useAppStore'

const CYCLE: Theme[] = ['dark', 'light']

const icons: Record<Theme, React.ReactNode> = {
  dark:  <Moon size={16} />,
  light: <Sun size={16} />,
}

export function ThemeToggle() {
  const theme = useAppStore((s) => s.theme)
  const setTheme = useAppStore((s) => s.setTheme)
  const t = useTranslations('theme')

  function next() {
    const idx = CYCLE.indexOf(theme)
    setTheme(CYCLE[(idx + 1) % CYCLE.length])
  }

  return (
    <button
      onClick={next}
      aria-label={t('ariaLabel', { theme: t(theme) })}
      title={t(theme)}
      className="relative flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-border/50 transition-colors duration-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
          transition={{ duration: 0.18 }}
          className="absolute"
        >
          {icons[theme]}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
