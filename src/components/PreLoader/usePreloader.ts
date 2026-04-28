'use client'

import { useState, useEffect, useRef } from 'react'
import { calcTextBlur, calcTextOpacity, easeInOutQuad } from './easing'

export enum Phase {
  Idle = 'idle',
  Loading = 'loading',
  Exiting = 'exiting',
  Done = 'done',
}

export interface UsePreloaderOptions {
  loading: boolean
  duration: number
  textFadeThreshold?: number
  exitDuration?: number
  onComplete?: () => void
  onLoadingStart?: () => void
  onLoadingComplete?: () => void
}

export interface UsePreloaderReturn {
  progress: number
  phase: Phase
  exiting: boolean
  done: boolean
  textOpacity: number
  textBlur: number
}

export function usePreloader({
  loading,
  duration,
  textFadeThreshold = 80,
  exitDuration = 900,
  onComplete,
  onLoadingStart,
  onLoadingComplete,
}: UsePreloaderOptions): UsePreloaderReturn {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<Phase>(Phase.Idle)

  const rafRef = useRef(0)
  const startRef = useRef<number | null>(null)
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setProgress(0)
    setPhase(Phase.Loading)
    startRef.current = null
    onLoadingStart?.()

    function animate(timestamp: number) {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const raw = Math.min(elapsed / duration, 1)
      const p = Math.floor(easeInOutQuad(raw) * 100)
      setProgress(p)

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setProgress(100)
        setPhase(Phase.Exiting)
        onComplete?.()
        exitTimerRef.current = setTimeout(() => {
          setPhase(Phase.Done)
          onLoadingComplete?.()
        }, exitDuration)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current)
      startRef.current = null
    }
  }, [loading, duration])

  return {
    progress,
    phase,
    exiting: phase === Phase.Exiting,
    done: phase === Phase.Done,
    textOpacity: calcTextOpacity(progress, 30, textFadeThreshold),
    textBlur: calcTextBlur(progress, 30, textFadeThreshold),
  }
}
