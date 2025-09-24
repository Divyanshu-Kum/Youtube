import { useState, useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video_url?: string;
  duration: string;
  views: number;
  likes: number;
  dislikes?: number;
  created_at: string;
  channel: {
    name: string;
    avatar?: string;
    subscribers?: number;
  };
}

const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Building a Modern Web Application with React and TypeScript',
    description: 'Learn how to build a complete web application using React, TypeScript, and modern development practices. In this comprehensive tutorial, we cover component architecture, state management, and best practices.',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '15:30',
    views: 125000,
    likes: 8500,
    dislikes: 150,
    created_at: '2024-01-15T10:00:00Z',
    channel: {
      name: 'TechCoding Pro',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 45000,
    },
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts Every Developer Should Know',
    description: 'Dive deep into advanced JavaScript concepts including closures, prototypes, async/await, and more. Perfect for developers looking to level up their skills.',
    thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '22:45',
    views: 89000,
    likes: 6200,
    dislikes: 89,
    created_at: '2024-01-10T14:30:00Z',
    channel: {
      name: 'JavaScript Mastery',
      avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 78000,
    },
  },
  {
    id: '3',
    title: 'Creating Beautiful User Interfaces with Tailwind CSS',
    description: 'Master the art of creating stunning, responsive user interfaces using Tailwind CSS. From basic concepts to advanced techniques and component design.',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '18:12',
    views: 156000,
    likes: 12000,
    dislikes: 203,
    created_at: '2024-01-08T09:15:00Z',
    channel: {
      name: 'Design Code',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 92000,
    },
  },
  {
    id: '4',
    title: 'Full Stack Development: Node.js and Express.js Tutorial',
    description: 'Build a complete backend application using Node.js and Express.js. Learn about routing, middleware, database integration, and deployment strategies.',
    thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '28:33',
    views: 203000,
    likes: 15500,
    dislikes: 290,
    created_at: '2024-01-05T16:20:00Z',
    channel: {
      name: 'Backend Dev Hub',
      avatar: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 123000,
    },
  },
  {
    id: '5',
    title: 'Database Design Principles and Best Practices',
    description: 'Learn fundamental database design principles, normalization, indexing strategies, and performance optimization techniques for modern applications.',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
    video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '25:47',
    views: 167000,
    likes: 11200,
    dislikes: 156,
    created_at: '2024-01-03T11:45:00Z',
    channel: {
      name: 'Data Science Pro',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 89000,
    },
  },
  {
    id: '6',
    title: 'Mobile App Development with React Native',
    description: 'Create cross-platform mobile applications using React Native. Cover navigation, state management, native modules, and app store deployment.',
    thumbnail: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800',
    video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '32:18',
    views: 134000,
    likes: 9800,
    dislikes: 127,
    created_at: '2024-01-01T13:30:00Z',
    channel: {
      name: 'Mobile Dev Academy',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: 67000,
    },
  },
];

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVideos(MOCK_VIDEOS);
      setLoading(false);
    }, 1000);
  }, []);

  const addVideo = (newVideo: Video) => {
    setVideos(prev => [newVideo, ...prev]);
  };

  const searchVideos = (query: string) => {
    if (!query.trim()) {
      return MOCK_VIDEOS;
    }
    
    return MOCK_VIDEOS.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase()) ||
      video.channel.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    videos,
    loading,
    addVideo,
    searchVideos,
  };
}