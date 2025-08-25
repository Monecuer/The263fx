'use client';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import QRCode from 'qrcode.react';
import { useState } from 'react';
import { FaCreditCard, FaQrcode, FaWallet, FaUpload } from 'react-icons/fa';

export default function CoursePayment({ user }) {
  const [showCrypto, setShowCrypto] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const flutterConfig = {
    public_key: process.env.NEXT_PUBLIC_FLW_KEY,
    tx_ref: Date.now(),
    amount: 48,
    currency: 'USD',
    payment_options: 'card',
    customer: { email: user.email, name: user.name },
    customizations: { title: 'The263Fx Premium Course', description: '1‑Month Course', logo: '/logo.png' },
  };

  const handleCard = useFlutterwave(flutterConfig);

  const binanceQR = 'https://api.binance.com/your-generated-qrcode-url';
  const btcAddress = '1FfmbHfnpaZjKFvyi1okTjJJusN455paPH';
  const usdtAddress = '0xABCD1234...';

  return (
    <div className="space-y-6">
      <button
        onClick={() =>
          handleCard({
            callback: (resp) => {
              console.log('Flutterwave success', resp);
              closePaymentModal();
              // proceed to dashboard
            },
            onClose: () => {},
          })
        }
        className="flex items-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg"
      >
        <FaCreditCard /> Pay $48 with Card
      </button>

      <button
        onClick={() => setShowCrypto((s) => !s)}
        className="flex items-center gap-2 bg-yellow-600 text-white py-3 px-4 rounded-lg"
      >
        <FaQrcode /> Pay with Binance Pay
      </button>

      {showCrypto && (
        <div className="border rounded-lg p-4 space-y-4 bg-gray-800 text-white">
          <p>Scan to pay via Binance Pay:</p>
          <QRCode value={binanceQR} size={150} />
        </div>
      )}

      <div className="border rounded-lg p-4 bg-gray-900 text-white">
        <h4 className="flex items-center gap-2"><FaWallet /> Manual Crypto Deposit</h4>
        <p>BTC: <code>{btcAddress}</code></p>
        <p>USDT: <code>{usdtAddress}</code></p>

        <label className="inline-block mt-2">
          <FaUpload /> Upload Receipt:
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setReceipt(e.target.files[0])}
            className="block mt-1"
          />
        </label>

        <button
          onClick={() => {
            // upload receipt and verify
            console.log('receipt uploaded', receipt);
          }}
          className="mt-3 bg-green-600 text-white py-2 px-4 rounded-lg"
          disabled={!receipt}
        >
          Submit Receipt
        </button>
      </div>
    </div>
  );
}
