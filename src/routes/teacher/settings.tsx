import { createFileRoute } from '@tanstack/react-router'
import SettingsComp from '@/components/settings/rest/settingsComp'

export const Route = createFileRoute('/teacher/settings')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Teacher | Settings - EduManage' }],
  }),
  beforeLoad: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
})



function RouteComponent() {
  return <SettingsComp user="teacher" />
}
