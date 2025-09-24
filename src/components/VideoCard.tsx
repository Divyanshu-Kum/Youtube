import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Play, Eye, ThumbsUp, User } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  created_at: string;
  channel: {
    name: string;
    avatar?: string;
  };
}

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const formatViews = (views: number) => {
    if (views < 1000) return views.toString();
    if (views < 1000000) return `${(views / 1000).toFixed(1)}K`;
    return `${(views / 1000000).toFixed(1)}M`;
  };

  return (
    <div 
      className="group cursor-pointer bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02]"
      onClick={() => onClick(video)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-800 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            {video.channel.avatar ? (
              <img
                src={video.channel.avatar}
                alt={video.channel.name}
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-300" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-red-400 transition-colors">
              {video.title}
            </h3>
            <p className="text-gray-400 text-sm mt-1">{video.channel.name}</p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{formatViews(video.views)} views</span>
              </div>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(video.created_at), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-1">
              <ThumbsUp className="h-3 w-3" />
              <span>{formatViews(video.likes)} likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}