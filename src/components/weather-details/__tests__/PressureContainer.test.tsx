import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import PressureContainer from "../PressureContainer"
import { useForecastStore } from "../../../store/forecastStore"
import { useSettingsStore } from "../../../store/settingsStore"

const setPressure = (valueMb: number, valueIn: number) => {
    useForecastStore.setState({ forecast: { current: { pressure_mb: valueMb ,pressure_in: valueIn } } })
}
const setUnits = (value: string) => {
    useSettingsStore.setState({ units: value })
}
describe("PressureContainer", () => {
    test("renders mb for metric system", () => {
        setPressure(1000, 1450)
        setUnits("Metric")
        render(<PressureContainer />)
        const pressureSpan = screen.getByTestId("pressure-span")
        expect(pressureSpan).toHaveTextContent("mb")
    })
    test("renders in for metric system", () => {
        setPressure(1000, 1450)
        setUnits("Imperial")
        render(<PressureContainer />)
        const pressureSpan = screen.getByTestId("pressure-span")
        expect(pressureSpan).toHaveTextContent("in")
    })
    test("renders low pressure info for metric system", () => {
        setPressure(1000, 1450)
        setUnits("Metric")
        render(<PressureContainer />)
        const title = screen.getByText("Pressure is low at the moment")
        expect(title).toBeInTheDocument() 
        const label = screen.getByTestId("pressure-p")
        expect(label).toHaveTextContent("1000") 
    })
    test("renders high pressure info for imperial system", () => {
        setPressure(1090, 1450)
        setUnits("Imperial")
        render(<PressureContainer />)
        const title = screen.getByText("Pressure is high at the moment")
        expect(title).toBeInTheDocument() 
        const label = screen.getByTestId("pressure-p")
        expect(label).toHaveTextContent("1450") 
    })
   
})