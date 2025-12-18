import { createFileRoute } from '@tanstack/react-router'
import StudentCard from '@/components/owner/studentCard'
import { useStudentList } from '@/services/store/student_List_Functions'

export const Route = createFileRoute('/owner/students')({
  component: RouteComponent,
})

function RouteComponent() {
  const studentList = useStudentList((state) => state.studentList)
  const addS = useStudentList((state) => state.addS)
  return (
    <main>
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Student Directory
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                Manage student enrollments, records, and academic status.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-sm shadow-blue-500/30 active:scale-95 cursor-pointer"
            // onClick={addS{student}}
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Add Student</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-700 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-500/20 rounded-lg text-primary dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <span className="flex items-center text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full border border-transparent dark:border-green-500/10">
                  <span className="material-symbols-outlined text-sm mr-1">
                    trending_up
                  </span>
                  +5%
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Total Students
              </p>
              <h3 className="text-2xl font-bold text-[#111318] dark:text-white mt-1">
                452
              </h3>
            </div>
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-700 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-50 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">person_add</span>
                </div>
                <span className="flex items-center text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full border border-transparent dark:border-green-500/10">
                  <span className="material-symbols-outlined text-sm mr-1">
                    trending_up
                  </span>
                  +12%
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                New Enrollments
              </p>
              <h3 className="text-2xl font-bold text-[#111318] dark:text-white mt-1">
                34
              </h3>
            </div>
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-700 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-50 dark:bg-orange-500/20 rounded-lg text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">
                    calendar_month
                  </span>
                </div>
                <span className="flex items-center text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full border border-transparent dark:border-green-500/10">
                  <span className="material-symbols-outlined text-sm mr-1">
                    trending_up
                  </span>
                  96%
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Average Attendance
              </p>
              <h3 className="text-2xl font-bold text-[#111318] dark:text-white mt-1">
                Last 30 days
              </h3>
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-4 justify-between items-center">
              <div className="flex w-full lg:w-auto gap-3 items-center flex-1">
                <div className="relative w-full max-w-md">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    search
                  </span>
                  <input
                    className="w-full pl-10 pr-4 h-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm dark:text-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400"
                    placeholder="Search by name, ID, or email..."
                    type="text"
                  />
                </div>
              </div>
              <div className="flex w-full lg:w-auto gap-3 overflow-x-auto pb-1 lg:pb-0">
                <select
                  className="flex items-center h-10 rounded-lg border-none bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-slate-500 
    focus:ring-0 border-slate-100 dark:border-gray-700/50  duration-200 dark:text-white  dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer"
                >
                  <option>All Grades</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                </select>
                <select
                  className="flex items-center h-10 rounded-lg border-none bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-slate-500 
    focus:ring-0 border-slate-100 dark:border-gray-700/50  duration-200 dark:text-white  dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer"
                >
                  // h-10 rounded-lg border-none bg-gray-50 px-4 py-0 pr-8
                  text-sm font-medium text-gray-600 // focus:ring-0
                  dark:bg-gray-800 dark:text-gray-300 cursor-pointer //
                  hover:bg-gray-100 dark:hover:bg-gray-700 //
                  hover:text-gray-700 dark:hover:text-gray-100 //
                  transition-colors duration-200
                  <option>Any Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
                <button
                  className=" flex items-center h-10 rounded-lg border-none bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-slate-500 
    focus:ring-0 border-slate-100 dark:border-gray-700/50  duration-200 dark:text-white  dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    filter_list
                  </span>
                  <span>More Filters</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="p-4 w-10"></th>
                    <th className="p-4 min-w-60">Student Name</th>
                    <th className="p-4">ID Number</th>
                    <th className="p-4">Grade</th>
                    <th className="p-4 min-w-40">Parent Contact</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {studentList.map((student) => (
                    <StudentCard {...student} key={student.id} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing
                <span className="font-semibold text-slate-900 dark:text-white">
                  1-10
                </span>
                of
                <span className="font-semibold text-slate-900 dark:text-white">
                  452
                </span>
                students
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors"
                  disabled
                >
                  Previous
                </button>
                <div className="flex items-center">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors">
                    3
                  </button>
                  <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">
                    ...
                  </span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors">
                    12
                  </button>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
          <footer className="mt-12 mb-6 text-center text-xs text-slate-400">
            © 2026 EduManage School System. All rights reserved.
          </footer>
        </div>
      </div>
    </main>
  )
}
