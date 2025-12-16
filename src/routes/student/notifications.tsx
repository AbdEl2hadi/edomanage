import React, { useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { createFileRoute } from '@tanstack/react-router'
import { GiWhiteBook } from 'react-icons/gi'
import { MdOutlineGrade, MdPriorityHigh } from 'react-icons/md'
import { FaUserTie } from 'react-icons/fa'

export const Route = createFileRoute('/student/notifications')({
  component: Notifications,
})
type ResourceCard = {
  icon: React.ElementType
  type: string
  title: string
  subject: string
  time: string
}
export function Notifications() {
  const [tab, setTab] = useState('All')
  const resources: Array<ResourceCard> = [
    {
      icon: MdPriorityHigh,
      type: 'Urgent',
      title: 'Physics Final Exam Rescheduled',
      subject: 'Mathematics • Mr. Anderson',
      time: 'Administrative Office • 10 mins ago',
    },
    {
      icon: GiWhiteBook,
      type: 'Book',
      title: 'WWII Documentary',
      subject: 'History • Mrs. Roberts',
      time: 'Administrative Office • 10 mins ago',
    },
    {
      icon: FaRegCircleUser,
      type: 'User',
      title: 'Lab Report Template',
      subject: 'Science • Dr. Stevens',
      time: 'Administrative Office • 10 mins ago',
    },
    {
      icon: MdOutlineGrade,
      type: 'Grade',
      title: 'Cell Structure Diagram',
      subject: 'Science • Dr. Stevens',
      time: '3d ago',
    },
    {
      icon: FaRegCircleUser,
      type: 'User',
      title: 'Cell Structure Diagram',
      subject: 'Science • Dr. Stevens',
      time: '3d ago',
    },
    {
      icon: FaUserTie,
      type: 'Teacher',
      title: 'Cell Structure Diagram',
      subject: 'Science • Dr. Stevens',
      time: 'week ago',
    },
  ]

  const getColors = (type: string) => {
    switch (type) {
      case 'Urgent':
        return {
          bg: 'bg-red-50',
          text: 'text-red-500',
          darkBg: 'dark:bg-red-500/10',
          ring: 'ring-red-500/20',
          border: 'border-red-500',
        }
      case 'Book':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-500',
          darkBg: 'dark:bg-purple-500/10',
          ring: 'ring-purple-500/20',
          border: 'border-purple-500',
        }
      case 'Teacher':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-500',
          darkBg: 'dark:bg-blue-500/10',
          ring: 'ring-blue-500/20',
          border: 'border-blue-500',
        }
      case 'Grade':
        return {
          bg: 'bg-green-50',
          text: 'text-green-500',
          darkBg: 'dark:bg-green-500/10',
          ring: 'ring-green-500/20',
          border: 'border-green-500',
        }
      case 'User':
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-500',
          darkBg: 'dark:bg-orange-500/10',
          ring: 'ring-orange-500/20',
          border: 'border-orange-500',
        }
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-500',
          darkBg: 'dark:bg-gray-500/10',
          ring: 'ring-gray-500/20',
          border: 'border-gray-500',
        }
    }
  }
  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-light dark:bg-background-dark relative">
      <div className="max-w-[1000px] mx-auto w-full p-6 md:p-10 flex flex-col gap-8">
        {/* Page Heading & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className=" text-[#0d121b] dark:text-white  text-4xl font-black leading-tight tracking-tight">
              Notifications
            </h2>
            <p className="text-[#4c669a] dark:text-[#9da6b9] text-base font-normal max-w-lg">
              Stay updated with your latest school alerts, exam schedules, and
              messages from your teachers.
            </p>
          </div>

          <button className="flex shrink-0 items-center gap-2 justify-center rounded-lg h-10 px-5   bg-primary dark:bg-[#282e39] hover:bg-blue-700 dark:hover:bg-[#323b49] text-white text-sm font-bold transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">
              done_all
            </span>
            <span>Mark all as read</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <label className="group relative flex w-full md:max-w-md items-center">
            <span className="absolute left-4 text-[#9da6b9] group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">
                search
              </span>
            </span>
            <input
              type="text"
              placeholder="Search notification history..."
              className="bg-gray-200 dark:bg-[#282e39] border border-gray-300 h-12 w-full rounded-xl dark:border-gray-700 focus:border-primary focus:bg-gray-300 dark:focus:bg-[#1a202c] focus:ring-0 pl-12 pr-4 text-[#0d121b] dark:text-white placeholder-[#6b7280] transition-all text-base"
            />
          </label>

          {/* Filter Chips */}

          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Unread', 'Urgent', 'Teachers', 'Administration'].map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setTab(t as any)}
                  className={` flex h-9 items-center justify-center px-4 rounded-full text-sm font-medium ${tab === t ? 'bg-primary text-white  transition-transform hover:scale-105' : 'border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#282e39] hover:bg-gray-50 dark:hover:bg-[#374151] text-[#9da6b9] hover:text-gray-600 dark:hover:text-white transition-colors'}`}
                >
                  {t === 'All' ? 'All Resources' : t}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex flex-col gap-3">
          {resources.map(({ icon: Icon, type, title, subject, time }) => {
            const colors = getColors(type)
            return (
              <div
                key={title}
                className={`group relative flex flex-col md:flex-row gap-4 p-5 rounded-xl hover:bg-gray-100 bg-white shadow-sm dark:bg-[#1A202C] dark:hover:bg-[#202736] border-l-4 ${colors.border} transition-all duration-200 cursor-pointer shadow-sm`}
              >
                <div className="shrink-0">
                  <div className="absolute right-4 top-4 size-2 rounded-full bg-primary" />

                  <div
                    className={`flex size-12 items-center justify-center rounded-full ${colors.bg} ${colors.text} ${colors.darkBg}`}
                  >
                    <Icon className="material-symbols-outlined text-[24px]" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-center gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[#0d121b] dark:text-white text-lg font-semibold leading-snug">
                      {title}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-md ${colors.bg} ${colors.darkBg} px-2 py-0.5 text-xs font-medium ${colors.text} ring-1 ring-inset ${colors.ring}}`}
                    >
                      {type}
                    </span>
                  </div>
                  <p className="text-[#4c669a] dark:text-[#9da6b9] text-sm line-clamp-2">
                    {subject}
                  </p>
                  <p className="text-[#6b7280] text-xs mt-2 font-medium">
                    {time}
                  </p>
                </div>

                <div className="hidden md:flex shrink-0 items-center self-center">
                  <span className="material-symbols-outlined text-gray-400 hover:text-black dark:text-[#4b5563] dark:group-hover:text-white transition-colors">
                    chevron_right
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-center py-8">
          <p className="text-[#4b5563] text-sm">End of notifications</p>
        </div>
      </div>
    </main>
  )
}
