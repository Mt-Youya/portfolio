export const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export const calcTextOpacity = (progress: number, inEnd = 30, outStart = 80) => {
  const fadeIn = clamp(progress / inEnd, 0, 1)
  const fadeOut = progress >= outStart ? clamp(1 - (progress - outStart) / (100 - outStart), 0, 1) : 1
  return fadeIn * fadeOut
}

export const calcTextBlur = (progress: number, inEnd = 30, outStart = 80, maxBlur = 8) => {
  const blurIn = (1 - clamp(progress / inEnd, 0, 1)) * maxBlur
  const blurOut = progress >= outStart ? clamp((progress - outStart) / (100 - outStart), 0, 1) * maxBlur : 0
  return Math.max(blurIn, blurOut)
}
