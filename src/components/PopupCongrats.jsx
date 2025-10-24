import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from '@mui/material';

/*
 PopupCongrats.jsx
 - Open when score >= 60 (Result.jsx will control)
 - Simple dark-themed popup with confetti image
*/

export default function PopupCongrats({ open, onClose, scorePercent = 0, userName = '' }) {
  const title = scorePercent >= 85 ? 'Excellent!' : 'Great Job!';
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ background: '#0f1323', color: '#ff4dd2' }}>{title}</DialogTitle>
      <DialogContent sx={{ background: '#0b0e1a', color: '#e6eef8' }}>
        <Box textAlign="center" sx={{ px: 2, pb: 1 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Congrats {userName} 🎉</Typography>
          <Typography>You scored {scorePercent}%</Typography>

          <Box sx={{ mt: 2 }}>
            <img src="/confetti.svg" alt="confetti" style={{ width: 160 }} />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={onClose} sx={{ background: 'linear-gradient(90deg,#ff4dd2,#7a5cff)' }}>
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
