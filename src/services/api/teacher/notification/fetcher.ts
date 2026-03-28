import axios from 'axios'

import { filterNotifications } from './filter'
import type {
  AddTeacherNotificationPayload,
  NotificationFetcher,
  NotificationFilter,
  PaginationData,
} from '../types/apiType'
import type { Notification } from '../types/modelType'

const API_URL = 'http://localhost:4000/teacherNotifications'

const buildAudience = (
  role: 'teacher' | 'admin',
  sendTo: Array<string> = [],
): NonNullable<Notification['sendTo']> => {
  const normalized = sendTo.filter(
    (value): value is 'Students' | 'Teachers' =>
      value === 'Students' || value === 'Teachers',
  )

  if (normalized.length > 0) {
    return normalized
  }

  return role === 'teacher' ? ['Students'] : ['Teachers', 'Students']
}

class JsonNotificationFetcher implements NotificationFetcher {
  async getTeacherNotifications(
    filterAndPagination: NotificationFilter,
  ): Promise<PaginationData<Notification>> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const response = await axios.get<Array<Notification>>(API_URL)
    return filterNotifications(response.data, filterAndPagination)
  }

  async getTeacherNotification(notificationId: string): Promise<Notification> {
    if (!notificationId) {
      throw new Error('Notification id is required')
    }
    const response = await axios.get<Notification>(
      `${API_URL}/${notificationId}`,
    )
    return response.data
  }

  async addTeacherNotification({
    role,
    subject,
    content,
    attachments,
    type,
    sendTo,
  }: AddTeacherNotificationPayload): Promise<Notification> {
    const audience = buildAudience(role, sendTo)

    const data: Notification = {
      id: `tn-${Date.now()}`,
      type,
      title: subject,
      content,
      subject: audience.join(' • '),
      sendTo: audience,
      attachments: attachments ?? [],
      time: new Date().toLocaleString(),
    }

    const response = await axios.post<Notification>(API_URL, data)
    return response.data
  }

  async deleteOwnNotification(notificationId: string): Promise<void> {
    if (!notificationId) {
      throw new Error('Notification id is required')
    }

    try {
      await axios.delete(`${API_URL}/${notificationId}`)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return
      }

      throw error
    }
  }
}

export const notificationFetcher: NotificationFetcher =
  new JsonNotificationFetcher()
