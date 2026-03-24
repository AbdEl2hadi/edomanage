import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { ResourceSearchSchema } from './$folderId'
import { AddOrEditCollectionDialog } from './allCollections'
import type { Resource } from '@/services/api/teacher/types/modelType'
import SendResForm from '@/components/teacher/resources/sendResForm'
import { ResourcesTable } from '@/components/teacher/resources/resources-table'
import { columns } from '@/components/teacher/resources/columns'
import { useFilterResource } from '@/hooks/teacher/use-filter-resource.ts'
import { queryClient } from '@/lib/queryClient'
import useGetResources, {
  getAllCollectionsQueryOptions,
  getResourcesQueryOptions,
  useGetAllCollections,
} from '@/services/api/teacher/collection/hooks'

export const Route = createFileRoute('/teacher/classes/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Teacher | Classes - EduManage' }],
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    queryClient.ensureQueryData(getAllCollectionsQueryOptions(false))
    queryClient.ensureQueryData(getResourcesQueryOptions(undefined, deps))
  },
  validateSearch: ResourceSearchSchema,
})

function RouteComponent() {
  const router = useRouter()
  /* get state from search params*/
  const { filters, setFilters } = useFilterResource(Route.id)

  /* when reload data */ 
  const refreshPage = () => {
    console.log('Refreshing page...')
    router.invalidate()
  }
  /* create pagination state */
  const paginationState = {
    pageIndex: filters.pageIndex ?? 1,
    pageSize: filters.pageSize ?? 5,
  }
  /* create */

  const { data: resourcesData } = useGetResources(undefined, filters)

  const data: Array<Resource> = resourcesData?.data ?? []
  const rowCount = resourcesData?.rowCount ?? 0

  /* default search value */
  /* collections folders*/
  const {
    data: folders,
    isLoading: isFoldersLoading,
    isError: isFoldersError,
    isFetching: isFoldersFetching,
    refetch: refetchFolders,
  } = useGetAllCollections(false)
  const hasFolders = (folders?.length ?? 0) > 0

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-[calc(100vh-64px)]">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Resource Management Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
              Upload new content, manage collections, and track shared
              resources.
            </p>
          </div>
        </div>
      </div>
      {isFoldersLoading ? (
        <div className="px-6 mb-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-sm text-slate-500 dark:text-slate-400">
            Loading folders before showing upload form...
          </div>
        </div>
      ) : isFoldersError || !hasFolders ? (
        <div className="px-6 mb-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">
                {isFoldersError ? "Couldn't load folders" : 'No folders found'}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isFoldersError
                  ? "We couldn't get folder data. Please try again or refresh the page."
                  : 'You need at least one folder to upload a resource. Please refresh and try again.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => refetchFolders()}
                disabled={isFoldersFetching}
                className="cursor-pointer rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Try again
              </button>
              <button
                onClick={refreshPage}
                className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Refresh page
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SendResForm folders={folders ?? []} />
      )}

      <div className="px-6 mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-between">
          <span>Collections</span>
          <Link
            to={'/teacher/classes/allCollections'}
            className="cursor-pointer text-primary text-xs font-semibold hover:underline"
          >
            View All
          </Link>
        </h3>
        {isFoldersError ? (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">
                Couldn&apos;t load folders
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                We couldn&apos;t get folder data. Please try again or refresh
                the page.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => refetchFolders()}
                disabled={isFoldersFetching}
                className="cursor-pointer rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Try again
              </button>
              <button
                onClick={refreshPage}
                className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Refresh page
              </button>
            </div>
          </div>
        ) : isFoldersLoading ? (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-sm text-slate-500 dark:text-slate-400">
            Loading collections...
          </div>
        ) : !hasFolders ? (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">
                No folders found
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Folder data is empty. Please refresh and try again.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => refetchFolders()}
                disabled={isFoldersFetching}
                className="cursor-pointer rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Try again
              </button>
              <button
                onClick={refreshPage}
                className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Refresh page
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders?.map((folder) => (
              <div key={folder.id} className="relative">
                <Link
                  to={`/teacher/classes/$folderId`}
                  params={{ folderId: folder.id.toString() }}
                  search={undefined}
                >
                  <div className="group cursor-pointer rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 py-9 transition-all hover:border-primary/50 hover:shadow-md">
                    <div className="flex items-start justify-between mb-3">
                      <span className="material-symbols-outlined text-4xl text-primary/80 group-hover:text-primary transition-colors filled">
                        folder
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {folder.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {folder.filesCount} files • {folder.sizeMB}MB
                    </p>
                  </div>
                </Link>
              </div>
            ))}
            <AddOrEditCollectionDialog
              role="add"
              refetchFolders={refetchFolders}
              className="group cursor-pointer rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-transparent p-4 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-all min-h-32"
            />
          </div>
        )}
      </div>
      <div className="sticky top-0 z-10 bg-background-light dark:bg-background-dark/95 backdrop-blur px-6 py-2 pb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-between">
          <span>All Resources</span>
        </h3>
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
  )
}
