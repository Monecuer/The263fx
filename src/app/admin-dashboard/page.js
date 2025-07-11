'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { sendBulkEmail } from '../../utils/sendBulkEmail';
import { FaUser, FaUsers, FaBell, FaEdit, FaSave, FaTimes, FaEnvelope } from 'react-icons/fa';

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
  const [emailStatus, setEmailStatus] = useState('');

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting user:", error.message);
        setError("❌ Failed to get user.");
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  // Fetch profile info
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        setError("⚠️ Failed to load profile.");
      } else if (data) {
        setProfile(data);
        setName(data.full_name || '');
        setBio(data.bio || '');
      }
    };

    fetchProfile();
  }, [user]);

  // Save profile updates
  const saveProfile = async () => {
    if (!user?.id) return;

    setSaving(true);

    const updates = {
      id: user.id,
      name: name,
      bio,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);
    setSaving(false);

    if (error) {
      console.error("Error saving profile:", error.message);
      alert('❌ Failed to save profile.');
    } else {
      alert('✅ Profile updated!');
      setEditingProfile(false);
      setProfile(updates);
    }
  };

  // Fetch admin data
  const fetchAdminData = async () => {
    try {
      const { data: latest, error: fetchError } = await supabase
        .from('profiles')
        .select('id, email,name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (fetchError) throw fetchError;

      const { count, error: countError } = await supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true });

      if (countError) throw countError;

      return { count: count ?? 0, latest: latest ?? [] };
    } catch (err) {
      console.error("Admin data error:", err.message);
      throw err;
    }
  };

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

  // Send bulk email
  const sendEmailToAll = async () => {
    setEmailStatus('Sending...');
    try {
      for (const u of recentUsers) {
        const displayName = u.name || u.email;
        await sendBulkEmail(displayName, "📢 Hello from The263Fx Admin! Stay tuned for updates.");
      }
      setEmailStatus('✅ Emails sent to all users!');
    } catch (err) {
      console.error("Email error:", err.message);
      setEmailStatus('❌ Failed to send emails.');
    }
    setTimeout(() => setEmailStatus(''), 5000);
  };

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
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-2"><FaUser /> Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-gray-800 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaUsers /> Total Users</h2>
          <p className="text-5xl font-bold text-green-400">{userCount}</p>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaUser /> Recent Signups</h2>
          {!recentUsers.length ? (
            <p>No recent users</p>
          ) : (
            <ul className="space-y-2">
              {recentUsers.map((u) => (
                <li key={u.id} className="flex justify-between text-sm">
                  <span>{u.full_name || u.email}</span>
                  <span className="text-gray-400">{new Date(u.created_at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="p-6 bg-gray-800 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaUser /> Your Profile</h2>
        {!editingProfile ? (
          <div>
            <p><strong>Name:</strong> {profile?.name || 'Not set'}</p>
            <p><strong>Bio:</strong> {profile?.bio || 'No bio provided'}</p>
            <button
              onClick={() => setEditingProfile(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
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
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center gap-2"
              >
                <FaSave /> {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setEditingProfile(false)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaBell /> Notifications</h2>
        <button
          onClick={sendEmailToAll}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <FaEnvelope /> Send Email to All Users
        </button>
        {emailStatus && <p className="mt-2 text-green-400">{emailStatus}</p>}
      </div>
    </div>
  );
}
