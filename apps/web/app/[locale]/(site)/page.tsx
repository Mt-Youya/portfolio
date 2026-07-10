import { getTranslations, setRequestLocale } from "next-intl/server"

import { AgentSection } from "@/components/site/AgentSection"
import { ContactSection } from "@/components/site/ContactSection"
import { HeroSection } from "@/components/site/HeroSection"
import { HighlightsSection } from "@/components/site/HighlightsSection"
import { ProjectsSection } from "@/components/site/ProjectsSection"
import { SiteHeader } from "@/components/site/SiteHeader"
import { StackExploded } from "@/components/site/StackExploded"
import { Timeline } from "@/components/site/Timeline"
import type { Capability, Highlight, NavItem, RuntimeStep, Stat } from "@/components/site/types"
import { PortfolioMotion } from "@/components/motion/PortfolioMotion"
import profile from "@/lib/profile"
import { routing, type Locale } from "@/i18n/routing"

type HomePageProps = {
  params: Promise<{
    locale: Locale
  }>
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("site")
  const navItems = t.raw("nav.items") as NavItem[]
  // const stats = t.raw("hero.stats") as Stat[]
  const loopLabels = t.raw("hero.loopLabels") as string[]
  const capabilities = t.raw("agent.capabilities") as Capability[]
  const runtimeSteps = t.raw("agent.runtimeSteps") as RuntimeStep[]
  const profileProjects = profile.projects
  const highlights = t.raw("highlights.items") as Highlight[]
  const nextLocale = locale === "zh" ? "en" : "zh"
  const localeHref = `/${nextLocale}`

  return (
    <main data-portfolio-root className="min-h-screen w-full max-w-full overflow-x-hidden text-ink">
      <PortfolioMotion />

      <SiteHeader
        locale={locale}
        navLabel={t("nav.label")}
        navItems={navItems}
        localeHref={localeHref}
        localeSwitchLabel={t("controls.localeSwitch")}
      />

      <HeroSection
        locale={locale}
        sheet={t("hero.sheet")}
        name={t("hero.name")}
        roleBadge={t("hero.roleBadge")}
        subtitle={t("hero.subtitle")}
        primaryCta={t("hero.primaryCta")}
        resumeCta={t("hero.resumeCta")}
      />

      <AgentSection
        sheet={t("agent.sheet")}
        title={t("agent.title")}
        summary={t("agent.summary")}
        capabilities={capabilities}
        loopLabels={loopLabels}
        runtimeSteps={runtimeSteps}
        runtimeAnnotations={t.raw("agent.runtimeAnnotations") as string[]}
      />

      <StackExploded
        sheet={t("skills.sheet")}
        title={t("skills.title")}
        summary={t("skills.summary")}
        stack={profile.stack}
        locale={locale}
        layerLabels={{
          ui: t("skills.layerLabels.ui"),
          state: t("skills.layerLabels.state"),
          api: t("skills.layerLabels.api"),
          data: t("skills.layerLabels.data"),
          infra: t("skills.layerLabels.infra"),
        }}
        caption={t("skills.caption")}
      />

      <ProjectsSection
        sheet={t("projects.sheet")}
        title={t("projects.title")}
        summary={t("projects.summary")}
        projects={profileProjects}
        locale={locale}
        primaryLabel={t("projects.primary")}
        deliveryLabel={t("projects.delivery")}
      />

      <Timeline
        sheet={t("timeline.sheet")}
        title={t("timeline.title")}
        summary={t("timeline.summary")}
        experience={profile.experience}
        locale={locale}
      />

      <HighlightsSection
        sheet={t("highlights.sheet")}
        title={t("highlights.title")}
        summary={t("highlights.summary")}
        highlights={highlights}
      />

      <ContactSection
        sheet={t("contact.sheet")}
        title={t("contact.title")}
        summary={t("contact.summary")}
        resumeLabel={t("contact.resume")}
        githubLabel={t("contact.github")}
        yuqueLabel={t("contact.yuque")}
        juejinLabel={t("contact.juejin")}
        emailLabel={t("contact.email")}
        phoneLabel={t("contact.phone")}
        worksLabel={t("contact.works")}
        stampLabel={t("contact.stamp")}
      />
    </main>
  )
}

export const dynamicParams = false
export const revalidate = false

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
