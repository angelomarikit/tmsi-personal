import { siteIdentity } from '@/data/site-content'
import { Flower2 } from 'lucide-react'
import { Link } from 'react-router-dom'

type FooterProps = {
  mantra?: string
}

export function PersonalFooter({
  mantra = 'Om Hari Om — Aham Tat — Ānanda Shāntih — Aham Brahmāsmi',
}: FooterProps) {
  return (
    <footer className="mt-auto w-full bg-emerald-institutional text-white">
      <div
        className="footer-mantra-strip w-full border-t-2 border-gold/90 px-2 py-4 sm:px-4 sm:py-5 md:px-6"
        role="region"
        aria-label="Mantra"
      >
        <div className="mx-auto flex w-full max-w-[100vw] items-center justify-center gap-2 sm:gap-3 md:gap-4">
          <MantraGlowLine className="hidden sm:flex" />
          <Flower2
            className="footer-mantra-lotus h-7 w-7 shrink-0 text-gold-light sm:h-8 sm:w-8"
            strokeWidth={1.35}
            aria-hidden
          />
          <p className="footer-mantra-text font-serif-body min-w-0 text-center text-[10px] leading-snug font-medium italic text-gold-light sm:text-xs md:text-sm lg:text-base">
            {mantra}
          </p>
          <Flower2
            className="footer-mantra-lotus h-7 w-7 shrink-0 text-gold-light sm:h-8 sm:w-8"
            strokeWidth={1.35}
            aria-hidden
          />
          <MantraGlowLine className="hidden sm:flex" />
        </div>
      </div>

      <div className="border-t border-gold/40 bg-gradient-to-r from-emerald-institutional via-forest to-emerald-institutional px-4 py-3 text-center">
        <p className="font-serif-body text-sm italic text-gold-light">{siteIdentity.motto}</p>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
          <Link to="/contact" className="text-gold-light underline hover:text-white">
            Contact
          </Link>
          <Link to="/membership" className="text-gold-light underline hover:text-white">
            TLPS Membership
          </Link>
          <Link to="/support" className="text-gold-light underline hover:text-white">
            Support
          </Link>
        </p>
        <p className="mt-2 text-[10px] text-white/55">
          © {new Date().getFullYear()} {siteIdentity.shortName}. Developed by Apex Technology Philippines Co.
        </p>
      </div>
    </footer>
  )
}

function MantraGlowLine({ className }: { className?: string }) {
  return <div className={`footer-mantra-glow-line ${className ?? ''}`} aria-hidden />
}