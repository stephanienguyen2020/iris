import React from 'react';
import { Box, Button } from '@mui/material';

function NavigationButtons({ onBack, onContinue }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Button 
        variant="outlined" 
        onClick={onBack}
        sx={{ 
          borderColor: 'grey.400',
          color: 'text.primary',
          borderRadius: '50px',
          padding: '10px 10px',
          paddingLeft: '30px',
          paddingRight: '30px',
          '&:hover': {
            borderColor: '#000000',
            bgcolor: 'transparent',
          },
        }}
      >
        Back
      </Button>
      <Button 
        variant="contained" 
        onClick={onContinue}
        sx={{ 
          bgcolor: '#000000',
          color: 'common.white',
          borderRadius: '50px',
          padding: '10px 10px',
          paddingLeft: '30px',
          paddingRight: '30px',
          '&:hover': {
            bgcolor: 'grey.800',
          },
        }}
      >
        Continue
      </Button>
    </Box>
  );
}

export default NavigationButtons;