import { Button } from '../ui/button'
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
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useTeacherList } from '@/services/store/teacherListFunctions'

export type TeacherCardType = {
  id: string
  imgSrc: string
  name: string
  subject: string
  gender: string
  teachAt: string
  email: string
  number: string
  status: string
}
// "https://lh3.googleusercontent.com/aida-public/AB6AXuBhlIOBVVsnV_uapAsHlZs-uEgRI3Psz6ygRfODlQJUO7UvdC7Y6ZUTuN_HIMfKvz6VuQVfq4cNWXr6qOzFQugIRo4Xdu3BC7dmyPMPNUFj2kkC140TiPB59Qy3IBaL18zFT9nJVHzxv_hhpqGB1z-5PGarR_Rw1oFsGU18rGw_qmcCV0VA0qx5xX3ELAMbZmpmm5FSlKWIyzEAWx0s2vzRAnfAIsW5koYVQ0B33N6qVhNzQhgqLQPMV2kct8DH5tP8Kag7GpGg6OaH

export default function TeacherCard(props: TeacherCardType) {
  const deleteTeacher = useTeacherList((state) => state.deleteTeacher)
  const teacherList = useTeacherList((state) => state.teacherList)
  const editTeacher = useTeacherList((state) => state.editTeacher)

  return (
    <tr className="group hover:bg-primary/5 dark:hover:bg-slate-700/30 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 shrink-0 flex items-center relative">
            {props.imgSrc ? (
              <img
                alt="Portrait of Sarah Jenkins"
                className="h-10 w-10 rounded-full object-cover border border-slate-600 ring-2 ring-transparent group-hover:ring-primary/50 transition-all"
                data-alt="Portrait of Sarah Jenkins"
                src={props.imgSrc}
              />
            ) : (
              <p className="text-s">{props.gender}</p>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium dark:text-white group-hover:text-primary text-black transition-colors">
              {props.name}
            </div>
            <div className="text-xs text-slate-400 cursor-pointer">
              {props.id}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-slate-200">
          {props.subject}
        </div>
        <div className="text-xs text-gray-400 dark:text-slate-500">
          {props.teachAt}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-slate-200">
          {props.email}
        </div>
        <div className="text-xs text-gray-400 dark:text-slate-500">
          {props.number}
        </div>
      </td>
      <td className="p-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${props.status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : props.status === 'Pending' || 'On Leave' ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' : props.status === 'Inactive' || 'Invalid' ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${props.status === 'Active' ? 'bg-emerald-400' : props.status === 'Pending' || 'On Leave' ? 'bg-orange-500' : props.status === 'Inactive' || 'Invalid' ? 'bg-red-600' : 'bg-white '}`}
          ></span>
          {props.status === 'Active' ||
          'New' ||
          props.status === 'Inactive' ||
          props.status === 'Pending' ||
          'On Leave'
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
                <Button
                  variant="outline"
                  title="edit"
                  className="cursor-pointer"
                >
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
                    <Label htmlFor="name">Subject</Label>
                    <Input id="name" name="name" defaultValue={props.name} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subject">Name</Label>
                    <Input
                      id="subject"
                      name="Subject"
                      defaultValue={props.subject}
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="grid gap-3">
                      <h1 className="underline">Contacts :</h1>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        defaultValue={props.email}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="phone-number">Phone number</Label>
                      <Input
                        id="phone-number"
                        name="phone-number"
                        defaultValue={props.number}
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
                  <Button type="submit" className="cursor-pointer text-white">
                    {/* onClick={()=>editTeacher(props.name,)} */}
                    {/* continue woriking on the editing of the teacher profile.ask the others if the change only in the status and the subject or it can be on the other fields too. */}
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
              deleteTeacher(props.name)
              console.log(teacherList)
            }}
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </Button>
        </div>
      </td>
    </tr>
  )
}
