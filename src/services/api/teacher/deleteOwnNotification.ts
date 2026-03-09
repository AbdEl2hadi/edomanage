import axios from 'axios'

import { queryClient } from '@/lib/queryClient'

const API_URL = 'http://localhost:4000/teacherNotifications'

const deleteOwnNotification = async (notId: string) => {
  if (!notId) {
    throw new Error('Notification id is required')
  }

  try {
    await axios.delete(`${API_URL}/${notId}`)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      await queryClient.invalidateQueries({
        queryKey: ['teacher-notifications'],
      })
      return
    }

    throw error
  }

  await queryClient.invalidateQueries({
    queryKey: ['teacher-notifications'],
  })
}

export default deleteOwnNotification
