import type { NotificationFilter } from "@/lib/Types/FilterTypes"
import type { Notification } from "@/lib/Types/NotificationTypes"

export const filterNotifications = (
  notifications: Array<Notification>,
  filterAndPagination: NotificationFilter,
): PaginationData<Notification> => {
  const { page = 1, size = 5, ...filters } = filterAndPagination

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

  const start = (page - 1) * size
  const end = start + size

  return {
    data: sorted.slice(start, end),
    rowCount: sorted.length,
  }
}
