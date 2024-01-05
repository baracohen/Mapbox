import axios from 'axios';
import type {FeatureCollection} from 'geojson';

const API_HEADERS = {
  'X-RapidAPI-Key': 'a010f4eab3mshc595c3ab83c1468p129469jsn818c8539ae29',
  'X-RapidAPI-Host': 'vanitysoft-boundaries-io-v1.p.rapidapi.com',
};

const API_URL = 'https://vanitysoft-boundaries-io-v1.p.rapidapi.com/rest/v1/public/boundary/zipcode';

export const fetchZipCodeData = async (zipcode: string): Promise<FeatureCollection> => {
  
  const options = {
    method: 'GET',
    url: API_URL,
    params: { zipcode: zipcode },
    headers: API_HEADERS,
  };

  const response =  await axios.request(options);

  return response.data
};
