import Link from 'next/link'
import type { ReactNode } from 'react'

interface BlogHeaderProps {
  right?: ReactNode
}

export function BlogHeader({ right }: BlogHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-black text-xl tracking-tight hover:text-accent transition-colors">
          <span className="text-accent">Y</span>
          <span className="text-foreground">D</span>
        </Link>
        {right}
      </div>
    </header>
  )
}
