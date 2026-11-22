import { PersonalFooter } from '@/components/institutional/PersonalFooter'
import { PersonalMasthead } from '@/components/institutional/PersonalMasthead'
import { PersonalNav } from '@/components/institutional/PersonalNav'
import { Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-ivory">
      <PersonalMasthead />
      <PersonalNav />
      <main className="flex min-h-0 w-full flex-1 flex-col [&>*]:w-full">
        <Outlet />
      </main>
      <PersonalFooter />
    </div>
  )
}