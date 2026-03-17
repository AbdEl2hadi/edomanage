import * as React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { StudentColumns, TeacherColumns } from './columnsData'
import type {
  ColumnFiltersState,
  SortingState,
  Table as Tab,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetStudents } from '@/services/api/owner/student/hooks'
import { useGetTeachers } from '@/services/api/owner/teacher/hooks'

export type filter = {
  label: string
  value: string | null
}

interface DataTableProps<TData, TValue> {
  table: Tab<TData>
  filters?: Array<Array<filter>>
}

// Basic component used by the StudentTable and TeacherTable components

export function DataTable<TData, TValue>({
  table,
  filters,
}: DataTableProps<TData, TValue>) {
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        <div className="flex items-center py-4 px-4 justify-between">
          <div>
            <Input
              placeholder="Filter emails..."
              value={table.getColumn('email')?.getFilterValue() as string}
              onChange={(event) =>
                table.getColumn('email')?.setFilterValue(event.target.value)
              }
              className="min-w-sm px-4 py-2 rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-gray-800 text-sm dark:text-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder={filters && filters[0][0].label} />
              </SelectTrigger>
              <SelectContent className="w-full max-w-48">
                <SelectGroup className="p-2 bg-background-light">
                  <SelectLabel>Fruits</SelectLabel>
                  {filters &&
                    filters[0]?.map((item) => (
                      <>
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                        <SelectSeparator />
                      </>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder={filters && filters[1][0].label} />
              </SelectTrigger>
              <SelectContent className="w-full max-w-48">
                <SelectGroup className="p-2 bg-background-light">
                  <SelectLabel>Subjects</SelectLabel>
                  {filters &&
                    filters[1].map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table className="w-full table-fixed border-collapse text-left text-sm text-slate-500 dark:text-slate-400">
          <TableHeader className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase text-slate-500 dark:text-slate-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="px-3 py-3 font-semibold overflow-hidden"
                      style={
                        header.column.columnDef.size
                          ? { width: `${header.column.columnDef.size}%` }
                          : undefined
                      }
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
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/50`}
                  // onClick={() => {
                  //   tableMeta?.onRowClick?.(row.original)
                  // }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-3 py-3 overflow-hidden"
                    >
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
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center space-y-2"
                >
                  <p>No results.</p>
                  {/* {hasActiveFilters && (
                    <button
                      className="text-sm font-medium text-primary hover:underline cursor-pointer"
                      onClick={clearFilters}
                      type="button"
                    >
                      Clear filters
                    </button>
                  )} */}
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
                <span>
                  Page {table.getState().pagination.pageIndex + 1} of
                  {table.getPageCount()}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                />
              </PaginationItem>
              <PaginationItem>
                <input
                  id="page-input"
                  value={table.getState().pagination.pageIndex + 1}
                  type="number"
                  onChange={(e) => {
                    let page = Number(e.target.value)
                    const pageCount = table.getPageCount()
                    if (page < 1) page = 1
                    if (page > pageCount) page = pageCount
                    table.setPageIndex(page - 1)
                  }}
                  className={`w-16 p-1 border rounded-md text-center focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                />
              </PaginationItem>

              {/* {firstShownPage > 0 && (
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
              ))} */}
              {/* {shownPages[shownPages.length - 1] < pageCount - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )} */}
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

// uses DataTable component
// when the data changes or refetch only this component will re-render not the whole page

export function StudentTable({ filters }: { filters: Array<Array<filter>> }) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const { data: studentsData } = useGetStudents({})

  const table = useReactTable({
    data: studentsData?.data ?? [],
    columns: StudentColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  })

  return <DataTable table={table} filters={filters}></DataTable>
}

// uses DataTable component
// when the data changes or refetch only this component will re-render not the whole page

export function TeacherTable({ filters }: { filters: Array<Array<filter>> }) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const { data: teachersData } = useGetTeachers()

  const data = React.useMemo(() => {
    return teachersData?.data ?? []
  }, [teachersData?.data])

  const table = useReactTable({
    data: data,
    columns: TeacherColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  })

  return <DataTable table={table} filters={filters}></DataTable>
}
