import { useCallback, useLayoutEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import Avatar from '@mui/material/Avatar'
import useSideBarListStore from '../services/store/sidebar_list_store'

import useSideBarStore from '../services/store/sidebar_show_store'
import useAvatarStore from '../services/store/avatar_store'

export default function SideBar({ info }: { info?: any }) {
  /* import avatar state */
  const avatarSrc = useAvatarStore((state) => state.avatarSrc)
  /* navigate variable*/
  const navigate = useNavigate()
  const localPath = useLocation().pathname.split('/')[1]
  /* List of sidebar items  state*/
  const choosenItem = useSideBarListStore((state) => state.choosenItem)
  const setChoosen = useSideBarListStore((state) => state.setChoosen)

  /* List of sidebar items */
  const baseList = info?.list

  const list = useMemo(
    () =>
      baseList.map((item: any) => {
        const key = item.name.toLowerCase()
        return { ...item, key, active: choosenItem === key }
      }),
    [baseList, choosenItem],
  )

  /* handle onClick button of the list*/
  const handleClick = useCallback(
    (itemKey: string) => {
      setChoosen(itemKey)
      navigate({ to: `/${info?.layout}/${itemKey}` })
    },
    [info?.layout],
  )
  /* sideBar variable */
  const isOpen = useSideBarStore((state) => state.isOpen)
  const toggleSideBar = useSideBarStore((state) => state.toggle)
  const setOpen = useSideBarStore((state) => state.setOpen)

  // keep sidebar open on desktop (>=1024px) and closed on mobile
  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleChange = () => setOpen(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <>
      {/* Mobile backdrop to close the drawer */}
      {isOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={toggleSideBar}
        ></button>
      )}
      <aside
        aria-expanded={isOpen}
        className={`fixed lg:static inset-y-0 left-0 z-40 flex flex-col justify-between bg-surface-light dark:bg-surface-dark border-r border-slate-200/80 dark:border-slate-800 shrink-0 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'translate-x-0 w-72 p-4'
            : '-translate-x-full w-16 lg:w-72 lg:translate-x-0 p-3'
        }`}
      >
        <div className="flex flex-col gap-8 overflow-hidden">
          {/* Brand + toggle */}
          <div className="flex items-center gap-3 px-2">
            <div className="size-8 rounded bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h2
              className={`text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 transition-opacity duration-200 ${
                isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'
              }`}
            >
              EduManage
            </h2>
          </div>
          {/* Navigation */}
          <nav className="flex flex-col gap-2" aria-label="Primary">
            <div className="lg:hidden  md:flex items-center gap-2 bg-background-light/80 dark:bg-gray-800/60 px-3 py-3.5 rounded-lg ring-1 ring-slate-200/70 dark:ring-slate-700/50">
              <span
                className="material-symbols-outlined text-slate-500 dark:text-slate-400 translate-y-1"
                style={{ fontSize: '20px' }}
              >
                search
              </span>
              <input
                className="bg-transparent border-none outline-none text-sm w-[calc(100%-40px)] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 ml-2.5"
                placeholder="Search for anything..."
                type="text"
              />
            </div>
            {list.map((item: any) => {
              return (
                <button
                  onClick={() => {
                    handleClick(item.key)
                    if (!window.matchMedia('(min-width: 1024px)').matches) {
                      setOpen(false)
                    }
                  }}
                  key={item.name}
                  className={`flex items-center rounded-lg cursor-pointer ${
                    isOpen ? 'gap-3 px-3 py-2.5' : 'justify-center px-2 py-2'
                  } ${
                    item.active
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors group'
                  }`}
                >
                  <span className="material-symbols-outlined group-hover:text-primary transition-colors">
                    {item.icon}
                  </span>
                  {isOpen && (
                    <p className="text-sm font-medium leading-normal group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                      {item.name}
                    </p>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
        {/* User Profile */}
        <div
          className={`flex items-center gap-3 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 transition-all duration-200 ${
            isOpen ? 'p-3' : 'p-2 justify-center'
          }`}
        >
          <Link
            onClick={() => {
              if (!window.matchMedia('(min-width: 1024px)').matches) {
                setOpen(false)
              }
              setChoosen('settings')
            }}
            to={`/${localPath}/settings` as any}
          >
            <Avatar alt="profile picture" src={avatarSrc} />
          </Link>
          {isOpen && (
            <>
              <div className="flex flex-col min-w-0">
                <h1 className="text-slate-900 dark:text-slate-100 text-sm font-semibold truncate">
                  Mr. Anderson
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-normal truncate">
                  Science Teacher
                </p>
              </div>
              <button className="ml-auto text-slate-500 dark:text-slate-400 hover:text-primary cursor-pointer transition-colors">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '20px' }}
                >
                  logout
                </span>
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  )
}
