import { memo, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'

import Loading from './loading'
import useSideBarListStore from '@/services/store/sidebar_list_store'
import useGetNotPanel from '@/services/api/getNotification'

function NotificationList() {
  /* to know current location*/
  const location = useLocation()
  const currentPath = location.pathname.split('/')[1]

  /* notification show*/
  const [isOpen, setIsOpen] = useState(false)
  const setChoosen = useSideBarListStore((state) => state.setChoosen)

  /* sync with outside click */
  const containerRef = useRef<HTMLDivElement>(null)

  const Logo = [
    {
      type: 'campaign',
      style: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      type: 'warning',
      style:
        'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    },
    {
      type: 'check_circle',
      style:
        ' bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      type: 'school',
      style:
        'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
  ]

  /* get notifications from React Query */
  const { data: notifications = [], isLoading } = useGetNotPanel()
  const queryClient = useQueryClient()

  /* clear notifications */

  const clearNotifications = () => {
    queryClient.setQueryData(['notifications'], [])
  }

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!isOpen) return
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  /* mark as read for notification icon*/

  const [isRead, setIsRead] = useState(false)
  const countRef = useRef(0)
  useEffect(() => {
    if (notifications.length > 0) {
      const currentCount = notifications.length
      if (currentCount > countRef.current) {
        setIsRead(false)
      }
      countRef.current = currentCount
    } else if (notifications.length === 0) {
      setIsRead(true)
    }
  }, [notifications, isOpen])

  const popUpOPen = () => {
    setIsOpen(!isOpen)
    setIsRead(true)
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        aria-expanded={isOpen}
        onClick={() => popUpOPen()}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-[#4c669a] cursor-pointer"
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '24px' }}
        >
          notifications
        </span>
        {!isRead && (
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
        )}
      </button>

      {/* notification list */}

      {isOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        ></button>
      )}

      <div
        className={`absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white dark:bg-[#151b2b] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden origin-top-right ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
        style={{ transition: 'opacity 0.2s ease-out, transform 0.2s ease-out' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
            Notifications
          </h3>
          <div className="flex gap-2">
            <button
              onClick={clearNotifications}
              className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        </div>
        <div className="max-h-95 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loading
                className="h-[80%] w-[80%] p-10"
                text="searching..."
                description="Please wait while we fetch the notifications for you."
              />
            </div>
          ) : notifications.length == 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center px-4">
              <div className="size-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mb-3">
                <span className="material-symbols-outlined text-[32px]">
                  notifications_off
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                You have no new notifications
              </p>
            </div>
          ) : (
            notifications
              .sort((a, b) => {
                const aTime = new Date(a.time).getTime()
                const bTime = new Date(b.time).getTime()
                return bTime - aTime
              })
              .map((noti: any) => {
                return (
                  <div
                    key={noti.id}
                    className="flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800/50 cursor-pointer bg-blue-50/30 dark:bg-blue-900/10"
                  >
                    <div className="shrink-0 mt-1">
                      <div
                        className={`size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center ${Logo.find((l) => l.type === noti.type)?.style}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {noti.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 w-full">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {noti.title}
                        </p>
                        <span className="size-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {noti.message}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1">
                        {noti.time}
                      </span>
                    </div>
                  </div>
                )
              })
          )}
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
          <Link
            to={`/${currentPath}/notifications` as any}
            onClick={() => {
              setIsOpen(!isOpen)
              setChoosen('notifications')
            }}
            className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary py-1 w-full cursor-pointer"
          >
            View All Notifications
          </Link>
        </div>
      </div>
    </div>
  )
}

export default memo(NotificationList)
