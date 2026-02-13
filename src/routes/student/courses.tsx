import React, { useState } from 'react'
import { FaRegFileImage, FaRegFilePdf, FaRegFileWord } from 'react-icons/fa6'
import { createFileRoute } from '@tanstack/react-router'
import { HiDownload, HiExternalLink, HiEye } from 'react-icons/hi'
import { MdOutlineFolderZip, MdSearch, MdSlowMotionVideo } from 'react-icons/md'
import { IoLink } from 'react-icons/io5'

export const Route = createFileRoute('/student/courses')({
  component: Courses,
  head: () => ({
    meta: [{ title: 'Student | Courses - EduManage' }],
  }),
})

type ResourceCard = {
  id: string
  icon: React.ElementType
  type: string
  title: string
  subject: string
  time: string
}

export function Courses() {
  const [tab, setTab] = useState('All')

  const resources: Array<ResourceCard> = [
    {
      id: 'algebra-ii-ch5-notes',
      icon: FaRegFilePdf,
      type: 'PDF',
      title: 'Algebra II - Ch. 5 Notes',
      subject: 'Mathematics • Mr. Anderson',
      time: '2h ago',
    },
    {
      id: 'wwii-documentary-video',
      icon: MdSlowMotionVideo,
      type: 'Video',
      title: 'WWII Documentary',
      subject: 'History • Mrs. Roberts',
      time: 'Yesterday',
    },
    {
      id: 'lab-report-template-docx',
      icon: FaRegFileWord,
      type: 'DOCX',
      title: 'Lab Report Template',
      subject: 'Science • Dr. Stevens',
      time: '2d ago',
    },
    {
      id: 'cell-structure-diagram-jpg',
      icon: FaRegFileImage,
      type: 'JPG',
      title: 'Cell Structure Diagram',
      subject: 'Science • Dr. Stevens',
      time: '3d ago',
    },
    {
      id: 'cell-structure-diagram-url',
      icon: IoLink,
      type: 'URL',
      title: 'Cell Structure Diagram',
      subject: 'Science • Dr. Stevens',
      time: '3d ago',
    },
    {
      id: 'cell-structure-diagram-zip',
      icon: MdOutlineFolderZip,
      type: 'ZIP',
      title: 'Cell Structure Diagram',
      subject: 'Science • Dr. Stevens',
      time: 'week ago',
    },
  ]

  const getColors = (type: string) => {
    switch (type) {
      case 'PDF':
        return {
          bg: 'bg-red-50',
          text: 'text-red-500',
          darkBg: 'dark:bg-red-500/10',
        }
      case 'Video':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-500',
          darkBg: 'dark:bg-purple-500/10',
        }
      case 'DOCX':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-500',
          darkBg: 'dark:bg-blue-500/10',
        }
      case 'JPG':
        return {
          bg: 'bg-green-50',
          text: 'text-green-500',
          darkBg: 'dark:bg-green-500/10',
        }
      case 'URL':
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-500',
          darkBg: 'dark:bg-orange-500/10',
        }
      case 'ZIP':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-300',
          darkBg: 'dark:bg-yellow-500/10',
        }
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-500',
          darkBg: 'dark:bg-gray-500/10',
        }
    }
  }

  return (
    // <div className="overflow-auto min-h-screen bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white flex flex-col p-6 md:p-10">
    <main className="flex-1 overflow-y-auto bg-background-light p-4 dark:bg-background-dark md:p-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <a className="hover:text-primary" href="#">
          Home
        </a>
        <span className="material-symbols-outlined text-[16px]">
          chevron_right
        </span>
        <a className="hover:text-primary" href="#">
          Student
        </a>
        <span className="material-symbols-outlined text-[16px]">
          chevron_right
        </span>
        <span className="font-medium text-[#0d121b] dark:text-white">
          Resources
        </span>
      </nav>
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#0d121b] dark:text-white md:text-4xl">
            Learning Resources
          </h1>
          <p className="mt-2 text-base text-[#4c669a] dark:text-gray-400">
            Access educational materials, assignments, and reference docs shared
            by your teachers.
          </p>
        </div>
      </div>
      <div className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-surface-dark md:flex-row md:items-center md:justify-between">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-gray-100 pb-2 md:border-none md:pb-0 dark:border-gray-700">
          {['All', 'Assignments', 'Reference'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === t ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'}`}
            >
              {t === 'All' ? 'All Resources' : t}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative h-10 w-full sm:w-64">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]" />
            <input
              type="text"
              placeholder="Search files..."
              className="h-full w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-[#0d121b] focus:border-primary focus:ring-0 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            />
          </div>

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          <select className="h-10 rounded-lg border-none bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-gray-600 focus:ring-0 dark:bg-gray-800 dark:text-gray-300 cursor-pointer">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Name (A-Z)</option>
          </select>
        </div>
      </div>
      {/* Recent Section */}
      <div className="mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">schedule</span>
        <h2 className="text-lg font-bold text-[#0d121b] dark:text-white">
          Recent Uploads
        </h2>
      </div>
      {/* Card */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {resources.map(({ id, icon: Icon, type, title, subject, time }) => {
          const colors = getColors(type)
          return (
            <div
              key={id}
              className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-surface-dark"
            >
              <div>
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text} ${colors.darkBg}`}
                  >
                    <Icon className="text-2xl" />
                  </div>
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {type}
                  </span>
                </div>
                <h3 className="mb-1 text-lg font-bold text-[#0d121b] dark:text-white group-hover:text-primary">
                  {title}
                </h3>
                <p className="text-sm font-medium text-[#4c669a] dark:text-gray-400">
                  {subject}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5 dark:border-gray-700">
                <span className="text-xs text-gray-400">{time}</span>

                {type === 'Video' ? (
                  <button className="flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-2 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 hover:text-primary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                    <HiEye className="text-[16px]" />
                    <span>Watch</span>
                  </button>
                ) : type === 'URL' ? (
                  <button className="flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 hover:text-primary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                    <HiExternalLink className="text-[17px]" />
                    <span>Open</span>
                  </button>
                ) : (
                  <button className="flex items-center gap-1.5 rounded-lg bg-primary px-2 py-2 text-[12px] font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <HiDownload className="text-[16px]" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {/* Pagination / Load More */}
      <div className="mt-8 flex justify-center pb-8">
        <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
          Load More Resources
          <span className="material-symbols-outlined text-[18px]">
            expand_more
          </span>
        </button>
      </div>
    </main>
    // </div>
  )
}
