import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/$teachersId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/owner/$teachersId"!</div>
}
