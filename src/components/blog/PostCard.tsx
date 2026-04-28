import Link from 'next/link'
import type { Post } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={post.url} className="group block h-full">
      <article className="h-full p-6 rounded-2xl border border-border/50 bg-surface/30 hover:border-accent/40 hover:bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5">
        {post.cover && (
          <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-background/50">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="font-mono text-accent/70 border-accent/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h2 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors mb-2 line-clamp-2">
          {post.title}
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {post.summary}
        </p>

        <time className="text-xs font-mono text-muted-foreground/60">{date}</time>
      </article>
    </Link>
  )
}
