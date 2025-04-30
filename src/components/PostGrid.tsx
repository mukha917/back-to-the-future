import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import JobPost from './JobPost';

const GridContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled(Typography)`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-left: 1rem;
`;

const jobPosts = [
  {
    title: "Senior Software Engineer - Full Stack",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    posted: "2 days ago",
    logo: "https://via.placeholder.com/48",
    description: "Join our team to build scalable web applications using React, Node.js, and AWS. We're looking for experienced engineers who can lead projects and mentor junior developers.",
    skills: ["React", "Node.js", "AWS", "TypeScript", "GraphQL"]
  },
  {
    title: "Software Engineer - Frontend",
    company: "InnovateX",
    location: "New York, NY",
    type: "Full-time",
    posted: "1 week ago",
    logo: "https://via.placeholder.com/48",
    description: "Work on cutting-edge frontend applications using React and Next.js. Collaborate with designers and backend engineers to create seamless user experiences.",
    skills: ["React", "Next.js", "TypeScript", "CSS", "Jest"]
  },
  {
    title: "Backend Developer",
    company: "DataFlow Systems",
    location: "Austin, TX (Hybrid)",
    type: "Full-time",
    posted: "3 days ago",
    logo: "https://via.placeholder.com/48",
    description: "Design and implement scalable backend services using Python and Django. Experience with microservices architecture and cloud platforms preferred.",
    skills: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes"]
  },
  {
    title: "Full Stack Developer",
    company: "WebTech Solutions",
    location: "Seattle, WA",
    type: "Full-time",
    posted: "5 days ago",
    logo: "https://via.placeholder.com/48",
    description: "Join our team to develop modern web applications using the MERN stack. Strong problem-solving skills and experience with agile development required.",
    skills: ["MongoDB", "Express", "React", "Node.js", "Redux"]
  },
  {
    title: "Software Engineer - Cloud",
    company: "CloudScale",
    location: "Remote",
    type: "Full-time",
    posted: "1 day ago",
    logo: "https://via.placeholder.com/48",
    description: "Build and maintain cloud infrastructure using AWS and Terraform. Experience with CI/CD pipelines and infrastructure as code required.",
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "Jenkins"]
  }
];

const PostGrid: React.FC = () => {
  return (
    <GridContainer>
      <SectionTitle>Recommended Jobs</SectionTitle>
      {jobPosts.map((job, index) => (
        <JobPost
          key={index}
          title={job.title}
          company={job.company}
          location={job.location}
          type={job.type}
          posted={job.posted}
          logo={job.logo}
          description={job.description}
          skills={job.skills}
        />
      ))}
    </GridContainer>
  );
};

export default PostGrid; 