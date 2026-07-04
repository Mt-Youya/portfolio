export function SectionHeader({ sheet, title, summary }: { sheet: string; title: string; summary: string }) {
  return (
    <div data-section-header className="max-w-3xl bg-paper pb-6">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-blueprint">{sheet}</p>
      <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-ink sm:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-ink-soft">{summary}</p>
    </div>
  )
}
