'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavClick = () => setOpen(false); // Close menu when a link is clicked

  return (
    <nav className="fixed w-full top-0 bg-black bg-opacity-70 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center space-x-2 text-white" onClick={handleNavClick}>
          <Image src="/logo.png" alt="The263Fx Logo" width={32} height={32} />
          <span className="text-2xl font-bold">The263Fx</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm text-white items-center">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/results">Results</Link>
          <Link href="/academy">Academy</Link>
          <Link href="/login" className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700">
            Log In
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
          aria-label="Toggle Menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black bg-opacity-95 text-white px-6 py-4 space-y-4 transition-all ease-in-out duration-300">
          <Link href="/" onClick={handleNavClick}>Home</Link>
          <Link href="/blog" onClick={handleNavClick}>Blog</Link>
          <Link href="/results" onClick={handleNavClick}>Results</Link>
          <Link href="/academy" onClick={handleNavClick}>Academy</Link>
          <Link
            href="/login"
            onClick={handleNavClick}
            className="inline-block bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Log In
          </Link>
        </div>
      )}
    </nav>
  );
}
