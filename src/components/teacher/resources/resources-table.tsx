import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { useEffect, useState } from 'react'
import type {
  ColumnDef,
  PaginationOptions,
  PaginationState,
} from '@tanstack/react-table'
/* filter types*/
import type { ResourceFilter } from '../../../services/api/teacher/types/apiType'
import type { ResourceSortOption } from '../../../services/api/teacher/types/modelType'

import { useDebounce } from '@/hooks/use-debounce'
import { DataTable } from '@/components/table/data-table'

type Props<T extends Record<string, string | number>> = {
  data: Array<T>
  columns: Array<ColumnDef<T>>
  pagination: PaginationState
  paginationOptions: {
    onPaginationChange: NonNullable<PaginationOptions['onPaginationChange']>
    rowCount: number
  }
  filters: ResourceFilter
  onFilterChange: (dataFilters: Partial<ResourceFilter>) => void
}

export function ResourcesTable<T extends Record<string, string | number>>({
  data,
  columns,
  pagination,
  paginationOptions,
  filters,
  onFilterChange,
}: Props<T>) {

  /* handling table */
  const tablePagination = {
    pageIndex: Math.max(pagination.pageIndex - 1, 0),
    pageSize: pagination.pageSize,
  }
  const pageCount = Math.max(
    1,
    Math.ceil(paginationOptions.rowCount / tablePagination.pageSize),
  )

  const visiblePages = 3
  const currentPageIndex = tablePagination.pageIndex
  const firstShownPage = Math.max(
    0,
    Math.min(currentPageIndex - 1, pageCount - visiblePages),
  )

  const shownPages = Array.from(
    {
      length: Math.min(visiblePages, pageCount - firstShownPage),
    },
    (_, index) => firstShownPage + index,
  )

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) =>
      key !== 'pageIndex' && key !== 'pageSize' && Boolean(value),
  )

  const clearFilters = () => {
    const cleanedFilters = Object.keys(filters).reduce<
      Record<string, undefined>
    >((acc, key) => {
      if (key !== 'pageIndex' && key !== 'pageSize') {
        acc[key] = undefined
      }
      return acc
    }, {})

    onFilterChange(cleanedFilters)
  }

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    rowCount: paginationOptions.rowCount,
    state: {
      pagination: tablePagination,
    },
    onPaginationChange: (updater) => {
      const nextPagination =
        typeof updater === 'function' ? updater(tablePagination) : updater

      paginationOptions.onPaginationChange({
        pageIndex: nextPagination.pageIndex + 1,
        pageSize: nextPagination.pageSize,
      })
    },
    getCoreRowModel: getCoreRowModel(),
  })
  /* Search logic */

  const [localSearch, setLocalSearch] = useState(filters.fileName ?? '')
  const debouncedSearch = useDebounce(localSearch)

  useEffect(() => {
    setLocalSearch(filters.fileName ?? '')
  }, [filters.fileName])

  useEffect(() => {
    const nextFileName = debouncedSearch.trim()

    
    if (nextFileName !== localSearch.trim()) {
      return
    }

    if ((filters.fileName ?? '') === nextFileName) {
      return
    }

    onFilterChange({
      fileName: nextFileName || undefined,
      pageIndex: 1,
    })
  }, [debouncedSearch, filters.fileName, onFilterChange])

  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="material-symbols-outlined text-slate-400">
              search
            </span>
          </div>
          <input
            className="block w-full rounded-lg border-none bg-white dark:bg-slate-800 py-2.5 pl-10 pr-3 text-sm text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-primary"
            placeholder="Search files in collection..."
            type="text"
            value={localSearch}
            onChange={(event) => {
              setLocalSearch(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key !== 'Enter') {
                return
              }

              event.preventDefault()
              const nextFileName = localSearch.trim()
              setLocalSearch(nextFileName)
              onFilterChange({
                fileName: nextFileName || undefined,
                pageIndex: 1,
              })
            }}
          />
        </div>
        <div className="flex gap-3">
          <select
            className="block w-full sm:w-40 rounded-lg border-none bg-white dark:bg-slate-800 py-2.5 pl-3 pr-10 text-sm text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary cursor-pointer"
            value={filters.type ?? ''}
            onChange={(event) => {
              const nextType = event.target.value
              onFilterChange({
                type: nextType || undefined,
                pageIndex: 1,
              })
            }}
          >
            <option value="">All Types</option>
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
            <option value="xlsx">XLSX</option>
            <option value="png">PNG</option>
            <option value="zip">ZIP</option>
          </select>
          <select
            className="block w-full sm:w-40 rounded-lg border-none bg-white dark:bg-slate-800 py-2.5 pl-3 pr-10 text-sm text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary cursor-pointer"
            value={filters.sortBy ?? 'newest'}
            onChange={(event) => {
              const nextSortBy = event.target.value as ResourceSortOption
              onFilterChange({
                sortBy: nextSortBy,
                pageIndex: 1,
              })
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="size">Size</option>
          </select>
        </div>
      </div>
      <DataTable
        table={table}
        columns={columns}
        firstShownPage={firstShownPage}
        pageCount={pageCount}
        shownPages={shownPages}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
      />
    </>
  )
}
