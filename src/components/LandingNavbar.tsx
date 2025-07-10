import React from 'react';
import { Toolbar, Typography, Button, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingNavbar: React.FC = () => {
  return (
    <Paper elevation={4} sx={{
      borderRadius: 4,
      mt: 3,
      mx: 'auto',
      maxWidth: 1200,
      width: '95%',
      background: 'white',
      boxShadow: 3,
      position: 'relative',
    }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 70 }}>
        {/* Logo Left */}
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 120 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1, color: '#222' }}>
            Lando
          </Typography>
        </Box>
        {/* Center Nav Links */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, flex: 1 }}>
          <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 600, color: '#222', px: 2 }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="#pricing" sx={{ fontWeight: 600, color: '#222', px: 2 }}>
            Pricing
          </Button>
          <Button color="inherit" component={Link} to="#about" sx={{ fontWeight: 600, color: '#222', px: 2 }}>
            About us
          </Button>
          <Button color="inherit" component={Link} to="#contact" sx={{ fontWeight: 600, color: '#222', px: 2 }}>
            Contact
          </Button>
        </Box>
        {/* Right Auth Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 180, justifyContent: 'flex-end' }}>
          <Button
            variant="text"
            component={Link}
            to="/login"
            sx={{ color: '#222', fontWeight: 600, mr: 1, borderRadius: 3 }}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/signup"
            sx={{ background: '#2563eb', color: '#fff', fontWeight: 700, borderRadius: 3, boxShadow: 'none', '&:hover': { background: '#1d4ed8' } }}
          >
            Sign up
          </Button>
        </Box>
      </Toolbar>
    </Paper>
  );
};

export default LandingNavbar; 