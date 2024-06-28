import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { useForecastStore } from "../../../store/forecastStore"
import CloudsContainer from "../CloudsContainer"

const setClouds = (value: number) => {
    useForecastStore.setState({ forecast: { current: { cloud: value } } })
}
describe("CloudsContainer", () => {
    test("clouds percent value is rendered correct", () => {
        setClouds(40)
        render(<CloudsContainer />)
        const label = screen.getByText("40%")
        expect(label).toBeInTheDocument() 
    })
    test("renders clear sky for value lower than 10", () => {
        setClouds(9)
        render(<CloudsContainer />)
        const label = screen.getByText("The sky is clear at the moment")
        expect(label).toBeInTheDocument() 
    })
    test("renders mostly clear sky for value higher than 10 and lower than 30", () => {
        setClouds(20)
        render(<CloudsContainer />)
        const label = screen.getByText("The sky is mostly clear at the moment")
        expect(label).toBeInTheDocument() 
    })
    test("renders partly cloudy sky for value higher than 30 and lower than 70", () => {
        setClouds(54)
        render(<CloudsContainer />)
        const label = screen.getByText("The sky is partly cloudy at the moment")
        expect(label).toBeInTheDocument() 
    })
    test("renders mostly cloudy sky for value lower than 90 and higher than 70", () => {
        setClouds(80)
        render(<CloudsContainer />)
        const label = screen.getByText("The sky is mostly cloudy at the moment")
        expect(label).toBeInTheDocument() 
    })
    test("renders cloudy sky for value higher than 90", () => {
        setClouds(98)
        render(<CloudsContainer />)
        const label = screen.getByText("The sky is cloudy at the moment")
        expect(label).toBeInTheDocument() 
    })
})