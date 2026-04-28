'use client'

interface VideoProps {
  src: string
  poster?: string
  title?: string
}

export function Video({ src, poster, title }: VideoProps) {
  return (
    <figure className="my-8">
      {title && (
        <figcaption className="text-sm text-muted-foreground mb-3 font-mono">{title}</figcaption>
      )}
      <video
        src={src}
        poster={poster}
        controls
        preload="metadata"
        className="w-full rounded-xl border border-border/50 bg-surface"
      />
    </figure>
  )
}
