'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}

function Hero() {
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

      {/* 📝 Foreground Content */}
      <div className="relative z-30 text-center px-6 max-w-3xl">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_3px_10px_rgba(255,255,255,0.9)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          AGAIN NEVERTHELESS, I WIN
        </motion.h1>

        <motion.p
          className="mt-4 text-xl md:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
         Yesterday’s gone—but today’s wisdom fuels tomorrow’s wins. You can’t hit rewind, but you can level up now and step into a stronger, smarter future.
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
      </div>

      {/* 🔗 Social Icons */}
      <footer className="relative z-30 mt-12 mb-6 flex justify-center space-x-6">
        <SocialIcon href="https://twitter.com/the263fx" src="/icons/twitter.svg" alt="Twitter" />
        <SocialIcon href="https://facebook.com/the263fx" src="/icons/facebook.svg" alt="Facebook" />
        <SocialIcon href="https://youtube.com/the263fx" src="/icons/youtube.svg" alt="YouTube" />
        <SocialIcon href="https://tiktok.com/@the263fx" src="/icons/tiktok.svg" alt="TikTok" />
      </footer>
    </section>
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
