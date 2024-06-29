import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import ModalScreenHeader from '../ModalScreenHeader'

describe("ModalScreenHeader", () => {
    const mockAction = jest.fn()
    test("rendered with props title correctly", () => {
        render(<ModalScreenHeader action={mockAction} testID='demo-testid' title='Demo header'/>)
        const heading = screen.getByRole('heading')
        expect(heading).toHaveTextContent('Demo header')
    })
    test("button click runs action", () => {
        render(<ModalScreenHeader action={mockAction} testID='demo-testid' title='Demo header'/>)
        const button = screen.getByTestId('demo-testid')
        fireEvent.click(button)
        expect(mockAction).toHaveBeenCalled()
    })
})