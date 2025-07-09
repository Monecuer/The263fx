'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaBars, FaTimes, FaHome, FaPenNib, FaGraduationCap,
  FaChartLine, FaSignInAlt, FaUserPlus
} from 'react-icons/fa';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleNavClick = () => setOpen(false);

  return (
    <nav className="fixed w-full top-0 left-0 bg-black bg-opacity-80 backdrop-blur-md z-50 shadow-lg">
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
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded transition flex items-center gap-1"
          >
            <FaSignInAlt /> Log In
          </Link>
          <Link
            href="/signup"
            className="border border-white hover:border-blue-400 hover:text-blue-400 px-4 py-1 rounded transition flex items-center gap-1"
          >
            <FaUserPlus /> Sign Up
          </Link>
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
        <Link
          href="/login"
          onClick={handleNavClick}
          className="block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-center flex items-center justify-center gap-2"
        >
          <FaSignInAlt /> Log In
        </Link>
        <Link
          href="/signup"
          onClick={handleNavClick}
          className="block border border-white hover:border-blue-400 hover:text-blue-400 px-4 py-2 rounded text-center flex items-center justify-center gap-2"
        >
          <FaUserPlus /> Sign Up
        </Link>
      </div>
    </nav>
  );
}
