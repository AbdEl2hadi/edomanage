import { Link, createFileRoute } from '@tanstack/react-router'
import type { UICardType } from '@/components/owner/UICard'
import TeacherCard from '@/components/owner/teacherCard'
import UICardComponent from '@/components/owner/UICard'
import { useTeacherList } from '@/services/store/teacherListFunctions'

export const Route = createFileRoute('/owner/teachers/')({
  component: RouteComponent,
})

function RouteComponent() {
  const UICardList: Array<UICardType> = [
    {
      id: '0',
      iconName: 'school',
      iconColor: 'blue',
      stateIcon: 'trending_up',
      percentage: 5,
      cardTitle: 'Total Teachers',
      info: '42',
    },
    {
      id: '1',
      iconName: 'bolt',
      iconColor: 'green',
      stateIcon: 'trending_up',
      percentage: 2,
      cardTitle: 'Active Now',
      info: '38',
    },
    {
      id: '2',
      iconName: 'person_add',
      iconColor: 'purple',
      stateIcon: 'trending_up',
      percentage: 10,
      cardTitle: 'New This Month',
      info: '3',
    },
  ]
  const teacherList = useTeacherList((state) => state.teacherList)

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Faculty Directory
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              Manage and view all registered teachers.
            </p>
          </div>
          <Link to="/owner/teachers/add">
            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-sm shadow-blue-500/30 active:scale-95 cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="font-medium">Add New Teacher</span>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {UICardList.map((card) => (
            <UICardComponent {...card} key={card.id} />
          ))}
        </div>
        <div className="bg-slate-50 dark:bg-[#1E2532] text-slate-500 dark:text-slate-400 flex flex-col lg:flex-row gap-4 justify-between lg:items-cente p-4 rounded-xl border shadow-lg shadow-black/20">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-500">
                search
              </span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2.5 border bg-slate-50 dark:bg-[#1E2532] text-slate-500 dark:text-slate-400 rounded-lg leading-5  placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-shadow"
              placeholder="Search by name, email, or subject..."
              type="text"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <select
              className="flex items-center h-10 rounded-lg bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-slate-500 
    focus:ring-0 border border-slate-300 dark:border-gray-900 duration-200 dark:text-white  dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer"
            >
              <span>All Subjects</span>
              <span className="material-symbols-outlined text-[18px]">
                keyboard_arrow_down
              </span>
              <option>All Grades</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>
            <select
              className="flex items-center h-10 rounded-lg bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-slate-500 
    focus:ring-0 border border-slate-300 dark:border-gray-900 duration-200 dark:text-white  dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer"
            >
              <span>Status: Active</span>
              <span className="material-symbols-outlined text-[18px]">
                keyboard_arrow_down
              </span>
              <option>Any Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>
            <select
              className="flex items-center h-10 rounded-lg bg-gray-50 px-4 py-0 pr-8 text-sm font-medium text-slate-500 
    focus:ring-0 border border-slate-300 dark:border-gray-900 duration-200 dark:text-white  dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                sort
              </span>
              <option>Sort By</option>
              <option>name</option>
              <option>id</option>
              <option>grade</option>
            </select>
          </div>
        </div>
        <div className=" bg-surface-dark rounded-xl border border-slate-300 dark:border-gray-800 shadow-lg overflow-hidden flex flex-col">
          <div className=" overflow-x-auto shadow-lg ">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-gray-800">
              <thead className="bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-slate-400">
                <tr className="bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  <th
                    className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider"
                    scope="col"
                  >
                    Teacher
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider"
                    scope="col"
                  >
                    Subject
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider"
                    scope="col"
                  >
                    Contact
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider"
                    scope="col"
                  >
                    Status
                  </th>
                  <th
                    className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider"
                    scope="col"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                {teacherList.map((teacher) => (
                  <TeacherCard {...teacher} key={teacher.id} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 dark:bg-gray-800 text-slate-500 dark:text-slate-400 px-4 py-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-700 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  Showing
                  <span className="font-medium text-black dark:text-white">
                    1
                  </span>
                  to
                  <span className="font-medium text-black dark:text-white">
                    5
                  </span>
                  of
                  <span className="font-medium text-black dark:text-white">
                    42
                  </span>
                  results
                </p>
              </div>
              <div>
                <nav
                  aria-label="Pagination"
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px "
                >
                  <a
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border dark:border-slate-700 dark:bg-surface-dark text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                    href="#"
                  >
                    <span className="sr-only">Previous</span>
                    <span className="material-symbols-outlined text-[20px]">
                      chevron_left
                    </span>
                  </a>
                  <a
                    aria-current="page"
                    className="z-10 hover:bg-slate-50 border-primary text-blue-400 bg-white relative inline-flex items-center px-4 py-2 border  dark:border-slate-700 dark:bg-surface-dark text-sm font-medium"
                    href="#"
                  >
                    1
                  </a>
                  <a
                    className="hover:bg-slate-50 border-slate-700 text-slate-400 bg-whitepnpm  hover:text-white relative inline-flex items-center px-4 py-2 border text-sm  dark:border-slate-700 dark:bg-surface-dark font-medium transition-colors"
                    href="#"
                  >
                    2
                  </a>
                  <a
                    className="bg-surface-dark hover:bg-slate-50 hover:bg-slate-50 border-slate-700 text-slate-400 bg-white hover:bg-slate-800 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors dark:border-slate-700 dark:bg-surface-dark "
                    href="#"
                  >
                    3
                  </a>
                  <span className="relative  dark:border-slate-700 dark:bg-surface-dark hover:bg-slate-50 bg-white inline-flex items-center px-4 py-2 border border-slate-700 bg-surface-dark text-sm font-medium text-slate-500">
                    ...
                  </span>
                  <a
                    className=" hover:bg-slate-50 bg-surface-dark border-slate-700 text-slate-400 dark:border-slate-700 bg-white dark:bg-surface-dark  hover:bg-slate-800 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors"
                    href="#"
                  >
                    8
                  </a>
                  <a
                    className="relative hover:bg-slate-50 inline-flex items-center px-2 py-2 rounded-r-md border border-slate-700 bg-white bg-surface-dark  dark:border-slate-700 dark:bg-surface-dark text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                    href="#"
                  >
                    <span className="sr-only">Next</span>
                    <span className="material-symbols-outlined text-[20px]">
                      chevron_right
                    </span>
                  </a>
                </nav>
              </div>
            </div>
            <div className="flex items-center justify-between w-full sm:hidden">
              <a
                className="relative inline-flex items-center px-4 py-2 border border-slate-700 text-sm font-medium rounded-md text-slate-300 bg-slate-800 hover:bg-slate-700"
                href="#"
              >
                Previous
              </a>
              <a
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-700 text-sm font-medium rounded-md text-slate-300 bg-slate-800 hover:bg-slate-700"
                href="#"
              >
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
