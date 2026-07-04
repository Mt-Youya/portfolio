"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { Flip } from "gsap/Flip"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { Observer } from "gsap/Observer"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"

let registered = false

export function registerGsapPlugins() {
  if (registered) {
    return
  }

  gsap.registerPlugin(
    useGSAP,
    CustomEase,
    DrawSVGPlugin,
    Flip,
    MotionPathPlugin,
    Observer,
    ScrambleTextPlugin,
    ScrollSmoother,
    ScrollTrigger,
    SplitText,
    TextPlugin
  )

  CustomEase.create("seal", "M0,0 C0.12,0 0.14,1.18 0.38,1.18 0.55,1.18 0.56,0.92 1,1")
  registered = true
}

export {
  CustomEase,
  DrawSVGPlugin,
  Flip,
  MotionPathPlugin,
  Observer,
  ScrambleTextPlugin,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
  TextPlugin,
  gsap,
  useGSAP,
}
