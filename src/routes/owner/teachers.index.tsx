import { createFileRoute } from '@tanstack/react-router'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import z from 'zod'
import { fallback, zodValidator } from '@tanstack/zod-adapter'
import type { Filters } from '@/services/api/owner/types/apiTypes'
import type { TeacherModel } from '@/services/api/owner/teacher/schemas'
import type { UICardType } from '@/components/owner/UICard'
import { TeacherColumns } from '@/components/owner/Table/columnsData'

import DataTable, {
  CustomDataTableSkeleton,
} from '@/components/owner/Table/DataTable'
import { CustomPagination } from '@/components/owner/PaginationComp'
import { SearchInput } from '@/components/owner/SearchInput'
import { SelectPageSize } from '@/components/owner/SelectPageSize'
import { teacherFetcher } from '@/services/api/owner/teacher/fetcher'
import IndexPageComponent from '@/components/owner/IndexPageComponent'

const subjects = [
  { label: 'All Subjects', value: '' },
  { label: 'Math', value: 'math' },
  { label: 'Science', value: 'science' },
  { label: 'English', value: 'english' },
  { label: 'History', value: 'history' },
  { label: 'Physical Education', value: 'physical_education' },
]

const status = [
  { label: 'All Status', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
]

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

type QueryOptionsType = Filters<TeacherModel>
export type TeacherSortOption = 'name' | 'email'

export const TeacherSearchSchema = z.object({
  search: fallback(z.string(), '').default(''),
  email: fallback(z.string().email(), '').default(''),
  status: fallback(z.string(), '').default(''),
  sortBy: fallback(z.enum(['name', 'email']), 'name').default('name'),
  sortOrder: fallback(z.enum(['asc', 'desc']).nullable(), 'asc').default('asc'),
  page: fallback(z.number(), 1).default(1),
  size: fallback(z.number(), 10).default(10),
})

const getTeachersQueryOptions = ({
  page,
  search,
  size,
  status,
  sortOrder,
  sortBy,
}: QueryOptionsType) => ({
  queryKey: ['teachers', page, search, size, sortOrder, sortBy, status],
  queryFn: async () => {
    const response = await teacherFetcher.getTeachers({
      page,
      search,
      size,
      status,
      sortOrder,
      sortBy,
    })
    if (response.success)
      return {
        data: response.data,
      }
  },
})

const getStudentsQueryOptions = ({
  page,
  search,
  size,
  status,
  sortOrder,
  sortBy,
}: QueryOptionsType) => ({
  queryKey: ['students', page, search, size, sortOrder, sortBy, status],
  queryFn: async () => {
    const response = await teacherFetcher.getTeachers({
      page,
      search,
      size,
      status,
      sortOrder,
      sortBy,
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

export const Route = createFileRoute('/owner/teachers/')({
  component: RouteComponent,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => {
    context.queryClient.ensureQueryData(getTeachersQueryOptions(deps))
  },
  validateSearch: zodValidator(TeacherSearchSchema),
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { size, page, search, sortBy, sortOrder } = Route.useSearch()
  const { data: studentsData, status: fetchStatus } = useQuery({
    ...getStudentsQueryOptions({
      page,
      size,
      search,
      sortBy,
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
          <IndexPageComponent role="teacher" UICards={UICardList}>
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
              </div>
            </div>
            <TeachersTable data={studentsData.data} />
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

function TeachersTable({ data }: { data: Array<TeacherModel> }) {
  const table = useReactTable({
    data,
    columns: TeacherColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <DataTable table={table} />
}
