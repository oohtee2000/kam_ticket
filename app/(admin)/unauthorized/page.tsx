'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'antd';

export default function Unauthorized() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/home');
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4 text-lg">You do not have permission to view this page.</p>
      <Button
        type="primary"
        className="mt-6"
        onClick={handleRedirect}
      >
        Go to Home
      </Button>
    </div>
  );
}
