import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from 'boneyard-js/react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import z from 'zod'
import { zodValidator } from '@tanstack/zod-adapter'
import { toast } from 'sonner'
import type { StudentModel } from '@/services/api/admin/student/Schemas'
import type { Filters } from '@/services/api/admin/types/apiTypes'
import type { UICardType } from '@/components/admin/UICard'
import { StudentColumns } from '@/components/admin/Table/columnsData'
import { studentFetcher } from '@/services/api/admin/student/fetcher'

import DataTable, {
  CustomDataTableSkeleton,
} from '@/components/admin/Table/dataTable'
import { CustomPagination } from '@/components/admin/PaginationComp'
import { SearchInput } from '@/components/admin/SearchInput'
import { SelectPageSize } from '@/components/admin/SelectPageSize'
import IndexPageComponent from '@/components/admin/IndexPageComponent'
import SelectFilter from '@/components/admin/SelectFilter'
import { AddMultipleDialog } from '@/components/admin/addMultiple/addMultipleDialog'
import { useAuthStore } from '@/services/store/auth_store'

const grades = [
  { label: 'All Grades', value: '' },
  { label: 'Grade 9', value: 'grade_9' },
  { label: 'Grade 10', value: 'grade_10' },
  { label: 'Grade 11', value: 'grade_11' },
  { label: 'Grade 12', value: 'grade_12' },
]

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

type QueryOptionsType = Filters<StudentModel>
export type StudentSortOption = 'name' | 'email'

export const StudentSearchSchema = z.object({
  search: z.string().catch('').default(''),
  email: z.string().email().catch('').default(''),
  status: z.string().catch('').default(''),
  grade: z.string().catch('').default(''),
  sortBy: z.enum(['name', 'email']).catch('name').default('name'),
  sortOrder: z.enum(['asc', 'desc']).nullable().catch('asc').default('asc'),
  page: z.coerce.number().int().positive().catch(1).default(1),
  size: z.coerce.number().int().positive().catch(10).default(10),
})
type StudentSearchParams = z.infer<typeof StudentSearchSchema>

const getStudentsQueryOptions = ({
  page,
  search,
  size,
  status,
  grade,
  sortOrder,
  sortBy,
}: QueryOptionsType) => ({
  queryKey: ['students', page, search, size, sortOrder, sortBy, status, grade],
  queryFn: async () => {
    const response = await studentFetcher.getStudents({
      page,
      search,
      size,
      status,
      sortOrder,
      sortBy,
      grade,
    })
    if (response.success)
      return {
        data: response.data,
        pagination: response.pagination,
      }
    else throw new Error(response.message || 'Failed to fetch students')
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  placeholderData: keepPreviousData,
  retry: 1,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
})

export const Route = createFileRoute('/admin/students/')({
  component: RouteComponent,
  pendingComponent: AdminStudentsPending,
  validateSearch: zodValidator(StudentSearchSchema),
})

function RouteComponent() {
  return (
    <Skeleton name="admin-students-page" loading={false}>
      <AdminStudentsContent />
    </Skeleton>
  )
}

function AdminStudentsPending() {
  return (
    <Skeleton name="admin-students-page" loading>
      <AdminStudentsContent />
    </Skeleton>
  )
}

function AdminStudentsContent() {
  const navigate = Route.useNavigate()
  const { size, page, search, sortBy, sortOrder, status, grade } =
    Route.useSearch()
  const {
    data: studentsData,
    status: fetchStatus,
    error,
    refetch,
  } = useQuery({
    ...getStudentsQueryOptions({
      page,
      size,
      search,
      sortBy,
      status,
      grade,
      sortOrder,
    }),
  })

  const displayData = studentsData || {
    data: [],
    pagination: { totalElements: 0, totalPages: 0 },
  }
  const hasError = fetchStatus === 'error' && error
  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex-1 overflow-y-auto w-full overflow-x-hidden flex flex-col gap-4 px-6 py-6 h-full">
      {fetchStatus === 'pending' ? (
        <CustomDataTableSkeleton rows={size} cols={6} />
      ) : (
        <>
          <IndexPageComponent role="student" UICards={UICardList}>
            <div className="flex items-center justify-between">
              <SearchInput
                value={search}
                onSearch={(value) =>
                  navigate({
                    search: (s: StudentSearchParams) => ({
                      ...s,
                      search: value,
                    }),
                  })
                }
              />
              <div className="flex items-center gap-4">
                <SelectPageSize
                  value={size}
                  onChange={(value) =>
                    navigate({
                      search: (s: StudentSearchParams) => ({
                        ...s,
                        size: value,
                      }),
                    })
                  }
                />
                <SelectFilter
                  options={grades}
                  value={grade}
                  onChange={(value) =>
                    navigate({
                      search: (s: StudentSearchParams) => ({
                        ...s,
                        grade: value,
                      }),
                    })
                  }
                />
                <AddMultipleDialog
                  type="Students"
                  schoolId={user!.info!.id}
                  onSuccess={(message?: string) => {
                    toast.success(message || 'Students added successfully!')
                    refetch()
                  }}
                  onError={(error) => {
                    toast.error(error.message || 'Failed to add students')
                  }}
                />
              </div>
            </div>
            {hasError ? (
              <div className="flex items-center justify-center min-h-80 rounded-lg bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center space-y-4 p-12">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center animate-pulse">
                    <svg
                      className="w-8 h-8 text-red-600 dark:text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4v2m0 0v-2m0 2H4m16 0h-4m-4 7H8a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v14a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      Connection Failed
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm leading-relaxed">
                      {error?.message ||
                        'Unable to load students data. Please check your internet connection and try again.'}
                    </p>
                  </div>
                  <button
                    onClick={() => refetch()}
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <>
                <StudentsTable data={displayData.data} />
                <div className="flex items-center justify-between">
                  <p className="w-fit">
                    Showing {displayData.data.length} of{' '}
                    {displayData.pagination.totalElements}
                  </p>
                  <CustomPagination
                    currentPage={page}
                    totalPages={displayData.pagination.totalPages}
                    onPageChange={(p) =>
                      navigate({
                        search: (s: StudentSearchParams) => ({ ...s, page: p }),
                      })
                    }
                  />
                </div>
              </>
            )}
          </IndexPageComponent>
        </>
      )}
    </div>
  )
}

function StudentsTable({ data }: { data: Array<StudentModel> }) {
  const table = useReactTable({
    data,
    columns: StudentColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <DataTable table={table} />
}
