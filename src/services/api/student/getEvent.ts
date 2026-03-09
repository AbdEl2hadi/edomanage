import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { EventForm } from '../../../routes/owner/calendar'

function getEvents(className?: string, teacherId?: string) {
  const now = new Date()
  const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  let params: Record<string, unknown> = {
    startDate: now.toISOString().split('T')[0],
    endDate: in30Days.toISOString().split('T')[0],
  }

  if (className) {
    params = { ...params, className }
  } else if (teacherId) {
    params = { ...params, teacherId }
  }

  return axios
    .get<Array<EventForm>>('http://localhost:4000/events', { params })
    .then((res) => res.data)
}

export const useGetEventsOptions = (
  className?: string,
  teacherId?: string,
) => ({
  queryKey: ['events', className ?? teacherId ?? 'all'],
  queryFn: () => getEvents(className, teacherId),
  enabled: true,
})

export default function useGetEvents(className?: string, teacherId?: string) {
  return useQuery(useGetEventsOptions(className, teacherId))
}
