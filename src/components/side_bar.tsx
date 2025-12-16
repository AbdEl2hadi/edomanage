import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import useSideBarListStore from '../services/store/sidebar_list_store'

import useSideBarStore from '../services/store/sidebar_show_store'

export default function SideBar({ info }: { info?: any }) {
  /* navigate variable*/
  const navigate = useNavigate()
  /* List of sidebar items  state*/
  const choosenItem = useSideBarListStore((state) => state.choosenItem)
  const setChoosen = useSideBarListStore((state) => state.setChoosen)

  /* List of sidebar items */
  const baseList = info?.list ;

  const list = useMemo(() => baseList.map((item: any) => {
    const key = item.name.toLowerCase()
    return { ...item, key, active: choosenItem === key }
  }), [baseList, choosenItem])

  /* handle onClick button of the list*/
  const handleClick = useCallback((itemKey: string) => {
    setChoosen(itemKey)
    navigate({ to: `/${info?.layout}/${itemKey}` })
  }, [ info?.layout])
  /* sideBar variable */
  const isOpen = useSideBarStore((state) => state.isOpen)
  const toggleSideBar = useSideBarStore((state) => state.toggle)
  const setOpen = useSideBarStore((state) => state.setOpen)

  // when the screen is resized to large, open the sidebar
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setOpen(true)
      }
    }

    handleChange(media)
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
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
        className={`fixed lg:static inset-y-0 left-0 z-40 flex flex-col justify-between bg-surface-light dark:bg-surface-dark border-r border-[#e7ebf3] dark:border-gray-800 shrink-0 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'translate-x-0 w-72 p-4'
            : '-translate-x-full w-16 lg:w-16 lg:translate-x-0 p-3'
        }`}
      >
        <div className="flex flex-col gap-8 overflow-hidden">
          {/* Brand + toggle */}
          <div className="flex items-center gap-3 px-2">
            <div className="size-8 rounded bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h2
              className={`text-xl font-bold tracking-tight text-[#0d121b] dark:text-white transition-opacity duration-200 ${
                isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'
              }`}
            >
              EduManage
            </h2>
          </div>
          {/* Navigation */}
          <nav className="flex flex-col gap-2" aria-label="Primary">
            <div className="lg:hidden  md:flex items-center gap-2 bg-background-light dark:bg-gray-800 px-3 py-3.5 rounded-lg ">
              <span
                className="material-symbols-outlined text-[#4c669a] translate-y-1"
                style={{ fontSize: '20px' }}
              >
                search
              </span>
              <input
                className="bg-transparent border-none outline-none text-sm w-[calc(100%-40px)] text-[#0d121b] dark:text-white placeholder-[#4c669a] focus:ring-0 ml-2.5"
                placeholder="Search for anything..."
                type="text"
              />
            </div>
            {list.map((item : any) => {
              return (
                <button
                  onClick={() => handleClick(item.key)}
                  key={item.name}
                  className={`flex items-center rounded-lg cursor-pointer ${
                    isOpen ? 'gap-3 px-3 py-2.5' : 'justify-center px-2 py-2'
                  } ${
                    item.active
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-[#4c669a] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group'
                  }`}
                >
                  <span className="material-symbols-outlined group-hover:text-primary transition-colors">
                    {item.icon}
                  </span>
                  {isOpen && (
                    <p className="text-sm font-medium leading-normal group-hover:text-[#0d121b] dark:group-hover:text-white transition-colors">
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
          className={`flex items-center gap-3 rounded-lg border border-[#e7ebf3] dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 transition-all duration-200 ${
            isOpen ? 'p-3' : 'p-2 justify-center'
          }`}
        >
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shadow-sm"
            data-alt="Teacher profile picture showing a smiling man in a blue shirt"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdIX67RoQiiX9CIhZJfqkZQmQ77xnlDEOwuus1m6Y2sXeSs_eBuYEnNDgy9OceDNmSURFW0urj_ZhtthxuPWjj2P_OeGgb43WgqxsFMHKn2sFcqDjHme_CV3bTsHNdr_j7k19V6vOW6eu0Z4grc1dfr9UvK3bEka7irqWBzg8UmgcnbHmBfWmb4xHaj7aS_6coH2xZxuU24DpxC7wiUexpX81ZiA6EHj9mtVyzcBkOQafM6PFCDOSxtTxB2k72sfPUzbRUES2VRB4");',
            }}
          ></div>
          {isOpen && (
            <div className="flex flex-col min-w-0">
              <h1 className="text-[#0d121b] dark:text-white text-sm font-semibold truncate">
                Mr. Anderson
              </h1>
              <p className="text-[#4c669a] text-xs font-normal truncate">
                Science Teacher
              </p>
            </div>
          )}
          <button className="ml-auto text-[#4c669a] hover:text-primary">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '20px' }}
            >
              logout
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}
