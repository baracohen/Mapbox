import type { FeatureCollection } from 'geojson';
import Swal from 'sweetalert2'


export const validateZipCode = (zipCode: string): boolean => {
   // Regular expression for a string containing comma-separated zip codes (each with 5 digits)
   const zipCodesRegex = /^\d{5}(,\d{5})*$/;
   return zipCodesRegex.test(zipCode);
};

export const updateMapWithPolygon = (map: any, data: FeatureCollection) => {
    if (data ){
      if ( data.features && data.features.length > 0 ) {
          if (map.current){

          const firstFeature = data.features[0];
      
          if (firstFeature.geometry && firstFeature.geometry.type === 'Polygon' && firstFeature.geometry.coordinates) {
            const coordinates = firstFeature.geometry.coordinates[0][0];
      
            if (coordinates && coordinates.length >= 2) {
              updateMapSourceAndLayer(map, data, coordinates);
            }
          }
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Apologies – Unable to Locate Your Zip Code",
          text:"We apologize for the inconvenience. Please ensure correct zip code. Thank you."
        });
      }
    }

  };
  
  const updateMapSourceAndLayer = (map: any, data: FeatureCollection, coordinates: number[]) => {
    const source: any = map.current.getSource('polygon');

    if (source) {
      source.setData(data);
      
    } else {
      map.current.addSource('polygon', {
        type: 'geojson',
        data: data,
        generateId: true,
      });
  
      map.current.addLayer({
        id: 'polygon',
        type: 'fill',
        source: 'polygon',
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.7,
        },
      });
    }
  
    map.current.flyTo({
      center: [coordinates[0], coordinates[1]],
      essential: true,
      zoom: 10,
    });
  };