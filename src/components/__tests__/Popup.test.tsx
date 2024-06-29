import { act, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import usePopupStore from "../../store/popupStore";
import Popup from "../Popup";

describe("Popup", () => {
    const removePopupMock = jest.spyOn(usePopupStore.getState(), 'removePopup');
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test("renders message correctly", () => {
        render(<Popup id={1} message="Some msg" />)
        const message = screen.queryByText("Some msg")
        expect(message).toBeInTheDocument()
    })
    test("removes popup after 3s", async () => {
        jest.useFakeTimers()
        render(<Popup id={1} message="Some msg" />)
        const message = screen.queryByText("Some msg")
        expect(message).toBeInTheDocument()
        act(() => {
            jest.advanceTimersByTime(3000)
        })
        expect(removePopupMock).toHaveBeenCalledWith(1)
        jest.useRealTimers()
    })
})