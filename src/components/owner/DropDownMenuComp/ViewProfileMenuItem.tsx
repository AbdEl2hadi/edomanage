import { Link } from '@tanstack/react-router'
import { Eye } from 'lucide-react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

type Props = {
  role: 'student' | 'teacher'
  id: string
}

export default function ViewProfileMenuItem({ role, id }: Props) {
  return (
    <DropdownMenuItem asChild>
      <Link
        to={
          role === 'student'
            ? '/owner/students/$studentId'
            : '/owner/teachers/$teacherId'
        }
        params={role === 'student' ? { studentId: id } : { teacherId: id }}
        className="flex items-center justify-center gap-2 cursor-pointer ttext-dark dark:text-white hover:bg-gray-200 py-1.5 rounded-sm"
      >
        <Eye size="18" />
        <p>View | Edit Profile</p>
      </Link>
    </DropdownMenuItem>
  )
}
