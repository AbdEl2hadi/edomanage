import { createFileRoute } from '@tanstack/react-router'
import AddNotification from '@/components/notification/addNotification'
import { sendToListQueryOptions } from '@/components/notification/getSendToList'
import { queryClient } from '@/lib/queryClient'

export const Route = createFileRoute('/teacher/notifications/add')({
  component: RouteComponent,
  loader: () => queryClient.ensureQueryData(sendToListQueryOptions),
  head: () => ({
    meta: [{ title: 'Teacher | Add Notification - EduManage' }],
  }),
})

function RouteComponent() {
  return <AddNotification role="teacher" />
}
