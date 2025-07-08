'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaSignOutAlt, FaBook, FaCreditCard, FaUserCircle } from 'react-icons/fa';

export default function DashboardPage() {
  const router = useRouter();

  // Mock auth (replace with Supabase or actual auth logic)
  const user = {
    name: 'Elshaddai Mugugu',
    email: 'elshadai@example.com',
    enrolledCourses: ['Free Course', 'Premium 1-Month'],
  };

  const handleLogout = () => {
    // Add logout logic
    alert('Logged out');
    router.push('/login');
  };

  return (
    <section className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-blue-400 flex items-center gap-2">
              <FaUserCircle /> Welcome back, {user.name}
            </h1>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2 text-white"
          >
            <FaSignOutAlt /> Logout
          </button>
        </motion.div>

        {/* Courses */}
        <div className="grid md:grid-cols-2 gap-6">
          {user.enrolledCourses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-3 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <FaBook className="text-blue-300 text-xl" />
                <h2 className="text-xl font-semibold text-white">{course}</h2>
              </div>
              <p className="text-gray-400 text-sm">
                Access your course materials, videos, and learning tools.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold">
                Open Course
              </button>
            </motion.div>
          ))}
        </div>

        {/* Payments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4 mt-10"
        >
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaCreditCard /> Payment Details
          </h2>
          <p className="text-gray-400 text-sm">
            See all your course payments, receipts, and crypto deposit status.
          </p>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-semibold text-white">
            View Receipts & Payments
          </button>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4 mt-10"
        >
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaChalkboardTeacher /> Support & Mentorship
          </h2>
          <p className="text-gray-400 text-sm">
            Contact your mentor or join our Telegram/WhatsApp support groups.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md font-semibold text-black">
            Contact Mentor
          </button>
        </motion.div>
      </div>
    </section>
  );
}
