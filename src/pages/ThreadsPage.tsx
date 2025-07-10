import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Button, TextField, IconButton, InputAdornment, List, ListItem, ListItemText, Collapse, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface Comment {
  id: string;
  user: string;
  content: string;
  replies: Comment[];
}

interface Thread {
  id: string;
  title: string;
  content: string;
  user: string;
  comments: Comment[];
  likes?: number;
  liked_by?: string[];
}

const ThreadsPage: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');
  const [commentContent, setCommentContent] = useState<{ [key: string]: string }>({});
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [likedThreads, setLikedThreads] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('likedThreads') || '[]');
    } catch {
      return [];
    }
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch threads from backend
    fetch(`${API_URL}/threads`)
      .then(res => res.json())
      .then(data => setThreads(data.map((t: any) => ({ ...t, id: t._id }))))
      .catch(() => setThreads([]));
  }, []);

  useEffect(() => {
    localStorage.setItem('threads', JSON.stringify(threads));
  }, [threads]);

  const handleAddThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    const user = JSON.parse(localStorage.getItem('profile') || '{}').username || 'anonymous';
    const thread = { title, content, user, comments: [] };
    const res = await fetch(`${API_URL}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(thread),
    });
    if (res.ok) {
      const newThread = await res.json();
      setThreads([{ ...newThread, id: newThread._id }, ...threads]);
      setTitle('');
      setContent('');
    }
  };

  const handleDeleteThread = async (id: string) => {
    const res = await fetch(`${API_URL}/threads/${id}`, { method: 'DELETE' });
    if (res.ok) setThreads(threads.filter(t => t.id !== id));
  };

  const handleAddComment = async (threadId: string) => {
    const user = JSON.parse(localStorage.getItem('profile') || '{}').username || 'anonymous';
    const content = commentContent[threadId];
    if (!content) return;
    const comment = { user, content, replies: [] };
    const res = await fetch(`${API_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });
    if (res.ok) {
      // Refetch threads to update UI
      fetch(`${API_URL}/threads`)
        .then(res => res.json())
        .then(data => setThreads(data.map((t: any) => ({ ...t, id: t._id }))));
      setCommentContent({ ...commentContent, [threadId]: '' });
    }
  };

  const handleDeleteComment = async (threadId: string, commentId: string) => {
    const res = await fetch(`${API_URL}/threads/${threadId}/comments/${commentId}`, { method: 'DELETE' });
    if (res.ok) {
      // Refetch threads to update UI
      fetch(`${API_URL}/threads`)
        .then(res => res.json())
        .then(data => setThreads(data.map((t: any) => ({ ...t, id: t._id }))));
    }
  };

  const handleAddReply = (threadId: string, commentId: string) => {
    const user = JSON.parse(localStorage.getItem('profile') || '{}').username || 'anonymous';
    const content = replyContent[commentId];
    if (!content) return;
    setThreads(threads.map(thread => {
      if (thread.id !== threadId) return thread;
      return {
        ...thread,
        comments: thread.comments.map(comment =>
          comment.id === commentId
            ? { ...comment, replies: [{ id: Date.now().toString(), user, content, replies: [] }, ...comment.replies] }
            : comment
        ),
      };
    }));
    setReplyContent({ ...replyContent, [commentId]: '' });
    setReplyingTo(null);
  };

  const getUsername = () => JSON.parse(localStorage.getItem('profile') || '{}').username || 'anonymous';

  const handleLikeThread = async (id: string, liked: boolean) => {
    const username = getUsername();
    const endpoint = liked ? 'unlike' : 'like';
    const res = await fetch(`${API_URL}/threads/${id}/${endpoint}?username=${encodeURIComponent(username)}` , {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const updated = await res.json();
      setThreads(threads.map(t => t.id === id ? { ...updated, id: updated._id } : t));
    }
  };

  const filteredThreads = threads.filter(thread =>
    thread.title.toLowerCase().includes(search.toLowerCase()) ||
    thread.content.toLowerCase().includes(search.toLowerCase()) ||
    thread.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', justifyContent: 'center', gap: 4 }}>
      <Card sx={{ maxWidth: 600, width: '100%', p: 3, borderRadius: 4, boxShadow: 6, background: 'rgba(255,255,255,0.97)' }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} color="#2575fc" mb={2}>
            Create Thread
          </Typography>
          <Box component="form" onSubmit={handleAddThread} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} required fullWidth />
            <TextField label="Content" value={content} onChange={e => setContent(e.target.value)} required fullWidth multiline minRows={2} />
            <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700 }}>
              Post Thread
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 700, width: '100%', p: 3, borderRadius: 4, boxShadow: 6, background: 'rgba(255,255,255,0.97)' }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} color="#2575fc" mb={2}>
            Threads
          </Typography>
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, content, or user..."
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
            {filteredThreads.length === 0 && (
              <ListItem>
                <ListItemText primary="No threads found." />
              </ListItem>
            )}
            {filteredThreads.map(thread => {
              const liked = !!thread.liked_by?.includes(getUsername());
              return (
                <ListItem key={thread.id} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2, borderBottom: '1px solid #eee' }}>
                  <ListItemText
                    primary={<>
                      <Typography variant="subtitle1" fontWeight={700}>{thread.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{thread.content}</Typography>
                      <Typography variant="caption" color="text.secondary">Posted by: {thread.user}</Typography>
                    </>}
                    secondary={null}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Button
                      size="small"
                      variant={liked ? 'contained' : 'outlined'}
                      color={liked ? 'primary' : 'primary'}
                      onClick={() => handleLikeThread(thread.id, liked)}
                      sx={{
                        transition: 'transform 0.15s',
                        transform: liked ? 'scale(1.15)' : 'scale(1)',
                        fontWeight: 700,
                        boxShadow: liked ? 3 : 0,
                      }}
                      startIcon={<ThumbUpIcon color={liked ? 'inherit' : 'action'} />}
                    >
                      {liked ? 'Liked' : 'Like'}
                    </Button>
                    <Typography variant="body2" fontWeight={600}>{thread.likes ?? 0} Likes</Typography>
                    <Button size="small" color="error" onClick={() => handleDeleteThread(thread.id)} sx={{ ml: 2 }}>
                      Delete Thread
                    </Button>
                  </Box>
                  <Box sx={{ width: '100%', mt: 1 }}>
                    <Typography variant="body2" fontWeight={600} mb={1}>Comments</Typography>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          size="small"
                          placeholder="Add a comment..."
                          value={commentContent[thread.id] || ''}
                          onChange={e => setCommentContent({ ...commentContent, [thread.id]: e.target.value })}
                          fullWidth
                        />
                        <Button size="small" variant="contained" onClick={() => handleAddComment(thread.id)}>
                          Comment
                        </Button>
                      </Box>
                      {thread.comments.map(comment => (
                        <Box key={comment.id} sx={{ background: '#f7f7f7', borderRadius: 2, p: 1, mb: 1 }}>
                          <Typography variant="body2" fontWeight={600}>{comment.user}</Typography>
                          <Typography variant="body2" mb={1}>{comment.content}</Typography>
                          <Button size="small" startIcon={<ReplyIcon />} onClick={() => setReplyingTo(comment.id)}>
                            Reply
                          </Button>
                          <Button size="small" color="error" onClick={() => handleDeleteComment(thread.id, comment.id)}>
                            Delete
                          </Button>
                          <Collapse in={replyingTo === comment.id}>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <TextField
                                size="small"
                                placeholder="Add a reply..."
                                value={replyContent[comment.id] || ''}
                                onChange={e => setReplyContent({ ...replyContent, [comment.id]: e.target.value })}
                                fullWidth
                              />
                              <Button size="small" variant="contained" onClick={() => handleAddReply(thread.id, comment.id)}>
                                Reply
                              </Button>
                            </Box>
                          </Collapse>
                          {comment.replies.length > 0 && (
                            <Box sx={{ pl: 2, mt: 1 }}>
                              <Typography variant="caption" fontWeight={600}>Replies:</Typography>
                              {comment.replies.map(reply => (
                                <Box key={reply.id} sx={{ background: '#e3f2fd', borderRadius: 2, p: 1, mt: 1 }}>
                                  <Typography variant="body2" fontWeight={600}>{reply.user}</Typography>
                                  <Typography variant="body2">{reply.content}</Typography>
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThreadsPage; 