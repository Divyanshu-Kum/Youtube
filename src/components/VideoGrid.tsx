import React from 'react';
import { VideoCard } from './VideoCard';

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

interface VideoGridProps {
  videos: Video[];
  onVideoSelect: (video: any) => void;
}

export function VideoGrid({ videos, onVideoSelect }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No videos found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={onVideoSelect}
        />
      ))}
    </div>
  );
}