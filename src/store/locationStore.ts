import { create } from 'zustand';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

interface LocationStore {
  locations: any;
  defaultLocation: any;
  lastLocation: any;
  currentLocation: any;
  addLocation: (location: any) => void;
  removeLocation: (location: any) => void;
  clearLocations: () => void;
  setDefaultLocation: (location: any) => void;
  setLastLocation: (location: any) => void;
  setCurrentLocation: (location: any) => void;
  clearDefaultLocation: () => void;
  clearCurrentLocation: () => void;
  initializeLocations: () => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  locations: [],
  defaultLocation: getLocalStorage('defaultLocation') || null,
  lastLocation: getLocalStorage('lastLocation') || null,
  currentLocation: getLocalStorage('currentLocation') || null,
  addLocation: (location: string) => set((state) => {
    const updatedLocations = [...state.locations];
    if (!updatedLocations.includes(location)) {
      updatedLocations.push(location);
      setLocalStorage('locations', updatedLocations);
    }
    return { locations: updatedLocations };
  }),
  removeLocation: (location: string) => set((state) => {
    const updatedLocations = state.locations.filter((loc: any) => loc !== location);
    setLocalStorage('locations', updatedLocations);
    return { locations: updatedLocations };
  }),
  clearLocations: () => set(() => {
    localStorage.removeItem('locations');
    return { locations: [] };
  }),
  setDefaultLocation: (location) => {
    set({ defaultLocation: location });
    setLocalStorage('defaultLocation', location);
  },
  setLastLocation: (location) => {
    set({ lastLocation: location });
    setLocalStorage('lastLocation', location);
  },
  setCurrentLocation: (location) => {
    set({ currentLocation: location });
    setLocalStorage('currentLocation', location);
  },
  clearDefaultLocation: () => {
    localStorage.removeItem('defaultLocation');
    set({ defaultLocation: null });
  },
  clearCurrentLocation: () => {
    localStorage.removeItem('currentLocation');
    set({ currentLocation: null });
  },
  initializeLocations: () => {
    const storedLocations = getLocalStorage<string[]>('locations') || [];
    const defaultLocation = getLocalStorage<string>('defaultLocation') || null;
    const lastLocation = getLocalStorage<string>('lastLocation') || null;
    set({ defaultLocation, lastLocation });
    set({ locations: storedLocations });
  },
}));

export default useLocationStore;
