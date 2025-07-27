'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';
import PaymentModal from '../components/PaymentModal';
import { motion } from 'framer-motion';
import {
  FaPlayCircle,
  FaCreditCard,
  FaChalkboardTeacher,
  FaClock,
  FaUserGraduate,
  FaBrain,
  FaStar,
  FaCcVisa,
  FaCcMastercard
} from 'react-icons/fa';

export default function CoursesSection() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const countdownDate = new Date('2025-08-19T00:00:00Z').getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = countdownDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (t) => t.toString().padStart(2, '0');

  const handleJoin = (course) => {
    if (!user) {
      router.push('/login');
    } else {
      setSelectedCourse(course);
    }
  };

  const handleEnrollFreeCourse = async () => {
    if (!user) return router.push('/login');
    setLoading(true);
    const { error } = await supabase
      .from('enrollments')
      .insert([{ user_id: user.id, course_id: 'free-course' }]);
    setLoading(false);
    if (error) {
      if (error.code === '23505') {
        alert(' You are already enrolled.');
      } else {
        alert(' Enrollment failed. Please try again later.');
        console.error(error);
        return;
      }
    } else {
      alert(' You are now enrolled in the Free Course!');
    }
    setShowVideo(true);
  };

  const courses = [
    {
      id: 'free-course',
      title: 'Free Course',
      icon: <FaChalkboardTeacher className="text-blue-400 text-2xl animate-pulse" />,
      badge: 'FREE',
      price: 0,
      priceLabel: 'Free',
      duration: null,
      color: 'bg-gradient-to-br from-blue-900/40 to-blue-800/30',
      border: 'border-blue-500',
      features: [
        'Why you should trade',
        'How trading benefits you',
        'Why people lose money',
      ],
      action: !showVideo ? (
        <button
          onClick={handleEnrollFreeCourse}
          className="mt-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg transition-transform transform hover:scale-[1.03] active:scale-95 disabled:opacity-60"
          aria-label="Join Free Course"
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <FaPlayCircle className="text-xl" /> Join Now
            </>
          )}
        </button>
      ) : (
        <div className="aspect-video mt-5 rounded-xl overflow-hidden border border-blue-700 shadow-lg bg-black/90 flex items-center justify-center text-blue-300 text-sm italic font-mono select-none">
          Free Course Video Coming Soon
        </div>
      ),
    },
    {
      id: 'premium-1mo',
      title: '1-Month Premium',
      icon: <FaUserGraduate className="text-yellow-400 text-2xl" />,
      badge: '20% OFF',
      price: 48,
      priceLabel: '$48 (Was $60)',
      duration: '1 Month',
      color: 'bg-gradient-to-br from-yellow-900/40 to-yellow-800/30',
      border: 'border-yellow-400',
      features: [
        'Includes Free Course',
        'Intro to Markets',
        'Winning Strategy',
        'Open Account & Demo',
        'Trade Real Account',
      ],
    },
    {
      id: 'mastery-3mo',
      title: '3-Month Mastery',
      icon: <FaBrain className="text-purple-400 text-2xl" />,
      badge: '36% OFF',
      price: 96,
      priceLabel: '$96 (Was $150)',
      duration: '3 Months',
      color: 'bg-gradient-to-br from-purple-900/40 to-purple-800/30',
      border: 'border-purple-400',
      features: [
        'Includes Previous Course',
        'Mindset & Psychology',
        'Fundamental Analysis',
        'Technical Analysis',
        'Trade with Us',
        'Prop Firm Trading',
      ],
    },
    {
      id: 'elite-lifetime',
      title: 'Lifetime Elite Access',
      icon: <FaStar className="text-yellow-500 text-2xl animate-pulse" />,
      badge: '50% OFF',
      price: 375,
      priceLabel: '$375 (Was $750)',
      duration: 'Lifetime',
      color: 'bg-gradient-to-br from-yellow-800/40 to-yellow-700/30',
      border: 'border-yellow-500',
      features: [
        'Covers All Courses',
        'Advanced Strategy Creation',
        'Trade Signals Free',
        'Become a Pro',
        'Get Funded $10K',
      ],
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-20 px-8 max-w-7xl mx-auto space-y-20">
      {/* Top-right corner logo */}
      <div className="absolute top-6 right-6 z-10">
        <Image
          src="/images/online-learning-illustration.png"
          alt="Online Learning"
          width={64}
          height={64}
          className="opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold mb-5 text-blue-500 tracking-wide drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          The263Fx Course Plans
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg max-w-xl mx-auto tracking-wide leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Transform your trading with structured programs designed for success.
        </motion.p>
      </div>

      {/* Payment Logos */}
      <div className="text-center">
        <p className="text-gray-400 italic">
          We accept EcoCash, Inbucks, Binance, Visa and MasterCard
        </p>
        <div className="flex justify-center items-center gap-6 mt-2">
          <Image src="/icons/ecocash__zoom-1.png" width={36} height={36} alt="EcoCash" />
          <Image src="/icons/inbucks.png" width={36} height={36} alt="Inbucks" />
          <Image src="/icons/binance.png" width={36} height={36} alt="Binance" />
          <FaCcVisa className="text-4xl text-blue-500" />
          <FaCcMastercard className="text-4xl text-yellow-600" />
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            className={`${course.color} ${course.border} p-8 rounded-3xl shadow-2xl backdrop-blur-[40px] border-2 relative space-y-6 hover:shadow-[0_0_25px_#2563EB] hover:scale-[1.04] transition-transform duration-300 ease-in-out cursor-pointer select-none`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
          >
            <div className="absolute top-3 left-3 animate-pulse text-yellow-300 text-lg select-none">✨</div>
            <div className="absolute top-3 right-3 animate-ping text-yellow-400 text-lg select-none">✨</div>

            <div className="flex justify-center items-center gap-2 text-yellow-400 font-semibold bg-yellow-900/20 rounded-full px-5 py-2 text-sm shadow-sm select-none">
              <FaClock className="text-xl" />
              <span>
                Starts in: <span className="font-mono">{formatTime(timeLeft.days)}d</span> :{' '}
                <span className="font-mono">{formatTime(timeLeft.hours)}h</span> :{' '}
                <span className="font-mono">{formatTime(timeLeft.minutes)}m</span> :{' '}
                <span className="font-mono">{formatTime(timeLeft.seconds)}s</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-3xl">{course.icon}</div>
              <h3 className="text-2xl font-bold text-white tracking-wide flex-grow">{course.title}</h3>
              <span className="text-xs font-semibold uppercase bg-gradient-to-tr from-yellow-400 to-yellow-300 text-black px-3 py-1 rounded-full shadow-lg animate-pulse select-none">
                {course.badge}
              </span>
            </div>

            <p className="text-gray-300 text-base italic font-medium tracking-wide">
              {course.priceLabel}
            </p>

            <ul className="text-gray-300 text-sm space-y-2 pl-5 list-disc tracking-wide leading-relaxed max-h-40 overflow-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-800">
              {course.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>

            {course.duration && (
              <div className="text-sm text-yellow-400 flex items-center gap-2 font-semibold mt-3 select-none">
                <FaClock className="text-yellow-400" />
                Duration: <span className="text-white">{course.duration}</span>
              </div>
            )}

            {course.id === 'free-course' ? (
              course.action
            ) : (
              <button
                onClick={() => handleJoin(course)}
                className="mt-6 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-black w-full py-3 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg transition-transform transform hover:scale-[1.05] active:scale-95"
                aria-label={`Enroll in ${course.title}`}
              >
                <FaCreditCard className="text-2xl" /> Enroll Now
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-center text-gray-500 italic text-sm select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        After payment, you’ll get mentorship and exclusive content access.
      </motion.p>

      {selectedCourse && (
        <PaymentModal course={selectedCourse} onCancel={() => setSelectedCourse(null)} />
      )}
    </section>
  );
}
