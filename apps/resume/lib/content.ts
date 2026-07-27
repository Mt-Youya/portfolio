import { readFile } from "node:fs/promises"
import path from "node:path"

import { parseResume } from "@/lib/resume-contract"

const resumePath = path.resolve(process.cwd(), "../..", "content", "resume.zh.md")
const resumeCssPath = path.resolve(process.cwd(), "styles", "global.css")
const resumeFontPath = path.resolve(process.cwd(), "assets", "NotoSansSC-Regular.otf")

export async function getPublishedResumeSource() {
  return readFile(resumePath, "utf8")
}

export async function getPublishedResume() {
  return parseResume(await getPublishedResumeSource())
}

export async function getResumeCss() {
  const [css, font] = await Promise.all([readFile(resumeCssPath, "utf8"), readFile(resumeFontPath)])
  const fontFace = `@font-face { font-family: "Resume Noto Sans SC"; src: url(data:font/otf;base64,${font.toString("base64")}) format("opentype"); font-weight: 400 700; font-style: normal; }`

  return `${fontFace}\n${css}`
}
