import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Button, Paper } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import WebIcon from '@mui/icons-material/Web';
import CodeIcon from '@mui/icons-material/Code';
import AppsIcon from '@mui/icons-material/Apps';
import type { JSX } from 'react';

const skillOptions: { key: string; icon: JSX.Element; color: string }[] = [
  { key: 'GRAPHIC DESIGN', icon: <DesignServicesIcon sx={{ fontSize: 36, color: '#f59e42' }} />, color: '#f59e42' },
  { key: 'WEB DESIGN', icon: <WebIcon sx={{ fontSize: 36, color: '#1ccfc9' }} />, color: '#1ccfc9' },
  { key: 'SOFTWARE', icon: <CodeIcon sx={{ fontSize: 36, color: '#2563eb' }} />, color: '#2563eb' },
  { key: 'APPLICATION', icon: <AppsIcon sx={{ fontSize: 36, color: '#fbbf24' }} />, color: '#fbbf24' },
];

const ViewProfile: React.FC = () => {
  const [profile, setProfile] = useState<{
    name: string;
    username: string;
    bio: string;
    skills: string[];
  }>({
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Passionate student, loves coding and collaborating!',
    skills: [],
  });

  useEffect(() => {
    // Get username from localStorage (set at login/signup)
    const saved = JSON.parse(localStorage.getItem('profile') || '{}');
    const username = saved.username || 'johndoe';
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/users/${username}`)
      .then(res => res.json())
      .then(data => setProfile({
        name: data.name || 'John Doe',
        username: data.username || 'johndoe',
        bio: data.bio || 'Passionate student, loves coding and collaborating!',
        skills: data.skills || [],
      }))
      .catch(() => setProfile({
        name: 'John Doe',
        username: 'johndoe',
        bio: 'Passionate student, loves coding and collaborating!',
        skills: [],
      }));
  }, []);

  return (
    <Box sx={{ minHeight: '90vh', background: '#fff', py: 6, px: 2 }}>
      {/* Top Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
          A BIT ABOUT ME
        </Typography>
        <Typography variant="h3" fontWeight={900} color="#2563eb" mb={1}>
          Who Am I?
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth={600} mx="auto">
          {profile.bio}
        </Typography>
      </Box>
      {/* Main Content */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', maxWidth: 1100, mx: 'auto', gap: 4 }}>
        {/* Left Card */}
        <Paper elevation={6} sx={{ borderRadius: 4, p: 4, bgcolor: '#2563eb', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 340 }}>
          <Avatar sx={{ width: 100, height: 100, mb: 2, border: '4px solid #fff' }} />
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2, textAlign: 'center' }}>
            I am happy to know you that 300+ projects done successfully!
          </Typography>
          <Button variant="contained" sx={{ background: '#fff', color: '#2563eb', fontWeight: 700, borderRadius: 3, mt: 2, px: 4, '&:hover': { background: '#e0e7ff' } }}>
            Learn More
          </Button>
        </Paper>
        {/* Right Skills Grid */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {skillOptions.filter(opt => profile.skills.includes(opt.key)).map((skill) => (
              <Card key={skill.key} sx={{ borderRadius: 3, boxShadow: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 140 }}>
                {skill.icon}
                <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 2, mb: 1, color: '#222' }}>
                  {skill.key}
                </Typography>
                <Button size="small" sx={{ color: skill.color, fontWeight: 700, textTransform: 'none' }}>More</Button>
              </Card>
            ))}
            {profile.skills.length === 0 && (
              <Typography color="text.secondary" align="center">No skills selected.</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewProfile; 