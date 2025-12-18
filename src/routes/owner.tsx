import { Outlet, createFileRoute } from '@tanstack/react-router'

import SideBar from '@/components/side_bar'
import TopNav from '@/components/top_nav'

export const Route = createFileRoute('/owner')({
  component: Owner,
})

function Owner() {
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

  return (
    <div className="relative bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-gray-100 flex flex-row">
      <SideBar info={info} />
      <main className="flex-1 flex flex-col min-h-screen">
        <TopNav />
        <Outlet />
      </main>
    </div>
  )
}
