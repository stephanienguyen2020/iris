import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Paper, Box, Container, CircularProgress, Grid, Button, Avatar } from '@mui/material';
import theme from '../styles/theme';
import CustomStepper from '../components/CustomStepper';
import ReactPlayer from 'react-player';
import NavigationButtons from '../components/NavigationButtons';
import Iris_3 from '../images/Iris_3.png';
import axios from 'axios';

function DetectPage() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBack = () => {
    navigate('/');
  };

  const handleContinue = async () => {
    navigate('/review'); // Navigate to the next page

    // if (uploadedFile) {
    //   setIsLoading(true);
    //   setErrorMessage(''); // Clear any previous error messages
    //   navigate('/review'); // Navigate to the next page

    //   const formData = new FormData();
    //   formData.append('file', uploadedFile);

    //   try {
    //     // API call to local server
    //     const response = await axios.post('http://localhost:5000/upload', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });

    //     // Handle the response as needed
    //     console.log(response.data);
    //     navigate('/review'); // Navigate to the next page
    //   } catch (error) {
    //     // Handle errors
    //     console.error('Error uploading file:', error);
    //     setErrorMessage('Failed to upload file. Please try again.');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // } else {
    //   setErrorMessage('Please upload a file before continuing.');
    // }
    // }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Box
          component="img"
          src={Iris_3}
          alt="Iris_3"
          sx={{
            width: 'auto',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          onClick={handleBack}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '15%',
            height: '10%',
            cursor: 'pointer', // Indicate that the area is clickable
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
            }}
          >
            <CustomStepper />
            <Box sx={{ mt: 4, mb: 4 }}>
              <Typography
                sx={{
                  fontSize: '36pt',
                  fontWeight: 'bold',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", "SF Pro Display", sans-serif'
                }}
                gutterBottom
              >
                Detect violation <span role="img" aria-label="magnify-glass">🔎</span>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
            </Box>
            <Box>
              <Typography variant="h5" gutterBottom>
                Detected Violations
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    component="img"
                    src="http://localhost:3000/path/to/your/image" // Add the correct path to your image
                    alt="Detected Violations"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" gutterBottom>
                    Detailed analysis
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      <strong>Text:</strong> Serious <span style={{ color: 'red' }}>PII detected at 0:01</span>
                    </Typography>
                    <Typography variant="body2">
                      <strong>Audio:</strong> Inappropriate language detected at 0:10
                    </Typography>
                    <Typography variant="body2">
                      <strong>Context:</strong> No inappropriate content detected
                    </Typography>
                    <Typography variant="body2">
                      <strong>Face:</strong> Coming Soon
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <NavigationButtons onBack={handleBack} onContinue={handleContinue} />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default DetectPage;
