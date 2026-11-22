import { mainNavItems } from '@/components/institutional/personal-nav-items'
import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'

export function PersonalNav() {
  const { pathname } = useLocation()
  const navItems = mainNavItems.filter((item) => item.label !== 'Member Login')

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.match) return item.match(pathname)
    return pathname === item.to
  }

  return (
    <nav
      className="institutional-nav w-full border-b-2 border-gold shadow-[0_2px_8px_rgba(0,0,0,0.22)]"
      aria-label="Primary"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <ul className="flex items-stretch justify-start gap-0 overflow-x-auto scrollbar-thin sm:justify-center sm:overflow-x-visible">
          {navItems.map((item) => {
            const active = isActive(item)
            const Icon = item.icon
            return (
              <li key={item.to} className="flex shrink-0 border-r border-gold/45 last:border-r-0">
                <Link
                  to={item.to}
                  className={cn(
                    'flex min-h-[52px] min-w-[max(7.5rem,9vw)] items-center justify-center gap-1.5 px-2 py-2 text-[11px] font-semibold leading-tight transition-colors sm:min-w-0 sm:px-2.5 sm:text-xs lg:gap-2 lg:px-3 lg:text-[13px]',
                    active
                      ? 'btn-gloss-gold text-ink shadow-inner'
                      : 'text-white hover:bg-white/10',
                  )}
                >
                  <Icon
                    className={cn('h-4 w-4 shrink-0', active ? 'text-ink' : 'text-gold-light')}
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  <span className="whitespace-nowrap text-center">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}