"use client"

import { create } from "zustand"

import type { Locale } from "@/i18n/routing"

export type AgentIntroStatus = "idle" | "loading" | "success"

type IntroResult = { answer: string; repoCount: number | null }

type AgentState = {
  intro: Partial<Record<Locale, IntroResult>>
  status: Partial<Record<Locale, AgentIntroStatus>>
  fetchIntro: (locale: Locale) => Promise<IntroResult | null>
}

export const useAgentStore = create<AgentState>((set, get) => ({
  intro: {},
  status: {},
  fetchIntro: async (locale) => {
    if (get().status[locale] === "loading") {
      return get().intro[locale] ?? null
    }

    const cached = get().intro[locale]
    if (cached !== undefined) {
      return cached
    }

    set((s) => ({ status: { ...s.status, [locale]: "loading" } }))

    try {
      const res = await fetch(`/api/agent?lang=${locale}`)
      if (!res.ok) {
        throw new Error(`agent intro failed: ${res.status}`)
      }
      const data = (await res.json()) as IntroResult
      set((s) => ({
        intro: { ...s.intro, [locale]: data },
        status: { ...s.status, [locale]: "success" },
      }))
      return data
    } catch {
      set((s) => ({ status: { ...s.status, [locale]: "idle" } }))
      return null
    }
  },
}))
