import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Paper, Box, Container, CircularProgress } from '@mui/material';
import theme from '../styles/theme';
import CustomStepper from '../components/CustomStepper';
import UploadBox from '../components/UploadBox';
import NavigationButtons from '../components/NavigationButtons';
import Iris_2 from '../images/Iris_2.png';
import axios from 'axios'; // Import Axios

function UploadPage() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBack = () => {
    navigate('/');
  };

  const handleContinue = async () => {
    if (uploadedFile) {
      setIsLoading(true);
      setErrorMessage(''); // Clear any previous error messages

      const formData = new FormData();
      formData.append('file', uploadedFile);

      try {
        // API call to local server
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response as needed
        console.log(response.data);
        navigate('/analyze', { state: { key: response.data.key, itemId: response.data.itemId, videoUrl: URL.createObjectURL(uploadedFile) } }); // Pass the video URL
      } catch (error) {
        // Handle errors
        console.error('Error uploading file:', error);
        setErrorMessage('Failed to upload file. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage('Please upload a file before continuing.');
    }
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setErrorMessage(''); // Clear any previous error messages
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
          src={Iris_2}
          alt="Iris_2"
          sx={{ 
            width: 'auto',
            height: '100%',
            objectFit: 'cover'
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
            elevation={0} 
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
                Let's begin <span role="img" aria-label="waving hand">👋</span> 
              </Typography>
            </Box>
            <UploadBox onFileUpload={handleFileUpload} />
            {isLoading && <CircularProgress sx={{ alignSelf: 'center', mt: 2 }} />}
            {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}
            <br/>
            <NavigationButtons onBack={handleBack} onContinue={handleContinue} />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default UploadPage;
