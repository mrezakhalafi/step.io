'use client';

import { useState } from 'react';
import Modal from './components/Modal';
import BurgerMenu from './components/BurgerMenu';
import AddTaskForm from './components/AddTaskForm';
import AddEventForm from './components/AddEventForm';
import ClientTimeDisplay from './components/ClientTimeDisplay';
import ClientCalendarGrid from './components/ClientCalendarGrid';
import { useAppContext } from './context/AppContext';

export default function Home() {
  const {
    modalState,
    burgerMenuState,
    openModal,
    closeModal,
    openBurgerMenu,
    closeBurgerMenu,
    tasks,
    events,
    pinnedTasks,
    deleteTask,
    deleteEvent
  } = useAppContext();
  
  // State to hold the ID of the item being edited
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // State for active date in calendar
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 11)); // February 11, 2026

  // Handle calendar navigation
  const navigateCalendar = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Handle day navigation for today's schedule
  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  // Get today's events
  const todaysEvents = events.filter(event => 
    new Date(event.date).toDateString() === currentDate.toDateString()
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
              <span className="text-lg font-bold">📋</span>
            </div>
            <span className="font-semibold text-gray-800">Step.io</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-white cursor-pointer"
              onClick={() => openModal('add-task', 'Add New Task')}
            >
              +
            </button>
            <div className="text-right">
              <div className="font-semibold text-gray-800">M Reza Khalafi</div>
              <div 
                className="text-xs text-gray-500 cursor-pointer hover:text-yellow-500"
                onClick={() => openModal('settings', 'Settings')}
              >
                My settings
              </div>
            </div>
            <div 
              className="h-10 w-10 overflow-hidden rounded-full bg-gray-300 cursor-pointer"
              onClick={() => openBurgerMenu('profile')}
            >
              <img src="/api/placeholder/40/40" alt="Profile" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Weekly Pinned */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Weekly Pinned</h3>
                <button 
                  className="text-sm text-yellow-500 cursor-pointer hover:underline"
                  onClick={() => openModal('view-all', 'All Pinned Tasks')}
                >
                  View all
                </button>
              </div>

              <div className="space-y-4">
                {/* Render pinned tasks */}
                {pinnedTasks.map((task) => (
                  <div key={task.id} className="rounded-2xl bg-gray-50 p-4">
                    <div className="mb-2 flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                        {task.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">{task.title}</h4>
                          <span className="text-yellow-500">{task.completed ? '✓' : ''}</span>
                        </div>
                        <p className="text-sm text-gray-500">{task.date} - {task.time}</p>
                        <span className="mt-2 inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-medium text-white">
                          {task.category}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{task.description}</p>
                  </div>
                ))}

                {/* Add New Pin */}
                <div 
                  className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => openModal('add-task', 'Add New Weekly Pin')}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-white">
                    +
                  </div>
                  <h4 className="font-semibold text-gray-800">Add new weekly pin</h4>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex items-center gap-2">
                  <button 
                    className="text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={() => navigateCalendar('prev')}
                  >
                    ←
                  </button>
                  <button 
                    className="text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={() => navigateCalendar('next')}
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2 text-center">
                <div className="text-xs font-medium text-gray-400">Mon</div>
                <div className="text-xs font-medium text-gray-400">Tue</div>
                <div className="text-xs font-medium text-gray-400">Wed</div>
                <div className="text-xs font-medium text-gray-400">Thu</div>
                <div className="text-xs font-medium text-gray-400">Fri</div>
                <div className="text-xs font-medium text-gray-400">Sat</div>
                <div className="text-xs font-medium text-gray-400">Sun</div>

                <ClientCalendarGrid 
                  currentDate={currentDate} 
                  tasks={tasks} 
                  events={events} 
                  onDateClick={setCurrentDate} 
                />
              </div>
            </div>
          </div>

          {/* Center - Today's Schedule */}
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Today's schedule</h2>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold text-yellow-400">
                  {formatDate(currentDate)}
                </h3>
                <button 
                  className="text-gray-400 cursor-pointer hover:text-gray-600"
                  onClick={() => navigateDay('prev')}
                >
                  ←
                </button>
                <button 
                  className="text-gray-400 cursor-pointer hover:text-gray-600"
                  onClick={() => navigateDay('next')}
                >
                  →
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {/* Render today's events */}
              {todaysEvents.length > 0 ? (
                todaysEvents.map((event) => (
                  <div key={event.id} className="rounded-2xl bg-white p-4 shadow-sm flex items-center">
                    <span className="text-2xl mr-3">📅</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{event.title}</div>
                      <div className="text-xs text-gray-500">{event.startTime}{event.endTime && ` - ${event.endTime}`}</div>
                      <p className="text-sm text-gray-600">
                        {event.participants} {event.participants === 1 ? 'attendee' : 'attendees'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setEditingItemId(event.id);
                          openModal('edit-event', 'Edit Event');
                        }}
                        className="text-gray-500 hover:text-yellow-500"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this event?')) {
                            deleteEvent(event.id);
                          }
                        }}
                        className="text-gray-500 hover:text-red-500"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-2xl">
                  No events scheduled for today
                </div>
              )}

              {/* Render tasks for today */}
              {tasks
                .filter(task => new Date(task.date).toDateString() === currentDate.toDateString())
                .map((task) => (
                  <div key={task.id} className="rounded-2xl bg-white p-4 shadow-sm flex items-center">
                    <span className="text-2xl mr-3">{task.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{task.title}</div>
                      {task.description && (
                        <p className="text-sm text-gray-600">{task.description}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600 mr-2">{task.time}</span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setEditingItemId(task.id);
                            openModal('edit-task', 'Edit Task');
                          }}
                          className="text-gray-500 hover:text-yellow-500"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this task?')) {
                              deleteTask(task.id);
                            }
                          }}
                          className="text-gray-500 hover:text-red-500"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Music Player */}
            <div className="rounded-2xl bg-gray-50 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-lg bg-red-900">
                  <img src="/api/placeholder/48/48" alt="Album" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Godzilla</div>
                  <div className="text-sm text-gray-500">Eminem</div>
                </div>
                <button 
                  className="text-gray-400 cursor-pointer hover:text-gray-600"
                  onClick={() => openModal('settings', 'Music Player Settings')}
                >
                  ⋮
                </button>
              </div>

              <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                <span>03:15</span>
                <div className="h-1 flex-1 rounded-full bg-gray-200">
                  <div className="h-full w-1/2 rounded-full bg-gray-400"></div>
                </div>
                <span>00:45</span>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button className="text-gray-600 cursor-pointer hover:text-gray-800">🔀</button>
                <button className="text-gray-600 cursor-pointer hover:text-gray-800">⏮</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white cursor-pointer hover:bg-yellow-600">▶</button>
                <button className="text-gray-600 cursor-pointer hover:text-gray-800">⏭</button>
                <button className="text-gray-600 cursor-pointer hover:text-gray-800">🔁</button>
              </div>
            </div>

            {/* Time & Weather */}
            <div className="text-center">
              <ClientTimeDisplay />
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span>☀️</span>
                <span>Now is almost Sunny</span>
              </div>
            </div>

            {/* Promo Card */}
            <div className="rounded-2xl bg-gray-50 p-6">
              <h3 className="mb-2 text-2xl font-bold leading-tight text-gray-800">
                Unsleash<br />the freelance<br />super power
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Unlimited tasks, premium features and much more.
              </p>
              <div className="mb-4 flex justify-center">
                <div className="text-6xl">👨‍💼</div>
              </div>
              <button 
                className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-gray-800 transition-colors hover:bg-yellow-500 cursor-pointer"
                onClick={() => openModal('settings', 'Upgrade to Premium')}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        title={modalState.title}
      >
        {modalState.type === 'add-task' && <AddTaskForm onClose={closeModal} />}
        {modalState.type === 'add-event' && <AddEventForm onClose={closeModal} />}
        {modalState.type === 'edit-task' && editingItemId && <EditTaskForm taskId={editingItemId} onClose={closeModal} />}
        {modalState.type === 'edit-event' && editingItemId && <EditEventForm eventId={editingItemId} onClose={closeModal} />}
        {modalState.type === 'settings' && (
          <div>
            <p className="text-gray-600 mb-4">Settings content goes here</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
        {modalState.type === 'view-all' && (
          <div>
            <h3 className="font-semibold text-lg mb-4">All Pinned Tasks</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {pinnedTasks.map(task => (
                <div key={task.id} className="p-3 border rounded-lg flex justify-between items-start">
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="text-xs text-gray-500 mt-1">{task.date} at {task.time}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setEditingItemId(task.id);
                        openModal('edit-task', 'Edit Task');
                        closeModal();
                      }}
                      className="text-gray-500 hover:text-yellow-500"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this pinned task?')) {
                          deleteTask(task.id);
                          closeModal();
                        }
                      }}
                      className="text-gray-500 hover:text-red-500"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      {/* Burger Menu */}
      <BurgerMenu 
        isOpen={burgerMenuState.isOpen} 
        onClose={closeBurgerMenu}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-300">
              <img src="/api/placeholder/48/48" alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">M Reza Khalafi</div>
              <div className="text-sm text-gray-600">mrezakhalafi@gmail.com</div>
            </div>
          </div>
          
          <nav className="space-y-2">
            <button
              className="w-full text-left p-2 hover:bg-gray-100 rounded text-gray-800 cursor-pointer"
              onClick={() => {
                openModal('settings', 'Account Settings');
                closeBurgerMenu();
              }}
            >
              Account Settings
            </button>
            <button
              className="w-full text-left p-2 hover:bg-gray-100 rounded text-gray-800 cursor-pointer"
              onClick={() => {
                openModal('settings', 'Notifications');
                closeBurgerMenu();
              }}
            >
              Notifications
            </button>
            <button
              className="w-full text-left p-2 hover:bg-gray-100 rounded text-gray-800 cursor-pointer"
              onClick={() => {
                openModal('settings', 'Privacy');
                closeBurgerMenu();
              }}
            >
              Privacy
            </button>
            <button
              className="w-full text-left p-2 hover:bg-gray-100 rounded text-gray-800 cursor-pointer"
              onClick={() => {
                openModal('settings', 'Help & Support');
                closeBurgerMenu();
              }}
            >
              Help & Support
            </button>
            <button
              className="w-full text-left p-2 hover:bg-gray-100 rounded text-red-600 cursor-pointer"
              onClick={() => {
                alert('Logout functionality would go here');
                closeBurgerMenu();
              }}
            >
              Logout
            </button>
          </nav>
        </div>
      </BurgerMenu>
    </div>
  );
}