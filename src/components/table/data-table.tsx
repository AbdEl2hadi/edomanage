import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useEffect, useState } from 'react'
import type {
  ColumnDef,
  PaginationOptions,
  PaginationState,
} from '@tanstack/react-table'

import type {
  ResourceFilter,
  ResourceSortOption,
} from '../../services/api/teacher/types'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDebounce } from '@/hooks/use-debounce'

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

export function DataTable<T extends Record<string, string | number>>({
  columns,
  data,
  pagination,
  paginationOptions,
  filters,
  onFilterChange,
}: Props<T>) {
  const [localSearch, setLocalSearch] = useState(filters.fileName ?? '')
  const debouncedSearch = useDebounce(localSearch)

  useEffect(() => {
    setLocalSearch(filters.fileName ?? '')
  }, [filters.fileName])

  useEffect(() => {
    const nextFileName = debouncedSearch.trim()
    if ((filters.fileName ?? '') === nextFileName) {
      return
    }

    onFilterChange({
      fileName: nextFileName || undefined,
      pageIndex: 1,
    })
  }, [debouncedSearch, filters.fileName, onFilterChange])

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
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        <Table className="w-full border-collapse text-left text-sm text-slate-500 dark:text-slate-400">
          <TableHeader className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase text-slate-500 dark:text-slate-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="px-6 py-3 font-semibold"
                      scope="col"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center space-y-2"
                >
                  <p>No results.</p>
                  {hasActiveFilters && (
                    <button
                      className="text-sm font-medium text-primary hover:underline cursor-pointer"
                      onClick={clearFilters}
                      type="button"
                    >
                      Clear filters
                    </button>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 sm:px-6 mt-4 rounded-xl shadow-sm">
        <div className="hidden sm:flex flex-1 items-center justify-between">
          <div></div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                />
              </PaginationItem>
              {firstShownPage > 0 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {shownPages.map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={
                      table.getState().pagination.pageIndex === pageNumber
                    }
                    onClick={() => table.setPageIndex(pageNumber)}
                  >
                    {pageNumber + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {shownPages[shownPages.length - 1] < pageCount - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  )
}
