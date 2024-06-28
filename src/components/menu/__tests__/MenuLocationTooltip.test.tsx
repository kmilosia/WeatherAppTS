import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import MenuLocationTooltip from "../MenuLocationTooltip";
import useLocationStore from "../../../store/locationStore";


describe("MenuLocationTooltip", () => {
    const clearDefaultLocationMock = jest.spyOn(useLocationStore.getState(), 'clearDefaultLocation');
    const mockSetDefaultLocation = jest.fn()
    const mockRemoveLocation = jest.fn()
    const renderComponent = ({ default: isDefault, current: isCurrent }: { default: boolean, current: boolean }) => {
        render( 
        <MenuLocationTooltip 
            removeLocation={mockRemoveLocation} 
            setDefaultLocation={mockSetDefaultLocation} 
            setShowTooltip={() => {}} 
            isDefault={isDefault} 
            isCurrent={isCurrent} />
        )
    }
    beforeEach(() => {
        useLocationStore.setState({ defaultLocation: 'Test location' })
        jest.clearAllMocks()
    })
    test("set default button renders on isDefault false and runs action accordingly, remove default do not render", () => {
        renderComponent({default: false, current: true})
        const setDefaultbutton = screen.getByText('Set as default location')
        expect(setDefaultbutton).toBeInTheDocument()
        const removeDefaultButton = screen.queryByText('Remove default location')
        expect(removeDefaultButton).not.toBeInTheDocument()
        fireEvent.click(setDefaultbutton)
        expect(mockSetDefaultLocation).toHaveBeenCalled()
    })
    test("remove default button renders on isDefault true and runs action accordingly, remove location do not render", () => {
        renderComponent({default: true, current: true})
        const removeDefaultButton = screen.getByText('Remove default location')
        expect(removeDefaultButton).toBeInTheDocument()
        const removeButton = screen.queryByText('Remove location')
        expect(removeButton).not.toBeInTheDocument()
        fireEvent.click(removeDefaultButton)
        expect(clearDefaultLocationMock).toHaveBeenCalled()
    })
    test("remove location button renders on isCurrent false and runs action accordingly, set as default do not render", () => {
        renderComponent({default: true, current: false})
        const removeButton = screen.getByText('Remove location')
        expect(removeButton).toBeInTheDocument()
        const setDefaultbutton = screen.queryByText('Set as default location')
        expect(setDefaultbutton).not.toBeInTheDocument()
        fireEvent.click(removeButton)
        expect(mockRemoveLocation).toHaveBeenCalled()
    })
    
})