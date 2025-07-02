'use client';

import { useEffect, useState } from 'react';
import { Select, Button, Form, Alert, Spin, Descriptions, Image } from 'antd';
import { UserOutlined, SyncOutlined } from '@ant-design/icons';
import { handleReassignUser } from './utils/reassignUtils';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const fetchReassignData = async () => {
  const [userResponse, ticketResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets`),
  ]);

  if (!userResponse.ok || !ticketResponse.ok) {
    throw new Error('Failed to fetch users or tickets.');
  }

  const users = await userResponse.json();
  const allTickets = await ticketResponse.json();

  const assignedTickets = allTickets.filter((ticket: any) => ticket.assigned_to !== null);

  return { users, tickets: assignedTickets };
};

const ReassignTicket = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Redirect unauthorized users
  useEffect(() => {
    if (user && user.role !== 'Superadmin') {
      router.push('/unauthorized');
    }
  }, [user, router]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const { users, tickets } = await fetchReassignData();
        setUsers(users);
        setTickets(tickets);
      } catch (err: any) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const selectedTicketDetails = tickets.find(t => t.id === selectedTicket);
  const selectedUserDetails = users.find(u => u.id === selectedUser);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-8 bg-gray-100">
      <div className="w-full bg-white shadow-md rounded-xl border border-gray-200 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Reassign Ticket</h1>

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
                  <Descriptions.Item label="Description">{selectedTicketDetails.description}</Descriptions.Item>
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Assignee Details</h2>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Name">{selectedUserDetails.name}</Descriptions.Item>
                  <Descriptions.Item label="Email">{selectedUserDetails.email}</Descriptions.Item>
                  <Descriptions.Item label="Role">{selectedUserDetails.role}</Descriptions.Item>
                </Descriptions>
              </div>
            )}

            <Form.Item label="Select Assigned Ticket" required>
              <Select
                placeholder="Select Assigned Ticket"
                value={selectedTicket}
                onChange={setSelectedTicket}
                suffixIcon={<SyncOutlined />}
                size="large"
              >
                {tickets.map(ticket => (
                  <Select.Option key={ticket.id} value={ticket.id}>
                    {ticket.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Select New User" required>
              <Select
                placeholder="Select New User"
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
                className="bg-green-600 hover:bg-green-700 text-white text-lg py-3 font-semibold rounded-lg"
                onClick={() =>
                  handleReassignUser({
                    selectedTicket,
                    selectedUser,
                    setMessage,
                    tickets,
                    users,
                  })
                }
                disabled={!selectedTicket || !selectedUser}
              >
                Reassign Ticket
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ReassignTicket;
