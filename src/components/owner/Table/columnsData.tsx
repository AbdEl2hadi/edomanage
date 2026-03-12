import {
  ArrowUpDown,
  Copy,
  Edit2,
  Eye,
  MoreHorizontal,
  Trash2,
  Trash2Icon,
} from 'lucide-react'

import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'

import DatePickerField from '../DatePickerField'
import type { ColumnDef } from '@tanstack/react-table'
import type {
  StudentModel,
  TeacherModel,
} from '@/services/api/owner/types/modelTypes'
import { StudentSchema } from '@/services/api/owner/types/modelTypes'
import ProfilePicGenerator from '@/components/owner/profilePicGenerator'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
      const [date, setDate] = React.useState<Date>()
      const { mutate: editStudent } = useEditStudent()
      const onSubmit = (data: StudentModel) => {
        editStudent(data)
      }
      const { mutate: deleteStudent } = useDeleteStudent()
      const studentForm = useForm({
        defaultValues: {
          name: student.name,
          email: student.email,
          grade: student.grade,
          parentName: student.parentName,
          parentPhoneNumber: student.parentPhoneNumber,
          status: student.status,
          gender: student.gender,
          address: student.address,
          dateOfBirth: student.dateOfBirth,
          enrollmentDate: student.enrollmentDate,
          imgSrc: student.imgSrc,
        },
        resolver: zodResolver(StudentSchema),
      })
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
              <DropdownMenuLabel className="text-dark dark:text-white">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-black" />

              <DropdownMenuItem asChild>
                <div
                  className="flex items-center justify-center gap-2 cursor-pointer text-dark dark:text-white hover:bg-gray-200 py-1.5 rounded-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(student.id)
                    toast.success('Student ID has been copied')
                  }}
                >
                  <Copy size="18" />
                  <p>Copy Student ID</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-300" />

              <DropdownMenuItem asChild>
                <Link
                  to="/owner/$studentId"
                  params={{ studentId: student.id }}
                  className="flex items-center justify-center gap-2 cursor-pointer ttext-dark dark:text-white hover:bg-gray-200 py-1.5 rounded-sm"
                >
                  <Eye size="18" />
                  <p>View Profile</p>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-300" />

              <DropdownMenuItem asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex items-center gap-2 justify-center cursor-pointer text-center text-dark dark:text-white hover:bg-gray-200 py-1.5 rounded-sm">
                      <Edit2 size="18" />
                      <p className=" text-sm">Edit Student</p>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Student</DialogTitle>
                      <DialogDescription>
                        Update the student information and click save.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={studentForm.handleSubmit(onSubmit)}>
                      <FieldGroup className="grid grid-cols-2 gap-4">
                        <Field>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" {...studentForm.register('name')} />
                        </Field>

                        <Field>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            {...studentForm.register('email')}
                          />
                        </Field>

                        <Field>
                          <Label htmlFor="grade">Grade</Label>
                          <Input
                            id="grade"
                            {...studentForm.register('grade')}
                          />
                        </Field>
                        <Field>
                          <Label htmlFor="status">Status</Label>
                          <Select {...studentForm.register('status')}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={student.status} />
                            </SelectTrigger>
                            <SelectContent className="bg-background-light">
                              <SelectItem
                                value="Active"
                                className="hover:bg-gray-200"
                              >
                                Active
                              </SelectItem>
                              <SelectSeparator className="bg-gray-200" />
                              <SelectItem
                                value="Inactive"
                                className="hover:bg-gray-200"
                              >
                                Inactive
                              </SelectItem>
                              <SelectSeparator className="bg-gray-200" />
                              <SelectItem
                                value="Pending"
                                className="hover:bg-gray-200"
                              >
                                Pending
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field>
                          <Label htmlFor="parentName">Parent Name</Label>
                          <Input
                            id="parentName"
                            {...studentForm.register('parentName')}
                          />
                        </Field>

                        <Field>
                          <Label htmlFor="parentPhoneNumber">
                            Parent Phone
                          </Label>
                          <Input
                            id="parentPhoneNumber"
                            {...studentForm.register('parentPhoneNumber')}
                          />
                        </Field>
                        <Field>
                          <Label htmlFor="gender">Gender</Label>

                          <Select {...studentForm.register('gender')}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={student.gender} />
                            </SelectTrigger>

                            <SelectContent className="bg-background-light">
                              <SelectItem
                                value="male"
                                className="hover:bg-gray-200"
                              >
                                Male
                              </SelectItem>
                              <SelectSeparator className="bg-gray-200" />
                              <SelectItem
                                value="female"
                                className="hover:bg-gray-200"
                              >
                                Female
                              </SelectItem>
                              <SelectSeparator className="bg-gray-200" />
                              <SelectItem
                                value="other"
                                className="hover:bg-gray-200"
                              >
                                Other
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field>
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            {...studentForm.register('address')}
                          />
                        </Field>

                        {/* <div className="flex flex-col gap-2">
                          <Label>Birth Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                data-empty={!date}
                                className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                              >
                                {date ? (
                                  format(date, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <ChevronDownIcon data-icon="inline-end" />
                              </Button>
                            </PopoverTrigger>

                            <PopoverContent
                              className="w-auto p-0 bg-background-light"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                defaultMonth={date}
                              />
                            </PopoverContent>
                          </Popover>
                        </div> */}
                        <DatePickerField
                          name="dateOfBirth"
                          label="Birth Date"
                          form={studentForm}
                        />

                        <DatePickerField
                          name="enrollmentDate"
                          label="Enrollment Date"
                          form={studentForm}
                        />
                        {/* 
                        <Field>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="enrollmentDate">
                              Enrollment Date
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  data-empty={
                                    !studentForm.getValues('enrollmentDate')
                                  }
                                  className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                  {studentForm.getValues('enrollmentDate') ? (
                                    format(
                                      new Date(
                                        studentForm.getValues('enrollmentDate'),
                                      ),
                                      'PPP',
                                    )
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <ChevronDownIcon data-icon="inline-end" />
                                </Button>
                              </PopoverTrigger>

                              <PopoverContent
                                className="w-auto p-0 bg-background-light"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    studentForm.getValues('enrollmentDate')
                                      ? new Date(
                                          studentForm.getValues(
                                            'enrollmentDate',
                                          ),
                                        )
                                      : undefined
                                  }
                                  onSelect={(date) => {
                                    if (date)
                                      studentForm.setValue(
                                        'enrollmentDate',
                                        date.toISOString(),
                                      )
                                  }}
                                  defaultMonth={
                                    studentForm.getValues('enrollmentDate')
                                      ? new Date(
                                          studentForm.getValues(
                                            'enrollmentDate',
                                          ),
                                        )
                                      : undefined
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </Field>
 */}
                        <Field className="col-span-2">
                          <Label htmlFor="imgSrc">Profile Image URL</Label>
                          <Input
                            id="imgSrc"
                            {...studentForm.register('imgSrc')}
                          />
                          {studentForm.formState.errors.imgSrc && (
                            <p className="text-red-500">
                              {studentForm.formState.errors.imgSrc.message}
                            </p>
                          )}
                        </Field>
                      </FieldGroup>

                      <DialogFooter className="mt-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-300" />

              <DropdownMenuItem asChild>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex items-center gap-2 justify-center cursor-pointer text-center text-red-600 dark:text-red-400 hover:bg-gray-200 py-1.5 rounded-sm">
                      <Trash2 size="18" />
                      <p className="text-sm">Delete Student</p>
                    </div>
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
                      <AlertDialogCancel
                        variant="outline"
                        className="cursor-pointer"
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="cursor-pointer bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500"
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
