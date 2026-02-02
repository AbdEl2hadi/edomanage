import { useEffect } from 'react'

import useWelcomeSideBarStore from '@/services/store/welcome_store'

type WelcomeSideBarProps = {
  onNavigate: (id: string) => void
}

export default function SideBar({ onNavigate }: WelcomeSideBarProps) {
  const isOpen = useWelcomeSideBarStore((state) => state.isOpen)
  const closeSideBar = useWelcomeSideBarStore((state) => state.closeSideBar)

  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  const handleNavigate =
    (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      closeSideBar()
      onNavigate(id)
    }

  return (
    <div
      className={`fixed inset-x-0 top-16 bottom-0 z-40 md:hidden ${
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      style={{ transition: 'visibility 0.2s ease-in-out' }}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Close menu"
        onClick={closeSideBar}
        style={{ transition: 'opacity 0.2s ease-in-out' }}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-background-light dark:bg-background-dark border-l border-slate-200/70 dark:border-white/10 shadow-xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transition: 'transform 0.3s ease-out' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/70 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white">
              school
            </span>
            <p className="text-slate-900 dark:text-white text-base font-bold tracking-tight">
              SchoolManage
            </p>
          </div>
        </div>

        <nav
          className="px-5 py-5 flex flex-col gap-3"
          aria-label="Welcome navigation"
        >
          <a
            className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/10"
            onClick={handleNavigate('features')}
          >
            Features
          </a>
          <a
            className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/10"
            onClick={handleNavigate('roles')}
          >
            Roles
          </a>
          <a
            className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/10"
            onClick={handleNavigate('contact')}
          >
            Contact
          </a>

          <a
            onClick={handleNavigate('roles')}
            className="mt-2 flex items-center justify-center rounded-full h-11 px-6 bg-primary text-white text-sm font-bold hover:brightness-95 cursor-pointer"
          >
            Login
          </a>
        </nav>
      </aside>
    </div>
  )
}
