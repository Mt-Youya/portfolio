"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export const locales = ["zh", "en"] as const

export type Locale = (typeof locales)[number]
export type Theme = "light" | "dark"
export type MotionPreference = "system" | "reduced" | "full"

type UiState = {
  theme: Theme
  locale: Locale
  motionPreference: MotionPreference
  hasPlayedIntro: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setLocale: (locale: Locale) => void
  setMotionPreference: (motionPreference: MotionPreference) => void
  markIntroPlayed: () => void
  resetIntroPlayed: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: "light",
      locale: "zh",
      motionPreference: "system",
      hasPlayedIntro: false,
      setTheme: (theme) => {
        set({ theme })
      },
      toggleTheme: () => {
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" }))
      },
      setLocale: (locale) => {
        set({ locale })
      },
      setMotionPreference: (motionPreference) => {
        set({ motionPreference })
      },
      markIntroPlayed: () => {
        set({ hasPlayedIntro: true })
      },
      resetIntroPlayed: () => {
        set({ hasPlayedIntro: false })
      },
    }),
    {
      name: "cyrus-ui",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        locale: state.locale,
      }),
    }
  )
)
