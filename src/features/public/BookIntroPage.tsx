import { SectionHero } from '@/components/institutional/SectionHero'
import { Link } from 'react-router-dom'

const introExcerpt = `There are rooms we leave, and rooms that never quite release us. I have lived in many places, crossed roads I could not have imagined as a boy, and met people whose names now form part of the long geography of my life. Yet when I look backward, two hospital rooms stand across the years from one another like opposing shores.

In the first, I was a child. My mother was the patient. I knew her not as a diagnosis or a medical history but as the familiar center of my small world...`

export function BookIntroPage() {
  return (
    <>
      <SectionHero title="BECOMING — Prologue" />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="font-serif-body text-base leading-relaxed text-ink/90">{introExcerpt}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/assets/books/becoming.pdf"
            download
            className="btn-gloss-green rounded-full px-6 py-2.5 text-sm font-semibold text-white"
          >
            Download full PDF
          </a>
          <Link to="/books" className="text-sm font-semibold text-forest underline">
            ← Back to books
          </Link>
        </div>
      </article>
    </>
  )
}