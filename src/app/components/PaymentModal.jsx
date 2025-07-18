'use client';

import { FaBitcoin, FaTimes, FaUpload, FaMoneyBillWave } from 'react-icons/fa';
import { useState } from 'react';

export default function PaymentModal({ course, onCancel }) {
  const [proof, setProof] = useState(null);

  const handleProofUpload = () => {
    if (!proof) return alert('❗ Please select a payment proof file.');
    alert('✅ Proof submitted successfully! We will verify and contact you.');
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
              <FaMoneyBillWave /> EcoCash
            </div>
            <p className="text-sm text-gray-800">
              Send to <strong>0772 123 456</strong> (Elshadai Pay)
            </p>
          </div>

          {/* Inbucks */}
          <div className="bg-indigo-100 p-3 rounded">
            <div className="flex items-center gap-2 mb-1 text-indigo-700 font-semibold">
              <FaMoneyBillWave /> Inbucks
            </div>
            <p className="text-sm text-gray-800">
              Send to <strong>0782 987 654</strong> (Elshadai Pay)
            </p>
          </div>

          {/* Bitcoin / Binance */}
          <div className="bg-yellow-100 p-3 rounded">
            <div className="flex items-center gap-2 mb-1 text-yellow-700 font-semibold">
              <FaBitcoin /> Bitcoin / USDT
            </div>
            <p className="text-sm">
              <b>BTC Address:</b> 1FfmbHfnpaZjKFvyi1okTjJJusN455paPH<br />
              <b>Binance Tag:</b> elshadaipay
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
          onClick={handleProofUpload}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 w-full rounded flex items-center justify-center gap-2"
        >
          <FaUpload /> Submit Proof
        </button>
      </div>
    </div>
  );
}
