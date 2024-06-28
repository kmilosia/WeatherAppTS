import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { useForecastStore } from "../store/forecastStore"
import CloudsContainer from "../components/weather-details/CloudsContainer"

const setClouds = (value: number) => {
    useForecastStore.setState({ forecast: { current: { cloud: value } } })
}
describe("CloudsContainer", () => {
    test("correct condition is rendered with value 40", async () => {
        setClouds(40)
        render(<CloudsContainer />)
        let parag = screen.getByText("40%")
        let title = screen.getByText("The sky is partly cloudy at the moment")
        expect(parag).toBeInTheDocument() 
        expect(title).toBeInTheDocument() 
    })
    test("correct condition is rendered with value 5", async () => {
        setClouds(5)
        render(<CloudsContainer />)
        let parag = screen.getByText("5%")
        let title = screen.getByText("The sky is clear at the moment")
        expect(parag).toBeInTheDocument() 
        expect(title).toBeInTheDocument() 
    })
})