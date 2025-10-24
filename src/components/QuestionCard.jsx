import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Box } from '@mui/material';

/*
 QuestionCard.jsx
 - Shows question text
 - Shows options (4 for easy/normal, 6 for hard)
 - Disables after user clicks (controlled via disabled prop during transit)
 - Calls onAnswer(question.id, selectedIndex)
*/

export default function QuestionCard({ question, onAnswer, disabled = false }) {
  const [chosen, setChosen] = useState(null);

  // Reset chosen when question changes
  React.useEffect(() => {
    setChosen(null);
  }, [question?.id]);

  if (!question) return null;

  const handleClick = (idx) => {
    if (disabled) return;
    setChosen(idx);
    onAnswer(question.id, idx);
  };

  return (
    <Card sx={{ background: 'linear-gradient(180deg,#0b0d16, #0f1323)', color: '#e6eef8' }}>
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
