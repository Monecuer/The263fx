// src/components/WhatsappSupport.jsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsappSupport() {
  return (
    <a
      href="https://wa.me/263775007225"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
