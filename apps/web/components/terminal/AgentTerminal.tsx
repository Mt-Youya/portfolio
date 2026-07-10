"use client"

import { useGSAP } from "@gsap/react"
import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

import { gsap } from "@/lib/gsap"
import { useUiStore } from "@/stores/ui"
import { useAgentStore } from "@/stores/agent"
import type { Locale } from "@/i18n/routing"

type AgentTerminalProps = {
  locale: Locale
  onAnswerShown?: () => void
}

const SPINNER = "▌"

export function AgentTerminal({ locale, onAnswerShown }: AgentTerminalProps) {
  const t = useTranslations("site.hero.terminalTrace")
  const motionPreference = useUiStore((s) => s.motionPreference)
  const fetchIntro = useAgentStore((s) => s.fetchIntro)
  const intro = useAgentStore((s) => s.intro[locale])

  const root = useRef<HTMLDivElement>(null)
  const cmdRef = useRef<HTMLSpanElement>(null)
  const planRef = useRef<HTMLSpanElement>(null)
  const fetchRef = useRef<HTMLSpanElement>(null)
  const selectRef = useRef<HTMLSpanElement>(null)
  const answerRef = useRef<HTMLSpanElement>(null)

  const [answer, setAnswer] = useState<string | null>(intro?.answer ?? null)
  const [repoCount, setRepoCount] = useState<number | null>(intro?.repoCount ?? null)
  const [waiting, setWaiting] = useState(false)

  const reduced =
    motionPreference === "reduced" ||
    (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)

  useEffect(() => {
    if (intro) {
      setAnswer(intro.answer)
      setRepoCount(intro.repoCount)
      return
    }
    let cancelled = false
    setWaiting(true)
    fetchIntro(locale).then((res) => {
      if (cancelled || !res) {
        return
      }
      setAnswer(res.answer)
      setRepoCount(res.repoCount)
      setWaiting(false)
    })
    return () => {
      cancelled = true
    }
  }, [locale, intro, fetchIntro])

  const n = repoCount ?? "?"
  const fetchLine = t.raw("fetch").replace("{n}", String(n))
  const commandLine = t.raw("command").replace("{lang}", locale)

  useGSAP(
    () => {
      if (!root.current) {
        return
      }

      const lines = [planRef.current, fetchRef.current, selectRef.current]
      const tl = gsap.timeline()

      if (reduced) {
        gsap.set([cmdRef.current, ...lines, answerRef.current], { opacity: 1 })
        if (answerRef.current) {
          answerRef.current.textContent = (intro?.answer ?? "") as string
        }
        onAnswerShown?.()
        return
      }

      gsap.set([cmdRef.current, ...lines, answerRef.current], { opacity: 0 })

      tl.fromTo(
        cmdRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.2,
          onStart: () => {
            if (cmdRef.current) {
              cmdRef.current.textContent = commandLine
            }
          },
        }
      )

      for (const line of lines) {
        if (!line) {
          continue
        }
        const text = line.dataset.text ?? ""
        tl.to(line, {
          opacity: 1,
          duration: 0.15,
          onStart: () => {
            line.textContent = ""
          },
        }).to(line, {
          duration: Math.min(0.9, Math.max(0.3, text.length * 0.018)),
          text: { value: text, speed: 1 },
          ease: "none",
        })
      }

      tl.to(answerRef.current, { opacity: 1, duration: 0.15 })
      tl.add(() => {
        if (!answerRef.current) {
          return
        }
        if (answer) {
          gsap.to(answerRef.current, {
            duration: Math.min(1.6, Math.max(0.4, answer.length * 0.02)),
            text: { value: t("answerPrefix") + answer, speed: 1 },
            ease: "none",
            onComplete: () => onAnswerShown?.(),
          })
        } else {
          answerRef.current.textContent = t("answerPrefix") + SPINNER
        }
      })

      if (answer) {
        // answer already resolved (warm-ish): ensure onAnswerShown fires
      } else {
        // cold start: allow scroll after a grace window
        const grace = setTimeout(() => onAnswerShown?.(), 2500)
        tl.add(() => clearTimeout(grace))
      }
    },
    { scope: root, dependencies: [locale, answer, reduced] }
  )

  return (
    <div
      ref={root}
      className="border border-grid bg-terminal-bg p-4 font-mono text-xs leading-6 text-terminal-green sm:text-sm"
      data-terminal
    >
      <span ref={cmdRef} className="block text-blueprint" data-text={commandLine} />
      <span ref={planRef} className="block" data-text={t("plan")} />
      <span ref={fetchRef} className="block" data-text={fetchLine} />
      <span ref={selectRef} className="block" data-text={t("select")} />
      <span ref={answerRef} className="block text-paper" />
      {waiting ? <span className="block text-ink-soft">…</span> : null}
    </div>
  )
}
