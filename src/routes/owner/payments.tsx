import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/payments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/owner/payements"!</div>
}
