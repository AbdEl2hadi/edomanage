import { createFileRoute } from '@tanstack/react-router'

import type { Resource } from '@/services/api/teacher/types'
import { ResourceSearchSchema } from '@/routes/teacher/classes/$folderId'
import { ResourcesTable } from '@/components/teacher/resources/resources-table'
import { columns } from '@/components/teacher/resources/columns'
import { useFilterResource } from '@/hooks/teacher/use-filter-resource.ts'
import { queryClient } from '@/lib/queryClient'
import useGetResources, {
  getResourcesQueryOptions,
} from '@/services/api/teacher/getResources'
import { getAllCollectionsQueryOptions } from '@/services/api/teacher/getAllCollections'

export const Route = createFileRoute('/student/courses')({
  component: Courses,
  head: () => ({
    meta: [{ title: 'Student | Courses - EduManage' }],
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    queryClient.ensureQueryData(getAllCollectionsQueryOptions(false))
    queryClient.ensureQueryData(getResourcesQueryOptions(undefined, deps))
  },
  validateSearch: ResourceSearchSchema,
})

export function Courses() {
  const { filters, setFilters } = useFilterResource(Route.id)
  const paginationState = {
    pageIndex: filters.pageIndex ?? 1,
    pageSize: filters.pageSize ?? 5,
  }
  const { data: resourcesData } = useGetResources(undefined, filters)
  const data: Array<Resource> = resourcesData?.data ?? []
  const rowCount = resourcesData?.rowCount ?? 0

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

      <div className="px-6 pb-12 py-5">
        <ResourcesTable
          data={data}
          columns={columns}
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
    </main>
    // </div>
  )
}
