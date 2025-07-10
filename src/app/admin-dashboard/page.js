'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const [userCount, setUserCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data);
        setName(data.name || '');
        setBio(data.bio || '');
      }
    }

    fetchProfile();
  }, [user]);

  async function saveProfile() {
    setSaving(true);
    const updates = {
      id: user.id,
      name,
      bio,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase.from('profiles').upsert(updates);
    setSaving(false);
    if (!error) {
      alert('Profile updated!');
      setEditingProfile(false);
      setProfile(updates);
    } else {
      alert('Failed to save profile.');
    }
  }

  async function fetchAdminData() {
    try {
      const { data: latest, error: latestErr } = await supabase
        .from('profiles')
        .select('id, email, name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { count, error: countErr } = await supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true });

      if (latestErr || countErr) throw new Error((latestErr || countErr).message);
      return { count: count ?? 0, latest };
    } catch (err) {
      console.error('Supabase fetch error:', err.message);
      throw err;
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const { count, latest } = await fetchAdminData();
        setUserCount(count);
        setRecentUsers(latest);
      } catch {
        setError('⚠️ Could not load user data.');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div className="p-6 text-white bg-gray-900">🔄 Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-900 text-white">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">🛠️ Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-gray-800 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">👥 Total Users</h2>
          <p className="text-5xl font-bold text-green-400">{userCount}</p>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">🕒 Recent Signups</h2>
          {recentUsers.length === 0 ? (
            <p>No recent users</p>
          ) : (
            <ul className="space-y-2">
              {recentUsers.map((u) => (
                <li key={u.id} className="flex justify-between">
                  <span>{u.name || u.email}</span>
                  <span className="text-sm text-gray-400">
                    {new Date(u.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="p-6 bg-gray-800 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">🧑‍💼 Your Profile</h2>
        {!editingProfile ? (
          <div>
            <p><strong>Name:</strong> {profile?.name || 'Not set'}</p>
            <p><strong>Bio:</strong> {profile?.bio || 'No bio provided'}</p>
            <button
              onClick={() => setEditingProfile(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full p-2 rounded bg-white/10 border border-gray-600 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Your bio"
              className="w-full p-2 rounded bg-white/10 border border-gray-600 text-white"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                onClick={saveProfile}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setEditingProfile(false)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">🔔 Send Notifications</h2>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          Send Email to All Users
        </button>
      </div>
    </div>
  );
}
