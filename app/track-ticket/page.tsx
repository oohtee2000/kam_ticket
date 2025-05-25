'use client'; // ✅ Marks this file as a Client Component

import React, { useState } from 'react'; // ✅ Needed for useState and JSX

export default function TrackTicketPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    console.log('Tracking ticket for:', email);
    setError('');
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Track Your Ticket
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="you@example.com"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            <a href="tickets/view"> Track Ticket</a>
           
          </button>
        </form>
      </div>
    </div>
  );
}
