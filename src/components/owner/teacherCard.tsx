import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
import ProfilePicGenerator from './profilePicGenerator'
import useDeleteTeacher from '@/services/api/deleteTeacher'
import useEditTeacher from '@/services/api/editTeacher'

export const TeacherProfileSchema = z.object({
  id: z.string().min(4, 'the minimum size of the id is 4 characters'),
  imgSrc: z.string().url().optional(),
  name: z
    .string()
    .min(4, 'the minimum size of the name is 4 characters')
    .max(20, 'the maximum size of the name is 20 characters'),
  subject: z.array(z.string()).min(1, 'at least one subject !'),
  gender: z.enum(['male', 'female']),
  departement: z.string(),
  email: z.string().email(),
  number: z.string().min(10, 'the minimum size of the number is 10 digits'),
  status: z.enum(['Active', 'Inactive', 'pending', 'new']).optional(),
  dateOfBirth: z.coerce.date(),
  address: z.string(),
  joiningDate: z.coerce.date(),
  password: z
    .string()
    .min(4, 'the minimum size of the password is 4 characters')
    .max(20, 'the maximum size of the password is 20 characters'),
  role: z.enum(['admin', 'teacher', 'student']).optional(),
})

export type TeacherProfileType = z.infer<typeof TeacherProfileSchema>

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
  password,
}: TeacherProfileType) {
  const { mutate: deleteTeacher } = useDeleteTeacher()

  const { mutate: editTeacher } = useEditTeacher()

  function onSubmit(data: TeacherProfileType) {
    editTeacher(data)
  }

  const form = useForm<TeacherProfileType>({
    defaultValues: {
      id: id,
      imgSrc: imgSrc,
      name: name,
      subject: subject,
      gender: gender,
      departement: departement,
      email: email,
      number: number,
      status: status,
      password: password,
    },
    resolver: zodResolver(TeacherProfileSchema),
  })

  return (
    <tr className="group hover:bg-primary/5 dark:hover:bg-slate-700/30 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 shrink-0 flex items-center relative">
            <ProfilePicGenerator name={name} imgSrc={imgSrc} />
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
            status === undefined
              ? 'bg-slate-100 dark:bg-slate-800'
              : status === 'Active'
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
              status === undefined
                ? 'bg-slate-300 dark:bg-slate-400'
                : status === 'Active'
                  ? 'bg-emerald-400'
                  : ['Pending', 'On Leave'].includes(status)
                    ? 'bg-orange-500'
                    : ['Inactive', 'Invalid'].includes(status)
                      ? 'bg-red-600'
                      : 'bg-white'
            }`}
          ></span>
          {status === undefined ||
          !['Active', 'New', 'Inactive', 'Pending', 'On Leave'].includes(status)
            ? 'invalid'
            : status}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className=" flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Dialog>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogTrigger
                asChild
                className="p-1.5 text-slate-400 dark:text-white hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
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
              <DialogContent className="min-w-150 sm:max-w-100 bg-slate-50 dark:bg-gray-800 text-black dark:text-white">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription className="text-sm text-slate-500 dark:text-slate-400 pb-6 border-b border-slate-300">
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="flex gap-10 border-b pb-6 mt-5 border-slate-300">
                    <div className="grid gap-3 flex-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" defaultValue={name} />
                    </div>
                    <div className="grid gap-3 flex-1">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="Subject"
                        defaultValue={subject}
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="grid gap-3">
                      <h1 className="text-slate-400  dark:text-white">
                        Contacts :
                      </h1>
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
                    <select
                      className="px-4 py-2 rounded border dark:bg-gray-800 dark:text-white"
                      value={status}
                    >
                      <option value="All" disabled>
                        All Status
                      </option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                    </select>
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

{
  /*
<div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        class="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all"
      >
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800"
        >
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">
              Edit profile
            </h2>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <button
            class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <span class="material-icons-outlined">close</span>
          </button>
        </div>
        <form action="#" class="p-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label
                class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                for="name"
                >Name</label
              >
              <input
                class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-primary rounded-lg text-sm text-slate-900 dark:text-white transition-all outline-none"
                id="name"
                type="text"
                value="Emily Davis"
              />
            </div>
            <div class="space-y-1.5">
              <label
                class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                for="subject"
                >Subject</label
              >
              <input
                class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-primary rounded-lg text-sm text-slate-900 dark:text-white transition-all outline-none"
                id="subject"
                type="text"
                value="English"
              />
            </div>
          </div>
          <div class="pt-2 border-t border-slate-100 dark:border-slate-800">
            <p
              class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4"
            >
              Contacts
            </p>
            <div class="space-y-4">
              <div class="space-y-1.5">
                <label
                  class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  for="email"
                  >Email</label
                >
                <input
                  class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-primary rounded-lg text-sm text-slate-900 dark:text-white transition-all outline-none"
                  id="email"
                  type="email"
                  value="emily.davis@example.com"
                />
              </div>
              <div class="space-y-1.5">
                <label
                  class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  for="phone"
                  >Phone number</label
                >
                <input
                  class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-primary rounded-lg text-sm text-slate-900 dark:text-white transition-all outline-none"
                  id="phone"
                  type="text"
                  value="+213555004"
                />
              </div>
            </div>
          </div>
          <div class="space-y-1.5">
            <label
              class="text-sm font-semibold text-slate-700 dark:text-slate-300"
              for="status"
              >Status</label
            >
            <div class="relative">
              <select
                class="w-full appearance-none px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-primary rounded-lg text-sm text-slate-900 dark:text-white transition-all outline-none"
                id="status"
              >
                <option selected="" value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
                <option value="onleave">On Leave</option>
              </select>
              <div
                class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400"
              >
                <span class="material-icons-outlined text-lg">expand_more</span>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-2"
          >
            <button
              class="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
              type="button"
            >
              Cancel
            </button>
            <button
              class="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-primary/30 transition-all shadow-lg shadow-primary/20"
              type="submit"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
    */
}
