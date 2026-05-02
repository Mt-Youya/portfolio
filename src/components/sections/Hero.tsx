'use client'

import { motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon, Mail01Icon, Link01Icon } from '@hugeicons/core-free-icons'
import dynamic from 'next/dynamic'
import { useLocale, useTranslations } from 'next-intl'
import { personalInfo } from '@/data/resume'
import { scrollToSection } from '@/lib/scroll'
import { containerVariants, itemVariants } from '@/lib/animations'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/useAppStore'

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => ({ default: m.HeroScene })),
  { ssr: false }
)

export function Hero() {
  const locale = useLocale()
  const t = useTranslations('hero')
  const tResume = useTranslations('resume.personalInfo')
  // PreLoader 完成后才挂载 Three.js，避免 WebGL 初始化与 PreLoader 动画竞争主线程
  const isLoaded = useAppStore((s) => s.isLoaded)

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js 背景：等 PreLoader 退场后再初始化 WebGL */}
      {isLoaded && <HeroScene />}

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-linear-to-b from-background/20 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60 pointer-events-none" />

      {/* 内容 */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 标签 */}
        <motion.div variants={itemVariants} className="mb-6">
          <Badge
            variant="outline"
            className="font-mono tracking-widest uppercase text-accent border-accent/30 backdrop-blur-sm bg-background/20 h-auto py-1.5 px-4"
          >
            {t('badge', {
              location: tResume('location'),
              education: tResume('education'),
              age: personalInfo.age,
            })}
          </Badge>
        </motion.div>

        {/* 姓名 */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-4"
          variants={itemVariants}
        >
          <span className="text-foreground">{locale === 'zh' ? personalInfo.name : personalInfo['nameEn']}</span>
        </motion.h1>

        {/* 英文名 */}
        <motion.p
          className="text-lg md:text-xl font-mono text-muted-foreground tracking-[0.3em] uppercase mb-4"
          variants={itemVariants}
        >
          {personalInfo.nameEn}
        </motion.p>

        {/* 职位 */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl md:text-2xl font-semibold text-gradient mb-6">
            {tResume('title')}
          </h2>
        </motion.div>

        {/* 简介 */}
        <motion.p
          className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10"
          variants={itemVariants}
        >
          {t('subtitle')}
        </motion.p>

        {/* 按钮组 */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
          >
            <HugeiconsIcon icon={Mail01Icon} size={16} />
            {t('contactBtn')}
          </a>
          <a
            href={personalInfo.links.juejin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-border hover:border-accent text-foreground hover:text-accent px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm bg-surface/30"
          >
            {t('juejinBtn')}
            <HugeiconsIcon icon={Link01Icon} size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </motion.div>

      {/* 向下滚动提示 */}
      <motion.button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground/60 hover:text-accent transition-colors flex flex-col items-center gap-1 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">{t('scrollHint')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HugeiconsIcon icon={ArrowDown01Icon} size={20} />
        </motion.div>
      </motion.button>
    </section>
  )
}
