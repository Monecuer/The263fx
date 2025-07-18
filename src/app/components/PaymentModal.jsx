'use client';

import { useState } from 'react';
import { FaTimes, FaUpload, FaBitcoin } from 'react-icons/fa';
import { SiEcocash, SiInnbucks } from 'react-icons/si';

export default function PaymentModal({ course, onCancel }) {
  const [proof, setProof] = useState(null);
  const [method, setMethod] = useState('bitcoin');

  const handleProofUpload = () => {
    if (!proof) return alert('⚠️ Please select a file first.');
    alert('✅ Proof submitted! We will verify and get back to you shortly.');
    onCancel();
  };

  const paymentDetails = {
    bitcoin: {
      label: 'Bitcoin / USDT',
      details: (
        <>
          <b>BTC Address:</b> 1FfmbHfnpaZjKFvyi1okTjJJusN455paPH<br />
          <b>Binance Tag:</b> elshadaipay
        </>
      ),
      icon: <FaBitcoin className="text-orange-500 text-xl" />,
    },
    ecocash: {
      label: 'EcoCash',
      details: (
        <>
          <b>Number:</b> +263 77 123 4567<br />
          <b>Name:</b> Elshadai FX
        </>
      ),
      icon: <SiEcocash className="text-green-500 text-xl" />,
    },
    innbucks: {
      label: 'Innbucks',
      details: (
        <>
          <b>Username:</b> elshadaifx<br />
          <b>Number:</b> +263 78 123 4567
        </>
      ),
      icon: <SiInnbucks className="text-blue-500 text-xl" />,
    },
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-2xl w-full max-w-md relative shadow-lg">
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

        <div className="mb-4">
          <label className="block font-semibold mb-1">Select Payment Method:</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(paymentDetails).map((key) => {
              const { label, icon } = paymentDetails[key];
              return (
                <button
                  key={key}
                  onClick={() => setMethod(key)}
                  className={`flex flex-col items-center border p-2 rounded-lg ${
                    method === key ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
                  }`}
                >
                  {icon}
                  <span className="text-xs mt-1">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-100 p-3 rounded mb-4 text-sm text-gray-700">
          <strong>{paymentDetails[method].label} Details</strong>
          <div className="mt-1">{paymentDetails[method].details}</div>
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
