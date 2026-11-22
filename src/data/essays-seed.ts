export type EssaySeed = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  category: string
  featured?: boolean
}

export const essayCategories = [
  'Luminarian Philosophy',
  'Ra-Ul Philosophy',
  'Transcendentalism',
  'Consciousness',
  'Spiritual Reflections',
  'Humanity & Compassion',
  'Natural Health & Vitality',
  'Personal Messages',
]

export const essaysSeed: EssaySeed[] = [
  {
    slug: 'light-within',
    title: 'The Light Within: A Journey of Awakening',
    excerpt:
      'The real journey is not the search for a distant heaven, but the rediscovery of the Divine Light that has always been within us...',
    publishedAt: '2026-11-15',
    category: 'Luminarian Philosophy',
    featured: true,
  },
  {
    slug: 'suffering-to-awakening',
    title: 'From Suffering to Awakening',
    excerpt: 'Pain does not need to be beautified to become meaningful...',
    publishedAt: '2026-11-12',
    category: 'Spiritual Reflections',
  },
  {
    slug: 'ra-ul-relationship',
    title: 'The Ra-Ul Relationship: Source and Manifestation',
    excerpt: 'Ra as the source of luminous being; Ul as its heart in form.',
    publishedAt: '2026-11-05',
    category: 'Ra-Ul Philosophy',
  },
  {
    slug: 'unity-consciousness',
    title: 'The Unity of Life and Consciousness',
    excerpt: 'Consciousness is not confined to the brain alone.',
    publishedAt: '2026-10-29',
    category: 'Consciousness',
  },
  {
    slug: 'balance-uncertainty',
    title: 'Balance in a Time of Uncertainty',
    excerpt: 'Inner steadiness when the world shifts around us.',
    publishedAt: '2026-10-22',
    category: 'Personal Messages',
  },
  {
    slug: 'living-luminarian-way',
    title: 'Living the Luminarian Way',
    excerpt: 'Practice, study, and service woven into daily life.',
    publishedAt: '2026-10-15',
    category: 'Luminarian Philosophy',
  },
]