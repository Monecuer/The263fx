'use client';

import { FaBitcoin, FaTimes, FaUpload } from 'react-icons/fa';
import { SiEcocash, SiBinance } from 'react-icons/si';
import { useState } from 'react';

export default function PaymentModal({ course, onCancel }) {
  const [proof, setProof] = useState(null);

  const handleProofUpload = () => {
    if (!proof) {
      alert('❌ Please select a file first.');
      return;
    }
    alert('✅ Proof submitted! We will verify and enroll you.');
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        {/* ❌ Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>

        {/* 🔥 Header */}
        <h2 className="text-2xl font-bold mb-2 text-center">{course.title}</h2>
        <p className="text-center mb-4 text-gray-600">
          Enroll for <span className="text-blue-600 font-semibold">${course.price}</span>
        </p>

        {/* 💳 Payment Methods */}
        <div className="space-y-3 text-sm text-gray-800">
          <div className="bg-gray-100 p-3 rounded">
            <div className="flex items-center gap-2 font-semibold mb-1">
              <FaBitcoin className="text-yellow-500" />
              Bitcoin / USDT (Preferred)
            </div>
            <p><b>BTC Address:</b> 1FfmbHfnpaZjKFvyi1okTjJJusN455paPH</p>
            <p><b>Binance Tag:</b> elshadaipay</p>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            <div className="flex items-center gap-2 font-semibold mb-1">
              <SiEcocash className="text-green-600" />
              EcoCash
            </div>
            <p><b>Number:</b> +263 77 123 4567</p>
            <p><b>Name:</b> Eshadai Trust</p>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            <div className="flex items-center gap-2 font-semibold mb-1">
              <SiBinance className="text-blue-600" />
              Inbucks
            </div>
            <p><b>Username:</b> elshadaipay</p>
          </div>
        </div>

        {/* 📤 Upload Proof */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Upload Payment Proof</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setProof(e.target.files[0])}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        {/* ✅ Submit Button */}
        <button
          onClick={handleProofUpload}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-2 rounded flex items-center justify-center gap-2"
        >
          <FaUpload /> Submit Proof
        </button>
      </div>
    </div>
  );
}
