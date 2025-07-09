'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import {
  FaBook, FaShoppingCart, FaCreditCard, FaWallet, FaQrcode,
  FaCheckCircle, FaTimesCircle, FaUserCircle, FaSignOutAlt,
  FaVideo, FaTelegramPlane, FaWhatsapp, FaLink, FaDownload,
  FaStripe, FaBitcoin, FaPaypal, FaCcVisa, FaCcMastercard,
  FaCcAmex, FaGooglePay, FaApplePay, FaMoneyBillWave, FaMoneyCheckAlt
} from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import FlutterwaveButton from 'flutterwave-react-v3';
import{academy} from'../academy/page';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [binanceQr, setBinanceQr] = useState('');

  useEffect(() => {
    async function init() {
      const {
        data: { user: u },
        error: uErr
      } = await supabase.auth.getUser();

      if (uErr || !u) {
        router.push('/login');
        return;
      }
      setUser(u);

      // Fetch courses (academy courses assumed to be same table or joined if needed)
      const { data: cors } = await supabase.from('courses').select('*');
      setAvailableCourses(cors ?? []);

      const { data: enrolls } = await supabase
        .from('enrollments')
        .select('course_id, courses(name, description, video_url)')
        .eq('user_id', u.id);

      setEnrolledCourses(
        (enrolls ?? []).map(e => ({
          id: e.course_id,
          name: e.courses.name,
          description: e.courses.description,
          videoUrl: e.courses.video_url
        }))
      );

      const { data: pays } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', u.id)
        .order('created_at', { ascending: false });

      setPayments(pays ?? []);

      setLoading(false);
    }
    init();
  }, [router]);

  const cancel = () => {
    setSelectedCourse(null);
    setBinanceQr('');
  };

  // Stripe Checkout wrapper
  function StripeCheckout({ course }) {
    const stripe = useStripe();
    const elements = useElements();

    const pay = async () => {
      if (!stripe || !elements) {
        alert('Stripe is not loaded yet.');
        return;
      }

      const res = await fetch('/api/createStripePayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.id })
      });
      const { clientSecret } = await res.json();

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else if (paymentResult.paymentIntent && paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment succeeded!');
        router.refresh();
        cancel();
      }
    };

    return (
      <div className="space-y-4">
        <CardElement className="p-3 border rounded bg-white" />
        <button
          onClick={pay}
          className="btn-primary bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        >
          Pay ${course.price} with Card
        </button>
      </div>
    );
  }

  async function binancePay(courseId) {
    try {
      const res = await fetch('/api/createBinance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      });
      const rt = await res.json();
      setBinanceQr(rt.qrCodeUrl);
      setSelectedCourse(prev => ({ ...prev, payment: 'binance' }));
    } catch (err) {
      alert('Failed to generate Binance QR');
    }
  }

  function CryptoReceipt({ course }) {
    return (
      <form
        onSubmit={async e => {
          e.preventDefault();
          const file = e.target.receipt.files[0];
          if (!file) return alert('Please upload a receipt.');

          const { data, error } = await supabase.storage
            .from('receipts')
            .upload(`${user.id}/${Date.now()}-${file.name}`, file);

          if (error) {
            alert('Upload failed: ' + error.message);
            return;
          }

          const url = supabase.storage.from('receipts').getPublicUrl(data.path).publicUrl;

          await fetch('/api/recordPayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              courseId: course.id,
              amount: course.price,
              method: 'crypto',
              txRef: '',
              receiptUrl: url,
              status: 'pending'
            })
          });
          alert('Receipt uploaded! Payment pending approval.');
          router.refresh();
          cancel();
        }}
        className="space-y-2"
      >
        <p>
          Send BTC/USDT to address: <b>{process.env.NEXT_PUBLIC_CRYPTO_ADDR}</b>
        </p>
        <input
          type="file"
          name="receipt"
          required
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
        />
        <button
          type="submit"
          className="btn-primary bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
        >
          Upload Receipt & Enroll
        </button>
      </form>
    );
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl">
        Loading your dashboard...
      </div>
    );

  return (
    <div className="dashboard max-w-6xl mx-auto p-6 bg-gray-900 min-h-screen text-white space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-blue-400">
          <FaUserCircle /> Hello, {user.email.split('@')[0]}
        </h1>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/login');
          }}
          className="btn-danger bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Academy Courses Section */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
          <FaShoppingCart /> Academy Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(availableCourses ?? []).map(c => {
            const enrolled = enrolledCourses.find(ec => ec.id === c.id);
            return (
              <motion.div
                key={c.id}
                className="course-card p-6 rounded-lg bg-gradient-to-r from-indigo-700 to-purple-800 cursor-pointer hover:scale-[1.03] hover:shadow-lg transition-transform border border-transparent hover:border-indigo-400"
                onClick={() => setSelectedCourse(c)}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-white">{c.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{c.description}</p>
                {enrolled ? (
                  <span className="inline-flex items-center gap-1 mt-2 text-green-400 font-semibold">
                    <FaCheckCircle /> Enrolled
                  </span>
                ) : (
                  <button
                    className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded w-full"
                    onClick={() => setSelectedCourse(c)}
                    aria-label={`Buy course ${c.name}`}
                  >
                    Buy for ${c.price}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Payment Modal */}
      {selectedCourse && !enrolledCourses.find(ec => ec.id === selectedCourse.id) && (
        <div className="pay-modal fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-4xl w-full space-y-6 overflow-auto max-h-[90vh]">
            <h3 className="text-3xl font-bold mb-6 text-yellow-400">
              Purchase "{selectedCourse.name}" — ${selectedCourse.price}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Stripe */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                  <FaStripe size={22} /> Stripe
                </h4>
                <Elements stripe={stripePromise}>
                  <StripeCheckout course={selectedCourse} />
                </Elements>
              </div>

              {/* Flutterwave */}
              <div className="bg-gray-700 p-4 rounded-lg flex flex-col justify-between">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                  <FaWallet size={22} /> Flutterwave
                </h4>
                <FlutterwaveButton
                  className="btn-primary bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded w-full"
                  config={{
                    public_key: process.env.NEXT_PUBLIC_FLW_KEY,
                    tx_ref: Date.now().toString(),
                    amount: selectedCourse.price,
                    currency: 'USD',
                    redirect_url: window.location.href
                  }}
                  callback={r => {
                    if (r.status === 'successful') {
                      alert('Flutterwave payment successful!');
                      router.refresh();
                      cancel();
                    }
                  }}
                />
              </div>

              {/* Binance Pay */}
              <div className="bg-gray-700 p-4 rounded-lg flex flex-col justify-center items-center">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                  <FaQrcode size={22} /> Binance Pay
                </h4>
                {binanceQr ? (
                  <img
                    src={binanceQr}
                    alt="Binance Pay QR Code"
                    className="w-44 h-44 rounded-lg shadow-lg"
                  />
                ) : (
                  <button
                    className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded w-full"
                    onClick={() => binancePay(selectedCourse.id)}
                  >
                    Generate QR
                  </button>
                )}
              </div>

              {/* Crypto Receipt Upload */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                  <FaBitcoin size={22} /> Crypto
                </h4>
                <CryptoReceipt course={selectedCourse} />
              </div>
            </div>

            <button
              className="btn-secondary mt-6 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded w-full font-semibold tracking-wide"
              onClick={cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Enrolled Courses */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4 text-blue-400">
          <FaBook /> Your Enrolled Courses
        </h2>
        {enrolledCourses.length === 0 ? (
          <p className="text-gray-300">You haven’t enrolled in any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enrolledCourses.map(ec => (
              <motion.div
                key={ec.id}
                className="course-card p-6 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-800 cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-transform border border-transparent hover:border-blue-400"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-white">{ec.name}</h3>
                <a
                  href={ec.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  <FaVideo /> Watch Video
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Payments History */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4 text-green-400">
          <FaCreditCard /> Your Payments
        </h2>
        {payments.length === 0 ? (
          <p className="text-gray-300">No payment history found.</p>
        ) : (
          <ul className="payments-list space-y-3 text-gray-300">
            {payments.map(p => (
              <li
                key={p.id}
                className="flex flex-wrap items-center gap-4 border-b border-gray-700 pb-3"
              >
                <span className="font-semibold">${p.amount}</span>
                <span className="capitalize">{p.method}</span>
                <span
                  className={
                    p.status === 'paid'
                      ? 'text-green-400 font-semibold'
                      : 'text-yellow-400 font-semibold'
                  }
                >
                  {p.status}
                </span>
                <span>{new Date(p.created_at).toLocaleDateString()}</span>
                {p.receipt_url ? (
                  <a
                    href={p.receipt_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                    title="View Receipt"
                  >
                    <FaDownload size={20} />
                  </a>
                ) : (
                  <FaTimesCircle className="text-red-500" title="No Receipt" size={20} />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Worldwide Payment Icons */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-300">Payments Worldwide</h2>
        <div className="flex flex-wrap justify-center gap-8 text-gray-300 hover:text-white cursor-pointer select-none">
          {/* Add links or onClick handlers if needed */}
          <FaStripe size={40} title="Stripe" className="hover:text-indigo-400 transition" />
          <FaPaypal size={40} title="Paypal" className="hover:text-blue-500 transition" />
          <FaBitcoin size={40} title="Bitcoin" className="hover:text-yellow-400 transition" />
          <FaCcVisa size={40} title="Visa" className="hover:text-blue-600 transition" />
          <FaCcMastercard size={40} title="Mastercard" className="hover:text-red-600 transition" />
          <FaCcAmex size={40} title="American Express" className="hover:text-blue-700 transition" />
          <FaGooglePay size={40} title="Google Pay" className="hover:text-green-600 transition" />
          <FaApplePay size={40} title="Apple Pay" className="hover:text-gray-300 transition" />
          <FaMoneyBillWave size={40} title="MoneyWave" className="hover:text-green-700 transition" />
          <FaMoneyCheckAlt size={40} title="Money Check" className="hover:text-blue-700 transition" />
          {/* Add Binance or Flutterwave icon as svg or custom if you want */}
        </div>
      </section>

      {/* Support & Groups */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4 text-purple-400">
          <FaTelegramPlane /> Support & Groups
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://t.me/your-telegram-group"
            target="_blank"
            rel="noreferrer"
            className="btn-primary bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center gap-2"
          >
            <FaTelegramPlane /> Telegram Group
          </a>
          <a
            href="https://chat.whatsapp.com/Fe5m0T1WJxQ6QMaMhwCDTp?mode=ac_c"
            target="_blank"
            rel="noreferrer"
            className="btn-primary bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center gap-2"
          >
            <FaWhatsapp /> WhatsApp Group
          </a>
          <a
            href="mailto:support@the263fx.com"
            className="btn-secondary bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center gap-2"
          >
            <FaLink /> Email Support
          </a>
        </div>
      </section>
    </div>
  );
}
