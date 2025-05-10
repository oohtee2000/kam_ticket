'use client'
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const sendEmail = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/emails', { method: 'POST' });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, error: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <button onClick={sendEmail} className="bg-blue-500 text-white p-2 rounded">
        Send Test Email
      </button>

      {loading && <p className="mt-4">Processing...</p>}

      <pre className="mt-4 bg-gray-100 p-2">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
