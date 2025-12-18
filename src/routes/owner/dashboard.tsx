import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full w-full overflow-y-auto">
      <main className="flex-1 flex flex-col h-full  bg-background-light dark:bg-background-dark relative transition-colors duration-200">
        {/* addition should be disscussed */}

        {/* <header className="h-16 bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 md:px-8 shrink-0">
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <a
              className="text-slate-500 hover:text-primary transition-colors"
              href="#"
            >
              Dashboard
            </a>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 dark:text-white font-medium">
              Student Directory
            </span>
          </div>
        </header> */}

        <div className="flex-1 min-h-full p-8 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-700 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-500/20 rounded-lg text-primary dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">school</span>
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
                  1,240
                </h3>
              </div>
              <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-700 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-purple-50 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">group</span>
                  </div>
                  <span className="flex items-center text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full border border-transparent dark:border-green-500/10">
                    <span className="material-symbols-outlined text-sm mr-1">
                      trending_up
                    </span>{' '}
                    +2%
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Total Teachers
                </p>
                <h3 className="text-2xl font-bold text-[#111318] dark:text-white mt-1">
                  85
                </h3>
              </div>
              <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-700 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <span className="flex items-center text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full border border-transparent dark:border-green-500/10">
                    <span className="material-symbols-outlined text-sm mr-1">
                      trending_up
                    </span>{' '}
                    +12%
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Monthly Revenue
                </p>
                <h3 className="text-2xl font-bold text-[#111318] dark:text-white mt-1">
                  $120,500
                </h3>
              </div>
              <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-700 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-orange-50 dark:bg-orange-500/20 rounded-lg text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">
                      fact_check
                    </span>
                  </div>
                  <span className="flex items-center text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded-full border border-transparent dark:border-red-500/10">
                    <span className="material-symbols-outlined text-sm mr-1">
                      trending_down
                    </span>
                    -1%
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Attendance Rate
                </p>
                <h3 className="text-2xl font-bold text-[#111318] dark:text-white mt-1">
                  94%
                </h3>
              </div>
            </section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <section className="lg:col-span-2 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm p-6 transition-all">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#111318] dark:text-white">
                      Enrollment Growth
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Academic Year 2023-2024
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="bg-slate-50 dark:bg-[#1E2532] border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2 outline-none cursor-pointer">
                      <option>Last 6 Months</option>
                      <option>Last Year</option>
                    </select>
                  </div>
                </div>
                <div className="w-full h-62.5 relative">
                  <svg
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 478 150"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stop-color="#3b82f6"
                          stop-opacity="0.3"
                        ></stop>
                        <stop
                          offset="100%"
                          stop-color="#3b82f6"
                          stop-opacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V150H0V109Z"
                      fill="url(#chartGradient)"
                    ></path>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      fill="none"
                      stroke="#3b82f6"
                      stroke-linecap="round"
                      stroke-width="3"
                    ></path>
                  </svg>
                  <div className="absolute top-[20%] left-[75%] bg-[#111318] dark:bg-gray-700 text-white text-xs py-1 px-2 rounded shadow-lg transform -translate-x-1/2 -translate-y-full border border-slate-800 dark:border-gray-600">
                    363 Students
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#111318] dark:bg-gray-700 border-r border-b border-slate-800 dark:border-gray-600 transform -translate-x-1/2 translate-y-1/2 rotate-45"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-4 px-2">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    Jan
                  </span>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    Feb
                  </span>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    Mar
                  </span>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    Apr
                  </span>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    May
                  </span>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    Jun
                  </span>
                </div>
              </section>
              <section className="flex flex-col gap-6">
                <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm p-6 transition-all">
                  <h3 className="text-lg font-bold text-[#111318] dark:text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 dark:border-gray-700/50 bg-slate-50 dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer">
                      <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                        person_add
                      </span>
                      <span className="text-xs font-semibold dark:text-slate-300">
                        Add Student
                      </span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 dark:border-gray-700/50 bg-slate-50 dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer">
                      <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                        group_add
                      </span>
                      <span className="text-xs font-semibold dark:text-slate-300">
                        Add Teacher
                      </span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 dark:border-gray-700/50 bg-slate-50 dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer">
                      <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                        campaign
                      </span>
                      <span className="text-xs font-semibold dark:text-slate-300">
                        Alert
                      </span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 dark:border-gray-700/50 bg-slate-50 dark:bg-[#1E2532] hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 dark:hover:border-primary/40 hover:text-primary dark:hover:text-blue-400 transition-all group cursor-pointer">
                      <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                        description
                      </span>
                      <span className="text-xs font-semibold dark:text-slate-300">
                        Report
                      </span>
                    </button>
                  </div>
                </div>
                <div className="bg-linear-to-br from-primary to-blue-800 rounded-xl shadow-lg shadow-blue-500/20 p-6 text-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-600/20 dark:bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-yellow-300">
                        verified
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                        System Status
                      </span>
                    </div>
                    <h4 className="text-lg font-bold mb-1">
                      All Systems Normal
                    </h4>
                    <p className="text-sm text-blue-100/90">
                      Server maintenance scheduled for Sunday, 2:00 AM.
                    </p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 text-white/10 group-hover:text-white/20 transition-colors duration-500">
                    <span className="material-symbols-outlined text-[120px]">
                      dns
                    </span>
                  </div>
                </div>
              </section>
            </div>
            <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden transition-all">
              <div className="p-6 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#111318] dark:text-white">
                  Recent Activities
                </h3>
                <button className="text-sm font-semibold text-primary dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#1E2532] text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">User / Event</th>
                      <th className="px-6 py-4 font-semibold">Role</th>
                      <th className="px-6 py-4 font-semibold">Action Type</th>
                      <th className="px-6 py-4 font-semibold text-right">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#1E2532] transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-sm font-bold border border-transparent dark:border-indigo-500/30">
                            JD
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#111318] dark:text-white">
                              John Doe
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              New Registration
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 border border-transparent dark:border-blue-500/20">
                          Student
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Completed enrollment form
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-sm text-slate-500 dark:text-slate-500">
                          2 mins ago
                        </p>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#1E2532] transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-sm font-bold border border-transparent dark:border-emerald-500/30">
                            SM
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#111318] dark:text-white">
                              Sarah Miller
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Fee Payment
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300 border border-transparent dark:border-purple-500/20">
                          Parent
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Paid tuition for Q3
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-sm text-slate-500 dark:text-slate-500">
                          15 mins ago
                        </p>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-surface-dark-hover transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 flex items-center justify-center text-sm font-bold border border-transparent dark:border-orange-500/30">
                            <span className="material-symbols-outlined text-lg">
                              campaign
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#111318] dark:text-white">
                              Admin System
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Announcement
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300 border border-transparent dark:border-slate-600/30">
                          System
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Published "Holiday Schedule"
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-sm text-slate-500 dark:text-slate-500">
                          1 hour ago
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

// this should be disscussed after since the problem of the height of the page

{
  /* <header className="h-20 px-8 flex items-center justify-between bg-white/80 dark:bg-surface-dark/90 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 dark:border-gray-800 transition-colors">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#111318] dark:text-white tracking-tight">
              Welcome back, Skinner
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Oct 24, 2023 • Overview of school performance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark"></span>
            </button>
            <button className="hidden md:flex items-center justify-center h-10 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10">
              <span className="material-symbols-outlined text-[20px] mr-2">
                add
              </span>
              <span>New Action</span>
            </button>
          </div>
        </header> */
}
