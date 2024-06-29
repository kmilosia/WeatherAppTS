import '@testing-library/jest-dom'
import usePopupStore from '../../store/popupStore'
import { act, render, screen } from '@testing-library/react';
import PopupStack from '../PopupStack';

describe("PopupStack", () => {
    test("renders all popups from state array", () => {
        usePopupStore.setState({popups: [{id: 1, message: 'Popup One'}, {id: 2, message: 'Popup Two'}]})
        render(<PopupStack />)
        expect(screen.queryByText("Popup One")).toBeInTheDocument()
        expect(screen.queryByText("Popup Two")).toBeInTheDocument()
    })
    test("renders no popups when state array empty", () => {
        usePopupStore.setState({popups: []})
        render(<PopupStack />)
        expect(screen.queryByText("Popup One")).not.toBeInTheDocument()
    })
    test("removes popup after 3s", async () => {
        usePopupStore.setState({popups: [{id: 1, message: 'Popup One'}]})
        jest.useFakeTimers()
        render(<PopupStack />)
        const message = screen.queryByText("Popup One")
        expect(message).toBeInTheDocument()
        act(() => {
            jest.advanceTimersByTime(4000)
        })
        jest.useRealTimers()
        expect(message).not.toBeInTheDocument()
    })
})