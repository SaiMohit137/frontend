import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Button, TextField, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const skillOptions = [
  'GRAPHIC DESIGN',
  'WEB DESIGN',
  'SOFTWARE',
  'APPLICATION',
];

const EditProfile: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('profile') || '{}');
    const uname = saved.username || 'johndoe';
    setUsername(uname);
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/users/${uname}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name || 'John Doe');
        setBio(data.bio || 'Passionate student, loves coding and collaborating!');
        setSkills(data.skills || []);
      });
  }, []);

  const handleSkillChange = (skill: string) => {
    setSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || username === 'johndoe') {
      setMessage('Please log in to edit your profile.');
      return;
    }
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/users/${username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, bio, skills }),
    });
    if (res.ok) {
      const updated = await res.json();
      localStorage.setItem('profile', JSON.stringify(updated));
      setMessage('Profile saved!');
    } else {
      setMessage('Failed to save profile.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 400, width: '100%', p: 3, borderRadius: 4, boxShadow: 6, background: 'rgba(255,255,255,0.97)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
          <Button variant="outlined" size="small" sx={{ mb: 2 }}>Change Picture</Button>
        </Box>
        <Box component="form" onSubmit={handleSave}>
          <TextField label="Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
          <TextField label="Username" fullWidth margin="normal" value={username} disabled />
          <TextField label="Bio" fullWidth margin="normal" multiline minRows={2} value={bio} onChange={e => setBio(e.target.value)} />
          <FormGroup row sx={{ mb: 2 }}>
            {skillOptions.map(option => (
              <FormControlLabel
                key={option}
                control={<Checkbox checked={skills.includes(option)} onChange={() => handleSkillChange(option)} />}
                label={option}
              />
            ))}
          </FormGroup>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Save
          </Button>
          {message && <Typography color={message.includes('saved') ? 'primary' : 'error'} sx={{ mt: 2 }}>{message}</Typography>}
        </Box>
      </Card>
    </Box>
  );
};

export default EditProfile; 