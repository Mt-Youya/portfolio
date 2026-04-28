'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useAppStore } from '@/store/useAppStore'
import { scrollToSection } from '@/lib/scroll'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const t = useTranslations('nav')
  const activeSection = useAppStore((s) => s.activeSection)
  const isMenuOpen = useAppStore((s) => s.isMenuOpen)
  const setMenuOpen = useAppStore((s) => s.setMenuOpen)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { id: 'hero',       label: t('home')       },
    { id: 'about',      label: t('about')      },
    { id: 'skills',     label: t('skills')     },
    { id: 'experience', label: t('experience') },
    { id: 'projects',   label: t('projects')   },
    { id: 'contact',    label: t('contact')    },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Button
            variant="ghost"
            onClick={() => scrollToSection('hero')}
            className="px-2"
          >
            <span className="text-accent">Y</span>
            <span className="text-foreground">D</span>
          </Button>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium ${
                  activeSection === item.id
                    ? 'text-accent'
                    : 'text-muted-foreground/70 hover:text-foreground'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                    layoutId="nav-dot"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Button>
            ))}
          </div>

          {/* 语言切换 + 主题切换 + 联系按钮（桌面） */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="text-sm font-semibold border-accent/40 text-accent hover:bg-accent hover:text-black rounded-full"
            >
              {t('contactBtn')}
            </Button>
          </div>

          {/* 移动端菜单按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground hover:text-accent"
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label={t('toggleMenu')}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </motion.nav>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id)
                  setMenuOpen(false)
                }}
                className={`text-2xl font-bold transition-colors ${
                  activeSection === item.id ? 'text-accent' : 'text-foreground/70 hover:text-foreground'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.06 }}
              className="mt-4 flex items-center gap-3"
            >
              <LanguageSwitcher />
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
