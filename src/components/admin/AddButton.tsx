import { Icon } from '@/components/ui/icon'
import { Link } from '@tanstack/react-router'

export default function AddButton({ role }: { role: string }) {
  return role.toLowerCase() === 'student' ? (
    <Link to="/admin/students/add">
      <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-sm shadow-blue-500/30 active:scale-95 cursor-pointer">
        <Icon name="add" className="text-[20px]" />
        <span>Add New Student</span>
      </button>
    </Link>
  ) : (
    <Link to="/admin/teachers/add">
      <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm shadow-blue-500/30 active:scale-95 cursor-pointer">
        <Icon name="add" className="text-[20px]" />
        <span className="font-medium">Add New Teacher</span>
      </button>
    </Link>
  )
}
