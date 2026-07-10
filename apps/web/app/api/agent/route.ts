import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

import type { Locale } from "@/i18n/routing"
import profile from "@content/profile.json"
import zhMessages from "@/messages/zh.json"
import enMessages from "@/messages/en.json"

export const dynamic = "force-dynamic"

const CACHE_TTL_SECONDS = 10 * 60
const CACHE_TTL = CACHE_TTL_SECONDS * 1000
type CacheValue = { answer: string; repoCount: number | null }
type CacheEntry = CacheValue & { expires: number }
type AgentSource = "cache" | "deepseek" | "fallback"
const memCache = new Map<string, CacheEntry>()

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions"
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL ?? "deepseek-v4-pro"
const GITHUB_LOGIN = profile.identity.github

let redis: Redis | null | undefined

function getRedis() {
  if (redis !== undefined) {
    return redis
  }

  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN

  if (!url || !token || !url.startsWith("https://")) {
    redis = null
    return redis
  }

  redis = new Redis({ url, token })
  return redis
}

type Lang = Locale

function fallbackAnswer(lang: Lang) {
  const msgs = lang === "en" ? enMessages : zhMessages
  return msgs.site?.hero?.fallbackAnswer ?? ""
}

function prefilterProfile(lang: Lang) {
  const p = profile as typeof profile
  const name = lang === "en" ? p.identity.nameEn : p.identity.nameZh
  const positioning = lang === "en" ? p.positioning.en : p.positioning.zh
  const flagship = p.projects[0]
  const tagline = lang === "en" ? flagship.tagline.en : flagship.tagline.zh
  const stackOverview = [
    ...p.stack.ui.slice(0, 2),
    ...(p.stack.api[0] ? [p.stack.api[0]] : []),
    ...(p.stack.infra[0] ? [p.stack.infra[0]] : []),
  ].join(" / ")

  return {
    name,
    github: p.identity.github,
    positioning,
    stackOverview,
    flagshipName: flagship.name,
    flagshipTagline: tagline,
    deepseekNote: p.deepseekNote,
  }
}

async function fetchGithubRepoCount(): Promise<number> {
  const token = process.env.GITHUB_TOKEN

  if (token) {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { user(login: "${GITHUB_LOGIN}") { pinnedItems(first: 10) { totalCount } } }`,
      }),
    })
    if (res.ok) {
      const data = (await res.json()) as {
        data?: { user?: { pinnedItems?: { totalCount?: number } } }
      }
      const n = data.data?.user?.pinnedItems?.totalCount
      if (typeof n === "number") {
        return n
      }
    }
  }

  const res = await fetch(`https://api.github.com/users/${GITHUB_LOGIN}`)
  if (!res.ok) {
    throw new Error(`github fetch failed: ${res.status}`)
  }
  const data = (await res.json()) as { public_repos?: number }
  if (typeof data.public_repos !== "number") {
    throw new Error("github fetch: no public_repos")
  }
  return data.public_repos
}

function buildPrompt(lang: Lang, repoCount: number) {
  const f = prefilterProfile(lang)

  const system =
    lang === "en"
      ? [
          `You are "${f.name}'s agent", first-person self-introduction, not the master speaking.`,
          "Output a single sentence, <= 33 words, fits one terminal line.",
          "Must mention flagship project TubePilot (may append one-line function).",
          "Carry narrative order: frontend origin -> full-stack (Tauri/Node) -> now agent-engineering.",
          "No exaggeration, no fabrication beyond the profile.",
          "Plain tone, agent's statement, no sloganeering.",
          "Output only the self-introduction sentence, no explanation/quotes/prefix.",
        ].join(" ")
      : [
          `你是「${f.name}的 Agent」,第一人称自我介绍,不是主人在说话。`,
          "输出单句,≤ 80 字,终端一行可容。",
          "必须提及主打项目 TubePilot(可附一句话功能)。",
          "承载叙事顺序:前端出身 → 全栈(Tauri/Node)→ 现在跑 Agent 工程。",
          "不夸大、不编造未在档案中的经历。",
          "口吻平实,像 Agent 的陈述,不喊口号。",
          "只输出自我介绍句本身,不输出任何解释、引号、前缀。",
        ].join(" ")

  const user =
    lang === "en"
      ? [
          "Master profile:",
          `- Name: ${f.name}`,
          `- GitHub: ${f.github} (${repoCount} public repos)`,
          `- Positioning: ${f.positioning}`,
          `- Stack overview: ${f.stackOverview}`,
          `- Flagship project: ${f.flagshipName} — ${f.flagshipTagline}`,
          `- DeepSeek engineering: ${f.deepseekNote}`,
          "",
          "Introduce yourself as the master's agent.",
        ].join("\n")
      : [
          "主人档案:",
          `- 名字: ${f.name}`,
          `- GitHub: ${f.github}(${repoCount} 个公开仓库)`,
          `- 定位: ${f.positioning}`,
          `- 技术栈概览: ${f.stackOverview}`,
          `- 主打项目: ${f.flagshipName} — ${f.flagshipTagline}`,
          `- DeepSeek 工程化: ${f.deepseekNote}`,
          "",
          "请以主人 Agent 的第一人称生成自我介绍。",
        ].join("\n")

  return { system, user }
}

async function callDeepSeek(lang: Lang, repoCount: number): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY not set")
  }

  const { system, user } = buildPrompt(lang, repoCount)

  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      stream: false,
      // This endpoint needs a short final sentence; reasoning mode can consume
      // the small output budget before producing message.content.
      thinking: { type: "disabled" },
      temperature: 0.7,
      max_tokens: 120,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  })

  if (!res.ok) {
    throw new Error(`deepseek failed: ${res.status}`)
  }

  const data = (await res.json()) as {
    choices?: { finish_reason?: string; message?: { content?: string | null } }[]
  }
  const answer = data.choices?.[0]?.message?.content?.trim()
  if (!answer) {
    const finishReason = data.choices?.[0]?.finish_reason ?? "unknown"
    throw new Error(`deepseek: empty answer (finish_reason=${finishReason})`)
  }
  return answer
}

async function getCached(key: string): Promise<CacheValue | null> {
  const entry = memCache.get(key)
  if (entry && entry.expires > Date.now() && entry.repoCount !== null) {
    return entry
  }
  if (entry) {
    memCache.delete(key)
  }

  const redis = getRedis()
  if (redis) {
    try {
      const cached = await redis.get<CacheValue>(key)
      if (cached?.answer && cached.repoCount !== null) {
        return cached
      }
    } catch {
      return null
    }
  }

  return null
}

async function setCached(key: string, answer: string, repoCount: number | null) {
  const value = { answer, repoCount }
  memCache.set(key, { ...value, expires: Date.now() + CACHE_TTL })

  const redis = getRedis()
  if (redis) {
    try {
      await redis.set(key, value, { ex: CACHE_TTL_SECONDS })
    } catch {
      // Redis cache is best-effort; the in-memory cache still covers local/dev fallback.
    }
  }
}

function agentResponse(value: CacheValue, source: AgentSource, error?: unknown) {
  const debug = process.env.NODE_ENV !== "production"
  const body = debug && error instanceof Error ? { ...value, source, error: error.message } : { ...value, source }
  return NextResponse.json(body)
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const langParam = url.searchParams.get("lang")

  if (langParam !== "zh" && langParam !== "en") {
    return NextResponse.json({ error: "invalid lang" }, { status: 400 })
  }
  const lang: Lang = langParam

  const cacheKey = `agent:intro:${lang}`
  const cached = await getCached(cacheKey)
  if (cached) {
    return agentResponse(cached, "cache")
  }

  try {
    const repoCount = await fetchGithubRepoCount()
    const answer = await callDeepSeek(lang, repoCount)
    await setCached(cacheKey, answer, repoCount)
    return agentResponse({ answer, repoCount }, "deepseek")
  } catch (error) {
    console.error("[api/agent] fallback", error)
    const fallback = fallbackAnswer(lang)
    return agentResponse({ answer: fallback, repoCount: null }, "fallback", error)
  }
}
