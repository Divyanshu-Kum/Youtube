import React, { useState } from 'react';
import { X, Upload, Video, Image, FileText } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (videoData: any) => void;
}

export function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    category: 'entertainment',
    privacy: 'public',
  });
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    'entertainment',
    'education',
    'gaming',
    'music',
    'sports',
    'technology',
    'comedy',
    'lifestyle',
    'news',
    'other'
  ];

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
      setStep(2);
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedThumbnail(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          thumbnail: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVideo) return;

    setLoading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const videoData = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        thumbnail: formData.thumbnail || 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800',
        video_url: URL.createObjectURL(selectedVideo),
        duration: '5:23',
        views: 0,
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        channel: {
          name: 'Your Channel',
          avatar: null,
          subscribers: 1000,
        },
      };
      
      onUpload(videoData);
      setLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Upload Video</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="text-center py-12">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Upload your video</h3>
                <p className="text-gray-400">Select a video file to get started</p>
              </div>
              
              <label className="inline-block">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoSelect}
                  className="hidden"
                />
                <div className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium cursor-pointer transition-colors inline-flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Choose Video File</span>
                </div>
              </label>
              
              <p className="text-gray-500 text-sm mt-4">
                Supported formats: MP4, AVI, MOV, WMV (Max 100MB)
              </p>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Video Info */}
              {selectedVideo && (
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Video className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="text-white font-medium">{selectedVideo.name}</p>
                      <p className="text-gray-400 text-sm">
                        {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-white font-medium mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  placeholder="Enter video title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  placeholder="Tell viewers about your video"
                />
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-white font-medium mb-2">Thumbnail</label>
                <div className="flex items-center space-x-4">
                  <label className="inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailSelect}
                      className="hidden"
                    />
                    <div className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 px-4 py-2 rounded-lg cursor-pointer transition-colors inline-flex items-center space-x-2">
                      <Image className="h-4 w-4" />
                      <span>Upload Thumbnail</span>
                    </div>
                  </label>
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      className="w-16 h-12 object-cover rounded"
                    />
                  )}
                </div>
              </div>

              {/* Category & Privacy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-gray-800">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Privacy</label>
                  <select
                    name="privacy"
                    value={formData.privacy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  >
                    <option value="public" className="bg-gray-800">Public</option>
                    <option value="unlisted" className="bg-gray-800">Unlisted</option>
                    <option value="private" className="bg-gray-800">Private</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.title}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white rounded-lg font-medium transition-colors"
                >
                  {loading ? 'Uploading...' : 'Publish'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}