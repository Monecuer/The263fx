'use client';

import { useState } from 'react';
import { FaBitcoin, FaTimes, FaUpload } from 'react-icons/fa';
import { SiEcocash, SiBinance } from 'react-icons/si';

export default function PaymentModal({ course, onClose }) {
  const [proof, setProof] = useState(null);

  const handleSubmit = () => {
    if (!proof) {
      alert('❌ Please upload payment proof.');
      return;
    }
    alert('✅ Payment proof submitted! You’ll be enrolled soon.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <FaTimes size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-2 text-center">{course.title}</h2>
        <p className="text-center text-gray-600 mb-4">
          Enroll for <span className="text-blue-600 font-semibold">${course.price}</span>
        </p>

        {/* Payment options */}
        <div className="space-y-3 text-sm">
          <div className="bg-gray-100 p-3 rounded">
            <div className="flex items-center gap-2 font-semibold mb-1">
              <FaBitcoin className="text-yellow-500" />
              Bitcoin / USDT
            </div>
            <p><b>BTC:</b> 1FfmbHfnpaZjKFvyi1okTjJJusN455paPH</p>
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

        {/* File Upload */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Upload Payment Proof</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setProof(e.target.files[0])}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 w-full rounded flex justify-center items-center gap-2"
        >
          <FaUpload />
          Submit Proof
        </button>
      </div>
    </div>
  );
}
