import { XMLParser } from 'fast-xml-parser'
import type { ExternalPost } from './types'

// https://api.juejin.cn/content_api/v1/article/query_list?aid=2608&uuid=7537240873898509843&spider=0
const JUEJIN_RSS_URL = 'https://juejin.cn/user/3554089909627287'

export async function fetchJuejinPosts(): Promise<ExternalPost[]> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    const res = await fetch(JUEJIN_RSS_URL, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio/1.0)' },
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!res.ok) return []

    const xml = await res.text()
    const parser = new XMLParser({ ignoreAttributes: false })
    const result = parser.parse(xml)

    const items = result?.rss?.channel?.item
    if (!items) return []

    const list = Array.isArray(items) ? items : [items]

    return list.slice(0, 10).map((item: Record<string, string>) => ({
      title: item.title ?? '',
      url: item.link ?? '',
      date: item.pubDate ? new Date(item.pubDate).toISOString() : '',
      summary: item.description
        ? String(item.description).replace(/<[^>]+>/g, '').slice(0, 120) + '...'
        : '',
    }))
  } catch {
    return []
  }
}
