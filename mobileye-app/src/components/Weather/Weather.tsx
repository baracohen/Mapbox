import { Typography } from '@mui/material';
import { Temperature, Time, WeatherContainer } from '../../styledComponents/StyledWeatherContainer';
import { WeatherData } from '../../interfaces/weatherDate';

interface weatherProp extends WeatherData{
  city:string 
}

const WeatherDisplay = ({ localTime, temp, city }: weatherProp) => {
  return (
    <WeatherContainer>
      <Typography variant='body1'>{city}</Typography>
      <Time>Local time: {localTime}</Time>
      <Temperature>Temp: {temp}°C</Temperature>
    </WeatherContainer>
  );
};

export default WeatherDisplay;
