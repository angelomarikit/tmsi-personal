import { SectionHero } from '@/components/institutional/SectionHero'
import { siteIdentity } from '@/data/site-content'
import { ExternalLink, Library } from 'lucide-react'

export function LibraryPage() {
  return (
    <>
      <SectionHero
        title="Free Digital Library"
        subtitle="Writings, course materials, and resources for seekers of light"
      />
      <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
        <Library className="mx-auto h-12 w-12 text-forest" aria-hidden />
        <p className="mt-4 text-sm leading-relaxed text-ink/90">
          The full free digital library — including LEAP course e-books and institutional
          publications — is hosted at TMSI–Luminarian Academy of Philosophical Studies (TMSI-LAPS).
        </p>
        <a
          href={siteIdentity.tmsiLibraryUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-gloss-green mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          Open TMSI-LAPS Free Digital Library
        </a>
        <p className="mt-6 text-xs text-ink/65">
          On this personal site, <strong>BECOMING</strong> is available now from the{' '}
          <a href="/books" className="text-forest underline">
            My Books
          </a>{' '}
          page.
        </p>
      </div>
    </>
  )
}