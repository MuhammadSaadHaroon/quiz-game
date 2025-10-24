import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Box,
  Paper
} from '@mui/material';
import '../styles/Signup.css';

/*
  Signup.jsx
  - Name (text)
  - Age (numbers only)
  - Gender (male/female/other)
  - Optional image (preview using URL.createObjectURL)
  - Save to localStorage as 'quiz_user'
  - Dark gaming UI look + neon accents
*/

export default function Signup() {
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState('');
  const [age, setAge] = useState(''); // keep as string for input control
  const [gender, setGender] = useState('male');
  const [imageSrc, setImageSrc] = useState(null);

  // If user previously saved, prefill (nice for dev/testing)
  useEffect(() => {
    const saved = localStorage.getItem('quiz_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u?.name) setName(u.name);
        if (u?.age) setAge(String(u.age));
        if (u?.gender) setGender(u.gender);
        if (u?.image) setImageSrc(u.image);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // handle image upload (preview)
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  // Age input: allow only digits. Also limit to reasonable age (e.g., 5-120)
  const handleAgeChange = (e) => {
    // remove non-digits
    const raw = e.target.value.replace(/\D/g, '');
    // optional: limit length 3
    const cleaned = raw.slice(0, 3);
    setAge(cleaned);
  };

  // Start / Save user and navigate to quiz
  const startGame = () => {
    // Basic validation
    if (!name.trim()) {
      alert('Name required');
      return;
    }
    if (!age || Number(age) <= 0 || Number(age) > 120) {
      alert('Enter a valid age (1-120)');
      return;
    }

    const user = {
      name: name.trim(),
      age: Number(age),
      gender,
      image: imageSrc || null,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('quiz_user', JSON.stringify(user));
    // clear any previous result
    localStorage.removeItem('quiz_result');

    navigate('/quiz');
  };

  // default avatars (dark-themed)
  const defaultMale = '/default_male.svg';
  const defaultFemale = '/default_female.svg';
  const defaultOther = '/default_other.svg'; // fallback

  const avatarSrc = imageSrc || (gender === 'male' ? defaultMale : gender === 'female' ? defaultFemale : defaultOther);

  return (
    <Container maxWidth="sm" className="signup-wrap">
      <Paper elevation={6} className="signup-paper">
        <Typography className="title-neon" variant="h4" align="center" gutterBottom>
          QUIZ GAME
        </Typography>

        <Box className="top-row">
          <Avatar src={avatarSrc} alt="avatar" sx={{ width: 96, height: 96 }} />
          <Box className="upload-col">
            <Button variant="contained" component="label" className="btn-neon">
              Upload Image (Optional)
              <input hidden accept="image/*" type="file" onChange={handleImage} />
            </Button>
            <Button
              variant="outlined"
              className="btn-outline"
              onClick={() => {
                setImageSrc(null);
              }}
              sx={{ mt: 1 }}
            >
              Remove Image
            </Button>
          </Box>
        </Box>

        <Box component="form" className="form-col" noValidate autoComplete="off">
          <TextField
            label="Name"
            variant="filled"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{ disableUnderline: true }}
            className="input-field"
          />

          <TextField
            label="Age"
            variant="filled"
            fullWidth
            value={age}
            onChange={handleAgeChange}
            InputProps={{ inputMode: 'numeric' }}
            className="input-field"
            helperText="Enter numbers only"
            sx={{ mt: 1 }}
          />

          <Box sx={{ mt: 1 }}>
            <Typography sx={{ mb: 0.5 }}>Gender</Typography>
            <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </Box>

          <Box className="action-row">
            <Button variant="outlined" className="btn-outline" onClick={() => { localStorage.clear(); window.location.reload(); }}>
              Reset
            </Button>
            <Button variant="contained" className="btn-neon" onClick={startGame}>
              Start Game
            </Button>
          </Box>
        </Box>

        <Typography variant="caption" display="block" align="center" sx={{ mt: 2, opacity: 0.8 }}>
          Note: Game will run Easy → Normal → Hard automatically. Total = 100 marks.
        </Typography>
      </Paper>
    </Container>
  );
}
