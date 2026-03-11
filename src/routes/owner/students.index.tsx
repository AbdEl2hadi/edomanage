import { createFileRoute } from '@tanstack/react-router'
import type { UICardType } from '../../components/owner/UICard'
import IndexPageComponent from '@/components/owner/IndexPageComponent'

export const Route = createFileRoute('/owner/students/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Owner | Students - EduManage' }],
  }),
})

const grades = [
  { label: 'All Grades', value: null },
  { label: 'Grade 9', value: 'grade_9' },
  { label: 'Grade 10', value: 'grade_10' },
  { label: 'Grade 11', value: 'grade_11' },
  { label: 'Grade 12', value: 'grade_12' },
]
const status = [
  { label: 'All Status', value: null },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'Pending' },
]

const UICardList: Array<UICardType> = [
  {
    id: '0',
    iconName: 'groups',
    iconColor: 'blue',
    stateIcon: 'trending_up',
    percentage: 5,
    cardTitle: 'Total Students',
    info: '452',
  },
  {
    id: '1',
    iconName: 'person_add',
    iconColor: 'purple',
    stateIcon: 'trending_up',
    percentage: 12,
    cardTitle: 'New Enrollments',
    info: '34',
  },
  {
    id: '2',
    iconName: 'calendar_month',
    iconColor: 'orange',
    stateIcon: 'trending_up',
    percentage: 96,
    cardTitle: 'Average Attendance',
    info: 'Last 30 days',
  },
]

function RouteComponent() {
  return (
    <IndexPageComponent
      role="student"
      filters={[grades, status]}
      UICards={UICardList}
    />
  )
}
