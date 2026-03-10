// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table'
// import { Pen, Search, Trash } from 'lucide-react'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '../ui/dialog'
// import { Input } from '../ui/input'
// import { Label } from '../ui/label'
// import { Button } from '../ui/button'
// import { StudentProfileSchema } from './studentCard'
// import type { ColumnDef } from '@tanstack/react-table'
// import type { StudentModel } from '@/services/api/owner/types/modelTypes'
// import type { PaginationSchema } from '@/routes/owner/students.index'
// import {
//   useDeleteStudent,
//   useEditStudent,
//   useGetStudents,
// } from '@/services/api/owner/student/hooks'

// const args: PaginationSchema = {
//   page: 1,
//   search: '',
//   size: 10,
// }

// const columns: Array<ColumnDef<StudentModel>> = [
//   {
//     id: 'select',
//     cell: () => <input type="checkbox" />,
//   },
//   {
//     accessorKey: 'name',
//     header: 'Student Name',
//     cell: ({ row }) => {
//       const student = row.original

//       return (
//         <div className="flex items-center gap-3">
//           <img src={student.imgSrc} className="w-10 h-10 rounded-full" />

//           <div>
//             <div className="font-medium">{student.name}</div>
//             <div className="text-sm text-slate-500">{student.email}</div>
//           </div>
//         </div>
//       )
//     },
//   },
//   {
//     accessorKey: 'id',
//     header: 'ID Number',
//   },
//   {
//     accessorKey: 'grade',
//     header: 'Grade',
//   },
//   {
//     accessorKey: 'parentContact',
//     header: 'Parent Contact',
//     cell: ({ row }) => {
//       const student = row.original
//       return (
//         <div>
//           <div>{student.parentName}</div>
//           <div className="text-sm text-slate-500">
//             {student.parentPhoneNumber}
//           </div>
//         </div>
//       )
//     },
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     cell: ({ getValue }) => {
//       const status = getValue() as StudentModel['status']

//       const styles: { [key: string]: string } = {
//         Active: 'bg-green-100 text-green-700',
//         Inactive: 'bg-red-100 text-red-700',
//         Pending: 'bg-yellow-100 text-yellow-700',
//       }

//       return (
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
//         >
//           {status}
//         </span>
//       )
//     },
//   },
//   {
//     id: 'actions',
//     header: () => <div className="text-right">Actions</div>,
//     cell: ({ row }) => {
//       return <StudentActions student={row.original} />
//       //   <div className="flex gap-2 justify-end">
//       //     <button className="p-2 border rounded hover:bg-slate-100 cursor-pointer">
//       //       <Pen className="h-4 w-4 text-gray-500" />
//       //     </button>
//       //     <button className="p-2 border rounded hover:bg-slate-100 cursor-pointer">
//       //       <Trash
//       //         className={`h-4 w-4 text-gray-500 hover:`}
//       //         // onClick={() => deleteStudent(id)}
//       //       />
//       //     </button>
//       //   </div>
//     },
//   },
// ]

// export default function DataTable() {
//   const { data: data } = useGetStudents(args)

//   const table = useReactTable({
//     data: data?.data || [],
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })

//   return (
//     <div className="p-6">
//       <div className="flex justify-between mb-4">
//         <div className="flex items-center border border-gray-300 rounded-md px-4 py-1 w-full max-w-xl bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
//           <span className="material-symbols-outlined text-slate-400">
//             search
//           </span>
//           <input
//             type="text"
//             placeholder="Search by name, ID, or email..."
//             className="flex-1 outline-none text-gray-700 bg placeholder-gray-400 ml-1"
//           />
//         </div>
//         <div className="flex gap-3">
//           <select className="rounded-md px-3 py-2 cursor-pointer bg-white text-gray-600 shadow-sm focus:ring-2 focus:ring-blue-500">
//             <option>All Grades</option>``
//             <option>Grade 1</option>
//             <option>Grade 2</option>
//           </select>
//           <select className="rounded-md px-3 py-2 cursor-pointer bg-white text-gray-600 shadow-sm focus:ring-2 focus:ring-blue-500">
//             <option>All Status</option>
//             <option>Active</option>
//             <option>Inactive</option>
//             <option>Pending</option>
//           </select>
//           <select className="rounded-md px-3 py-2 cursor-pointer bg-white text-gray-600 shadow-sm focus:ring-2 focus:ring-blue-500">
//             <option>More Filters</option>
//           </select>
//         </div>
//       </div>

//       <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr
//                 key={headerGroup.id}
//                 className="bg-slate-50 border-b text-xs uppercase tracking-wider text-slate-500 font-semibold"
//               >
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id} className="p-4">
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext(),
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           <tbody className="divide-y divide-slate-100 text-sm">
//             {table.getRowModel().rows.map((row) => (
//               <tr
//                 key={row.id}
//                 className="hover:bg-slate-50 transition cursor-pointer"
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="p-4">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between items-center mt-4 text-sm text-slate-500">
//         <div>
//           Showing 1 to {data?.data.length} of {data?.data.length} students
//         </div>
//         <button className="border rounded-md px-4 py-2">Next</button>
//       </div>
//     </div>
//   )
// }

// function StudentActions({ student }: { student: StudentModel }) {
//   const { mutate: deleteStudent } = useDeleteStudent()
//   const { mutate: editStudent } = useEditStudent()

//   const form = useForm<StudentModel>({
//     defaultValues: {
//       id: student.id,
//       name: student.name,
//       email: student.email,
//       grade: student.grade,
//       parentPhoneNumber: student.parentPhoneNumber,
//       parentName: student.parentName,
//       status: student.status,
//       imgSrc: student.imgSrc,
//       gender: student.gender,
//     },
//     resolver: zodResolver(StudentProfileSchema),
//   })

//   return (
//     <div className=" flex items-center justify-end gap-2 transition-opacity">
//       <Dialog>
//         <form
//           onSubmit={form.handleSubmit((data) => {
//             editStudent(data)
//             console.log(data)
//           })}
//         >
//           <DialogTrigger
//             asChild
//             className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
//           >
//             <Button variant="outline" className="cursor-pointer">
//               <span className="material-symbols-outlined text-[20px]">
//                 edit
//               </span>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="min-w-200 sm:max-w-100 bg-slate-50 dark:bg-gray-800 text-black dark:text-slate-400">
//             <DialogHeader>
//               <DialogTitle>Edit profile</DialogTitle>
//               <DialogDescription>
//                 Make changes to your profile here. Click save when you&apos;re
//                 done.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4">
//               <div className="grid gap-3">
//                 <Label htmlFor="name">Name</Label>
//                 <Input id="name" {...form.register('name')} />
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" {...form.register('email')} />
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="grade">Grade</Label>
//                 <Input id="grade" {...form.register('grade')} />
//               </div>
//               <div className="grid gap-3">
//                 <div className="grid gap-3">
//                   <h1 className="underline">Parnets contacts :</h1>
//                   <Label htmlFor="parents-name">name</Label>
//                   <Input id="parents-name" {...form.register('parentName')} />
//                 </div>
//                 <div className="grid gap-3">
//                   <Label htmlFor="phone-number">Phone number</Label>
//                   <Input
//                     id="phone-number"
//                     {...form.register('parentPhoneNumber')}
//                   />
//                 </div>
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="status">Status</Label>
//                 <Input id="status" {...form.register('status')} />
//               </div>
//             </div>
//             <DialogFooter>
//               <DialogClose asChild>
//                 <Button variant="outline" className="cursor-pointer">
//                   Cancel
//                 </Button>
//               </DialogClose>
//               <Button type="submit" className="cursor-pointer text-white">
//                 Save changes
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </form>
//       </Dialog>
//       <Button
//         className="text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors cursor-pointer text-[25px] px-1.25 text-center"
//         title="Delete"
//         variant="outline"
//         onClick={() => deleteStudent(student.id)}
//       >
//         <span className="material-symbols-outlined text-[20px]">delete</span>
//       </Button>
//     </div>
//   )
// }

// this is the code of that tanstack table youtube

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DebouncedInput } from './debounceInput'
import type {
  ColumnDef,
  OnChangeFn,
  PaginationOptions,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import type { Filters } from '@/services/api/owner/types/apiTypes'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

type Props<T> = {
  data: Array<T>
  columns: Array<ColumnDef<T>>
  pagination: PaginationState
  paginationOptions: Pick<PaginationOptions, 'onPaginationChange' | 'rowCount'>
  filters: Filters<T>
  onFilterChange: (dataFilters: Partial<T>) => void
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
}

export default function Table<T>({
  data,
  columns,
  pagination,
  paginationOptions,
  filters,
  onFilterChange,
  sorting,
  onSortingChange,
}: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting },
    onSortingChange,
    ...paginationOptions,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const fieldMeta = header.column.columnDef.meta
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                            false: ' 🔃',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() &&
                        fieldMeta?.filterKey !== undefined ? (
                          <DebouncedInput
                            className="w-36 border shadow rounded"
                            onChange={(value) => {
                              onFilterChange({
                                [fieldMeta.filterKey as keyof T]: value,
                              } as Partial<T>)
                            }}
                            placeholder="Search..."
                            type={
                              fieldMeta.filterVariant === 'number'
                                ? 'number'
                                : 'text'
                            }
                            value={
                              filters[fieldMeta.filterKey] != null
                                ? (filters[fieldMeta.filterKey] as
                                    | string
                                    | number)
                                : ''
                            }
                          />
                        ) : null}
                      </>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex items-center gap-2 my-2">
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
