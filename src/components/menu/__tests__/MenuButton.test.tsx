import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import useMenuStore from "../../../store/menuStore";
import MenuButton from "../MenuButton";

describe("MenuButton", () => {
    const toggleMenuMock = jest.spyOn(useMenuStore.getState(), 'toggleMenu');
    const mockAction = jest.fn()
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test("closebutton false not gives button class block and button click runs action", async () => {
        render(<MenuButton icon={() => <div />} action={mockAction} closeButton={false} />);
        const button = screen.getByRole('button');
        expect(button).not.toHaveClass('block')
        fireEvent.click(button);
        expect(toggleMenuMock).toHaveBeenCalled();
        expect(mockAction).toHaveBeenCalled();
    })
    test("closebutton true gives button class block and button click doesn't run action", async () => {
        render(<MenuButton icon={() => <div />} action={mockAction} closeButton={true} />);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('block')
        fireEvent.click(button);
        expect(toggleMenuMock).toHaveBeenCalled();
        expect(mockAction).not.toHaveBeenCalled();
    })
})