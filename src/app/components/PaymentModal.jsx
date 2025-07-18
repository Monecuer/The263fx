'use client';

import { FaBitcoin, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';

export default function PaymentModal({ course, onCancel }) {
  const [proof, setProof] = useState(null);

  const handleWhatsAppSubmit = () => {
    if (!proof) {
      alert('❗ Please select a payment proof file first.');
      return;
    }

    const phoneNumber = '263775007225';
    const message = `Hello, I have paid for the course "${course.title}" worth $${course.price}. Please find the proof attached.`;

    // Open WhatsApp Web or mobile
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 px-4">
      <div className="bg-white text-black p-6 rounded-2xl w-full max-w-lg relative shadow-lg">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
        <p className="mb-4 text-gray-700">
          Enroll in <strong>{course.title}</strong> for{' '}
          <span className="text-blue-600 font-semibold">${course.price}</span>
        </p>

        {/* Payment Methods */}
        <div className="space-y-4">
          {/* EcoCash */}
          <div className="bg-green-100 p-3 rounded">
            <div className="flex items-center gap-2 mb-1 text-green-700 font-semibold">
              <Image src="/logo/ecocash__zoom-1.png" width={24} height={24} alt="EcoCash" />
              EcoCash
            </div>
            <p className="text-sm text-gray-800">
              Send to <strong>0776543537</strong> (Ronald Muromo)
            </p>
          </div>

          {/* Inbucks */}
          <div className="bg-indigo-100 p-3 rounded">
            <div className="flex items-center gap-2 mb-1 text-indigo-700 font-semibold">
              <Image src="/logo/inbucks.png" width={24} height={24} alt="Inbucks" />
              Inbucks
            </div>
            <p className="text-sm text-gray-800">
              Send to <strong>0776543537</strong> (Ronald Muromo)
            </p>
          </div>

          {/* Binance */}
          <div className="bg-yellow-100 p-3 rounded">
            <div className="flex items-center gap-2 mb-1 text-yellow-700 font-semibold">
              <Image src="/logo/binance.png" width={24} height={24} alt="Binance" />
              Binance / USDT
            </div>
            <p className="text-sm">
              <b>Wallet:</b> 0x49234125183846fa812f2d9d13848055da860f21
            </p>
          </div>
        </div>

        {/* Upload Proof */}
        <div className="mt-5">
          <label className="block text-sm font-medium mb-1">
            Upload Payment Proof
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setProof(e.target.files[0])}
            className="border border-gray-300 w-full p-2 rounded text-sm mb-3"
          />
        </div>

        <button
          onClick={handleWhatsAppSubmit}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 w-full rounded flex items-center justify-center gap-2"
        >
          <FaWhatsapp /> Submit via WhatsApp
        </button>
      </div>
    </div>
  );
}
