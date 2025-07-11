'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { FaUserEdit, FaBullseye } from 'react-icons/fa';

export default function ProfileSetup() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Get the current user
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setError('Error fetching user info');
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!user) {
      setError('User not found. Please log in.');
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        goal: goal,
      })
      .eq('id', user.id);

    if (insertError) {
      setError('Error saving profile.');
    } else {
      setMessage('✅ Profile saved successfully. 📩 Please check your email to verify your account.');
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaUserEdit /> Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Elshaddai Mugugu"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Your Goal in Forex</label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. Become a full-time trader"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
              />
              <FaBullseye className="absolute right-3 top-3 text-green-400" />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded transition"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
