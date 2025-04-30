import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaShare, FaLinkedin, FaReddit, FaTwitter } from 'react-icons/fa';

interface PostProps {
  post: {
    id: number;
    author: string;
    role?: string;
    content: string;
    likes: number;
    comments: number;
    shares: number;
    platform: 'linkedin' | 'reddit' | 'twitter';
    timestamp: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getPlatformIcon = () => {
    switch (post.platform) {
      case 'linkedin':
        return <FaLinkedin className="text-primary" />;
      case 'reddit':
        return <FaReddit className="text-secondary" />;
      case 'twitter':
        return <FaTwitter className="text-accent" />;
      default:
        return null;
    }
  };

  const getPlatformColor = () => {
    switch (post.platform) {
      case 'linkedin':
        return 'border-primary';
      case 'reddit':
        return 'border-secondary';
      case 'twitter':
        return 'border-accent';
      default:
        return 'border-gray-200';
    }
  };

  const getPlatformHoverColor = () => {
    switch (post.platform) {
      case 'linkedin':
        return 'hover:text-primary';
      case 'reddit':
        return 'hover:text-secondary';
      case 'twitter':
        return 'hover:text-accent';
      default:
        return 'hover:text-gray-600';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${getPlatformColor()} transition-all duration-200 hover:shadow-lg`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            {getPlatformIcon()}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{post.author}</h3>
              {post.role && <p className="text-sm text-gray-500">{post.role}</p>}
            </div>
            <span className="text-sm text-gray-500">{post.timestamp}</span>
          </div>
          <p className="mt-2 text-gray-700">{post.content}</p>
          <div className="mt-4 flex items-center space-x-6">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-1 ${isLiked ? 'text-primary' : 'text-gray-500'} ${getPlatformHoverColor()} transition-colors duration-200`}
              aria-label="Like post"
            >
              <FaThumbsUp />
              <span>{likeCount}</span>
            </button>
            <button 
              className={`flex items-center space-x-1 text-gray-500 ${getPlatformHoverColor()} transition-colors duration-200`}
              aria-label="Comment on post"
            >
              <FaComment />
              <span>{post.comments}</span>
            </button>
            <button 
              className={`flex items-center space-x-1 text-gray-500 ${getPlatformHoverColor()} transition-colors duration-200`}
              aria-label="Share post"
            >
              <FaShare />
              <span>{post.shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post; 