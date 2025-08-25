'use client';
import { motion } from 'framer-motion';
import {
  FaBookOpen, FaSignal, FaHandshake,
  FaTwitter, FaFacebook, FaYoutube, FaTiktok, FaInstagram,
  FaChartLine, FaUser
} from 'react-icons/fa';

export default function Hero() {
  return (
    <>
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
        <div className="absolute inset-0 bg-black/70 z-10" />

        {/* 📝 Foreground Content */}
        <div className="relative z-30 text-center px-6 max-w-3xl">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            AGAIN NEVERTHELESS, I WIN
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-2xl text-gray-200 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Yesterday’s gone — but today’s wisdom fuels tomorrow’s wins.
            You can’t hit rewind, but you can level up now and step into
            a stronger, smarter future.
          </motion.p>

          {/* 🔵 Primary CTAs with icons */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <a
              href="/academy"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105"
            >
              <FaBookOpen /> Join The Academy
            </a>

            <a
              href="/signals"
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <FaSignal /> Subscribe to Signals
            </a>

            <a
              href="https://wa.me/263782286544?text=Hi%20The263Fx%2C%20I%20want%20to%20start%20Copy%20Trading."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <FaHandshake /> Copy Trading
            </a>

            {/* NEW: About page button */}
            <a
              href="/about"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-semibold transition"
              aria-label="About Rony"
            >
              <FaUser /> About Rony
            </a>
          </motion.div>

          {/* 📈 Results (Myfxbook) */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <a
              href="https://www.myfxbook.com/members/The263Fx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
            >
              <FaChartLine /> View Verified Stats on Myfxbook
            </a>
          </motion.div>
        </div>

        {/* 🔗 Social Icons (professional) */}
        <footer className="relative z-30 mt-12 mb-6 flex justify-center space-x-6 text-2xl text-white">
          <SocialIcon href="https://twitter.com/_The263fx_" Icon={FaTwitter} />
          <SocialIcon href="https://www.facebook.com/profile.php?id=61578267111312" Icon={FaFacebook} />
          <SocialIcon href="https://www.youtube.com/@The263Fx" Icon={FaYoutube} />
          <SocialIcon href="https://www.tiktok.com/@the263_fx" Icon={FaTiktok} />
          <SocialIcon href="https://www.instagram.com/the263_fx" Icon={FaInstagram} />
        </footer>
      </section>

      {/* Optional quick links bar */}
      <section className="bg-gray-950 text-gray-300 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-3 items-center justify-center">
          <a href="https://the263fx.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline">
            
          </a>
          <span></span>
          <a href="https://www.myfxbook.com/members/The263Fx/the263fx/11621107" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline">
            System Page
          </a>
          <span>•</span>
          <a href="https://twitter.com/_The263fx_" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline">
            Twitter
          </a>
          <span>•</span>
          <a href="https://www.youtube.com/@The263Fx" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline">
            YouTube
          </a>
          <span>•</span>
          <a href="https://www.instagram.com/the263_fx" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 underline">
            Instagram
          </a>
        </div>
      </section>
    </>
  );
}

/* ✅ Social icon with hover effects */
function SocialIcon({ href, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-125 hover:text-blue-400 transition-transform"
    >
      <Icon />
    </a>
  );
}
