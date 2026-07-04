"use client"

import { useEffect } from "react"

import type { Locale } from "@/i18n/routing"
import { useUiStore } from "@/stores/ui"

type ThemeProviderProps = {
  children: React.ReactNode
  locale: Locale
}

export function ThemeProvider({ children, locale }: ThemeProviderProps) {
  const theme = useUiStore((state) => state.theme)
  const setLocale = useUiStore((state) => state.setLocale)

  useEffect(() => {
    setLocale(locale)
  }, [locale, setLocale])

  useEffect(() => {
    const root = document.documentElement

    root.dataset.theme = theme
    root.classList.toggle("dark", theme === "dark")
    root.style.colorScheme = theme
  }, [theme])

  return children
}
