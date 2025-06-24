// src/App.jsx
import React, { useState } from 'react';
import LinkdinPost from './pages/LinkdinPost';
import InstagramPost from './pages/InstagramPost';

export default function App() {
  const [activeTab, setActiveTab] = useState('linkedin');
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center gap-4 py-6">
        <button
          className={`px-4 py-2 rounded-full font-bold ${activeTab === 'linkedin' ? 'bg-gradient-to-l from-[#00B4DB] to-[#0083B0] text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('linkedin')}
        >
          LinkedIn Post
        </button>
        <button
          className={`px-4 py-2 rounded-full font-bold ${activeTab === 'instagram' ? 'bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('instagram')}
        >
          Instagram Post
        </button>
      </div>
      {activeTab === 'linkedin' ? <LinkdinPost /> : <InstagramPost />}
    </div>
  );
}