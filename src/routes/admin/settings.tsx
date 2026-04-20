import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from 'boneyard-js/react'
import SettingsComp from '@/components/settings/admin/settingsComp'

export const Route = createFileRoute('/admin/settings')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Admin | Settings - EduManage' }],
  }),
})

function RouteComponent() {
  return (
    <Skeleton name="admin-settings-page" loading={false}>
      <SettingsComp />
    </Skeleton>
  )
}
