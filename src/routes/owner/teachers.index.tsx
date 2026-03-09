import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { UICardType } from '@/components/owner/UICard'

import type { TeacherModel } from '@/services/api/owner/types/modelTypes'
import type { ColumnDef } from '@tanstack/react-table'
import UICardComponent from '@/components/owner/UICard'
import TeacherCard from '@/components/owner/teacherCard'
import { useGetTeachers } from '@/services/api/owner/teacher/hooks'
import { TeacherColumns } from '@/components/owner/dataTable/dataColumn'
import { DataTable } from '@/components/table/data-table'
import { DEFAULT_PAGE_SIZE } from '@/components/owner/dataTable/dataTable'
import { useFilterResource } from '@/hooks/teacher/use-filter-resource'

export const Route = createFileRoute('/owner/teachers/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Owner | Teachers - EduManage' }],
  }),
})

function RouteComponent() {
  // additional idea is to put an input for where to put the number of the page he wants.               jump to page input
  // another idea is that he can put in an input the number of students he wants in a single page.      students/teachers  per page selector

  const UICardList: Array<UICardType> = [
    {
      id: '0',
      iconName: 'school',
      iconColor: 'blue',
      stateIcon: 'trending_up',
      percentage: 5,
      cardTitle: 'Total Teachers',
      info: '42',
    },
    {
      id: '1',
      iconName: 'bolt',
      iconColor: 'green',
      stateIcon: 'trending_up',
      percentage: 2,
      cardTitle: 'Active Now',
      info: '38',
    },
    {
      id: '2',
      iconName: 'person_add',
      iconColor: 'purple',
      stateIcon: 'trending_up',
      percentage: 10,
      cardTitle: 'New This Month',
      info: '3',
    },
  ]
  const { filters, setFilters, resetFilters } = useFilterResource(Route.id)

  const { data: teachersList } = useGetTeachers()
  const rowCount = teachersList?.data.length ?? 0
  teachersList?.data && console.log(teachersList.data.length)

  const paginationState = {
    pageSize: filters.size ?? DEFAULT_PAGE_SIZE,
    pageIndex: (filters.page ?? 1) - 1,
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Faculty Directory
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              Manage and view all registered teachers.
            </p>
          </div>
          <Link to="/owner/teachers/add">
            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm shadow-blue-500/30 active:scale-95 cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="font-medium">Add New Teacher</span>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {UICardList.map((card) => (
            <UICardComponent {...card} key={card.id} />
          ))}
        </div>
        <div className=" bg-surface-dark rounded-xl border border-slate-300 dark:border-gray-800 shadow-lg overflow-hidden flex flex-col">
          <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-4 justify-between items-center">
              <div className="flex w-full lg:w-auto gap-3 items-center flex-1">
                <div className="relative w-full max-w-md">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    search
                  </span>
                  <input
                    className="w-full pl-10 pr-4 h-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-gray-800 text-sm dark:text-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400"
                    placeholder="Search by name, ID, or email..."
                    type="text"
                  />
                </div>
              </div>
              <div className="flex w-full lg:w-auto gap-3 overflow-x-auto pb-1 lg:pb-0">
                <select
                  className="flex items-center h-10 rounded-lg border-none bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-slate-500 
                    focus:ring-0 border-slate-100 dark:border-gray-700/50  duration-200 dark:text-white  dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer"
                >
                  <option>All Grades</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                </select>
                <select
                  className="flex items-center h-10 rounded-lg border-none bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-slate-500 
                    focus:ring-0 border-slate-100 dark:border-gray-700/50  duration-200 dark:text-white  dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
                <select
                  className=" flex items-center h-10 rounded-lg border-none bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-slate-500 
                    focus:ring-0 border-slate-100 dark:border-gray-700/50  duration-200 dark:text-white  dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    filter_list
                  </span>
                  <option>More Filters</option>
                  <option>name</option>
                  <option>id</option>
                  <option>grade</option>
                </select>
              </div>
            </div>

            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-4 justify-between items-center">
              <div className="flex w-full lg:w-auto gap-3 items-center flex-1">
                <div className="relative w-full max-w-md">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    search
                  </span>
                  <input
                    className="w-full pl-10 pr-4 h-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-gray-800 text-sm dark:text-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400"
                    value={filters.search}
                    placeholder="Search by name, ID, or email..."
                    type="text"
                    onChange={(e) =>
                      setFilters({ search: e.target.value, page: 1 })
                    }
                  />
                </div>
              </div>
              <div className="flex w-full lg:w-auto gap-3 overflow-x-auto pb-1 lg:pb-0">
                <select className="flex items-center h-10 rounded-lg border-none bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-slate-500 focus:ring-0 border-slate-100 dark:border-gray-700/50  duration-200 dark:text-white dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer">
                  <option>All Grades</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                </select>
                <select className="flex items-center h-10 rounded-lg border-none bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-slate-500 focus:ring-0 border-slate-100 dark:border-gray-700/50  duration-200 dark:text-white dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto w-full bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col">
              <div className="overflow-x-auto w-full bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col">
                <DataTable
                  data={
                    teachersList?.data as unknown as Array<
                      Record<string, string | number>
                    >
                  }
                  columns={
                    TeacherColumns as unknown as Array<
                      ColumnDef<Record<string, string | number>>
                    >
                  }
                  pagination={paginationState}
                  paginationOptions={{
                    onPaginationChange: (pagination) => {
                      setFilters(
                        typeof pagination === 'function'
                          ? pagination(paginationState)
                          : pagination,
                      )
                    },
                    rowCount,
                  }}
                  filters={filters}
                  onFilterChange={setFilters}
                />
              </div>
            </div>
          </div>
          <footer className="mt-12 mb-6 text-center text-xs text-slate-400">
            © 2026 EduManage School System. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  )
}
