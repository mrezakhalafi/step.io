'use client';

import { useState } from 'react';
import Modal from './components/Modal';
import BurgerMenu from './components/BurgerMenu';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import AddCategoryForm from './components/AddCategoryForm';
import EditCategoryForm from './components/EditCategoryForm';
import MusicListModal from './components/MusicListModal';
import ClientTimeDisplay from './components/ClientTimeDisplay';
import ClientCalendarGrid from './components/ClientCalendarGrid';
import { useAppContext } from './context/AppContext';
import { useLanguage } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const {
    modalState,
    burgerMenuState,
    openModal,
    closeModal,
    openBurgerMenu,
    closeBurgerMenu,
    tasks,
    pinnedTasks,
    categories,
    deleteTask,
    getActiveCategoriesCount,
    getCategoryTaskCount,
    unpinTask,
    pinTask
  } = useAppContext();

  const { t, language, setLanguage } = useLanguage();
  
  const { logout } = useAuth();
  
  // State to hold the ID of the item being edited
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // State for active date in calendar
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 9)); // February 9, 2026

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


  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 lg:p-12 xl:p-16">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white p-4 sm:p-8 lg:p-10 xl:p-12 shadow-sm">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
                <span className="text-lg font-bold">📋</span>
              </div>
              <span className="font-semibold text-gray-800">{t('Step.io')}</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-white cursor-pointer"
                onClick={() => openModal('add-task', t('Add New Task'))}
              >
                +
              </button>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="font-semibold text-gray-800">{useAuth().user?.name || 'User'}</div>
                  <div
                    className="text-xs text-gray-500 cursor-pointer hover:text-yellow-500"
                    onClick={() => openModal('settings', t('Settings'))}
                  >
                    {t('My settings')}
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
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Left Sidebar */}
            <div className="space-y-6">
              {/* Weekly Pinned */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{t('Weekly Pinned')}</h3>
                  <button
                    className="text-sm text-yellow-500 cursor-pointer hover:underline"
                    onClick={() => openModal('view-all', t('All Pinned Tasks'))}
                  >
                    {t('View all')}
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Render pinned tasks */}
                  {pinnedTasks.map((task) => (
                    <div key={task.id} className="rounded-2xl bg-gray-50 p-4">
                      <div className="mb-2 flex flex-col sm:flex-row items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                          {task.icon}
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-800">{task.title}</h4>
                                <span className="text-yellow-500">{task.completed ? '✓' : ''}</span>
                              </div>
                              <p className="text-sm text-gray-500 sm:hidden">{task.date} - {task.time}</p>
                            </div>
                            <span className="inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-medium text-gray-900">
                              {task.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 hidden sm:block">{task.date} - {task.time}</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{task.description}</p>
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => unpinTask(task.id)}
                          className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full hover:bg-red-200"
                        >
                          Unpin
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Task Selection for Pinning */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-2">{t('Select Task to Pin')}</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {tasks
                        .filter(task => !pinnedTasks.some(pinned => pinned.id === task.id))
                        .map((task) => (
                          <div 
                            key={task.id} 
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{task.icon}</span>
                              <div>
                                <div className="font-medium text-gray-800 text-sm">{task.title}</div>
                                <div className="text-xs text-gray-500">{task.category} • {task.date}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => pinTask(task.id)}
                              className="text-xs bg-yellow-400 text-gray-800 px-2 py-1 rounded-full hover:bg-yellow-500"
                            >
                              Pin
                            </button>
                          </div>
                        ))}
                      {tasks.filter(task => !pinnedTasks.some(pinned => pinned.id === task.id)).length === 0 && (
                        <div className="text-center py-4 text-gray-500 text-sm">
                          {t('No tasks available to pin')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <div>
                <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-800 text-center sm:text-left">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-gray-400 cursor-pointer hover:text-gray-600 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                      onClick={() => navigateCalendar('prev')}
                    >
                      ←
                    </button>
                    <button
                      className="text-gray-400 cursor-pointer hover:text-gray-600 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                      onClick={() => navigateCalendar('next')}
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-7 gap-1 sm:gap-2 text-center">
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
                    onDateClick={setCurrentDate}
                    onDateDoubleClick={(date) => {
                      setCurrentDate(date);
                      openModal('add-task', t('Add New Task'));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Center - Today's Schedule */}
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{t('Today\'s schedule')}</h2>
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400 truncate">
                    {formatDate(currentDate)}
                  </h3>
                  <div className="flex gap-2 ml-2">
                    <button
                      className="text-gray-400 cursor-pointer hover:text-gray-600 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                      onClick={() => navigateDay('prev')}
                    >
                      ←
                    </button>
                    <button
                      className="text-gray-400 cursor-pointer hover:text-gray-600 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                      onClick={() => navigateDay('next')}
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {/* Render tasks for today */}
                {tasks
                  .filter(task => new Date(task.date).toDateString() === currentDate.toDateString())
                  .map((task) => (
                    <div key={task.id} className="rounded-2xl bg-white p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <span className="text-2xl">{task.icon}</span>
                      <div className="flex-1 w-full">
                        <div className="font-medium text-gray-800">{task.title}</div>
                        {task.description && (
                          <p className="text-sm text-gray-600">{task.description}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
                        <span className="text-sm font-medium text-gray-600">{task.time}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingItemId(task.id);
                              openModal('edit-task', t('Edit Task'));
                            }}
                            className="text-gray-500 hover:text-yellow-500 cursor-pointer"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(t('Are you sure you want to delete this task?'))) {
                                deleteTask(task.id);
                              }
                            }}
                            className="text-gray-500 hover:text-red-500 cursor-pointer"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                {tasks.filter(task => new Date(task.date).toDateString() === currentDate.toDateString()).length === 0 && (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-2xl">
                    {t('No tasks scheduled for today')}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Time & Weather */}
              <div className="text-center">
                <ClientTimeDisplay />
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <span>☀️</span>
                  <span>{t('Now is almost Sunny')}</span>
                </div>
              </div>

              {/* Music Player */}
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-lg bg-red-900">
                    <img src="/api/placeholder/48/48" alt="Album" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 truncate">{t('Godzilla')}</div>
                    <div className="text-sm text-gray-500 truncate">{t('Eminem')}</div>
                  </div>
                  <button
                    className="text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={() => openModal('settings', t('Music Player Settings'))}
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

                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  <button className="text-gray-600 cursor-pointer hover:text-gray-800">🔀</button>
                  <button className="text-gray-600 cursor-pointer hover:text-gray-800">⏮</button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white cursor-pointer hover:bg-yellow-600">▶</button>
                  <button className="text-gray-600 cursor-pointer hover:text-gray-800">⏭</button>
                  <button className="text-gray-600 cursor-pointer hover:text-gray-800">🔁</button>
                </div>
              </div>

              {/* Change Music Button */}
              <div className="flex justify-center">
                <button
                  className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-full text-sm font-medium hover:bg-yellow-500 cursor-pointer w-full sm:w-auto"
                  onClick={() => openModal('music-list', t('Change Music Modal Title'))}
                >
                  {t('Change Music')}
                </button>
              </div>

              {/* Category Management */}
              <div className="rounded-2xl bg-gray-50 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">{t('Categories')}</h3>
                  <button
                    className="text-sm text-yellow-500 hover:underline cursor-pointer self-end"
                    onClick={() => openModal('add-category', t('Add New Category'))}
                  >
                    {t('Add')}
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.length > 0 ? (
                    categories.map(category => (
                      <div
                        key={category.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setEditingItemId(category.id);
                          openModal('edit-category', t('Edit Category'));
                        }}
                      >
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                          <span className="text-sm text-gray-900">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-1">
                          {getCategoryTaskCount(category.id)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 italic p-2">{t('No categories yet')}</div>
                  )}
                </div>
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
          {modalState.type === 'add-task' && <AddTaskForm onClose={closeModal} defaultDate={currentDate.toLocaleDateString('en-CA')} />}
          {modalState.type === 'edit-task' && editingItemId && <EditTaskForm taskId={editingItemId} onClose={closeModal} />}
          {modalState.type === 'add-category' && <AddCategoryForm onClose={closeModal} />}
          {modalState.type === 'edit-category' && editingItemId && <EditCategoryForm categoryId={editingItemId} onClose={closeModal} />}
          {modalState.type === 'music-list' && <MusicListModal onClose={closeModal} />}
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
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {pinnedTasks.map(task => (
                  <div key={task.id} className="p-3 border rounded-lg flex justify-between items-start">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">{task.title}</div>
                        <span className="inline-block rounded-full bg-yellow-400 px-2 py-1 text-xs font-medium text-gray-900 ml-2">
                          {task.category}
                        </span>
                      </div>
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
            <div className="flex items-center gap-4 pb-4 border-b">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-300">
                <img src="/api/placeholder/48/48" alt="Profile" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{useAuth().user?.name || 'User'}</div>
                <div className="text-sm text-gray-600">{useAuth().user?.email || 'user@example.com'}</div>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                className="w-full text-left p-2 hover:bg-gray-100 rounded text-gray-800 cursor-pointer"
                onClick={() => {
                  openModal('settings', t('Account Settings'));
                  closeBurgerMenu();
                }}
              >
                {t('Account Settings')}
              </button>
              <button
                className="w-full text-left p-2 hover:bg-gray-100 rounded text-gray-800 cursor-pointer"
                onClick={() => {
                  openModal('settings', t('Notifications'));
                  closeBurgerMenu();
                }}
              >
                {t('Notifications')}
              </button>
              <button
                className="w-full text-left p-2 hover:bg-gray-100 rounded text-gray-800 cursor-pointer"
                onClick={() => {
                  openModal('settings', t('Privacy'));
                  closeBurgerMenu();
                }}
              >
                {t('Privacy')}
              </button>
              <button
                className="w-full text-left p-2 hover:bg-gray-100 rounded text-gray-800 cursor-pointer"
                onClick={() => {
                  openModal('settings', t('Help & Support'));
                  closeBurgerMenu();
                }}
              >
                {t('Help & Support')}
              </button>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-2">{t('Language')}</div>
                <div className="flex space-x-2">
                  <button
                    className={`flex-1 py-2 px-3 rounded-md text-sm ${
                      language === 'en'
                        ? 'bg-yellow-400 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => setLanguage('en')}
                  >
                    {t('English')}
                  </button>
                  <button
                    className={`flex-1 py-2 px-3 rounded-md text-sm ${
                      language === 'id'
                        ? 'bg-yellow-400 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => setLanguage('id')}
                  >
                    {t('Indonesian')}
                  </button>
                </div>
              </div>
              <button
                className="w-full text-left p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white cursor-pointer flex items-center justify-center gap-2"
                onClick={() => {
                  logout();
                  closeBurgerMenu();
                }}
              >
                <span>🚪</span> {t('Logout')}
              </button>
            </nav>
          </div>
        </BurgerMenu>
      </div>
    </ProtectedRoute>
  );
}