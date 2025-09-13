'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaBars, FaTimes, FaHome, FaPenNib, FaGraduationCap,
  FaChartLine, FaChevronDown
} from 'react-icons/fa';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const handleNavClick = () => setOpen(false);

  return (
    <nav className="fixed w-full top-0 left-0 bg-black bg-opacity-80 backdrop-blur-md z-50 shadow-lg">
      {/* 🔵 Banner */}
      <div className="bg-blue-600 text-white text-center text-sm py-2 px-4">
        <p>
          Hello family 👋 We’ve temporarily removed <b>Log In</b> and <b>Sign Up</b> 
          due to technical challenges. Please contact us directly via Website, 
          WhatsApp, or Email below. 💙 — The263Fx Team
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-white font-semibold text-xl"
          onClick={handleNavClick}
        >
          <Image src="/logo.png" alt="The263Fx Logo" width={32} height={32} />
          <span>The263Fx</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-sm text-white">
          <Link href="/" className="hover:text-blue-400 flex items-center gap-1">
            <FaHome /> Home
          </Link>
          <Link href="/blog" className="hover:text-blue-400 flex items-center gap-1">
            <FaPenNib /> Blog
          </Link>
          <Link href="/results" className="hover:text-blue-400 flex items-center gap-1">
            <FaChartLine /> Results
          </Link>
          <Link href="/academy" className="hover:text-blue-400 flex items-center gap-1">
            <FaGraduationCap /> Academy
          </Link>

          {/* Contact Us Dropdown */}
          <div className="relative">
            <button
              onClick={() => setContactOpen(!contactOpen)}
              className="flex items-center gap-1 px-4 py-1 rounded hover:text-blue-400 transition"
            >
              Contact Us <FaChevronDown className="text-xs" />
            </button>
            {contactOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-black/80 backdrop-blur-md text-white rounded-lg shadow-lg text-sm">
                <a
                  href="https://the263fx.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-blue-600/30"
                >
                  🌐 Website
                </a>
                <a
                  href="https://wa.me/263782286544?text=Hi%20The263Fx%2C%20I%20need%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-blue-600/30"
                >
                  📲 WhatsApp
                </a>
                <a
                  href="mailto:anesuelsha4@gmail.com"
                  className="block px-4 py-2 hover:bg-blue-600/30"
                >
                  📧 Email
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
          aria-label="Toggle Menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black bg-opacity-95 text-white px-6 py-4 space-y-4 transition-all duration-300 ${
          open ? 'block' : 'hidden'
        }`}
      >
        <Link
          href="/"
          onClick={handleNavClick}
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <FaHome /> Home
        </Link>
        <Link
          href="/blog"
          onClick={handleNavClick}
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <FaPenNib /> Blog
        </Link>
        <Link
          href="/results"
          onClick={handleNavClick}
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <FaChartLine /> Results
        </Link>
        <Link
          href="/academy"
          onClick={handleNavClick}
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <FaGraduationCap /> Academy
        </Link>

        {/* Contact Dropdown for Mobile */}
        <div>
          <p className="font-semibold text-blue-400 mt-3">Contact Us</p>
          <a
            href="https://the263fx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-2 py-1 hover:text-blue-400"
          >
            🌐 Website
          </a>
          <a
            href="https://wa.me/263782286544?text=Hi%20The263Fx%2C%20I%20need%20assistance."
            target="_blank"
            rel="noopener noreferrer"
            className="block px-2 py-1 hover:text-blue-400"
          >
            📲 WhatsApp
          </a>
          <a
            href="mailto:anesuelsha4@gmail.com"
            className="block px-2 py-1 hover:text-blue-400"
          >
            📧 Email
          </a>
        </div>
      </div>
    </nav>
  );
}
