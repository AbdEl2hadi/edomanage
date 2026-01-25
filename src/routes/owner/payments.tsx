import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/payments')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Owner | Payments - EduManage' }],
  }),
})

function RouteComponent() {
  return <div>Hello "/owner/payements"!</div>
}
