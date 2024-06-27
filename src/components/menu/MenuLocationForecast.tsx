import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { fetchForecastByCity, fetchForecastByCoords } from '../../utils/fetchForecast';
import { useForecastStore } from '../../store/forecastStore';
import { useSettingsStore } from '../../store/settingsStore';
import  useLocationStore  from '../../store/locationStore';
import useWeekDay from '../../hooks/useWeekDay';
import useTimeFormat from '../../hooks/useTimeFormat';
import MenuLocationTooltip from './MenuLocationTooltip';
import UnitsDegreesSpan from '../UnitsDegreesSpan';
import { isEmpty } from '../../utils/isEmpty';
import useMenuStore from '../../store/menuStore';

interface MenuLocationForecastProps {
  item?: string | null;
  isDefault: boolean;
  isCurrent: boolean;
}

const MenuLocationForecast: React.FC<MenuLocationForecastProps> = ({ item, isDefault, isCurrent }) => {
  const [localForecast, setLocalForecast] = useState<any>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const { setForecast } = useForecastStore();
  const { units } = useSettingsStore();
  const {
    setLastLocation,
    setDefaultLocation,
    removeLocation,
    defaultLocation,
    clearDefaultLocation,
    currentLocation,
  } = useLocationStore();
  const { toggleMenu } = useMenuStore();
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const dateString = localForecast?.location?.localtime || '';
  const dayOfWeek = useWeekDay(dateString);
  const time = useTimeFormat(dateString);

  const handleChangeCurrentLocation = (cityName: string) => {
    fetchForecastByCity(cityName, setForecast);
    setLastLocation(cityName);
    toggleMenu();
  };

  const handleRemoveLocation = () => {
    removeLocation(item as string);
    if (isDefault) {
      clearDefaultLocation();
    }
  };

  const handleSetDefaultLocation = () => {
    if (localForecast) {
      setDefaultLocation(localForecast.location.name);
    }
  };

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  useEffect(() => {
    if (isCurrent && typeof currentLocation !== 'string' && currentLocation !== null) {
      fetchForecastByCoords(currentLocation, setLocalForecast);
    } else if (item) {
      fetchForecastByCity(item, setLocalForecast);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [defaultLocation, currentLocation, item, isCurrent]);

  return (
    localForecast && !isEmpty(localForecast) && (
      <li className='center-elements gap-2 lg:gap-4 w-full my-2'>
        <div
          onClick={() => handleChangeCurrentLocation(localForecast.location.name)}
          className='w-full rounded-md bg-black/20 py-6 px-5 font-light text-xl flex justify-between items-center hover:bg-blue-900 cursor-pointer'
        >
          <div className='flex flex-col'>
            <h1 className='font-light flex items-center gap-2 text-lg lg:text-xl'>
              {isCurrent && <FaLocationDot className='mb-1 lg:mb-0' size={12} />}
              {localForecast.location.name}
            </h1>
            <p className='text-xs lg:text-sm font-extralight'>
              {dayOfWeek}, {time}
            </p>
          </div>

          <div className='flex flex-col items-end'>
            <p className='font-light text-2xl lg:text-3xl flex items-center lg:mb-1'>
              <img className='h-8 lg:h-10 mr-1' src={localForecast.current.condition.icon} alt="Condition Icon" />
              {units === 'Metric' ? localForecast.current.temp_c : localForecast.current.temp_f} <UnitsDegreesSpan />
            </p>
            <p className='text-xs font-light flex items-start'>
              Feels like {units === 'Metric' ? localForecast.current.feelslike_c : localForecast.current.feelslike_f} <UnitsDegreesSpan />
            </p>
          </div>
        </div>
        <div className="relative" ref={tooltipRef}>
          <button onClick={toggleTooltip}><BsThreeDotsVertical className='text-2xl lg:text-3xl' /></button>
          {showTooltip && (
            <MenuLocationTooltip
              isCurrent={isCurrent}
              isDefault={isDefault}
              setShowTooltip={setShowTooltip}
              setDefaultLocation={handleSetDefaultLocation}
              removeLocation={handleRemoveLocation}
            />
          )}
        </div>
      </li>
    )
  );
};

export default MenuLocationForecast;
