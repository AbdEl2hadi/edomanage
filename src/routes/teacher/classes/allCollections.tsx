import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import useGetAllCollections, {
  getAllCollectionsQueryOptions,
} from '@/services/api/teacher/getAllCollections'
import { queryClient } from '@/lib/queryClient'
import Loading from '@/components/loading'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import addOrEditCollection from '@/services/api/teacher/addOrEditCollection'
import deleteCollection from '@/services/api/teacher/deleteCollection'

export const Route = createFileRoute('/teacher/classes/allCollections')({
  component: RouteComponent,
  loader: () => {
    queryClient.ensureQueryData(getAllCollectionsQueryOptions(true))
  },
})

const nameSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})
type NameFormType = z.infer<typeof nameSchema>

function RouteComponent() {
  /* route*/
  const router = useRouter()
  const {
    data: folders,
    isError: isFoldersError,
    isFetching: isFoldersFetching,
    refetch: refetchFolders,
  } = useGetAllCollections(true)

  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [toast, setToast] = useState<{
    show: boolean
    message: string
    type: 'success' | 'error'
  }>({ show: false, message: '', type: 'success' })
  /* bg gradient*/
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-red-600',
    'from-violet-500 to-purple-600',
    'from-slate-500 to-slate-700',
  ]
  const bgGradientArray = useMemo(() => {
    const scope = folders?.length === undefined ? 0 : folders.length
    const bgGradient = []
    for (let i = 0; i < scope; i++) {
      bgGradient.push(gradients[Math.floor(Math.random() * gradients.length)])
    }
    return bgGradient
  }, [folders])

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-300 mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">
              Resource Folders
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              Organize and manage your classroom materials and student
              collections.
            </p>
          </div>
        </div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Create New Card (opens dialog) */}
          <AddOrEditCollectionDialog role={'add'} refetchFolders={refetchFolders} />
          {isFoldersFetching ? (
            <Loading />
          ) : isFoldersError || !folders ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-slate-500">
                Failed to load collections.
              </p>
              <button
                className="ml-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                onClick={() => refetchFolders()}
              >
                Retry
              </button>
              <button
                className="ml-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors"
                onClick={() => router.history.back()}
              >
                View All Collections
              </button>
            </div>
          ) : (
            folders.map((folder, index) => {
              const formatDate = (dateString: string) => {
                const date = new Date(dateString)
                const options: Intl.DateTimeFormatOptions = {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }
                return date.toLocaleDateString(undefined, options)
              }

              return (
                <div key={folder.id} className="relative">
                  <button
                    onClick={() => {
                      setSelectedDeleteId(folder.id)
                      setIsAlertOpen(true)
                    }}
                    className="size-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 z-30 absolute top-2 right-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                  <AddOrEditCollectionDialog role={'edit'} id={folder.id} refetchFolders={refetchFolders} />
                  <Link
                    to={`/teacher/classes/$folderId`}
                    params={{ folderId: folder.id.toString() }}
                  >
                    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div
                        className={`h-32 bg-linear-to-br ${bgGradientArray[index]} p-4 flex justify-between items-start relative overflow-hidden`}
                      >
                        <div className="absolute -right-4 -bottom-4 opacity-20">
                          <span className="material-symbols-outlined text-8xl text-white">
                            folder
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-white text-3xl">
                          folder
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                          {folder.name}
                        </h3>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                            <span className="material-symbols-outlined text-sm">
                              description
                            </span>
                            <span>{folder.filesCount} files</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                            <span className="material-symbols-outlined text-xs">
                              history
                            </span>
                            <span>
                              Last updated: {formatDate(folder.updatedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })
          )}
        </div>
        {/* alert to confirm delete */}
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete collection</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Are you sure you want to delete this collection? This action
              cannot be undone.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel className='cursor-pointer' onClick={() => setIsAlertOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (!selectedDeleteId) return
                  try {
                    await deleteCollection(selectedDeleteId)
                    refetchFolders()
                    setToast({
                      show: true,
                      message: 'Collection deleted',
                      type: 'success',
                    })
                  } catch (err) {
                    setToast({
                      show: true,
                      message: 'Failed to delete collection',
                      type: 'error',
                    })
                  } finally {
                    setIsAlertOpen(false)
                    setSelectedDeleteId(null)
                    setTimeout(
                      () => setToast((t) => ({ ...t, show: false })),
                      2000,
                    )
                  }
                }}
                className='cursor-pointer'
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {toast.show && (
          <div className="fixed right-6 top-6 z-50 w-80">
            <Alert
              className={
                toast.type === 'error'
                  ? 'bg-red-600 text-white border-red-700'
                  : 'bg-emerald-600 text-white border-emerald-700'
              }
              variant={toast.type === 'error' ? 'destructive' : 'default'}
            >
              <AlertTitle>
                {toast.type === 'error' ? 'Error' : 'Success'}
              </AlertTitle>
              <AlertDescription>{toast.message}</AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </main>
  )
}

function AddOrEditCollectionDialog({
  role,
  id,
  refetchFolders,
}: {
  role: 'add' | 'edit'
  id?: string
  refetchFolders: () => void
}) {
  /* handle form collection*/
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NameFormType>({
    resolver: zodResolver(nameSchema),
    mode: 'onSubmit',
  })
  const onSubmit: SubmitHandler<NameFormType> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    role === 'add'
      ? await addOrEditCollection(data.name, 'add')
      : await addOrEditCollection(data.name, 'edit', id)
    reset()
    setDialogOpen(false)
    refetchFolders()
  }
  const [dialogOpen, setDialogOpen] = useState(false)
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {role === 'edit' ? (
          <button className="size-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 z-30 absolute top-2 right-12 cursor-pointer">
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
        ) : (
          <div className="group flex flex-col items-center justify-center gap-4 p-8 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/30 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer min-h-60">
            <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">
                create_new_folder
              </span>
            </div>
            <div className="text-center">
              <p className="text-slate-900 dark:text-white text-lg font-bold">
                Create New Folder
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Add a new collection
              </p>
            </div>
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Collection</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new collection.
          </DialogDescription>
        </DialogHeader>
        <form
          className="py-4 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="collection-name"
            >
              Name
            </label>
            <input
              id="collection-name"
              type="text"
              required
              className="w-full rounded border border-slate-300 dark:border-slate-700 px-3 py-2 bg-transparent text-slate-900 dark:text-white"
              {...register('name')}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <DialogFooter>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded bg-primary text-white hover:bg-blue-700 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {role === 'edit'
                ? isSubmitting
                  ? 'Saving...'
                  : 'Save Changes'
                : isSubmitting
                  ? 'Creating...'
                  : 'Create Collection'}
            </button>
          </DialogFooter>
        </form>
        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}
