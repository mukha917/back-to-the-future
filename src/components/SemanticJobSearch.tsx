import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const SearchBox = styled(Box)`
  width: 100%;
  max-width: 600px;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  
  & .MuiOutlinedInput-root {
    color: white;
    
    & fieldset {
      border-color: rgba(255, 255, 255, 0.1);
    }
    
    &:hover fieldset {
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    &.Mui-focused fieldset {
      border-color: #0a66c2;
    }
  }
`;

const StyledButton = styled(Button)`
  background: #0a66c2 !important;
  color: white !important;
  padding: 0.8rem;
  font-weight: bold;
  
  &:hover {
    background: #004182 !important;
  }
`;

const SemanticJobSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Here you would typically handle the semantic search
    console.log('Searching for:', searchQuery);
  };

  return (
    <SearchContainer>
      <SearchBox>
        <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
          Semantic Job Search
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
          Describe the kind of job you're looking for in natural language. Our AI will help find the best matches.
        </Typography>
        <StyledTextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g., 'Looking for a remote software engineering role in climate tech'"
          variant="outlined"
          multiline
          rows={4}
        />
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <StyledButton
            variant="contained"
            onClick={() => navigate('/')}
          >
            Back
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
          >
            Search
          </StyledButton>
        </Box>
      </SearchBox>
    </SearchContainer>
  );
};

export default SemanticJobSearch; 