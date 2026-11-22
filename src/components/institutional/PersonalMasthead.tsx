import { siteIdentity } from '@/data/site-content'

/** Header background: `public/assets/hero/masthead-banner.png` (client artwork). */
export function PersonalMasthead() {
  return (
    <header className="relative w-full overflow-hidden border-b-2 border-gold bg-emerald-institutional">
      <div className="relative aspect-[1024/129] w-full min-h-[100px] sm:min-h-[115px] lg:min-h-[128px]">
        <picture className="absolute inset-0">
          <source
            type="image/png"
            srcSet="/assets/hero/masthead-banner.png 1024w, /assets/hero/masthead-banner-1536.png 1536w"
            sizes="100vw"
          />
          <img
            src="/assets/hero/masthead-banner-1536.png"
            alt=""
            className="h-full w-full object-cover object-center"
            width={1536}
            height={194}
            decoding="async"
            aria-hidden
          />
        </picture>

        <div className="absolute inset-0 flex items-center justify-center px-[17%] sm:px-[19%] md:px-[21%] lg:px-[23%]">
          <div className="pointer-events-none max-w-3xl text-center">
            <h1 className="font-display text-[clamp(1.15rem,2.85vw,2.35rem)] font-semibold leading-tight text-[#d4b76a] drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              {siteIdentity.namePrimary}
            </h1>
            <p className="font-display mt-0.5 text-[clamp(1rem,2.2vw,1.65rem)] font-medium text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
              {siteIdentity.nameSecondary}
            </p>
            <p className="mt-0.5 text-[clamp(0.62rem,1.1vw,0.88rem)] italic text-white/95">
              {siteIdentity.rolesLine}
            </p>
            <p className="mt-0.5 text-[clamp(0.55rem,0.95vw,0.75rem)] leading-snug text-white/92">
              {siteIdentity.tagline}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}