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
import useDeleteTeacher from '@/services/api/deleteTeacher'

export type TeacherCardType = {
  id: string
  imgSrc: string
  name: string
  subject: string
  gender: string
  departement: string
  email: string
  number: string
  status: string
}

export default function TeacherCard({
  id,
  imgSrc,
  name,
  subject,
  gender,
  departement,
  email,
  number,
  status,
}: TeacherCardType) {
  const { mutate: deleteTeacher } = useDeleteTeacher()

  return (
    <tr className="group hover:bg-primary/5 dark:hover:bg-slate-700/30 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 shrink-0 flex items-center relative">
            {imgSrc ? (
              <img
                alt="Portrait of Sarah Jenkins"
                className="h-10 w-10 rounded-full object-cover border border-slate-600 ring-2 ring-transparent group-hover:ring-primary/50"
                data-alt="Portrait of Sarah Jenkins"
                src={imgSrc}
              />
            ) : (
              <p className="text-s">{gender}</p>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium dark:text-white group-hover:text-primary text-black transition-colors">
              {name}
            </div>
            <div className="text-xs text-slate-400 cursor-pointer">{id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-slate-200">
          {subject}
        </div>
        <div className="text-xs text-gray-400 dark:text-slate-500">
          {departement}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-slate-200">{email}</div>
        <div className="text-xs text-gray-400 dark:text-slate-500">
          {number}
        </div>
      </td>
      <td className="p-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            status === 'Active'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              : ['Pending', 'On Leave'].includes(status)
                ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
                : ['Inactive', 'Invalid'].includes(status)
                  ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                  : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              status === 'Active'
                ? 'bg-emerald-400'
                : ['Pending', 'On Leave'].includes(status)
                  ? 'bg-orange-500'
                  : ['Inactive', 'Invalid'].includes(status)
                    ? 'bg-red-600'
                    : 'bg-white'
            }`}
          ></span>
          {['Active', 'New', 'Inactive', 'Pending', 'On Leave'].includes(status)
            ? status
            : 'invalid'}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className=" flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Dialog>
            <form>
              <DialogTrigger
                asChild
                className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md"
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
                    <Input id="name" name="name" defaultValue={name} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subject">Name</Label>
                    <Input id="subject" name="Subject" defaultValue={subject} />
                  </div>
                  <div className="grid gap-3">
                    <div className="grid gap-3">
                      <h1 className="underline">Contacts :</h1>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" defaultValue={email} />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="phone-number">Phone number</Label>
                      <Input
                        id="phone-number"
                        name="phone-number"
                        defaultValue={number}
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Input id="status" name="status" defaultValue={status} />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="cursor-pointer text-white">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
          <Button
            className="text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-md cursor-pointer text-[25px] px-1.25 text-center"
            title="Delete"
            variant="outline"
            onClick={() => deleteTeacher(id)}
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
