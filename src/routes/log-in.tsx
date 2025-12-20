import { createFileRoute } from '@tanstack/react-router'
import Screen from '../auth/login/components/screen'
import Login from '../auth/login/components/login'

export const Route = createFileRoute('/log-in')({
  component: login,
})

function login() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111318] dark:text-white font-display overflow-x-hidden transition-colors duration-200">
      <div className="flex min-h-screen w-full flex-row">
        <Login />
        <Screen />
      </div>
    </div>
  )
}
