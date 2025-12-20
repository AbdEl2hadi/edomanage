import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'

import SideBar from '@/components/side_bar'
import TopNav from '@/components/top_nav'

export const Route = createFileRoute('/owner')({
  component: Owner,
})

const info = {
  layout: 'owner',
  list: [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Teachers', icon: 'class' },
    { name: 'Students', icon: 'group' },
    { name: 'Announcements', icon: 'announcement' },
    { name: 'Payments', icon: 'payment' },
    { name: 'Settings', icon: 'settings' },
  ],
}

function Owner() {
  const location = useLocation()
  const path: Array<string> = [...location.pathname.split('/')]

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-gray-100 h-screen overflow-hidden flex flex-row">
      <SideBar info={info} />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopNav />
        <nav className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 px-6 py-4">
          <span className="capitalize text-slate-450 dark:text-slate-400">
            {path[1]}
          </span>
          <span className="mx-2 text-slate-400 dark:text-slate-600">/</span>
          <span className="text-slate-900 dark:text-white capitalize">
            {path[2]}
          </span>
        </nav>
        <Outlet />
      </main>
    </div>
  )
}
