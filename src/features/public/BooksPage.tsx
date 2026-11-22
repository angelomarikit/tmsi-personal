import { SectionHero } from '@/components/institutional/SectionHero'
import { otherBooks, siteIdentity } from '@/data/site-content'
import { BookOpen, Download, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

export function BooksPage() {
  return (
    <>
      <SectionHero
        title="My Books & Publications"
        subtitle="Knowledge is light — wisdom is for everyone"
        backgroundUrl="/assets/hero/section-mountain-sunrise.jpg"
        backgroundPosition="center 35%"
        size="compact"
      />

      <div className="w-full bg-ivory">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_minmax(260px,320px)] lg:gap-10">
            <article className="overflow-hidden rounded-2xl border-2 border-gold/45 bg-white shadow-[0_6px_24px_rgb(0_0_0/0.08)]">
              <div className="grid gap-6 p-6 sm:grid-cols-[minmax(140px,200px)_1fr] sm:gap-8 sm:p-8">
                <figure className="mx-auto w-full max-w-[200px] sm:mx-0">
                  <div className="overflow-hidden rounded-xl border-2 border-gold/40 shadow-md">
                    <img
                      src="/assets/hero/about-portrait-ceremonial.jpg"
                      alt=""
                      className="aspect-[3/4] w-full object-cover object-top"
                      width={780}
                      height={1024}
                    />
                  </div>
                </figure>
                <div className="min-w-0">
                  <h2 className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-wide text-forest">
                    BECOMING
                  </h2>
                  <p className="font-serif-body mt-1.5 text-sm italic text-ink/85 sm:text-base">
                    From a Forgotten Childhood to a Lifetime in Pursuit of Light
                  </p>
                  <div
                    className="my-4 h-px w-full max-w-md bg-gradient-to-r from-gold/60 via-gold/30 to-transparent"
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-ink/90">
                    An autobiography in literary prose by {siteIdentity.displayName}. Copyright © 2026
                    — first edition, Philippines.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href="/assets/books/becoming.pdf"
                      download
                      className="btn-gloss-green inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      <Download className="h-4 w-4 shrink-0" aria-hidden />
                      Download PDF (Free)
                    </a>
                    <Link
                      to="/books/intro"
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold/50 bg-gradient-to-b from-[#faf6eb] to-cream px-5 py-2.5 text-sm font-semibold text-forest transition hover:border-gold"
                    >
                      <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
                      Read Introduction
                    </Link>
                    <button
                      type="button"
                      disabled
                      title="Coming soon"
                      className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border-2 border-gold/25 bg-ivory/50 px-5 py-2.5 text-sm font-medium text-ink/45"
                    >
                      <Play className="h-4 w-4 shrink-0" aria-hidden />
                      Watch Book Presentation
                    </button>
                  </div>
                </div>
              </div>
            </article>

            <aside className="rounded-2xl border-2 border-gold/45 bg-gradient-to-b from-[#f9f5eb] via-cream to-[#efe6d6] p-5 shadow-[0_4px_18px_rgb(0_0_0/0.08)] sm:p-6">
              <h3 className="font-display border-b border-gold/35 pb-2 text-lg font-semibold text-forest">
                Other Publications
              </h3>
              <ul className="mt-4 divide-y divide-gold/25">
                {otherBooks.map((b) => (
                  <li key={b.title} className="py-4 first:pt-0 last:pb-0">
                    <p className="text-sm font-semibold text-forest">{b.title}</p>
                    <p className="mt-0.5 text-xs italic text-ink/75">{b.subtitle}</p>
                    <p className="mt-2 text-[11px] font-medium text-ink/45">Download PDF (coming soon)</p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="btn-gloss-green mt-10 rounded-xl border border-gold/40 px-6 py-5 text-center shadow-md sm:py-6">
            <p className="text-sm font-semibold text-white">More writings &amp; e-books</p>
            <a
              href={siteIdentity.tmsiLibraryUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block font-display text-base font-medium text-gold-light underline-offset-2 hover:underline"
            >
              Visit the TMSI-LAPS Free Digital Library →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}