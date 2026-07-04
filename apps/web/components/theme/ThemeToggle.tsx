"use client"

import { Moon, Sun } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@cyrus/ui/button"

import { useUiStore } from "@/stores/ui"

export function ThemeToggle() {
  const t = useTranslations("site.controls")
  const theme = useUiStore((state) => state.theme)
  const toggleTheme = useUiStore((state) => state.toggleTheme)
  const label = theme === "dark" ? t("themeLight") : t("themeDark")

  return (
    <Button type="button" variant="outline" size="icon" aria-label={label} title={label} onClick={toggleTheme}>
      {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
    </Button>
  )
}
