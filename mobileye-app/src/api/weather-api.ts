import axios from 'axios';
import { WeatherData } from '../interfaces/weatherDate';

const API_URL = 'https://api.weatherapi.com/v1/current.json?key=5ca51ab45c9d44bdb3a141947240401&q=';

export const fetchWeather = async (country: string): Promise<WeatherData> => {
  const options = {
    method: 'GET',
    url: `${API_URL}${country}&aqi=yes`,
  };

  const response = await axios.request(options);

  return {
    localTime: response.data.location.localtime,
    temp: response.data.current.temp_c,
  };
};