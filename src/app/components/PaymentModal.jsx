import {
  FaBitcoin,
  FaQrcode,
  FaTimes,
  FaUpload,
  FaMoneyBillWave
} from 'react-icons/fa';
import { useState } from 'react';
import { SiEcocash, SiBinance } from 'react-icons/si';
import { GiReceiveMoney } from 'react-icons/gi';

export default function PaymentModal({ course, onCancel }) {
  const [proof, setProof] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProofUpload = () => {
    if (!proof) return alert('❗Please select a file.');

    setIsLoading(true);

    // Simulate upload delay
    setTimeout(() => {
      setIsLoading(false);
      alert('✅ Payment proof submitted! We will verify it shortly.');
      onCancel();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-xl w-full max-w-md relative shadow-lg">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">{course.title}</h2>
        <p className="mb-4 text-gray-700 text-center">
          You're enrolling in <strong>{course.title}</strong> for{' '}
          <span className="text-blue-600 font-semibold">${course.price}</span>
        </p>

        <div className="space-y-4 text-sm">
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md">
            <p className="flex items-center gap-2 font-bold">
              <FaBitcoin /> Bitcoin / USDT (Binance)
            </p>
            <p className="ml-6 text-xs">
              <b>BTC Address:</b> 1FfmbHfnpaZjKFvyi1okTjJJusN455paPH <br />
              <b>Binance Tag:</b> elshadaipay
            </p>
          </div>

          <div className="bg-green-100 text-green-800 p-3 rounded-md">
            <p className="flex items-center gap-2 font-bold">
              <SiEcocash /> EcoCash (ZIM)
            </p>
            <p className="ml-6 text-xs">
              <b>Send to:</b> +263 78 333 0000
            </p>
          </div>

          <div className="bg-blue-100 text-blue-800 p-3 rounded-md">
            <p className="flex items-center gap-2 font-bold">
              <GiReceiveMoney /> Innbucks
            </p>
            <p className="ml-6 text-xs">
              <b>Tag:</b> elshadaipay
            </p>
          </div>
        </div>

        <div className="my-4">
          <label className="block text-sm font-medium mb-1">
            Upload Payment Proof
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setProof(e.target.files[0])}
            className="border w-full p-2 rounded text-sm"
          />
        </div>

        <button
          onClick={handleProofUpload}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 w-full rounded flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            <>
              <FaUpload /> Submit Proof
            </>
          )}
        </button>
      </div>
    </div>
  );
}

