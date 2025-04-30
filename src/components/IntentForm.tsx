import React, { useState } from 'react';
import { Box, Typography, Button, Container, Paper, TextField, FormControlLabel, Checkbox } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const IntentFormContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const IntentFormPaper = styled(Paper)`
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
`;

const Logo = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
  width: 100%;
  
  & .MuiOutlinedInput-root {
    color: white;
    
    & fieldset {
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    &:hover fieldset {
      border-color: #0a66c2;
    }
    
    &.Mui-focused fieldset {
      border-color: #0a66c2;
    }
  }
  
  & .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.7);
    
    &.Mui-focused {
      color: #0a66c2;
    }
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  background: #0a66c2 !important;
  color: white !important;
  padding: 0.8rem;
  font-weight: bold;
  
  &:hover {
    background: #004182 !important;
  }
`;

interface IntentFormProps {
  onAuthenticate: () => void;
}

const IntentForm: React.FC<IntentFormProps> = ({ onAuthenticate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    intent: '',
    interests: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the intent form submission
    console.log('Intent form data:', formData);
    // Set authentication state and navigate to the feed
    onAuthenticate();
    navigate('/');
  };

  const interests = [
    'Technology',
    'Business',
    'Marketing',
    'Design',
    'Engineering',
    'Finance',
    'Healthcare',
    'Education'
  ];

  return (
    <IntentFormContainer>
      <IntentFormPaper elevation={3}>
        <Logo>
          <img 
            src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg" 
            alt="LinkedIn Logo" 
            height="32"
          />
          <Typography variant="h5" sx={{ color: '#0a66c2', fontWeight: 'bold' }}>
            LinkedIn
          </Typography>
        </Logo>
        
        <Typography variant="h5" align="center" gutterBottom sx={{ color: 'white', mb: 3 }}>
          Tell us about your professional goals
        </Typography>

        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="What brings you to LinkedIn?"
            name="intent"
            value={formData.intent}
            onChange={handleChange}
            required
            variant="outlined"
            multiline
            rows={4}
          />
          
          <Typography variant="h6" sx={{ color: 'white', mt: 3, mb: 2 }}>
            Select your interests
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
            {interests.map((interest) => (
              <FormControlLabel
                key={interest}
                control={
                  <Checkbox
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleCheckboxChange(interest)}
                    sx={{
                      color: '#0a66c2',
                      '&.Mui-checked': {
                        color: '#0a66c2',
                      },
                    }}
                  />
                }
                label={interest}
                sx={{ color: 'white' }}
              />
            ))}
          </Box>

          <StyledButton
            type="submit"
            variant="contained"
          >
            Continue
          </StyledButton>
        </form>
      </IntentFormPaper>
    </IntentFormContainer>
  );
};

export default IntentForm; 