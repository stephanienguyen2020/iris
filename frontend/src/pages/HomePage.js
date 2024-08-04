import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Paper, Box, Container, Button } from '@mui/material';
import theme from '../styles/theme';
import Iris_1 from '../images/Iris_1.png';
import { Link } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();

  const handleScanClick = () => {
    console.log('Button clicked');
    navigate('/upload');
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
            width: 'auto%',
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
              Your AI Curator
            </Typography>
            <Typography variant="h2" gutterBottom fontWeight="bold">
              Let us help you with your videos{' '}
              <span role="img" aria-label="eyes">👀</span>
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
              Designed to simplify your work and skyrocket productivity, our
              templates are the secret ingredient to achieving outstanding results
              in record time.
            </Typography>
            <Link to="/upload" style={{ textDecoration: 'none' }}>
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
                Scan my video
              </Button>
            </Link>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;