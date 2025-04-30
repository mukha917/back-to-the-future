import React from 'react';
import { FaLinkedin, FaReddit, FaTwitter } from 'react-icons/fa';
import Post from './components/Post';

const App: React.FC = () => {
  const posts = [
    {
      id: 1,
      author: 'John Doe',
      role: 'Software Engineer at Tech Corp',
      content: 'Just completed a major project using React and TypeScript! The team did an amazing job. #coding #webdev',
      likes: 245,
      comments: 32,
      shares: 12,
      platform: 'linkedin',
      timestamp: '2h ago'
    },
    {
      id: 2,
      author: 'TechEnthusiast',
      content: 'What do you think about the new AI developments? I believe we\'re entering a new era of technology.',
      likes: 1567,
      comments: 234,
      shares: 45,
      platform: 'reddit',
      timestamp: '4h ago'
    },
    {
      id: 3,
      author: 'Sarah Smith',
      content: 'Excited to announce our new product launch! Check it out at example.com #innovation #startup',
      likes: 789,
      comments: 56,
      shares: 89,
      platform: 'twitter',
      timestamp: '1h ago'
    },
    {
      id: 4,
      author: 'Alex Johnson',
      role: 'Product Manager',
      content: 'Looking for experienced React developers to join our team. Remote work available! DM for details.',
      likes: 432,
      comments: 78,
      shares: 23,
      platform: 'linkedin',
      timestamp: '5h ago'
    },
    {
      id: 5,
      author: 'TechNews',
      content: 'Breaking: Major tech company announces revolutionary new product. Details inside!',
      likes: 2345,
      comments: 456,
      shares: 789,
      platform: 'reddit',
      timestamp: '3h ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaLinkedin className="text-primary text-2xl" />
              <FaReddit className="text-secondary text-2xl" />
              <FaTwitter className="text-accent text-2xl" />
              <h1 className="text-2xl font-bold text-gray-800">Social Blend</h1>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90">
                Create Post
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="hidden md:block">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Trending Topics</h2>
              <ul className="space-y-2">
                <li className="text-primary hover:underline cursor-pointer">#WebDevelopment</li>
                <li className="text-secondary hover:underline cursor-pointer">#TechNews</li>
                <li className="text-accent hover:underline cursor-pointer">#Innovation</li>
              </ul>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              {posts.map(post => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App; 