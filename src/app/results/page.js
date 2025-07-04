'use client';
import { motion } from 'framer-motion';

export default function Results() {
  return (
    <section className="min-h-screen bg-black text-white py-20 px-6 text-center">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Student Results
      </motion.h1>
      <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
        The263fx has helped traders worldwide achieve funding and real profits. Here's a glimpse of the success.
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {stats.map((item, i) => (
          <motion.div
            key={item.label}
            className="bg-white/5 rounded-xl border border-white/10 p-6 shadow-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.2 }}
          >
            <h2 className="text-4xl font-bold text-blue-400">{item.value}</h2>
            <p className="mt-2 text-gray-300">{item.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-20 text-sm italic text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Results are real. You can be next.
      </motion.p>
    </section>
  );
}

const stats = [
  { label: 'Total Student Funding', value: '$24M+' },
  { label: 'Students Mentored Globally', value: '2,000+' },
  { label: 'Documented Profits', value: '$6.5M+' },
];
