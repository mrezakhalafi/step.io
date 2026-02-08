'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

interface AddTaskFormProps {
  onClose: () => void;
}

export default function AddTaskForm({ onClose }: AddTaskFormProps) {
  const { addTask } = useAppContext();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    date: '',
    category: 'personal',
    icon: '📝'
  });

  // Initialize with current date/time after component mounts
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      time: new Date().toTimeString().substring(0, 5), // Current time in HH:MM format
      date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title: formData.title,
      description: formData.description,
      time: formData.time,
      date: formData.date,
      category: formData.category,
      icon: formData.icon,
      completed: false
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </select>
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
          Add Task
        </button>
      </div>
    </form>
  );
}