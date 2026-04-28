'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MousePosition {
  x: number
  y: number
}

export type Theme = 'dark' | 'light' | 'system'

interface AppState {
  activeSection: string
  mousePosition: MousePosition
  isMenuOpen: boolean
  isLoaded: boolean
  theme: Theme

  setActiveSection: (section: string) => void
  setMousePosition: (pos: MousePosition) => void
  setMenuOpen: (open: boolean) => void
  setLoaded: (loaded: boolean) => void
  setTheme: (theme: Theme) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeSection: 'hero',
      mousePosition: { x: 0, y: 0 },
      isMenuOpen: false,
      isLoaded: false,
      theme: 'dark',

      setActiveSection: (section) => set({ activeSection: section }),
      setMousePosition: (pos) => set({ mousePosition: pos }),
      setMenuOpen: (open) => set({ isMenuOpen: open }),
      setLoaded: (loaded) => set({ isLoaded: loaded }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'portfolio-store',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
