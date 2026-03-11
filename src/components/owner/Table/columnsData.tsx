import { ArrowUpDown, MoreHorizontal, Trash2Icon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { ColumnDef } from '@tanstack/react-table'
import type {
  StudentModel,
  TeacherModel,
} from '@/services/api/owner/types/modelTypes'
import ProfilePicGenerator from '@/components/owner/profilePicGenerator'
import { Button } from '@/components/ui/button'

import { Checkbox } from '@/components/ui/checkbox'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  useDeleteStudent,
  useEditStudent,
} from '@/services/api/owner/student/hooks'

// definition for the student columns in the student table
export const StudentColumns: Array<ColumnDef<StudentModel>> = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    size: 5,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'imgSrc',
    header: '',
    size: 10,
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="flex items-center justify-center">
          <ProfilePicGenerator name={student.name} imgSrc={student.imgSrc} />
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    size: 20,
    cell: ({ row }) => (
      <span className="font-medium text-slate-900 dark:text-white">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    size: 28,
    cell: ({ row }) => (
      <div className="text-sm text-slate-700 dark:text-slate-300 truncate w-full">
        {row.original.email}
      </div>
    ),
  },
  {
    accessorKey: 'grade',
    header: 'Grade',
    size: 15,
    cell: ({ row }) => (
      <span className="font-medium text-slate-800 dark:text-slate-200">
        {row.original.grade}
      </span>
    ),
  },
  {
    accessorKey: 'parentName',
    header: "Parent's Name",
    size: 15,
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="flex flex-col text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">{student.parentName}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {student.parentPhoneNumber}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 10,
    cell: ({ row }) => {
      const student = row.original
      const bgColor =
        student.status === 'Active'
          ? 'bg-green-100 text-green-800'
          : student.status === 'Inactive'
            ? 'bg-red-100 text-red-800'
            : student.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
      return (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${bgColor} `}
        >
          {student.status}
        </span>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 10,
    cell: ({ row }) => {
      const student = row.original
      const { mutate: editStudent } = useEditStudent()
      const { mutate: deleteStudent } = useDeleteStudent()
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 ring-2 ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 bg-white dark:bg-slate-800"
            >
              <DropdownMenuLabel className=" text-dark dark:text-white">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer  text-dark dark:text-white"
                onClick={() => {
                  navigator.clipboard.writeText(student.id)
                  toast.success('Student ID has been copied')
                }}
              >
                Copy Student ID
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-300" />

              <DropdownMenuItem className="cursor-pointer text-dark dark:text-white">
                <Link to="/owner/$studentId" params={{ studentId: student.id }}>
                  View Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-300" />
              <DropdownMenuItem className="cursor-pointer  text-dark dark:text-white">
                Edit Student
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-300" />
              <DropdownMenuItem asChild className="cursor-pointer">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="text-dark dark:text-white"
                      size="sm"
                    >
                      Delete Student
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogMedia className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400">
                        <Trash2Icon className="h-6 w-6" />
                      </AlertDialogMedia>
                      <AlertDialogTitle>Delete Student?</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-700 dark:text-slate-300">
                        This will permanently delete this student record. This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="space-x-2">
                      <AlertDialogCancel variant="outline">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

// definition for the teacher columns in the teacher table
export const TeacherColumns: Array<ColumnDef<TeacherModel>> = [
  {
    accessorKey: 'imgSrc',
    header: '',
    size: 10,
    cell: ({ row }) => {
      const teacher = row.original
      return (
        <div className="flex items-center justify-center">
          <ProfilePicGenerator name={teacher.name} imgSrc={teacher.imgSrc} />
        </div>
      )
    },
  },

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    size: 20,
    cell: ({ row }) => (
      <span className="font-medium text-slate-900 dark:text-white">
        {row.original.name}
      </span>
    ),
  },

  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    size: 28,
    cell: ({ row }) => (
      <div className="text-sm text-slate-700 dark:text-slate-300 truncate w-full">
        {row.original.email}
      </div>
    ),
  },

  {
    accessorKey: 'gender',
    header: 'Gender',
    size: 10,
    cell: ({ row }) => (
      <span className="capitalize">{row.original.gender}</span>
    ),
  },

  {
    accessorKey: 'departement',
    header: 'Department',
    size: 15,
  },

  {
    accessorKey: 'subjects',
    header: 'Subjects',
    size: 20,
    cell: ({ row }) => (
      <div className="text-sm text-slate-700 dark:text-slate-300 truncate">
        {row.original.subjects.join(', ')}
      </div>
    ),
  },

  {
    accessorKey: 'status',
    header: 'Status',
    size: 10,
    cell: ({ row }) => {
      const teacher = row.original

      const bgColor =
        teacher.status === 'Active'
          ? 'bg-green-100 text-green-800'
          : teacher.status === 'Inactive'
            ? 'bg-red-100 text-red-800'
            : teacher.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'

      return (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${bgColor}`}
        >
          {teacher.status}
        </span>
      )
    },
  },

  {
    id: 'actions',
    header: 'Actions',
    size: 10,
    cell: ({ row }) => {
      const teacher = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-44 bg-white dark:bg-slate-800"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(teacher.id)}
              >
                Copy Teacher ID
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                View Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-red-600" />
              <DropdownMenuItem className="cursor-pointer">
                Edit Teacher
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Delete Teacher
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
