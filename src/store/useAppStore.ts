'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MousePosition {
  x: number
  y: number
}

export type Theme = 'dark' | 'light'

// 同步更新 DOM class，不依赖 React 渲染周期
function applyThemeToDom(theme: Theme) {
  if (typeof window === 'undefined') return
  document.documentElement.classList.remove('dark', 'light')
  document.documentElement.classList.add(theme)
}

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
      setTheme: (theme) => {
        set({ theme })
        // 立即同步 DOM，不等 React 的 useEffect（解决点两下才切换的问题）
        applyThemeToDom(theme)
      },
    }),
    {
      name: 'portfolio-store',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        // persist 从 localStorage 恢复后，立即同步 DOM（防止 hydration 错位）
        if (state) applyThemeToDom(state.theme)
      },
    },
  ),
)
