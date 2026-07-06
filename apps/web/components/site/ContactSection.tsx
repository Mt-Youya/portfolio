import Link from "next/link"

import { buttonVariants } from "@cyrus/ui/button"

import { contact, projectLinks, social } from "@/data/links"

export function ContactSection({
  sheet,
  title,
  summary,
  resumeLabel,
  githubLabel,
  yuqueLabel,
  juejinLabel,
  emailLabel,
  phoneLabel,
  worksLabel,
  stampLabel,
}: {
  sheet: string
  title: string
  summary: string
  resumeLabel: string
  githubLabel: string
  yuqueLabel: string
  juejinLabel: string
  emailLabel: string
  phoneLabel: string
  worksLabel: string
  stampLabel: string
}) {
  return (
    <footer
      id="contact"
      data-motion-section
      data-contact-section
      className="relative overflow-hidden px-5 py-12 sm:px-8"
    >
      <div data-section-scan />
      <div
        data-card
        data-contact-panel
        className="mx-auto flex max-w-7xl flex-col gap-8 border border-grid bg-paper-raised p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-blueprint">{sheet}</p>
          <h2 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-soft">{summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {/* <Link href="/resume.pdf" download className={buttonVariants({ size: "md" })}>
              {resumeLabel}
            </Link> */}
            <Link href={social.github} className={buttonVariants({ variant: "outline", size: "md" })}>
              {githubLabel}
            </Link>
            <Link href="https://yuque.com/yonjay" className={buttonVariants({ variant: "outline", size: "md" })}>
              {yuqueLabel}
            </Link>
            <Link href="https://juejin.cn" className={buttonVariants({ variant: "outline", size: "md" })}>
              {juejinLabel}
            </Link>
          </div>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">
            <div className="flex items-center gap-2">
              <dt>{emailLabel}</dt>
              <dd>
                <Link href={`mailto:${contact.email}`} className="text-ink transition-colors hover:text-blueprint">
                  {contact.email}
                </Link>
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt>{phoneLabel}</dt>
              <dd>
                <Link href={`tel:${contact.phone}`} className="text-ink transition-colors hover:text-blueprint">
                  {contact.phone}
                </Link>
              </dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-grid pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-blueprint">{worksLabel}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {projectLinks.map((project) => (
                <Link
                  key={project.url}
                  href={project.url}
                  className="text-sm text-ink-soft transition-colors hover:text-blueprint"
                >
                  {project.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div
          data-seal
          className="self-start border-2 border-seal px-5 py-4 text-center font-mono text-sm uppercase tracking-[0.22em] text-seal lg:self-end"
        >
          {stampLabel}
        </div>
      </div>
    </footer>
  )
}
