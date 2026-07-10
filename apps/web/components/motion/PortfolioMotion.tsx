"use client"

import { useGSAP } from "@gsap/react"
import { useRef } from "react"

import { ensurePlugins, gsap, ScrollTrigger } from "@/lib/gsap"

type Cleanup = () => void

export function PortfolioMotion() {
  const layerRef = useRef<HTMLDivElement>(null)

  useGSAP(async () => {
    const root = document.querySelector<HTMLElement>("[data-portfolio-root]")
    if (!root) {
      return
    }

    await ensurePlugins("motionPath", "drawSVG")

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const q = gsap.utils.selector(root)
    const cleanup: Cleanup[] = []

    if (prefersReducedMotion) {
      gsap.set(
        q(
          [
            "[data-hero-motion]",
            "[data-reveal]",
            "[data-card]",
            "[data-section-header]",
            "[data-section-scan]",
            "[data-skill-card]",
            "[data-skill-item]",
            "[data-project-card]",
            "[data-project-bullet]",
            "[data-highlight-row]",
            "[data-contact-panel]",
          ].join(", ")
        ),
        {
          autoAlpha: 1,
          clearProps: "transform,clipPath",
        }
      )
      return
    }

    const heroTitle = q("[data-hero-title]")[0] as HTMLElement | undefined
    const restoreTitle = heroTitle ? splitTitle(heroTitle) : undefined

    const heroItems = q("[data-hero-motion]")
    gsap.set(heroItems, { autoAlpha: 0, y: 24 })
    gsap.set(q("[data-stat]"), { autoAlpha: 0, y: 28, clipPath: "inset(0 0 100% 0)" })
    gsap.set(q("[data-hero-card]"), { autoAlpha: 0, y: 42, rotateX: 5, transformPerspective: 900 })

    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } })
    heroTl
      .to(q("[data-hero-kicker]"), { autoAlpha: 1, y: 0, duration: 0.42 })
      .to(q("[data-hero-meta]"), { autoAlpha: 1, y: 0, duration: 0.48 }, "-=0.18")
      .fromTo(
        q("[data-hero-title] .motion-char"),
        {
          autoAlpha: 0,
          clipPath: "inset(0 100% 0 0)",
          color: "transparent",
          webkitTextStroke: "1px var(--blueprint)",
          y: 16,
        },
        {
          autoAlpha: 1,
          clipPath: "inset(0 0% 0 0)",
          color: "var(--ink)",
          webkitTextStroke: "0px transparent",
          y: 0,
          duration: 0.52,
          stagger: 0.012,
        },
        "-=0.12"
      )
      .to(q("[data-hero-copy]"), { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.2")
      .to(q("[data-hero-actions]"), { autoAlpha: 1, y: 0, duration: 0.42 }, "-=0.22")
      .to(q("[data-stat]"), { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.48, stagger: 0.1 }, "-=0.14")
      .to(q("[data-hero-card]"), { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.62 }, "-=0.16")

    const terminalLines = q("[data-terminal-line]") as HTMLElement[]
    terminalLines.forEach((line) => {
      const text = line.textContent ?? ""
      line.dataset.fullText = text
      line.textContent = ""
    })

    heroTl.add(() => {
      const terminalTl = gsap.timeline()

      terminalLines.forEach((line, index) => {
        terminalTl.to(line, {
          duration: Math.min(0.64, Math.max(0.22, (line.dataset.fullText?.length ?? 30) / 92)),
          text: line.dataset.fullText ?? "",
          ease: "none",
        })

        if (index < terminalLines.length - 1) {
          terminalTl.to({}, { duration: 0.04 })
        }
      })
    }, "-=0.32")

    animateHeroCore(q, cleanup)
    animateLoop(q)
    animateRuntimeStage(q, cleanup)
    animateReveal(q)
    animateCards(q, cleanup)
    animateSectionScans(q)
    animateSkillSection(q, cleanup)
    animateProjectSection(q, cleanup)
    animateHighlightSection(q, cleanup)
    animateContactSection(q)
    animatePinnedSections(root, cleanup)
    animateKite(layerRef.current)

    ScrollTrigger.refresh()

    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener("resize", onResize)
    cleanup.push(() => window.removeEventListener("resize", onResize))

    return () => {
      cleanup.forEach((dispose) => dispose())
      restoreTitle?.()
    }
  }, [])

  return (
    <div ref={layerRef} data-motion-layer className="pointer-events-none fixed inset-0 z-10 hidden lg:block">
      <div
        data-scroll-line
        className="absolute right-10 top-24 h-[56vh] w-px origin-top bg-blueprint/40"
        aria-hidden="true"
      />
      <svg
        data-kite
        className="absolute right-6 top-24 h-16 w-16 text-blueprint"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path d="M32 6L54 32L32 58L10 32Z" fill="var(--paper-raised)" stroke="currentColor" strokeWidth="2" />
        <path d="M32 6V58M10 32H54" stroke="currentColor" strokeWidth="1.4" />
        <path d="M32 58C28 70 44 72 40 84" fill="none" stroke="var(--seal)" strokeWidth="2" />
      </svg>
    </div>
  )
}

function animateHeroCore(q: ReturnType<typeof gsap.utils.selector>, cleanup: Cleanup[]) {
  const rings = q("[data-core-ring]")
  const beams = q("[data-core-beam]")
  const pulse = q("[data-core-pulse]")
  const scan = q("[data-core-scan]")
  const terminalScan = q("[data-terminal-scan]")

  gsap.set([...rings, ...beams, ...pulse, ...scan], {
    autoAlpha: 0,
    scale: 0.72,
    transformOrigin: "center",
  })

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .to(rings, { autoAlpha: 1, scale: 1, duration: 0.9, stagger: 0.09 }, 0.15)
    .to(beams, { autoAlpha: 1, scale: 1, duration: 0.72, stagger: 0.08 }, 0.32)
    .to(pulse, { autoAlpha: 1, scale: 1, duration: 0.62 }, 0.42)
    .to(scan, { autoAlpha: 1, scale: 1, duration: 0.44 }, 0.5)

  gsap.to(rings[0], { rotation: 360, duration: 46, repeat: -1, ease: "none" })
  gsap.to(rings[1], { rotation: -360, duration: 28, repeat: -1, ease: "none" })
  gsap.to(rings[2], { rotation: 360, duration: 18, repeat: -1, ease: "none" })
  gsap.to(beams, { strokeDashoffset: -160, duration: 8, repeat: -1, ease: "none" })
  gsap.to(pulse, { scale: 1.16, autoAlpha: 0.74, duration: 1.7, repeat: -1, yoyo: true, ease: "sine.inOut" })
  gsap.to(scan, { rotation: 360, duration: 5.8, repeat: -1, ease: "none" })
  gsap.to(terminalScan, {
    autoAlpha: 0.34,
    y: 380,
    duration: 2.2,
    repeat: -1,
    ease: "power1.inOut",
    repeatDelay: 0.4,
  })

  const onPointerMove = (event: PointerEvent) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 28
    const y = (event.clientY / window.innerHeight - 0.5) * 28

    const core = q("[data-agent-core]")
    if (!core.length) {
      return
    }

    gsap.to(core, {
      x,
      y,
      duration: 0.7,
      ease: "power3.out",
    })
  }

  window.addEventListener("pointermove", onPointerMove)
  cleanup.push(() => window.removeEventListener("pointermove", onPointerMove))
}

function splitTitle(element: HTMLElement) {
  const original = element.textContent ?? ""
  element.setAttribute("aria-label", original)
  element.textContent = ""

  const parts = original.match(/[A-Za-z]+(?:\s+[A-Za-z]+)*|[0-9]+(?:[.,:/-][0-9]+)*|\s|./gu) ?? []

  for (const char of parts) {
    const span = document.createElement("span")

    span.className = "motion-char"
    span.setAttribute("aria-hidden", "true")
    span.textContent = char === " " ? "\u00a0" : char.replaceAll(" ", "\u00a0")
    element.append(span)
  }

  return () => {
    element.textContent = original
    element.removeAttribute("aria-label")
  }
}

function animateRuntimeStage(q: ReturnType<typeof gsap.utils.selector>, cleanup: Cleanup[]) {
  const stage = q("[data-runtime-stage]")[0] as HTMLElement | undefined
  const path = q("[data-runtime-path]")[0] as unknown as SVGPathElement | undefined
  const secondaryPath = q("[data-runtime-path-secondary]")[0] as unknown as SVGPathElement | undefined
  const token = q("[data-runtime-token]")[0] as unknown as SVGElement | undefined
  const nodes = q("[data-runtime-node]")
  const steps = q("[data-runtime-step]")

  if (!stage || !path || !secondaryPath || !token) {
    return
  }

  const pathLength = path.getTotalLength()
  const secondaryLength = secondaryPath.getTotalLength()

  gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength })
  gsap.set(secondaryPath, { strokeDasharray: secondaryLength, strokeDashoffset: secondaryLength })
  gsap.set(nodes, { autoAlpha: 0, scale: 0.44, transformOrigin: "center" })
  gsap.set(steps, { autoAlpha: 0.46, x: 72 })

  const media = gsap.matchMedia()

  media.add("(min-width: 1024px)", () => {
    const runtimeTl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top top+=84",
        end: "+=1600",
        scrub: 1,
        pin: true,
      },
    })

    runtimeTl
      .to(path, { strokeDashoffset: 0, ease: "none" }, 0)
      .to(secondaryPath, { strokeDashoffset: 0, ease: "none" }, 0.05)
      .to(nodes, { autoAlpha: 1, scale: 1, stagger: 0.12, ease: "back.out(1.9)" }, 0.12)
      .to(
        token,
        {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
          },
          ease: "none",
        },
        0.04
      )
      .to(steps, { autoAlpha: 1, x: 0, stagger: 0.13, ease: "power3.out" }, 0.24)
      .to("[data-runtime-screen]", { scale: 1.025, duration: 0.3, ease: "none" }, 0.45)
  })

  media.add("(max-width: 1023px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top 76%",
          end: "bottom 48%",
          scrub: 0.8,
        },
      })
      .to(path, { strokeDashoffset: 0, ease: "none" }, 0)
      .to(secondaryPath, { strokeDashoffset: 0, ease: "none" }, 0)
      .to(nodes, { autoAlpha: 1, scale: 1, stagger: 0.08, ease: "back.out(1.7)" }, 0.1)
      .to(steps, { autoAlpha: 1, x: 0, stagger: 0.08, ease: "power3.out" }, 0.2)
  })

  cleanup.push(() => media.revert())
}

function animateLoop(q: ReturnType<typeof gsap.utils.selector>) {
  const loopPath = q("[data-loop-path]")[0] as unknown as SVGPathElement | undefined
  const loopToken = q("[data-loop-token]")[0] as unknown as SVGElement | undefined
  const loopNodes = q("[data-loop-node]")

  if (!loopPath || !loopToken) {
    return
  }

  const pathLength = loopPath.getTotalLength()
  gsap.set(loopPath, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  })
  gsap.set(loopNodes, { scale: 0.65, transformOrigin: "center", autoAlpha: 0 })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: loopPath,
        start: "top 78%",
        end: "bottom 45%",
        scrub: 0.8,
      },
    })
    .to(loopPath, { strokeDashoffset: 0, ease: "none" }, 0)
    .to(loopNodes, { autoAlpha: 1, scale: 1, stagger: 0.14, ease: "back.out(1.8)" }, 0.05)

  gsap.to(loopToken, {
    motionPath: {
      path: loopPath,
      align: loopPath,
      alignOrigin: [0.5, 0.5],
    },
    duration: 5,
    ease: "none",
    repeat: -1,
  })
}

function animateReveal(q: ReturnType<typeof gsap.utils.selector>) {
  const revealItems = q("[data-reveal]")

  revealItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        autoAlpha: 0,
        y: 44,
        rotateX: index % 2 === 0 ? 4 : -3,
        clipPath: "inset(10% 0 0 0)",
        transformPerspective: 900,
      },
      {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: 0.78,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          end: "top 45%",
          toggleActions: "play none none reverse",
        },
      }
    )
  })

  gsap.fromTo(
    q("[data-seal]"),
    { autoAlpha: 0, scale: 1.45, rotate: -7, transformOrigin: "center" },
    {
      autoAlpha: 1,
      scale: 1,
      rotate: 0,
      duration: 0.56,
      ease: "seal",
      scrollTrigger: {
        trigger: q("[data-seal]")[0],
        start: "top 86%",
      },
    }
  )

  q("[data-section-header]").forEach((header) => {
    gsap.fromTo(
      header,
      { autoAlpha: 0, y: 34 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      }
    )
  })
}

function animateCards(q: ReturnType<typeof gsap.utils.selector>, cleanup: Cleanup[]) {
  const cards = q("[data-card]") as HTMLElement[]

  cards.forEach((card) => {
    const onEnter = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.018,
        borderColor: "var(--blueprint)",
        duration: 0.32,
        ease: "power3.out",
      })
    }
    const onLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        borderColor: "var(--grid)",
        duration: 0.42,
        ease: "power3.out",
      })
    }

    card.addEventListener("mouseenter", onEnter)
    card.addEventListener("mouseleave", onLeave)
    cleanup.push(() => {
      card.removeEventListener("mouseenter", onEnter)
      card.removeEventListener("mouseleave", onLeave)
    })
  })
}

function animateSectionScans(q: ReturnType<typeof gsap.utils.selector>) {
  const scans = q("[data-section-scan]") as HTMLElement[]

  scans.forEach((scan) => {
    const section = scan.parentElement
    if (!section) {
      return
    }

    gsap.fromTo(
      scan,
      { autoAlpha: 0, y: 0, scaleX: 0.2 },
      {
        autoAlpha: 0.86,
        y: () => section.offsetHeight,
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "bottom 18%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      }
    )
  })
}

function animateSkillSection(q: ReturnType<typeof gsap.utils.selector>, cleanup: Cleanup[]) {
  const section = q("[data-skill-section]")[0] as HTMLElement | undefined
  const cards = q("[data-skill-card]") as HTMLElement[]
  const items = q("[data-skill-item]") as HTMLElement[]

  if (!section || cards.length === 0) {
    return
  }

  gsap.set(cards, {
    autoAlpha: 0,
    y: 96,
    x: (index) => (index % 3 === 0 ? -72 : index % 3 === 1 ? 0 : 72),
    rotateZ: (index) => (index % 2 === 0 ? -1.8 : 1.8),
    clipPath: "inset(0 0 100% 0)",
    transformPerspective: 900,
  })
  gsap.set(items, { autoAlpha: 0, x: -20 })

  const media = gsap.matchMedia()

  media.add("(min-width: 768px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "bottom 30%",
          scrub: 0.85,
        },
      })
      .to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          rotateZ: 0,
          clipPath: "inset(0% 0 0% 0)",
          stagger: 0.08,
          ease: "power3.out",
        },
        0
      )
      .to(items, { autoAlpha: 1, x: 0, stagger: 0.018, ease: "power2.out" }, 0.18)
  })

  media.add("(max-width: 767px)", () => {
    gsap.to(cards, {
      autoAlpha: 1,
      y: 0,
      x: 0,
      rotateZ: 0,
      clipPath: "inset(0% 0 0% 0)",
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    })

    gsap.to(items, {
      autoAlpha: 1,
      x: 0,
      stagger: 0.015,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
      },
    })
  })

  cleanup.push(() => media.revert())
}

function animateProjectSection(q: ReturnType<typeof gsap.utils.selector>, cleanup: Cleanup[]) {
  const section = q("[data-project-section]")[0] as HTMLElement | undefined
  const grid = q("[data-projects-grid]")[0] as HTMLElement | undefined
  const cards = q("[data-project-card]") as HTMLElement[]
  const bullets = q("[data-project-bullet]") as HTMLElement[]

  if (!section || !grid || cards.length === 0) {
    return
  }

  gsap.set(cards, {
    autoAlpha: 0,
    y: 136,
    x: (index) => (index % 2 === 0 ? -120 : 120),
    rotateZ: (index) => (index % 2 === 0 ? -2.4 : 2.4),
    transformPerspective: 1000,
  })
  gsap.set(bullets, { autoAlpha: 0, x: 26 })

  const media = gsap.matchMedia()

  media.add("(min-width: 1024px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "bottom 20%",
          scrub: 1,
        },
      })
      .to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          rotateZ: 0,
          stagger: 0.12,
          ease: "power3.out",
        },
        0
      )
      .to(bullets, { autoAlpha: 1, x: 0, stagger: 0.018, ease: "power2.out" }, 0.22)

    cards.forEach((card, index) => {
      gsap.to(card, {
        scale: 1 - index * 0.018,
        y: -index * 22,
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: card,
          start: "top 34%",
          end: "bottom 24%",
          scrub: true,
        },
      })
    })
  })

  media.add("(max-width: 1023px)", () => {
    gsap.to(cards, {
      autoAlpha: 1,
      y: 0,
      x: 0,
      rotateZ: 0,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: {
        trigger: grid,
        start: "top 80%",
      },
    })

    gsap.to(bullets, {
      autoAlpha: 1,
      x: 0,
      stagger: 0.015,
      ease: "power2.out",
      scrollTrigger: {
        trigger: grid,
        start: "top 78%",
      },
    })
  })

  cleanup.push(() => media.revert())
}

function animateHighlightSection(q: ReturnType<typeof gsap.utils.selector>, cleanup: Cleanup[]) {
  const section = q("[data-highlight-section]")[0] as HTMLElement | undefined
  const rows = q("[data-highlight-row]") as HTMLElement[]

  if (!section || rows.length === 0) {
    return
  }

  gsap.set(rows, {
    autoAlpha: 0,
    x: 120,
    clipPath: "inset(0 0 0 100%)",
  })

  const media = gsap.matchMedia()

  media.add("(min-width: 768px)", () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 74%",
          end: "bottom 22%",
          scrub: 0.9,
        },
      })
      .to(
        rows,
        {
          autoAlpha: 1,
          x: 0,
          clipPath: "inset(0 0 0 0%)",
          stagger: 0.08,
          ease: "power3.out",
        },
        0
      )
      .to(rows, { y: (index) => -index * 10, stagger: 0.05, ease: "none" }, 0.32)
  })

  media.add("(max-width: 767px)", () => {
    gsap.to(rows, {
      autoAlpha: 1,
      x: 0,
      clipPath: "inset(0 0 0 0%)",
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
      },
    })
  })

  cleanup.push(() => media.revert())
}

function animateContactSection(q: ReturnType<typeof gsap.utils.selector>) {
  const panel = q("[data-contact-panel]")[0] as HTMLElement | undefined

  if (!panel) {
    return
  }

  gsap.fromTo(
    panel,
    {
      autoAlpha: 0,
      y: 86,
      scale: 0.96,
      rotateX: 4,
      transformPerspective: 1000,
    },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: panel,
        start: "top 86%",
      },
    }
  )
}

function animatePinnedSections(root: HTMLElement, cleanup: Cleanup[]) {
  const media = gsap.matchMedia()

  media.add("(min-width: 1024px)", () => {
    const sections = root.querySelectorAll<HTMLElement>("[data-pin-section]")

    sections.forEach((section) => {
      const header = section.querySelector<HTMLElement>("[data-section-header]")
      if (!header) {
        return
      }

      const pinDistance = section.offsetHeight - window.innerHeight + 88
      if (pinDistance <= 80) {
        return
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top top+=88",
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          gsap.set(header, { zIndex: self.isActive ? 30 : "auto" })
        },
      })
    })
  })

  cleanup.push(() => media.revert())
}

function animateKite(layer: HTMLDivElement | null) {
  if (!layer) {
    return
  }

  const kite = layer.querySelector("[data-kite]")
  const line = layer.querySelector("[data-scroll-line]")

  gsap.set(line, { scaleY: 0.2 })
  gsap.to(line, {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
    },
  })

  gsap.to(kite, {
    y: "64vh",
    x: -26,
    rotation: 18,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7,
    },
  })

  gsap.to(kite, {
    y: "+=12",
    rotation: "-=5",
    duration: 2.6,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  })
}
