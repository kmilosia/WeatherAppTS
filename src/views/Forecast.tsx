import { IoMenu } from 'react-icons/io5';
import  useMenuStore  from '../store/menuStore';
import { useForecastStore } from '../store/forecastStore';
import { isEmpty } from '../utils/isEmpty';
import useWeekDay from '../hooks/useWeekDay';
import useTimeFormat from '../hooks/useTimeFormat';
import AddLocationButton from '../components/AddLocationButton';
import { useSettingsStore } from '../store/settingsStore';
import Footer from '../components/Footer';
import PressureContainer from '../components/weather-details/PressureContainer';
import UVContainer from '../components/weather-details/UVContainer';
import HumidityContainer from '../components/weather-details/HumidityContainer';
import PrecipitationContainer from '../components/weather-details/PrecipitationContainer';
import CloudsContainer from '../components/weather-details/CloudsContainer';
import WindContainer from '../components/weather-details/WindContainer';

const Forecast = () => {
    const { toggleMenu, closeMenu } = useMenuStore()
    const { units,scrollbarVisibility } = useSettingsStore()
    const {dateString,forecast,backgroundURL,backgroundText} = useForecastStore()
    const dayOfWeek = useWeekDay(dateString)
    const time = useTimeFormat(dateString)

    return (
        <div onClick={() => closeMenu()} className={`h-screen w-screen flex flex-col bg-black/50 bg-cover bg-center bg-no-repeat bg-blend-overlay p-6 lg:p-8 text-white overflow-auto ${scrollbarVisibility ? 'scrollbar-default' : 'scrollbar-none'}`} style={{ backgroundImage: `url(${backgroundURL})`}}>
            <div className='w-full flex justify-between'>
                <button data-testid="toggle-menu-btn" onClick={(e) => { e.stopPropagation(); toggleMenu() }} className='text-white center-elements h-max'>
                    <IoMenu className='icon-size' />
                </button>
                {!isEmpty(forecast) &&
                    <div className='center-elements flex-col font-extralight cursor-default mt-2'>
                        <h1 className='text-3xl '>{forecast.location.name}</h1>
                        {dateString && <p className='text-sm mt-1'>{`${dayOfWeek}, ${time}`}</p>}
                    </div>
                }
                <div>
                    {!isEmpty(forecast) && <AddLocationButton />}
                </div>
            </div>
            {!isEmpty(forecast) &&
                <div className='lg:p-8 cursor-default items-center flex flex-col'>
                    <div className='flex-col my-14 lg:my-20 center-elements'>
                        <div className='flex items-center gap-1'>
                            <img className='h-8 lg:h-10 w-max' src={forecast.current.condition.icon} alt="Weather icon"></img>
                            <h2 className='text-2xl lg:text-3xl font-extralight'>{forecast.current.condition.text}</h2>
                        </div>
                        <h3 className='text-8xl lg:text-9xl font-extralight flex items-start'>{units === 'Metric' ? forecast.current.temp_c : forecast.current.temp_f} <span className='text-4xl font-light'> °</span></h3>
                        <p className='font-light mt-2'>Feels like {units === 'Metric' ? forecast.current.feelslike_c : forecast.current.feelslike_f}°</p>
                    </div>
                    <div className='flex flex-col cursor-default w-full lg:w-2/3 mb-4'>
                        <div className='flex w-full items-center gap-3'>
                            <p className='font-extralight'>Details</p>
                            <div className='w-full h-[1px] bg-white/30'></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-3">
                            <PressureContainer />
                            <UVContainer />
                            <HumidityContainer />
                            <PrecipitationContainer />
                            <CloudsContainer />
                            <WindContainer />
                        </div>
                    </div>
                </div>
            }
            <Footer backgroundText={backgroundText} />
        </div>
    );
};

export default Forecast;
