import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GlobalMap from '../components/Map/Map';

// Mock
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
    getCanvas: jest.fn(() => ({ style: { cursor: '' } })),
    setCenter: jest.fn(),
    setZoom: jest.fn(),
    remove: jest.fn(),
  })),

  Popup: jest.fn(() => ({
    setLngLat: jest.fn(),
    setHTML: jest.fn(),
    addTo: jest.fn(),
    remove: jest.fn(),
  })),

  accessToken: 'mock-access-token',
}));

// Mock weather api function
jest.mock('../../api/weather-api', () => ({
  fetchWeather: jest.fn(() => Promise.resolve({ localTime: 'mock-time', temp: 'mock-temp' })),
}));

// Mock the updateMapWithPolygon function
jest.mock('../../utils/utils', () => ({
  updateMapWithPolygon: jest.fn(),
}));

describe('GlobalMap', () => {
  it('renders the component and checks if the map exists', async () => {
    render(<GlobalMap />);

    await waitFor(() => {
      expect(screen.getByRole('img', { name: 'Map' })).toBeInTheDocument();
      expect(screen.getByText(/Longitude/)).toBeInTheDocument();
    });
  });

});
