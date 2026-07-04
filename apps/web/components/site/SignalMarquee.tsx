export function SignalMarquee() {
  const items = ["LANGCHAIN", "MCP", "FUNCTION CALLING", "SSE", "TOOL RESULT", "KOA", "REACT", "CONTEXT LOOP"]

  return (
    <div
      data-signal-marquee
      className="relative z-[1] mx-auto mt-12 max-w-7xl overflow-hidden border-y border-grid py-4"
    >
      <div className="signal-marquee-track flex w-max gap-10 font-mono text-xs uppercase tracking-[0.24em] text-blueprint">
        {[...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
