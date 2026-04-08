import { createFileRoute } from '@tanstack/react-router'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import z from 'zod'
import { fallback, zodValidator } from '@tanstack/zod-adapter'
import type { StudentModel } from '@/services/api/owner/student/schemas'
import type { Filters } from '@/services/api/owner/types/apiTypes'
import type { UICardType } from '@/components/owner/UICard'
import { StudentColumns } from '@/components/owner/Table/columnsData'
import { studentFetcher } from '@/services/api/owner/student/fetcher'

import DataTable, {
  CustomDataTableSkeleton,
} from '@/components/owner/Table/DataTable'
import { CustomPagination } from '@/components/owner/PaginationComp'
import { SearchInput } from '@/components/owner/SearchInput'
import { SelectPageSize } from '@/components/owner/SelectPageSize'
import IndexPageComponent from '@/components/owner/IndexPageComponent'
import SelectFilter from '@/components/owner/SelectFilter'

const grades = [
  { label: 'All Grades', value: '' },
  { label: 'Grade 9', value: 'grade_9' },
  { label: 'Grade 10', value: 'grade_10' },
  { label: 'Grade 11', value: 'grade_11' },
  { label: 'Grade 12', value: 'grade_12' },
]
const status = [
  { label: 'All Status', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'Pending' },
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
  search: fallback(z.string(), '').default(''),
  email: fallback(z.string().email(), '').default(''),
  status: fallback(z.string(), '').default(''),
  grade: fallback(z.string(), '').default(''),
  sortBy: fallback(z.enum(['name', 'email']), 'name').default('name'),
  sortOrder: fallback(z.enum(['asc', 'desc']).nullable(), 'asc').default('asc'),
  page: fallback(z.number(), 1).default(1),
  size: fallback(z.number(), 10).default(10),
})

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

export const Route = createFileRoute('/owner/students/')({
  component: RouteComponent,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => {
    context.queryClient.ensureQueryData(getStudentsQueryOptions(deps))
  },
  validateSearch: zodValidator(StudentSearchSchema),
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { size, page, search, sortBy, sortOrder, status, grade } = Route.useSearch()
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
                  navigate({ search: (s) => ({ ...s, search: value }) })
                }
              />
              <div className="flex items-center gap-4">
                <SelectPageSize
                  value={size}
                  onChange={(value) =>
                    navigate({ search: (s) => ({ ...s, size: value }) })
                  }
                />
                <SelectFilter
                  options={grades}
                  value={grade}
                  onChange={(value) =>
                    navigate({ search: (s) => ({ ...s, grade: value }) })
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
                  navigate({ search: (s) => ({ ...s, page: p }) })
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
