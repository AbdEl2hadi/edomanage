import { createFileRoute } from '@tanstack/react-router'
import DataTable from '@/components/owner/dataTable/dataTable'

export const Route = createFileRoute('/owner/payments')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Owner | Payments - EduManage' }],
  }),
})

function RouteComponent() {
  return <DataTable />
}
