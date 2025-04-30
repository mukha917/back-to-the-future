import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const EmailPasswordContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const EmailPasswordPaper = styled(Paper)`
  padding: 2rem;
  width: 100%;
  max-width: 400px;
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

const EmailPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the authentication logic
    console.log('Email/Password data:', formData);
    // Navigate to the intent form
    navigate('/intent');
  };

  return (
    <EmailPasswordContainer>
      <EmailPasswordPaper elevation={3}>
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
          Enter Your Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            variant="outlined"
          />
          
          <StyledTextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            variant="outlined"
          />

          <StyledButton
            type="submit"
            variant="contained"
          >
            Continue
          </StyledButton>
        </form>
      </EmailPasswordPaper>
    </EmailPasswordContainer>
  );
};

export default EmailPassword; 