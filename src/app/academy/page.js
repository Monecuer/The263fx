'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCopy } from 'react-icons/fa';
import { useState } from 'react';

export default function PaymentModal({ course, onCancel }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('0776543537');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!course) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 rounded-2xl p-6 w-[90%] max-w-md text-white shadow-2xl relative"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <FaTimes size={18} />
          </button>

          <h2 className="text-2xl font-bold mb-2 text-yellow-400">
            {course.title}
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Price: <span className="text-white font-semibold">${course.price}</span>
          </p>

          <h3 className="text-md font-semibold mb-2 text-white">
            Pay via:
          </h3>
          <div className="flex items-center justify-start gap-4 mb-4">
            <div className="flex flex-col items-center">
              <img src="/ecocash.png" alt="Ecocash" className="w-10 h-10" />
              <p className="text-xs text-gray-300 mt-1">Ecocash</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/inbucks.png" alt="Inbucks" className="w-10 h-10" />
              <p className="text-xs text-gray-300 mt-1">Inbucks</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/binance.png" alt="Binance" className="w-10 h-10" />
              <p className="text-xs text-gray-300 mt-1">Binance</p>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-300 text-center">
            <p className="mb-1">Send to:</p>
            <div className="flex items-center justify-center gap-2">
              <span className="font-semibold text-yellow-400 text-lg">0776543537</span>
              <button
                onClick={handleCopy}
                className="text-sm bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded"
              >
                {copied ? 'Copied!' : <FaCopy />}
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={onCancel}
              className="w-1/2 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // TODO: handle actual payment confirmation
                alert(`Payment confirmed for ${course.title}`);
                onCancel();
              }}
              className="w-1/2 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
