import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Button, TextField, Chip, Stack, IconButton, InputAdornment, List, ListItem, ListItemText
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

interface Note {
  id: string;
  title: string;
  fileUrl: string;
  fileName: string;
  tags: string[];
  uploader: string;
}

const subjectTags = ['AI & ML', 'DBMS', 'DSA', 'Communications', 'EEE'];

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch notes from backend
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/notes`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(() => setNotes([]));
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;
    // For now, skip file upload, just send metadata
    const uploader = JSON.parse(localStorage.getItem('profile') || '{}').username || 'anonymous';
    const note = { title, file_url: '', file_name: file.name, tags, uploader };
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (res.ok) {
      const newNote = await res.json();
      setNotes([newNote, ...notes]);
      setTitle('');
      setFile(null);
      setTags([]);
    }
  };

  const handleDelete = async (id: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE' });
    if (res.ok) setNotes(notes.filter(n => n.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    (note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
      note.uploader.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', justifyContent: 'center', gap: 4 }}>
      <Card sx={{ maxWidth: 600, width: '100%', p: 3, borderRadius: 4, boxShadow: 6, background: 'rgba(255,255,255,0.97)' }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} color="#2575fc" mb={2}>
            Upload Note
          </Typography>
          <Box component="form" onSubmit={handleUpload} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} required fullWidth />
            <TextField
              select
              SelectProps={{ multiple: true }}
              label="Tags (Subjects)"
              value={tags}
              onChange={e => setTags(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[])}
              fullWidth
            >
              {subjectTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </TextField>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ fontWeight: 600 }}
            >
              {file ? file.name : 'Choose File'}
              <input type="file" hidden onChange={e => setFile(e.target.files?.[0] || null)} required />
            </Button>
            <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700 }}>
              Upload
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 700, width: '100%', p: 3, borderRadius: 4, boxShadow: 6, background: 'rgba(255,255,255,0.97)' }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} color="#2575fc" mb={2}>
            Notes
          </Typography>
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, tags, or user..."
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
            {filteredNotes.length === 0 && (
              <ListItem>
                <ListItemText primary="No notes found." />
              </ListItem>
            )}
            {filteredNotes.map(note => (
              <ListItem key={note.id} alignItems="flex-start" secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(note.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              }>
                <ListItemText
                  primary={<>
                    <Typography variant="subtitle1" fontWeight={700}>{note.title}</Typography>
                    <Stack direction="row" spacing={1} mt={1} mb={1}>
                      {note.tags.map(tag => <Chip key={tag} label={tag} color="success" size="small" />)}
                    </Stack>
                  </>}
                  secondary={<>
                    <Typography variant="body2" color="text.secondary">Uploaded by: {note.uploader}</Typography>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      href={note.fileUrl}
                      download={note.fileName}
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Download
                    </Button>
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

export default NotesPage; 