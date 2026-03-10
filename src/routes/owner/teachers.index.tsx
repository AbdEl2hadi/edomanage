import { Link, createFileRoute } from '@tanstack/react-router'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import { DataTable } from './payments'
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table'
import type { UICardType } from '@/components/owner/UICard'
import UICardComponent from '@/components/owner/UICard'
import { useGetTeachers } from '@/services/api/owner/teacher/hooks'
import { TeacherColumns } from '@/components/owner/dataTable/dataColumn'

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

  const { data: teachersList } = useGetTeachers()
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data: teachersList?.data ?? [],
    columns: TeacherColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  })
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
        <DataTable table={table} />

        {/* <DataTable
                  data={
                    teachersList?.data as unknown as Array<
                      Record<string, string | number>
                    >
                  }
                  columns={
                    TeacherColumns as unknown as Array<
                      ColumnDef<Record<string, unknown>>
                    >
                  }
                  pagination={paginationState}
                  paginationOptions={{
                    onPaginationChange: (pagination: any) => {
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
                /> */}
      </div>
      <footer className="mt-12 mb-6 text-center text-xs text-slate-400">
        © 2026 EduManage School System. All rights reserved.
      </footer>
    </div>
  )
}
