import type { ResumeDocument, ResumeEntry } from "@/lib/resume-contract"
import { contactParts, resumeIcon, type ResumeIconName } from "@/lib/icons"

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character
  )
}

function inlineHtml(value: string) {
  return value
    .split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g)
    .map((part) => {
      if (/^\*\*.*\*\*$/.test(part)) return `<strong>${escapeHtml(part.slice(2, -2))}</strong>`

      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link && link[2].startsWith("https://")) {
        return `<a href="${escapeHtml(link[2])}" target="_blank" rel="noreferrer">${escapeHtml(link[1])}</a>`
      }

      return escapeHtml(part)
    })
    .join("")
}

function splitWorkTitle(title: string) {
  const [company, role] = title.split("｜").map((value) => value.trim())
  return { company, role }
}

function projectHtml(entry: ResumeEntry) {
  return `<div class="project" data-resume-block>
  <div class="project-title">${resumeIcon("project")}${inlineHtml(entry.title)}</div>
  <ul>${entry.bullets.map((bullet) => `<li>${inlineHtml(bullet)}</li>`).join("")}</ul>
  <div class="tech-stack"><strong>技术栈：</strong>${inlineHtml(entry.meta)}</div>
</div>`
}

function sectionTitle(title: string, icon: ResumeIconName, skill = false) {
  return `<div class="section-title"${skill ? ' id="skill"' : ""}>${resumeIcon(icon)}<h2>${escapeHtml(title)}</h2></div>`
}

function contactHtml(value: string) {
  return contactParts(value)
    .map((part) =>
      part.type === "separator"
        ? `<span class="contact-separator">${escapeHtml(part.value)}</span>`
        : `<span class="contact-item">${resumeIcon(part.icon)}${inlineHtml(part.value)}</span>`
    )
    .join("")
}

function flowHtml(resume: ResumeDocument) {
  const contact = resume.education.find((line) => line.includes("@") || line.includes("http"))
  const education = resume.education.filter((line) => line !== contact)
  const [work] = resume.experience
  const workTitle = work ? splitWorkTitle(work.title) : null

  return `<div class="resume-flow">
  <header class="header">
    <h1>${escapeHtml(resume.name)}</h1>
    <div class="subtitle">${inlineHtml(resume.title)}</div>
    <div class="meta">${[...education, ...resume.meta]
      .filter(Boolean)
      .map((line) => `<span>${resumeIcon("education")}${inlineHtml(line!)}</span>`)
      .join("")}${contact ? `<span>${contactHtml(contact)}</span>` : ""}</div>
  </header>
  ${sectionTitle(resume.skillsTitle, "skills", true)}
  <div class="skills-grid">${resume.skills.map((skill) => `<span class="skill-label">${escapeHtml(skill.label)}</span><span class="skill-value">${inlineHtml(skill.value)}</span>`).join("")}</div>
  ${
    work && workTitle
      ? `${sectionTitle("工作经历", "experience")}
  <article class="job" id="yayan-job">
    <div class="job-header"><div><span class="company">${escapeHtml(workTitle.company)}</span>${workTitle.role ? `<span class="role">${escapeHtml(workTitle.role)}</span>` : ""}</div><span class="period">${inlineHtml(work.meta)}</span></div>
    <div class="project" data-resume-block><div class="project-title">${resumeIcon("responsibility")}工作职责</div><ul>${work.bullets.map((bullet) => `<li>${inlineHtml(bullet)}</li>`).join("")}</ul></div>
    ${resume.projects.map(projectHtml).join("")}
  </article>`
      : ""
  }
  ${sectionTitle("个人概述", "summary")}
  <ul class="highlights">${resume.summary.map((paragraph) => `<li>${inlineHtml(paragraph)}</li>`).join("")}</ul>
</div>`
}

export function renderResumeHtml(resume: ResumeDocument, css: string) {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(`${resume.name}的简历`)}</title>
    <style>${css}</style>
  </head>
  <body>
    <main class="resume-paged-document">
      <div class="resume-flow-measure" aria-hidden="true">${flowHtml(resume)}</div>
      <div class="resume-sheet-list"></div>
    </main>
    <script>
      window.renderResumePages = () => {
        const source = document.querySelector(".resume-flow-measure .resume-flow")
        const list = document.querySelector(".resume-sheet-list")
        const probe = document.createElement("div")
        probe.className = "resume-page-viewport resume-page-viewport-probe"
        document.body.append(probe)
        const contentHeight = probe.getBoundingClientRect().height
        probe.remove()
        const flowTop = source.getBoundingClientRect().top
        const totalHeight = source.getBoundingClientRect().height
        const blocks = Array.from(source.querySelectorAll("[data-resume-block]")).map((block) => {
          const rect = block.getBoundingClientRect()
          return { top: rect.top - flowTop, bottom: rect.bottom - flowTop }
        })
        const slices = []
        let start = 0
        while (start < totalHeight - 0.1) {
          let end = Math.min(start + contentHeight, totalHeight)
          const crossingBlock = blocks.find((block) => block.top > start + 0.1 && block.top < end - 0.1 && block.bottom > end + 0.1)
          if (crossingBlock) end = crossingBlock.top
          if (end <= start + 0.1) end = Math.min(start + contentHeight, totalHeight)
          slices.push({ start, clipHeight: end - start })
          start = end
        }
        list.replaceChildren()
        for (const slice of slices.length > 0 ? slices : [{ start: 0, clipHeight: contentHeight }]) {
          const sheet = document.createElement("section")
          sheet.className = "resume-sheet"
          const viewport = document.createElement("div")
          viewport.className = "resume-page-viewport"
          viewport.style.height = slice.clipHeight + "px"
          const flow = source.cloneNode(true)
          flow.style.transform = "translateY(-" + slice.start + "px)"
          viewport.append(flow)
          sheet.append(viewport)
          list.append(sheet)
        }
        document.documentElement.dataset.resumePageCount = String(slices.length || 1)
        return slices.length || 1
      }
      window.renderResumePages()
    </script>
  </body>
</html>`
}
