import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LandingContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
`;

const Header = styled(Box)`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled(Typography)`
  color: #0a66c2;
  font-weight: bold;
  font-size: 1.5rem;
`;

const MainContent = styled(Container)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
`;

const HeroText = styled(Typography)`
  text-align: center;
  margin-bottom: 2rem;
  color: #0a66c2;
`;

const FeatureGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  width: 100%;
`;

const FeatureCard = styled(Paper)`
  padding: 2rem;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CTAButton = styled(Button)`
  margin-top: 2rem;
  background: #0a66c2;
  color: white;
  font-weight: bold;
  padding: 1rem 2rem;
  font-size: 1.1rem;

  &:hover {
    background: #004182;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Connect with Professionals",
      description: "Build your network with industry leaders and peers"
    },
    {
      title: "Find Your Next Opportunity",
      description: "Discover jobs that match your skills and interests"
    },
    {
      title: "Learn & Grow",
      description: "Access courses and insights to advance your career"
    }
  ];

  return (
    <LandingContainer>
      <Header>
        <Logo>
          <img 
            src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg" 
            alt="LinkedIn Logo" 
            height="32"
          />
          <LogoText>LinkedIn</LogoText>
        </Logo>
        <Button 
          variant="outlined" 
          sx={{ 
            color: '#0a66c2',
            borderColor: '#0a66c2',
            '&:hover': {
              borderColor: '#004182',
              backgroundColor: 'rgba(10, 102, 194, 0.1)'
            }
          }}
          onClick={() => navigate('/signin')}
        >
          Sign In
        </Button>
      </Header>

      <MainContent maxWidth="lg">
        <HeroText variant="h2">
          Welcome to Your Professional Community
        </HeroText>
        
        <Typography variant="h5" color="text.secondary" align="center" paragraph>
          Join millions of professionals who use LinkedIn to connect, learn, and grow.
        </Typography>

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} elevation={3}>
              <Typography variant="h6" gutterBottom sx={{ color: '#0a66c2' }}>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </FeatureCard>
          ))}
        </FeatureGrid>

        <CTAButton 
          variant="contained" 
          size="large"
          onClick={() => navigate('/email-password')}
        >
          Join Now
        </CTAButton>
      </MainContent>
    </LandingContainer>
  );
};

export default LandingPage; 