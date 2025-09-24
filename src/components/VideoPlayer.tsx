import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
  User
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video_url: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  created_at: string;
  channel: {
    name: string;
    avatar?: string;
    subscribers: number;
  };
}

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
  user: any;
}

export function VideoPlayer({ video, onClose, user }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const formatViews = (views: number) => {
    if (views < 1000) return views.toString();
    if (views < 1000000) return `${(views / 1000).toFixed(1)}K`;
    return `${(views / 1000000).toFixed(1)}M`;
  };

  const formatSubscribers = (subs: number) => {
    if (subs < 1000) return subs.toString();
    if (subs < 1000000) return `${(subs / 1000).toFixed(1)}K`;
    return `${(subs / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-700 p-4">
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 text-sm font-medium"
          >
            ← Back to videos
          </button>
        </div>

        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Video Section */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <video
                  className="w-full h-full"
                  poster={video.thumbnail}
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={video.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Info */}
              <div className="mt-4">
                <h1 className="text-xl font-bold text-white mb-2">{video.title}</h1>
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center text-gray-400 text-sm space-x-4">
                    <span>{formatViews(video.views)} views</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(video.created_at), { addSuffix: true })}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        liked ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{formatViews(video.likes + (liked ? 1 : 0))}</span>
                    </button>
                    
                    <button
                      onClick={() => setDisliked(!disliked)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        disliked ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>{formatViews(video.dislikes + (disliked ? 1 : 0))}</span>
                    </button>

                    <button className="flex items-center space-x-2 bg-gray-800 text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
                      <Share className="h-4 w-4" />
                      <span>Share</span>
                    </button>

                    <button className="flex items-center space-x-2 bg-gray-800 text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* Channel Info */}
                <div className="flex items-center justify-between mt-6 p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {video.channel.avatar ? (
                      <img
                        src={video.channel.avatar}
                        alt={video.channel.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-300" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-white font-medium">{video.channel.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {formatSubscribers(video.channel.subscribers)} subscribers
                      </p>
                    </div>
                  </div>
                  
                  {user && (
                    <button
                      onClick={() => setSubscribed(!subscribed)}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        subscribed 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {subscribed ? 'Subscribed' : 'Subscribe'}
                    </button>
                  )}
                </div>

                {/* Description */}
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-300 whitespace-pre-wrap">{video.description}</p>
                </div>
              </div>
            </div>

            {/* Sidebar - Related Videos */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-medium mb-4">Recommended</h3>
              <div className="space-y-3">
                {/* Placeholder for related videos */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex space-x-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors">
                    <div className="w-40 h-24 bg-gray-700 rounded flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
                        Related video title {i + 1}
                      </h4>
                      <p className="text-gray-400 text-xs">Channel Name</p>
                      <p className="text-gray-400 text-xs">100K views • 2 days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}