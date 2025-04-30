import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';
import styled from 'styled-components';
import Header from './components/Header';
import PostGrid from './components/PostGrid';
import Sidebar from './components/Sidebar';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff9d',
    },
    secondary: {
      main: '#ff00ff',
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <Header />
        <Container maxWidth="xl">
          <MainContent>
            <Sidebar />
            <PostGrid />
          </MainContent>
        </Container>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
