'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import {
  FaUserShield,
  FaSignOutAlt,
  FaUsers,
  FaMoneyCheckAlt,
  FaEnvelope,
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAdminData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== 'the263fx@gmail.com') {
        router.push('/login');
      } else {
        setAdmin(user);

        // Fetch registered users
        const { data: userData } = await supabase.from('profiles').select('id, email, full_name, created_at');
        setUsers(userData || []);

        // Fetch paid users
        const { data: paymentData } = await supabase.from('payments').select('*').eq('status', 'paid');
        setPayments(paymentData || []);
      }
    }
    fetchAdminData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-400">
          <FaUserShield /> Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded shadow flex items-center gap-4">
          <FaUsers className="text-3xl text-green-400" />
          <div>
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-xl font-bold">{users.length}</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow flex items-center gap-4">
          <FaMoneyCheckAlt className="text-3xl text-yellow-400" />
          <div>
            <h2 className="text-lg font-semibold">Total Paid</h2>
            <p className="text-xl font-bold">{payments.length}</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow flex items-center gap-4">
          <FaEnvelope className="text-3xl text-blue-400" />
          <div>
            <h2 className="text-lg font-semibold">Send Bulk Emails</h2>
            <button
              onClick={() => router.push('/admin-dashboard/send-updates')}
              className="mt-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
            >
              Compose
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
        <div className="overflow-auto bg-gray-800 rounded shadow">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-3">Email</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="border-t border-gray-700">
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.full_name || '-'}</td>
                  <td className="p-3">{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
