import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Paper, Box, Container, CircularProgress, Button, Divider } from '@mui/material';
import theme from '../styles/theme';
import CustomStepper from '../components/CustomStepper';
import Iris_3 from '../images/Iris_3.png'; // Replace with the correct path to your image

function AnalyzePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoUrl, itemId, key } = location.state || {}; // Destructure itemId and videoUrl from state

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to check the video analysis status
  const checkAnalysisStatus = async () => {
    if (!itemId) {
      console.error('No itemId provided');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/status/${itemId}/${key}`);
      if (response.ok) {
        setIsLoading(false);
      } else {
        setError('Error fetching analysis status');
      }
    } catch (error) {
      setError('Error fetching analysis status');
      console.error('Error fetching analysis status:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkAnalysisStatus();
    };

    fetchData();
  }, [itemId]); // Dependency array includes itemId

  const handleContinue = () => {
    navigate('review');
  };

  const handleBack = () => {
    navigate('upload');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Box 
          component="img"
          src={Iris_3}
          alt="Iris_3"
          sx={{ width: '25%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          onClick={handleBack}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '15%',
            height: '10%',
            cursor: 'pointer',
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
            overflow: 'hidden', // Remove scrollbar
          }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden', 
              bgcolor: 'background.default' 
            }}
          >
            <CustomStepper activeStep={1} /> {/* Highlight the 'Analyze' step */}
            <Box sx={{ mt: 4, mb: 4 }}>
              <Typography 
                sx={{ 
                  fontSize: '36pt', 
                  fontWeight: 'bold', 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", "SF Pro Display", sans-serif',
                  textAlign: 'center'
                }} 
                gutterBottom
              >
                {isLoading ? (
                  <>
                    Your video is being analyzed.... <span role="img" aria-label="hourglass">⏳</span>
                  </>
                ) : (
                  'Your video analysis is complete!'
                )}
              </Typography>
              {error && (
                <Typography variant="body1" color="error" align="center">
                  {error}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Box sx={{ flex: 1, mr: 2 }}>
                {videoUrl ? (
                  <video controls width="100%">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Typography variant="body1" color="error">
                    No video to display.
                  </Typography>
                )}
              </Box>
              <Box sx={{ flex: 1, ml: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Analyzing video content
                </Typography>
                {['Text', 'Audio', 'Content', 'Face'].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body1" sx={{ flex: 1, fontWeight: 'bold' }}>{item}: </Typography>
                    <CircularProgress size={20} sx={{ ml: 2 }} />
                  </Box>
                ))}
              </Box>
            </Box>
            <Divider />
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="secondary" onClick={handleContinue} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default AnalyzePage;
