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

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

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
      time: '[8/7/2025 10:32]',
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
          <div className="w-full h-full bg-black flex items-center justify-center text-gray-600 text-sm italic">
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

      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            className={`${course.color} ${course.border} p-6 rounded-2xl shadow-lg backdrop-blur-md space-y-4`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
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
                Duration:{' '}
                <span className="text-white font-semibold">{course.duration}</span>
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

      {/* Payment Note */}
      <motion.p
        className="text-center text-gray-500 italic text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        After payment, you'll get mentorship and exclusive content.
      </motion.p>

      {/* Payment Details */}
      <motion.div
        className="text-center space-y-4 mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-semibold text-white">Payment Methods</h3>
        <p className="text-gray-400">Use any of the following to make payment:</p>

        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src="/ecocash.png"
              alt="Ecocash"
              className="w-12 h-12 object-contain"
            />
            <p className="text-white text-sm mt-2">Ecocash</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src="/inbucks.png"
              alt="Inbucks"
              className="w-12 h-12 object-contain"
            />
            <p className="text-white text-sm mt-2">Inbucks</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src="/binance.png"
              alt="Binance"
              className="w-12 h-12 object-contain"
            />
            <p className="text-white text-sm mt-2">Binance</p>
          </motion.div>
        </div>

        <div className="mt-4 text-gray-300">
          <p>Send to:</p>
          <p className="font-bold text-xl text-yellow-400">0776543537</p>
        </div>
      </motion.div>

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
