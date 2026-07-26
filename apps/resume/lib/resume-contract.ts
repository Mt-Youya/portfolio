export type ResumeEntry = {
  title: string
  meta: string
  bullets: string[]
}

export type ResumeDocument = {
  name: string
  title: string
  meta: string[]
  summary: string[]
  skillsTitle: string
  skills: { label: string; value: string }[]
  experience: ResumeEntry[]
  projects: ResumeEntry[]
  education: string[]
}

const requiredSections = ["个人概述", "工作经历", "代表项目", "教育与联系信息"]
const skillSectionNames = ["核心技能", "专业技能"]

function cleanLine(line: string) {
  return line.trim().replace(/<br>$/, "").trim()
}

function stripBold(value: string) {
  return value.replace(/^\*\*(.*)\*\*$/, "$1").trim()
}

function sectionLines(lines: string[], name: string) {
  const start = lines.findIndex((line) => line.trim() === `## ${name}`)
  if (start === -1) return []

  const rest = lines.slice(start + 1)
  const end = rest.findIndex((line) => line.startsWith("## "))
  return end === -1 ? rest : rest.slice(0, end)
}

function parseEntries(lines: string[]) {
  const entries: ResumeEntry[] = []
  let current: string[] = []

  const commit = () => {
    if (current.length === 0) return

    const title = current[0].replace(/^###\s+/, "").trim()
    const metaLine = current.find((line) => line.trim().startsWith("**") || line.trim().startsWith("技术栈："))
    const bullets = current
      .filter((line) => line.trim().startsWith("- "))
      .map((line) => line.trim().replace(/^-\s+/, ""))

    const meta = metaLine?.trim().startsWith("技术栈：")
      ? metaLine.trim().replace(/^技术栈：\s*/, "")
      : metaLine
        ? stripBold(metaLine.trim())
        : ""

    entries.push({ title, meta, bullets })
    current = []
  }

  for (const line of lines) {
    if (line.startsWith("### ")) {
      commit()
      current = [line]
      continue
    }
    if (current.length > 0) current.push(line)
  }
  commit()

  return entries
}

export function validateResume(source: string) {
  const lines = source.replace(/\r\n/g, "\n").split("\n")
  const errors: string[] = []
  const headings = lines.filter((line) => line.startsWith("## ")).map((line) => line.replace(/^##\s+/, "").trim())
  const headingSet = new Set(headings)

  if (!lines.some((line) => line.startsWith("# "))) {
    errors.push("缺少一级标题：姓名")
  }

  for (const name of requiredSections) {
    if (!headingSet.has(name)) errors.push(`缺少章节：${name}`)
  }

  if (!skillSectionNames.some((name) => headingSet.has(name))) {
    errors.push("缺少章节：核心技能或专业技能")
  }

  for (const name of headings) {
    if (!requiredSections.includes(name) && !skillSectionNames.includes(name)) errors.push(`不支持的章节：${name}`)
  }

  const skillSection = skillSectionNames.find((name) => headingSet.has(name))
  const skills = sectionLines(lines, skillSection ?? "核心技能")
    .filter((line) => line.trim().startsWith("- "))
    .filter((line) => /^-\s+\*\*.+?：\*\*.+/.test(line.trim()))
  if (skills.length === 0) errors.push("核心技能必须使用“**分类：**内容”的项目符号")

  for (const name of ["工作经历", "代表项目"]) {
    const entries = parseEntries(sectionLines(lines, name))
    if (entries.length === 0) errors.push(`${name}至少需要一项三级标题`)
    if (entries.some((entry) => !entry.meta || entry.bullets.length === 0)) {
      errors.push(`${name}的每项都需要加粗元信息与至少一条项目符号`)
    }
  }

  return errors
}

export function parseResume(source: string): ResumeDocument {
  const errors = validateResume(source)
  if (errors.length > 0) throw new Error(errors.join("；"))

  const lines = source.replace(/\r\n/g, "\n").split("\n")
  const titleIndex = lines.findIndex((line) => line.startsWith("# "))
  const firstSection = lines.findIndex((line) => line.startsWith("## "))
  const header = lines
    .slice(titleIndex, firstSection)
    .map(cleanLine)
    .filter((line) => line && !line.startsWith("<!--"))

  const headings = lines.filter((line) => line.startsWith("## ")).map((line) => line.replace(/^##\s+/, "").trim())
  const headingSet = new Set(headings)
  const skillSection = skillSectionNames.find((name) => headingSet.has(name)) ?? "核心技能"
  const skillLines = sectionLines(lines, skillSection).filter((line) => line.trim().startsWith("- "))
  const skills = skillLines.map((line) => {
    const match = line.trim().match(/^-\s+\*\*(.+?)：\*\*(.+)$/)
    if (!match) throw new Error("核心技能格式无效")
    return { label: match[1], value: match[2].trim() }
  })

  return {
    name: header[0].replace(/^#\s+/, "").trim(),
    title: stripBold(header[1]),
    meta: header.slice(2),
    summary: sectionLines(lines, "个人概述").filter(Boolean),
    skillsTitle: skillSection,
    skills,
    experience: parseEntries(sectionLines(lines, "工作经历")),
    projects: parseEntries(sectionLines(lines, "代表项目")),
    education: sectionLines(lines, "教育与联系信息").map(cleanLine).filter(Boolean),
  }
}
