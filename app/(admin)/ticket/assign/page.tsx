'use client';

import { useEffect, useState } from 'react';
import { Select, Button, Form, Alert, Spin, Descriptions, Image } from 'antd';
import { UserOutlined, SolutionOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth'; // make sure this is the correct import

import { handleAssignUser } from './utils/handleAssignUser';

const fetchAllData = async () => {
    const [userResponse, ticketResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`),
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets/unassigned`)
    ]);

    if (!userResponse.ok || !ticketResponse.ok) {
        throw new Error('Failed to fetch users or tickets.');
    }

    const users = await userResponse.json();
    const tickets = await ticketResponse.json();
    return { users, tickets };
};

const AssignTicket = () => {
    const { user, loading: authLoading } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [tickets, setTickets] = useState<any[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && user?.role === 'Superadmin') {
            const loadData = async () => {
                setLoading(true);
                try {
                    const { users, tickets } = await fetchAllData();
                    setUsers(users);
                    setTickets(tickets);
                } catch (err: any) {
                    setMessage(err.message);
                } finally {
                    setLoading(false);
                }
            };
            loadData();
        }
    }, [authLoading, user]);

    const selectedTicketDetails = tickets.find(t => t.id === selectedTicket);
    const selectedUserDetails = users.find(u => u.id === selectedUser);

    // Loading auth state
    if (authLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Spin size="large" />
            </div>
        );
    }

    // If not Superadmin, show "No access" message
    if (user?.role !== 'Superadmin') {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
                <div className="p-8 bg-white shadow-md rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">You don't have access to this page</h2>
                    <Link href="/home">
                        <Button type="primary" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Go to Home
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Superadmin content
    return (

        <div className="w-full px-6 py-8 bg-gray-50 min-h-screen">
  <div className="w-full bg-white shadow-md rounded-xl border border-gray-200 p-8">
    <h1 className="text-2xl font-bold text-gray-900 mb-10">Assign User to Ticket</h1>

    {message && (
      <Alert
        message={message}
        type={message.includes('successfully') ? 'success' : 'error'}
        showIcon
        closable
        className="mb-6"
      />
    )}

    {loading ? (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    ) : (
      <Form layout="vertical" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {selectedTicketDetails && (
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ticket Details</h2>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Title">{selectedTicketDetails.title}</Descriptions.Item>
              <Descriptions.Item label="Subcategory">{selectedTicketDetails.subcategory}</Descriptions.Item>
              <Descriptions.Item label="Description">{selectedTicketDetails.details}</Descriptions.Item>
              {selectedTicketDetails.image && (
                <Descriptions.Item label="Image">
                  <Image src={selectedTicketDetails.image} alt="Ticket Image" width={100} />
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        )}

        {selectedUserDetails && (
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Name">{selectedUserDetails.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedUserDetails.email}</Descriptions.Item>
              <Descriptions.Item label="Role">{selectedUserDetails.role}</Descriptions.Item>
            </Descriptions>
          </div>
        )}

        <Form.Item label="Select Ticket" required className="col-span-1">
          <Select
            placeholder="Select Ticket"
            value={selectedTicket}
            onChange={setSelectedTicket}
            suffixIcon={<SolutionOutlined />}
            size="large"
          >
            {tickets.map(ticket => (
              <Select.Option key={ticket.id} value={ticket.id}>
                {ticket.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Select User" required className="col-span-1">
          <Select
            placeholder="Select User"
            value={selectedUser}
            onChange={setSelectedUser}
            suffixIcon={<UserOutlined />}
            size="large"
          >
            {users.map(user => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="md:col-span-2">
          <Button
            type="primary"
            block
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 font-semibold rounded-lg"
            onClick={() =>
              handleAssignUser({
                selectedTicket,
                selectedUser,
                setMessage,
                tickets,
                users,
              })
            }
            disabled={!selectedTicket || !selectedUser}
          >
            Assign User
          </Button>
        </Form.Item>
      </Form>
    )}
  </div>
</div>

    );
};

export default AssignTicket;
