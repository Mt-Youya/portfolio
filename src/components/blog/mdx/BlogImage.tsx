import Image from 'next/image'

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export function BlogImage({ src, alt, caption, width = 800, height = 450 }: BlogImageProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-border/50">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-3 font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
