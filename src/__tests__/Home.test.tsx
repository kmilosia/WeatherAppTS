import '@testing-library/jest-dom'
import Home from '../Home'
import { fireEvent, render, screen } from '@testing-library/react'
import { useSettingsStore } from '../store/settingsStore';
import { useSearchStore } from '../store/searchStore';

describe("Home", () => {
    const toggleSettingsMock = jest.spyOn(useSettingsStore.getState(), 'toggleSettings');
    const toggleSearchMock = jest.spyOn(useSearchStore.getState(), 'toggleSearch');

    test("menu settings button opens Settings and close button closes it", () => {
        render(<Home />)
        const settingsButton = screen.getByTestId("settings-menu-btn")
        fireEvent.click(settingsButton)
        expect(toggleSettingsMock).toHaveBeenCalled()
        expect(screen.queryByText("Settings")).toBeInTheDocument()
        const settingsCloseButton = screen.getByTestId("settings-close-btn")
        fireEvent.click(settingsCloseButton)
        expect(screen.queryByText("Settings")).not.toBeInTheDocument()
    })
    test("menu settings button opens LocationSearch and close button closes it", () => {
        render(<Home />)
        const searchButton = screen.getByTestId("search-menu-btn")
        fireEvent.click(searchButton)
        expect(toggleSearchMock).toHaveBeenCalled()
        expect(screen.queryByText("Search locations")).toBeInTheDocument()
        const searchCloseButton = screen.getByTestId("search-close-btn")
        fireEvent.click(searchCloseButton)
        expect(screen.queryByText("Search locations")).not.toBeInTheDocument()

    })
})