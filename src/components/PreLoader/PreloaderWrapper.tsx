'use client'

import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { StairsPreloader } from './StairsPreloader'

export function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading] = useState(true)
  const theme = useAppStore((s) => s.theme)

  // dark 模式用亮色阶梯遮罩，light 模式用深色阶梯遮罩
  const bgColor = theme === 'light' ? '#0f0f0f' : '#f5f5f5'
  const textColor = theme === 'light' ? '#f5f5f5' : '#0f0f0f'

  return (
    <StairsPreloader
      loading={loading}
      duration={2200}
      loadingText="Loading..."
      stairCount={10}
      bgColor={bgColor}
      textColor={textColor}
    >
      {children}
    </StairsPreloader>
  )
}
