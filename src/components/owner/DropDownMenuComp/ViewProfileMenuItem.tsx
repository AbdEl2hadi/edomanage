// import { Link } from '@tanstack/react-router'
// import { Eye } from 'lucide-react'
// import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

// type Props = {
//   role: 'student' | 'teacher'
//   id: string
// }

// export default function ViewProfileMenuItem({ role, id }: Props) {
//   return (
//     <DropdownMenuItem asChild>
//       <Link
//         to={
//           role === 'student'
//             ? '/admin/students/$studentId'
//             : '/admin/teachers/$teacherId'
//         }
//         params={role === 'student' ? { studentId: id } : { teacherId: id }}
//         className="flex items-center justify-center gap-2 cursor-pointer ttext-dark dark:text-white hover:bg-gray-200 py-1.5 rounded-sm"
//       >
//         <Eye size="18" />
//         <p>View | Edit Profile</p>
//       </Link>
//     </DropdownMenuItem>
//   )
// }

import { Link } from '@tanstack/react-router'
import { Eye } from 'lucide-react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

type Props = {
  role: 'student' | 'teacher'
  id: string | undefined
}

export default function ViewProfileMenuItem({ role, id }: Props) {
  if (role === 'student') {
    return (
      <DropdownMenuItem asChild>
        {id && (
          <Link
            to={`/admin/students/$studentId`}
            params={{ studentId: id }}
            className="flex items-center gap-2 cursor-pointer text-dark dark:text-white hover:bg-gray-200 py-1.5 rounded-sm"
          >
            <Eye size={18} />
            <span>View | Edit Profile</span>
          </Link>
        )}
      </DropdownMenuItem>
    )
  }

  return (
    <DropdownMenuItem asChild>
      {id && (
        <Link
          to={`/admin/teachers/$teacherId`}
          params={{ teacherId: id }}
          className="flex items-center gap-2 cursor-pointer text-dark dark:text-white hover:bg-gray-200 py-1.5 rounded-sm"
        >
          <Eye size={18} />
          <span>View | Edit Profile</span>
        </Link>
      )}
    </DropdownMenuItem>
  )
}
