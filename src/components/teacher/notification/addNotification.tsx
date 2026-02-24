import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
/* richTextEditor*/
import { DialogTitle } from '@radix-ui/react-dialog'
import RichTextEditor from '../../ui/tipTap'

/* dropDownMenu*/
import { Button } from '../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '../../ui/dialog'

import { PubNotificationSchema } from './pubnotification.schema'
import useGetSendToList from './getSendToList'
import type { PubNotificationType } from './pubnotification.schema'

import type { SubmitHandler } from 'react-hook-form'

export default function AddNotification({
  role,
}: {
  role: 'teacher' | 'admin'
}) {
  return (
    <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 relative">
      <div className="max-w-350 mx-auto flex flex-col gap-8 h-full">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {role === 'admin' ? 'Announcements' : 'Notifications'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl">
                Manage and send important{' '}
                {role === 'admin' ? 'announcements' : 'notifications'} to your{' '}
                {role === 'teacher' ? 'students ' : 'teachers and students'}.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row gap-6 h-full items-start">
          <div className="w-full xl:w-7/12 flex flex-col gap-4 order-2 xl:order-1">
            <div className=" flex flex-col gap-4 bg-white dark:bg-[#151b2b] p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-col gap-1 p-2 border-b border-slate-300 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {role === 'admin' ? 'Announcement' : 'Notification'} History
                </span>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Review past{' '}
                  {role === 'admin' ? 'announcements' : 'notifications'} sent
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-50">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    search
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-none rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400"
                    placeholder="Search title or content..."
                    type="text"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select className="bg-slate-50 dark:bg-slate-800/50 border-none rounded-lg text-sm text-slate-700 dark:text-slate-300 py-2 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                  <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      filter_list
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#151b2b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-xs uppercase text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
                      <th className="px-5 py-4 font-semibold">Announcement</th>
                      <th className="px-5 py-4 font-semibold">Audience</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                      <th className="px-5 py-4 font-semibold text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-4 align-top max-w-70">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            School Closure Due to Heavy Snow
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 line-clamp-1 text-xs">
                            Due to severe weather conditions, the campus will be
                            closed tomorrow, Jan 15th.
                          </span>
                          <span className="text-slate-400 text-xs mt-1">
                            Today, 9:41 AM
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="flex -space-x-1">
                          <div className="flex items-center justify-center px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-100 dark:border-blue-800">
                            Teachers
                          </div>
                          <div className="flex items-center justify-center px-2 py-1 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium border border-purple-100 dark:border-purple-800 relative z-10">
                            Students
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-100 dark:border-green-900/50">
                          <span className="size-1.5 rounded-full bg-green-500" />{' '}
                          Published
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top text-right">
                        <button className="text-slate-400 hover:text-primary p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                          <span className="material-symbols-outlined text-[20px]">
                            more_vert
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-4 align-top max-w-70">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            Mid-Term Exam Schedule
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 line-clamp-1 text-xs">
                            The draft schedule for mid-terms is now available
                            for review by department heads.
                          </span>
                          <span className="text-slate-400 text-xs mt-1">
                            Oct 24, 2023
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-center px-2 py-1 w-fit rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-100 dark:border-blue-800">
                          Teachers
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          <span className="size-1.5 rounded-full bg-slate-400" />{' '}
                          Draft
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top text-right">
                        <button className="text-slate-400 hover:text-primary p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                          <span className="material-symbols-outlined text-[20px]">
                            more_vert
                          </span>
                        </button>
                      </td>
                    </tr>
                    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-4 align-top max-w-70">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            Annual Sports Day Registration
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 line-clamp-1 text-xs">
                            Students must register for events by Friday. Please
                            distribute forms.
                          </span>
                          <span className="text-slate-400 text-xs mt-1">
                            Oct 10, 2023
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-center px-2 py-1 w-fit rounded bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium border border-purple-100 dark:border-purple-800">
                          Students
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
                          <span className="size-1.5 rounded-full bg-amber-500" />{' '}
                          Archived
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top text-right">
                        <button className="text-slate-400 hover:text-primary p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                          <span className="material-symbols-outlined text-[20px]">
                            more_vert
                          </span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-center">
                <button className="text-sm font-medium text-primary hover:underline">
                  View All History
                </button>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-5/12 flex flex-col gap-4 order-1 xl:order-2">
            <div className="sticky top-4">
              <div className="bg-white dark:bg-[#151b2b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col overflow-hidden h-fit">
                <Form role={role} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function Form({ role }: { role: 'teacher' | 'admin' }) {
  /* validation*/
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PubNotificationType>({
    resolver: zodResolver(PubNotificationSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      sendTo: [],
    },
  })

  /* Submit function */
  const onSubmit: SubmitHandler<PubNotificationType> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

  }

  /* get list of sendTo options*/
  const { data: sendToList = [] } = useGetSendToList()

  const selectedSendTo = watch('sendTo')

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              edit_note
            </span>
            New Announcement
          </h3>
        </div>

        <div className="p-5 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Subject
            </label>
            <input
              {...register('subject')}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400"
              placeholder="e.g. Science Fair Registration Open"
              type="text"
            />
            {errors.subject && (
              <span className="text-xs text-red-500 mt-1">
                {errors.subject.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Send To
            </label>
            <div className="flex gap-3 flex-wrap">
              {selectedSendTo.map((value) => {
                const item = sendToList.find((s) => s.value === value)
                if (!item) return null
                return (
                  <div
                    key={item.value}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-300 dark:border-slate-700"
                  >
                    <span>{item.label}</span>
                    <button
                      type="button"
                      className="size-4 flex items-center justify-center rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      onClick={() => {
                        setValue(
                          'sendTo',
                          selectedSendTo.filter((v) => v !== value),
                        )
                      }}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        close
                      </span>
                    </button>
                  </div>
                )
              })}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    className="inline-flex items-center justify-center size-8 rounded-full border-2 border-dashed bg-transparent border-slate-300 dark:border-slate-600 text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      add
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm bg-background-light dark:bg-background-dark">
                  <DialogHeader>
                    <DialogTitle className="font-bold text-slate-900 dark:text-white">
                      Select Audience
                    </DialogTitle>
                    <DialogDescription className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Choose who will receive this{' '}
                      {role === 'admin' ? 'announcement' : 'notification'}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 flex flex-col gap-3 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg max-h-60 overflow-y-auto">
                    {sendToList.map((item) => {
                      const isSelected = selectedSendTo.includes(item.value)
                      return (
                        <button
                          key={item.value}
                          type="button"
                          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-primary/10 text-primary border border-primary'
                              : 'bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                          }`}
                          onClick={() => {
                            if (isSelected) {
                              setValue(
                                'sendTo',
                                selectedSendTo.filter((v) => v !== item.value),
                              )
                            } else {
                              setValue('sendTo', [
                                ...selectedSendTo,
                                item.value,
                              ])
                            }
                          }}
                        >
                          <span>{item.label}</span>
                          {isSelected && (
                            <span className="material-symbols-outlined text-[18px]">
                              check_circle
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {errors.sendTo && (
            <span className="text-xs text-red-500 mt-1">
              {errors.sendTo.message}
            </span>
          )}
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Content
          </label>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.content && (
            <span className="text-xs text-red-500 mt-1">
              {errors.content.message}
            </span>
          )}
        </div>
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="px-4 py-2 "></div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              disabled={isSubmitting}
            >
              <span>Publish Now</span>
              <span className="material-symbols-outlined text-[18px]">
                send
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
