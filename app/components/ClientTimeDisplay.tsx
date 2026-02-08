'use client';

import { useState, useEffect } from 'react';

export default function ClientTimeDisplay() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Update time immediately and then every minute
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
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