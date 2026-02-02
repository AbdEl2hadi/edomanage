import { useStudentList } from '@/services/store/studentListFunctions'

export type StudentCardType = {
  id: string
  imgSrc: string
  gender?: string // in the case where the student does not have a picture
  name: string
  email: string
  grade: string
  parent: {
    phoneNumber: string
    name: string
  }
  status: string
}

export default function StudentCard(props: StudentCardType) {
  const deleteStudent = useStudentList((state) => state.deleteStudent)
  // const addStudent = useStudentList((state=>))

  return (
    <tr className="group hover:bg-primary/5 dark:hover:bg-slate-700/30 cursor-pointer">
      <td className="p-4">
        <input
          className="rounded border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-primary focus:ring-primary/20 h-4 w-4 cursor-pointer"
          type="checkbox"
        />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          {!props.imgSrc ? (
            <p>{props.gender}</p>
          ) : (
            <img
              alt="Male student profile"
              className="h-10 w-10 rounded-full ring-2 ring-transparent group-hover:ring-primary/50 object-cover border border-slate-200 dark:border-slate-700"
              data-alt="Young male student smiling"
              src={props.imgSrc}
            />
          )}

          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary">
              {props.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {props.email}
            </span>
          </div>
        </div>
      </td>
      <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
        {props.id}
      </td>
      <td className="p-4 text-slate-700 dark:text-slate-300">{props.grade}</td>
      <td className="p-4">
        <div className="flex flex-col">
          <span className="text-slate-900 dark:text-white">
            {props.parent.name}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {props.parent.phoneNumber}
          </span>
        </div>
      </td>
      <td className="p-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${props.status === 'Active' ? 'bg-emerald-10 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : props.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' : props.status === 'Inactive' ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${props.status === 'Active' ? 'bg-emerald-400' : props.status === 'Pending' ? 'bg-orange-500' : props.status === 'Inactive' ? 'bg-red-600' : 'bg-white '}`}
          ></span>
          {props.status === 'Active' ||
          props.status === 'Inactive' ||
          props.status === 'Pending'
            ? props.status
            : 'invalid'}
        </span>
      </td>
      <td className="p-4 text-right">
        <div
          className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100"
          style={{ transition: 'opacity 0.2s ease-in-out' }}
        >
          <button
            className="p-1.5 cursor-pointer text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            title="Delete"
            onClick={() => {
              deleteStudent(props.name)
            }}
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>
          <button
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
            title="More"
          >
            <span className="material-symbols-outlined text-[20px]">
              more_vert
            </span>
          </button>
        </div>
      </td>
    </tr>
  )
}
