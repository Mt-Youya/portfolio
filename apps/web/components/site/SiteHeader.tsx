import Link from "next/link"

import { ThemeToggle } from "@/components/theme/ThemeToggle"
import type { NavItem } from "@/components/site/types"

export function SiteHeader({
  locale,
  navLabel,
  navItems,
  localeHref,
  localeSwitchLabel,
}: {
  locale: string
  navLabel: string
  navItems: NavItem[]
  localeHref: string
  localeSwitchLabel: string
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-grid bg-paper/95 px-5 backdrop-blur sm:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        <Link href={`/${locale}`} className="font-mono text-xs uppercase tracking-[0.24em] text-blueprint">
          yonjay.me
        </Link>

        <nav aria-label={navLabel} className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-ink-soft transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={localeHref}
            className="inline-flex h-10 items-center justify-center rounded-xs border border-grid bg-paper-raised px-3 text-sm font-medium text-ink transition-colors hover:border-blueprint hover:text-blueprint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            {localeSwitchLabel}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
