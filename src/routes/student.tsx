import { createFileRoute, Outlet } from '@tanstack/react-router'
import SideBar from '@/components/side_bar'
import TopNav from '@/components/top_nav'

export const Route = createFileRoute('/student')({
  component: Student,
})

function Student() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-gray-100 h-screen overflow-hidden flex flex-row">
      <SideBar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopNav />
        <Outlet />
      </main>
    </div>
  )
}
