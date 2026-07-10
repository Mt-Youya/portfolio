"use client"

import { useGSAP } from "@gsap/react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { useRef, useState } from "react"

import { DrawLine } from "@/components/blueprint"
import { AgentTerminal } from "@/components/terminal/AgentTerminal"
import { PaperKiteSVG } from "@/components/canvas/PaperKiteSVG"
import { gsap, SplitText } from "@/lib/gsap"
import { useUiStore } from "@/stores/ui"
import type { Locale } from "@/i18n/routing"

const PaperKite = dynamic(() => import("@/components/canvas/PaperKite").then((m) => m.default), {
  ssr: false,
  loading: () => <PaperKiteSVG className="h-full w-full" />,
})

type HeroSectionProps = {
  locale: Locale
  sheet: string
  name: string
  roleBadge: string
  subtitle: string
  primaryCta: string
  resumeCta: string
}

export function HeroSection({ locale, sheet, name, roleBadge, subtitle, primaryCta, resumeCta }: HeroSectionProps) {
  const t = useTranslations("site.hero")
  const motionPreference = useUiStore((s) => s.motionPreference)
  const root = useRef<HTMLElement>(null)
  const [hintShown, setHintShown] = useState(false)

  const reduced =
    motionPreference === "reduced" ||
    (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)

  const showKite3D = !reduced

  useGSAP(
    () => {
      if (!root.current) {
        return
      }

      const q = gsap.utils.selector(root.current)

      if (reduced) {
        gsap.set(q("[data-hero-text]"), { opacity: 1 })
        return
      }

      const titleLines = q("[data-title-line]")
      const splits = titleLines.map((el) => {
        const split = new SplitText(el, { type: "chars" })
        gsap.set(split.chars, { opacity: 0 })
        return split
      })

      const tl = gsap.timeline()
      tl.to(q("[data-sheet]"), { opacity: 1, duration: 0.3 }).to(
        q("[data-role-badge]"),
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.1"
      )

      splits.forEach((split) => {
        tl.to(
          split.chars,
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.02,
            ease: "none",
          },
          "-=0.1"
        )
      })

      tl.to(q("[data-subtitle]"), {
        opacity: 1,
        duration: 0.6,
        scrambleText: { text: subtitle, speed: 0.5, chars: "01" },
      }).to(
        q("[data-cta]"),
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
        },
        "-=0.2"
      )
    },
    { scope: root, dependencies: [locale, reduced, subtitle] }
  )
  console.log("resumeCta", resumeCta)

  return (
    <section
      ref={root}
      id="hero"
      data-motion-section
      className="relative overflow-hidden border-b border-grid px-5 py-16 sm:px-8 lg:py-24"
    >
      <div data-section-scan />
      <div className="mx-auto max-w-7xl">
        <p
          data-sheet
          className="font-mono text-xs uppercase tracking-[0.24em] text-blueprint"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          {sheet}
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-center">
          <div>
            <span
              data-role-badge
              className="inline-block border border-grid px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
              style={{ opacity: reduced ? 1 : 0, transform: reduced ? "none" : "translateY(8px)" }}
            >
              {roleBadge}
            </span>

            <h1 data-hero-text className="mt-5 text-5xl font-semibold leading-tight text-ink sm:text-7xl">
              <span data-title-line className="block">
                {name}
              </span>
              <span
                data-title-line
                className="mt-2 block text-2xl font-semibold text-blueprint sm:text-4xl"
                style={{ letterSpacing: "0.02em" }}
              >
                {t("positioning")}
              </span>
            </h1>

            <p
              data-subtitle
              data-hero-text
              className="mt-6 max-w-xl text-base leading-8 text-ink-soft"
              style={{ opacity: reduced ? 1 : 0 }}
            >
              {reduced ? subtitle : ""}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                data-cta
                href="#agent"
                className="border border-blueprint px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-blueprint transition-colors hover:bg-blueprint hover:text-paper"
                style={{ opacity: reduced ? 1 : 0, transform: reduced ? "none" : "translateY(8px)" }}
              >
                {primaryCta}
              </a>
              {/* <a
                data-cta
                href="/assets/resume.pdf"
                className="border border-grid px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                style={{ opacity: reduced ? 1 : 0, transform: reduced ? "none" : "translateY(8px)" }}
              >
                {resumeCta}
              </a> */}
            </div>
          </div>

          <div data-kite className="relative h-64 lg:h-80">
            {showKite3D ? <PaperKite /> : <PaperKiteSVG className="h-full w-full" />}
          </div>
        </div>

        <div className="mt-10">
          <AgentTerminal locale={locale} onAnswerShown={() => setHintShown(true)} />
        </div>

        <div
          className="mt-8 flex justify-center"
          style={{ opacity: hintShown || reduced ? 1 : 0, transition: "opacity 0.4s" }}
        >
          <DrawLine vertical length="2.5rem" label="SCROLL" />
        </div>
      </div>
    </section>
  )
}
