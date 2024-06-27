import { create } from 'zustand';
import { determineBackgroundURL } from '../utils/determineBackground';

interface ForecastStore{
    forecast: any
    dateString: string
    backgroundURL: string
    backgroundText: string
    setForecast: (newForecast: any) => void;

}
export const useForecastStore = create<ForecastStore>((set) => ({
  forecast: {},
  dateString: '',
  backgroundURL: '',
  backgroundText: '',
  setForecast: (newForecast: any) =>
    set((state) => {
      const { backgroundURL, backgroundText } = determineBackgroundURL(newForecast.current.condition.text, newForecast.location.localtime);
      return {
        forecast: newForecast,
        dateString: newForecast?.location?.localtime || state.dateString,
        backgroundURL: backgroundURL,
        backgroundText: backgroundText,
      };
    }),
}));
