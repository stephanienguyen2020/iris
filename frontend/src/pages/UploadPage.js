import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Paper, Box, Container, CircularProgress } from '@mui/material';
import theme from '../styles/theme';
import CustomStepper from '../components/CustomStepper';
import UploadBox from '../components/UploadBox';
import NavigationButtons from '../components/NavigationButtons';
import Iris_2 from '../images/Iris_2.png';
import { nanoid } from "nanoid";
import executeScript from "./script";

import AWS from "aws-sdk";
 
function UploadPage() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState(null);
  const item_id = nanoid();

  const handleBack = () => {
    navigate('/');
  };

  const handleContinue = () => {
    // Check if a file has been uploaded
    if (uploadedFile) {
      // You might want to show a loading indicator here
      setIsLoading(true);
  
      // Simulate file processing or API call
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to the next page, e.g., analysis page
        navigate('/analyze');
      }, 2000); // Simulating a 2-second process
    } else {
      // If no file is uploaded, show an error message
      setErrorMessage('Please upload a file before continuing.');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please provide a video file.");
      return;
    }

    const S3_BUCKET = import.meta.env.VITE_S3_BUCKET_NAME;

    await executeScript(S3_BUCKET, item_id);

    // Initialize S3 client

    const REGION = import.meta.env.VITE_AWS_REGION;

    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      region: REGION,
    });

    const s3 = new AWS.S3();

    try {
      const inputfileParams = {
        Bucket: S3_BUCKET,
        Key: `${item_id}/input_file.${file.type.split("/")[1]}`, // Dynamically set the file extension
        Body: file,
        ContentType: file.type,
      };

      try {
        const uploadInputFileResult = await s3.upload(inputfileParams).promise();
        console.log("uploadInputFileResult", uploadInputFileResult);
      } catch (error) {
        console.error("Error uploading file:", error);
      }

      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append(
      //   "s3Location",
      //   `s3://${S3_BUCKET}/${item_id}/input_file.${file.type.split("/")[1]}`
      // );
      // formData.append("item_id", item_id);

      // const response = await axios.post(API_BASE_URL, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // if (response.status !== 200) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      alert("File uploaded and path stored successfully!");
    } catch (error) {
      console.error("Error uploading file or storing path:", error);
      alert("There was an error uploading the file or storing the path.");
    }
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
              height: '10%', // This makes the clickable area the top 1/5 of the image
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
            <UploadBox onFileUpload={handleSubmit} />
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