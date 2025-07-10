import React, { useState } from 'react';
import { Toolbar, Typography, Button, Box, Menu, MenuItem, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [postsAnchor, setPostsAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const handlePostsMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPostsAnchor(event.currentTarget);
  };
  const handleProfileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setPostsAnchor(null);
    setProfileAnchor(null);
  };

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
            Student Collab Hub
          </Typography>
        </Box>
        {/* Center Nav Links */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, flex: 1 }}>
          <Button color="inherit" component={Link} to="/main" sx={{ fontWeight: 600, color: '#222', px: 2 }}>
            Home
          </Button>
          <Button color="inherit" sx={{ fontWeight: 600, color: '#222', px: 2 }} onClick={handlePostsMenu}>
            Posts
          </Button>
          <Menu anchorEl={postsAnchor} open={Boolean(postsAnchor)} onClose={handleClose}>
            <MenuItem component={Link} to="/main/notes" onClick={handleClose}>Notes</MenuItem>
            <MenuItem component={Link} to="/main/jobs" onClick={handleClose}>Jobs</MenuItem>
            <MenuItem component={Link} to="/main/threads" onClick={handleClose}>Threads</MenuItem>
          </Menu>
          <Button color="inherit" sx={{ fontWeight: 600, color: '#222', px: 2 }} onClick={handleProfileMenu}>
            Profile
          </Button>
          <Menu anchorEl={profileAnchor} open={Boolean(profileAnchor)} onClose={handleClose}>
            <MenuItem component={Link} to="/main/profile" onClick={handleClose}>View Profile</MenuItem>
            <MenuItem component={Link} to="/main/profile/edit" onClick={handleClose}>Edit Profile</MenuItem>
          </Menu>
          <Button color="inherit" component={Link} to="/previous-year-question-paper" sx={{ fontWeight: 600, color: '#222', px: 2 }}>
            Previous Year Question Paper
          </Button>
        </Box>
        {/* Logout Right */}
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 120, justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            sx={{ background: '#dc2626', color: '#fff', fontWeight: 700, borderRadius: 3, boxShadow: 'none', '&:hover': { background: '#b91c1c' } }}
            onClick={() => { localStorage.removeItem('loggedIn'); navigate('/login'); }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </Paper>
  );
};

export default Navbar; 