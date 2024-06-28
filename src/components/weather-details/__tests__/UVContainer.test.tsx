import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { useForecastStore } from "../../../store/forecastStore"
import UVContainer from "../UVContainer"

const setUV = (value: number) => {
    useForecastStore.setState({ forecast: { current: { uv: value } } })
}
describe("UVContainer", () => {
    test("renders green bg and low UV label", () => {
        setUV(1)
        render(<UVContainer />)
        const colorDiv = screen.getByTestId("uv-info-color")
        expect(colorDiv).toHaveClass("bg-green-500")
        const title = screen.getByText("UV is low. No protection is needed")
        expect(title).toBeInTheDocument() 
    })
    test("renders yellow bg and moderate UV label", () => {
        setUV(4)
        render(<UVContainer />)
        const colorDiv = screen.getByTestId("uv-info-color")
        expect(colorDiv).toHaveClass("bg-yellow-500")
        const title = screen.getByText("UV is moderate. Little protection is required")
        expect(title).toBeInTheDocument() 
    })
    test("renders orange bg and moderate UV label", () => {
        setUV(6)
        render(<UVContainer />)
        const colorDiv = screen.getByTestId("uv-info-color")
        expect(colorDiv).toHaveClass("bg-orange-500")
        const title = screen.getByText("UV is high. Protection is necessary")
        expect(title).toBeInTheDocument() 
    })
    test("renders red bg and moderate UV label", () => {
        setUV(8)
        render(<UVContainer />)
        const colorDiv = screen.getByTestId("uv-info-color")
        expect(colorDiv).toHaveClass("bg-red-500")
        const title = screen.getByText("UV is very high. Extra protection is required")
        expect(title).toBeInTheDocument() 
    })
    test("renders purple bg and moderate UV label", () => {
        setUV(20)
        render(<UVContainer />)
        const colorDiv = screen.getByTestId("uv-info-color")
        expect(colorDiv).toHaveClass("bg-purple-500")
        const title = screen.getByText("UV is extremely high. Stay inside if possible")
        expect(title).toBeInTheDocument() 
    })
   
})