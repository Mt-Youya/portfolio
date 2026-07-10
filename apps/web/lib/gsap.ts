"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { Observer } from "gsap/Observer"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"

let coreRegistered = false

function registerCore() {
  if (coreRegistered) {
    return
  }

  gsap.registerPlugin(useGSAP, CustomEase, Observer, ScrollTrigger, SplitText, ScrambleTextPlugin, TextPlugin)
  CustomEase.create("seal", "M0,0 C0.12,0 0.14,1.18 0.38,1.18 0.55,1.18 0.56,0.92 1,1")
  coreRegistered = true
}

registerCore()

const sectionPlugins = {
  drawSVG: () => import("gsap/DrawSVGPlugin").then((m) => m.DrawSVGPlugin),
  flip: () => import("gsap/Flip").then((m) => m.Flip),
  motionPath: () => import("gsap/MotionPathPlugin").then((m) => m.MotionPathPlugin),
  scrollSmoother: () => import("gsap/ScrollSmoother").then((m) => m.ScrollSmoother),
} as const

export type SectionPlugin = keyof typeof sectionPlugins

const registeredSections = new Set<SectionPlugin>()

export async function ensurePlugins(...plugins: SectionPlugin[]): Promise<void> {
  const pending = plugins.filter((p) => !registeredSections.has(p))

  if (pending.length === 0) {
    return
  }

  const loaded = await Promise.all(pending.map((p) => sectionPlugins[p]()))
  gsap.registerPlugin(...loaded)
  pending.forEach((p) => registeredSections.add(p))
}

export { CustomEase, Observer, ScrambleTextPlugin, ScrollTrigger, SplitText, TextPlugin, gsap, useGSAP }
