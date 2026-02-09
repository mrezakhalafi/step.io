'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push('/auth/login');
      } else {
        // Allow rendering if authenticated
        setShouldRender(true);
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show nothing while checking authentication status
  if (isLoading || !shouldRender) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  return <>{children}</>;
}