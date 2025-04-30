import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PostGrid from './components/PostGrid';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import EmailPassword from './components/EmailPassword';
import IntentForm from './components/IntentForm';
import IntentModal from './components/IntentModal';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0a66c2',
    },
    secondary: {
      main: '#004182',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const AppContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const MainContent = styled(Box)`
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
`;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAuthenticate = () => setIsAuthenticated(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/email-password" element={<EmailPassword />} />
              <Route path="/intent" element={<IntentForm onAuthenticate={handleAuthenticate} />} />
            </>
          ) : (
            <Route path="/" element={
              <AppContainer>
                <Header onInsightClick={handleOpenModal} />
                <MainContent>
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<PostGrid />} />
                  </Routes>
                </MainContent>
                <IntentModal 
                  open={isModalOpen} 
                  onClose={handleCloseModal} 
                  onAuthenticate={handleAuthenticate}
                />
              </AppContainer>
            } />
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
