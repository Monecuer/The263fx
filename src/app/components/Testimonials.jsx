import React from "react";
import { FaWhatsapp, FaFacebookF, FaTiktok, FaYoutube, FaGlobe } from "react-icons/fa";

export default function Testimonials() {
  return (
    <section className="relative bg-[#0a0a0a] text-white py-20 px-6 overflow-hidden text-center">
      {/* ✅ Background logo from /public/videos */}
      <img
        src="/videos/123.png"
        alt="Logo Watermark"
        className="absolute opacity-5 inset-0 w-full h-full object-contain pointer-events-none select-none"
      />

      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400 max-w-3xl mx-auto">
          Your First $1K Trading Forex - 1 Week Marathon
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mt-10 text-left">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">What We Offer</h3>
            <ul className="text-gray-300 list-disc pl-6 space-y-1">
              <li>Copy Trading</li>
              <li>Signals</li>
              <li>Account Management</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Our Brokers</h3>
            <ul className="text-gray-300 list-disc pl-6 space-y-1">
              <li>WELTRADE</li>
              <li>XM Global</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Synergistic Pairs</h3>
            <ul className="text-gray-300 list-disc pl-6 space-y-1">
              <li>XAUUSD</li>
              <li>GBPUSD</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Requirements</h3>
            <ul className="text-gray-300 list-disc pl-6 space-y-1">
              <li>Open an account with our links</li>
              <li>Fund with at least $50</li>
              <li>Choose a plan</li>
            </ul>
          </div>
        </div>

        {/* 🔗 CONTACT ICONS */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Connect with Us</h3>
          <div className="flex justify-center space-x-6 text-3xl text-gray-300">
            <a
              href="https://wa.me/263776543537"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://facebook.com/The263fx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.tiktok.com/@The263fx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-pink-500 transition"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.youtube.com/c/The263fx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-red-500 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="https://The263fx.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="hover:text-blue-300 transition"
            >
              <FaGlobe />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
