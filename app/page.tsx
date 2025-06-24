'use client';

import { FiEdit, FiSearch } from 'react-icons/fi';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="text-center px-4 py-12">
        <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to Kam Helpdesk
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Kam Helpdesk is your centralized support system for logging, tracking, and analyzing IT and operational requests efficiently.
        </p>
      </header>

      {/* Quick Action Cards */}
      <main className="flex-1 px-4 pb-12">
        <div className="grid gap-6 sm:grid-cols-2 w-full max-w-3xl mx-auto">
          {/* Create Ticket Card */}
          <Link
            href="/tickets/create"
            className="flex items-center justify-center p-6 border rounded-lg shadow hover:shadow-md transition duration-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiEdit className="w-6 h-6 mr-3 text-blue-600" />
            <span className="text-lg font-medium text-gray-800 dark:text-white">
              Create Ticket
            </span>
          </Link>

          {/* Track Ticket Card */}
          <Link
            href="/track-ticket"
            className="flex items-center justify-center p-6 border rounded-lg shadow hover:shadow-md transition duration-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiSearch className="w-6 h-6 mr-3 text-green-600" />
            <span className="text-lg font-medium text-gray-800 dark:text-white">
              Track Ticket
            </span>
          </Link>
        </div>
      </main>

      {/* About Section */}
      <section className="bg-white dark:bg-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Why Choose Kam Helpdesk?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Built with simplicity and power in mind, Kam Helpdesk empowers your team to manage support requests with clarity, speed, and confidence.
            Whether you're creating tickets or tracking progress, our intuitive interface helps you get more done in less time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-center text-sm text-gray-500 dark:text-gray-400 py-4">
        &copy; {new Date().getFullYear()} Kam Helpdesk. All rights reserved.
      </footer>
    </div>
  );
}
