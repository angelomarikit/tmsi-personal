import { HomeSectionCard } from '@/components/institutional/HomeSectionCard'
import { QuickLinkTile } from '@/components/institutional/QuickLinkTile'
import { essaysSeed } from '@/data/essays-seed'
import { siteIdentity } from '@/data/site-content'
import {
  BookMarked,
  BookOpen,
  Flower2,
  Heart,
  Library,
  MessageCircle,
  PenLine,
  UserCircle,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const featuredEssay = essaysSeed.find((e) => e.featured) ?? essaysSeed[0]

const quickLinks = [
  { to: '/essays', label: 'Latest Essays &', sublabel: 'Messages', icon: PenLine },
  { to: '/books', label: 'BECOMING', sublabel: 'My Autobiography', icon: BookOpen, iconClassName: 'text-gold' },
  { to: '/library', label: 'Luminarian', sublabel: 'Digital Library', icon: Library },
  { to: '/membership/apply', label: 'Join TLPS', sublabel: 'Apply Online', icon: Users },
  { to: '/login', label: 'Member Login', sublabel: '(TLPS)', icon: UserCircle },
  { to: '/support', label: 'Support the', sublabel: 'Mission', icon: Heart },
  { to: '/contact', label: 'Contact', sublabel: 'Me', icon: MessageCircle },
] as const

export function HomePage() {
  return (
    <div className="w-full">
      <section className="w-full border-b-2 border-gold bg-ivory leading-none">
        <picture className="block w-full">
          <source
            type="image/jpeg"
            srcSet="/assets/hero/home-hero-band-1024.jpg 1024w, /assets/hero/home-hero-band-1536.jpg 1536w, /assets/hero/home-hero-band-1920.jpg 1920w"
            sizes="100vw"
          />
          <img
            src="/assets/hero/home-hero-band-1920.jpg"
            alt={`${siteIdentity.shortName} — ${siteIdentity.heroQuote}`}
            className="block aspect-[1024/341] h-auto w-full object-contain object-center"
            width={1920}
            height={640}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="sr-only">
          <p>{siteIdentity.heroQuote}</p>
          <p>{siteIdentity.heroQuoteSub}</p>
          <p>{siteIdentity.welcomeBody}</p>
        </div>
      </section>

      <section className="w-full border-b-2 border-gold/55 bg-gradient-to-b from-[#f0e6d0] via-[#ebe3cf] to-[#e3dac4] py-3 sm:py-3.5">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-2 px-2 sm:grid-cols-4 sm:gap-2.5 sm:px-3 lg:grid-cols-7 lg:gap-2 lg:px-4">
          {quickLinks.map((item) => (
            <QuickLinkTile key={item.to + item.label} {...item} />
          ))}
        </div>
      </section>

      <section className="w-full bg-ivory py-6 sm:py-8">
        <div className="grid w-full grid-cols-1 items-stretch gap-3 px-2 sm:grid-cols-3 sm:gap-4 sm:px-3 lg:gap-5 lg:px-4 xl:px-6">
          <HomeSectionCard title="Latest Essays & Reflections" icon={Flower2}>
            <p className="text-xs text-ink/65">
              Published:{' '}
              {new Date(featuredEssay.publishedAt).toLocaleDateString('en-PH', { dateStyle: 'long' })}
            </p>
            <img
              src="/assets/hero/essay-thumb-mock.jpg"
              alt=""
              className="mt-2 h-36 w-full rounded border border-gold/25 object-cover"
            />
            <h3 className="font-display mt-2 text-base font-semibold text-forest">{featuredEssay.title}</h3>
            <p className="mt-1 line-clamp-3 text-sm text-ink/85">{featuredEssay.excerpt}</p>
            <Link
              to={`/essays/${featuredEssay.slug}`}
              className="btn-gloss-green mt-auto inline-flex w-fit rounded-sm px-4 py-2 text-xs font-semibold text-white"
            >
              Read More &gt;
            </Link>
          </HomeSectionCard>

          <HomeSectionCard title="Featured Book" icon={Flower2}>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
              <img
                src="/assets/hero/becoming-cover-mock.jpg"
                alt="BECOMING book cover"
                className="h-40 w-auto max-w-[130px] object-contain shadow-md"
              />
              <div className="text-center sm:text-left">
                <p className="font-display text-2xl font-bold text-forest">BECOMING</p>
                <p className="mt-1 text-xs italic text-ink/80">
                  From a Forgotten Childhood to a Lifetime in Pursuit of Light
                </p>
              </div>
            </div>
            <a
              href="/assets/books/becoming.pdf"
              download
              className="btn-gloss-green mt-auto flex w-full items-center justify-center gap-2 rounded-sm py-2.5 text-sm font-semibold text-white"
            >
              <BookMarked className="h-4 w-4" aria-hidden />
              Download PDF (FREE)
            </a>
          </HomeSectionCard>

          <HomeSectionCard title="Support the Mission of Light" icon={Heart}>
            <p className="text-center text-sm font-medium text-forest">Help Keep Wisdom Free for Everyone</p>
            <img
              src="/assets/payment/metrobank-qr.jpg"
              alt="Metrobank InstaPay QR"
              className="mx-auto mt-3 max-h-40 w-auto"
            />
            <p className="mt-2 text-center text-xs text-ink/80">
              Raul Cardona — Metrobank account ending in 2357
              <br />
              Donate via Metrobank InstaPay / QR Ph
            </p>
          </HomeSectionCard>
        </div>
      </section>
    </div>
  )
}