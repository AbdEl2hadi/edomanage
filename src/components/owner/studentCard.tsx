import { useStudentList } from '@/services/store/studentListFunctions'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

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
  const StudentList = useStudentList((state) => state.studentList)
  const editStudent = useStudentList((state) => state.editStudent)
  // const addStudent = useStudentList((state=>))

  return (
    <tr className="group hover:bg-primary/5 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
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
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${props.status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : props.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' : props.status === 'Inactive' ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}
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
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className=" flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Dialog>
            <form>
              <DialogTrigger
                asChild
                className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
              >
                <Button variant="outline" className='cursor-pointer'>
                  <span className="material-symbols-outlined text-[20px]">
                    edit
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-100 bg-slate-50 dark:bg-gray-800 text-black dark:text-slate-400">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" defaultValue={props.name} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" defaultValue={props.email} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="grade">Grade</Label>
                    <Input id="grade" name="grade" defaultValue={props.grade} />
                  </div>
                  <div className="grid gap-3">
                    <div className="grid gap-3">
                      <h1 className="underline">Parnets contacts :</h1>
                      <Label htmlFor="parents-name">name</Label>
                      <Input
                        id="parents-name"
                        name="parents-name"
                        defaultValue={props.parent.name}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="phone-number">Phone number</Label>
                      <Input
                        id="phone-number"
                        name="phone-number"
                        defaultValue={props.parent.phoneNumber}
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Input
                      id="status"
                      name="status"
                      defaultValue={props.status}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="cursor-pointer text-white"
                    onSubmit={() =>
                      editStudent(
                        props.name,
                        props.status,
                        props.grade,
                        props.email,
                        props.id,
                        props.parent.phoneNumber,
                        props.parent.name,
                      )
                    }
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
          <Button
            className="text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors cursor-pointer text-[25px] px-1.25 text-center"
            title="Delete"
            variant="outline"
            onClick={() => {
              deleteStudent(props.name)
              console.log(StudentList)
            }}
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </Button>
          <Button
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
            title="More"
            variant="outline"
            onClick={() => {
              editStudent
            }}
          >
            <span className="material-symbols-outlined text-[20px]">
              more_vert
            </span>
          </Button>
        </div>
      </td>
      {/* <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-1.5 cursor-pointer text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
            title="Delete"
            onClick={() => {
              deleteStudent(props.name)
            }}
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>
          
        </div>
      </td> */}
    </tr>
  )
}
