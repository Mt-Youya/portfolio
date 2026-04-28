import { ExternalLink } from 'lucide-react'
import type { ExternalPost } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

type Platform = 'juejin' | 'yuque'

interface ExternalCardProps extends ExternalPost {
  platform: Platform
}

const platformConfig: Record<Platform, { label: string; className: string }> = {
  juejin: {
    label: '掘金',
    className: 'text-blue-400 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20',
  },
  yuque: {
    label: '语雀',
    className: 'text-green-400 bg-green-500/10 border-green-500/20 hover:bg-green-500/20',
  },
}

export function ExternalCard({ title, url, date, summary, platform }: ExternalCardProps) {
  const config = platformConfig[platform]
  const dateStr = date
    ? new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <article className="h-full p-6 rounded-2xl border border-border/50 bg-surface/20 hover:border-border hover:bg-surface/40 transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-3">
          <Badge className={`font-mono ${config.className}`}>
            {config.label}
          </Badge>
          <ExternalLink size={14} className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
        </div>

        <h2 className="text-base font-semibold text-foreground group-hover:text-foreground transition-colors mb-2 line-clamp-2">
          {title}
        </h2>

        {summary && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {summary}
          </p>
        )}

        {dateStr && (
          <time className="text-xs font-mono text-muted-foreground/60">{dateStr}</time>
        )}
      </article>
    </a>
  )
}
