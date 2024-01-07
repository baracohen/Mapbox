import React, { useRef, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import type { FeatureCollection } from 'geojson';
import mapboxgl from 'mapbox-gl';
import { useQuery } from '@tanstack/react-query';
import { Coordinates } from '../../styledComponents/StyledCoordinates';
import { fetchWeather } from '../../api/weather-api';
import { WeatherData } from '../../interfaces/weatherDate';
import WeatherDisplay from '../Weather/Weather';
import { renderToString } from 'react-dom/server';
import { updateMapWithPolygon } from '../../utils/utils';
import 'mapbox-gl/dist/mapbox-gl.css';


// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYmFyYWNvaGVuIiwiYSI6ImNscXoyZDQyejAwcjUyaW52cmNsOTg0ZWQifQ.Rp6ELhCxR2pF0K_pVGWNRA';

const GlobalMap = () => {

  // Refs for the map container and the map instance
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // State for longitude, latitude, and zoom level
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(2);

  // Query from cache for GeoJSON data
  const { data } = useQuery({ queryKey: ['geoJson'], enabled: false });

  const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor:'top',
        
        
    });

  // Initialize the map when the component mounts
  useEffect(() => {
    if (!map.current && mapContainer.current) {

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,
          });
          
          // Update state when the map moves
          map.current.on('move', () => {
            const center = map.current!.getCenter();
            setLng(Number(center.lng.toFixed(4)));
            setLat(Number(center.lat.toFixed(4)));
            setZoom(Number(map.current!.getZoom().toFixed(2)));
          });
          
          // Handle mouseover event on polygons
          map.current.on('mousemove', 'polygon', async (event: mapboxgl.MapLayerMouseEvent) => {
            const city = event?.features?.[0]?.properties?.city;

              if (map.current && city) {
                map.current.getCanvas().style.cursor = 'pointer';
                const { localTime, temp }: WeatherData = await fetchWeather(city);

                const popupHTML = renderToString(<WeatherDisplay localTime={localTime} temp={temp} city={city} />);
                
                // Populate the popup and set its coordinates
                popup.setLngLat(event.lngLat).setHTML(popupHTML).addTo(map.current);
              }
          });

          // Handle mouseleave
          map.current.on('mouseleave', 'polygon', () => {
            if(map.current)
                map.current.getCanvas().style.cursor = '';
                    popup.remove();
                });
    }
  }, []);

  // Create a new map instance and update it with GeoJSON data when the data changes
  useEffect(() => {
    updateMapWithPolygon(map, data as FeatureCollection);
  }, [data]);

  return (
    <Grid container  justifyContent={'center'}>
        <Grid sx={{ height:'850px', width:'100%', position:'relative' }} item ref={mapContainer}  >
          {mapContainer.current &&
            <Coordinates>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </Coordinates>
            }
        </Grid>
    </Grid>
  );
};

export default GlobalMap;
