import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Avatar } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import './ForgotPasswordPage.css';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending reset link
    setMessage('If this email exists, a reset link has been sent.');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          borderRadius: 4,
          minWidth: 350,
          maxWidth: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(30, 41, 59, 0.98)',
        }}
      >
        <Avatar sx={{ bgcolor: '#8b5cf6', width: 64, height: 64, mb: 2 }}>
          <VpnKeyIcon fontSize="large" />
        </Avatar>
        <Typography variant="h6" fontWeight={700} color="#fff" mb={1}>
          Forgot Password?
        </Typography>
        <Typography color="#cbd5e1" mb={3} align="center">
          No worries! Enter your email to reset your password.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} width="100%">
          <TextField
            label="Email *"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            required
            sx={{ mb: 3, input: { color: '#fff' }, label: { color: '#a3a3a3' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background: 'linear-gradient(90deg, #a78bfa 0%, #43e97b 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              borderRadius: 3,
              boxShadow: '0 2px 8px 0 rgba(67, 233, 123, 0.15)',
              mb: 2,
              '&:hover': { background: 'linear-gradient(90deg, #43e97b 0%, #a78bfa 100%)' },
            }}
          >
            SEND RESET LINK
          </Button>
        </Box>
        {message && (
          <Typography color="#43e97b" mt={2} align="center">
            {message}
          </Typography>
        )}
        <Typography mt={2} color="#a3a3a3">
          Remembered your password?{' '}
          <a href="/login" style={{ color: '#a78bfa', textDecoration: 'underline', fontWeight: 600 }}>
            Login
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage; 