import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
