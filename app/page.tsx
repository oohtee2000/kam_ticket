'use client';

import { FiEdit, FiSearch, FiBarChart2 } from 'react-icons/fi'; // Added FiBarChart2 for analysis icon
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 dark:text-white">
        Welcome to Kam Helpdesk
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
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

        {/* Ticket Analysis Card */}
        <Link
          href="/analysis"
          className="flex items-center justify-center p-6 border rounded-lg shadow hover:shadow-md transition duration-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FiBarChart2 className="w-6 h-6 mr-3 text-purple-600" />
          <span className="text-lg font-medium text-gray-800 dark:text-white">
            Ticket Analysis
          </span>
        </Link>
      </div>
    </div>
  );
}
