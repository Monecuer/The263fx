'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { FaUser, FaBullseye } from 'react-icons/fa';

export default function ProfileSetup() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const forexGoals = [
    'Become a full-time trader',
    'Learn technical analysis',
    'Master risk management',
    'Earn passive income',
    'Grow trading capital',
  ];

  const handleSaveProfile = async () => {
    setSaving(true);
    setError('');

    const { data: user } = await supabase.auth.getUser();
    const userId = user?.user?.id;

    if (!userId) {
      setError('You must be signed in to complete your profile.');
      setSaving(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: fullName,
        goal,
      });

    if (insertError) {
      setError('Failed to save profile. Try again.');
      console.error(insertError.message);
    } else {
      router.push('/home'); // ✅ Redirect to home or dashboard
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">👋 Welcome, Trader!</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium">
            <FaUser className="inline mr-2 text-blue-400" />
            Your Full Name
          </label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Elshaddai Mugugu"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium">
            <FaBullseye className="inline mr-2 text-green-400" />
            What's your goal in Forex?
          </label>
          <select
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="">-- Select Goal --</option>
            {forexGoals.map((g, i) => (
              <option key={i} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={saving || !fullName || !goal}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition mt-4 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Complete Profile'}
        </button>
      </div>
    </div>
  );
}
