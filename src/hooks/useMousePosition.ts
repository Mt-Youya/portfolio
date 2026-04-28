'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function useMousePosition() {
  const setMousePosition = useAppStore((s) => s.setMousePosition)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 归一化到 [-1, 1]
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [setMousePosition])
}
