import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/teachers')({
  component: RouteComponent,
})

function RouteComponent() {
  

  return (
    <main>


      {/* addition should be disscussed */}

      <header className="h-16 bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 md:px-8 shrink-0">
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
            Teacher Directory
          </span>
        </div>
      </header>
      {/* <div className="md:hidden h-16 bg-surface-darker border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">school</span>
          <span className="text-lg font-bold text-white">EduManager</span>
        </div>
        <button className="text-slate-300 hover:text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div> */}
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
            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-sm shadow-blue-500/30 active:scale-95 cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="font-medium">Add New Teacher</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-dark p-6 rounded-xl border border-gray-800 shadow-lg shadow-black/20 flex flex-col gap-2 cursor-pointer dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-700 transition-all group">
              <p className="text-slate-400 text-sm font-medium">
                Total Teachers
              </p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-white leading-none">42</p>
                <div className="flex items-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">
                    trending_up
                  </span>
                  5%
                </div>
              </div>
            </div>
            <div className="bg-surface-dark p-6 rounded-xl border border-gray-800 shadow-lg shadow-black/20 flex flex-col gap-2 cursor-pointer dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-700 transition-all group">
              <p className="text-slate-400 text-sm font-medium">Active Now</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-white leading-none">38</p>
                <div className="flex items-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">
                    trending_up
                  </span>
                  2%
                </div>
              </div>
            </div>
            <div className="bg-surface-dark p-6 rounded-xl border border-gray-800 shadow-lg shadow-black/20 flex flex-col gap-2 cursor-pointer dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-700 transition-all group">
              <p className="text-slate-400 text-sm font-medium">
                New This Month
              </p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-white leading-none">3</p>
                <div className="flex items-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-xs font-medium ">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">
                    trending_up
                  </span>
                  10%
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center bg-surface-dark p-4 rounded-xl border border-slate-700 shadow-lg shadow-black/20">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-500">
                  search
                </span>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 rounded-lg leading-5 bg-background-dark text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-shadow"
                placeholder="Search by name, email, or subject..."
                type="text"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-700 hover:text-white transition whitespace-nowrap cursor-pointer">
                All Subjects
                <span className="material-symbols-outlined text-[18px]">
                  keyboard_arrow_down
                </span>
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-700 hover:text-white transition whitespace-nowrap cursor-pointer">
                Status: Active
                <span className="material-symbols-outlined text-[18px]">
                  keyboard_arrow_down
                </span>
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-700 hover:text-white transition whitespace-nowrap cursor-pointer">
                Sort By: Name
                <span className="material-symbols-outlined text-[18px]">
                  sort
                </span>
              </button>
            </div>
          </div>
          <div className="bg-surface-dark rounded-xl border border-slate-700 shadow-lg shadow-black/20 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700">
                <thead className="bg-slate-800/50">
                  <tr>
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
                <tbody className="bg-surface-dark divide-y divide-slate-700">
                  <tr className="hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 shrink-0 relative">
                          <img
                            alt="Portrait of Sarah Jenkins"
                            className="h-10 w-10 rounded-full object-cover border border-slate-600 ring-2 ring-transparent group-hover:ring-primary/50 transition-all"
                            data-alt="Portrait of Sarah Jenkins"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhlIOBVVsnV_uapAsHlZs-uEgRI3Psz6ygRfODlQJUO7UvdC7Y6ZUTuN_HIMfKvz6VuQVfq4cNWXr6qOzFQugIRo4Xdu3BC7dmyPMPNUFj2kkC140TiPB59Qy3IBaL18zFT9nJVHzxv_hhpqGB1z-5PGarR_Rw1oFsGU18rGw_qmcCV0VA0qx5xX3ELAMbZmpmm5FSlKWIyzEAWx0s2vzRAnfAIsW5koYVQ0B33N6qVhNzQhgqLQPMV2kct8DH5tP8Kag7GpGg6OaH"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                            Sarah Jenkins
                          </div>
                          <div className="text-xs text-slate-400 cursor-pointer">
                            ID: #T-1024
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-200">Mathematics</div>
                      <div className="text-xs text-slate-500">High School</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-200">
                        sarah.j@school.edu
                      </div>
                      <div className="text-xs text-slate-500">
                        +1 (555) 123-4567
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-indigo-500/20 text-indigo-300 rounded-full font-bold border border-indigo-500/30 group-hover:border-indigo-400 transition-colors">
                          MR
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                            Michael Ross
                          </div>
                          <div className="text-xs text-slate-400">
                            ID: #T-1045
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-200">Physics</div>
                      <div className="text-xs text-slate-500">
                        Senior Department
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-200">
                        m.ross@school.edu
                      </div>
                      <div className="text-xs text-slate-500">
                        +1 (555) 987-6543
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 shrink-0">
                          <img
                            alt="Portrait of James Wilson"
                            className="h-10 w-10 rounded-full object-cover border border-slate-600 ring-2 ring-transparent group-hover:ring-primary/50 transition-all"
                            data-alt="Portrait of James Wilson"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEAi7Yhn48HHbCi9YDQ5-I37uRyKbIIWzroJrSsB0fejFn41f3hLNJW8Oh5Co99RRfahvly6Ira_L38nVxN6igr9xn7RFIxRFqyEttFdOOC45OMz-lK2acfxYaIOVtYAUrZdT8tqHC88-5ZK8UPJBWU26_tRn6QaAIItzUNdw1_YsE2R2VHTNZrwcd0MryKQfW9IrJXM-RA9nCoekelzR6HrhR5EKvgOS3U45kcFDpYu91SPrfxVXA64c9gIQM71NP8b3-nWQRdQ9K"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                            James Wilson
                          </div>
                          <div className="text-xs text-slate-400">
                            ID: #T-1088
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-200">History</div>
                      <div className="text-xs text-slate-500">
                        Middle School
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-200">
                        james.w@school.edu
                      </div>
                      <div className="text-xs text-slate-500">
                        +1 (555) 333-2211
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        On Leave
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 shrink-0">
                          <img
                            alt="Portrait of Anita Patel"
                            className="h-10 w-10 rounded-full object-cover border border-slate-600 ring-2 ring-transparent group-hover:ring-primary/50 transition-all"
                            data-alt="Portrait of Anita Patel"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmuZExrNKCjOKCWvgt7uHLFmjYmAh1Q3qyhwdSQ9ID2i6cVCVT5SVLKCR7EHcV4Dgy6jDv8vouiq88wnGoOuXKgIL5ISxE-rYbyPdKAWUHvaIUe0zhV8O2mdnrvD7QKxnfKMHxoQeBCN4s9qjQ8NxMrOU8Z1N0j7AN7xTWN8V0Yekw-wUgWHuWu3-ABWJKOjhxRhibjNfiOuuqmIETvkF7Y7Vg3UbYuizR8QoOUIPghroYEEb6D4WKuc_2OwCVMsFoF3yWE-1WfVEV"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                            Anita Patel
                          </div>
                          <div className="text-xs text-slate-400">
                            ID: #T-1102
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-200">Chemistry</div>
                      <div className="text-xs text-slate-500">
                        Lab Department
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-200">
                        anita.p@school.edu
                      </div>
                      <div className="text-xs text-slate-500">
                        +1 (555) 777-8899
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-orange-500/20 text-orange-300 rounded-full font-bold border border-orange-500/30 group-hover:border-orange-400 transition-colors">
                          DK
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                            David Kim
                          </div>
                          <div className="text-xs text-slate-400">
                            ID: #T-1120
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-200">
                        Physical Education
                      </div>
                      <div className="text-xs text-slate-500">Sports Dept</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-200">
                        david.k@school.edu
                      </div>
                      <div className="text-xs text-slate-500">
                        +1 (555) 444-5555
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        New
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-surface-dark px-4 py-3 flex items-center justify-between border-t border-slate-700 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Showing
                    <span className="font-medium text-white">1</span>
                    to
                    <span className="font-medium text-white">5</span>
                    of
                    <span className="font-medium text-white">42</span>
                    results
                  </p>
                </div>
                <div>
                  <nav
                    aria-label="Pagination"
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  >
                    <a
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-700 bg-surface-dark text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                      href="#"
                    >
                      <span className="sr-only">Previous</span>
                      <span className="material-symbols-outlined text-[20px]">
                        chevron_left
                      </span>
                    </a>
                    <a
                      aria-current="page"
                      className="z-10 bg-primary/20 border-primary text-blue-400 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      href="#"
                    >
                      1
                    </a>
                    <a
                      className="bg-surface-dark border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors"
                      href="#"
                    >
                      2
                    </a>
                    <a
                      className="bg-surface-dark border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors"
                      href="#"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center px-4 py-2 border border-slate-700 bg-surface-dark text-sm font-medium text-slate-500">
                      ...
                    </span>
                    <a
                      className="bg-surface-dark border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors"
                      href="#"
                    >
                      8
                    </a>
                    <a
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-700 bg-surface-dark text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
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
    </main>
  )
}
