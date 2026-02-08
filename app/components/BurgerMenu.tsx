'use client';

import { useState, useEffect } from 'react';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BurgerMenu({ isOpen, onClose, children }: BurgerMenuProps) {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Calculate scrollbar width to compensate for it
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.addEventListener('keydown', handleEscapeKey);
      
      // Prevent scrolling and compensate for scrollbar width
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      
      // Restore original body styles
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-transparent"
        onClick={onClose}
      ></div>
      
      {/* Slide-in menu */}
      <div 
        className={`relative ml-auto h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b">
          <button 
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}