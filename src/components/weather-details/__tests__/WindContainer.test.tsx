import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { useSettingsStore } from "../../../store/settingsStore"
import { useForecastStore } from "../../../store/forecastStore"
import WindContainer from "../WindContainer"

const setWind = (valueKm: number, valueMp: number) => {
    useForecastStore.setState({ forecast: { current: { wind_kph: valueKm ,wind_mph: valueMp,wind_dir: 'NE' } } })
}
const setUnits = (value: string) => {
    useSettingsStore.setState({ units: value })
}
describe("WindContainer", () => {
    test("renders km/h for metric system", () => {
        setWind(10, 10)
        setUnits("Metric")
        render(<WindContainer />)
        const windSpan = screen.getByTestId("unit-wind-span")
        expect(windSpan).toHaveTextContent("km/h")
    })
    test("renders mi/h for metric system", () => {
        setWind(10, 10)
        setUnits("Imperial")
        render(<WindContainer />)
        const windSpan = screen.getByTestId("unit-wind-span")
        expect(windSpan).toHaveTextContent("mi/h")
    })
    test("render calm wind and value 3 for metric", () => {
        setWind(3,10)
        setUnits("Metric")
        render(<WindContainer />)
        const label = screen.getByTestId("wind-parag")
        expect(label).toHaveTextContent("3")
        const title = screen.getByText("Air is calm. Wind direction NE")
        expect(title).toBeInTheDocument() 
    })
    test("render noticable wind and value 54 for imperial", () => {
        setWind(34,54)
        setUnits("Imperial")
        render(<WindContainer />)
        const label = screen.getByTestId("wind-parag")
        expect(label).toHaveTextContent("54")
        const title = screen.getByText("Noticable wind movement. Wind direction NE")
        expect(title).toBeInTheDocument() 
    })
    test("render strong wind and value 50 for metric", () => {
        setWind(50,85)
        setUnits("Metric")
        render(<WindContainer />)
        const label = screen.getByTestId("wind-parag")
        expect(label).toHaveTextContent("50")
        const title = screen.getByText("Strong wind. Walking against wind is challenging. Wind direction NE")
        expect(title).toBeInTheDocument() 
    })
    test("render very strong wind and value 100 for imperial", () => {
        setWind(80,100)
        setUnits("Imperial")
        render(<WindContainer />)
        const label = screen.getByTestId("wind-parag")
        expect(label).toHaveTextContent("100")
        const title = screen.getByText("Very strong wind. There might be difficulty walking. Wind direction NE")
        expect(title).toBeInTheDocument() 
    })
   
})