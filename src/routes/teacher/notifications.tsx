import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/teacher/notification"!</div>
}
