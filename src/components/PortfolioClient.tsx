'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Navbar } from '@/layouts/Navbar'
import { Hero } from '@/components/sections/Hero'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useAppStore } from '@/store/useAppStore'

// 非首屏 section 延迟加载，减少首屏 JS 解析量
const About      = dynamic(() => import('@/components/sections/About').then(m => ({ default: m.About })))
const Skills     = dynamic(() => import('@/components/sections/Skills').then(m => ({ default: m.Skills })))
const Experience = dynamic(() => import('@/components/sections/Experience').then(m => ({ default: m.Experience })))
const Projects   = dynamic(() => import('@/components/sections/Projects').then(m => ({ default: m.Projects })))
const Contact    = dynamic(() => import('@/components/sections/Contact').then(m => ({ default: m.Contact })))

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
