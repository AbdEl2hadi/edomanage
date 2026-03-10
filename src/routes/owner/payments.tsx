import { createFileRoute } from '@tanstack/react-router'

import {
  flexRender,
} from '@tanstack/react-table'
import type { Table as Tab } from '@tanstack/react-table'

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

export const Route = createFileRoute('/owner/payments')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Owner | Payments - EduManage' }],
  }),
})

const Select1 = [
  { label: 'Select a fruit', value: null },
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple' },
]
const Select2 = [
  { label: 'Select a subject', value: null },
  { label: 'Math', value: 'math' },
  { label: 'Science', value: 'science' },
  { label: 'History', value: 'history' },
  { label: 'Literature', value: 'literature' },
  { label: 'Art', value: 'art' },
]

interface DataTableProps<TData, TValue> {
  table: Tab<TData>
}

export function DataTable<TData, TValue>({
  table,
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
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent className="w-full max-w-48">
                <SelectGroup className="p-2 bg-background-light">
                  <SelectLabel>Fruits</SelectLabel>
                  {Select1.map((item) => (
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
                <SelectValue placeholder="subjects" />
              </SelectTrigger>
              <SelectContent className="w-full max-w-48">
                <SelectGroup>
                  <SelectLabel>Subjects</SelectLabel>
                  {Select2.map((item) => (
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
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
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

function RouteComponent() {
  return 'hello world'
  // return <DataTable columns={columns} data={payments} />
}
