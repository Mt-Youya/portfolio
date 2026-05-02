'use client'

import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function useMousePosition() {
  const setMousePosition = useAppStore((s) => s.setMousePosition)
  // Three.js 在 useFrame 里读 getState()，所以 60fps 已经够了
  // mousemove 原生可达 120~240Hz，用 RAF 节流到屏幕刷新率（约 16ms）
  const rafRef = useRef<number | null>(null)
  const pendingRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pendingRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }

      // 每帧最多 flush 一次，避免 120Hz 鼠标以 2× 频率驱动 Zustand set()
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null
          if (pendingRef.current) {
            setMousePosition(pendingRef.current)
            pendingRef.current = null
          }
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [setMousePosition])
}
