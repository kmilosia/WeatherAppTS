import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import UnitsDegreesSpan from "../components/UnitsDegreesSpan"
import { useSettingsStore } from "../store/settingsStore";

describe("UnitsDegreesSpan", () => {
    test("units displayed as C when units in store set to metric", () => {
        useSettingsStore.setState({units: 'Metric'})
        render(<UnitsDegreesSpan />)
        const label = screen.getByTestId('units-span')
        expect(label).toHaveTextContent("°C")
    })
    test("units displayed as F when units in store set to imperial", () => {
        useSettingsStore.setState({units: 'Imperial'})
        render(<UnitsDegreesSpan />)
        const label = screen.getByTestId('units-span')
        expect(label).toHaveTextContent("°F")
    })
})