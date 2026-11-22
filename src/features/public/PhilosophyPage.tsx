import { SectionHero } from '@/components/institutional/SectionHero'
import { coreTeachings, philosophyTeachings } from '@/data/site-content'
import { BookOpen, Download, Play } from 'lucide-react'

export function PhilosophyPage() {
  return (
    <>
      <SectionHero
        title="The Luminarian Philosophy"
        subtitle="A philosophy of light, consciousness, and the unity of all life"
      />
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="rounded-xl border border-gold/30 bg-forest text-white">
            <h2 className="border-b border-gold/30 px-4 py-3 font-display text-lg font-semibold text-gold">
              Philosophical Teachings
            </h2>
            <ul className="space-y-1 p-3 text-sm">
              {philosophyTeachings.map((t) => (
                <li key={t.slug} className="rounded-lg px-2 py-2 hover:bg-white/10">
                  <span className="mr-2" aria-hidden>
                    {t.icon}
                  </span>
                  {t.title}
                </li>
              ))}
            </ul>
          </aside>

          <div>
            <p className="text-sm leading-relaxed text-ink/90">
              The Luminarian Philosophy affirms that Divine Light is the fabric of existence — that
              consciousness, compassion, and service arise when the inner self awakens to unity with
              all life.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {coreTeachings.map((t) => (
                <article
                  key={t.title}
                  className="rounded-xl border border-gold/25 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-display text-lg font-semibold text-forest">{t.title}</h3>
                  <p className="mt-2 text-sm text-ink/85">{t.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-gloss-green inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                Read the Full Teachings
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-forest"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download Selected Articles (PDF)
              </button>
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-2.5 text-sm text-ink/40"
              >
                <Play className="h-4 w-4" aria-hidden />
                Watch Video Teachings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}