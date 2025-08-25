'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaChalkboardTeacher,
  FaSignal,
  FaBrain,
  FaRocket,
  FaClock,
  FaUserGraduate,
  FaChartLine,
  FaShieldAlt,
  FaWhatsapp,
} from 'react-icons/fa';

const tiers = [
  {
    id: 'free',
    title: 'Free Starter',
    price: 'US$0',
    badge: 'FREE',
    gradient: 'from-blue-700/60 to-blue-500/40',
    border: 'border-blue-400',
    icon: <FaChalkboardTeacher className="text-2xl" />,
    bullets: [
      'Why you should trade',
      'How trading benefits you',
      'Why people lose money',
    ],
    href: '/login', // or direct video when ready
    cta: 'Start Free',
  },
  {
    id: 'basic',
    title: '1-Month Premium',
    price: 'US$48',
    badge: '20% OFF',
    gradient: 'from-cyan-700/60 to-cyan-500/40',
    border: 'border-cyan-400',
    icon: <FaUserGraduate className="text-2xl" />,
    bullets: [
      'Intro to Markets',
      'Winning Strategy',
      'Demo → Real transition',
      'Includes Starter',
    ],
    href: 'https://wa.me/263787260086?text=I%20want%201-Month%20Premium',
    cta: 'Enroll (WhatsApp)',
  },
  {
    id: 'pro',
    title: '3-Month Mastery',
    price: 'US$96',
    badge: '36% OFF',
    gradient: 'from-purple-700/60 to-purple-500/40',
    border: 'border-purple-400',
    icon: <FaBrain className="text-2xl" />,
    bullets: [
      'Mindset & Psychology',
      'Fundamental + Technical',
      'Trade With Us',
      'Prop Firm Prep',
    ],
    href: 'https://wa.me/263787260086?text=I%20want%203-Month%20Mastery',
    cta: 'Enroll (WhatsApp)',
  },
  {
    id: 'elite',
    title: 'Lifetime Elite',
    price: 'US$375',
    badge: '50% OFF',
    gradient: 'from-amber-700/60 to-amber-500/40',
    border: 'border-amber-400',
    icon: <FaRocket className="text-2xl" />,
    bullets: [
      'All Courses + Advanced',
      'Strategy Creation',
      'Signals Included',
      'Get Funded ($10k)',
    ],
    href: 'https://wa.me/263787260086?text=I%20want%20Lifetime%20Elite',
    cta: 'Enroll (WhatsApp)',
  },
];

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The263Fx Academy
          </motion.h1>
          <motion.p
            className="mt-3 text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Structured programs that take you from foundation to funded —
            with mentorship, mindset, and disciplined execution.
          </motion.p>

          <motion.div
            className="mt-4 inline-flex items-center gap-2 text-blue-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <FaChartLine />
            <a
              href="https://www.myfxbook.com/members/The263Fx"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-200"
            >
              View verified stats on Myfxbook
            </a>
          </motion.div>
        </div>
      </section>

      {/* Payments Row */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="text-white/70">We accept:</span>
          <Badge text="EcoCash" />
          <Badge text="Inbucks" />
          <Badge text="Binance" />
          <Badge text="Visa" />
          <Badge text="Mastercard" />
          <span className="text-white/50">|</span>
          <a
            href="https://wa.me/263787260086?text=Hi%20The263Fx%2C%20I%20want%20to%20enroll."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700"
          >
            <FaWhatsapp /> Chat to Enroll
          </a>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((t, i) => (
            <motion.div
              key={t.id}
              className={`relative rounded-3xl border-2 ${t.border} p-6 shadow-2xl bg-gradient-to-br ${t.gradient} backdrop-blur-xl`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="absolute -top-3 -right-3 text-xs font-bold uppercase bg-white text-black px-3 py-1 rounded-full shadow">
                {t.badge}
              </div>

              <div className="flex items-center gap-3 text-amber-300">
                <div className="text-2xl">{t.icon}</div>
                <h3 className="text-xl font-semibold text-white">{t.title}</h3>
              </div>

              <div className="mt-3 text-3xl font-extrabold text-white">{t.price}</div>

              <ul className="mt-4 space-y-2 text-white/90 text-sm">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <FaShieldAlt className="opacity-70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href={t.href}
                target={t.href.startsWith('http') ? '_blank' : undefined}
                rel={t.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="mt-6 inline-flex items-center justify-center w-full gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-3 font-semibold"
              >
                <FaWhatsapp /> {t.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <Step icon={<FaChalkboardTeacher />} title="Learn by Doing" text="Short, actionable lessons. Review, journal, and iterate." />
          <Step icon={<FaClock />} title="Accountability" text="Weekly check-ins, risk limits, and progress tracking." />
          <Step icon={<FaSignal />} title="Trade with Structure" text="From demo to real, with clear entries, SL and TP." />
        </div>
      </section>
    </main>
  );
}

function Badge({ text }) {
  return (
    <span className="px-3 py-1 rounded-lg bg-white/10">{text}</span>
  );
}

function Step({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-2xl text-blue-300">{icon}</div>
      <div className="mt-2 text-lg font-semibold">{title}</div>
      <p className="text-white/70 text-sm">{text}</p>
    </div>
  );
}
