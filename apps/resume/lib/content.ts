import { readFile } from "node:fs/promises"
import path from "node:path"

import { parseResume } from "@/lib/resume-contract"

const resumePath = path.resolve(process.cwd(), "../..", "content", "resume.zh.md")
const resumeCssPath = path.resolve(process.cwd(), "styles", "global.css")

export async function getPublishedResumeSource() {
  return readFile(resumePath, "utf8")
}

export async function getPublishedResume() {
  return parseResume(await getPublishedResumeSource())
}

export async function getResumeCss() {
  return readFile(resumeCssPath, "utf8")
}
