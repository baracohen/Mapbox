import { Typography, Grid } from '@mui/material';
import ZipCodeInputContainer from './ZipCodeInputContainer';

const Header = () => {
  return (
    <Grid sx={{mb: 10}}>
      <Typography
        sx={{
          mb: 7,
          fontSize: '2rem', // Adjust the font size
          fontWeight: 'bold', // Adjust the font weight
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Add text shadow
        }}
        variant="h4"
      >
        Journey through ZIP Wonders
      </Typography>
        <ZipCodeInputContainer data-testid="zip-code-input-container" />
    </Grid>
  );
};

export default Header;
