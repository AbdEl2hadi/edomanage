import { createFileRoute } from '@tanstack/react-router'
import SettingsComp from '@/components/settings/rest/settingsComp'

export const Route = createFileRoute('/student/settings')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Student | Settings - EduManage' }],
  }),
})

function RouteComponent() {
  return <SettingsComp user="student" />
}
