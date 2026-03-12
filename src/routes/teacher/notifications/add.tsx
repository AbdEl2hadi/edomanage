import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

import AddNotification from '@/components/teacher/notification/addNotification'
import { sendToListQueryOptions } from '@/components/teacher/notification/getSendToList'
import { useFilterResource } from '@/hooks/teacher/use-filter-resource'
import { queryClient } from '@/lib/queryClient'
import { getTeacherNotificationsQueryOptions } from '@/services/api/teacher/notification/hooks'

export const NotificationSearchSchema = z.object({
  pageIndex: z.number().catch(1).default(1),
  pageSize: z.number().catch(5).default(5),
  title: z.string().optional().catch(undefined),
  type: z
    .enum(['Urgent', 'Teacher', 'Administrative', 'User', 'Grade', 'Book'])
    .optional()
    .catch(undefined),
  subject: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/teacher/notifications/add')({
  component: RouteComponent,
  validateSearch: NotificationSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) =>
    Promise.all([
      queryClient.ensureQueryData(sendToListQueryOptions),
      queryClient.ensureQueryData(getTeacherNotificationsQueryOptions(deps)),
    ]),
  head: () => ({
    meta: [{ title: 'Teacher | Add Notification - EduManage' }],
  }),
})

function RouteComponent() {
  const { filters, setFilters } = useFilterResource(Route.id)

  return (
    <AddNotification
      role="teacher"
      filters={filters}
      onFilterChange={setFilters}
    />
  )
}
