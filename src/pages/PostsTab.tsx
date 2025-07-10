import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField, InputAdornment, Paper, Fade } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function NotesList() {
  return <Box p={2}>Notes (document upload, download, tags will go here)</Box>;
}
function JobsList() {
  return <Box p={2}>Jobs (job links, referrals will go here)</Box>;
}
function ThreadsList() {
  return <Box p={2}>Threads (comments, replies will go here)</Box>;
}

const PostsTab: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');

  return (
    <Box sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 3, m: 2, p: 2 }}>
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
      <Paper sx={{ borderRadius: 3, boxShadow: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ background: 'rgba(67,233,123,0.08)' }}
        >
          <Tab label="Notes" sx={{ fontWeight: 600 }} />
          <Tab label="Jobs" sx={{ fontWeight: 600 }} />
          <Tab label="Threads" sx={{ fontWeight: 600 }} />
        </Tabs>
        <Fade in={tab === 0} mountOnEnter unmountOnExit>
          <div><NotesList /></div>
        </Fade>
        <Fade in={tab === 1} mountOnEnter unmountOnExit>
          <div><JobsList /></div>
        </Fade>
        <Fade in={tab === 2} mountOnEnter unmountOnExit>
          <div><ThreadsList /></div>
        </Fade>
      </Paper>
    </Box>
  );
};

export default PostsTab; 