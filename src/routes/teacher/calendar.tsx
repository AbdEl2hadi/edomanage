import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from 'boneyard-js/react'
import { GlobalCalendar } from '@/components/calendar'
import { queryClient } from '@/lib/queryClient'
import { useGetEventsOptions } from '@/services/api/getEvents'

export const Route = createFileRoute('/teacher/calendar')({
  component: TeacherCalendar,
  pendingComponent: () => (
    <Skeleton name="teacher-calendar-page" loading>
      <TeacherCalendarContent />
    </Skeleton>
  ),
  pendingMs: 0,
  pendingMinMs: 220,
  head: () => ({
    meta: [{ title: 'Teacher | Calendar - EduManage' }],
  }),
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await queryClient.prefetchQuery(useGetEventsOptions(undefined, 'td-123'))
  },
})

function TeacherCalendar() {
  return (
    <Skeleton name="teacher-calendar-page" loading={false}>
      <TeacherCalendarContent />
    </Skeleton>
  )
}

function TeacherCalendarContent() {
  return <GlobalCalendar teacherId="td-123" />
}
