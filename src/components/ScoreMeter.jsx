import React from 'react';
import { Box, Typography } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

/*
 ScoreMeter.jsx
 - value: 0-100
 - shows gauge with color segments and label (Poor / Low / Medium / High / Max)
 - dark neon style
*/

export default function ScoreMeter({ value = 0 }) {
  // Determine label and color
  let label = 'Poor';
  let color = '#ff4d4f'; // red

  if (value > 20 && value <= 40) {
    label = 'Low';
    color = '#ff7a45'; // orange
  } else if (value > 40 && value <= 60) {
    label = 'Medium';
    color = '#ffd666'; // yellow
  } else if (value > 60 && value <= 80) {
    label = 'Good';
    color = '#73d13d'; // green
  } else if (value > 80) {
    label = 'Excellent';
    color = '#36cfc9'; // teal/green
  } else {
    label = 'Poor';
    color = '#ff4d4f';
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: 160 }}>
      <Box sx={{ width: 140, height: 140 }}>
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            textColor: '#e6eef8',
            pathColor: color,
            trailColor: '#1a1d29',
            backgroundColor: '#0b0e1a',
            textSize: '16px',
            pathTransitionDuration: 0.8,
          })}
        />
      </Box>
      <Typography sx={{ mt: 1, color: '#a9b8d6', fontWeight: 600 }}>{label}</Typography>
    </Box>
  );
}
