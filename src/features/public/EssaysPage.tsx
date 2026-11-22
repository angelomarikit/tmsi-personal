import { SectionHero } from '@/components/institutional/SectionHero'
import { essayCategories } from '@/data/essays-seed'
import { usePublishedEssays } from '@/hooks/usePublishedEssays'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export function EssaysPage() {
  const essays = usePublishedEssays()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const featured = essays.find((e) => e.featured) ?? essays[0]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return essays.filter((e) => {
      const matchesCategory = !category || e.category === category
      if (!matchesCategory) return false
      if (!q) return true
      return (
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.excerpt.toLowerCase().includes(q)
      )
    })
  }, [essays, query, category])

  const recentEssays = useMemo(
    () => [...essays].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 6),
    [essays],
  )

  return (
    <>
      <SectionHero
        title="My Essays & Messages"
        subtitle="Weekly reflections on life, consciousness, Ra-Ul Philosophy, and the human journey."
        backgroundUrl="/assets/hero/section-mountain-sunrise.jpg"
        backgroundPosition="center 40%"
        size="compact"
      />

      <div className="w-full bg-ivory">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(220px,260px)_1fr_minmax(240px,300px)] lg:gap-10">
            <aside className="rounded-2xl border-2 border-gold/45 bg-white p-5 shadow-[0_4px_18px_rgb(0_0_0/0.08)] sm:p-6 lg:sticky lg:top-4">
              <h2 className="font-display border-b border-gold/35 pb-2 text-lg font-semibold text-forest">
                Categories
              </h2>
              <ul className="mt-3 space-y-0.5">
                <li>
                  <button
                    type="button"
                    onClick={() => setCategory(null)}
                    className={cn(
                      'w-full rounded-md px-2 py-1.5 text-left text-sm transition',
                      category === null
                        ? 'bg-forest/10 font-semibold text-forest'
                        : 'text-ink/85 hover:bg-cream hover:text-forest',
                    )}
                  >
                    All essays
                  </button>
                </li>
                {essayCategories.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => setCategory(c)}
                      className={cn(
                        'w-full rounded-md px-2 py-1.5 text-left text-sm transition',
                        category === c
                          ? 'bg-forest/10 font-semibold text-forest'
                          : 'text-ink/85 hover:bg-cream hover:text-forest',
                      )}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="min-w-0 space-y-6">
              {featured ? (
                <article className="rounded-2xl border-2 border-gold/45 bg-gradient-to-b from-[#f9f5eb] via-cream to-[#f3ebdb] p-6 shadow-[0_4px_18px_rgb(0_0_0/0.07)] sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wide text-forest/80">
                    Featured Essay (This Week)
                  </p>
                  <p className="mt-1 text-sm text-ink/70">
                    {new Date(featured.publishedAt).toLocaleDateString('en-PH', { dateStyle: 'long' })}
                  </p>
                  <h2 className="font-display mt-3 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold leading-snug text-forest">
                    {featured.title}
                  </h2>
                  <p className="font-serif-body mt-3 text-[0.9375rem] leading-relaxed text-ink/90">
                    {featured.excerpt}
                  </p>
                  <Link
                    to={`/essays/${featured.slug}`}
                    className="btn-gloss-green mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Read full essay →
                  </Link>
                </article>
              ) : null}

              <form
                className="flex flex-col gap-2 sm:flex-row sm:items-stretch"
                onSubmit={(e) => e.preventDefault()}
                role="search"
              >
                <label className="sr-only" htmlFor="essay-search">
                  Search essays
                </label>
                <input
                  id="essay-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search essays (consciousness, Ra-Ul, vitality…)"
                  className="min-h-[44px] flex-1 rounded-xl border-2 border-gold/35 bg-gradient-to-b from-white to-cream px-4 py-2.5 text-sm text-ink shadow-inner outline-none placeholder:text-ink/45 focus:border-gold/60"
                />
                <button
                  type="submit"
                  className="btn-gloss-green inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white sm:min-w-[110px]"
                >
                  <Search className="h-4 w-4" aria-hidden />
                  Search
                </button>
              </form>

              {category || query.trim() ? (
                <div className="rounded-xl border border-gold/30 bg-white/80 px-4 py-3 text-sm text-ink/80">
                  {filtered.length} essay{filtered.length === 1 ? '' : 's'} match your filters.
                </div>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-4">
              <h2 className="font-display border-b border-gold/35 pb-2 text-lg font-semibold text-forest">
                Recent essays
              </h2>
              <ul className="mt-4 space-y-3">
                {recentEssays.map((e) => (
                  <li
                    key={e.slug}
                    className="rounded-xl border-2 border-gold/30 bg-white p-3.5 shadow-[0_2px_10px_rgb(0_0_0/0.06)] transition hover:border-gold/50 hover:shadow-md"
                  >
                    <Link
                      to={`/essays/${e.slug}`}
                      className="font-display text-sm font-semibold leading-snug text-forest hover:underline"
                    >
                      {e.title}
                    </Link>
                    <p className="mt-1.5 text-xs text-ink/60">
                      {new Date(e.publishedAt).toLocaleDateString('en-PH', { dateStyle: 'medium' })}
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}