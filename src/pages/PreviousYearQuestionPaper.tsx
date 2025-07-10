import React, { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Box, Paper, Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider, Button, TextField, IconButton } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';

interface QuestionPaper {
  _id?: string;
  subject: string;
  year: string;
  link: string;
}

const PreviousYearQuestionPaper: React.FC = () => {
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  // Remove pdf state

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/question-papers`)
      .then(res => res.json())
      .then(data => setPapers(data));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!subject || !year || !link) {
      setError('All fields are required');
      return;
    }
    const res = await fetch(`${API_URL}/question-papers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, year, link }),
    });
    if (res.ok) {
      const newPaper = await res.json();
      setPapers([newPaper, ...papers]);
      setSubject('');
      setYear('');
      setLink('');
    } else {
      setError('Failed to add paper');
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const res = await fetch(`${API_URL}/question-papers/${id}`, { method: 'DELETE' });
    if (res.ok) setPapers(papers.filter(p => p._id !== id));
  };

  // Group by subject
  const grouped = papers.reduce((acc, paper) => {
    acc[paper.subject] = acc[paper.subject] || [];
    acc[paper.subject].push(paper);
    return acc;
  }, {} as Record<string, QuestionPaper[]>);

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)', py: { xs: 2, md: 4 }, px: { xs: 2, md: 6 } }}>
      <Paper sx={{ p: { xs: 3, md: 6 }, borderRadius: 5, width: '100%', maxWidth: 900, boxShadow: '0 8px 32px 0 rgba(106,17,203,0.25)', background: 'rgba(255,255,255,0.99)', m: 'auto', mt: 4, mb: 6, border: '3px solid #6a11cb', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #6a11cb 0%, #43e97b 100%)', opacity: 0.08, zIndex: 0 }} />
        <Typography variant="h3" fontWeight={900} sx={{ background: 'linear-gradient(90deg, #6a11cb 0%, #43e97b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1, textAlign: 'center', zIndex: 1, position: 'relative' }}>
          Previous Year Question Papers
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" mb={2} sx={{ zIndex: 1, position: 'relative' }}>
          Download previous year question papers by subject
        </Typography>
        <Box component="form" onSubmit={handleAdd} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, width: '100%', maxWidth: 500, mx: 'auto', zIndex: 1, position: 'relative' }}>
          <TextField label="Subject" value={subject} onChange={e => setSubject(e.target.value)} size="small" required fullWidth />
          <TextField label="Year" value={year} onChange={e => setYear(e.target.value)} size="small" required fullWidth />
          <TextField label="Link" value={link} onChange={e => setLink(e.target.value)} size="small" required fullWidth />
          <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700, background: 'linear-gradient(90deg, #6a11cb 0%, #43e97b 100%)', boxShadow: 3 }}>
            Add
          </Button>
        </Box>
        {error && <Typography color="error" align="center" sx={{ zIndex: 1, position: 'relative' }}>{error}</Typography>}
      </Paper>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: '100%', maxWidth: 1100, px: { xs: 0, md: 3 } }}>
        {Object.entries(grouped).map(([subject, subjectPapers], idx) => (
          <Card key={subject} sx={{ borderRadius: 5, boxShadow: '0 6px 24px 0 rgba(67,233,123,0.15)', background: 'linear-gradient(120deg, #fff 60%, #e0e7ff 100%)', width: '100%', maxWidth: 950, borderLeft: `10px solid ${['#6a11cb','#43e97b','#2563eb','#f59e42'][idx%4]}`, p: { xs: 2, md: 4 } }}>
            <CardContent>
              <Typography variant="h5" fontWeight={800} sx={{ color: ['#6a11cb','#43e97b','#2563eb','#f59e42'][idx%4], mb: 1, letterSpacing: 1 }}>
                {subject}
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <List>
                {subjectPapers.map((paper) => (
                  <ListItem
                    component="a"
                    href={paper.link}
                    key={paper._id || paper.year}
                    target="_blank"
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      transition: 'background 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #6a11cb11 0%, #43e97b11 100%)',
                        boxShadow: 4,
                      },
                    }}
                    secondaryAction={
                      <>
                        <Button
                          variant="outlined"
                          color="success"
                          size="small"
                          href={paper.link}
                          target="_blank"
                          sx={{ mr: 1, fontWeight: 700, borderRadius: 2 }}
                          download
                        >
                          Download
                        </Button>
                        <IconButton edge="end" color="error" onClick={e => { e.preventDefault(); handleDelete(paper._id); }}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemIcon>
                      <DescriptionIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={`Question Paper ${paper.year}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PreviousYearQuestionPaper; 