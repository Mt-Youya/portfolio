import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PostCard } from '@/components/blog/PostCard'
import { ExternalCard } from '@/components/blog/ExternalCard'
import { BlogHeader } from '@/components/shared/BlogHeader'
import { fetchJuejinPosts } from '@/lib/juejin'
import { fetchYuqueDocs } from '@/lib/yuque'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.blog' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function BlogPage() {
  const t = await getTranslations('blog')

  const localPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  const [juejinPosts, yuqueDocs] = await Promise.allSettled([
    fetchJuejinPosts(),
    fetchYuqueDocs(),
  ])

  const juejin = juejinPosts.status === 'fulfilled' ? juejinPosts.value : []
  const yuque = yuqueDocs.status === 'fulfilled' ? yuqueDocs.value : []

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader
        right={
          <nav className="flex items-center gap-6 text-sm text-muted-foreground/70">
            <Link href="/" className="hover:text-foreground transition-colors">
              {t('backHome')}
            </Link>
            <span className="text-accent font-semibold text-foreground">{t('currentPage')}</span>
          </nav>
        }
      />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-accent border border-accent/30 px-4 py-1.5 rounded-full">
            {t('badge')}
          </span>
          <h1 className="text-5xl md:text-6xl font-black mt-6 mb-4 text-foreground">
            {t('title')}
          </h1>
          <p className="text-muted-foreground/70 text-lg max-w-xl">
            {t('subtitle')}
          </p>
        </div>

        {localPosts.length > 0 && (
          <section className="mb-20">
            <h2 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-1 h-5 bg-accent rounded-full" />
              {t('localSection')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {juejin.length > 0 && (
          <section className="mb-20">
            <h2 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-1 h-5 bg-blue-400 rounded-full" />
              {t('juejinSection')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {juejin.map((post) => (
                <ExternalCard key={post.url} {...post} platform="juejin" />
              ))}
            </div>
          </section>
        )}

        {yuque.length > 0 && (
          <section className="mb-20">
            <h2 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-1 h-5 bg-green-400 rounded-full" />
              {t('yuqueSection')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yuque.map((doc) => (
                <ExternalCard key={doc.url} {...doc} platform="yuque" />
              ))}
            </div>
          </section>
        )}

        {localPosts.length === 0 && juejin.length === 0 && yuque.length === 0 && (
          <div className="text-center py-24 text-muted-foreground/50">
            <p className="text-lg font-mono">{t('empty')}</p>
          </div>
        )}
      </main>
    </div>
  )
}
