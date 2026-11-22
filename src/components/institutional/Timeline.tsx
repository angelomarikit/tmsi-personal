type TimelineItem = { year: string; label: string }

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => (
        <li
          key={item.year}
          className="rounded-lg border-2 border-gold/40 bg-gradient-to-b from-white to-[#faf7ef] px-3 py-3.5 text-center shadow-[0_2px_8px_rgb(0_0_0/0.06)] transition hover:border-gold/60 hover:shadow-md"
        >
          <p className="font-display text-base font-semibold text-forest sm:text-lg">{item.year}</p>
          <p className="mt-1.5 text-[11px] leading-snug text-ink/85 sm:text-xs">{item.label}</p>
        </li>
      ))}
    </ol>
  )
}