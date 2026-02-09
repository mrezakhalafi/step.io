'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setState({
          user: parsedUser,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call with mock authentication
    // In a real app, you would call your backend API here
    try {
      // Mock validation - in a real app, this would be handled by your backend
      if (email && password) {
        // Simulate delay for API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock user data
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0], // Extract name from email for demo
        };

        // Store auth token and user data in localStorage
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('userData', JSON.stringify(mockUser));

        setState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });

        return true;
      }

      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call with mock registration
    try {
      // Mock validation - in a real app, this would be handled by your backend
      if (name && email && password) {
        // Simulate delay for API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock user data
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name,
        };

        // Store auth token and user data in localStorage
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('userData', JSON.stringify(mockUser));

        setState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });

        return true;
      }

      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    // Clear auth token and user data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    // Simulate API call for password reset
    try {
      // Simulate delay for API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, you would send a password reset email
      console.log(`Password reset email sent to: ${email}`);
      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      forgotPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}