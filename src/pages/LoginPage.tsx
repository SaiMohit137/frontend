import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        setError('Invalid credentials');
        return;
      }
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('loggedIn', 'true'); // Set loggedIn flag
      // Fetch and store user profile
      const profileRes = await fetch(`${API_URL}/users/${username}`);
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        localStorage.setItem('profile', JSON.stringify(profileData));
      }
      navigate('/main');
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <Box className="login-bg">
      <Paper className="login-card" elevation={10} sx={{ p: 0, width: 'auto', background: 'none', boxShadow: 'none' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: '#6a11cb', width: 56, height: 56 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <div className="login-title">Student Collaboration Hub</div>
          <div className="login-subtitle">Connect, share notes, find jobs, and collaborate with your peers!</div>
        </div>
        <Box component="form" width="100%" onSubmit={handleLogin}>
          <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" required />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, background: 'linear-gradient(90deg, #6a11cb 0%, #43e97b 100%)', fontWeight: 600, fontSize: 18, boxShadow: '0 2px 8px 0 rgba(67, 233, 123, 0.15)' }}>
            Login
          </Button>
        </Box>
        <Box mt={2} width="100%">
          <Typography variant="body2" align="center">
            Don't have an account? <Link to="/signup" className="login-link">Sign Up</Link>
          </Typography>
          <Typography variant="body2" align="center">
            <Link to="/forgot-password" className="login-link">Forgot Password?</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage; 