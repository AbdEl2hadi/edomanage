import { createFileRoute } from '@tanstack/react-router'
import TeacherNotificationDetail from '@/components/teacher/notification/teacherNotificationDetail'

export const Route = createFileRoute('/teacher/notifications/$notificationId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { notificationId } = Route.useParams()
  return <TeacherNotificationDetail notificationId={notificationId} />
}
