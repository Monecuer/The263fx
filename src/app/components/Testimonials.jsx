import React from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaGlobe
} from "react-icons/fa";

export default function Testimonials() {
  return (
    <section className="relative bg-[#0a0a0a] text-white py-20 px-6 overflow-hidden text-center">
      {/* ✅ Watermark logo */}
      <img
        src="/videos/123.png"
        alt="Logo Watermark"
        className="absolute opacity-5 inset-0 w-full h-full object-contain pointer-events-none select-none"
      />

      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400 max-w-3xl mx-auto">
          Your First $1K Trading Forex - 1 Week Marathon
        </h2>

        {/* ✅ What We Offer and Synergistic Pairs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mt-10 text-left">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">What We Offer</h3>
            <ul className="text-gray-300 list-disc pl-6 space-y-1">
              <li>Copy Trading</li>
              <li>Signals</li>
            
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Synergistic Pairs</h3>
            <ul className="text-gray-300 list-disc pl-6 space-y-1">
              <li>XAUUSD</li>
              <li>GBPUSD</li>
            </ul>
          </div>
        </div>

        {/* ✅ Brokers Logos */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-white mb-6">Our Trusted Brokers</h3>
          <div className="flex justify-center gap-8 md:gap-16 flex-wrap items-center">
            {/* Weltrade */}
            <a
              href="https://track.gowt.me/visit/?bta=44424&brand=weltrade"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-blue-100 p-3 md:p-4 rounded-lg shadow-md transition transform hover:scale-105"
            >
              <img
                src="/brokers/weltrade-logo.png"
                alt="Weltrade"
                className="w-24 md:w-28 h-auto object-contain"
              />
            </a>

            {/* XM Global */}
            <a
              href="https://affs.click/rvrrk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-red-100 p-3 md:p-4 rounded-lg shadow-md transition transform hover:scale-105"
            >
              <img
                src="/brokers/xm-logo.png"
                alt="XM Global"
                className="w-20 md:w-24 h-auto object-contain"
              />
            </a>
          </div>
        </div>

        {/* ✅ Contact Icons */}
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
