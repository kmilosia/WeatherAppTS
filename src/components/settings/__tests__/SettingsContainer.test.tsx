import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import SettingsContainer from "../SettingsContainer"

describe("SettingsContainer", () => {

    test("renders title and toggle switch correctly", () => {
        const mockAction = jest.fn()
        render(<SettingsContainer title="Demo title" text="Demo text" action={mockAction} isChecked={true}/>)
        const title = screen.getByText(/Demo title/i)
        expect(title).toBeInTheDocument()
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeInTheDocument()
    })
})