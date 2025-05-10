'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Define the ITicket interface
interface ITicket {
    title: string;
    status: string;
    department: string;
    assigned_to: string | null;
    details: string;
    image?: string;
}

const TicketTracking: React.FC = () => {
    const [ticketId, setTicketId] = useState<string>('');
    const [ticketData, setTicketData] = useState<ITicket | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTicketId(e.target.value);
    };

    // Fetch ticket details based on the entered ticket ID
    const fetchTicketDetails = async () => {
        if (!ticketId) {
            setError('Please enter a valid ticket ID.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://kam-ticket-express-api.onrender.com/api/tickets/${ticketId}`);
            const data = await response.json();

            if (response.ok) {
                setTicketData(data);
            } else {
                setError(data.error || 'Error fetching ticket details');
            }
        } catch (err) {
            setError('Failed to fetch ticket details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Reset ticket data on page load if ticketId is empty
        if (!ticketId) {
            setTicketData(null);
        }
    }, [ticketId]);

    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Ticket Tracking</h2>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link className="text-sm text-gray-500" href="/">Home</Link>
                        </li>
                        <li className="text-sm text-gray-800">Track Ticket</li>
                    </ol>
                </nav>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Ticket ID to Track</h3>
                <div className="mb-4 flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Ticket ID"
                        value={ticketId}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    <button
                        onClick={fetchTicketDetails}
                        className="p-2 bg-blue-600 text-white rounded-lg"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Track Ticket'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            {ticketData && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Ticket Details</h3>
                    <div className="space-y-4">
                        <div>
                            <strong className="text-gray-700">Title:</strong>
                            <p className="text-gray-600">{ticketData.title}</p>
                        </div>
                        <div>
                            <strong className="text-gray-700">Status:</strong>
                            <p className="text-gray-600">{ticketData.status}</p>
                        </div>
                        <div>
                            <strong className="text-gray-700">Department:</strong>
                            <p className="text-gray-600">{ticketData.department}</p>
                        </div>
                        <div>
                            <strong className="text-gray-700">Assigned To:</strong>
                            <p className="text-gray-600">{ticketData.assigned_to || "Not assigned yet"}</p>
                        </div>
                        <div>
                            <strong className="text-gray-700">Details:</strong>
                            <p className="text-gray-600">{ticketData.details}</p>
                        </div>
                        {ticketData.image && (
                            <div>
                                <strong className="text-gray-700">Image:</strong>
                                <img
                                    src={ticketData.image}
                                    alt="Ticket Image"
                                    className="w-full h-auto mt-4 rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketTracking;
