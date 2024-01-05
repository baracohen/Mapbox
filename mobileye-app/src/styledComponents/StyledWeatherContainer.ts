import styled from '@emotion/styled';
import { Typography, Grid } from '@mui/material';

export const WeatherContainer = styled(Grid)`
    background-color: rgb(35 55 75 / 90%);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    margin: 12px;
    border-radius: 4px;
`;

export const Time = styled(Typography)`
  font-size: 24px; 
  margin-right: 10px;
`;

export const Temperature = styled(Typography)`
  font-size: 24px;
`;