export type TypeTabFilter =
  | 'All'
  | 'Unread'
  | 'Urgent'
  | 'Teachers'
  | 'Administration'

export type NotificationsProps = {
  initialTab?: TypeTabFilter
}

export type NotificationListProps = {
  tab?: TypeTabFilter
  searchText?: string
  data?: Array<ResourceCard>
  isLoading?: boolean
  error?: any
}

export type ResourceCard = {
  id: string
  type: string
  title: string
  subject: string
  time: string
  read?: boolean
}
