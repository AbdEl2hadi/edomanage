import { create } from 'zustand'

type SideBarListeState = {
  choosenItem: string
  setChoosen: (value: string) => void
}

const useSideBarListStore = create<SideBarListeState>((set) => ({
  choosenItem: 'calendar',
  setChoosen: (value: string) => set({ choosenItem: value }),
}))

export default useSideBarListStore;
