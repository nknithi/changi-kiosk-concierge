import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Grid } from '@mui/material';
import theme from './theme';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import VideoEscalation from './components/VideoEscalation';

function App() {
  const [quickQuery, setQuickQuery] = useState('');
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleQuickAction = (query) => {
    setQuickQuery(query);
    // Clear it immediately after passing it down so it can be re-triggered
    setTimeout(() => setQuickQuery(''), 100);
  };

  const handleEscalate = () => {
    setIsVideoOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Background styling for the whole app */}
      <Box 
        sx={{ 
          minHeight: '100vh', 
          bgcolor: 'background.default',
          backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(111, 44, 92, 0.15), transparent 25%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.1), transparent 25%)',
          p: { xs: 0, md: 3 }
        }}
      >
        {/* Main Kiosk Container */}
        <Box 
          sx={{
            height: { xs: 'auto', md: 'calc(100vh - 48px)' },
            minHeight: { xs: '100vh', md: 'auto' },
            maxWidth: 1600,
            mx: 'auto',
            bgcolor: 'rgba(255, 255, 255, 0.02)',
            borderRadius: { xs: 0, md: 4 },
            border: { xs: 'none', md: '1px solid rgba(255, 255, 255, 0.05)' },
            overflow: { xs: 'visible', md: 'hidden' },
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
            
            {/* Left Panel: Dashboard */}
            <Box sx={{ width: { xs: '100%', md: '40%', lg: '33.33%' }, height: { xs: 'auto', md: '100%' }, borderRight: '1px solid rgba(255,255,255,0.05)' }}>
              <Dashboard onQuickAction={handleQuickAction} />
            </Box>

            {/* Right Panel: Chat Interface */}
            <Box sx={{ width: { xs: '100%', md: '60%', lg: '66.66%' }, height: { xs: '600px', md: '100%' }, bgcolor: 'rgba(0,0,0,0.2)' }}>
              <ChatInterface quickQuery={quickQuery} onEscalate={handleEscalate} />
            </Box>

          </Box>
        </Box>
      </Box>

      {/* Voncierge Escalation Modal */}
      <VideoEscalation open={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

    </ThemeProvider>
  );
}

export default App;
