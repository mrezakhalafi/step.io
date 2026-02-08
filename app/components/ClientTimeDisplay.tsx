'use client';

import { useState, useEffect } from 'react';

export default function ClientTimeDisplay() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Update time immediately and then every minute
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    updateTime(); // Set initial time
    
    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mb-2 text-5xl font-bold text-gray-800">
      {currentTime || '00:00'}
    </div>
  );
}