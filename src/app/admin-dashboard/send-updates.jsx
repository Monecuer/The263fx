'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
export default function SendUpdates() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const sendEmails = async () => {
    setStatus('Sending...');
    const { data: users } = await supabase.from('profiles').select('email');
    const emails = users.map(u => u.email);

    await fetch('/api/sendEmails', {
      method: 'POST',
      body: JSON.stringify({ subject, body, emails }),
    });

    setStatus('Emails sent!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Send Bulk Email to Users</h1>
      <div className="space-y-4 max-w-xl">
        <input
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
        <textarea
          className="w-full h-40 p-3 rounded bg-gray-800 border border-gray-700"
          placeholder="Message body"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <button
          onClick={sendEmails}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Send Email
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
        <button onClick={() => router.back()} className="text-blue-400 underline">← Back</button>
      </div>
    </div>
  );
}
