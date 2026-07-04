import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { routing, type Locale } from "@/i18n/routing"

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider locale={locale as Locale}>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
