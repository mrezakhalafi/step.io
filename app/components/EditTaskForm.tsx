'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

interface EditTaskFormProps {
  taskId: string;
  onClose: () => void;
}

export default function EditTaskForm({ taskId, onClose }: EditTaskFormProps) {
  const { tasks, updateTask } = useAppContext();
  const task = tasks.find(t => t.id === taskId);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    date: '',
    category: 'personal',
    icon: '📝',
    completed: false
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        time: task.time,
        date: task.date ? new Date(task.date).toISOString().split('T')[0] : '',
        category: task.category,
        icon: task.icon,
        completed: task.completed
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      updateTask(taskId, {
        title: formData.title,
        description: formData.description,
        time: formData.time,
        date: formData.date,
        category: formData.category,
        icon: formData.icon,
        completed: formData.completed
      });
      onClose();
    }
  };

  if (!task) {
    return <div>Task not found</div>;
  }

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
      
      <div className="grid grid-cols-2 gap-4">
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            placeholder="e.g., 📝, 🏋️, 👨‍💼"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          name="completed"
          checked={formData.completed}
          onChange={(e) => setFormData(prev => ({ ...prev, completed: e.target.checked }))}
          className="mr-2"
        />
        <label className="text-sm font-medium text-gray-700">Completed</label>
      </div>
      
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this task?')) {
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
            Update Task
          </button>
        </div>
      </div>
    </form>
  );
}