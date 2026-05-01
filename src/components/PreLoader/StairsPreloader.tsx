'use client'

import { motion } from 'framer-motion'
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
  textColor?: string
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
  textColor = '#ffffff',
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
  const { exiting, progress, done, phase } = usePreloader({
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
      >
        <p
          className="font-mono text-sm tracking-[0.15em] select-none flex flex-wrap justify-center gap-x-[0.3em]"
          style={{ color: textColor, fontFamily: "'DM Mono', 'Courier New', monospace" }}
        >
          {loadingText.split(' ').map((word, i, arr) => {
            const isExiting = progress >= 75
            const enterDelay = i * 0.08
            const exitDelay = (arr.length - 1 - i) * 0.06
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
                animate={
                  isExiting
                    ? {
                        opacity: 0,
                        filter: 'blur(8px)',
                        y: -10,
                        transition: { delay: exitDelay, duration: 0.4, ease: 'easeIn' },
                      }
                    : {
                        opacity: 1,
                        filter: 'blur(0px)',
                        y: 0,
                        transition: { delay: enterDelay, duration: 0.5, ease: 'easeOut' },
                      }
                }
                className="inline-block"
              >
                {word}
              </motion.span>
            )
          })}
        </p>
      </div>

      {/* 进度条 */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 h-0.5"
        style={{ backgroundColor: `${textColor}1a` }}
      >
        <div
          className="h-full transition-all duration-100"
          style={{ width: `${progress}%`, backgroundColor: `${textColor}99` }}
        />
      </div>
    </div>
  )
}
