import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/classes')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Teacher | Classes - EduManage' }],
  }),
})

type Folder = {
  id: string
  name: string
  fileCount: number
  sizeMB: number
}

function RouteComponent() {
  /* collections folders*/
  const Folders: Array<Folder> = [
    { id: '1', name: 'Exam Prep', fileCount: 12, sizeMB: 24 },
    { id: '2', name: 'Lab Reports', fileCount: 8, sizeMB: 156 },
    { id: '3', name: 'Homework Sheets', fileCount: 24, sizeMB: 8 },
  ]
  

  /* type of file*/
  const typeUrl = {
    pdf: { 
      icon : 'picture_as_pdf',
      color: 'text-red-500 dark:text-red-400'
    },
    docx: { 
      icon : 'description',
      color: 'text-blue-500 dark:text-blue-400'
    },
    xlsx: { 
      icon : 'grid_on',
      color: 'text-green-500 dark:text-green-400'
    },
    png: { 
      icon : 'image',
      color: 'text-yellow-500 dark:text-yellow-400'
    },
    zip: { 
      icon : 'folder_zip',
      color: 'text-purple-500 dark:text-purple-400'
    },
  }

  /* default resources */
  const defaultResources = [
    {
      id: '1',
      name: 'Chapter 4 - Algebra Basics.pdf',
      type: 'pdf',
      dateAdded: 'Oct 24, 2023',
      size: '2.4 MB',
    },
    {
      id: '2',
      name: 'Mid-Term Review Notes.docx',
      type: 'docx',
      dateAdded: 'Oct 22, 2023',
      size: '450 KB',
    },
    {
      id: '3',
      name: 'Student Scores Data.xlsx',
      type: 'xlsx',
      dateAdded: 'Oct 21, 2023',
      size: '1.2 MB',
    },
    {
      id: '4',
      name: 'Diagram_Trigonometry.png',
      type: 'png',
      dateAdded: 'Oct 20, 2023',
      size: '3.1 MB',
    },
    {
      id: '5',
      name: 'Practice Exam - Set A.pdf',
      type: 'pdf',
      dateAdded: 'Oct 18, 2023',
      size: '1.8 MB',
    },
    {
      id: '6',
      name: 'Supplementary_Materials.zip',
      type: 'zip',
      dateAdded: 'Oct 15, 2023',
      size: '15.2 MB',
    },
  ]

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-[calc(100vh-64px)]">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Resource Management Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
              Upload new content, manage collections, and track shared
              resources.
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 mb-8">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <div className="p-1.5 flex justify-center rounded-md bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[20px]">
                send
              </span>
            </div>
            Send New Resource
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 flex flex-col">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Upload File
              </label>
              <div className="flex-1 flex flex-col justify-center items-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-primary dark:hover:border-primary transition-all cursor-pointer group relative min-h-56">
                <input
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  type="file"
                />
                <div className="p-4 bg-white dark:bg-slate-700 rounded-full shadow-sm mb-3 group-hover:scale-110 group-hover:text-primary transition-all text-slate-400">
                  <span className="material-symbols-outlined text-3xl">
                    cloud_upload
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Drag &amp; Drop file here
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  or click to browse
                </p>
                <div className="mt-4 text-[10px] text-slate-400 uppercase tracking-wide">
                  Supported: PDF, DOCX, MP4
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Resource Title
                </label>
                <input
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-primary shadow-sm text-sm py-2.5 px-3"
                  placeholder="e.g. Algebra Chapter 5 Summary"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Category
                  </label>
                  <div className="relative">
                    <select className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary shadow-sm text-sm py-2.5 px-3 pr-10 appearance-none cursor-pointer">
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>History</option>
                      <option>General</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                      <span className="material-symbols-outlined text-sm">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Class/Student Selection
                  </label>
                  <div className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm min-h-11 px-2 py-1.5 flex flex-wrap gap-2 items-center cursor-text focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50">
                      Grade 10 - Math
                      <button className="cursor-pointer hover:text-blue-900 dark:hover:text-blue-200 focus:outline-none">
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </button>
                    </span>
                    <input
                      className="flex-1 bg-transparent border-none p-0 text-sm text-slate-900 dark:text-white focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-slate-500 min-w-20"
                      placeholder="Add class..."
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-primary shadow-sm text-sm p-2.5 resize-none"
                  placeholder="Add specific instructions for students..."
                  rows={3}
                ></textarea>
              </div>
              <div className="flex items-center justify-end pt-2">
                <button className="cursor-pointer bg-primary hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-6 rounded-lg shadow-md shadow-blue-500/20 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">
                    cloud_upload
                  </span>
                  Upload Resource
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-between">
          <span>Collections</span>
          <button className="cursor-pointer text-primary text-xs font-semibold hover:underline">
            View All
          </button>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Folders.map((folder) => (
            <div
              key={folder.id}
              className="group cursor-pointer rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="material-symbols-outlined text-4xl text-primary/80 group-hover:text-primary transition-colors filled">
                  folder
                </span>
                <button className="cursor-pointer rounded-full p-1 text-slate-400   hover:text-slate-600 dark:hover:text-slate-300">
                  <span className="material-symbols-outlined text-[20px]">
                    more_vert
                  </span>
                </button>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                {folder.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {folder.fileCount} files • {folder.sizeMB}MB
              </p>
            </div>
          ))}
          <div className="group cursor-pointer rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-transparent p-4 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-all min-h-32">
            <span className="material-symbols-outlined text-3xl text-slate-400 mb-2 group-hover:text-primary">
              add
            </span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-primary">
              Create Collection
            </span>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-10 bg-background-light dark:bg-background-dark/95 backdrop-blur px-6 py-2 pb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-slate-400">
                search
              </span>
            </div>
            <input
              className="block w-full rounded-lg border-none bg-white dark:bg-slate-800 py-2.5 pl-10 pr-3 text-sm text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-primary"
              placeholder="Search files in collection..."
              type="text"
            />
          </div>
          <div className="flex gap-3">
            <select className="block w-full sm:w-40 rounded-lg border-none bg-white dark:bg-slate-800 py-2.5 pl-3 pr-10 text-sm text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary cursor-pointer">
              <option>All Types</option>
              <option>Documents</option>
              <option>Images</option>
              <option>Videos</option>
            </select>
            <select className="block w-full sm:w-40 rounded-lg border-none bg-white dark:bg-slate-800 py-2.5 pl-3 pr-10 text-sm text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary cursor-pointer">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Name A-Z</option>
              <option>Size</option>
            </select>
          </div>
        </div>
      </div>
      <div className="px-6 pb-12">
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
          <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3 font-semibold" scope="col">
                  Filename
                </th>
                <th
                  className="px-6 py-3 font-semibold hidden sm:table-cell"
                  scope="col"
                >
                  Type
                </th>
                <th
                  className="px-6 py-3 font-semibold hidden md:table-cell"
                  scope="col"
                >
                  Date Added
                </th>
                <th
                  className="px-6 py-3 font-semibold hidden lg:table-cell"
                  scope="col"
                >
                  Size
                </th>
                <th className="px-6 py-3 font-semibold text-right" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              
              {defaultResources.map((file) => (
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex size-10 items-center justify-center rounded-lg ${typeUrl[file.type as keyof typeof typeUrl].color} ${typeUrl[file.type as keyof typeof typeUrl].color}`}>
                      <span className="material-symbols-outlined">
                        {typeUrl[file.type as keyof typeof typeUrl].icon}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {file.name}
                      </div>
                      <div className="text-xs text-slate-500 sm:hidden">
                        {file.dateAdded} • {file.size}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">{file.type}</td>
                <td className="px-6 py-4 hidden md:table-cell">{file.dateAdded}</td>
                <td className="px-6 py-4 hidden lg:table-cell">{file.size}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className=" cursor-pointer rounded p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors"
                      title="Download"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        download
                      </span>
                    </button>
                    <button
                      className=" cursor-pointer rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

