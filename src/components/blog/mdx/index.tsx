import type { ReactNode } from 'react'
import { Video } from './Video'
import { Audio } from './Audio'
import { BlogImage } from './BlogImage'

type C = { children?: ReactNode }
type A = C & { href?: string }

export const mdxComponents: Record<string, unknown> = {
  Video,
  Audio,
  BlogImage,
  h1: ({ children }: C) => (
    <h1 className="text-3xl font-black mt-12 mb-6 text-foreground">{children}</h1>
  ),
  h2: ({ children }: C) => (
    <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground border-b border-border/30 pb-2">{children}</h2>
  ),
  h3: ({ children }: C) => (
    <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground/90">{children}</h3>
  ),
  p: ({ children }: C) => (
    <p className="text-foreground/75 leading-relaxed mb-4">{children}</p>
  ),
  a: ({ href, children }: A) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors">
      {children}
    </a>
  ),
  code: ({ children }: C) => (
    <code className="font-mono text-sm bg-surface border border-border/50 rounded px-1.5 py-0.5 text-accent/90">
      {children}
    </code>
  ),
  pre: ({ children }: C) => (
    <pre className="bg-surface border border-border/50 rounded-xl p-4 overflow-x-auto my-6 text-sm font-mono">
      {children}
    </pre>
  ),
  ul: ({ children }: C) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/75">{children}</ul>
  ),
  ol: ({ children }: C) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground/75">{children}</ol>
  ),
  li: ({ children }: C) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }: C) => (
    <blockquote className="border-l-4 border-accent pl-4 py-1 my-6 text-foreground/60 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border/30 my-8" />,
}
