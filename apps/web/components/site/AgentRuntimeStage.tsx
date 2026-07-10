import type { RuntimeStep } from "@/components/site/types"

type AgentRuntimeStageProps = {
  labels: string[]
  steps: RuntimeStep[]
  annotations?: string[]
}

export function AgentRuntimeStage({ labels, steps, annotations }: AgentRuntimeStageProps) {
  const [perceive, plan, tool, observe] = labels

  return (
    <div
      data-runtime-stage
      className="col-span-full mt-14 grid gap-6 border border-grid bg-paper-raised p-4 sm:p-6 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div
        data-runtime-screen
        className="relative min-h-[460px] overflow-hidden border border-grid bg-terminal-bg p-5 text-paper-raised"
      >
        <div className="absolute inset-0 runtime-screen-grid" />
        <svg
          className="relative z-[1] h-full min-h-[420px] w-full"
          viewBox="0 0 720 520"
          role="img"
          aria-label="Agent runtime"
        >
          <defs>
            <filter id="runtime-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            data-runtime-path
            d="M86 258C124 86 312 70 360 170C414 282 594 92 638 250C684 416 460 456 360 358C264 264 114 474 86 258Z"
            fill="none"
            stroke="var(--blueprint)"
            strokeWidth="3"
            filter="url(#runtime-glow)"
          />
          <path
            data-runtime-path-secondary
            d="M164 148L556 372M556 148L164 372M360 80V444"
            fill="none"
            stroke="var(--seal)"
            strokeWidth="1.4"
            strokeDasharray="8 18"
            opacity="0.72"
          />
          {[
            [132, 258, perceive],
            [360, 134, plan],
            [588, 258, tool],
            [360, 386, observe],
          ].map(([x, y, label], index) => {
            const isToolNode = index === 2
            const stroke = isToolNode ? "var(--seal)" : "var(--blueprint)"
            const annotation = annotations?.[index]

            return (
              <g key={label as string} data-runtime-node transform={`translate(${x} ${y})`}>
                <circle r="46" fill="var(--paper-raised)" stroke={stroke} strokeWidth={isToolNode ? 2.5 : 2} />
                <circle
                  r="60"
                  fill="none"
                  stroke={stroke}
                  strokeWidth="1"
                  strokeDasharray="4 10"
                  opacity="0.55"
                />
                <text textAnchor="middle" y="5" fill="var(--ink)" fontSize="15" fontFamily="monospace">
                  {label as string}
                </text>
                {annotation ? (
                  <text
                    data-runtime-annotation
                    textAnchor="middle"
                    y="78"
                    fill={isToolNode ? "var(--seal)" : "var(--ink-soft)"}
                    fontSize="11"
                    fontFamily="monospace"
                    letterSpacing="1"
                  >
                    {isToolNode ? "本站驱动 · " : ""}
                    {annotation}
                  </text>
                ) : null}
              </g>
            )
          })}
          <g data-runtime-token>
            <rect x="-18" y="-18" width="36" height="36" fill="var(--seal)" opacity="0.92" />
            <path d="M-10 0H10M0 -10V10" stroke="var(--paper-raised)" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <div className="grid gap-4">
        {steps.map((step) => (
          <article key={step.label} data-runtime-step className="border border-grid bg-paper p-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-blueprint">{step.label}</p>
            <p className="mt-4 text-sm leading-7 text-ink-soft">{step.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
