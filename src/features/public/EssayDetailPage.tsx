import { SectionHero } from '@/components/institutional/SectionHero'
import { usePublishedEssays } from '@/hooks/usePublishedEssays'
import { Link, useParams } from 'react-router-dom'

export function EssayDetailPage() {
  const { slug } = useParams()
  const essays = usePublishedEssays()
  const essay = essays.find((e) => e.slug === slug)

  if (!essay) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p>Essay not found.</p>
        <Link to="/essays" className="mt-4 inline-block text-forest underline">
          Back to essays
        </Link>
      </div>
    )
  }

  return (
    <>
      <SectionHero title={essay.title} />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-sm text-ink/60">
          {essay.category} ·{' '}
          {new Date(essay.publishedAt).toLocaleDateString('en-PH', { dateStyle: 'long' })}
        </p>
        <p className="mt-6 text-base leading-relaxed text-ink/90">{essay.excerpt}</p>
        <p className="mt-6 text-sm text-ink/70">
          Full essay body will be managed from the admin portal. This preview uses seed content until
          published in Supabase.
        </p>
        <Link to="/essays" className="mt-8 inline-block text-sm font-semibold text-forest underline">
          ← All essays
        </Link>
      </article>
    </>
  )
}