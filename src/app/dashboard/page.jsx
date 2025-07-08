'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import {
  FaBook, FaShoppingCart, FaCreditCard, FaWallet, FaQrcode,
  FaCheckCircle, FaTimesCircle, FaUserCircle, FaSignOutAlt,
  FaVideo, FaTelegramPlane, FaWhatsapp, FaLink, FaDownload
} from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import FlutterwaveButton from 'flutterwave-react-v3';

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
      const { data: { user: u }, error: uErr } = await supabase.auth.getUser();
      if (uErr || !u) return router.push('/login');
      setUser(u);

      const { data: cors } = await supabase.from('courses').select('*');
      setAvailableCourses(cors);

      const { data: enrolls } = await supabase
        .from('enrollments')
        .select('course_id, courses(name, description, video_url)')
        .eq('user_id', u.id);
      setEnrolledCourses(enrolls.map(e => ({
        id: e.course_id, name: e.courses.name,
        description: e.courses.description, videoUrl: e.courses.video_url
      })));

      const { data: pays } = await supabase
        .from('payments').select('*').eq('user_id', u.id).order('created_at', { ascending: false });
      setPayments(pays);
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
    const stripe = useStripe(), elements = useElements();
    const pay = async () => {
      const { data: { clientSecret } } = await fetch('/api/createStripePayment', {
        method: 'POST',
        body: JSON.stringify({ courseId: course.id })
      }).then(r => r.json());
      const res = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      });
      if (res.error) alert(res.error.message);
      else {
        router.refresh();
        cancel();
      }
    };
    return (
      <div className="space-y-4">
        <CardElement className="p-3 border rounded bg-white" />
        <button onClick={pay} className="btn-primary bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full">
          Pay ${course.price} with Card
        </button>
      </div>
    );
  }

  async function binancePay(courseId) {
    const rt = await fetch('/api/createBinance', { method:'POST', body:JSON.stringify({ courseId }) })
      .then(r => r.json());
    setBinanceQr(rt.qrCodeUrl);
    setSelectedCourse(prev => ({ ...prev, payment: 'binance' }));
  }

  function CryptoReceipt({ course }) {
    return (
      <form onSubmit={async e => {
        e.preventDefault();
        const f = e.target.receipt.files[0];
        const { data } = await supabase.storage.from('receipts').upload(`${user.id}/${Date.now()}`, f);
        const url = supabase.storage.from('receipts').getPublicUrl(data.path).publicUrl;
        await fetch('/api/recordPayment', {
          method:'POST',
          body: JSON.stringify({ courseId: course.id, amount: course.price, method: 'crypto', txRef: '', receiptUrl: url, status: 'pending' })
        });
        router.refresh();
        cancel();
      }} className="space-y-2">
        <p>Send BTC/USDT to address: <b>{process.env.NEXT_PUBLIC_CRYPTO_ADDR}</b></p>
        <input type="file" name="receipt" required className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50" />
        <button type="submit" className="btn-primary bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full">
          Upload Receipt & Enroll
        </button>
      </form>
    );
  }

  if (loading) return (
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
          onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }}
          className="btn-danger bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
          <FaShoppingCart /> Shop Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableCourses.map(c => {
            const enrolled = enrolledCourses.find(ec => ec.id === c.id);
            return (
              <motion.div
                key={c.id}
                className="course-card p-4 rounded-lg bg-white/10 border border-white/20 cursor-pointer hover:bg-white/20 transition"
                onClick={() => setSelectedCourse(c)}
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="text-gray-300 text-sm">{c.description}</p>
                {enrolled ? (
                  <span className="inline-flex items-center gap-1 mt-2 text-green-400 font-semibold">
                    <FaCheckCircle /> Enrolled
                  </span>
                ) : (
                  <>
                    <span className="inline-block mt-2 text-yellow-400 font-bold text-lg">${c.price}</span>
                    <span className="inline-block ml-2 text-xs px-2 py-1 rounded bg-yellow-500/80 text-black font-semibold">
                      {c.price < 100 ? '20% off' : (c.price < 200 ? '36% off' : '50% off')}
                    </span>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {selectedCourse && !enrolledCourses.find(ec => ec.id === selectedCourse.id) && (
        <div className="pay-modal fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-3xl w-full space-y-6 overflow-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold mb-4">Buy "{selectedCourse.name}" for ${selectedCourse.price}</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Card (Stripe)</h4>
                <Elements stripe={stripePromise}>
                  <StripeCheckout course={selectedCourse} />
                </Elements>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Card (Flutterwave)</h4>
                <FlutterwaveButton
                  className="btn-primary bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded w-full"
                  config={{
                    public_key: process.env.NEXT_PUBLIC_FLW_KEY,
                    tx_ref: Date.now().toString(),
                    amount: selectedCourse.price,
                    currency: 'USD',
                    redirect_url: window.location.href
                  }}
                  callback={r => { if (r.status === 'successful') router.refresh(); }}
                />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Binance Pay</h4>
                {binanceQr ? (
                  <img src={binanceQr} alt="Binance QR" className="w-48 h-48 mx-auto" />
                ) : (
                  <button
                    className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded w-full"
                    onClick={() => binancePay(selectedCourse.id)}
                  >
                    Generate QR
                  </button>
                )}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Crypto</h4>
                <CryptoReceipt course={selectedCourse} />
              </div>
            </div>
            <button className="btn-secondary mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded w-full" onClick={cancel}>Cancel</button>
          </div>
        </div>
      )}

      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
          <FaBook /> Your Enrolled Courses
        </h2>
        {enrolledCourses.length === 0 ? <p>You haven’t enrolled yet.</p> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enrolledCourses.map(ec => (
              <motion.div
                key={ec.id}
                className="course-card p-4 rounded-lg bg-white/10 border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold">{ec.name}</h3>
                <a href={ec.videoUrl} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                  <FaVideo /> Watch Video
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
          <FaCreditCard /> Your Payments
        </h2>
        {payments.length === 0 ? <p>No payment history.</p> : (
          <ul className="payments-list space-y-2">
            {payments.map(p => (
              <li key={p.id} className="flex items-center gap-4 border-b border-gray-700 pb-2">
                <span>${p.amount}</span>
                <span className="capitalize">{p.method}</span>
                <span className={p.status === 'paid' ? 'text-green-400' : 'text-yellow-400'}>{p.status}</span>
                <span>{new Date(p.created_at).toLocaleDateString()}</span>
                {p.receipt_url ? (
                  <a href={p.receipt_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-600">
                    <FaDownload />
                  </a>
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
          <FaTelegramPlane /> Support & Groups
        </h2>
        <div className="flex flex-wrap gap-4">
          <a href="https://t.me/your-telegram-group" target="_blank" rel="noreferrer"
            className="btn-primary bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center gap-2">
            <FaTelegramPlane /> Telegram Group
          </a>
          <a href="https://chat.whatsapp.com/Fe5m0T1WJxQ6QMaMhwCDTp?mode=ac_c" target="_blank" rel="noreferrer"
            className="btn-primary bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center gap-2">
            <FaWhatsapp /> WhatsApp Group
          </a>
          <a href="mailto:support@the263fx.com"
            className="btn-secondary bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center gap-2">
            <FaLink /> Email Support
          </a>
        </div>
      </section>
    </div>
  );
}
