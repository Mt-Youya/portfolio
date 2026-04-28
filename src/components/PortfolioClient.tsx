'use client'

import { useEffect } from 'react'
import { Navbar } from '@/layouts/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useAppStore } from '@/store/useAppStore'

export function PortfolioClient() {
  useMousePosition()
  useScrollSpy()

  const setLoaded = useAppStore((s) => s.setLoaded)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [setLoaded])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
