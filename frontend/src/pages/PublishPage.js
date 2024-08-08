import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Paper, Box, Container, Button } from '@mui/material';
import theme from '../styles/theme';
import CustomStepper from '../components/CustomStepper';
import Iris_4 from '../images/Iris_4.png';

function PublishPage() {
  const navigate = useNavigate();

  const handlePublish = () => {
    // Implement the publish functionality here
    console.log('Video published');
    navigate('/'); // Navigate to the home page or another page after publishing
  };

  return (
    <ThemeProvider theme={theme}>
        <Button
            variant="outlined"
            color="primary"
            sx={{ position: 'absolute', top: '1rem', left: '1rem' }}
            onClick={() => navigate('/')}
        >
            Back
        </Button>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Box
          component="img"
          src={Iris_4}
          alt="Iris_4"
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
            pl: 15,
            pr: 15,
            pt: 15,
            pb: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              bgcolor: 'background.default',
              alignItems: 'center',
            }}
          >
            <CustomStepper />
            <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
              <Typography
                sx={{
                  fontSize: '36pt',
                  fontWeight: 'bold',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", "SF Pro Display", sans-serif'
                }}
                gutterBottom
              >
                Safe and Secure, Ready to Go <span role="img" aria-label="earth">🌍</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '16pt',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", "SF Pro Display", sans-serif'
                }}
                gutterBottom
              >
                The video is now ready for you to share confidently with your audience.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Box
                component="img"
                src="http://localhost:3000/path/to/your/blurred-image" // Add the correct path to your blurred image
                alt="Blurred Video"
                sx={{
                  width: '45%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                  opacity: 0.5,
                  marginRight: '2rem',
                }}
              />
              <Box
                component="img"
                src="http://localhost:3000/path/to/your/clear-image" // Add the correct path to your clear image
                alt="Clear Video"
                sx={{
                  width: '45%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ fontSize: '14pt', px: 5, py: 1.5 }}
              onClick={handlePublish}
            >
              Publish/Download
            </Button>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default PublishPage;
