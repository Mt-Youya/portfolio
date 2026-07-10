import { NextResponse } from "next/server"

import type { Locale } from "@/i18n/routing"
import profile from "@content/profile.json"
import zhMessages from "@/messages/zh.json"
import enMessages from "@/messages/en.json"

export const runtime = "edge"
export const dynamic = "force-dynamic"

const CACHE_TTL = 10 * 60 * 1000
type CacheEntry = { answer: string; repoCount: number | null; expires: number }
const memCache = new Map<string, CacheEntry>()

const DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions"
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL ?? "deepseek-chat"
const GITHUB_LOGIN = profile.identity.github

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
          'Must mention "domestic LLMs" (generic, do not name specific models).',
          "Carry narrative order: frontend origin -> full-stack (Tauri/Node) -> now agent-engineering.",
          "No exaggeration, no fabrication beyond the profile.",
          "Plain tone, agent's statement, no sloganeering.",
          "Output only the self-introduction sentence, no explanation/quotes/prefix.",
        ].join(" ")
      : [
          `你是「${f.name}的 Agent」,第一人称自我介绍,不是主人在说话。`,
          "输出单句,≤ 80 字,终端一行可容。",
          "必须提及主打项目 TubePilot(可附一句话功能)。",
          "必须提及「国产模型」(不具名,泛指)。",
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
    choices?: { message?: { content?: string } }[]
  }
  const answer = data.choices?.[0]?.message?.content?.trim()
  if (!answer) {
    throw new Error("deepseek: empty answer")
  }
  return answer
}

async function getCached(key: string): Promise<CacheEntry | null> {
  const entry = memCache.get(key)
  if (entry && entry.expires > Date.now()) {
    return entry
  }
  if (entry) {
    memCache.delete(key)
  }
  return null
}

async function setCached(key: string, answer: string, repoCount: number | null) {
  memCache.set(key, { answer, repoCount, expires: Date.now() + CACHE_TTL })
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
    return NextResponse.json({ answer: cached.answer, repoCount: cached.repoCount })
  }

  try {
    const repoCount = await fetchGithubRepoCount()
    const answer = await callDeepSeek(lang, repoCount)
    await setCached(cacheKey, answer, repoCount)
    return NextResponse.json({ answer, repoCount })
  } catch {
    const fallback = fallbackAnswer(lang)
    await setCached(cacheKey, fallback, null)
    return NextResponse.json({ answer: fallback, repoCount: null })
  }
}
