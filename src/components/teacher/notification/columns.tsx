import type { ColumnDef } from '@tanstack/react-table'

import type { Notification } from '@/services/api/teacher/types/modelType'
import { getColors } from '@/routes/teacher/notifications'
import { notificationFetcher } from '@/services/api/teacher/notification/fetcher'

export const columns: Array<ColumnDef<Notification>> = [
  {
    accessorKey: 'title',
    header: 'Title',
    size: 40,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate">
            {row.original.title}
          </span>
          <span className="text-slate-400 text-xs mt-1">
            {row.original.time}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'audience',
    header: 'Audience',
    size: 25,
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-1">
          <div className="flex items-center justify-center px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-100 dark:border-blue-800">
            {row.original.sendTo?.[0]}
          </div>
          {row.original.sendTo?.[1] && (
            <div className="flex items-center justify-center px-2 py-1 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium border border-purple-100 dark:border-purple-800">
              {row.original.sendTo[1]}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    size: 18,
    cell: ({ row }) => {
      const type = row.original.type
      const colors = getColors(type)
      return (
        <span
          className={`inline-flex items-center rounded-md ${colors.bg} ${colors.darkBg} px-2 py-0.5 text-xs font-medium ${colors.text} ring-1 ring-inset ${colors.ring}`}
        >
          {type}
        </span>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 17,
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <div className="flex items-center justify-end gap-2">
          <button
            className="rounded p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors cursor-pointer"
            title={`Edit ${id}`}
            type="button"
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button
            className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors cursor-pointer"
            title={`Delete ${id}`}
            type="button"
            onClick={async (event) => {
              event.stopPropagation()
              await notificationFetcher.deleteOwnNotification(id)
            }}
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>
        </div>
      )
    },
  },
]
