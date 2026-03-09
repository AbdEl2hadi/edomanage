import { Link, createFileRoute } from '@tanstack/react-router'
import UICardComponent from '../../components/owner/UICard'
import type { UICardType } from '../../components/owner/UICard'
import type { StudentModel } from '@/services/api/owner/types/modelTypes'
import type { Filters } from '@/services/api/owner/types/apiTypes'
import { useGetStudents } from '@/services/api/owner/student/hooks'
import { DEFAULT_PAGE_SIZE } from '@/components/owner/dataTable/dataTable'
import { DataTable } from '@/components/table/data-table'
import { StudentColumns } from '@/components/owner/dataTable/dataColumn'
import { useFilterResource } from '@/hooks/teacher/use-filter-resource'

const UICardList: Array<UICardType> = [
  {
    id: '0',
    iconName: 'groups',
    iconColor: 'blue',
    stateIcon: 'trending_up',
    percentage: 5,
    cardTitle: 'Total Students',
    info: '452',
  },
  {
    id: '1',
    iconName: 'person_add',
    iconColor: 'purple',
    stateIcon: 'trending_up',
    percentage: 12,
    cardTitle: 'New Enrollments',
    info: '34',
  },
  {
    id: '2',
    iconName: 'calendar_month',
    iconColor: 'orange',
    stateIcon: 'trending_up',
    percentage: 96,
    cardTitle: 'Average Attendance',
    info: 'Last 30 days',
  },
]

export const Route = createFileRoute('/owner/students/')({
  validateSearch: {} as Filters<StudentModel>,
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Owner | Students - EduManage' }],
  }),
})

function RouteComponent() {
  const { filters, setFilters, resetFilters } = useFilterResource(Route.id)
  const { data: studentsList } = useGetStudents(filters)

  const paginationState = {
    pageSize: filters.size ?? DEFAULT_PAGE_SIZE,
    pageIndex: (filters.page ?? 1) - 1,
  }

  const rowCount = studentsList?.pagination.totalElements ?? 0

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Student Directory
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              Manage student enrollments, records, and academic status.
            </p>
          </div>
          <Link to="/owner/students/add">
            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-sm shadow-blue-500/30 active:scale-95 cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Add New Student</span>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {UICardList.map((card, i) => (
            <UICardComponent {...card} key={i} />
          ))}
        </div>

        {studentsList?.data && (
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
        )}
        <div className="overflow-x-auto w-full bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col">
          <div className="overflow-x-auto w-full bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col">
            <DataTable
              data={studentsList?.data ?? []}
              columns={StudentColumns}
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

        <footer className="mt-12 mb-6 text-center text-xs text-slate-400">
          © 2026 EduManage School System. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
