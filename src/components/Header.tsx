import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box } from '@mui/material';
import { Search, Notifications, Message, Person } from '@mui/icons-material';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  background: rgba(26, 26, 26, 0.8) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SearchBar = styled.div`
  position: relative;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-right: 2rem;
  margin-left: 2rem;
  width: 100%;
  max-width: 500px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const SearchIconWrapper = styled.div`
  padding: 0 16px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInputBase = styled(InputBase)`
  color: inherit;
  width: 100%;
  
  .MuiInputBase-input {
    padding: 8px 8px 8px 0;
    padding-left: 48px;
    width: 100%;
  }
`;

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ 
            flexGrow: 0,
            display: { xs: 'none', sm: 'block' },
            background: 'linear-gradient(45deg, #00ff9d, #00b8ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          FUTURE SOCIAL
        </Typography>
        
        <SearchBar>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchBar>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <Message />
          </IconButton>
          <IconButton color="inherit">
            <Person />
          </IconButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 