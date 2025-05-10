'use client'    
import React from 'react';
import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const { user, loading } = useAuth(); // ✅ call inside component

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Test Page</h1>
      <p>User Name: {user?.name}</p>
      <p>User Email: {user?.email}</p>
      <p>User Role: {user?.role}</p> {/* ✅ showing the role */}
    </div>
  );
};

export default Page;
