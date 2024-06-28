import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { useSettingsStore } from "../store/settingsStore";
import ScrollbarSettings from "../components/settings/ScrollbarSettings";

describe("ScrollbarSettings", () => {
    let changeScrollbarMock = jest.spyOn(useSettingsStore.getState(), 'toggleScrollbar');
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test("toggle scrollbar visibility to true", () => {
        useSettingsStore.setState({scrollbarVisibility: false})
        render(<ScrollbarSettings />)
        const toggleSwitch = screen.getByRole('checkbox')
        expect(toggleSwitch).not.toBeChecked()
        const toggleTitle = screen.getByText("Hidden")
        expect(toggleTitle).toBeInTheDocument()  
        fireEvent.click(toggleSwitch)
        expect(changeScrollbarMock).toHaveBeenCalledWith(true)
        const newTitle = screen.getByText("Visible")
        expect(newTitle).toBeInTheDocument()  
    })
    test("toggle scrollbar visibility to false", () => {
        useSettingsStore.setState({scrollbarVisibility: true})
        render(<ScrollbarSettings />)
        const toggleSwitch = screen.getByRole('checkbox')
        expect(toggleSwitch).toBeChecked()
        const toggleTitle = screen.getByText("Visible")
        expect(toggleTitle).toBeInTheDocument()  
        fireEvent.click(toggleSwitch)
        expect(changeScrollbarMock).toHaveBeenCalledWith(false)
        const newTitle = screen.getByText("Hidden")
        expect(newTitle).toBeInTheDocument()  
    })
})