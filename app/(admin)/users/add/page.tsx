'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth'; // Assuming your useAuth is set up here
import { Spin, message as antdMessage } from 'antd';

const AddUser: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',  // Auto-set as email
        role: '',
        department: '',
        phone_number: '',
        profile_picture: null as File | null,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();
    const { user, loading: authLoading } = useAuth(); // useAuth provides `user` and `loading`

    // Authorization Check
    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'Superadmin') {
                antdMessage.warning('Unauthorized access');
                router.push('/unauthorized');
            }
        }
    }, [user, authLoading, router]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
            password: name === 'email' ? value : prev.password,  // Set password as email
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, profile_picture: file }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("email", formData.email);
        formDataObj.append("password", formData.password); // Default = email
        formDataObj.append("role", formData.role);
        formDataObj.append("department", formData.department);
        formDataObj.append("phone_number", formData.phone_number);

        if (formData.profile_picture) {
            formDataObj.append("profile_picture", formData.profile_picture);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
                method: "POST",
                body: formDataObj,
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("User added successfully!");

                await fetch("/api/emails", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        sender: { name: "Your App", address: process.env.NEXT_PUBLIC_MAIL_USER },
                        reciepients: [{ name: formData.name, address: formData.email }],
                        subject: "Welcome to Our Platform!",
                        template: "welcome",
                        templateData: { name: formData.name },
                    }),
                });

                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                    department: '',
                    phone_number: '',
                    profile_picture: null,
                });
            } else {
                setMessage(data.msg || "Error adding user");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li><Link className="text-sm text-gray-500" href="/home">Home</Link></li>
                        <li className="text-sm text-gray-800">Add User</li>
                    </ol>
                </nav>
            </div>

            {message && (
                <div className={`p-3 mb-4 text-white rounded-lg ${message.includes('successfully') ? 'bg-green-500' : 'bg-red-500'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <InputField label="Full Name" type="text" name="name" value={formData.name} onChange={handleChange} required />
                <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
                <InputField label="Password (Auto-set as email)" type="text" name="password" value={formData.password} readOnly />
                <SelectField label="Role" name="role" value={formData.role} onChange={handleChange} options={['Admin']} required />
                <SelectField label="Department" name="department" value={formData.department} onChange={handleChange} options={['IT', 'HR', 'Finance', 'Operations']} required />
                <InputField label="Phone Number" type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                <InputField label="Profile Picture" type="file" name="profile_picture" accept="image/*" onChange={handleFileChange} />

                <button type="submit" className="mt-4 w-full p-2 bg-blue-600 text-white rounded-lg" disabled={loading}>
                    {loading ? "Adding User..." : "Add User"}
                </button>
            </form>
        </div>
    );
};

// InputField component
const InputField: React.FC<{
    label: string;
    type: string;
    name: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    required?: boolean;
    readOnly?: boolean;
}> = ({ label, type, name, value, onChange, readOnly, ...props }) => (
    <div className="mb-4">
        <Label htmlFor={name}>{label}</Label>
        <input type={type} id={name} name={name} value={value} onChange={onChange} readOnly={readOnly} className="w-full p-2 border rounded-lg" {...props} />
    </div>
);

// SelectField component
const SelectField: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    required?: boolean;
}> = ({ label, name, value, onChange, options, required }) => (
    <div className="mb-4">
        <Label htmlFor={name}>{label}</Label>
        <select id={name} name={name} value={value} onChange={onChange} required={required} className="w-full p-2 border rounded-lg">
            <option value="">Select {label}</option>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

// Label component
const Label: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block mb-1 text-sm font-medium text-gray-700">{children}</label>
);

export default AddUser;
