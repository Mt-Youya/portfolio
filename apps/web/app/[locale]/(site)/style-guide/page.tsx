import { DrawLine, Grid, Seal, SheetLabel } from "@/components/blueprint"

const tokens = [
  { name: "--paper", value: "var(--paper)", swatch: "bg-paper" },
  { name: "--paper-raised", value: "var(--paper-raised)", swatch: "bg-paper-raised" },
  { name: "--ink", value: "var(--ink)", swatch: "bg-ink" },
  { name: "--ink-soft", value: "var(--ink-soft)", swatch: "bg-ink-soft" },
  { name: "--grid", value: "var(--grid)", swatch: "bg-grid" },
  { name: "--blueprint", value: "var(--blueprint)", swatch: "bg-blueprint" },
  { name: "--blueprint-soft", value: "var(--blueprint-soft)", swatch: "bg-blueprint-soft" },
  { name: "--seal", value: "var(--seal)", swatch: "bg-seal" },
  { name: "--terminal-bg", value: "var(--terminal-bg)", swatch: "bg-terminal-bg" },
  { name: "--terminal-green", value: "var(--terminal-green)", swatch: "bg-terminal-green" },
]

export default function StyleGuidePage() {
  return (
    <main className="relative min-h-screen px-5 py-16 sm:px-8">
      <Grid />
      <div className="relative z-10 mx-auto max-w-5xl">
        <SheetLabel sheet="SHEET SG — STYLE GUIDE" />
        <h1 className="mt-4 text-4xl font-semibold text-ink">蓝图设计系统</h1>
        <p className="mt-3 text-base leading-8 text-ink-soft">
          Tokens、字体、基础组件。所有 Section 由这些原子构成。
        </p>

        <section className="mt-12">
          <SheetLabel sheet="01 — COLOR TOKENS" className="text-ink-soft" />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {tokens.map((t) => (
              <div key={t.name} className="border border-grid bg-paper-raised p-3">
                <div className={`${t.swatch} h-12 w-full border border-grid`} />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{t.name}</p>
                <p className="font-mono text-xs text-ink">{t.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SheetLabel sheet="02 — TYPOGRAPHY" className="text-ink-soft" />
          <div className="mt-6 space-y-4 border border-grid bg-paper-raised p-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Display</p>
              <p className="text-3xl font-semibold text-ink">辞鸢 · Blueprint & Seal</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Body</p>
              <p className="text-base leading-8 text-ink-soft">正文,克制中性。</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Mono</p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-blueprint">SHEET 01 — FIG. 02</p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <SheetLabel sheet="03 — COMPONENTS" className="text-ink-soft" />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="border border-grid bg-paper-raised p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">SheetLabel</p>
              <div className="mt-4">
                <SheetLabel sheet="SHEET 01 — HERO" href="#hero" />
              </div>
            </div>
            <div className="border border-grid bg-paper-raised p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Seal</p>
              <div className="mt-4 flex items-center gap-4">
                <Seal label="辞鸢" />
                <Seal label="APPROVED" variant="approved" />
              </div>
            </div>
            <div className="border border-grid bg-paper-raised p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">DrawLine</p>
              <div className="mt-4">
                <DrawLine length="100%" label="FIG. 02" />
              </div>
            </div>
            <div className="relative border border-grid bg-paper-raised p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Grid</p>
              <div className="mt-4">
                <Grid className="static h-24 w-full opacity-100" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
