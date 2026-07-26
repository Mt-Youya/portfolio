"use client"

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

import type { ResumeDocument, ResumeEntry } from "@/lib/resume-contract"

function Inline({ value }: { value: string }) {
  const parts = value.split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, index): ReactNode => {
    if (/^\*\*.*\*\*$/.test(part)) return <strong key={index}>{part.slice(2, -2)}</strong>

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      return (
        <a key={index} href={link[2]} target="_blank" rel="noreferrer">
          {link[1]}
        </a>
      )
    }

    return part
  })
}

function SectionTitle({ children, skill = false }: { children: string; skill?: boolean }) {
  return (
    <div className="section-title" id={skill ? "skill" : undefined}>
      <h2>{children}</h2>
    </div>
  )
}

function splitWorkTitle(title: string) {
  const [company, role] = title.split("｜").map((value) => value.trim())
  return { company, role }
}

function Project({ entry }: { entry: ResumeEntry }) {
  return (
    <div className="project" data-resume-block>
      <div className="project-title">
        <Inline value={entry.title} />
      </div>
      <ul>
        {entry.bullets.map((bullet) => (
          <li key={bullet}>
            <Inline value={bullet} />
          </li>
        ))}
      </ul>
      <div className="tech-stack">
        <strong>技术栈：</strong>
        <Inline value={entry.meta} />
      </div>
    </div>
  )
}

type PageSlice = { start: number; clipHeight: number }

function sameSlices(left: PageSlice[], right: PageSlice[]) {
  return (
    left.length === right.length &&
    left.every((slice, index) => {
      const other = right[index]
      return Math.abs(slice.start - other.start) < 0.1 && Math.abs(slice.clipHeight - other.clipHeight) < 0.1
    })
  )
}

function pageSlices(flow: HTMLElement, contentHeight: number): PageSlice[] {
  const flowTop = flow.getBoundingClientRect().top
  const totalHeight = flow.getBoundingClientRect().height
  const blocks = Array.from(flow.querySelectorAll<HTMLElement>("[data-resume-block]")).map((block) => {
    const rect = block.getBoundingClientRect()
    return { top: rect.top - flowTop, bottom: rect.bottom - flowTop }
  })
  const slices: PageSlice[] = []
  let start = 0

  while (start < totalHeight - 0.1) {
    let end = Math.min(start + contentHeight, totalHeight)
    const crossingBlock = blocks.find(
      (block) => block.top > start + 0.1 && block.top < end - 0.1 && block.bottom > end + 0.1
    )
    if (crossingBlock) end = crossingBlock.top
    if (end <= start + 0.1) end = Math.min(start + contentHeight, totalHeight)

    slices.push({ start, clipHeight: end - start })
    start = end
  }

  return slices.length > 0 ? slices : [{ start: 0, clipHeight: contentHeight }]
}

function ResumeFlow({ resume, style }: { resume: ResumeDocument; style?: CSSProperties }) {
  const contact = resume.education.find((line) => line.includes("@") || line.includes("http"))
  const education = resume.education.filter((line) => line !== contact)
  const [work] = resume.experience
  const workTitle = work ? splitWorkTitle(work.title) : null

  return (
    <div className="resume-flow" style={style}>
      <header className="header">
        <h1>{resume.name}</h1>
        <div className="subtitle">
          <Inline value={resume.title} />
        </div>
        <div className="meta">
          {[...education, ...resume.meta, contact].filter(Boolean).map((line) => (
            <span key={line}>
              <Inline value={line!} />
            </span>
          ))}
        </div>
      </header>

      <SectionTitle skill>{resume.skillsTitle}</SectionTitle>
      <div className="skills-grid">
        {resume.skills.flatMap((skill) => [
          <span className="skill-label" key={`${skill.label}-label`}>
            {skill.label}
          </span>,
          <span className="skill-value" key={`${skill.label}-value`}>
            <Inline value={skill.value} />
          </span>,
        ])}
      </div>

      {work && workTitle && (
        <>
          <SectionTitle>工作经历</SectionTitle>
          <article className="job" id="yayan-job">
            <div className="job-header">
              <div>
                <span className="company">{workTitle.company}</span>
                {workTitle.role && <span className="role">{workTitle.role}</span>}
              </div>
              <span className="period">
                <Inline value={work.meta} />
              </span>
            </div>
            <div className="project" data-resume-block>
              <div className="project-title">工作职责</div>
              <ul>
                {work.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Inline value={bullet} />
                  </li>
                ))}
              </ul>
            </div>
            {resume.projects.map((project) => (
              <Project entry={project} key={project.title} />
            ))}
          </article>
        </>
      )}

      <SectionTitle>个人概述</SectionTitle>
      <ul className="highlights">
        {resume.summary.map((paragraph) => (
          <li key={paragraph}>
            <Inline value={paragraph} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ResumePaper({ resume }: { resume: ResumeDocument }) {
  const sourceRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [pagination, setPagination] = useState<{ contentHeight: number; slices: PageSlice[] }>({
    contentHeight: 0,
    slices: [{ start: 0, clipHeight: 0 }],
  })

  useLayoutEffect(() => {
    const measure = () => {
      const flow = sourceRef.current
      const viewport = viewportRef.current
      if (!flow || !viewport) return

      const contentHeight = viewport.getBoundingClientRect().height
      const slices = pageSlices(flow, contentHeight)
      setPagination((current) =>
        sameSlices(current.slices, slices) && Math.abs(current.contentHeight - contentHeight) < 0.1
          ? current
          : { contentHeight, slices }
      )
    }

    const observer = new ResizeObserver(measure)
    if (sourceRef.current) observer.observe(sourceRef.current)
    measure()
    document.fonts?.ready.then(measure)

    return () => observer.disconnect()
  }, [resume])

  return (
    <article className="resume-paged-document">
      <div className="resume-flow-measure" aria-hidden="true" ref={sourceRef}>
        <ResumeFlow resume={resume} />
      </div>
      <div className="resume-page-viewport resume-page-viewport-probe" aria-hidden="true" ref={viewportRef} />

      {pagination.slices.map((slice) => (
        <section className="resume-sheet" key={slice.start}>
          <div
            className="resume-page-viewport"
            style={slice.clipHeight > 0 ? { height: `${slice.clipHeight}px` } : undefined}
          >
            <ResumeFlow
              resume={resume}
              style={pagination.contentHeight > 0 ? { transform: `translateY(-${slice.start}px)` } : undefined}
            />
          </div>
        </section>
      ))}
    </article>
  )
}
