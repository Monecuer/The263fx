'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import {
  FaBook, FaShoppingCart, FaCreditCard, FaWallet, FaQrcode,
  FaCheckCircle, FaTimesCircle, FaUserCircle, FaSignOutAlt,
  FaVideo, FaTelegramPlane, FaWhatsapp, FaLink, FaDownload,
  FaStripe, FaBitcoin, FaPaypal, FaCcVisa, FaCcMastercard,
  FaCcAmex, FaGooglePay, FaApplePay, FaMoneyBillWave, FaMoneyCheckAlt
} from 'react-icons/fa';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [binanceQr, setBinanceQr] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function init() {
      const {
        data: { user: u },
        error: uErr
      } = await supabase.auth.getUser();

      if (uErr || !u) {
        router.push('/login');
        return;
      }
      setUser(u);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('name, bio')
        .eq('id', u.id)
        .single();

      setProfile(profileData);

      const { data: cors } = await supabase.from('courses').select('*');
      setAvailableCourses(cors ?? []);

      const { data: enrolls } = await supabase
        .from('enrollments')
        .select('course_id, courses(name, description, video_url)')
        .eq('user_id', u.id);

      setEnrolledCourses(
        (enrolls ?? []).map(e => ({
          id: e.course_id,
          name: e.courses.name,
          description: e.courses.description,
          videoUrl: e.courses.video_url
        }))
      );

      const { data: pays } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', u.id)
        .order('created_at', { ascending: false });

      setPayments(pays ?? []);

      setLoading(false);
    }
    init();
  }, [router]);

  const cancel = () => {
    setSelectedCourse(null);
    setBinanceQr('');
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl">
        Loading your dashboard...
      </div>
    );

  return (
    <div className="dashboard max-w-6xl mx-auto p-6 bg-gray-900 min-h-screen text-white space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-blue-400">
          <FaUserCircle /> Hello, {profile?.name || user?.email.split('@')[0]}
        </h1>
        <div className="flex gap-4 flex-wrap">
          <a
            href="/academy"
            className="btn-secondary bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center gap-2"
          >
            <FaBook /> Go to Academy
          </a>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/login');
            }}
            className="btn-danger bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* ...rest of the component remains unchanged */}
    </div>
  );
}