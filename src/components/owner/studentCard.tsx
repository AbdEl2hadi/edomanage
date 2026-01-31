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
import useDeleteStudent from '@/services/api/deleteStudent'

export type StudentCardType = {
  id: string
  imgSrc: string
  gender?: string
  name: string
  email: string
  grade: string
  parentPhoneNumber: string
  parentName: string
  status: string
}

export default function StudentCard({
  id,
  imgSrc,
  gender,
  name,
  email,
  grade,
  parentPhoneNumber,
  parentName,
  status,
}: StudentCardType) {
  const { mutate: deleteStudent } = useDeleteStudent()
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
          {!imgSrc ? (
            <p>{gender}</p>
          ) : (
            <img
              alt="Male student profile"
              className="h-10 w-10 rounded-full ring-2 ring-transparent group-hover:ring-primary/50 object-cover border border-slate-200 dark:border-slate-700"
              data-alt="Young male student smiling"
              src={imgSrc}
            />
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary">
              {name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {email}
            </span>
          </div>
        </div>
      </td>
      <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{id}</td>
      <td className="p-4 text-slate-700 dark:text-slate-300">{grade}</td>
      <td className="p-4">
        <div className="flex flex-col">
          <span className="text-slate-900 dark:text-white">{parentName}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {parentPhoneNumber}
          </span>
        </div>
      </td>
      <td className="p-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' : status === 'Inactive' ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-emerald-400' : status === 'Pending' ? 'bg-orange-500' : status === 'Inactive' ? 'bg-red-600' : 'bg-white '}`}
          ></span>
          {status === 'Active' || status === 'Inactive' || status === 'Pending'
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
                className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
              >
                <Button variant="outline" className="cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">
                    edit
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="min-w-200 sm:max-w-100 bg-slate-50 dark:bg-gray-800 text-black dark:text-slate-400">
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
                    <Input id="name" name="name" defaultValue={name} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" defaultValue={email} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="grade">Grade</Label>
                    <Input id="grade" name="grade" defaultValue={grade} />
                  </div>
                  <div className="grid gap-3">
                    <div className="grid gap-3">
                      <h1 className="underline">Parnets contacts :</h1>
                      <Label htmlFor="parents-name">name</Label>
                      <Input
                        id="parents-name"
                        name="parents-name"
                        defaultValue={parentName}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="phone-number">Phone number</Label>
                      <Input
                        id="phone-number"
                        name="phone-number"
                        defaultValue={parentPhoneNumber}
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
            className="text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors cursor-pointer text-[25px] px-1.25 text-center"
            title="Delete"
            variant="outline"
            onClick={() => deleteStudent(id)}
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </Button>
          <Button
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
            title="More"
            variant="outline"
          >
            <span className="material-symbols-outlined text-[20px]">
              more_vert
            </span>
          </Button>
        </div>
      </td>
    </tr>
  )
}
