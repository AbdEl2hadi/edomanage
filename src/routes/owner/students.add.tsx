import { createFileRoute } from '@tanstack/react-router'
import type { StudentCardType } from '@/components/owner/studentCard'

export const Route = createFileRoute('/owner/students/add')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Owner | Add Student - EduManage' }],
  }),
})

export type StudentProfile = StudentCardType & {
  dateOfBirth: Date
  address: string
  joiningDate: Date
}

function RouteComponent() {
  return (
    <div className="flex h-full w-full">
      <main className="flex-1 flex flex-col h-full min-w-0 bg-background-light dark:bg-background-dark overflow-hidden relative">
        <div className="flex-1 overflow-x-hidden p-8 pb-32">
          <div className="flex flex-col gap-6 pb-12">
            <div className="flex flex-col gap-1">
              <h1 className="text-[#111318] dark:text-white text-3xl md:text-4xl font-bold tracking-tight">
                Add New Student
              </h1>
              <p className="text-[#616f89] dark:text-gray-400 text-base">
                Enter the details below to create a new student account and
                assign access
              </p>
            </div>
            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-[#f0f2f4] dark:border-gray-800 overflow-hidden">
              <form className="flex flex-col">
                <div className="p-8 border-b border-[#f0f2f4] dark:border-gray-800 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                  <div className="relative group cursor-pointer">
                    <div className="size-32 rounded-full bg-[#f0f2f4] dark:bg-gray-800 flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-700 shadow-sm transition-all group-hover:border-primary/20">
                      <span className="material-symbols-outlined text-4xl text-[#9ca3af]">
                        person_add
                      </span>
                      <img
                        alt="Teacher profile preview"
                        className="hidden w-full h-full object-cover"
                        id="avatar-preview"
                        src=""
                      />
                    </div>
                    <div className="absolute flex justify-center bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-md border-2 border-white dark:bg-surface-dark">
                      <span className="material-symbols-outlined text-[18px]">
                        edit
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h3 className="text-[#111318] dark:text-white text-lg font-bold">
                      Profile Photo
                    </h3>
                    <p className="text-[#616f89] dark:text-gray-400 text-sm max-w-md">
                      Upload a clear photo of the student. Accepted formats:
                      JPG, PNG. Max size: 5MB.
                    </p>
                    <div className="flex gap-3 mt-2 justify-center sm:justify-start">
                      <button
                        type="button"
                        className="px-4 py-2 bg-[#f0f2f4] dark:bg-gray-800 hover:bg-[#e2e8f0] dark:hover:bg-gray-700 text-[#111318] dark:text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-primary hover:bg-primary/10 text-sm font-medium rounded-lg transition-colors"
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-8 border-b border-[#f0f2f4] dark:border-gray-800">
                  <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      badge
                    </span>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#111318] dark:text-gray-200 text-sm font-medium">
                        Full name
                      </label>
                      <input
                        className="w-full h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 border-none px-4 text-[#111318] dark:text-white placeholder:text-[#9ca3af] focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="e.g. Sarah Connor"
                        type="text"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#111318] dark:text-gray-200 text-sm font-medium">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <input
                          className="w-full h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 border-none px-4 text-[#111318] dark:text-white focus:ring-2 focus:ring-primary/50 transition-all"
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#111318] dark:text-gray-200 text-sm font-medium">
                        Gender
                      </label>
                      <div className="relative">
                        <select className="w-full h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 border-none px-4 text-[#111318] dark:text-white focus:ring-2 focus:ring-primary/50 appearance-none transition-all">
                          <option disabled selected value="">
                            Select Gender
                          </option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#616f89] dark:text-gray-400">
                          <span className="material-symbols-outlined">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 border-b border-[#f0f2f4] dark:border-gray-800">
                  <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      contact_mail
                    </span>
                    Contact Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#111318] dark:text-gray-200 text-sm font-medium">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 border-none px-4 text-[#111318] dark:text-white placeholder:text-[#9ca3af] focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="sarah.connor@school.edu"
                        type="email"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#111318] dark:text-gray-200 text-sm font-medium">
                        Parent / Guardian Phone Number
                      </label>
                      <input
                        className="w-full h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 border-none px-4 text-[#111318] dark:text-white placeholder:text-[#9ca3af] focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[#111318] dark:text-gray-200 text-sm font-medium">
                        Residential Address
                      </label>
                      <input
                        className="w-full h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 border-none px-4 text-[#111318] dark:text-white placeholder:text-[#9ca3af] focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="123 Education Lane, Springfield"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-8 border-b border-[#f0f2f4] dark:border-gray-800">
                  <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      school
                    </span>
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#111318] dark:text-gray-200 text-sm font-medium">
                        Student ID
                      </label>
                      <input
                        className="w-full h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800/50 border-none px-4 text-[#616f89] dark:text-gray-400 cursor-not-allowed"
                        readOnly
                        type="text"
                        value="STD-2024-001"
                      />
                      <p className="text-xs text-[#616f89] dark:text-gray-500">
                        Auto-generated student ID
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#111318] dark:text-gray-200 text-sm font-medium">
                        Enrollment Date
                      </label>
                      <input
                        className="w-full h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 border-none px-4 text-[#111318] dark:text-white focus:ring-2 focus:ring-primary/50 transition-all"
                        type="date"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#111318] dark:text-gray-200 text-sm font-medium">
                        Class / Grade
                      </label>
                      <div className="relative">
                        <select className="w-full h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 border-none px-4 text-[#111318] dark:text-white focus:ring-2 focus:ring-primary/50 appearance-none transition-all">
                          <option disabled selected value="">
                            Select Grade
                          </option>
                          <option value="science">Grade 1</option>
                          <option value="math">Grade 2</option>
                          <option value="literature">Grade 3</option>
                          <option value="arts">Grade 4</option>
                          <option value="history">Grade 5</option>
                          <option value="geography">Grade 6</option>
                          <option value="chemistry">Grade 7</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#616f89] dark:text-gray-400">
                          <span className="material-symbols-outlined">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      lock
                    </span>
                    Account Settings
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-[#f0f2f4] dark:bg-gray-800">
                      <div>
                        <p className="text-[#111318] dark:text-white font-medium">
                          System Access
                        </p>
                        <p className="text-[#616f89] dark:text-gray-400 text-sm">
                          Allow this student to log in to the portal.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          checked
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#111318] dark:text-gray-200 text-sm font-medium">
                        Temporary Password
                      </label>
                      <div className="relative">
                        <input
                          className="w-full h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 border-none px-4 text-[#111318] dark:text-white focus:ring-2 focus:ring-primary/50 transition-all"
                          type="password"
                          value="Teacher@2024"
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#616f89] hover:text-[#111318] dark:hover:text-white dark:text-gray-400"
                        >
                          <span className="material-symbols-outlined">
                            visibility
                          </span>
                        </button>
                      </div>
                      <p className="text-xs text-[#616f89] dark:text-gray-500">
                        The student will be asked to change this password upon
                        first login.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-[#f8f9fc] dark:bg-[#151a25] border-t border-[#f0f2f4] dark:border-gray-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-4 rounded-b-xl">
                  <button
                    type="button"
                    className="w-full sm:w-auto h-10 px-6 rounded-lg border border-transparent text-[#616f89] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="w-full sm:w-auto h-10 px-6 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      check
                    </span>
                    Create Student Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
