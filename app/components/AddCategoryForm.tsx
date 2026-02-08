'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

interface AddCategoryFormProps {
  onClose: () => void;
}

export default function AddCategoryForm({ onClose }: AddCategoryFormProps) {
  const { addCategory } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    color: 'bg-yellow-400'
  });

  const colorOptions = [
    { name: 'Yellow', value: 'bg-yellow-400', class: 'bg-yellow-400' },
    { name: 'Blue', value: 'bg-blue-400', class: 'bg-blue-400' },
    { name: 'Green', value: 'bg-green-400', class: 'bg-green-400' },
    { name: 'Red', value: 'bg-red-400', class: 'bg-red-400' },
    { name: 'Purple', value: 'bg-purple-400', class: 'bg-purple-400' },
    { name: 'Pink', value: 'bg-pink-400', class: 'bg-pink-400' },
    { name: 'Indigo', value: 'bg-indigo-400', class: 'bg-indigo-400' },
    { name: 'Gray', value: 'bg-gray-400', class: 'bg-gray-400' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCategory({
      name: formData.name,
      color: formData.color
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
          placeholder="Enter category name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
        <div className="grid grid-cols-4 gap-2">
          {colorOptions.map((color) => (
            <div 
              key={color.value}
              className={`flex items-center p-2 rounded-md cursor-pointer border ${
                formData.color === color.value ? 'border-gray-800 ring-2 ring-offset-2 ring-gray-400' : 'border-gray-300'
              }`}
              onClick={() => setFormData({...formData, color: color.value})}
            >
              <div className={`w-4 h-4 rounded-full ${color.class} mr-2`}></div>
              <span className="text-xs">{color.name}</span>
            </div>
          ))}
        </div>
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
          Add Category
        </button>
      </div>
    </form>
  );
}