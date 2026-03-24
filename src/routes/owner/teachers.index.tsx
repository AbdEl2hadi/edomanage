import { createFileRoute } from '@tanstack/react-router'
import type { UICardType } from '@/components/owner/UICard'
import IndexPageComponent from '@/components/owner/IndexPageComponent'

export const Route = createFileRoute('/owner/teachers/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Owner | Teachers - EduManage' }],
  }),
})

const subjects = [
  { label: 'All Subjects', value: null },
  { label: 'Math', value: 'math' },
  { label: 'Science', value: 'science' },
  { label: 'English', value: 'english' },
  { label: 'History', value: 'history' },
  { label: 'Physical Education', value: 'physical_education' },
]

const status = [
  { label: 'All Status', value: null },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
]

const UICardList: Array<UICardType> = [
  {
    id: '0',
    iconName: 'school',
    iconColor: 'blue',
    stateIcon: 'trending_up',
    percentage: 5,
    cardTitle: 'Total Teachers',
    info: '42',
  },
  {
    id: '1',
    iconName: 'bolt',
    iconColor: 'green',
    stateIcon: 'trending_up',
    percentage: 2,
    cardTitle: 'Active Now',
    info: '38',
  },
  {
    id: '2',
    iconName: 'person_add',
    iconColor: 'purple',
    stateIcon: 'trending_up',
    percentage: 10,
    cardTitle: 'New This Month',
    info: '3',
  },
]

function RouteComponent() {
  return (
    <IndexPageComponent
      role="teacher"
      filters={[subjects, status]}
      UICards={UICardList}
    />
  )
}
