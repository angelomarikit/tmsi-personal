import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type HomeSectionCardProps = {
  title: string
  icon: LucideIcon
  children: ReactNode
}

export function HomeSectionCard({ title, icon: Icon, children }: HomeSectionCardProps) {
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-lg border-2 border-gold/45 bg-ivory shadow-md">
      <div className="flex items-center gap-2 border-b border-gold/40 bg-gradient-to-r from-emerald-institutional via-forest to-emerald-institutional px-4 py-2.5">
        <Icon className="h-5 w-5 shrink-0 text-gold-light" strokeWidth={2} aria-hidden />
        <h2 className="font-display text-base font-semibold tracking-wide text-gold-light sm:text-lg">
          {title}
        </h2>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">{children}</div>
    </article>
  )
}