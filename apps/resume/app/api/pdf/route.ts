import { existsSync } from "node:fs"

import { NextResponse } from "next/server"

import { getPublishedResume, getResumeCss } from "@/lib/content"
import { renderResumeHtml } from "@/lib/resume-html"

export const runtime = "nodejs"
export const maxDuration = 60

function localChromePath() {
  const paths = [
    process.env.CHROME_EXECUTABLE_PATH,
    process.platform === "darwin" ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : undefined,
    process.platform === "linux" ? "/usr/bin/google-chrome" : undefined,
    process.platform === "linux" ? "/usr/bin/chromium" : undefined,
  ].filter((value): value is string => Boolean(value))

  return paths.find((value) => existsSync(value))
}

async function createBrowser() {
  const puppeteer = (await import("puppeteer-core")).default
  if (process.env.VERCEL) {
    const packUrl = process.env.RESUME_CHROMIUM_PACK_URL
    if (!packUrl) throw new Error("缺少 RESUME_CHROMIUM_PACK_URL")

    const chromium = (await import("@sparticuz/chromium-min")).default
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(packUrl),
      headless: "shell",
    })
  }

  const executablePath = localChromePath()
  if (!executablePath) throw new Error("未找到本地 Chrome；请设置 CHROME_EXECUTABLE_PATH")
  return puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox", "--disable-gpu"] })
}

export async function GET() {
  let browser: Awaited<ReturnType<typeof createBrowser>> | undefined
  try {
    const [resume, css] = await Promise.all([getPublishedResume(), getResumeCss()])
    const html = renderResumeHtml(resume, css)

    browser = await createBrowser()
    const page = await browser.newPage()
    await page.emulateMediaType("print")
    await page.setContent(html, { waitUntil: "load" })
    const pageCount = await page.evaluate(async () => {
      await document.fonts?.ready
      return (window as unknown as { renderResumePages: () => number }).renderResumePages()
    })
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })

    return new NextResponse(pdf as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(`${resume.name}_简历.pdf`)}`,
        "Cache-Control": "public, max-age=0, s-maxage=300",
        "X-Resume-Pages": String(pageCount),
      },
    })
  } catch (error) {
    console.error("[resume:pdf]", error)
    return NextResponse.json({ error: "PDF 生成失败" }, { status: 500 })
  } finally {
    await browser?.close()
  }
}
