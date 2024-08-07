import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Paper, Box, Container, Button } from '@mui/material';
import theme from '../styles/theme';
import Iris_1 from '../images/Iris_1.png';

function HomePage() {
  const navigate = useNavigate();

  const handleScanClick = () => {
    console.log('Button clicked');
    navigate('/upload'); // Navigates to the UploadPage component
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex',
        height: '100vh', 
        overflow: 'hidden'
      }}>
        <Box 
          component="img"
          src={Iris_1}
          alt="Iris_1"
          sx={{ 
            width: 'auto',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Container 
          maxWidth={false} 
          disableGutters 
          sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            pl: 15, // Space between image and content
            pr: 15,
            pt: 15,
            pb: 2,
          }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              bgcolor: 'background.default',
            }}
          >
            <Typography variant="overline" gutterBottom>
              PRIVACY & COMPLIANCE CHECKER
            </Typography>
            <Typography variant="h2" gutterBottom fontWeight="bold">
              Safeguard your Content before Posting{' '}
              <span role="img" aria-label="eyes">👀</span>
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
              Iris scans videos for sensitive information and inappropriate content 
              before you post, ensuring your privacy and compliance with platform
              guidelines. Upload your video NOW to get a detailed report and clean
              version ready for safe sharing.
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleScanClick}
              sx={{ 
                bgcolor: '#000000',
                color: 'common.white',
                borderRadius: '50px',
                padding: '12px 12px',
                paddingLeft: '70px',
                paddingRight: '70px',
                '&:hover': {
                  bgcolor: 'grey.800',
                },
                fontSize: '15pt'
              }}
            >
              Scan my Video
            </Button>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;
