import type { ExternalPost } from './types'

export async function fetchYuqueDocs(): Promise<ExternalPost[]> {
  const token = process.env.YUQUE_TOKEN
  const repo = process.env.YUQUE_REPO // 格式: namespace/repo-slug，例如 yonjay/blog

  if (!token || !repo) return []

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    const res = await fetch(`https://www.yuque.com/api/v2/repos/${repo}/docs`, {
      headers: {
        'X-Auth-Token': token,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!res.ok) return []

    const data = await res.json()
    const docs = data?.data ?? []

    return docs
      .filter((doc: Record<string, unknown>) => doc.status === 1) // 只取已发布
      .slice(0, 10)
      .map((doc: Record<string, string>) => ({
        title: doc.title ?? '',
        url: `https://www.yuque.com/${repo}/${doc.slug}`,
        date: doc.updated_at ? new Date(doc.updated_at).toISOString() : '',
        summary: doc.description ?? doc.title ?? '',
      }))
  } catch {
    return []
  }
}
