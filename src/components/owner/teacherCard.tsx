import { useTeacherList } from '@/services/store/teacherListFunctions'
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
    <tr className="hover:bg-slate-800/50 transition-colors group cursor-pointer">
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
            <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">
              {props.name}
            </div>
            <div className="text-xs text-slate-400 cursor-pointer">
              {props.id}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-slate-200">{props.subject}</div>
        <div className="text-xs text-slate-500">{props.teachAt}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-slate-200">{props.email}</div>
        <div className="text-xs text-slate-500">{props.number}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full  ${props.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : props.status === 'On Leave' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}
        >
          {props.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Dialog>
            <form>
              <DialogTrigger
                asChild
                className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
              >
                <Button variant="outline">
                  <span className="material-symbols-outlined text-[20px]">
                    edit
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-100 bg-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="subject-1">Subject</Label>
                    <Input
                      id="subject-1"
                      name="Subject"
                      defaultValue="analyse"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="status-1">Status</Label>
                    <Input id="status-1" name="status" defaultValue="new" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="cursor-pointer">




 {/* onClick={()=>editTeacher(props.name,)} */}
{/* continue woriking on the editing of the teacher profile.ask the others if the change only in the status and the subject or it can be on the other fields too. */}




                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
          <button
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors cursor-pointer"
            title="Delete"
            onClick={() => {
              deleteTeacher(props.name)
              console.log(teacherList)
            }}
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>
        </div>
      </td>
    </tr>
  )
}
