import { NextResponse } from "next/server"

import { auth } from "@/auth"
import { getPublishedResumeSource } from "@/lib/content"
import { isResumeEditor } from "@/lib/editor-access"
import { createProposalIssue } from "@/lib/github"
import { validateResume } from "@/lib/resume-contract"
import { createUnifiedDiff } from "@/lib/unified-diff"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const session = await auth()
  const editor = session?.user?.name ?? ""
  if (!isResumeEditor(editor)) return NextResponse.json({ error: "未授权" }, { status: 403 })

  let content: unknown
  try {
    content = (await request.json()).content
  } catch {
    return NextResponse.json({ error: "请求必须包含 JSON 内容" }, { status: 400 })
  }

  if (typeof content !== "string" || content.length > 20_000) {
    return NextResponse.json({ error: "简历内容无效或过长" }, { status: 400 })
  }

  const errors = validateResume(content)
  if (errors.length > 0) return NextResponse.json({ error: errors.join("；") }, { status: 400 })

  const published = await getPublishedResumeSource()
  const diff = createUnifiedDiff(published, content)
  if (diff === "（内容没有变化）") {
    return NextResponse.json({ error: "候选内容与已发布版本相同" }, { status: 400 })
  }

  try {
    const issue = await createProposalIssue({ editor, content, diff })
    return NextResponse.json({ number: issue.number, url: issue.html_url }, { status: 201 })
  } catch (error) {
    console.error("[resume:proposal]", error)
    return NextResponse.json({ error: "创建 GitHub Issue 失败" }, { status: 502 })
  }
}
