'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTransition } from 'react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('language')
  const [isPending, startTransition] = useTransition()

  function switchLocale() {
    const next = locale === 'zh' ? 'en' : 'zh'
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      title={t('switchTo')}
      aria-label={t('switchTo')}
      className={`
        flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono
        text-muted-foreground hover:text-foreground hover:bg-border/50
        transition-colors duration-200
        ${isPending ? 'opacity-50 cursor-wait' : ''}
      `}
    >
      <span className="font-semibold text-accent">{locale.toUpperCase()}</span>
      <span className="text-border/70">/</span>
      <span className="opacity-50">{locale === 'zh' ? 'EN' : 'ZH'}</span>
    </button>
  )
}
