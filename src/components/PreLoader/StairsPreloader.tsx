'use client'

import { cn } from '@/lib/utils'
import { Phase, usePreloader } from './usePreloader'

export enum RevealFrom {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

export enum RevealDirection {
  Up = 'up',
  Down = 'down',
}

export interface StairsPreloaderProps {
  loading?: boolean
  duration?: number
  bgColor?: string
  className?: string
  loadingText?: string
  textFadeThreshold?: number
  stairCount?: number
  revealFrom?: RevealFrom
  revealDirection?: RevealDirection
  onComplete?: () => void
  onLoadingStart?: () => void
  onLoadingComplete?: () => void
  children?: React.ReactNode
}

export function StairsPreloader({
  loading = false,
  duration = 2200,
  bgColor = '#0a0a0a',
  className = '',
  loadingText = 'Loading...',
  textFadeThreshold = 80,
  stairCount = 10,
  revealFrom = RevealFrom.Left,
  revealDirection = RevealDirection.Up,
  onComplete,
  onLoadingStart,
  onLoadingComplete,
  children,
}: StairsPreloaderProps) {
  const { exiting, progress, done, phase, textOpacity, textBlur } = usePreloader({
    loading,
    duration,
    textFadeThreshold,
    onComplete,
    onLoadingStart,
    onLoadingComplete,
  })

  function getDelay(i: number) {
    const max = 700
    if (revealFrom === RevealFrom.Right) return ((stairCount - 1 - i) / stairCount) * max
    if (revealFrom === RevealFrom.Center) {
      const mid = (stairCount - 1) / 2
      return (Math.abs(i - mid) / mid) * max
    }
    return (i / stairCount) * max
  }

  if (done || (!loading && phase === Phase.Idle)) {
    return <>{children}</>
  }

  return (
    <div className={cn('fixed inset-0 z-9999 overflow-hidden', className)}>
      {/* 台阶遮罩 */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: stairCount }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 will-change-transform',
              'transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)]',
              exiting
                ? revealDirection === RevealDirection.Down
                  ? 'translate-y-full'
                  : '-translate-y-full'
                : 'translate-y-0'
            )}
            style={{
              backgroundColor: bgColor,
              transitionDelay: exiting ? `${getDelay(i).toFixed(0)}ms` : '0ms',
            }}
          />
        ))}
      </div>

      {/* 加载文字 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        style={{
          opacity: textOpacity,
          filter: `blur(${textBlur.toFixed(2)}px)`,
          transition: 'opacity 0.3s ease, filter 0.3s ease',
        }}
      >
        <p
          className="text-white font-mono text-sm tracking-[0.15em] select-none"
          style={{ fontFamily: "'DM Mono', 'Courier New', monospace" }}
        >
          {loadingText}
        </p>
      </div>

      {/* 进度条 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-0.5 bg-white/10">
        <div
          className="h-full bg-white/60 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
