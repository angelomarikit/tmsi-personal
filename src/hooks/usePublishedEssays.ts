import { essaysSeed, type EssaySeed } from '@/data/essays-seed'
import { fetchPublishedEssays } from '@/lib/supabase/queries'
import { useEffect, useState } from 'react'

export function usePublishedEssays(): EssaySeed[] {
  const [essays, setEssays] = useState<EssaySeed[]>(essaysSeed)

  useEffect(() => {
    let cancelled = false
    void fetchPublishedEssays().then((remote) => {
      if (!cancelled && remote && remote.length > 0) {
        setEssays(
          remote.map((r) => ({
            slug: r.slug,
            title: r.title,
            excerpt: r.excerpt ?? '',
            publishedAt: r.published_at ?? new Date().toISOString().slice(0, 10),
            category: r.category ?? 'Personal Messages',
            featured: r.featured ?? false,
          })),
        )
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return essays
}