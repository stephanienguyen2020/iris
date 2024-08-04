import React from 'react';
import { Stepper, Step, StepLabel, Typography } from '@mui/material';
import { ColorlibConnector } from '../styles/theme';

const steps = ['Upload', 'Analyze', 'Detect', 'Review', 'Publish'];

function CustomStepper() {
  return (
    <Stepper activeStep={0} alternativeLabel connector={<ColorlibConnector />}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconProps={{
              sx: {
                width: 35,
                height: 35,
                color: index === 0 ? 'primary.main' : 'grey.main',
                '&.Mui-active': {
                  color: 'primary.main',
                },
                '&.Mui-completed': {
                  color: 'primary.main',
                },
                '& .MuiStepIcon-text': {
                  fontSize: '.7rem',
                },
              },
            }}
          >
            <Typography
              color={index === 0 ? 'primary' : 'grey.main'}
              fontWeight={index === 0 ? 'bold' : 'normal'}
            >
              {label}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default CustomStepper;