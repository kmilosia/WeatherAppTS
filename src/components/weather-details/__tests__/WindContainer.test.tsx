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
    test("correct conditions are rendered with values 3, 10 and metric", () => {
        setWind(3,10)
        setUnits("Metric")
        render(<WindContainer />)
        const span = screen.getByTestId("unit-wind-span")
        expect(span).toHaveTextContent("km/h")
        const parag = screen.getByTestId("wind-parag")
        expect(parag).toHaveTextContent("3")
        const title = screen.getByText("Air is calm. Wind direction NE")
        expect(title).toBeInTheDocument() 
    })
    test("correct conditions are rendered with values 34,54 and imperial", () => {
        setWind(34,54)
        setUnits("Imperial")
        render(<WindContainer />)
        const span = screen.getByTestId("unit-wind-span")
        expect(span).toHaveTextContent("mi/h")
        const parag = screen.getByTestId("wind-parag")
        expect(parag).toHaveTextContent("54")
        const title = screen.getByText("Noticable wind movement. Wind direction NE")
        expect(title).toBeInTheDocument() 
    })
   
})