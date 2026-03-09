import { createFileRoute } from '@tanstack/react-router'

import { queryClient } from '@/lib/queryClient'
import { useGetEventsOptions } from '@/services/api/student/getEvent'

import { GlobalCalendar } from '@/components/calendar'

export const Route = createFileRoute('/student/calendar')({
  component: StudentCalendar,
  head: () => ({
    meta: [{ title: 'Student | Calendar - EduManage' }],
  }),
  loader: async () => {
    await queryClient.prefetchQuery(useGetEventsOptions('Class-B'))
  },
})

function StudentCalendar() {
  return <GlobalCalendar className="Class-B" />
}
