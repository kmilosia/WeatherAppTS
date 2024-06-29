import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe("Footer", () => {
    test("render footer with props text correctly", () => {
        render(<Footer backgroundText='Demo text'/>)
        const title = screen.queryByText("Demo text")
        expect(title).toBeInTheDocument()
    })
})