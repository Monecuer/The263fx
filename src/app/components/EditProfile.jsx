'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function EditProfile({ user }) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('name, goal')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
        setErrorMsg('Failed to load profile.');
      } else {
        setName(data?.name || '');
        setGoal(data?.goal || '');
      }
    }

    fetchProfile();
  }, [user]);

  async function handleSave() {
    if (!user?.id) {
      setErrorMsg('User not loaded.');
      return;
    }

    if (!name.trim()) {
      setErrorMsg('Full name is required.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    const { error } = await supabase
      .from('profiles')
      .upsert([
        {
          id: user.id,
          name: name.trim(),
          goal: goal.trim(),
          updated_at: new Date(),
        },
      ]);

    setLoading(false);

    if (error) {
      console.error('Profile update failed:', error.message);
      setErrorMsg('Profile update failed. Try again.');
    } else {
      setSuccess(true);
    }
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Your Profile</h2>

      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

      <input
        type="text"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Tell us about yourself..."
        rows={4}
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </button>

      {success && <p className="text-green-600 mt-4 text-center">Profile saved successfully!</p>}
    </div>
  );
}
