import { create } from 'zustand'
import type { Not } from '@/services/api/getNotification'
import { getNotification } from '@/services/api/getNotification'

type NotificationState = {
  notifications: Not | []
	clearNotifications: () => void
  loading: boolean
  fetchNotifications: () => Promise<void>
}

export const useNotificationsStore = create<NotificationState>((set) => ({
  notifications: [],
	clearNotifications: () => set({ notifications: [] }),
  loading: false,
  fetchNotifications: async () => {
    set({ loading: true })
    try {
      const data = await getNotification()
      set({ notifications: data, loading: false })
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
      set({ loading: false })
    }
  },
}))

// Selector to prevent unnecessary re-renders

