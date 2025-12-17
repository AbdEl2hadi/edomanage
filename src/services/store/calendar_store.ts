import { create } from 'zustand'

export type CalendarView = 'month' | 'week' | 'day'

interface CalendarState {
  view: CalendarView
  selectedDay: number

  setView: (view: CalendarView) => void
  setSelectedDay: (day: number) => void
  goToToday: () => void
}

export const useCalendarStore = create<CalendarState>((set) => ({
  view: 'month',
  selectedDay: 1,

  setView: (view) => set({ view }),
  setSelectedDay: (day) => set({ selectedDay: day }),
  goToToday: () => set({ selectedDay: new Date().getDate() }),
}))
