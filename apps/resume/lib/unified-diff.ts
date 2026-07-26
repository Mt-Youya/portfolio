type DiffLine = { type: "same" | "add" | "remove"; value: string }

export function createUnifiedDiff(before: string, after: string) {
  const left = before.replace(/\r\n/g, "\n").split("\n")
  const right = after.replace(/\r\n/g, "\n").split("\n")
  const matrix = Array.from({ length: left.length + 1 }, () => Array<number>(right.length + 1).fill(0))

  for (let leftIndex = left.length - 1; leftIndex >= 0; leftIndex -= 1) {
    for (let rightIndex = right.length - 1; rightIndex >= 0; rightIndex -= 1) {
      matrix[leftIndex][rightIndex] =
        left[leftIndex] === right[rightIndex]
          ? matrix[leftIndex + 1][rightIndex + 1] + 1
          : Math.max(matrix[leftIndex + 1][rightIndex], matrix[leftIndex][rightIndex + 1])
    }
  }

  const result: DiffLine[] = []
  let leftIndex = 0
  let rightIndex = 0
  while (leftIndex < left.length || rightIndex < right.length) {
    if (leftIndex < left.length && rightIndex < right.length && left[leftIndex] === right[rightIndex]) {
      result.push({ type: "same", value: left[leftIndex] })
      leftIndex += 1
      rightIndex += 1
    } else if (
      rightIndex < right.length &&
      (leftIndex === left.length || matrix[leftIndex][rightIndex + 1] >= matrix[leftIndex + 1][rightIndex])
    ) {
      result.push({ type: "add", value: right[rightIndex] })
      rightIndex += 1
    } else {
      result.push({ type: "remove", value: left[leftIndex] })
      leftIndex += 1
    }
  }

  const changed = result.some((line) => line.type !== "same")
  if (!changed) return "（内容没有变化）"

  return [
    "--- content/resume.zh.md",
    "+++ content/resume.zh.md",
    "@@",
    ...result.map((line) => `${line.type === "same" ? " " : line.type === "add" ? "+" : "-"}${line.value}`),
  ].join("\n")
}
