'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-black">

      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/candlesticks.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔳 Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 📊 Animated Signal Bars */}
      <div className="absolute inset-0 z-20 flex items-end justify-center gap-[2px] px-10 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 20 }}
            animate={{ height: [20, 100, 40, 80, 20] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'mirror',
              delay: i * 0.08,
            }}
            className={`w-[2px] rounded-sm ${
              i % 2 === 0 ? 'bg-green-400' : 'bg-red-500'
            }`}
          />
        ))}
      </div>

      {/* 📝 Foreground Content */}
      <div className="relative z-30 text-center px-6 max-w-3xl">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_3px_10px_rgba(255,255,255,0.9)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Stop Losing. Start Winning.
        </motion.h1>

        <motion.p
          className="mt-4 text-xl md:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          ‘No BS’ Trading education responsible for{' '}
          <span className="text-blue-400 font-bold">
            <CountUp end={24000000} duration={4} prefix="$" separator="," />+
          </span>{' '}
          student success.
        </motion.p>

        <motion.a
          href="/academy"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          Join The Academy
        </motion.a>

        {/* 📊 Stats Moved BELOW Button */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-6 text-white font-medium text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <Stat label="Global Students" value={2000} suffix="+" />
          <Stat label="Student Profits" value={6500000} prefix="$" />
          <Stat label="Funding Raised" value={20000000} prefix="$" />
        </motion.div>
      </div>

      {/* 🔗 Social Icons */}
      <footer className="relative z-30 mt-12 mb-6 flex justify-center space-x-6">
        <SocialIcon href="https://twitter.com/jeafx" src="/icons/twitter.svg" alt="Twitter" />
        <SocialIcon href="https://facebook.com/jeafx" src="/icons/facebook.svg" alt="Facebook" />
        <SocialIcon href="https://youtube.com/jeafx" src="/icons/youtube.svg" alt="YouTube" />
        <SocialIcon href="https://tiktok.com/@jeafx" src="/icons/tiktok.svg" alt="TikTok" />
      </footer>
    </section>
  );
}

function Stat({ label, value, prefix = '', suffix = '' }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-blue-400">
        <CountUp end={value} duration={3} prefix={prefix} suffix={suffix} separator="," />
      </div>
      <div className="text-sm text-white">{label}</div>
    </div>
  );
}

function SocialIcon({ href, src, alt }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition-transform"
    >
      <Image src={src} alt={alt} width={30} height={30} />
    </a>
  );
}
