import { useQuery } from '@tanstack/react-query'
import type { EventForm } from '@/components/admin/calendar/model'
import { api } from '@/lib/api'

function getEvents(className?: string, teacherId?: string, isAdmin = false) {
  const now = new Date()
  const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  let params: Record<string, unknown> = {}

  if (!isAdmin) {
    params = {
      ...params,
      startDate: now.toISOString().split('T')[0],
      endDate: in30Days.toISOString().split('T')[0],
    }
  }

  if (className && !isAdmin) {
    params = { ...params, className }
  } else if (teacherId && !isAdmin) {
    params = { ...params, teacherId }
  }

  return api
    .get<Array<EventForm>>('http://localhost:4000/events', { params })
    .then((res) => res.data)
}

export const useGetEventsOptions = (
  className?: string,
  teacherId?: string,
  isAdmin = false,
) => ({
  queryKey: [
    'events',
    isAdmin ? 'admin-all' : (className ?? teacherId ?? 'all'),
  ],
  queryFn: () => getEvents(className, teacherId, isAdmin),
  enabled: true,
})

export default function useGetEvents(
  className?: string,
  teacherId?: string,
  isAdmin = false,
) {
  return useQuery(useGetEventsOptions(className, teacherId, isAdmin))
}
