import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { Notification, NotificationFilter, PaginationData } from './types'

const API_URL = 'http://localhost:4000/teacherNotifications'

const getTeacherNotifications = async (
  filterAndPagination: NotificationFilter,
): Promise<PaginationData<Notification>> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const response = await axios.get<Array<Notification>>(API_URL)
  const notifications = response.data

  const { pageIndex = 1, pageSize = 5, ...filters } = filterAndPagination

  const normalizedFilters = Object.entries(filters).reduce<
    Partial<Record<keyof Notification, string>>
  >((acc, [key, value]) => {
    if (!value) {
      return acc
    }

    acc[key as keyof Notification] = String(value).toLowerCase()
    return acc
  }, {})

  const filtered = notifications.filter((notification) => {
    return Object.entries(normalizedFilters).every(([key, value]) => {
      const currentValue = String(
        notification[key as keyof Notification] ?? '',
      ).toLowerCase()
      return currentValue.includes(value)
    })
  })

  const sorted = [...filtered].sort((a, b) => {
    const first = Number.parseInt(String(a.id).replace(/\D/g, ''), 10)
    const second = Number.parseInt(String(b.id).replace(/\D/g, ''), 10)

    if (Number.isNaN(first) || Number.isNaN(second)) {
      return String(b.id).localeCompare(String(a.id))
    }

    return second - first
  })

  const start = (pageIndex - 1) * pageSize
  const end = start + pageSize

  return {
    data: sorted.slice(start, end),
    rowCount: sorted.length,
  }
}

export const getTeacherNotificationsQueryOptions = (
  filterAndPagination: NotificationFilter,
) =>
  queryOptions({
    queryKey: ['teacher-notifications', filterAndPagination],
    queryFn: () => getTeacherNotifications(filterAndPagination),
  })

export default function useGetTeacherNotifications(
  filterAndPagination: NotificationFilter,
) {
  return useQuery({
    ...getTeacherNotificationsQueryOptions(filterAndPagination),
    placeholderData: keepPreviousData,
  })
}
