import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import AddLocationButton from "../AddLocationButton";
import { useForecastStore } from "../../store/forecastStore";
import useLocationStore from "../../store/locationStore";
import usePopupStore from "../../store/popupStore";

jest.mock('../../utils/storage');

describe("AddLocationButton", () => {
    const { checkCityExists } = require('../../utils/storage');
    const addLocationMock = jest.spyOn(useLocationStore.getState(), 'addLocation');
    const removeLocationMock = jest.spyOn(useLocationStore.getState(), 'removeLocation');
    const addPopupMock = jest.spyOn(usePopupStore.getState(), 'addPopup');
    jest.spyOn(require('../../utils/storage'), 'checkCityExists');
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test("renders minus icon if city exists and click runs remove actions", () => {
        useForecastStore.setState({ forecast: { location: { name: 'Warsaw' } } })
        checkCityExists.mockReturnValue(true);
        render(<AddLocationButton />)
        const removeIcon = screen.queryByTestId('minus-icon')
        expect(removeIcon).toBeInTheDocument()
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(removeLocationMock).toHaveBeenCalled()
        expect(addPopupMock).toHaveBeenCalledWith('Location has been removed from your list!')
    })
    test("renders plus icon if city doesn't exist and click runs add actions", () => {
        useForecastStore.setState({ forecast: { location: { name: 'Warsaw' } } })
        checkCityExists.mockReturnValue(false);
        render(<AddLocationButton />)
        const removeIcon = screen.queryByTestId('plus-icon')
        expect(removeIcon).toBeInTheDocument()     
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(addLocationMock).toHaveBeenCalled()
        expect(addPopupMock).toHaveBeenCalledWith('Location has been added to your list!')
   
    })
})