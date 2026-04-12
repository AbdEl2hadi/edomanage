import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from 'boneyard-js/react'
import SettingsComp from '@/components/settings/rest/settingsComp'

export const Route = createFileRoute('/student/settings')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Student | Settings - EduManage' }],
  }),
})

function RouteComponent() {
  return (
    <Skeleton name="student-settings-page" loading={false}>
      <SettingsComp user="student" />
    </Skeleton>
  )
}
