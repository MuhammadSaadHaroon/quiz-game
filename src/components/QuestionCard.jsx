import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, Typography, Grid, Button, Box } from '@mui/material';

// ✅ PRELOAD SOUNDS
const correctSound = new Audio('/sounds/correct.mp3');
const wrongSound = new Audio('/sounds/wrong.mp3');

export default function QuestionCard({ question, onAnswer, disabled = false }) {
  const [chosen, setChosen] = useState(null);
  const [animateClass, setAnimateClass] = useState('');

  useEffect(() => {
    setChosen(null);
    setAnimateClass('fade-in');
  }, [question?.id]);

  const handleClick = (idx) => {
    if (disabled) return;
    setChosen(idx);

    // ✅ Play feedback sound
    if (idx === question.answerIndex) {
      correctSound.currentTime = 0;
      correctSound.play();
      setAnimateClass('correct-anim');
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
      setAnimateClass('wrong-anim');
    }

    onAnswer(question.id, idx);
  };

  // ✅ Keyboard navigation
  const handleKeyPress = useCallback((e) => {
    const key = parseInt(e.key);
    if (!isNaN(key) && key >= 1 && key <= question.options.length) {
      handleClick(key - 1);
    }
  }, [question]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  if (!question) return <Typography>Loading...</Typography>;

  return (
    <Card className={`quiz-card-anim ${animateClass}`} sx={{ background: 'linear-gradient(180deg,#0b0d16, #0f1323)', color: '#e6eef8', transition: '0.3s' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>{question.section}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>{question.id}</Typography>
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>{question.question}</Typography>

        <Grid container spacing={2}>
          {question.options.map((opt, idx) => (
            <Grid item xs={12} sm={question.mode === 'hard' ? 6 : 12} key={idx}>
              <Button
                fullWidth
                variant={chosen === idx ? 'contained' : 'outlined'}
                onClick={() => handleClick(idx)}
                disabled={disabled}
                className={chosen === idx ? (idx === question.answerIndex ? 'btn-correct' : 'btn-wrong') : ''}
                sx={{
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  padding: '12px',
                  borderColor: chosen === idx ? 'transparent' : 'rgba(255,255,255,0.06)'
                }}
              >
                {opt}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
