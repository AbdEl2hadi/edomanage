import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'
import { Skeleton } from 'boneyard-js/react'
import type { QueryClient } from '@tanstack/react-query'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanStackDevtools } from '@tanstack/react-devtools'

function getRouteSkeletonName(pathname: string) {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  const parts = pathname
    .split('/')
    .filter(Boolean)
    .map((part) => {
      if (/^\d+$/.test(part) || uuidPattern.test(part)) {
        return 'id'
      }

      const cleaned = part.toLowerCase().replace(/[^a-z0-9-]/g, '')
      return cleaned || 'segment'
    })

  return parts.length ? `route-${parts.join('-')}` : 'route-home'
}

function Root() {
  const location = useLocation()
  const routeSkeletonName = getRouteSkeletonName(location.pathname)

  return (
    <>
      <HeadContent />
      <Skeleton name={routeSkeletonName} loading={false}>
        <Outlet />
      </Skeleton>
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

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Root,
})
