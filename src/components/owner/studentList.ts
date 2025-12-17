import type { StudentInfo } from "./studentCard"


export const studentsList: Array<StudentInfo> = [
  {
    imgSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8MYDq3E037e4BHgu0T1ROOWTPs3WRapbSCJgBETDKXgHGt2bRqhA28IDNpWHK2NG6EeF28-yg-EJ1hthpzOtu5C7ZibH069qDTaSS3DkENTN1RzAdHOisn0c60b_bHCZ2W2yWVikMvgfOIdCBFgVrFjEbvJ4OekUd7Cz3LM09A0hOtyZNw0Mrl5-_1vESGk4_rZDAZ8NvAL1H_D-NaXttfiwXrDwk8m79eV2PKGXG_S-kQ0ewU_7yzl_iXzUF_XgqcNJIYtwqs_PT',
    gender: "male",
    name: 'James Anderson',
    email: 'james.a@student.edu',
    id: '#ST-2024-001',
    grade: 'Grade 11 - A',
    parent: {
      name: 'Sarah Anderson',
      phoneNumber: '+1 (555) 123-4567',
    },
    status: 'Active',
  },
  {
    imgSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBohAD1HcNUu1rOzCCUNdxiJbeNHzGUHT2uaEm4ec8RSk3Zmeq6pGET5P49TpSIpakvQxLDuNX5O9YnXklVnmsm6qlz15dGH5DWI-o1yroi8IrgwGcUP6ImKqo5iXII28cjt-qqr74948QV7gf8MvTjNCEr89ApKHFHT1qNkfM2KidzJ7kocSSOXFLBu6gGW9j76vOXtcTPD_-p9pNjufyfn7f2EsrmVRrkxbDszY_sbU9uITRLSZ06sVhobN2TXPjpuIC7XAKuwoEb',
    gender: "female",
    name: 'Emily Chen',
    email: 'e.chen@student.edu',
    id: '#ST-2024-045',
    grade: 'Grade 10 - B',
    parent: {
      name: 'David Chen',
      phoneNumber: '+1 (555) 987-6543',
    },
    status: 'Active',
  },
  {
    imgSrc: '', // no image, initials used
    gender: "male",
    name: 'Michael Ross',
    email: 'mike.ross@student.edu',
    id: '#ST-2023-112',
    grade: 'Grade 12 - A',
    parent: {
      name: 'Rachel Ross',
      phoneNumber: '+1 (555) 444-2222',
    },
    status: 'Inactive',
  },
  {
    imgSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUxvYm5zr_xNAj89vLbuPPqe0ynjaWRtk8DEYiocbs_HvvnV_c_rrK_Ylk6Q2nJYKJRIFNXsEmLlm5BFFaNNwo8AlPB2SlhjSqLyfiy-SULwxAB4zZsCA3JcyCa-k4DFBSMufluEOLjgaWEVJncDXusn1uVPCssSZlSfTcQQKUfBkGd83fI1GUrYD1ggcVoWvfAx15H5T2TFZKnT6d_0UGuYzVg4dO6m-Rd0CKcX56lGpr6CC2d9fw0jkmSc4w06sZEJ8-5lLeRHby',
    gender: "female",
    name: 'Sophia Martinez',
    email: 'sophia.m@student.edu',
    id: '#ST-2024-089',
    grade: 'Grade 9 - C',
    parent: {
      name: 'Carlos Martinez',
      phoneNumber: '+1 (555) 777-8888',
    },
    status: 'Pending',
  },
  {
    imgSrc: "",
    gender: "male",
    name: 'khatir ayoub',
    email: 'khatir.a@student.edu',
    id: '#esi-2024-089',
    grade: 'Grade 2 - A',
    parent: {
      name: 'mohamed khatir ',
      phoneNumber: '+1 026 777-8888',
    },
    status: 'hello world',
  },
]


// <tr className="group hover:bg-primary/5 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
//                     <td className="p-4">
//                       <input
//                         className="rounded border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-primary focus:ring-primary/20 h-4 w-4"
//                         type="checkbox"
//                       />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <img
//                           alt="Male student profile"
//                           className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
//                           data-alt="Young male student smiling"
//                           src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8MYDq3E037e4BHgu0T1ROOWTPs3WRapbSCJgBETDKXgHGt2bRqhA28IDNpWHK2NG6EeF28-yg-EJ1hthpzOtu5C7ZibH069qDTaSS3DkENTN1RzAdHOisn0c60b_bHCZ2W2yWVikMvgfOIdCBFgVrFjEbvJ4OekUd7Cz3LM09A0hOtyZNw0Mrl5-_1vESGk4_rZDAZ8NvAL1H_D-NaXttfiwXrDwk8m79eV2PKGXG_S-kQ0ewU_7yzl_iXzUF_XgqcNJIYtwqs_PT"
//                         />
//                         <div className="flex flex-col">
//                           <span className="font-semibold text-slate-900 dark:text-white">
//                             James Anderson
//                           </span>
//                           <span className="text-xs text-slate-500 dark:text-slate-400">
//                             james.a@student.edu
//                           </span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
//                       #ST-2024-001
//                     </td>
//                     <td className="p-4 text-slate-700 dark:text-slate-300">
//                       Grade 11 - A
//                     </td>
//                     <td className="p-4">
//                       <div className="flex flex-col">
//                         <span className="text-slate-900 dark:text-white">
//                           Sarah Anderson
//                         </span>
//                         <span className="text-xs text-slate-500 dark:text-slate-400">
//                           +1 (555) 123-4567
//                         </span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
//                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
//                         Active
//                       </span>
//                     </td>
//                     <td className="p-4 text-right">
//                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
//                           title="Edit"
//                         >
//                           <span className="material-symbols-outlined text-[20px]">
//                             edit
//                           </span>
//                         </button>
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
//                           title="Delete"
//                         >
//                           <span className="material-symbols-outlined text-[20px]">
//                             delete
//                           </span>
//                         </button>
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
//                           title="More"
//                         >
//                           <span className="material-symbols-outlined text-[20px]">
//                             more_vert
//                           </span>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr className="group hover:bg-primary/5 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
//                     <td className="p-4">
//                       <input
//                         className="rounded border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-primary focus:ring-primary/20 h-4 w-4"
//                         type="checkbox"
//                       />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <img
//                           alt="Female student profile"
//                           className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
//                           data-alt="Portrait of young female student"
//                           src="https://lh3.googleusercontent.com/aida-public/AB6AXuBohAD1HcNUu1rOzCCUNdxiJbeNHzGUHT2uaEm4ec8RSk3Zmeq6pGET5P49TpSIpakvQxLDuNX5O9YnXklVnmsm6qlz15dGH5DWI-o1yroi8IrgwGcUP6ImKqo5iXII28cjt-qqr74948QV7gf8MvTjNCEr89ApKHFHT1qNkfM2KidzJ7kocSSOXFLBu6gGW9j76vOXtcTPD_-p9pNjufyfn7f2EsrmVRrkxbDszY_sbU9uITRLSZ06sVhobN2TXPjpuIC7XAKuwoEb"
//                         />
//                         <div className="flex flex-col">
//                           <span className="font-semibold text-slate-900 dark:text-white">
//                             Emily Chen
//                           </span>
//                           <span className="text-xs text-slate-500 dark:text-slate-400">
//                             e.chen@student.edu
//                           </span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
//                       #ST-2024-045
//                     </td>
//                     <td className="p-4 text-slate-700 dark:text-slate-300">
//                       Grade 10 - B
//                     </td>
//                     <td className="p-4">
//                       <div className="flex flex-col">
//                         <span className="text-slate-900 dark:text-white">
//                           David Chen
//                         </span>
//                         <span className="text-xs text-slate-500 dark:text-slate-400">
//                           +1 (555) 987-6543
//                         </span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
//                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
//                         Active
//                       </span>
//                     </td>
//                     <td className="p-4 text-right">
//                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
//                           title="Edit"
//                         >
//                           <span className="material-symbols-outlined text-[20px]">
//                             edit
//                           </span>
//                         </button>
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
//                           title="Delete"
//                         >
//                           <span className="material-symbols-outlined text-[20px]">
//                             delete
//                           </span>
//                         </button>
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
//                           title="More"
//                         >
//                           <span className="material-symbols-outlined text-[20px]">
//                             more_vert
//                           </span>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr className="group hover:bg-primary/5 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
//                     <td className="p-4">
//                       <input
//                         className="rounded border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-primary focus:ring-primary/20 h-4 w-4"
//                         type="checkbox"
//                       />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-lg border border-purple-200 dark:border-purple-800">
//                           MR
//                         </div>
//                         <div className="flex flex-col">
//                           <span className="font-semibold text-slate-900 dark:text-white">
//                             Michael Ross
//                           </span>
//                           <span className="text-xs text-slate-500 dark:text-slate-400">
//                             mike.ross@student.edu
//                           </span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
//                       #ST-2023-112
//                     </td>
//                     <td className="p-4 text-slate-700 dark:text-slate-300">
//                       Grade 12 - A
//                     </td>
//                     <td className="p-4">
//                       <div className="flex flex-col">
//                         <span className="text-slate-900 dark:text-white">
//                           Rachel Ross
//                         </span>
//                         <span className="text-xs text-slate-500 dark:text-slate-400">
//                           +1 (555) 444-2222
//                         </span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
//                         <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
//                         Inactive
//                       </span>
//                     </td>
//                     <td className="p-4 text-right">
//                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
//                           title="Edit"
//                         >
//                           <span className="material-symbols-outlined text-[20px]">
//                             edit
//                           </span>
//                         </button>
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
//                           title="Delete"
//                         >
//                           <span className="material-symbols-outlined text-[20px]">
//                             delete
//                           </span>
//                         </button>
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
//                           title="More"
//                         >
//                           <span className="material-symbols-outlined text-[20px] cursor-pointer">
//                             more_vert
//                           </span>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr className="group hover:bg-primary/5 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
//                     <td className="p-4">
//                       <input
//                         className="rounded border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-primary focus:ring-primary/20 h-4 w-4"
//                         type="checkbox"
//                       />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <img
//                           alt="Female student profile"
//                           className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
//                           data-alt="Portrait of a young female student with short hair"
//                           src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUxvYm5zr_xNAj89vLbuPPqe0ynjaWRtk8DEYiocbs_HvvnV_c_rrK_Ylk6Q2nJYKJRIFNXsEmLlm5BFFaNNwo8AlPB2SlhjSqLyfiy-SULwxAB4zZsCA3JcyCa-k4DFBSMufluEOLjgaWEVJncDXusn1uVPCssSZlSfTcQQKUfBkGd83fI1GUrYD1ggcVoWvfAx15H5T2TFZKnT6d_0UGuYzVg4dO6m-Rd0CKcX56lGpr6CC2d9fw0jkmSc4w06sZEJ8-5lLeRHby"
//                         />
//                         <div className="flex flex-col">
//                           <span className="font-semibold text-slate-900 dark:text-white">
//                             Sophia Martinez
//                           </span>
//                           <span className="text-xs text-slate-500 dark:text-slate-400">
//                             sophia.m@student.edu
//                           </span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
//                       #ST-2024-089
//                     </td>
//                     <td className="p-4 text-slate-700 dark:text-slate-300">
//                       Grade 9 - C
//                     </td>
//                     <td className="p-4">
//                       <div className="flex flex-col">
//                         <span className="text-slate-900 dark:text-white">
//                           Carlos Martinez
//                         </span>
//                         <span className="text-xs text-slate-500 dark:text-slate-400">
//                           +1 (555) 777-8888
//                         </span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
//                         <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
//                         Pending
//                       </span>
//                     </td>
//                     <td className="p-4 text-right">
//                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
//                           title="Edit"
//                         >
//                           <span className="material-symbols-outlined text-[20px] cursor-pointer">
//                             edit
//                           </span>
//                         </button>
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
//                           title="Delete"
//                         >
//                           <span className="material-symbols-outlined text-[20px] cursor-pointer">
//                             delete
//                           </span>
//                         </button>
//                         <button
//                           className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
//                           title="More"
//                         >
//                           <span className="material-symbols-outlined text-[20px] cursor-pointer">
//                             more_vert
//                           </span>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
