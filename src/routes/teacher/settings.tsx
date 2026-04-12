import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from 'boneyard-js/react'
import SettingsComp from '@/components/settings/rest/settingsComp'

export const Route = createFileRoute('/teacher/settings')({
  component: RouteComponent,
  pendingComponent: TeacherSettingsPending,
  head: () => ({
    meta: [{ title: 'Teacher | Settings - EduManage' }],
  }),
  beforeLoad: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  },
})

function TeacherSettingsPending() {
  return (
    <Skeleton name="teacher-settings-page" loading>
      <SettingsComp user="teacher" />
    </Skeleton>
  )
}

function RouteComponent() {
  return (
    <Skeleton name="teacher-settings-page" loading={false}>
      <SettingsComp user="teacher" />
    </Skeleton>
  )
}
