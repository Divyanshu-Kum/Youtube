import React, { useState } from 'react';
import { Search, Upload, Menu, User, Bell, Video } from 'lucide-react';

interface HeaderProps {
  user: any;
  onSearch: (query: string) => void;
  onShowAuth: () => void;
  onShowUpload: () => void;
}

export function Header({ user, onSearch, onShowAuth, onShowUpload }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button className="p-2 rounded-lg hover:bg-gray-800 mr-2 md:hidden">
              <Menu className="h-5 w-5 text-white" />
            </button>
            <div className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-red-500" />
              <h1 className="text-xl font-bold text-white">VideoHub</h1>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-gray-700 hover:bg-gray-600 rounded-r-full border border-l-0 border-gray-600 transition-colors"
              >
                <Search className="h-5 w-5 text-gray-300" />
              </button>
            </form>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden flex-1 max-w-xs mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-1.5 bg-gray-800 border border-gray-600 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
              <Search className="absolute right-3 top-2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <button
                  onClick={onShowUpload}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  title="Upload video"
                >
                  <Upload className="h-5 w-5 text-white" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Bell className="h-5 w-5 text-white" />
                </button>
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </>
            ) : (
              <button
                onClick={onShowAuth}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}