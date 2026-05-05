import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { NotFound } from './components/NotFound'
import { ErrorComponent } from './components/error'
import { syncAuthSession } from './lib/api'
import { queryClient } from './lib/queryClient'
import { ThemeProvider } from './features/theme/theme-provider'
import './bones/registry.ts'
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultErrorComponent: ErrorComponent,
  defaultNotFoundComponent: NotFound,
  defaultPendingMs: 0,
  defaultPendingMinMs: 50,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

async function bootstrap() {
  const isAuthenticated = await syncAuthSession()

  if (!isAuthenticated && window.location.pathname !== '/') {
    await router.navigate({ to: '/' })
  }

  const rootElement = document.getElementById('app')
  if (!rootElement) {
    return
  }

  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>,
  )
}

void bootstrap()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
