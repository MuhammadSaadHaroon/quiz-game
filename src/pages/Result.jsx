import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Button, Avatar } from '@mui/material';
import ScoreMeter from '../components/ScoreMeter';
import PopupCongrats from '../components/PopupCongrats';
import { useNavigate } from 'react-router-dom';
import '../styles/Result.css';

/*
 Result.jsx
 - Reads result from localStorage 'quiz_result'
 - Shows user info, meter, score
 - Shows popup if percent >= 60
*/

export default function Result() {
  const navigate = useNavigate();
  const saved = JSON.parse(localStorage.getItem('quiz_result')) || {};
  const user = saved.user || JSON.parse(localStorage.getItem('quiz_user')) || {};
  const [open, setOpen] = useState(false);

  const score = saved.score ?? 0;
  const totalPossible = saved.totalPossible ?? 100;
  const percent = saved.percent ?? Math.round((score / totalPossible) * 100);

  useEffect(() => {
    // show popup for >= 60
    if (percent >= 60) {
      setTimeout(() => setOpen(true), 600);
    }
  }, [percent]);

  const avatarSrc = user?.image || (user?.gender === 'female' ? '/default_female.svg' : '/default_male.svg');

  return (
    <Container maxWidth="sm" className="result-wrap">
      <Paper className="result-paper" elevation={6}>
        <Box className="result-top">
          <Box sx={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar src={avatarSrc} sx={{ width: 72, height: 72 }} />
            <Box>
              <Typography variant="h6">{user?.name}</Typography>
              <Typography variant="body2" sx={{ color: '#a9b8d6' }}>Age: {user?.age} — Mode: All</Typography>
            </Box>
          </Box>

          <ScoreMeter value={percent} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Score: {score} / {totalPossible} ({percent}%)</Typography>

          <Box className="result-actions" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => navigate('/quiz')} sx={{ background: 'linear-gradient(90deg,#ff4dd2,#7a5cff)' }}>
              Play Again
            </Button>
            <Button variant="outlined" onClick={() => { localStorage.clear(); navigate('/'); }}>
              Restart
            </Button>
          </Box>
        </Box>
      </Paper>

      <PopupCongrats open={open} onClose={() => setOpen(false)} scorePercent={percent} userName={user?.name} />
    </Container>
  );
}
