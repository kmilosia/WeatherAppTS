import { create } from 'zustand'

export const useSearchStore = create<{searchOpen: boolean, toggleSearch: () => void}>((set) => ({
  searchOpen: false,
  toggleSearch: () => set((state) => ({searchOpen: !state.searchOpen}))
}))