import Header from './components/Header/Header';
import {Grid } from '@mui/material';
import { MapProvider} from 'react-map-gl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalMap from './components/Map/Map';
import Logo from './assets/Logo.png'
import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
      <Grid sx={{height: '100vh'}}>
        <Grid textAlign={'left'}>
          <img width={250} height={50} src={Logo} />
        </Grid>
        <MapProvider>
          <Grid item>
            <Header />
          </Grid>
          <Grid item >
            <GlobalMap />
          </Grid>
        </MapProvider>
      </Grid>
      </div>
  </QueryClientProvider>
  );
}

export default App;
