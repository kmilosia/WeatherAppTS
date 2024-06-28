import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import HumidityContainer from "../HumidityContainer"
import { useForecastStore } from "../../../store/forecastStore"
import { useSettingsStore } from "../../../store/settingsStore"

const setHumidity = (valueDewC: number, valueDewF: number) => {
    useForecastStore.setState({ forecast: { current: { dewpoint_c: valueDewC ,dewpoint_f: valueDewF, humidity: 90 } } })
}
const setUnits = (value: string) => {
    useSettingsStore.setState({ units: value })
}
describe("HumidityContainer", () => {
    test("label has correct humidity value", () => {
        setHumidity(90, 40)
        render(<HumidityContainer />)
        const pressureSpan = screen.getByTestId("humid-level")
        expect(pressureSpan).toHaveTextContent("90%")
    })
    test("renders tropical info for metric system", () => {
        setHumidity(40, 90)
        setUnits("Metric")
        render(<HumidityContainer />)
        const label = screen.getByTestId("humid-info")
        expect(label).toHaveTextContent("Dew point 40°. Tropical outside") 
    })
    test("renders humid info for metric system", () => {
        setHumidity(45, 66)
        setUnits("Metric")
        render(<HumidityContainer />)
        const label = screen.getByTestId("humid-info")
        expect(label).toHaveTextContent("Dew point 45°. Humid outside") 
    })
    test("renders sticky info for imperial system", () => {
        setHumidity(38, 63)
        setUnits("Imperial")
        render(<HumidityContainer />)
        const label = screen.getByTestId("humid-info")
        expect(label).toHaveTextContent("Dew point 63°. Sticky outside") 
    })
    test("renders pleasant info for imperial system", () => {
        setHumidity(14, 33)
        setUnits("Imperial")
        render(<HumidityContainer />)
        const label = screen.getByTestId("humid-info")
        expect(label).toHaveTextContent("Dew point 33°. Pleasant outside") 
    })
})