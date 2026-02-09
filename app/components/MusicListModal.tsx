'use client';

import { useState } from 'react';

interface MusicListModalProps {
  onClose: () => void;
}

// Sample music data
const sampleMusic = [
  { id: '1', title: 'The Reasons', artist: 'Hoobastank', album: 'The Reasons', duration: '3:52' }
];

export default function MusicListModal({ onClose }: MusicListModalProps) {
  const [selectedMusic, setSelectedMusic] = useState(sampleMusic[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMusic = sampleMusic.filter(music => 
    music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    music.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMusic = (music: typeof sampleMusic[0]) => {
    setSelectedMusic(music);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search music..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
        />
      </div>

      <div className="max-h-96 overflow-y-auto">
        <div className="space-y-2">
          {filteredMusic.map((music) => (
            <div 
              key={music.id}
              className={`p-3 rounded-lg cursor-pointer flex items-center ${
                selectedMusic.id === music.id 
                  ? 'bg-yellow-100 border border-yellow-400' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleSelectMusic(music)}
            >
              <div className="mr-3">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{music.title}</div>
                <div className="text-sm text-gray-600">{music.artist}</div>
                <div className="text-xs text-gray-500">{music.album} • {music.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 cursor-pointer"
        >
          Select Music
        </button>
      </div>
    </div>
  );
}