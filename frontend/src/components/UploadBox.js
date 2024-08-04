import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import uploadIcon from '../images/upload_icon.png';

function UploadBox({ onFileUpload }) {  // Add onFileUpload as a prop here
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && onFileUpload) {  // Check if onFileUpload is provided
      onFileUpload(file);
    }
  };

  return (
    <Box sx={{ border: '2px solid #ccc', borderRadius: '20px', p: 5, textAlign: 'center' }}> 
      <Box sx={{ border: '2px dashed #ccc', borderRadius: '20px', p: 10, textAlign: 'center' }}>
        <img src={uploadIcon} alt="Upload Icon" style={{ width: '64px', height: 'auto' }} />
        <br />
        <Typography sx={{ fontSize: '15pt', fontWeight: 'bold' }}>Drag & Drop or Choose Files to Upload</Typography>
        <Typography variant="caption" sx={{ fontSize: '14pt' }}>Select .mp4 or .mov files</Typography>
        <br />
        <br />
        <Button 
          variant="contained" 
          component="label"
          sx={{ 
            mt: `2`,
            bgcolor: '#000000',
            color: 'common.white',
            borderRadius: '50px',
            padding: '12px 12px',
            paddingLeft: '25px',
            paddingRight: '25px',
            '&:hover': {
              bgcolor: 'grey.800',
            },
            fontSize: '16px'
          }}>
          Browse Files
          <input
            type="file"
            hidden
            accept=".mp4,.mov"
            onChange={handleFileChange}
          />
        </Button>
      </Box>
    </Box>
  );
}

export default UploadBox;