'use client'

interface AudioProps {
  src: string
  title?: string
}

export function Audio({ src, title }: AudioProps) {
  return (
    <figure className="my-8 p-4 rounded-xl border border-border/50 bg-surface/50">
      {title && (
        <figcaption className="text-sm text-muted-foreground mb-3 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          {title}
        </figcaption>
      )}
      <audio
        src={src}
        controls
        preload="metadata"
        className="w-full accent-accent"
      />
    </figure>
  )
}
