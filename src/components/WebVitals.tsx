'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onFID, onLCP, onTTFB, onINP } from 'web-vitals'

function logMetric({ name, value, rating }: { name: string; value: number; rating: string }) {
  const color = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌'
  console.log(`${color} [Web Vitals] ${name}: ${Math.round(value)}ms (${rating})`)
}

export function WebVitals() {
  useEffect(() => {
    onCLS(logMetric)
    onFCP(logMetric)
    onLCP(logMetric)
    onTTFB(logMetric)
    onINP(logMetric)
    // onFID is deprecated in web-vitals v4, replaced by INP
  }, [])

  return null
}
