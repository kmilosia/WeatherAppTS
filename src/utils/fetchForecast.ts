import { weatherAPI } from "./baseURL";

type SetForecastFunction = (data: any) => void

export const fetchForecastByCity = async (cityName: string, setForecast: SetForecastFunction): Promise<void> => {
    try {
        const response = await fetch(`${weatherAPI}&q=${cityName}`);
        if (!response.ok) {
            console.log('Failed to fetch weather forecast');
        }
        const data = await response.json();
        setForecast(data);
    } catch (error) {
        console.error(error);
    }
};

export const fetchForecastByCoords = async (location: { latitude: number, longitude: number }, setForecast: SetForecastFunction): Promise<void> => {
    try {
        const { latitude, longitude } = location;
        const response = await fetch(`${weatherAPI}&q=${latitude},${longitude}`);
        if (!response.ok) {
            console.log('Failed to fetch weather forecast');
        }
        const data = await response.json();
        setForecast(data);
    } catch (error) {
        console.error(error);
    }
};
