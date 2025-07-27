'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { sendBulkEmail } from '../../utils/sendBulkEmail';
import {
  FaUser,
  FaUsers,
  FaBell,
  FaEdit,
  FaSave,
  FaTimes,
  FaEnvelope,
  FaSmileBeam,
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [emailStatus, setEmailStatus] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.error("Auth Error:", error.message);
        setError("❌ Failed to get user.");
      } else {
        setUser(data.user);
      }
    });
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Profile Error:", error.message);
        setError("⚠️ Failed to load profile.");
      } else {
        setProfile(data);
        setName(data.name || '');
        setBio(data.bio || '');
      }
    };
    fetchProfile();
  }, [user]);

  const saveProfile = async () => {
    if (!user?.id) return;

    setSaving(true);

    const updates = {
      id: user.id,
      name,
      bio,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);
    setSaving(false);

    if (error) {
      console.error("Save Error:", error.message);
      alert('❌ Failed to save profile.');
    } else {
      alert('✅ Profile updated!');
      setEditingProfile(false);
      setProfile(updates);
    }
  };

  const fetchAdminData = async () => {
    try {
      const { data: latest } = await supabase
        .from('profiles')
        .select('id, email, name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { count } = await supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true });

      return { count: count ?? 0, latest: latest ?? [] };
    } catch (err) {
      console.error("Admin Data Error:", err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchAdminData()
      .then(({ count, latest }) => {
        setUserCount(count);
        setRecentUsers(latest);
        let current = 0;
        const interval = setInterval(() => {
          current += Math.ceil(count / 30);
          if (current >= count) {
            current = count;
            clearInterval(interval);
          }
          setDisplayCount(current);
        }, 50);
      })
      .catch(() => setError('⚠️ Could not load user data.'))
      .finally(() => setLoading(false));
  }, []);

  const sendEmailToAll = async () => {
    setEmailStatus('Sending...');
    try {
      for (const u of recentUsers) {
        const displayName = u.name || u.email;
        await sendBulkEmail(displayName, "📢 Hello from The263Fx Admin! Stay tuned for updates.");
      }
      setEmailStatus('✅ Emails sent!');
    } catch (err) {
      console.error("Email Error:", err.message);
      setEmailStatus('❌ Failed to send emails.');
    }
    setTimeout(() => setEmailStatus(''), 4000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="flex flex-col items-center gap-4 animate-fadeIn">
          <FaSmileBeam className="text-yellow-300 text-5xl animate-bounce" />
          <div className="w-14 h-14 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-yellow-200 font-mono text-sm">Welcome  Admin ...</p>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="p-6 bg-gray-900 text-red-500">{error}</div>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-black to-gray-900 text-white space-y-12">
      <h1 className="text-4xl font-bold flex items-center gap-3 text-blue-400">
        <FaUser className="text-3xl" /> Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-yellow-300 mb-4">
            <FaUsers /> Total Users
          </h2>
          <p className="text-5xl font-bold text-green-400 transition-all duration-500">{displayCount}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-yellow-300 mb-4">
            <FaUser /> Recent Signups
          </h2>
          {!recentUsers.length ? (
            <p className="text-gray-400">No recent users.</p>
          ) : (
            <ul className="divide-y divide-gray-700">
              {recentUsers.map((u) => (
                <li key={u.id} className="py-2 flex justify-between text-sm">
                  <span>{u.name || u.email}</span>
                  <span className="text-gray-400">{new Date(u.created_at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-400">
          <FaUser /> Your Profile
        </h2>

        {!editingProfile ? (
          <div>
            <p><strong>Name:</strong> {profile?.name || 'Not set'}</p>
            <p><strong>Bio:</strong> {profile?.bio || 'No bio provided'}</p>
            <button
              onClick={() => setEditingProfile(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 text-sm"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              className="w-full p-2 rounded bg-white/10 border border-gray-600 text-white"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="w-full p-2 rounded bg-white/10 border border-gray-600 text-white"
              placeholder="Short bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                onClick={saveProfile}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center gap-2 text-sm"
              >
                <FaSave /> {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setEditingProfile(false)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2 text-sm"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Email Broadcast */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-purple-400 mb-4">
          <FaBell /> Notifications
        </h2>
        <button
          onClick={sendEmailToAll}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 text-sm"
        >
          <FaEnvelope /> Send Email to All Users
        </button>
        {emailStatus && (
          <p className="mt-3 text-green-400 text-sm italic">{emailStatus}</p>
        )}
      </div>
    </div>
  );
}
