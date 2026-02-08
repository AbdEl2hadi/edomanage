import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/teachers/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/owner/teachers/add"!</div>
}
