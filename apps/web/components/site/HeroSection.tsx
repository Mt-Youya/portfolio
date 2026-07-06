import Link from "next/link"

import { buttonVariants } from "@cyrus/ui/button"

import { AgentLoopFigure } from "@/components/site/AgentLoopFigure"
import { HeroRuntimeCore } from "@/components/site/HeroRuntimeCore"
import { SignalMarquee } from "@/components/site/SignalMarquee"
import type { Stat } from "@/components/site/types"

export function HeroSection({
  sheet,
  name,
  roleBadge,
  title,
  subtitle,
  primaryCta,
  terminalTitle,
  seal,
  loopLabels,
  stats,
  terminal,
}: {
  sheet: string
  name: string
  roleBadge: string
  title: string
  subtitle: string
  primaryCta: string
  resumeCta: string
  terminalTitle: string
  seal: string
  loopLabels: string[]
  stats: Stat[]
  terminal: { plan: string; tool: string; observe: string; answer: string }
}) {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden border-b border-grid px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <HeroRuntimeCore />
      <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(26rem,0.92fr)] xl:items-center">
        <div className="relative z-1 min-w-0">
          <p data-hero-motion data-hero-kicker className="font-mono text-xs uppercase tracking-[0.28em] text-blueprint">
            {sheet}
          </p>
          <div
            data-hero-motion
            data-hero-meta
            className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft"
          >
            <span>{name}</span>
            <span className="h-px w-12 bg-grid" aria-hidden="true" />
            <span>{roleBadge}</span>
          </div>
          <h1
            data-hero-title
            className="mt-5 max-w-6xl text-balance text-5xl font-semibold leading-[0.96] tracking-normal text-ink sm:text-6xl lg:text-7xl xl:max-w-full xl:text-8xl"
          >
            {title}
          </h1>
          <p
            data-hero-motion
            data-hero-copy
            className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9"
          >
            {subtitle}
          </p>
          <div data-hero-motion data-hero-actions className="mt-9 flex flex-wrap gap-3">
            <Link href="#agent" className={buttonVariants({ size: "md" })}>
              {primaryCta}
            </Link>
            {/* <Link href="/resume.pdf" download className={buttonVariants({ variant: "outline", size: "md" })}>
              {resumeCta}
            </Link> */}
          </div>

          <dl className="mt-10 grid max-w-3xl grid-cols-1 border-y border-grid sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                data-stat
                className="border-grid py-5 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
              >
                <dt className="font-mono text-2xl font-semibold text-blueprint">{stat.value}</dt>
                <dd className="mt-2 text-sm leading-6 text-ink-soft">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative z-1 min-w-0">
          <div
            data-hero-card
            data-card
            className="relative min-w-0 overflow-hidden border border-grid bg-paper-raised p-5 sm:p-6"
          >
            <div
              data-terminal-scan
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-blueprint/10 opacity-0"
            />
            <div className="flex items-center justify-between gap-4 border-b border-grid pb-4">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-ink-soft">{terminalTitle}</p>
              <span className="h-6 border border-seal px-2 font-mono text-[10px] uppercase leading-6 tracking-[0.16em] text-seal">
                {seal}
              </span>
            </div>
            <div className="mt-5 min-w-0 overflow-x-auto bg-terminal-bg p-5 font-mono text-sm leading-7 text-terminal-green">
              <p data-terminal-line>$ agent run introduce --focus ai-agent</p>
              <p data-terminal-line>{terminal.plan}</p>
              <p data-terminal-line>{terminal.tool}</p>
              <p data-terminal-line>{terminal.observe}</p>
              <p data-terminal-line className="text-paper-raised">
                {terminal.answer}
              </p>
            </div>

            <AgentLoopFigure labels={loopLabels} />
          </div>
        </div>
      </div>
      <SignalMarquee />
    </section>
  )
}
