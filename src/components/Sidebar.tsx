import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
import { Home, TrendingUp, Group, Work, Bookmark, Settings } from '@mui/icons-material';
import styled from 'styled-components';

const SidebarContainer = styled(Box)`
  width: 280px;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  height: fit-content;
`;

const UserProfile = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const StyledListItem = styled(ListItemButton)`
  border-radius: 12px;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.Mui-selected {
    background: linear-gradient(45deg, rgba(0, 255, 157, 0.2), rgba(0, 184, 255, 0.2));
  }
`;

const menuItems = [
  { text: 'Home', icon: <Home /> },
  { text: 'Trending', icon: <TrendingUp /> },
  { text: 'Network', icon: <Group /> },
  { text: 'Jobs', icon: <Work /> },
  { text: 'Bookmarks', icon: <Bookmark /> },
  { text: 'Settings', icon: <Settings /> },
];

const Sidebar = () => {
  return (
    <SidebarContainer>
      <UserProfile>
        <Avatar 
          sx={{ 
            width: 56, 
            height: 56,
            border: '2px solid #00ff9d'
          }}
          src="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            John Doe
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @johndoe
          </Typography>
        </Box>
      </UserProfile>

      <List>
        {menuItems.map((item) => (
          <StyledListItem
            key={item.text}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar; 