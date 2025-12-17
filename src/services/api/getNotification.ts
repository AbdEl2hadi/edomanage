export type Not = Array<{
  id: number
  type: string
  title: string
  message: string
  time: string
}>

export async function getNotification() {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const notifications: Not = [
    {
      id: 1,
      type: 'campaign',
      title: 'New Course Material',
      message: 'New course material available for Mathematics 101.',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Assignment Deadline',
      message: 'Your assignment submission deadline is tomorrow.',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'check_circle',
      title: 'Profile Updated',
      message: 'Your profile has been successfully updated.',
      time: '1 day ago',
    },
    {
      id: 4,
      type: 'school',
      title: 'Grades Posted',
      message: 'New grades have been posted for History 202.',
      time: '2 days ago',
    },
  ]
  return notifications
}
