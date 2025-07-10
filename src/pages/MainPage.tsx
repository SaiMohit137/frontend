import React from 'react';
import { Box, Typography, Button, Paper, Stack, Avatar, Grid } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
// Removed LandingNavbar import

const logos = [
  'Logo', 'Logo', 'Logo', 'Logo', 'Logo', 'Logo', 'Logo'
];

const MainPage: React.FC = () => {
  return (
    // Removed LandingNavbar usage
    <Box sx={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', p: 2 }}>
      <Paper elevation={8} sx={{ borderRadius: 5, maxWidth: 1200, width: '100%', p: { xs: 2, md: 6 }, boxShadow: 8, background: 'white', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-start' }, px: { xs: 0, md: 4 } }}>
          <Typography variant="h3" fontWeight={900} mb={1} mt={1} sx={{ fontSize: { xs: '1.5rem', md: '2.2rem' }, lineHeight: 1.2, textAlign: { xs: 'center', md: 'left' } }}>
            Student Collab Hub is your digital space to connect, collaborate, and share with fellow students.
          </Typography>
          <Typography variant="h5" fontWeight={500} mb={4} sx={{ fontSize: { xs: '1.1rem', md: '1.4rem' }, color: 'text.secondary', textAlign: { xs: 'center', md: 'left' } }}>
            Join a vibrant community built for learning and success together.
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: { xs: 0, md: 4 }, mt: { xs: 4, md: 0 } }}>
          <Avatar sx={{ width: 120, height: 120, bgcolor: '#fbbf24', mb: 2 }}>
            <PhoneIphoneIcon sx={{ fontSize: 60, color: '#fff' }} />
          </Avatar>
          <Box sx={{ width: 180, height: 120, background: 'linear-gradient(135deg, #fbbf24 0%, #3b82f6 100%)', borderRadius: 4, mt: 2 }} />
        </Box>
      </Paper>
      {/* <Box sx={{ width: '100%', mt: 6, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Trusted by individuals and teams at the world's best companies
        </Typography>
        <Stack direction="row" spacing={3} justifyContent="center" alignItems="center" mt={2}>
          {[...Array(7)].map((_, idx) => (
            <Typography key={idx} variant="body2" color="text.secondary" fontWeight={700}>
              Logo
            </Typography>
          ))}
        </Stack>
      </Box> */}
    </Box>
  );
};

export default MainPage; 