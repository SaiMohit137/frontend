import React from 'react';
import { Box } from '@mui/material';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#fff',
      p: { xs: 1, sm: 2, md: 4 },
    }}
  >
    {children}
  </Box>
);

export default MainLayout; 