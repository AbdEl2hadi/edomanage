import { Outlet, createFileRoute } from '@tanstack/react-router'
import SideBar from '@/components/side_bar'
import TopNav from '@/components/top_nav'

export const Route = createFileRoute('/teacher')({
  component: Teacher,
})

function Teacher() {
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
        <Outlet />
      </main>
    </div>
  )
}
