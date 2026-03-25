import { useQuery } from '@tanstack/react-query'

const fetchNotification = async () => {
  const res = await fetch('http://localhost:4000/notifications')
  if (!res.ok) {
    throw new Error('Failed to fetch notifications')
  }
  return res.json()
}

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotification,
    staleTime: 5 * 60 * 1000,
  })
}
