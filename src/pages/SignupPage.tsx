import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Avatar } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import './SignupPage.css';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || 'Signup failed');
        return;
      }
      navigate('/login');
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <Box className="signup-bg">
      <Paper className="signup-card" elevation={10} sx={{ p: 0, width: 'auto', background: 'none', boxShadow: 'none' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: '#43e97b', width: 56, height: 56 }}>
            <PersonAddAlt1Icon fontSize="large" />
          </Avatar>
          <div className="signup-title">Join the Student Collaboration Hub</div>
          <div className="signup-subtitle">Create your account to connect and collaborate!</div>
        </div>
        <Box component="form" width="100%" onSubmit={handleSignup}>
          <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" required />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, background: 'linear-gradient(90deg, #43e97b 0%, #6a11cb 100%)', fontWeight: 600, fontSize: 18, boxShadow: '0 2px 8px 0 rgba(106, 17, 203, 0.15)' }}>
            Sign Up
          </Button>
        </Box>
        <Box mt={2} width="100%">
          <Typography variant="body2" align="center">
            Already have an account? <Link to="/login" className="signup-link">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignupPage; 