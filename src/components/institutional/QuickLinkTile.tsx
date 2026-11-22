import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

type QuickLinkTileProps = {
  to: string
  label: string
  sublabel?: string
  icon: LucideIcon
  external?: boolean
  iconClassName?: string
  className?: string
}

export function QuickLinkTile({
  to,
  label,
  sublabel,
  icon: Icon,
  external,
  iconClassName,
  className,
}: QuickLinkTileProps) {
  const tileClass = cn(
    'group flex min-h-[76px] items-center gap-2.5 rounded-md border-2 border-[#c9a85c] bg-gradient-to-b from-[#fdf9f0] via-[#f2e8d2] to-[#e5d4b2] px-2.5 py-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.65),0_2px_5px_rgb(0_0_0/0.14)] transition hover:border-gold hover:shadow-md sm:min-h-[82px] sm:gap-3 sm:px-3',
    className,
  )
  const inner = (
    <>
      <Icon
        className={cn('h-9 w-9 shrink-0 sm:h-10 sm:w-10', iconClassName ?? 'text-forest')}
        strokeWidth={1.65}
        aria-hidden
      />
      <span className="font-display text-left text-[10px] font-bold leading-[1.25] text-forest sm:text-[11px]">
        {label}
        {sublabel ? (
          <>
            <br />
            <span className="font-semibold">{sublabel}</span>
          </>
        ) : null}
      </span>
    </>
  )

  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={tileClass}>
        {inner}
      </a>
    )
  }

  return (
    <Link to={to} className={tileClass}>
      {inner}
    </Link>
  )
}