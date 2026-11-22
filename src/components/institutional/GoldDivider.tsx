/** Decorative gold flourish between headings (mock-style). */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden
    >
      <svg viewBox="0 0 240 12" className="mx-auto h-3 w-full max-w-[200px]" fill="none">
        <path
          d="M0 6h88M152 6h88M104 6h32"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold"
        />
        <circle cx="120" cy="6" r="2.5" fill="currentColor" className="text-gold" />
        <path
          d="M108 6c4-4 8-4 12 0s8 4 12 0"
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-gold/80"
        />
      </svg>
    </div>
  )
}