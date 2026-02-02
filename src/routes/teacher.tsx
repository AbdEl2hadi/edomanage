import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'
import { Activity } from 'react'
import SideBar from '@/components/side_bar'
import TopNav from '@/components/top_nav'

export const Route = createFileRoute('/teacher')({
  component: Teacher,
  head: () => ({
    meta: [{ title: 'Teacher - EduManage' }],
  }),
})

function Teacher() {
  const location = useLocation()
  const path: Array<string> = [...location.pathname.split('/')]
  const info = {
    layout: 'teacher',
    list: [
      { name: 'Calendar', icon: 'calendar_month' },
      { name: 'Classes', icon: 'class' },
      { name: 'Notifications', icon: 'notifications' },
      { name: 'Settings', icon: 'settings' },
    ],
  }
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-gray-100 h-screen overflow-hidden flex flex-row">
      <SideBar info={info} />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopNav />
        <nav className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 px-6 py-4">
          <span className="capitalize text-slate-450 dark:text-slate-400">
            {path[1]}
          </span>
          <span className="mx-2 text-slate-400 dark:text-slate-600"> &gt;</span>
          <span className={` ${path[3] ? "text-slate-450 dark:text-slate-400" : "text-slate-900 dark:text-white"} capitalize`}>
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
