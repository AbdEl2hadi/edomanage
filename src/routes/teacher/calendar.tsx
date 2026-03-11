import { createFileRoute } from '@tanstack/react-router'
import { GlobalCalendar } from '@/components/calendar'
import { queryClient } from '@/lib/queryClient'
import { useGetEventsOptions } from '@/services/api/getEvents'

export const Route = createFileRoute('/teacher/calendar')({
  component: TeacherCalendar,
  head: () => ({
    meta: [{ title: 'Teacher | Calendar - EduManage' }],
  }),
  loader: async () => {
    await queryClient.prefetchQuery(useGetEventsOptions(undefined, 'td-123'))
  },
})

function TeacherCalendar() {
  return <GlobalCalendar teacherId="td-123" />
}
