import type {
  StudentModel,
  TeacherModel,
} from '@/services/api/owner/types/modelTypes'
import type { ColumnDef } from '@tanstack/react-table'
import ProfilePicGenerator from '@/components/owner/profilePicGenerator'

export const StudentColumns: Array<ColumnDef<StudentModel>> = [
  {
    accessorKey: 'imgSrc',
    header: '',
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="flex items-center gap-3">
          <ProfilePicGenerator name={student.name} imgSrc={student.imgSrc} />
        </div>
      )
    },
  },
  {
    accessorKey: 'Full Name',
    header: 'Name',
    cell: ({ row }) => {
      const student = row.original
      return (
        <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary">
          {student.name}
        </span>
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const student = row.original
      return <span>{student.email}</span>
    },
  },
  {
    accessorKey: 'grade',
    header: 'Grade',
    cell: ({ row }) => {
      const student = row.original
      return <span>{student.grade}</span>
    },
  },
  {
    accessorKey: 'parentName',
    header: "Parent's Name",
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="flex flex-col gap-1">
          <span>{student.parentName}</span>
          <span>{student.parentPhoneNumber}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const student = row.original
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {student.status}
        </span>
      )
    },
  },
]

export const TeacherColumns: Array<ColumnDef<TeacherModel, unknown>> = [
  { accessorKey: 'number', header: 'Number' },
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'address', header: 'Address' },
  {
    accessorKey: 'subjects',
    header: 'Subjects',
    cell: ({ row }) => row.original.subjects.join(', '),
  },
  { accessorKey: 'departement', header: 'Department' },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
    cell: ({ row }) => new Date(row.original.dateOfBirth).toLocaleDateString(),
  },
  {
    accessorKey: 'joiningDate',
    header: 'Joining Date',
    cell: ({ row }) => new Date(row.original.joiningDate).toLocaleDateString(),
  },
  {
    accessorKey: 'imgSrc',
    header: 'Profile Image',
    cell: ({ row }) =>
      row.original.imgSrc ? (
        <img
          src={row.original.imgSrc}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      ) : (
        'N/A'
      ),
  },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'role', header: 'Role' },
]
