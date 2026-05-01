import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { mdxComponents } from '@/components/blog/mdx'
import { BlogHeader } from '@/components/shared/BlogHeader'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) return {}
  const authorName = locale === 'en' ? 'Yonjay Doyle' : '窦扬杰'
  return {
    title: `${post.title} — ${authorName}`,
    description: post.summary,
  }
}

function PostContent({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <MDXContent components={mdxComponents as any} />
}

export default async function PostPage({ params }: PageProps) {
  const { slug, locale } = await params
  const post = allPosts.find((p) => p.slug === slug)
  const t = await getTranslations('blog')

  if (!post) notFound()

  const date = new Date(post.date).toLocaleDateString(
    locale === 'en' ? 'en-US' : 'zh-CN',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader
        right={
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-foreground transition-colors"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
            {t('backToBlog')}
          </Link>
        }
      />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-accent/70 border border-accent/20 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground/70 leading-relaxed mb-6">
            {post.summary}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground/50 font-mono border-t border-border/30 pt-6">
            <time>{date}</time>
            <span>·</span>
            <span>{t('author')}</span>
          </div>
        </header>

        {post.cover && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-12 border border-border/30">
            <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <article className="prose-custom">
          <PostContent code={post.body.code} />
        </article>

        <footer className="mt-16 pt-8 border-t border-border/30">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-accent transition-colors"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
            {t('backToBlogAll')}
          </Link>
        </footer>
      </main>
    </div>
  )
}
