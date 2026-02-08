'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define types
type Category = {
  id: string;
  name: string;
  color: string;
  createdAt: string;
};

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

type DataState = {
  tasks: Task[];
  pinnedTasks: Task[];
  categories: Category[];
};

type AppState = DataState & {
  modalState: {
    isOpen: boolean;
    type: 'add-task' | 'edit-task' | 'settings' | 'view-all' | 'add-category' | 'edit-category' | 'music-list' | null;
    title: string;
  };
  burgerMenuState: {
    isOpen: boolean;
    type: 'profile' | 'main-menu' | null;
  };
};

type AppContextType = AppState & {
  openModal: (type: 'add-task' | 'edit-task' | 'settings' | 'view-all' | 'add-category' | 'edit-category', title: string) => void;
  closeModal: () => void;
  openBurgerMenu: (type: 'profile' | 'main-menu') => void;
  closeBurgerMenu: () => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  pinTask: (taskId: string) => void;
  unpinTask: (taskId: string) => void;
  addCategory: (category: Omit<Category, 'id' | 'createdAt'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getActiveCategoriesCount: () => number;
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
  categories: []
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
      tasks: loadedData.tasks || initialData.tasks || [],
      pinnedTasks: loadedData.pinnedTasks || initialData.pinnedTasks || [],
      categories: loadedData.categories || initialData.categories || [],
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
      pinnedTasks: state.pinnedTasks,
      categories: state.categories
    });
  }, [state.tasks, state.pinnedTasks, state.categories]);

  const openModal = (type: 'add-task' | 'edit-task' | 'settings' | 'view-all' | 'add-category' | 'edit-category' | 'music-list', title: string) => {
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

  const addCategory = (category: Omit<Category, 'id' | 'createdAt'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setState(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === id ? { ...category, ...updates } : category
      )
    }));
  };

  const deleteCategory = (id: string) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.filter(category => category.id !== id)
    }));
  };

  const getActiveCategoriesCount = () => {
    return state.categories?.length || 0;
  };

  const getCategoryTaskCount = (categoryId: string) => {
    if (!state.categories || !state.tasks) return 0;
    const category = state.categories.find(cat => cat.id === categoryId);
    if (!category) return 0; // Return 0 if category doesn't exist
    return state.tasks.filter(task => task.category === category.name).length;
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
      toggleTaskCompletion,
      pinTask,
      unpinTask,
      addCategory,
      updateCategory,
      deleteCategory,
      getActiveCategoriesCount,
      getCategoryTaskCount
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