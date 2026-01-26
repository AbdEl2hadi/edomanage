import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/classes')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Teacher | Classes - EduManage' }],
  }),
})

function RouteComponent() {
  return <div>Hello "/teacher/classes"!</div>
}
