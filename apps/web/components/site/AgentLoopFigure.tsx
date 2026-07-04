export function AgentLoopFigure({ labels }: { labels: string[] }) {
  const [perceive, plan, tool, observe] = labels

  return (
    <div className="mt-5 border border-grid p-4">
      <svg viewBox="0 0 520 260" role="img" aria-label={labels.join(" -> ")} className="h-auto w-full">
        <defs>
          <marker id="arrow" markerHeight="8" markerWidth="8" orient="auto" refX="6" refY="3">
            <path d="M0,0 L0,6 L6,3 z" fill="var(--blueprint)" />
          </marker>
        </defs>
        <rect x="14" y="14" width="492" height="232" fill="none" stroke="var(--grid)" strokeWidth="1" />
        <path
          data-loop-path
          d="M142 74 H378 C418 74 442 102 442 132 C442 166 414 188 378 188 H142 C106 188 78 166 78 132 C78 102 102 74 142 74 Z"
          fill="none"
          stroke="var(--blueprint)"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        <circle
          data-loop-node
          cx="140"
          cy="74"
          r="22"
          fill="var(--paper-raised)"
          stroke="var(--blueprint)"
          strokeWidth="2"
        />
        <circle
          data-loop-node
          cx="380"
          cy="74"
          r="22"
          fill="var(--paper-raised)"
          stroke="var(--blueprint)"
          strokeWidth="2"
        />
        <circle
          data-loop-node
          cx="380"
          cy="188"
          r="22"
          fill="var(--paper-raised)"
          stroke="var(--blueprint)"
          strokeWidth="2"
        />
        <circle
          data-loop-node
          cx="140"
          cy="188"
          r="22"
          fill="var(--paper-raised)"
          stroke="var(--blueprint)"
          strokeWidth="2"
        />
        <text x="140" y="80" textAnchor="middle" fill="var(--ink)" fontSize="13" fontFamily="monospace">
          {perceive}
        </text>
        <text x="380" y="80" textAnchor="middle" fill="var(--ink)" fontSize="13" fontFamily="monospace">
          {plan}
        </text>
        <text x="380" y="194" textAnchor="middle" fill="var(--ink)" fontSize="13" fontFamily="monospace">
          {tool}
        </text>
        <text x="140" y="194" textAnchor="middle" fill="var(--ink)" fontSize="13" fontFamily="monospace">
          {observe}
        </text>
        <path
          data-loop-token
          d="M260 108 L292 132 L260 156 L228 132 Z"
          fill="var(--blueprint)"
          opacity="0.16"
          stroke="var(--blueprint)"
        />
        <text x="260" y="137" textAnchor="middle" fill="var(--blueprint)" fontSize="12" fontFamily="monospace">
          AGENT
        </text>
      </svg>
    </div>
  )
}
