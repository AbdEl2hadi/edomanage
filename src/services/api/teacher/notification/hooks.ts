import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { notificationFetcher } from './fetcher'
import type {
  AddTeacherNotificationPayload,
  NotificationFilter,
} from '../types/apiType'

export const getTeacherNotificationsQueryOptions = (
  filterAndPagination: NotificationFilter,
) =>
  queryOptions({
    queryKey: ['teacher-notifications', filterAndPagination],
    queryFn: () =>
      notificationFetcher.getTeacherNotifications(filterAndPagination),
  })

export default function useGetTeacherNotifications(
  filterAndPagination: NotificationFilter,
) {
  return useQuery({
    ...getTeacherNotificationsQueryOptions(filterAndPagination),
    placeholderData: keepPreviousData,
  })
}

export function useAddTeacherNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AddTeacherNotificationPayload) =>
      notificationFetcher.addTeacherNotification(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teacher-notifications'],
      })
    },
  })
}

export function useDeleteOwnNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationFetcher.deleteOwnNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teacher-notifications'],
      })
    },
  })
}
