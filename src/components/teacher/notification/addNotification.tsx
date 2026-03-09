import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
/* richTextEditor*/
import { DialogTitle } from '@radix-ui/react-dialog'
import QuillEditor from '../../ui/quillEditor'

/* dropDownMenu*/
import { Button } from '../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '../../ui/dialog'

import { getPubNotificationSchema } from './pubnotification.schema'
import useGetSendToList from './getSendToList'
import OwnNotificationTable from './ownNotification-table'
import { columns } from './columns'
import type { PubNotificationType } from './pubnotification.schema'

import type { SubmitHandler } from 'react-hook-form'
import type {
  Notification,
  NotificationAttachment,
  NotificationFilter,
} from '@/services/api/teacher/types'
import Loading from '@/components/loading'
import useGetTeacherNotifications from '@/services/api/teacher/getTeacherNotifications'
import useAddTeacherNotification from '@/services/api/teacher/addTeacherNotification'

const inferAttachmentKind = (file: File): NotificationAttachment['kind'] => {
  if (file.type.startsWith('image/')) {
    return 'image'
  }

  if (file.type.startsWith('video/')) {
    return 'video'
  }

  return 'document'
}

const fileToDataUrl = async (file: File): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
        return
      }

      reject(new Error('Failed to read file'))
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsDataURL(file)
  })
}

const mapFilesToAttachments = async (
  files: Array<File>,
): Promise<Array<NotificationAttachment>> => {
  return await Promise.all(
    files.map(async (file) => {
      const href = await fileToDataUrl(file)
      const extension = file.name.split('.').pop()?.toUpperCase() ?? 'FILE'

      return {
        href,
        label: file.name,
        extension,
        kind: inferAttachmentKind(file),
      }
    }),
  )
}

export default function AddNotification({
  role,
  filters,
  onFilterChange,
}: {
  role: 'teacher' | 'admin'
  filters: NotificationFilter
  onFilterChange: (nextFilters: Partial<NotificationFilter>) => void
}) {
  const paginationState = {
    pageIndex: filters.pageIndex ?? 1,
    pageSize: filters.pageSize ?? 5,
  }

  const {
    data: notificationsData,
    isLoading: isNotificationsLoading,
    isError: isNotificationsError,
  } = useGetTeacherNotifications(filters)
  const data: Array<Notification> = notificationsData?.data ?? []
  const rowCount = notificationsData?.rowCount ?? 0

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
            {isNotificationsLoading ? (
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151b2b] overflow-hidden">
                <Loading
                  className="py-16"
                  text="Loading notifications…"
                  description="Please wait while we fetch your notifications."
                />
              </div>
            ) : isNotificationsError ? (
              <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/10 flex flex-col items-center justify-center gap-3 py-16 text-center px-6">
                <span className="material-symbols-outlined text-red-400 text-5xl">
                  notifications_off
                </span>
                <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
                  Failed to load notifications
                </p>
                <p className="text-sm text-slate-400">
                  Could not fetch notification data. Please try again later.
                </p>
              </div>
            ) : data.length === 0 ? (
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151b2b] flex flex-col items-center justify-center gap-3 py-16 text-center px-6">
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-6xl">
                  mark_unread_chat_alt
                </span>
                <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
                  No notifications yet
                </p>
                <p className="text-sm text-slate-400">
                  Use the form to send your first notification.
                </p>
              </div>
            ) : (
              <OwnNotificationTable
                data={data}
                columns={columns}
                pagination={paginationState}
                paginationOptions={{
                  onPaginationChange: (pagination) => {
                    const nextPagination =
                      typeof pagination === 'function'
                        ? pagination(paginationState)
                        : pagination

                    onFilterChange({
                      pageIndex: nextPagination.pageIndex,
                      pageSize: nextPagination.pageSize,
                    })
                  },
                  rowCount,
                }}
                filters={filters}
                onFilterChange={onFilterChange}
              />
            )}
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
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PubNotificationType>({
    resolver: zodResolver(getPubNotificationSchema(role)),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      attachments: [],
      sendTo: role === 'teacher' ? ['Students'] : [],
      type: 'Teacher',
    },
  })

  const addTeacherNotificationMutation = useAddTeacherNotification()

  /* Submit function */
  const onSubmit: SubmitHandler<PubNotificationType> = async (data) => {
    const attachments = await mapFilesToAttachments(data.attachments ?? [])

    await addTeacherNotificationMutation.mutateAsync({
      role,
      subject: data.subject.trim(),
      content: data.content.trim(),
      attachments,
      sendTo: role === 'admin' ? data.sendTo : undefined,
      type: data.type,
    })

    reset({
      attachments: [],
      subject: '',
      content: '',
      sendTo: [],
      type: 'Teacher',
    })
  }

  /* get list of sendTo options*/
  const {
    data: sendToList = [],
    isLoading: isSendToLoading,
    isError: isSendToError,
  } = useGetSendToList()

  const watchedSendTo = watch('sendTo')
  const watchedAttachments = watch('attachments')
  const selectedSendTo = Array.isArray(watchedSendTo) ? watchedSendTo : []
  const selectedAttachments = Array.isArray(watchedAttachments)
    ? watchedAttachments
    : []

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
          {role === 'admin' && (
            <>
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
                          Choose who will receive this announcement.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4 flex flex-col gap-3 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg max-h-60 overflow-y-auto">
                        {isSendToLoading ? (
                          <p className="text-center text-xs text-slate-400 py-4">
                            Loading audience list…
                          </p>
                        ) : isSendToError ? (
                          <p className="text-center text-xs text-red-400 py-4">
                            Failed to load audience list.
                          </p>
                        ) : sendToList.length === 0 ? (
                          <p className="text-center text-xs text-slate-400 py-4">
                            No options available.
                          </p>
                        ) : (
                          sendToList.map((item) => {
                            const isSelected = selectedSendTo.includes(
                              item.value,
                            )
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
                                      selectedSendTo.filter(
                                        (v) => v !== item.value,
                                      ),
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
                          })
                        )}
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
            </>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Type
            </label>
            <select
              {...register('type')}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="Teacher">General</option>
              <option value="Urgent">Urgent</option>
              <option value="Administrative">Administrative</option>
              <option value="User">User</option>
              <option value="Grade">Grade</option>
              <option value="Book">Book</option>
            </select>
          </div>
          {errors.type && (
            <span className="text-xs text-red-500 mt-1">
              {errors.type.message}
            </span>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Attach Files
            </label>
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-800/40">
              <div className="flex flex-wrap items-center gap-2">
                <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:border-primary hover:text-primary dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
                  <span className="material-symbols-outlined text-[18px]">
                    upload_file
                  </span>
                  <span>Add files</span>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.svg,.bmp,.avif,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.odt,.ods,.odp"
                    onChange={(event) => {
                      const pickedFiles = Array.from(event.target.files ?? [])
                      if (pickedFiles.length === 0) {
                        return
                      }

                      const nextFiles = [
                        ...selectedAttachments,
                        ...pickedFiles,
                      ].slice(0, 3)
                      setValue('attachments', nextFiles, {
                        shouldValidate: true,
                      })

                      event.currentTarget.value = ''
                    }}
                  />
                </label>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Max 3 files • 5MB each • PDF, images, Word, Excel, PowerPoint,
                  CSV, TXT, ODF
                </span>
              </div>

              {selectedAttachments.length > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                  {selectedAttachments.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-900"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-800 dark:text-slate-200">
                          {file.name}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800"
                        onClick={() => {
                          const nextFiles = selectedAttachments.filter(
                            (_, attachmentIndex) => attachmentIndex !== index,
                          )
                          setValue('attachments', nextFiles, {
                            shouldValidate: true,
                          })
                        }}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          close
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.attachments && (
              <span className="text-xs text-red-500 mt-1">
                {errors.attachments.message}
              </span>
            )}
          </div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Content
          </label>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <QuillEditor value={field.value} onChange={field.onChange} />
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
              disabled={
                isSubmitting || addTeacherNotificationMutation.isPending
              }
            >
              <span>Publish Now</span>
              <span className="material-symbols-outlined text-[18px]">
                send
              </span>
            </button>
          </div>
        </div>
        {addTeacherNotificationMutation.isError && (
          <div className="px-5 pb-4">
            <p className="text-xs text-red-500">
              Couldn&apos;t publish notification. Please try again.
            </p>
          </div>
        )}
      </form>
    </>
  )
}
