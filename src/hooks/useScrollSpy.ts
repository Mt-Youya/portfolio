'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

const SECTIONS = ['hero', 'about', 'skills', 'experience', 'projects', 'contact']

export function useScrollSpy() {
  const setActiveSection = useAppStore((s) => s.setActiveSection)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    for (const id of SECTIONS) {
      const el = document.getElementById(id)
      if (!el) continue

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [setActiveSection])
}
