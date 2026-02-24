import { Link, createFileRoute, useRouter } from '@tanstack/react-router'

import z from 'zod'
import { columns } from '../../../components/teacher/columns.tsx'

import type { Resource, ResourceFilter } from '@/services/api/teacher/types'

import { DataTable } from '@/components/table/data-table'
import { useFilterResource } from '@/hooks/teacher/use-filter-resource.ts'
import useGetResources, {
  getResourcesQueryOptions,
} from '@/services/api/teacher/getResources.ts'
import { queryClient } from '@/lib/queryClient'
import useGetCollection, { getCollectionQueryOptions } from '@/services/api/teacher/getCollection.ts'
import Loading from '@/components/loading.tsx'


const SortOptions = z.enum(['newest', 'oldest', 'name', 'size'])

export const ResourceSearchSchema: z.ZodType<ResourceFilter> = z.object({
  fileName: z.string().optional(),
  type: z.string().optional(),
  dateAdded: z.string().optional(),
  size: z.string().optional(),
  sortBy: SortOptions.optional(),
  pageIndex: z.number().optional(),
  pageSize: z.number().optional(),
})

export const Route = createFileRoute('/teacher/classes/$folderId')({
  component: RouteComponent,
  loaderDeps: ({ search }) => search,
  loader: ({ params, deps }) => {
    queryClient.ensureQueryData(getCollectionQueryOptions(params.folderId))
    queryClient.ensureQueryData(getResourcesQueryOptions(params.folderId, deps))
  },
  validateSearch: ResourceSearchSchema,
})

function RouteComponent() {
  const router = useRouter()
  const { folderId } = Route.useParams()
  const collectionId = folderId

  const { filters, setFilters } = useFilterResource(Route.id)

  const paginationState = {
    pageIndex: filters.pageIndex ?? 1,
    pageSize: filters.pageSize ?? 5,
  }
  /* useQuery to get data */ 
  const { data: collectionData , isFetching } = useGetCollection(collectionId)
  const { data: resourcesData } = useGetResources(
    collectionId,
    filters,
  )
  /* fix time */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
    return date.toLocaleDateString(undefined, options)
  }


  /* fix data to table*/ 
  const data: Array<Resource> = resourcesData?.data ?? []
  const rowCount = resourcesData?.rowCount ?? 0


  /* */
  return (
    isFetching ? ( <Loading /> ) 
    : collectionData === undefined ? (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-slate-500">Collection not found.</p>
        <button
          className="ml-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          onClick={() => router.history.back()}
        >
          Go Back
        </button>
        <button
          className="ml-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors"
          onClick={() => router.invalidate()}
        >
          View All Collections
        </button>
      </div>
    )
    :
    (
    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-[calc(100vh-64px)]">
      <div className="px-6 py-4">
        <div className="flex flex-col gap-4">
          <Link
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group w-fit"
            to="/teacher/classes"
            replace
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="text-sm font-medium">Go Back</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined filled text-3xl">
                  folder
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{collectionData.name} </h1>
                <div className="flex items-center gap-3 mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>Created {formatDate(collectionData.createdAt)}</span>
                  <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span>Last updated {formatDate(collectionData.updatedAt )}</span>
                  <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span>{collectionData.filesCount} files</span>
                  <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span>{collectionData.sizeMB} MB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-12">
        <DataTable
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
  ))
}
