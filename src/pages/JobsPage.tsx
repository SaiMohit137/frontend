import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Button, TextField, Stack, IconButton, InputAdornment, List, ListItem, ListItemText
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

interface Job {
  id: string;
  title: string;
  company: string;
  link: string;
  referrer: string;
}

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');
  const [referrer, setReferrer] = useState('');
  const [search, setSearch] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch jobs from backend
    fetch(`${API_URL}/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(() => setJobs([]));
  }, []);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company || !link) return;
    const ref = referrer || (JSON.parse(localStorage.getItem('profile') || '{}').username || 'anonymous');
    const job = { title, company, link, referrer: ref };
    const res = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });
    if (res.ok) {
      const newJob = await res.json();
      setJobs([newJob, ...jobs]);
      setTitle('');
      setCompany('');
      setLink('');
      setReferrer('');
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`${API_URL}/jobs/${id}`, { method: 'DELETE' });
    if (res.ok) setJobs(jobs.filter(j => j.id !== id));
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.referrer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', justifyContent: 'center', gap: 4 }}>
      <Card sx={{ maxWidth: 600, width: '100%', p: 3, borderRadius: 4, boxShadow: 6, background: 'rgba(255,255,255,0.97)' }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} color="#2575fc" mb={2}>
            Add Job Opening
          </Typography>
          <Box component="form" onSubmit={handleAddJob} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Job Title" value={title} onChange={e => setTitle(e.target.value)} required fullWidth />
            <TextField label="Company" value={company} onChange={e => setCompany(e.target.value)} required fullWidth />
            <TextField label="Job Link" value={link} onChange={e => setLink(e.target.value)} required fullWidth />
            <TextField label="Referrer (optional)" value={referrer} onChange={e => setReferrer(e.target.value)} fullWidth />
            <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700 }}>
              Add Job
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 700, width: '100%', p: 3, borderRadius: 4, boxShadow: 6, background: 'rgba(255,255,255,0.97)' }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} color="#2575fc" mb={2}>
            Job Openings
          </Typography>
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, company, or referrer..."
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2, background: 'white', borderRadius: 2 }}
          />
          <List>
            {filteredJobs.length === 0 && (
              <ListItem>
                <ListItemText primary="No jobs found." />
              </ListItem>
            )}
            {filteredJobs.map(job => (
              <ListItem key={job.id} alignItems="flex-start" secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(job.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              }>
                <ListItemText
                  primary={<>
                    <Typography variant="subtitle1" fontWeight={700}>{job.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{job.company}</Typography>
                  </>}
                  secondary={<>
                    <Button
                      variant="outlined"
                      startIcon={<LinkIcon />}
                      href={job.link}
                      target="_blank"
                      size="small"
                      sx={{ mt: 1, mb: 1 }}
                    >
                      View Job
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                      Referrer: {job.referrer}
                    </Typography>
                  </>}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobsPage; 