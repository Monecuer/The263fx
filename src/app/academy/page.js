'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from 'react-icons/fa';

export default function CoursesSection() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  // Countdown to 19 August 2025
  useEffect(() => {
    const countdownDate = new Date('2025-08-19T00:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
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

  const courses = [
    {
      id: 'free-course',
      title: 'Free Course',
      icon: <FaChalkboardTeacher className="text-blue-400 text-xl" />,
      badge: 'FREE',
      price: 0,
      priceLabel: 'Free',
      duration: null,
      color: 'bg-white/5',
      border: 'border-white/10',
      features: [
        'Why you should trade',
        'How trading benefits you',
        'Why people lose money',
      ],
      action: !showVideo ? (
        <button
          onClick={() => setShowVideo(true)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <FaPlayCircle className="text-lg" /> Join Now
        </button>
      ) : (
        <div className="aspect-video mt-4 rounded-lg overflow-hidden border border-gray-700">
          <div className="w-full h-full bg-black flex items-center justify-center text-gray-500 text-sm italic">
            Free Course Video Coming Soon
          </div>
        </div>
      ),
    },
    {
      id: 'premium-1mo',
      title: '1-Month Premium',
      icon: <FaUserGraduate className="text-yellow-400 text-xl" />,
      badge: '20% OFF',
      price: 48,
      priceLabel: '$48 (Was $60)',
      duration: '1 Month',
      color: 'bg-white/5',
      border: 'border-yellow-400/20',
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
      icon: <FaBrain className="text-purple-400 text-xl" />,
      badge: '36% OFF',
      price: 96,
      priceLabel: '$96 (Was $150)',
      duration: '3 Months',
      color: 'bg-white/5',
      border: 'border-purple-400/20',
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
      icon: <FaStar className="text-yellow-500 text-xl" />,
      badge: '50% OFF',
      price: 375,
      priceLabel: '$375 (Was $750)',
      duration: 'Lifetime',
      color: 'bg-white/5',
      border: 'border-yellow-500/20',
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
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-16 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          The263Fx Course Plans
        </motion.h2>
        <motion.p
          className="text-gray-400 text-md max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Transform your trading with structured programs designed for success.
        </motion.p>
      </div>

      {/* Course Cards */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            className={`${course.color} ${course.border} p-6 rounded-2xl shadow-lg backdrop-blur-md space-y-4 relative overflow-hidden`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Glitter */}
            <div className="absolute top-1 left-1 animate-pulse text-yellow-300 text-xs">✨</div>
            <div className="absolute top-1 right-2 animate-ping text-yellow-400 text-xs">✨</div>

            {/* Countdown */}
            <div className="text-yellow-400 font-bold text-center flex items-center justify-center gap-2">
              <FaClock className="text-lg" />
              <span>
                Starts in: {formatTime(timeLeft.days)}d : {formatTime(timeLeft.hours)}h :{' '}
                {formatTime(timeLeft.minutes)}m : {formatTime(timeLeft.seconds)}s
              </span>
            </div>

            <div className="flex items-center gap-3">
              {course.icon}
              <h3 className="text-xl font-semibold text-white">{course.title}</h3>
              <span className="ml-auto bg-white/10 text-xs px-3 py-1 rounded-full">
                {course.badge}
              </span>
            </div>
            <p className="text-gray-400 text-sm italic">{course.priceLabel}</p>

            <ul className="text-gray-300 text-sm space-y-1 pl-4 list-disc">
              {course.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>

            {course.duration && (
              <div className="text-sm text-gray-400 flex items-center gap-2 mt-2">
                <FaClock className="text-yellow-400" />
                Duration: <span className="text-white font-semibold">{course.duration}</span>
              </div>
            )}

            {course.id === 'free-course' ? (
              course.action
            ) : (
              <button
                onClick={() => handleJoin(course)}
                className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <FaCreditCard className="text-lg" /> Enroll Now
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer Text */}
      <motion.p
        className="text-center text-gray-500 italic text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        After payment, you'll get mentorship and exclusive content access.
      </motion.p>

      {/* Modal */}
      {selectedCourse && (
        <PaymentModal
          course={selectedCourse}
          onCancel={() => setSelectedCourse(null)}
        />
      )}
    </section>
  );
}
