'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Avatar, Spin, Modal, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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

const departments = [
  "HR", "Audit", "Supply Chain/Store", "Admin/Health/Security/Legal",
  "Production", "Account/Finance", "Electrical/Maintenance", "IT",
];

const ViewUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [form] = Form.useForm();
  const { user } = useAuth();

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
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("User deleted successfully");
        setUsers(users.filter(user => user.id !== id));
      } else {
        message.error("Failed to delete user");
      }
    } catch (error) {
      message.error("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  const showEditModal = (user: User) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setPreviewImage(user.profile_picture || "/default-avatar.png");
    setSelectedImage(null);
    setIsModalVisible(true);
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj;
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      const updatedUser = await form.validateFields();

      Object.keys(updatedUser).forEach((key) => {
        formData.append(key, updatedUser[key]);
      });

      if (selectedImage) {
        formData.append("profile_picture", selectedImage);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${selectedUser?.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        message.success("User updated successfully");
        fetchUsers(); // Refresh users list
        setIsModalVisible(false);
      } else {
        message.error("Failed to update user");
      }
    } catch (error) {
      message.error("Error updating user");
    }
  };

  const columns = [
    {
      title: "Profile",
      dataIndex: "profile_picture",
      key: "profile_picture",
      render: (profile_picture: string | null) => {
        const imageUrl = profile_picture ? `${process.env.IMAGE_API_PATH}/${profile_picture}` : "/default-avatar.png";
        return <Avatar src={imageUrl} size={40} />;
      },
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Phone Number", dataIndex: "phone_number", key: "phone_number" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Admin List</h2>
      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table dataSource={users} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
      )}

      <Modal
        title="Edit User"
        open={isModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select a role" }]}>
  <Select placeholder="Select a role">
    <Option value="Admin">Admin</Option>
    <Option value="User">User</Option>
  </Select>
</Form.Item>
          <Form.Item name="department" label="Department" rules={[{ required: true, message: "Please select a department" }]}>
            <Select>
              {departments.map(dept => (
                <Option key={dept} value={dept}>{dept}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="phone_number" label="Phone Number" rules={[{ required: true, message: "Please enter phone number" }]}>
            <Input />
          </Form.Item>

          {/* Profile Picture Upload */}
          <Form.Item label="Profile Picture">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setSelectedImage(file);
                        setPreviewImage(URL.createObjectURL(file)); // Show preview
                    }
                    }}
                />
                {previewImage && <Avatar src={previewImage} size={100} style={{ marginTop: 10 }} />}
            </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default ViewUsers;
