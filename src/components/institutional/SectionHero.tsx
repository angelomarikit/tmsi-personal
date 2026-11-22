type SectionHeroProps = {
  title: string
  subtitle?: string
  backgroundUrl?: string
  backgroundPosition?: string
  size?: 'default' | 'compact'
}

export function SectionHero({
  title,
  subtitle,
  backgroundUrl = '/assets/hero/section-mountain-sunrise.jpg',
  backgroundPosition = 'center',
  size = 'default',
}: SectionHeroProps) {
  const padding = size === 'compact' ? 'py-8 sm:py-10' : 'py-10 sm:py-14'

  return (
    <section className={`relative border-b-2 border-gold/50 ${padding}`}>
      <img
        src={backgroundUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: backgroundPosition }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-emerald-institutional/92 via-forest/88 to-emerald-institutional/94"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 text-center sm:px-6">
        <h1 className="font-display text-[clamp(1.65rem,4vw,2.5rem)] font-semibold tracking-wide text-gold drop-shadow-sm">
          {title}
        </h1>
        {subtitle ? (
          <p className="font-serif-body mx-auto mt-2.5 max-w-2xl text-[clamp(0.95rem,2vw,1.125rem)] italic text-white/95">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  )
}