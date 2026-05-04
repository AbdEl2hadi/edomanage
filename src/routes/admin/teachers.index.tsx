import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from 'boneyard-js/react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import z from 'zod'
import { zodValidator } from '@tanstack/zod-adapter'
import { toast } from 'sonner'
import type { UICardType } from '@/components/admin/UICard'
import type { TeacherWithUser } from '@/lib/Types/TeacherTypes'
import { TeacherColumns } from '@/components/admin/Table/columnsData'

import DataTable, {
  CustomDataTableSkeleton,
} from '@/components/admin/Table/dataTable'
import { CustomPagination } from '@/components/admin/PaginationComp'
import { SearchInput } from '@/components/admin/SearchInput'
import { SelectPageSize } from '@/components/admin/SelectPageSize'
import { teacherFetcher } from '@/services/api/admin/teacher/fetcher'
import IndexPageComponent from '@/components/admin/IndexPageComponent'
import { AddMultipleDialog } from '@/components/admin/addMultiple/addMultipleDialog'
import { useAuthStore } from '@/services/store/auth_store'

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

export type TeacherSortOption = 'name' | 'email'

export const TeacherSearchSchema = z.object({
  search: z.string().catch('').default(''),
  email: z.string().email().catch('').default(''),
  status: z.string().catch('').default(''),
  sortBy: z.enum(['name', 'email']).catch('name').default('name'),
  sortOrder: z.enum(['asc', 'desc']).nullable().catch('asc').default('asc'),
  page: z.coerce.number().int().positive().catch(1).default(1),
  size: z.coerce.number().int().positive().catch(10).default(10),
})
type TeacherSearchParams = z.infer<typeof TeacherSearchSchema>
type QueryOptionsType = TeacherSearchParams

const getTeachersQueryOptions = ({
  page,
  search,
  size,
  status,
  sortOrder,
  sortBy,
}: Omit<QueryOptionsType, 'email'>) => ({
  queryKey: ['teachers', page, search, size, sortOrder, sortBy, status],
  queryFn: async () => {
    const response = await teacherFetcher.getTeachers({
      pageIndex: page,
      search,
      pageSize: size,
      sortOrder,
      sortBy,
    })
    if (response.success)
      return {
        data: response.data,
        pagination: response.pagination,
      }
    else throw new Error(response.errorType)
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  placeholderData: keepPreviousData,
  retry: 1,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
})

export const Route = createFileRoute('/admin/teachers/')({
  component: RouteComponent,
  pendingComponent: AdminTeachersPending,
  loaderDeps: ({ search }) => search,
  // loader: async ({ context, deps }) => {
  //   await new Promise((resolve) => setTimeout(resolve, 2000))
  //   return context.queryClient.ensureQueryData(getTeachersQueryOptions(deps))
  // },
  validateSearch: zodValidator(TeacherSearchSchema),
})

function RouteComponent() {
  return (
    <Skeleton name="admin-teachers-page" loading={false}>
      <AdminTeachersContent />
    </Skeleton>
  )
}

function AdminTeachersPending() {
  return (
    <Skeleton name="admin-teachers-page" loading>
      <AdminTeachersContent />
    </Skeleton>
  )
}

function AdminTeachersContent() {
  const navigate = Route.useNavigate()
  const user = useAuthStore((state) => state.user)
  const searchParams = TeacherSearchSchema.parse(Route.useSearch())
  const { size, page, search, sortBy, sortOrder, status } = searchParams
  const {
    data: teachersData,
    status: fetchStatus,
    refetch,
  } = useQuery({
    ...getTeachersQueryOptions({
      page,
      size,
      search,
      sortBy,
      status,
      sortOrder,
    }),
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
                  navigate({
                    search: (s: TeacherSearchParams) => ({
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
                      search: (s: TeacherSearchParams) => ({
                        ...s,
                        size: value,
                      }),
                    })
                  }
                />
                <AddMultipleDialog
                  type="Teachers"
                  schoolId={user!.info!.id}
                  onSuccess={(message?: string) => {
                    toast.success(message || 'Teachers added successfully!')
                    refetch()
                  }}
                  onError={(error) => {
                    toast.error(error.message || 'Failed to add teachers')
                  }}
                />
              </div>
            </div>
            <TeachersTable data={teachersData.data} />
            <div className="flex items-center justify-between">
              <p className="w-fit">
                Showing {size} of {teachersData.pagination.totalElements}
              </p>
              <CustomPagination
                currentPage={page}
                totalPages={teachersData.pagination.totalPages}
                onPageChange={(p) =>
                  navigate({
                    search: (s: TeacherSearchParams) => ({ ...s, page: p }),
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

function TeachersTable({ data }: { data: Array<TeacherWithUser> }) {
  const table = useReactTable({
    data,
    columns: TeacherColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <DataTable table={table} />
}
