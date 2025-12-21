import { useEffect, useRef, useState } from 'react'
import useSideBarStore from '../services/store/sidebar_show_store'
import NotificationList from './notificationList'

export default function TopNav() {
  const getPreferredTheme = () => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const initial = getPreferredTheme()
      const html = document.documentElement
      html.classList.remove('light', 'dark')
      html.classList.add(initial)
    
    return initial
  })

  const themeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }

    media.addEventListener('change', handleMediaChange)
    return () => media.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const html = document.documentElement
    html.classList.add('theme-animating')
    html.classList.remove('light', 'dark')
    html.classList.add(theme)
    localStorage.setItem('theme', theme)

    if (themeTimeoutRef.current !== null) {
      window.clearTimeout(themeTimeoutRef.current)
    }

    themeTimeoutRef.current = window.setTimeout(() => {
      html.classList.remove('theme-animating')
      themeTimeoutRef.current = null
    }, 300)

    return () => {
      if (themeTimeoutRef.current !== null) {
        window.clearTimeout(themeTimeoutRef.current)
        themeTimeoutRef.current = null
      }
      html.classList.remove('theme-animating')
    }
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  const toggleSideBar = useSideBarStore((state) => state.toggle)
  return (
    <header className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-surface-light dark:bg-surface-dark px-6 py-5 shrink-0 transition-colors duration-300">
      {/* Mobile Menu Toggle (Visible only on small screens) */}
      <button
        className="mr-6 mt-1.5 lg:hidden text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white cursor-pointer transition-colors"
        onClick={toggleSideBar}
      >
        <span className="material-symbols-outlined">
          menu
        </span>
      </button>
      {/* Search Bar */}
      <div className="hidden w-96 lg:flex items-center gap-2 bg-background-light/80 dark:bg-gray-800/60 px-3 py-3.5 rounded-lg ring-1 ring-slate-200/70 dark:ring-slate-700/50">
        <span
          className="material-symbols-outlined text-slate-500 dark:text-slate-400"
          style={{ fontSize: '20px' }}
        >
          search
        </span>
        <input
          className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0"
          placeholder="Search for anything..."
          type="text"
        />
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <button
          aria-label="Toggle dark mode"
          aria-pressed={theme === 'dark'}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/70 hover:bg-slate-200/80 dark:hover:bg-slate-700/70 text-slate-600 dark:text-slate-300 transition-all border border-slate-200/80 dark:border-slate-700/70 cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <span className="material-symbols-outlined text-[18px]">
              light_mode
            </span>
          ) : (
            <span className="material-symbols-outlined text-[18px]">
              dark_mode
            </span>
          )}
          <span className="text-xs font-semibold hidden sm:block">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
        <div className="relative group">
          <NotificationList />
        </div>
      </div>
    </header>
  )
}
