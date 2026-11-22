import { Link } from 'react-router-dom'

export type SliceHotspot = {
  to: string
  label: string
  left: number
  top: number
  width: number
  height: number
  external?: boolean
}

type ReferenceSliceLinksProps = {
  src: string
  alt: string
  hotspots: SliceHotspot[]
  className?: string
}

/** Reference artwork at full width with invisible click regions (% of image). */
export function ReferenceSliceLinks({ src, alt, hotspots, className }: ReferenceSliceLinksProps) {
  return (
    <section className={className ?? 'relative w-full'}>
      <img src={src} alt={alt} className="block h-auto w-full" draggable={false} />
      <div className="absolute inset-0">
        {hotspots.map((spot) => {
          const style = {
            left: `${spot.left}%`,
            top: `${spot.top}%`,
            width: `${spot.width}%`,
            height: `${spot.height}%`,
          }
          const className =
            'absolute block opacity-0 hover:opacity-5 focus-visible:opacity-15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold'
          if (spot.external) {
            const isPdf = spot.to.endsWith('.pdf')
            return (
              <a
                key={spot.label + spot.to}
                href={spot.to}
                {...(isPdf ? { download: true } : { target: '_blank', rel: 'noreferrer' })}
                aria-label={spot.label}
                className={className}
                style={style}
              />
            )
          }
          return (
            <Link
              key={spot.label + spot.to}
              to={spot.to}
              aria-label={spot.label}
              className={className}
              style={style}
            />
          )
        })}
      </div>
    </section>
  )
}