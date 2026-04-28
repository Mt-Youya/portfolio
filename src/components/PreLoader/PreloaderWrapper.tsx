'use client'

import { useState } from 'react'
import { StairsPreloader } from './StairsPreloader'

export function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading] = useState(true)

  return (
    <StairsPreloader
      loading={loading}
      duration={2200}
      loadingText="Loading..."
      stairCount={10}
    >
      {children}
    </StairsPreloader>
  )
}
