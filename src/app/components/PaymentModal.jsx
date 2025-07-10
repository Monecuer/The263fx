'use client';

import { FaBitcoin, FaQrcode, FaTimes, FaUpload } from 'react-icons/fa';
import { useState } from 'react';

export default function PaymentModal({ course, onCancel }) {
  const [proof, setProof] = useState(null);

  const handleProofUpload = () => {
    if (!proof) return alert('Please select a file.');
    alert('✅ Proof submitted! We will verify shortly.');
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-xl w-full max-w-md relative">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <p className="mb-4 text-gray-700">
          You're enrolling in <strong>{course.title}</strong> for{' '}
          <span className="text-blue-600 font-semibold">${course.price}</span>
        </p>

        <div className="bg-yellow-100 text-yellow-800 text-sm p-3 rounded mb-4">
          <strong>Send Bitcoin or USDT</strong><br />
          <span className="text-xs break-words">
            <b>BTC Address:</b> 1FfmbHfnpaZjKFvyi1okTjJJusN455paPH<br />
            <b>Binance Tag:</b> elshadaipay
          </span>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Upload Payment Proof</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setProof(e.target.files[0])}
            className="border w-full p-2 rounded text-sm"
          />
        </div>

        <button
          onClick={handleProofUpload}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 w-full rounded flex items-center justify-center gap-2"
        >
          <FaUpload /> Submit Proof
        </button>
      </div>
    </div>
  );
}
