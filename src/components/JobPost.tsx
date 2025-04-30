import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const JobCard = styled(Box)`
  background: rgba(26, 26, 26, 0.8);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const CompanyLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  margin-right: 1rem;
`;

const JobHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const JobDetails = styled(Box)`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const DetailItem = styled(Box)`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  
  svg {
    margin-right: 0.5rem;
    font-size: 1.1rem;
  }
`;

const SkillChip = styled(Chip)`
  margin: 0.25rem;
  background: rgba(10, 102, 194, 0.1);
  color: #0a66c2;
  border: 1px solid rgba(10, 102, 194, 0.3);
  
  &:hover {
    background: rgba(10, 102, 194, 0.2);
  }
`;

interface JobPostProps {
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  logo: string;
  description: string;
  skills: string[];
}

const JobPost: React.FC<JobPostProps> = ({
  title,
  company,
  location,
  type,
  posted,
  logo,
  description,
  skills
}) => {
  return (
    <JobCard>
      <JobHeader>
        <CompanyLogo src={logo} alt={`${company} logo`} />
        <Box>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {company}
          </Typography>
        </Box>
      </JobHeader>
      
      <JobDetails>
        <DetailItem>
          <LocationOnIcon />
          {location}
        </DetailItem>
        <DetailItem>
          <WorkIcon />
          {type}
        </DetailItem>
        <DetailItem>
          <AccessTimeIcon />
          {posted}
        </DetailItem>
      </JobDetails>
      
      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem' }}>
        {description}
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {skills.map((skill, index) => (
          <SkillChip key={index} label={skill} />
        ))}
      </Box>
      
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#0a66c2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#004182',
            },
          }}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#0a66c2',
            color: '#0a66c2',
            '&:hover': {
              borderColor: '#004182',
              backgroundColor: 'rgba(10, 102, 194, 0.1)',
            },
          }}
        >
          Save
        </Button>
      </Box>
    </JobCard>
  );
};

export default JobPost; 