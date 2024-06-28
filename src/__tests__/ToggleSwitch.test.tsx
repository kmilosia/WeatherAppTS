import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import ToggleSwitch from "../components/ToggleSwitch"

describe("ToggleSwitch", () => {
    let mockAction = jest.fn()
    let text = "Test label"

    beforeEach(() => {
        mockAction.mockClear()
    })
    test("text and checkbox renders correctly", () => {
        render(<ToggleSwitch text={text} action={mockAction} isChecked={true}/>)
        const title = screen.getByText(/Test label/i)
        expect(title).toBeInTheDocument()
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeChecked()
    })
    test("checkbox click runs action", () => {
        render(<ToggleSwitch text={text} action={mockAction} isChecked={true}/>)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeChecked()
        fireEvent.click(checkbox)
        expect(mockAction).toHaveBeenCalled()
    })
})