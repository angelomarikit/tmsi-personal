import type { LucideIcon } from 'lucide-react'
import {
  BookMarked,
  BookOpen,
  Heart,
  Home,
  Library,
  Mail,
  ScrollText,
  Sun,
  User,
  Users,
} from 'lucide-react'

export type NavItem = {
  label: string
  to: string
  icon: LucideIcon
  match?: (pathname: string) => boolean
}

export const mainNavItems: NavItem[] = [
  { label: 'Home', to: '/', icon: Home, match: (p) => p === '/' },
  { label: 'About Me', to: '/about', icon: User },
  { label: 'My Essays', to: '/essays', icon: ScrollText },
  { label: 'My Books', to: '/books', icon: BookOpen },
  { label: 'Luminarian Philosophy', to: '/philosophy', icon: Sun },
  { label: 'Free Digital Library', to: '/library', icon: Library },
  {
    label: 'TLPS Membership',
    to: '/membership',
    icon: Users,
    match: (p) => p.startsWith('/membership'),
  },
  { label: 'Support My Mission', to: '/support', icon: Heart },
  { label: 'Contact', to: '/contact', icon: Mail },
  { label: 'Member Login', to: '/login', icon: BookMarked },
]