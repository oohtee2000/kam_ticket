'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  Button,
  Popconfirm,
  message,
  Avatar,
  Spin,
  Modal,
  Form,
  Input,
  Select,
} from 'antd';
import { useAuth } from '@/hooks/useAuth';

const { Option } = Select;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  phone_number: string;
  profile_picture: string | null;
}

const DEPARTMENTS = [
  'HR',
  'Audit',
  'Supply Chain/Store',
  'Admin/Health/Security/Legal',
  'Production',
  'Account/Finance',
  'Electrical/Maintenance',
  'IT',
];

const ViewUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'Superadmin') {
      message.warning('Unauthorized access');
      router.push('/unauthorized');
    }
  }, [user, router]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(prev => prev.filter(user => user.id !== id));
        message.success('User deleted successfully');
      } else {
        message.error('Failed to delete user');
      }
    } catch {
      message.error('An error occurred while deleting user');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setPreviewImage(user.profile_picture ? `${process.env.IMAGE_API_PATH}/${user.profile_picture}` : '/default-avatar.png');
    setEditModalVisible(true);
  };

  const openPasswordModal = (user: User) => {
    setSelectedUser(user);
    passwordForm.resetFields();
    setPasswordModalVisible(true);
  };

  const handlePasswordUpdate = async () => {
    try {
      const { password } = await passwordForm.validateFields();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${selectedUser?.id}/password`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        message.success('Password updated');
        setPasswordModalVisible(false);
      } else {
        message.error('Failed to update password');
      }
    } catch {
      message.error('Password update failed');
    }
  };

  const handleUserUpdate = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      if (selectedImage) {
        formData.append('profile_picture', selectedImage);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${selectedUser?.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        message.success('User updated');
        fetchUsers();
        setEditModalVisible(false);
      } else {
        message.error('Failed to update user');
      }
    } catch {
      message.error('User update failed');
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profile_picture',
      key: 'profile_picture',
      render: (pic: string | null) => {
  console.log('Profile picture:', pic);
  console.log('image path: ', `${process.env.NEXT_PUBLIC_IMAGE_API_PATH}/${pic}`);
  return (
    <Avatar
      src={pic ? `${process.env.NEXT_PUBLIC_IMAGE_API_PATH}/${pic}` : '/default-avatar.png'}
      size={40}
    />
  );
}

    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Phone', dataIndex: 'phone_number', key: 'phone_number' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
          <Button type="link" onClick={() => openPasswordModal(record)}>
            Change Password
          </Button>
        </>
      ),
    },
  ];

  if (!user) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </div>
  );
}

if (user.role !== 'Superadmin') {
  return null; // Or <Unauthorized /> if you have such a component
}


  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Admin List</h2>

      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        open={editModalVisible}
        onOk={handleUserUpdate}
        onCancel={() => setEditModalVisible(false)}
        okText="Update"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select placeholder="Select a role">
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>

          <Form.Item name="department" label="Department" rules={[{ required: true }]}>
            <Select placeholder="Select department">
              {DEPARTMENTS.map(dept => (
                <Option key={dept} value={dept}>
                  {dept}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="phone_number" label="Phone Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Profile Picture">
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            {previewImage && (
              <Avatar src={previewImage} size={100} style={{ marginTop: 10 }} />
            )}
          </Form.Item>
        </Form>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        title={`Change Password for ${selectedUser?.name || ''}`}
        open={passwordModalVisible}
        onOk={handlePasswordUpdate}
        onCancel={() => setPasswordModalVisible(false)}
        okText="Update Password"
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item
            name="password"
            label="New Password"
            rules={[{ required: true, message: 'Please enter a new password' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewUsers;
