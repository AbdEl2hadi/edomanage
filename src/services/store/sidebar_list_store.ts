import { create } from 'zustand'

type SideBarListeState = {
  choosenItem: string
  setChoosen: (value: string) => void
}

const useSideBarListStore = create<SideBarListeState>((set) => ({
  choosenItem: window.location.pathname.split('/')[2] || 'calendar',
  setChoosen: (value: string) => set({ choosenItem: value }),
}))

export default useSideBarListStore
