'use client';

import { useState, useEffect } from 'react';

interface CalendarGridProps {
  currentDate: Date;
  tasks: any[];
  onDateClick: (date: Date) => void;
  onDateDoubleClick?: (date: Date) => void;
}

export default function ClientCalendarGrid({ currentDate, tasks, onDateClick, onDateDoubleClick }: CalendarGridProps) {
  // Calculate the first day of the month (adjusted for Monday start)
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  // Get the number of days in the month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  return (
    <>
      {Array.from({ length: 42 }).map((_, index) => { // 6 weeks * 7 days
        if (index < adjustedFirstDay || index >= adjustedFirstDay + daysInMonth) {
          // Empty cells before and after the month
          return <div key={index} className="py-2 text-sm text-gray-300"></div>;
        }
        
        const day = index - adjustedFirstDay + 1;
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        
        // Check if this day is the currently selected date
        const isSelected = date.toDateString() === currentDate.toDateString();
        
        // Check if this day has tasks
        const hasTasks = tasks.some(task => 
          new Date(task.date).toDateString() === date.toDateString()
        );
        
        // For "today" indicator, we'll use a fixed reference date (Feb 9, 2026) as the actual "today"
        const actualToday = new Date(2026, 1, 9); // February 9, 2026
        const isToday = date.toDateString() === actualToday.toDateString();

        return (
          <div
            key={index}
            className="py-2 text-sm cursor-pointer hover:bg-gray-100 rounded-full flex items-center justify-center"
            onClick={() => onDateClick(date)}
            onDoubleClick={() => onDateDoubleClick && onDateDoubleClick(date)}
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
              isToday && !isSelected ? 'text-white bg-yellow-400' : 
              isSelected ? 'text-white bg-gray-500' : 
              hasTasks ? 'text-yellow-500' : 'text-gray-700'
            }`}>
              {date.getDate()}
            </div>
          </div>
        );
      })}
    </>
  );
}