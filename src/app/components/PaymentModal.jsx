'use client';

import { useState } from 'react';
import { FaBitcoin, FaTimes, FaUpload } from 'react-icons/fa';
import { SiEcocash, SiBinance } from 'react-icons/si';

export default function PaymentModal({ course, onCancel }) {
  const [proof, setProof] = useState(null);

  const handleSubmit = () => {
    if (!proof) {
      alert('❌ Please upload payment proof.');
      return;
    }
    alert('✅ Proof submitted! We’ll verify and contact you.');
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative text-black">
        {/* Close */}
        <button onClick={onCancel} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <FaTimes size={18} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-1">{course.title}</h2>
        <p className="text-gray-700 mb-4">
          Enrolling for <span className="text-blue-600 font-semibold">${course.price}</span>
        </p>

        {/* BTC Section */}
        <div className="bg-gray-100 p-3 rounded mb-3">
          <div className="flex items-center gap-2 font-semibold text-yellow-600 mb-1">
            <FaBitcoin /> Bitcoin / USDT
          </div>
          <p className="text-sm"><b>BTC:</b> 1FfmbHfnpaZjKFvyi1okTjJJusN455paPH</p>
          <p className="text-sm"><b>Binance Tag:</b> elshadaipay</p>
        </div>

        {/* EcoCash */}
        <div className="bg-gray-100 p-3 rounded mb-3">
          <div className="flex items-center gap-2 font-semibold text-green-700 mb-1">
            <SiEcocash /> EcoCash
          </div>
          <p className="text-sm"><b>Number:</b> +263 77 123 4567</p>
          <p className="text-sm"><b>Name:</b> Eshadai Trust</p>
        </div>

        {/* Inbucks */}
        <div className="bg-gray-100 p-3 rounded mb-4">
          <div className="flex items-center gap-2 font-semibold text-blue-700 mb-1">
            <SiBinance /> Inbucks
          </div>
          <p className="text-sm"><b>Username:</b> elshadaipay</p>
        </div>

        {/* Upload proof */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upload Payment Proof</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setProof(e.target.files[0])}
            className="border p-2 w-full rounded text-sm"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 w-full rounded flex items-center justify-center gap-2"
        >
          <FaUpload /> Submit Proof
        </button>
      </div>
    </div>
  );
}
