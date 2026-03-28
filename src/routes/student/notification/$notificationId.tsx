import { createFileRoute } from '@tanstack/react-router'
import NotificationDetail from '@/components/student/studentNotificationDetail'

export const Route = createFileRoute('/student/notification/$notificationId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { notificationId } = Route.useParams()
  return <NotificationDetail notificationId={notificationId} />
}
