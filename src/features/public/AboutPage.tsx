import { SectionHero } from '@/components/institutional/SectionHero'
import { Timeline } from '@/components/institutional/Timeline'
import { aboutBio, milestones, siteIdentity } from '@/data/site-content'

export function AboutPage() {
  return (
    <>
      <SectionHero
        title="About Me — My Life Journey"
        subtitle="Knowledge, compassion, and lifelong pursuit of light"
        backgroundUrl="/assets/hero/section-mountain-sunrise.jpg"
        backgroundPosition="center 40%"
        size="compact"
      />

      <div className="w-full bg-ivory">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(240px,300px)_1fr_minmax(260px,320px)] lg:gap-10">
            <figure className="mx-auto w-full max-w-[300px] lg:mx-0">
              <div className="overflow-hidden rounded-2xl border-2 border-gold/55 bg-cream shadow-[0_8px_28px_rgb(0_0_0/0.12)]">
                <img
                  src="/assets/hero/about-portrait-ceremonial.jpg"
                  alt={siteIdentity.displayName}
                  className="aspect-[3/4] w-full object-cover object-top"
                  width={780}
                  height={1024}
                />
              </div>
            </figure>

            <article className="min-w-0">
              <h2 className="font-display text-[clamp(1.35rem,2.5vw,1.875rem)] font-semibold leading-snug text-forest">
                {siteIdentity.displayName}
              </h2>
              <p className="mt-1.5 font-display text-base font-semibold tracking-wide text-gold sm:text-lg">
                {aboutBio.degrees}
              </p>
              <p className="mt-1 text-sm font-medium text-ink/80">{aboutBio.descriptors}</p>
              <div
                className="my-5 h-px w-full max-w-md bg-gradient-to-r from-transparent via-gold/70 to-transparent"
                aria-hidden
              />
              <div className="space-y-4">
                {aboutBio.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="font-serif-body text-[0.9375rem] leading-[1.75] text-ink/90">
                    {p}
                  </p>
                ))}
              </div>
            </article>

            <aside className="rounded-2xl border-2 border-gold/45 bg-gradient-to-b from-[#f9f5eb] via-cream to-[#efe6d6] p-5 shadow-[0_4px_18px_rgb(0_0_0/0.08)] sm:p-6">
              <h3 className="font-display border-b border-gold/35 pb-2 text-lg font-semibold text-forest">
                At a Glance
              </h3>
              <dl className="mt-4 space-y-3.5 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-forest/85">Date of birth</dt>
                  <dd className="mt-0.5 text-ink/90">{aboutBio.atGlance.dateOfBirth}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-forest/85">Place of birth</dt>
                  <dd className="mt-0.5 text-ink/90">{aboutBio.atGlance.placeOfBirth}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-forest/85">Residence</dt>
                  <dd className="mt-0.5 text-ink/90">{aboutBio.atGlance.residence}</dd>
                </div>
              </dl>
              <h4 className="mt-5 text-xs font-semibold uppercase tracking-wide text-forest/85">Key roles</h4>
              <ul className="mt-2.5 space-y-1.5 text-sm leading-snug text-ink/88">
                {aboutBio.atGlance.roles.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <p className="font-display mt-5 border-t border-gold/30 pt-4 text-center text-sm font-semibold italic text-forest">
                {aboutBio.atGlance.salutation}
              </p>
            </aside>
          </div>

          <section className="mt-14 border-t border-gold/35 pt-10 sm:mt-16">
            <h2 className="font-display text-center text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold text-forest">
              Key Milestones in My Journey
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-ink/70">
              Landmarks along the path of learning, service, and awakening
            </p>
            <div className="mt-8">
              <Timeline items={milestones} />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}