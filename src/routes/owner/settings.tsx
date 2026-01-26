import { createFileRoute } from '@tanstack/react-router'
import SettingsComp from '@/components/settings/owner/settingsComp'

export const Route = createFileRoute('/owner/settings')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Owner | Settings - EduManage' }],
  }),
})

function RouteComponent() {
  return <SettingsComp />
}
