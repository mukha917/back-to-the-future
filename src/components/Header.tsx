import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Avatar } from '@mui/material';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import InsightsIcon from '@mui/icons-material/Insights';
import { Lightbulb } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)`
  background: #0a0a0a !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 2rem;
`;

const LogoText = styled(Box)`
  color: #0a66c2;
  font-weight: bold;
  font-size: 1.5rem;
`;

const SearchBar = styled(Box)`
  flex: 1;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const NavIcons = styled(Box)`
  display: flex;
  gap: 1rem;
  margin-left: 2rem;
`;

const StyledIconButton = styled(IconButton)`
  color: rgba(255, 255, 255, 0.7) !important;
  
  &:hover {
    color: #0a66c2 !important;
  }
`;

interface HeaderProps {
  onInsightClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onInsightClick }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Logo>
          <img 
            src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg" 
            alt="LinkedIn Logo" 
            height="32"
          />
          <LogoText>LinkedIn</LogoText>
        </Logo>

        <SearchBar>
          <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', mr: 1 }} />
          <SearchInput placeholder="Search" />
        </SearchBar>

        <NavIcons>
          <StyledIconButton>
            <SearchIcon />
          </StyledIconButton>
          <StyledIconButton>
            <NotificationsIcon />
          </StyledIconButton>
          <StyledIconButton>
            <MessageIcon />
          </StyledIconButton>
          <StyledIconButton onClick={onInsightClick}>
            <InsightsIcon />
          </StyledIconButton>
          <Avatar 
            sx={{ 
              bgcolor: '#0a66c2',
              width: 32,
              height: 32
            }}
          >
            JD
          </Avatar>
        </NavIcons>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 