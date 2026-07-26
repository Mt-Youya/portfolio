"use client"

import { useMemo, useState } from "react"

import { Button } from "@cyrus/ui/button"

import { ResumePaper } from "@/components/ResumePaper"
import { parseResume, validateResume } from "@/lib/resume-contract"

type PublishedVersion = { id: string; message: string; date: string; url: string }
type Proposal = {
  number: number
  title: string
  state: "open" | "closed"
  createdAt: string
  closedAt: string | null
  url: string
}

export function ManageClient({
  initialSource,
  editor,
  publishedVersions,
  proposals,
}: {
  initialSource: string
  editor: string
  publishedVersions: PublishedVersion[]
  proposals: Proposal[]
}) {
  const [source, setSource] = useState(initialSource)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const errors = useMemo(() => validateResume(source), [source])
  const preview = useMemo(() => (errors.length === 0 ? parseResume(source) : null), [source, errors])

  const submit = async () => {
    if (errors.length > 0 || source === initialSource) return

    setSubmitting(true)
    setResult(null)
    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: source }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error ?? "提交失败")
      setResult(`已创建 Issue #${payload.number}`)
    } catch (error) {
      setResult(error instanceof Error ? error.message : "提交失败")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-6">
      <header className="mx-auto mb-4 flex max-w-[1600px] flex-wrap items-center justify-between gap-4 rounded border border-grid bg-paper-raised px-4 py-3">
        <div>
          <p className="m-0 text-xs font-semibold tracking-[0.18em] text-blueprint">RESUME / MANAGE</p>
          <p className="m-0 mt-1 text-sm text-ink-soft">编辑者：{editor} · 保存只会创建 GitHub Issue</p>
        </div>
        <div className="flex gap-2">
          <a href="/" target="_blank" rel="noreferrer">
            <Button variant="outline">查看公开页</Button>
          </a>
          <Button onClick={submit} disabled={submitting || errors.length > 0 || source === initialSource}>
            {submitting ? "提交中…" : "创建审核 Issue"}
          </Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-4 xl:grid-cols-[minmax(360px,0.75fr)_minmax(0,1.25fr)_280px]">
        <section className="min-h-[640px] overflow-hidden rounded border border-grid bg-paper-raised">
          <div className="border-b border-grid px-4 py-3 text-sm font-semibold">受控 Markdown</div>
          <textarea
            className="min-h-[590px] w-full resize-y border-0 bg-transparent p-4 font-mono text-xs leading-6 outline-none"
            value={source}
            onChange={(event) => setSource(event.target.value)}
            spellCheck={false}
          />
          <div className="border-t border-grid px-4 py-3 text-sm">
            {errors.length > 0 ? (
              <ul className="m-0 list-disc pl-4 text-red-700">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            ) : (
              <span className="text-emerald-700">结构校验通过</span>
            )}
            {result && <p className="mb-0 mt-2 text-ink-soft">{result}</p>}
          </div>
        </section>

        <section className="overflow-auto rounded border border-grid bg-[#dfe6f0] p-4">
          {preview ? (
            <ResumePaper resume={preview} />
          ) : (
            <div className="grid min-h-80 place-items-center text-sm text-ink-soft">修复结构错误后显示预览</div>
          )}
        </section>

        <aside className="space-y-4">
          <section className="rounded border border-grid bg-paper-raised p-4">
            <h2 className="m-0 text-sm font-semibold">已发布版本</h2>
            <ul className="mt-3 space-y-3 p-0 text-sm">
              {publishedVersions.map((version) => (
                <li className="list-none" key={version.id}>
                  <a className="text-blueprint" href={version.url} target="_blank" rel="noreferrer">
                    {version.message}
                  </a>
                  <p className="m-0 mt-1 text-xs text-ink-soft">{new Date(version.date).toLocaleString("zh-CN")}</p>
                </li>
              ))}
              {publishedVersions.length === 0 && (
                <li className="list-none text-sm text-ink-soft">暂无可读取的提交记录</li>
              )}
            </ul>
          </section>
          <section className="rounded border border-grid bg-paper-raised p-4">
            <h2 className="m-0 text-sm font-semibold">待审核提案</h2>
            <ul className="mt-3 space-y-3 p-0 text-sm">
              {proposals.map((proposal) => (
                <li className="list-none" key={proposal.number}>
                  <a className="text-blueprint" href={proposal.url} target="_blank" rel="noreferrer">
                    #{proposal.number} · {proposal.state === "open" ? "开启" : "已关闭"}
                  </a>
                  <p className="m-0 mt-1 text-xs text-ink-soft">
                    {new Date(proposal.createdAt).toLocaleString("zh-CN")}
                  </p>
                </li>
              ))}
              {proposals.length === 0 && <li className="list-none text-sm text-ink-soft">暂无提案</li>}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  )
}
