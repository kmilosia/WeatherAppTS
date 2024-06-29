import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Settings from '../Settings'

describe("Settings", () => {
    test("renders all settings containers", () => {
        render(<Settings />)
        expect(screen.queryByText("Change units system")).toBeInTheDocument()
        expect(screen.queryByText("Change scrollbar visibility")).toBeInTheDocument()
    })
})