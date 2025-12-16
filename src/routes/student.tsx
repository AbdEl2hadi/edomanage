import { Outlet, createFileRoute, useMatchRoute } from '@tanstack/react-router'
import SideBar from '@/components/side_bar'
import TopNav from '@/components/top_nav'

export const Route = createFileRoute('/student')({
  component: Student,
})

function Student() {
  const matchRoute = useMatchRoute()

  const hideTopNav = Boolean(matchRoute({ to: '/student/notifications' }))
  const info = {
    layout: 'student',
    list: [
      { name: 'Calendar', icon: 'calendar_month' },
      { name: 'Courses', icon: 'menu_book' },
      { name: 'Notifications', icon: 'notifications' },
      { name: 'Settings', icon: 'settings' },
    ],
  }
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-gray-100 h-screen overflow-hidden flex flex-row">
      <SideBar info={info} />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* <TopNav /> */}
        {!hideTopNav && <TopNav />}
        <Outlet />
      </main>
    </div>
  )
}
