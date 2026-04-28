'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

const SECTIONS = ['hero', 'about', 'skills', 'experience', 'projects', 'contact']

export function useScrollSpy() {
  const setActiveSection = useAppStore((s) => s.setActiveSection)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

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
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [setActiveSection])
}
