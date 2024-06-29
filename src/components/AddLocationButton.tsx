import { HiPlus, HiMinus } from "react-icons/hi";
import useLocationStore from '../store/locationStore';
import { useForecastStore } from '../store/forecastStore';
import { checkCityExists } from '../utils/storage';
import usePopupStore from '../store/popupStore';

const AddLocationButton = () => {
  const addPopup = usePopupStore((state) => state.addPopup)
  const { addLocation, removeLocation } = useLocationStore()
  const forecast = useForecastStore((state) => state.forecast)
  const exists = checkCityExists(forecast.location.name)

  const handleRemove = () => {
    removeLocation(forecast.location.name)
    addPopup("Location has been removed from your list!")
  }
  const handleAdd = () => {
    addLocation(forecast.location.name)
    addPopup("Location has been added to your list!")
  }

  return (
    exists ? 
    <button onClick={handleRemove}><HiMinus data-testid='minus-icon' className='icon-size'/></button>
    : <button onClick={handleAdd}><HiPlus data-testid='plus-icon' className='icon-size' /></button>
  );
}

export default AddLocationButton;
