import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import PrecipitationContainer from "../PrecipitationContainer"
import { useForecastStore } from "../../../store/forecastStore"
import { useSettingsStore } from "../../../store/settingsStore"

const setRain = (valueMm: number, valueIn: number) => {
    useForecastStore.setState({ forecast: { current: { precip_mm: valueMm ,precip_in: valueIn } } })
}
const setUnits = (value: string) => {
    useSettingsStore.setState({ units: value })
}
describe("PrecipitationContainer", () => {
    test("renders mm for metric system", () => {
        setRain(10, 20)
        setUnits("Metric")
        render(<PrecipitationContainer />)
        const precipSpan = screen.getByTestId("precip-span")
        expect(precipSpan).toHaveTextContent("mm")
    })
    test("renders in for metric system", () => {
        setRain(10, 20)
        setUnits("Imperial")
        render(<PrecipitationContainer />)
        const precipSpan = screen.getByTestId("precip-span")
        expect(precipSpan).toHaveTextContent("in")
    })
    test("renders rainy info for metric system", () => {
        setRain(10, 20)
        setUnits("Metric")
        render(<PrecipitationContainer />)
        const title = screen.getByText("Don't forget your umbrella!")
        expect(title).toBeInTheDocument() 
        const label = screen.getByTestId("precip-p")
        expect(label).toHaveTextContent("10") 
    })
    test("renders dry info for imperial system", () => {
        setRain(0.2, 5)
        setUnits("Imperial")
        render(<PrecipitationContainer />)
        const title = screen.getByText("It's dry outside!")
        expect(title).toBeInTheDocument() 
        const label = screen.getByTestId("precip-p")
        expect(label).toHaveTextContent("5") 
    })
   
})