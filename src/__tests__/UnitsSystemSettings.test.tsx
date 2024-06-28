import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { useSettingsStore } from "../store/settingsStore";
import UnitsSystemSettings from "../components/settings/UnitsSystemSettings";

describe("UnitsSystemSettings", () => {
    let changeUnitsMock = jest.spyOn(useSettingsStore.getState(), 'changeUnits');
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test("toggle units to imperial", () => {
        useSettingsStore.setState({units: 'Metric'})
        render(<UnitsSystemSettings />)
        const toggleSwitch = screen.getByRole('checkbox')
        expect(toggleSwitch).not.toBeChecked()
        const toggleTitle = screen.getByText("Metric is on")
        expect(toggleTitle).toBeInTheDocument()  
        fireEvent.click(toggleSwitch)
        expect(changeUnitsMock).toHaveBeenCalledWith('Imperial')
        const newTitle = screen.getByText("Imperial is on")
        expect(newTitle).toBeInTheDocument()  
    })
    test("toggle units to imperial", () => {
        useSettingsStore.setState({units: 'Imperial'})
        render(<UnitsSystemSettings />)
        const toggleSwitch = screen.getByRole('checkbox')
        expect(toggleSwitch).toBeChecked()
        const toggleTitle = screen.getByText("Imperial is on")
        expect(toggleTitle).toBeInTheDocument()  
        fireEvent.click(toggleSwitch)
        expect(changeUnitsMock).toHaveBeenCalledWith('Metric')
        const newTitle = screen.getByText("Metric is on")
        expect(newTitle).toBeInTheDocument()  

    })
})