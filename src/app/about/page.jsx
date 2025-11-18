'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTwitter, FaYoutube, FaInstagram, FaTiktok, FaFacebook, FaChartLine, FaHandshake } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Header */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div>
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Meet Rony — The263Fx
            </motion.h1>
            <motion.p
              className="mt-4 text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              From humble beginnings to disciplined trading — building a community
              that learns, executes, and grows together. The message is simple:
              <span className="font-semibold text-white"> Again Nevertheless, I Win.</span>
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <Outbound href="https://www.myfxbook.com/members/The263Fx">
                <FaChartLine /> Myfxbook Stats
              </Outbound>
              <Outbound href="https://wa.me/263775001909?text=Hi%20The263Fx%2C%20I%20want%20to%20talk.">
                <FaHandshake /> Chat on WhatsApp
              </Outbound>
            </motion.div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden ring-2 ring-white/20 shadow-2xl">
              <Image
                src="/videos/ron.jpg" // <-- replace with a real photo path
                alt="Rony — The263Fx"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <Card title="The Journey">
            I learned through pressure: rejection, tough bosses, and late nights.
            Instead of breaking, the fire refined discipline. Now I teach traders
            to win the right way — with patience, risk control, and consistent habits.
          </Card>
          <Card title="What I Do">
            Mentorship, signals, copy trading, and a growing academy that puts education
            first. I don’t sell dreams — I build disciplined traders who can stand by
            their results.
          </Card>
        </div>
      </section>

      {/* Socials */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Follow The263Fx</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <Outbound href="https://twitter.com/_The263fx_"><FaTwitter /> Twitter</Outbound>
            <Outbound href="https://www.youtube.com/@The263Fx"><FaYoutube /> YouTube</Outbound>
            <Outbound href="https://www.instagram.com/the263_fx"><FaInstagram /> Instagram</Outbound>
            <Outbound href="https://www.tiktok.com/@the263_fx"><FaTiktok /> TikTok</Outbound>
            <Outbound href="https://www.facebook.com/profile.php?id=61578267111312"><FaFacebook /> Facebook</Outbound>
          </div>
        </div>
      </section>
    </main>
  );
}

function Outbound({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15"
    >
      {children}
    </a>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-lg font-semibold">{title}</div>
      <p className="text-white/75 mt-2 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
