import React, { useMemo, useState } from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import questionsData from '../data/questions';
import QuestionCard from '../components/QuestionCard';
import { useNavigate } from 'react-router-dom';
import '../styles/Quiz.css';

/*
 Quiz.jsx
 - Sequential flow: Easy (10 q, 1pt) -> Normal (10 q, 2pt) -> Hard (14 q, 5pt)
 - Auto advance question to question; after last question compute result and navigate to /result
*/

export default function Quiz() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('quiz_user')) || { name: 'Guest' };

  // Prepare ordered questions: easy(10) then normal(10) then hard(14)
  const allQuestions = useMemo(() => {
    const easy = questionsData.filter(q => q.mode === 'easy').slice(0, 10);
    const normal = questionsData.filter(q => q.mode === 'normal').slice(0, 10);
    const hard = questionsData.filter(q => q.mode === 'hard').slice(0, 14);
    // tag each with its section for UI
    const tag = (arr, sec) => arr.map(q => ({ ...q, section: sec }));
    return [...tag(easy, 'Easy'), ...tag(normal, 'Normal'), ...tag(hard, 'Hard')];
  }, []);

  const [current, setCurrent] = useState(0); // index in allQuestions
  const [answers, setAnswers] = useState({}); // { qid: selectedIndex }
  const [locked, setLocked] = useState(false); // prevent double-click

  const totalQuestions = allQuestions.length; // should be 34

  const currentQ = allQuestions[current];

  const handleAnswer = (qid, selectedIndex) => {
    if (locked) return;
    setLocked(true);

    // save answer
    setAnswers(prev => ({ ...prev, [qid]: selectedIndex }));

    // small delay for UX
    setTimeout(() => {
      setLocked(false);
      if (current < totalQuestions - 1) {
        setCurrent(c => c + 1);
      } else {
        // finished all -> calculate score and store result
        const totalScore = calculateTotalScore({ ...answers, [qid]: selectedIndex }, allQuestions);
        const result = {
          user: JSON.parse(localStorage.getItem('quiz_user')) || user,
          score: totalScore,
          totalPossible: 100,
          percent: Math.round((totalScore / 100) * 100)
        };
        localStorage.setItem('quiz_result', JSON.stringify(result));
        navigate('/result');
      }
    }, 350);
  };

  const calculateTotalScore = (finalAnswers, questionsList) => {
    let total = 0;
    questionsList.forEach(q => {
      const sel = finalAnswers[q.id];
      if (typeof sel === 'number' && sel === q.answerIndex) {
        if (q.section === 'Easy') total += 1;
        else if (q.section === 'Normal') total += 2;
        else if (q.section === 'Hard') total += 5;
      }
    });
    return total;
  };

  // Show progress of sections
  const sectionOfIndex = (idx) => {
    const q = allQuestions[idx];
    return q ? q.section : '';
  };

  return (
    <Container maxWidth="md" className="quiz-wrap">
      <Paper className="quiz-card" elevation={6}>
        <Box className="quiz-header">
          <Typography variant="h6" className="neon-small">Player: {user?.name}</Typography>
          <Typography variant="subtitle2" className="neon-small">Mode: {sectionOfIndex(current)}</Typography>
          <Typography variant="subtitle2" className="neon-small">{current + 1} / {totalQuestions}</Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          {currentQ ? (
            <QuestionCard
              question={currentQ}
              onAnswer={handleAnswer}
              disabled={locked}
            />
          ) : (
            <Typography>No questions available.</Typography>
          )}
        </Box>

        <Box className="quiz-footer">
          <Button variant="outlined" onClick={() => {
            if (window.confirm('Quit quiz? Progress will be lost.')) {
              localStorage.removeItem('quiz_result');
              navigate('/');
            }
          }}>
            Quit
          </Button>

          <Typography variant="caption" sx={{ color: '#a9b8d6' }}>
            Note: Easy → Normal → Hard run automatically. Total = 100.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
