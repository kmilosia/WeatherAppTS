import { create } from 'zustand'

interface SettingsStore {
    settingsOpen: boolean
    units: string
    scrollbarVisibility: boolean
    toggleSettings: () => void
    changeUnits: (newUnits: string) => void
    toggleScrollbar: (value: boolean) => void
}
export const useSettingsStore = create<SettingsStore>((set) => ({
  settingsOpen: false,
  units: localStorage.getItem('units') || 'Metric',
  scrollbarVisibility: false,
  toggleSettings: () => set((state) => ({settingsOpen: !state.settingsOpen})),
  changeUnits: (newUnits: string) => {
    set({ units: newUnits })
    localStorage.setItem('units', newUnits)
  },
  toggleScrollbar: (value: boolean) => {
    set({scrollbarVisibility: value})
  },
}))