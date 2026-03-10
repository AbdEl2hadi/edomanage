import { createFileRoute } from '@tanstack/react-router'
import { LeftPanel } from '../auth/signup/components/leftPanel'
import { RightPanel } from '../auth/signup/components/signup'

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Sign Up - EduManage' }],
  }),
})

function RouteComponent() {
  return (
    <div className="bg-white dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-white h-screen overflow-hidden overflow-x-hidden">
      <div className="flex h-full w-full flex-row">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  )
}
