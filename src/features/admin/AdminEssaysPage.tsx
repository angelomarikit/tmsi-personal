import { essaysSeed } from '@/data/essays-seed'
import { getSupabaseClient } from '@/lib/supabase/client'
import { userFacingError } from '@/lib/user-facing-message'
import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

type EssayRow = {
  id: string
  slug: string
  title: string
  published: boolean
}

export function AdminEssaysPage() {
  const [rows, setRows] = useState<EssayRow[]>([])

  async function load() {
    const supabase = getSupabaseClient()
    if (!supabase) return
    const { data } = await supabase.from('essays').select('id, slug, title, published').order('title')
    setRows((data as EssayRow[]) ?? [])
  }

  useEffect(() => {
    void load()
  }, [])

  async function seedFromDefaults() {
    const supabase = getSupabaseClient()
    if (!supabase) return
    const { error } = await supabase.from('essays').upsert(
      essaysSeed.map((e) => ({
        slug: e.slug,
        title: e.title,
        excerpt: e.excerpt,
        category: e.category,
        published_at: e.publishedAt,
        featured: e.featured ?? false,
        published: true,
        body: e.excerpt,
      })),
      { onConflict: 'slug' },
    )
    if (error) toast.error(userFacingError(error))
    else {
      toast.success('Seed essays synced')
      void load()
    }
  }

  async function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const supabase = getSupabaseClient()
    if (!supabase) return
    const data = new FormData(e.currentTarget)
    const title = String(data.get('title') ?? '').trim()
    const slug = String(data.get('slug') ?? '').trim()
    if (!title || !slug) return
    const { error } = await supabase.from('essays').insert({
      title,
      slug,
      excerpt: String(data.get('excerpt') ?? ''),
      category: String(data.get('category') ?? 'Personal Messages'),
      published: true,
      published_at: new Date().toISOString().slice(0, 10),
      body: String(data.get('excerpt') ?? ''),
    })
    if (error) toast.error(userFacingError(error))
    else {
      toast.success('Essay added')
      e.currentTarget.reset()
      void load()
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link to="/admin" className="text-sm text-forest underline">
        ← Dashboard
      </Link>
      <h1 className="font-display mt-4 text-2xl font-semibold text-forest">Manage essays</h1>

      <button
        type="button"
        onClick={() => void seedFromDefaults()}
        className="mt-4 rounded-full border border-gold/40 px-4 py-2 text-sm font-medium text-forest"
      >
        Import seed essays
      </button>

      <form onSubmit={onAdd} className="mt-8 space-y-3 rounded-xl border border-gold/25 bg-white p-5">
        <input name="title" placeholder="Title" required className="w-full rounded-lg border px-3 py-2 text-sm" />
        <input name="slug" placeholder="slug-url" required className="w-full rounded-lg border px-3 py-2 text-sm" />
        <textarea name="excerpt" placeholder="Excerpt" rows={3} className="w-full rounded-lg border px-3 py-2 text-sm" />
        <input name="category" placeholder="Category" className="w-full rounded-lg border px-3 py-2 text-sm" />
        <button type="submit" className="btn-gloss-green rounded-full px-5 py-2 text-sm font-semibold text-white">
          Publish essay
        </button>
      </form>

      <ul className="mt-8 space-y-2 text-sm">
        {rows.map((r) => (
          <li key={r.id} className="flex justify-between rounded-lg border border-gold/15 bg-cream/30 px-4 py-2">
            <span>
              {r.title} <span className="text-xs text-ink/50">/{r.slug}</span>
            </span>
            <span className="text-xs">{r.published ? 'Published' : 'Draft'}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}