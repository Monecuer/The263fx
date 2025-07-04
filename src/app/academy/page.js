'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Academy() {
  return (
    <section className="min-h-screen bg-black text-white py-20 px-6 flex flex-col items-center justify-center text-center">
      
      {/* Hero Section */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold max-w-3xl leading-tight"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        The263fx Trading Academy
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-2xl text-blue-100 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Learn the exact system used by traders to generate over $24M+ in funding and profits. Build consistency, confidence, and a career in the markets.
      </motion.p>

      <motion.a
        href="/join"
        className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Join The Academy Now
      </motion.a>

      {/* Feature Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {features.map((item, i) => (
          <motion.div
            key={item.title}
            className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-300">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer Testimonial */}
      <motion.p
        className="mt-20 text-gray-400 text-sm italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        “This is where your real trading journey begins — raw, real, profitable.” — The263fx Team
      </motion.p>
    </section>
  );
}

// Features specific to your brand
const features = [
  {
    title: 'Smart Technical Analysis',
    description: 'Master structure, trend, entries, and exits like a pro using real-time setups.',
  },
  {
    title: 'Funding Ready',
    description: 'Pass prop firm challenges and get funded with capital up to $200K.',
  },
  {
    title: 'Daily Trade Guidance',
    description: 'Get daily feedback, setups, and analysis inside our private mentorship space.',
  },
];
