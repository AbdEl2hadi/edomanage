import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/notifications')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Teacher | Notifications - EduManage' }],
  }),
})

function RouteComponent() {
  return <div>Hello "/teacher/notification"!</div>
}
