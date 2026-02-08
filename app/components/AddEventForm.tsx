'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

interface AddEventFormProps {
  onClose: () => void;
}

export default function AddEventForm({ onClose }: AddEventFormProps) {
  const { addEvent } = useAppContext();
  
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    date: '',
    participants: 1
  });

  // Initialize with current date/time after component mounts
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      startTime: new Date().toTimeString().substring(0, 5), // Current time in HH:MM format
      date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      title: formData.title,
      startTime: formData.startTime,
      endTime: formData.endTime,
      date: formData.date,
      participants: parseInt(formData.participants.toString())
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Participants</label>
        <input
          type="number"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
          min="1"
          className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 cursor-pointer"
        >
          Add Event
        </button>
      </div>
    </form>
  );
}