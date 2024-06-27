import {create} from 'zustand';

interface Popup {
    id: number
    message: string
}
interface PopupStoreState {
    popups: Popup[]
    nextId: number
    addPopup: (message: string) => void
    removePopup: (id: number) => void
}

const usePopupStore = create<PopupStoreState>((set) => ({
    popups: [],
    nextId: 1,
    addPopup: (message: string) => {
        set((state) => ({
            popups: [...state.popups, { id: state.nextId, message }],
            nextId: state.nextId + 1,
        }))
    },
    removePopup: (id: number) => {
        set((state) => ({ popups: state.popups.filter((popup) => popup.id !== id) }))
    },
}));

export default usePopupStore;
