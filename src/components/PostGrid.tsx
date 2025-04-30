import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Avatar, IconButton, Chip, Button } from '@mui/material';
import { Favorite, Comment, Share } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GridContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled(motion(Card))`
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(10, 102, 194, 0.1);
  }
`;

const PostHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PostContent = styled(CardContent)`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PostActions = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const StyledChip = styled(Chip)`
  background: rgba(10, 102, 194, 0.2);
  color: #0a66c2;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const VideoContainer = styled.video`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #000;
`;

const ReadMoreButton = styled(Button)`
  color: #0a66c2;
  padding: 0;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  text-transform: none;
  &:hover {
    background: transparent;
    color: #004182;
  }
`;

const TagsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled(IconButton)`
  color: rgba(255, 255, 255, 0.7);
  &:hover {
    color: #0a66c2;
  }
`;

const posts = [
  {
    id: 1,
    author: {
      name: 'Tomer Cohen',
      avatar: 'https://media.licdn.com/dms/image/C4E03AQFQqQJQJqQJQJQ/profile-displayphoto-shrink_800_800/0/1516234000000?e=2147483647&v=beta&t=QJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQ',
      title: 'Chief Product Officer at LinkedIn'
    },
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    title: 'The Future of Professional Networking',
    content: 'As LinkedIn\'s Chief Product Officer, I\'m excited to share our vision for the future of professional networking. We\'re focusing on creating more meaningful connections, enabling career growth, and building tools that help professionals succeed in an ever-changing world. Join me as we explore how AI and machine learning are transforming the way we connect and grow professionally.',
    tags: ['Product', 'Leadership', 'LinkedIn', 'Innovation', 'AI'],
    likes: 2156,
    comments: 342
  },
  {
    id: 2,
    author: {
      name: 'Mohak Shroff',
      avatar: 'https://media.licdn.com/dms/image/C4E03AQFQqQJQJqQJQJQ/profile-displayphoto-shrink_800_800/0/1516234000000?e=2147483647&v=beta&t=QJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQ',
      title: 'Engineering Leader at LinkedIn'
    },
    media: {
      type: 'video',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    title: 'Engineering the Future: Building at Scale',
    content: 'In this exclusive talk, Mohak Shroff shares insights into building scalable engineering systems that power LinkedIn\'s global platform. Discover how we\'re leveraging cutting-edge technologies, from AI to distributed systems, to create the future of professional networking. Learn about our approach to engineering excellence, innovation, and the challenges of maintaining reliability at massive scale.',
    tags: ['Engineering', 'Leadership', 'Scalability', 'LinkedIn', 'Innovation', 'Future Tech'],
    likes: 1245,
    comments: 289
  },
  {
    id: 3,
    author: {
      name: 'Erran Berger',
      avatar: 'https://media.licdn.com/dms/image/C4E03AQFQqQJQJqQJQJQ/profile-displayphoto-shrink_800_800/0/1516234000000?e=2147483647&v=beta&t=QJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQ',
      title: 'VP of Engineering at LinkedIn'
    },
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    title: 'Building Scalable Engineering Teams',
    content: 'As VP of Engineering at LinkedIn, I\'m sharing insights on building and scaling high-performing engineering teams. Learn about our approach to technical leadership, innovation, and creating an environment where engineers can thrive and deliver their best work. Discover how we maintain engineering excellence while scaling our platform to serve millions of professionals worldwide.',
    tags: ['Engineering', 'Leadership', 'Scalability', 'LinkedIn', 'Innovation'],
    likes: 1892,
    comments: 256
  },
  {
    id: 4,
    author: {
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      title: 'Data Scientist'
    },
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    title: 'Machine Learning in Healthcare',
    content: 'Revolutionizing patient care through advanced machine learning algorithms.',
    tags: ['ML', 'Healthcare', 'Data Science'],
    likes: 278,
    comments: 38
  },
  {
    id: 5,
    author: {
      name: 'Lisa Park',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      title: 'AR/VR Developer'
    },
    media: {
      type: 'image',
      url: 'https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    title: 'The Metaverse Revolution',
    content: 'How augmented and virtual reality are transforming social interactions and business.',
    tags: ['AR/VR', 'Metaverse', 'Innovation'],
    likes: 421,
    comments: 67
  }
];

const PostGrid = () => {
  const [expandedPosts, setExpandedPosts] = useState<{ [key: number]: boolean }>({});

  const toggleExpand = (postId: number) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <GridContainer>
      {posts.map((post) => (
        <StyledCard
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {post.media.type === 'video' ? (
            <VideoContainer
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              style={{ width: '100%', height: '200px' }}
              onLoadStart={(e) => {
                const video = e.target as HTMLVideoElement;
                video.play().catch(error => {
                  console.log('Autoplay failed:', error);
                });
              }}
              onEnded={(e) => {
                const video = e.target as HTMLVideoElement;
                video.currentTime = 0;
                video.play();
              }}
              onError={(e) => {
                console.log('Video error:', e);
                const video = e.target as HTMLVideoElement;
                video.load();
              }}
            >
              <source src={post.media.url} type="video/mp4" />
              Your browser does not support the video tag.
            </VideoContainer>
          ) : (
            <CardMedia
              component="img"
              height="200"
              image={post.media.url}
              alt={post.title}
              sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244aa32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
              }}
            />
          )}
          <PostContent>
            <PostHeader>
              <Avatar src={post.author.avatar} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {post.author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.author.title}
                </Typography>
              </Box>
            </PostHeader>

            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {expandedPosts[post.id] ? post.content : truncateText(post.content, 150)}
            </Typography>
            {post.content.length > 150 && (
              <ReadMoreButton
                onClick={() => toggleExpand(post.id)}
              >
                {expandedPosts[post.id] ? 'Show Less' : 'Read More'}
              </ReadMoreButton>
            )}
            
            <TagsContainer>
              {post.tags.map((tag) => (
                <StyledChip
                  key={tag}
                  label={tag}
                  size="small"
                />
              ))}
            </TagsContainer>

            <PostActions>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <ActionButton size="small">
                  <Favorite fontSize="small" />
                </ActionButton>
                <Typography variant="body2" color="text.secondary">
                  {post.likes}
                </Typography>
                <ActionButton size="small">
                  <Comment fontSize="small" />
                </ActionButton>
                <Typography variant="body2" color="text.secondary">
                  {post.comments}
                </Typography>
              </Box>
              <ActionButton size="small">
                <Share fontSize="small" />
              </ActionButton>
            </PostActions>
          </PostContent>
        </StyledCard>
      ))}
    </GridContainer>
  );
};

export default PostGrid; 