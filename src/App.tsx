import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VideoGrid } from './components/VideoGrid';
import { VideoPlayer } from './components/VideoPlayer';
import { AuthModal } from './components/AuthModal';
import { UploadModal } from './components/UploadModal';
import { useVideos } from './hooks/useVideos';

function App() {
  const [user, setUser] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);

  const { videos, loading, addVideo, searchVideos } = useVideos();

  // Initialize filtered videos when videos load
  useEffect(() => {
    if (videos.length > 0) {
      setFilteredVideos(videos);
    }
  }, [videos]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchVideos(query);
    setFilteredVideos(results);
  };

  const handleAuth = (userData: any) => {
    setUser(userData);
  };

  const handleVideoUpload = (videoData: any) => {
    addVideo(videoData);
  };

  const handleVideoSelect = (video: any) => {
    // Convert the video to have all required properties for the player
    const playerVideo = {
      ...video,
      video_url: video.video_url || 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      dislikes: video.dislikes || 50,
      channel: {
        ...video.channel,
        subscribers: video.channel.subscribers || Math.floor(Math.random() * 100000),
      },
    };
    setSelectedVideo(playerVideo);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white">Loading videos...</p>
        </div>
      </div>
    );
  }

  // Video player view
  if (selectedVideo) {
    return (
      <VideoPlayer
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        user={user}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        user={user}
        onSearch={handleSearch}
        onShowAuth={() => setShowAuthModal(true)}
        onShowUpload={() => setShowUploadModal(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-white text-lg">
              Search results for "{searchQuery}" ({filteredVideos.length} videos)
            </h2>
          </div>
        )}

        <VideoGrid
          videos={filteredVideos}
          onVideoSelect={handleVideoSelect}
        />
      </main>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
        />
      )}

      {showUploadModal && user && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleVideoUpload}
        />
      )}
    </div>
  );
}

export default App;