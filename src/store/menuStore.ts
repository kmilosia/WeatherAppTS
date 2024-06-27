import {create} from 'zustand';

interface MenuStore{
    menuOpen: boolean
    toggleMenu: () => void
    closeMenu: () => void
}
const useMenuStore = create<MenuStore>((set) => ({
    menuOpen: false,
    toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
    closeMenu: () => set(() => ({ menuOpen: false })),
}));

export default useMenuStore;
