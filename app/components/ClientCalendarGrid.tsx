'use client';

import { useState, useEffect } from 'react';

interface CalendarGridProps {
  currentDate: Date;
  tasks: any[];
  events: any[];
  onDateClick: (date: Date) => void;
}

export default function ClientCalendarGrid({ currentDate, tasks, events, onDateClick }: CalendarGridProps) {
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
        
        // Check if this day has events
        const hasEvents = tasks.some(task => 
          new Date(task.date).toDateString() === date.toDateString()
        ) || events.some(event => 
          new Date(event.date).toDateString() === date.toDateString()
        );
        
        // For "today" indicator, we'll use a static reference date to avoid hydration mismatch
        // We'll highlight Feb 11, 2026 as "today" as per the initial setup
        const isToday = date.toDateString() === new Date(2026, 1, 11).toDateString(); // Feb 11, 2026
        
        return (
          <div 
            key={index} 
            className="py-2 text-sm cursor-pointer hover:bg-gray-100 rounded-full flex items-center justify-center"
            onClick={() => onDateClick(date)}
          >
            {isToday ? (
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white mx-auto ${
                isSelected ? 'bg-gray-500' : 'bg-yellow-400'
              }`}>
                {date.getDate()}
              </div>
            ) : (
              <div className={`${
                isSelected 
                  ? 'bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center' 
                  : ''
              } ${hasEvents ? 'text-yellow-500' : 'text-gray-700'}`}>
                {date.getDate()}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}