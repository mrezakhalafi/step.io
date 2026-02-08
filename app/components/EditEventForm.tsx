'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

interface EditEventFormProps {
  eventId: string;
  onClose: () => void;
}

export default function EditEventForm({ eventId, onClose }: EditEventFormProps) {
  const { events, updateEvent } = useAppContext();
  const event = events.find(e => e.id === eventId);
  
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    date: '',
    participants: 1
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        startTime: event.startTime || '',
        endTime: event.endTime || '',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        participants: event.participants || 1
      });
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (event) {
      updateEvent(eventId, {
        title: formData.title,
        startTime: formData.startTime,
        endTime: formData.endTime,
        date: formData.date,
        participants: parseInt(formData.participants.toString())
      });
      onClose();
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

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
      
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this event?')) {
              // This will be handled by the parent component
            }
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
        <div className="flex space-x-3">
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
            Update Event
          </button>
        </div>
      </div>
    </form>
  );
}