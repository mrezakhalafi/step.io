'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const success = await forgotPassword(email);
      if (success) {
        setMessage('Password reset link has been sent to your email address.');
        setEmail('');
      } else {
        setError('Failed to send password reset email. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Forgot password error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400">
              <span className="text-2xl font-bold">📋</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
          <p className="text-gray-600 mt-2">Enter your email to receive reset instructions</p>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition placeholder:text-gray-400 ${email ? 'text-gray-600' : 'text-gray-900'}`}
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-xl text-white font-medium ${
              isLoading 
                ? 'bg-yellow-400 cursor-not-allowed' 
                : 'bg-yellow-500 hover:bg-yellow-600'
            } transition-colors duration-200`}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link href="/auth/login" className="font-medium text-yellow-500 hover:text-yellow-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}