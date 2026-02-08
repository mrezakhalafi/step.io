'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define types
type Task = {
  id: string;
  title: string;
  description?: string;
  time: string;
  date: string;
  category: string;
  completed: boolean;
  icon: string;
};

type Event = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  participants?: number;
};

type DataState = {
  tasks: Task[];
  events: Event[];
  pinnedTasks: Task[];
  calendarEvents: Event[];
};

type AppState = DataState & {
  modalState: {
    isOpen: boolean;
    type: 'add-task' | 'add-event' | 'edit-task' | 'edit-event' | 'settings' | 'view-all' | null;
    title: string;
  };
  burgerMenuState: {
    isOpen: boolean;
    type: 'profile' | 'main-menu' | null;
  };
};

type AppContextType = AppState & {
  openModal: (type: 'add-task' | 'add-event' | 'edit-task' | 'edit-event' | 'settings' | 'view-all', title: string) => void;
  closeModal: () => void;
  openBurgerMenu: (type: 'profile' | 'main-menu') => void;
  closeBurgerMenu: () => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  pinTask: (taskId: string) => void;
  unpinTask: (taskId: string) => void;
};

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial data
const initialData: DataState = {
  tasks: [
    {
      id: '1',
      title: 'Call doctor for tests',
      description: 'Ask for blood tests and GYM certificate.',
      time: '9:00 AM',
      date: '15 Mar 2020',
      category: 'personal',
      completed: true,
      icon: '👨‍⚕️'
    },
    {
      id: '2',
      title: 'Beatrice\'s bday',
      time: '',
      date: '22 Mar 2020',
      category: 'personal',
      completed: false,
      icon: '🎂'
    }
  ],
  events: [
    {
      id: '1',
      title: 'Shift project kick off pt.1',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      date: '11 Mar 2020',
      participants: 6
    },
    {
      id: '2',
      title: 'Skype Sushi',
      startTime: '12:30 AM',
      endTime: '',
      date: '11 Mar 2020',
      participants: 2
    }
  ],
  pinnedTasks: [
    {
      id: '1',
      title: 'Call doctor for tests',
      description: 'Ask for blood tests and GYM certificate.',
      time: '9:00 AM',
      date: '15 Mar 2020',
      category: 'personal',
      completed: true,
      icon: '👨‍⚕️'
    }
  ],
  calendarEvents: []
};

// Load data from localStorage
const loadDataFromStorage = (): DataState => {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem('appData');
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return initialData;
      }
    }
  }
  return initialData;
};

// Save data to localStorage
const saveDataToStorage = (data: DataState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('appData', JSON.stringify(data));
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const loadedData = loadDataFromStorage();
    return {
      ...loadedData,
      modalState: {
        isOpen: false,
        type: null,
        title: ''
      },
      burgerMenuState: {
        isOpen: false,
        type: null
      }
    };
  });

  // Save data to localStorage whenever state changes
  useEffect(() => {
    saveDataToStorage({
      tasks: state.tasks,
      events: state.events,
      pinnedTasks: state.pinnedTasks,
      calendarEvents: state.calendarEvents
    });
  }, [state.tasks, state.events, state.pinnedTasks, state.calendarEvents]);

  const openModal = (type: 'add-task' | 'add-event' | 'settings' | 'view-all', title: string) => {
    setState(prev => ({
      ...prev,
      modalState: {
        isOpen: true,
        type,
        title
      }
    }));
  };

  const closeModal = () => {
    setState(prev => ({
      ...prev,
      modalState: {
        ...prev.modalState,
        isOpen: false
      }
    }));
  };

  const openBurgerMenu = (type: 'profile' | 'main-menu') => {
    setState(prev => ({
      ...prev,
      burgerMenuState: {
        isOpen: true,
        type
      }
    }));
  };

  const closeBurgerMenu = () => {
    setState(prev => ({
      ...prev,
      burgerMenuState: {
        ...prev.burgerMenuState,
        isOpen: false
      }
    }));
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false
    };
    
    setState(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    }));
  };

  const deleteTask = (id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id),
      pinnedTasks: prev.pinnedTasks.filter(task => task.id !== id)
    }));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString()
    };
    
    setState(prev => ({
      ...prev,
      events: [...prev.events, newEvent]
    }));
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(event => 
        event.id === id ? { ...event, ...updates } : event
      )
    }));
  };

  const deleteEvent = (id: string) => {
    setState(prev => ({
      ...prev,
      events: prev.events.filter(event => event.id !== id)
    }));
  };

  const toggleTaskCompletion = (id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const pinTask = (taskId: string) => {
    const taskToPin = state.tasks.find(task => task.id === taskId);
    if (taskToPin && !state.pinnedTasks.some(pinned => pinned.id === taskId)) {
      setState(prev => ({
        ...prev,
        pinnedTasks: [...prev.pinnedTasks, taskToPin]
      }));
    }
  };

  const unpinTask = (taskId: string) => {
    setState(prev => ({
      ...prev,
      pinnedTasks: prev.pinnedTasks.filter(task => task.id !== taskId)
    }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      openModal,
      closeModal,
      openBurgerMenu,
      closeBurgerMenu,
      addTask,
      updateTask,
      deleteTask,
      addEvent,
      updateEvent,
      deleteEvent,
      toggleTaskCompletion,
      pinTask,
      unpinTask
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}