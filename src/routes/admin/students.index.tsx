import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from 'boneyard-js/react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import z from 'zod'
import { zodValidator } from '@tanstack/zod-adapter'
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
    else throw new Error(response.message)
  },
  placeholderData: keepPreviousData,
})

export const Route = createFileRoute('/admin/students/')({
  component: RouteComponent,
  pendingComponent: AdminStudentsPending,
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return context.queryClient.ensureQueryData(getStudentsQueryOptions(deps))
  },
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
  const { data: studentsData, status: fetchStatus } = useQuery({
    ...getStudentsQueryOptions({
      page,
      size,
      search,
      sortBy,
      status,
      grade,
      sortOrder,
    }),
    placeholderData: keepPreviousData,
  })

  return (
    <div className="flex-1 overflow-y-scroll w-full overflow-x-auto flex flex-col gap-4 px-6 p-6">
      {fetchStatus === 'pending' ? (
        <CustomDataTableSkeleton rows={size} cols={6} />
      ) : fetchStatus === 'error' ? (
        <p>Error</p>
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
              </div>
            </div>
            <StudentsTable data={studentsData.data} />
            <div className="flex items-center justify-between">
              <p className="w-fit">
                Showing {size} of {studentsData.pagination.totalElements}
              </p>
              <CustomPagination
                currentPage={page}
                totalPages={studentsData.pagination.totalPages}
                onPageChange={(p) =>
                  navigate({
                    search: (s: StudentSearchParams) => ({ ...s, page: p }),
                  })
                }
              />
            </div>
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
