import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'

import { Activity } from 'react'
import SideBar from '@/components/side_bar'
import TopNav from '@/components/top_nav'
import { Toaster } from '@/components/ui/sonner'

export const Route = createFileRoute('/owner')({
  component: Owner,
  head: () => ({
    meta: [
      {
        title: 'Owner - EduManage',
      },
    ],
  }),
})

const info = {
  layout: 'owner',
  list: [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Calendar', icon: 'calendar_month' },
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
      <Toaster position="top-center" />
      
      <SideBar info={info} />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopNav />
        <nav className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 px-6 pt-3 mb-1.5">
          <span className="capitalize text-slate-450 dark:text-slate-400">
            {path[1]}
          </span>
          <span className="mx-2 text-slate-400 dark:text-slate-600">/</span>
          <span className="text-slate-900 dark:text-white capitalize">
            {path[2]}
          </span>
          <Activity mode={path[3] ? 'visible' : 'hidden'}>
            <span className="mx-2 text-slate-400 dark:text-slate-600">
              &gt;
            </span>
            <span className="text-slate-900 dark:text-white capitalize">
              {path[3]}
            </span>
          </Activity>
        </nav>
        <Outlet />
      </main>
    </div>
  )
}
