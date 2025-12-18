import { Outlet, createRootRoute } from '@tanstack/react-router'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect } from 'react'
import { useNotificationsStore } from '@/services/store/notifications_store'

function Root() {
  useEffect(() => {
    const fetchNotifications =
      useNotificationsStore.getState().fetchNotifications
    fetchNotifications()
  }, [])

  return (
    <>
      <Outlet />
      {/* <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      /> */}
    </>
  )
}

export const Route = createRootRoute({
  component: Root,
})
